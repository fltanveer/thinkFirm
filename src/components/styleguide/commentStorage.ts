export interface DesignComment {
  id: string;
  page: string;
  selector: string;
  elementLabel: string;
  message: string;
  author: string;
  status: 'open' | 'resolved';
  viewport: string;
  createdAt: string;
}

const STORAGE_KEY = 'thinkfirm-design-comments';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, '');
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

function isRemoteEnabled() {
  return Boolean(supabaseUrl && supabaseKey);
}

function headers(prefer?: string) {
  return {
    apikey: supabaseKey ?? '',
    Authorization: `Bearer ${supabaseKey ?? ''}`,
    'Content-Type': 'application/json',
    ...(prefer ? { Prefer: prefer } : {}),
  };
}

function fromRow(row: Record<string, string>): DesignComment {
  return {
    id: row.id,
    page: row.page,
    selector: row.selector,
    elementLabel: row.element_label,
    message: row.message,
    author: row.author,
    status: row.status as DesignComment['status'],
    viewport: row.viewport,
    createdAt: row.created_at,
  };
}

function toRow(comment: DesignComment) {
  return {
    id: comment.id,
    page: comment.page,
    selector: comment.selector,
    element_label: comment.elementLabel,
    message: comment.message,
    author: comment.author,
    status: comment.status,
    viewport: comment.viewport,
    created_at: comment.createdAt,
  };
}

function readLocal(): DesignComment[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as DesignComment[];
  } catch {
    return [];
  }
}

function writeLocal(comments: DesignComment[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
}

export async function loadComments(): Promise<DesignComment[]> {
  if (!isRemoteEnabled()) return readLocal();
  const response = await fetch(`${supabaseUrl}/rest/v1/design_comments?select=*&order=created_at.desc`, { headers: headers() });
  if (!response.ok) throw new Error('Unable to load shared comments.');
  return ((await response.json()) as Record<string, string>[]).map(fromRow);
}

export async function createComment(comment: DesignComment): Promise<DesignComment[]> {
  if (!isRemoteEnabled()) {
    const next = [comment, ...readLocal()];
    writeLocal(next);
    return next;
  }
  const response = await fetch(`${supabaseUrl}/rest/v1/design_comments`, {
    method: 'POST',
    headers: headers('return=minimal'),
    body: JSON.stringify(toRow(comment)),
  });
  if (!response.ok) throw new Error('Unable to save this shared comment.');
  return loadComments();
}

export async function updateCommentStatus(id: string, status: DesignComment['status']): Promise<DesignComment[]> {
  if (!isRemoteEnabled()) {
    const next = readLocal().map((comment) => comment.id === id ? { ...comment, status } : comment);
    writeLocal(next);
    return next;
  }
  const response = await fetch(`${supabaseUrl}/rest/v1/design_comments?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: headers('return=minimal'),
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error('Unable to update this shared comment.');
  return loadComments();
}

export async function deleteComment(id: string): Promise<DesignComment[]> {
  if (!isRemoteEnabled()) {
    const next = readLocal().filter((comment) => comment.id !== id);
    writeLocal(next);
    return next;
  }
  const response = await fetch(`${supabaseUrl}/rest/v1/design_comments?id=eq.${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: headers('return=minimal'),
  });
  if (!response.ok) throw new Error('Unable to delete this shared comment.');
  return loadComments();
}

export function exportComments(comments: DesignComment[]) {
  const blob = new Blob([JSON.stringify(comments, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `thinkfirm-design-comments-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export const commentStorageMode = isRemoteEnabled() ? 'Shared' : 'This browser';
