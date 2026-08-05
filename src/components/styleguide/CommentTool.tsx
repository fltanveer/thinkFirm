import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { commentStorageMode, createComment, deleteComment, exportComments, loadComments, updateCommentStatus } from './commentStorage';
import type { DesignComment } from './commentStorage';
import { useFloatingDrag } from './useFloatingDrag';

function CommentIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5.5A2.5 2.5 0 0 1 7.5 3h9A2.5 2.5 0 0 1 19 5.5v7a2.5 2.5 0 0 1-2.5 2.5H11l-4.5 4v-4A2.5 2.5 0 0 1 4 12.5v-7Z"/><path d="M8 8h8M8 11h5"/></svg>;
}

function selectorFor(element: HTMLElement) {
  if (element.id) return `#${CSS.escape(element.id)}`;
  const specimen = element.closest<HTMLElement>('[data-specimen]');
  const anchor = specimen?.dataset.specimen ? `[data-specimen="${CSS.escape(specimen.dataset.specimen)}"]` : '';
  if (specimen === element) return anchor;
  const parts: string[] = [];
  let current: HTMLElement | null = element;
  while (current && current !== specimen && current !== document.body && parts.length < 5) {
    let part = current.tagName.toLowerCase();
    if (current.parentElement) part += `:nth-child(${Array.from(current.parentElement.children).indexOf(current) + 1})`;
    parts.unshift(part);
    current = current.parentElement;
  }
  return [anchor, parts.join(' > ')].filter(Boolean).join(' > ');
}

function viewportName() {
  if (window.innerWidth < 620) return 'Mobile';
  if (window.innerWidth < 900) return 'Tablet';
  return 'Desktop';
}

export function CommentTool() {
  const location = useLocation();
  const [comments, setComments] = useState<DesignComment[]>([]);
  const [active, setActive] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [hovered, setHovered] = useState<HTMLElement | null>(null);
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const [message, setMessage] = useState('');
  const [author, setAuthor] = useState(() => localStorage.getItem('thinkfirm-comment-author') ?? '');
  const [filter, setFilter] = useState<'open' | 'resolved'>('open');
  const [error, setError] = useState('');
  const [, setLayoutVersion] = useState(0);
  const commentDrag = useFloatingDrag('thinkfirm-comment-button-position');

  const refresh = useCallback(async () => {
    try {
      setComments(await loadComments());
      setError('');
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to load comments.');
    }
  }, []);

  useEffect(() => { void refresh(); }, [refresh]);
  useEffect(() => {
    const update = () => setLayoutVersion((value) => value + 1);
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, []);

  const stopSelecting = useCallback(() => {
    setActive(false);
    setHovered(null);
  }, []);

  useEffect(() => {
    const onToolActivate = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== 'comment') stopSelecting();
    };
    window.addEventListener('design-tool:activate', onToolActivate);
    return () => window.removeEventListener('design-tool:activate', onToolActivate);
  }, [stopSelecting]);

  useEffect(() => {
    if (!active) return;
    const onMove = (event: MouseEvent) => {
      const next = event.target as HTMLElement;
      if (!next.closest('[data-comment-ui], [data-inspector-ui]')) setHovered(next);
    };
    const onClick = (event: MouseEvent) => {
      const next = event.target as HTMLElement;
      if (next.closest('[data-comment-ui], [data-inspector-ui]')) return;
      event.preventDefault();
      event.stopPropagation();
      setTarget(next.closest<HTMLElement>('button, input, select, textarea, [data-inspectable]') ?? next);
      setPanelOpen(true);
      setFilter('open');
      stopSelecting();
    };
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') stopSelecting(); };
    document.addEventListener('mousemove', onMove, true);
    document.addEventListener('click', onClick, true);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousemove', onMove, true);
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [active, stopSelecting]);

  const pageComments = useMemo(
    () => comments.filter((comment) => comment.page === location.pathname),
    [comments, location.pathname]
  );
  const visibleComments = pageComments.filter((comment) => comment.status === filter);
  const rect = hovered?.getBoundingClientRect();

  async function save() {
    if (!target || !message.trim()) return;
    const commenterName = author.trim() || 'Anonymous';
    const comment: DesignComment = {
      id: crypto.randomUUID(),
      page: location.pathname,
      selector: selectorFor(target),
      elementLabel: `${target.tagName.toLowerCase()}${target.classList[0] ? `.${target.classList[0]}` : ''}`,
      message: message.trim(),
      author: commenterName,
      status: 'open',
      viewport: viewportName(),
      createdAt: new Date().toISOString(),
    };
    try {
      if (author.trim()) localStorage.setItem('thinkfirm-comment-author', author.trim());
      setComments(await createComment(comment));
      setMessage('');
      setTarget(null);
      setError('');
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to save this comment.');
    }
  }

  async function toggleStatus(comment: DesignComment) {
    try { setComments(await updateCommentStatus(comment.id, comment.status === 'open' ? 'resolved' : 'open')); }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to update this comment.'); }
  }

  async function remove(id: string) {
    try { setComments(await deleteComment(id)); }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to delete this comment.'); }
  }

  function startSelecting() {
    window.dispatchEvent(new CustomEvent('design-tool:activate', { detail: 'comment' }));
    setActive(true);
    setPanelOpen(false);
  }

  return (
    <>
      {active && rect && <div className="comment-highlight" style={{ top: rect.top, left: rect.left, width: rect.width, height: rect.height }} data-comment-ui />}
      {active && <div className="comment-hint" data-comment-ui><kbd>Esc</kbd> Exit comment mode <span /> Select an element</div>}

      {pageComments.map((comment, index) => {
        let element: Element | null = null;
        try { element = document.querySelector(comment.selector); } catch { element = null; }
        const markerRect = element?.getBoundingClientRect();
        if (!markerRect || markerRect.bottom < 0 || markerRect.top > window.innerHeight) return null;
        return (
          <button
            key={comment.id}
            className={`comment-marker ${comment.status === 'resolved' ? 'is-resolved' : ''}`}
            style={{ top: markerRect.top - 10, left: Math.min(markerRect.right - 10, window.innerWidth - 34) }}
            type="button"
            title={comment.message}
            onClick={() => { setPanelOpen(true); setFilter(comment.status); }}
            data-comment-ui
          >{index + 1}</button>
        );
      })}

      {panelOpen && (
        <aside className="comment-panel" aria-label="Design comments" data-comment-ui>
          <header className="comment-panel__header">
            <div><span>Review workspace · {commentStorageMode}</span><strong>Design comments</strong></div>
            <button type="button" onClick={() => { setPanelOpen(false); setTarget(null); }} aria-label="Close comments">×</button>
          </header>

          {target && (
            <div className="comment-composer">
              <div className="comment-target"><span>Commenting on</span><code>{selectorFor(target)}</code></div>
              <textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="What should change?" autoFocus />
              <div className="comment-composer__footer">
                <input value={author} onChange={(event) => setAuthor(event.target.value)} placeholder="Your name (optional)" aria-label="Your name (optional)" />
                <button type="button" onClick={() => void save()} disabled={!message.trim()}>Add comment</button>
              </div>
            </div>
          )}

          <div className="comment-toolbar">
            <div>
              <button type="button" aria-pressed={filter === 'open'} onClick={() => setFilter('open')}>Open <span>{pageComments.filter((item) => item.status === 'open').length}</span></button>
              <button type="button" aria-pressed={filter === 'resolved'} onClick={() => setFilter('resolved')}>Resolved <span>{pageComments.filter((item) => item.status === 'resolved').length}</span></button>
            </div>
            <button type="button" onClick={() => exportComments(comments)} title="Download comments as JSON">Export</button>
          </div>

          {error && <div className="comment-error">{error}</div>}
          <div className="comment-list">
            {visibleComments.map((comment) => (
              <article key={comment.id} className="comment-card">
                <div className="comment-card__meta"><strong>{comment.author}</strong><span>{new Date(comment.createdAt).toLocaleString()}</span></div>
                <p>{comment.message}</p>
                <code>{comment.elementLabel} · {comment.viewport}</code>
                <div className="comment-card__actions">
                  <button type="button" onClick={() => void toggleStatus(comment)}>{comment.status === 'open' ? 'Resolve' : 'Reopen'}</button>
                  <button type="button" onClick={() => void remove(comment.id)}>Delete</button>
                </div>
              </article>
            ))}
            {visibleComments.length === 0 && <div className="comment-empty">No {filter} comments on this page.</div>}
          </div>
          <button className="comment-select-another" type="button" onClick={startSelecting}><CommentIcon /> Add comment to element</button>
        </aside>
      )}

      <button
        className={`comment-trigger floating-tool ${active ? 'is-active' : ''}`}
        type="button"
        onClick={() => active ? stopSelecting() : (panelOpen ? setPanelOpen(false) : setPanelOpen(true))}
        title="Comment · drag to move"
        data-comment-ui
        {...commentDrag}
      >
        <CommentIcon /><span>Comment</span>{pageComments.filter((comment) => comment.status === 'open').length > 0 && <b>{pageComments.filter((comment) => comment.status === 'open').length}</b>}
      </button>
    </>
  );
}
