import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFloatingDrag } from './useFloatingDrag';

type InspectorTab = 'css' | 'scss' | 'react' | 'states';

const STYLE_PROPERTIES = [
  'display', 'position', 'width', 'height', 'padding', 'margin', 'gap',
  'color', 'background-color', 'font-family', 'font-size', 'font-weight',
  'line-height', 'text-align', 'border', 'border-radius', 'box-shadow',
  'opacity', 'overflow', 'align-items', 'justify-content',
];

const COMPONENT_DETAILS: Record<string, { sizes: string[]; states: string[] }> = {
  buttons: { sizes: ['Small · 28px', 'Medium · 34px', 'Large · 42px'], states: ['Default', 'Hover', 'Active', 'Focus', 'Loading', 'Disabled'] },
  checkboxes: { sizes: ['Small · 12px', 'Medium · 16px', 'Large · 20px'], states: ['Unchecked', 'Checked', 'Indeterminate', 'Focus', 'Disabled'] },
  switches: { sizes: ['Default · 48 × 32px'], states: ['Off', 'On', 'Focus', 'Disabled'] },
  inputs: { sizes: ['Small', 'Medium', 'Large'], states: ['Default', 'Focus', 'Filled', 'Error', 'Disabled', 'No results'] },
  tabs: { sizes: ['Content width', 'Full width'], states: ['Default', 'Hover', 'Selected', 'Focus', 'Disabled'] },
  modals: { sizes: ['Small', 'Medium', 'Large', 'Scrollable'], states: ['Default', 'Error', 'Warning', 'Success', 'Info'] },
  colors: { sizes: ['Token swatch'], states: ['Base token', 'Semantic token', 'Surface token'] },
  typography: { sizes: ['Caption → H1'], states: ['Regular', 'Medium', 'Semibold', 'Bold', 'Italic'] },
};

interface StateRule {
  name: string;
  suffix: string;
  declarations: string[];
}

const STATE_RULES: Record<string, StateRule[]> = {
  buttons: [
    { name: 'Default', suffix: '', declarations: ['transition: color 150ms, background-color 150ms, border-color 150ms'] },
    { name: 'Hover', suffix: ':hover', declarations: ['filter: brightness(0.94)'] },
    { name: 'Active', suffix: ':active', declarations: ['filter: brightness(0.88)', 'transform: translateY(1px)'] },
    { name: 'Focus', suffix: ':focus-visible', declarations: ['outline: 2px solid var(--color-focus-ring)', 'outline-offset: 2px'] },
    { name: 'Loading', suffix: '[aria-busy="true"]', declarations: ['cursor: wait', 'pointer-events: none'] },
    { name: 'Disabled', suffix: ':disabled', declarations: ['cursor: not-allowed', 'opacity: 0.56'] },
  ],
  checkboxes: [
    { name: 'Unchecked', suffix: ':not(:checked)', declarations: ['background: var(--color-card)', 'border-color: var(--color-gray-5)'] },
    { name: 'Checked', suffix: ':checked', declarations: ['background: var(--color-primary-6)', 'border-color: var(--color-primary-6)'] },
    { name: 'Indeterminate', suffix: ':indeterminate', declarations: ['background: var(--color-primary-6)'] },
    { name: 'Focus', suffix: ':focus-visible', declarations: ['outline: 2px solid var(--color-focus-ring)', 'outline-offset: 2px'] },
    { name: 'Disabled', suffix: ':disabled', declarations: ['cursor: not-allowed', 'opacity: 0.56'] },
  ],
  switches: [
    { name: 'Off', suffix: ':not(:checked)', declarations: ['background: var(--color-gray-3)'] },
    { name: 'On', suffix: ':checked', declarations: ['background: var(--color-primary-6)'] },
    { name: 'Focus', suffix: ':focus-visible', declarations: ['outline: 2px solid var(--color-focus-ring)', 'outline-offset: 2px'] },
    { name: 'Disabled', suffix: ':disabled', declarations: ['cursor: not-allowed', 'opacity: 0.56'] },
  ],
  inputs: [
    { name: 'Default', suffix: '', declarations: ['border-color: var(--color-gray-5)', 'background: var(--color-card)'] },
    { name: 'Hover', suffix: ':hover:not(:disabled)', declarations: ['border-color: var(--color-gray-7)'] },
    { name: 'Focus', suffix: ':focus-visible', declarations: ['border-color: var(--color-primary-6)', 'box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-focus-ring) 15%, transparent)'] },
    { name: 'Filled', suffix: ':not(:placeholder-shown)', declarations: ['color: var(--color-text-primary)'] },
    { name: 'Error', suffix: '[aria-invalid="true"]', declarations: ['border-color: var(--color-error-base)'] },
    { name: 'Disabled', suffix: ':disabled', declarations: ['cursor: not-allowed', 'background: var(--color-well)', 'color: var(--color-text-disabled)'] },
  ],
  tabs: [
    { name: 'Default', suffix: '[role="tab"]', declarations: ['color: var(--color-text-secondary)'] },
    { name: 'Hover', suffix: '[role="tab"]:hover', declarations: ['color: var(--color-text-primary)'] },
    { name: 'Active', suffix: '[role="tab"]:active', declarations: ['background: var(--color-gray-3)'] },
    { name: 'Selected', suffix: '[role="tab"][aria-selected="true"]', declarations: ['color: var(--color-primary-6)', 'border-color: var(--color-primary-6)'] },
    { name: 'Focus', suffix: '[role="tab"]:focus-visible', declarations: ['outline: 2px solid var(--color-focus-ring)', 'outline-offset: 2px'] },
    { name: 'Disabled', suffix: '[role="tab"]:disabled', declarations: ['cursor: not-allowed', 'color: var(--color-text-disabled)'] },
  ],
  modals: [
    { name: 'Open', suffix: '[aria-modal="true"]', declarations: ['opacity: 1', 'transform: translateY(0)'] },
    { name: 'Entering', suffix: '[data-state="entering"]', declarations: ['opacity: 0', 'transform: translateY(8px)'] },
    { name: 'Scrollable', suffix: '[data-scrollable="true"]', declarations: ['overflow-y: auto', 'overscroll-behavior: contain'] },
  ],
};

function selectorFor(element: HTMLElement) {
  if (element.id) return `#${element.id}`;
  const className = Array.from(element.classList).filter((name) => !name.includes(':')).slice(0, 2);
  return `${element.tagName.toLowerCase()}${className.length ? `.${className.map((name) => CSS.escape(name)).join('.')}` : ''}`;
}

function cssFor(element: HTMLElement) {
  const styles = window.getComputedStyle(element);
  const declarations = STYLE_PROPERTIES
    .map((property) => [property, styles.getPropertyValue(property).trim()] as const)
    .filter(([, value]) => value && value !== 'normal' && value !== 'none' && value !== 'auto' && value !== '0px');
  return `${selectorFor(element)} {\n${declarations.map(([property, value]) => `  ${property}: ${value};`).join('\n')}\n}`;
}

function rulesFor(element: HTMLElement) {
  const family = element.closest<HTMLElement>('[data-component-family]')?.dataset.componentFamily;
  const sectionId = element.closest('section')?.id ?? '';
  return STATE_RULES[family ?? sectionId] ?? [
    { name: 'Default', suffix: '', declarations: [] },
    { name: 'Hover', suffix: ':hover', declarations: ['filter: brightness(0.97)'] },
    { name: 'Focus', suffix: ':focus-visible', declarations: ['outline: 2px solid var(--color-focus-ring)', 'outline-offset: 2px'] },
  ];
}

function stateCssFor(element: HTMLElement) {
  const selector = selectorFor(element);
  return rulesFor(element)
    .filter((rule) => rule.suffix || rule.name !== 'Default')
    .map((rule) => `${selector}${rule.suffix} {\n${rule.declarations.map((declaration) => `  ${declaration};`).join('\n')}\n}`)
    .join('\n\n');
}

function completeCssFor(element: HTMLElement) {
  const states = stateCssFor(element);
  return `${cssFor(element)}${states ? `\n\n/* Component states */\n${states}` : ''}`;
}

function scssFor(element: HTMLElement) {
  const css = cssFor(element);
  const body = css.slice(css.indexOf('{') + 1, -1).trimEnd();
  const stateBlocks = rulesFor(element)
    .filter((rule) => rule.suffix || rule.name !== 'Default')
    .map((rule) => `  // ${rule.name}\n  &${rule.suffix} {\n${rule.declarations.map((declaration) => `    ${declaration};`).join('\n')}\n  }`)
    .join('\n\n');
  return `${selectorFor(element)} {\n${body}\n\n${stateBlocks}\n}`;
}

function jsxFor(element: HTMLElement, depth = 0): string {
  const tag = element.tagName.toLowerCase();
  const componentName = tag === 'button' ? 'Button' : tag === 'input' ? 'Input' : tag === 'section' ? 'Section' : tag;
  const props: string[] = [];
  const className = element.getAttribute('class');
  if (className) props.push(`className="${className}"`);
  ['type', 'role', 'aria-label', 'aria-selected', 'aria-invalid', 'disabled'].forEach((attribute) => {
    if (element.hasAttribute(attribute)) {
      const value = element.getAttribute(attribute);
      props.push(value === '' ? attribute : `${attribute === 'class' ? 'className' : attribute}="${value}"`);
    }
  });
  const opening = `<${componentName}${props.length ? `\n  ${props.join('\n  ')}` : ''}>`;
  const children = Array.from(element.children).filter((child): child is HTMLElement => child instanceof HTMLElement);
  const ownText = Array.from(element.childNodes).find((node) => node.nodeType === Node.TEXT_NODE)?.textContent?.trim();
  if (depth >= 1 || children.length === 0) {
    return `${opening}${ownText ? `\n  ${ownText}\n` : ''}</${componentName}>`;
  }
  return `${opening}\n${children.slice(0, 5).map((child) => jsxFor(child, depth + 1).split('\n').map((line) => `  ${line}`).join('\n')).join('\n')}\n</${componentName}>`;
}

function CopyIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="11" height="11" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>;
}

function CursorIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 3 14 8-6 2-3 6L5 3Z"/></svg>;
}

export function Inspector() {
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState<HTMLElement | null>(null);
  const [hovered, setHovered] = useState<HTMLElement | null>(null);
  const [tab, setTab] = useState<InspectorTab>('css');
  const [copied, setCopied] = useState(false);
  const inspectorDrag = useFloatingDrag('thinkfirm-inspector-button-position');

  const content = useMemo(() => {
    if (!selected) return '';
    if (tab === 'css') return completeCssFor(selected);
    if (tab === 'scss') return scssFor(selected);
    if (tab === 'react') return jsxFor(selected);
    return '';
  }, [selected, tab]);

  const details = useMemo(() => {
    const family = selected?.closest<HTMLElement>('[data-component-family]')?.dataset.componentFamily;
    const sectionId = selected?.closest('section')?.id ?? '';
    return COMPONENT_DETAILS[family ?? sectionId] ?? { sizes: ['Responsive'], states: ['Default', 'Hover', 'Focus'] };
  }, [selected]);

  const stateRules = useMemo(() => selected ? rulesFor(selected) : [], [selected]);

  const stopInspecting = useCallback(() => {
    setActive(false);
    setHovered(null);
  }, []);

  useEffect(() => {
    const onToolActivate = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== 'inspect') {
        stopInspecting();
        setSelected(null);
      }
    };
    window.addEventListener('design-tool:activate', onToolActivate);
    return () => window.removeEventListener('design-tool:activate', onToolActivate);
  }, [stopInspecting]);

  useEffect(() => {
    const onShortcut = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const isTyping = target.matches('input, textarea, select, [contenteditable="true"]');
      if (!isTyping && event.key.toLowerCase() === 'i' && !event.metaKey && !event.ctrlKey && !event.altKey) {
        setActive((value) => !value);
      }
    };
    document.addEventListener('keydown', onShortcut);
    return () => document.removeEventListener('keydown', onShortcut);
  }, []);

  useEffect(() => {
    if (!active) return;
    const onMove = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-inspector-ui]')) setHovered(target);
    };
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('[data-inspector-ui]')) return;
      event.preventDefault();
      event.stopPropagation();
      const componentRoot = target.closest<HTMLElement>('button, input, select, textarea, [role="tab"], [role="switch"], [data-inspectable]');
      setSelected(componentRoot ?? target);
      setTab('css');
      stopInspecting();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') stopInspecting();
    };
    document.addEventListener('mousemove', onMove, true);
    document.addEventListener('click', onClick, true);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousemove', onMove, true);
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [active, stopInspecting]);

  const rect = hovered?.getBoundingClientRect();
  const label = selected ? `${selected.tagName.toLowerCase()}${selected.classList.length ? `.${selected.classList[0]}` : ''}` : '';

  async function copyContent() {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <>
      {active && rect && (
        <div
          className="inspector-highlight"
          style={{ top: rect.top, left: rect.left, width: rect.width, height: rect.height }}
          aria-hidden="true"
          data-inspector-ui
        />
      )}

      {active && (
        <div className="inspector-hint" data-inspector-ui>
          <kbd>Esc</kbd> Exit inspector <span /> Click any element to inspect
        </div>
      )}

      {selected && (
        <aside className="inspector-panel" aria-label="Component inspector" data-inspector-ui>
          <header className="inspector-panel__header">
            <div>
              <span className="inspector-eyebrow">Inspecting</span>
              <code>{label}</code>
            </div>
            <button type="button" onClick={() => setSelected(null)} aria-label="Close inspector">×</button>
          </header>
          <div className="inspector-tabs" role="tablist">
            {(['css', 'scss', 'react', 'states'] as InspectorTab[]).map((item) => (
              <button key={item} type="button" role="tab" aria-selected={tab === item} onClick={() => setTab(item)}>
                {item === 'react' ? 'React' : item[0].toUpperCase() + item.slice(1)}
              </button>
            ))}
            {tab !== 'states' && (
              <button className="inspector-copy" type="button" onClick={copyContent}>
                <CopyIcon /> {copied ? 'Copied' : 'Copy'}
              </button>
            )}
          </div>
          <div className="inspector-panel__body">
            {tab === 'states' ? (
              <div className="inspector-details">
                <div>
                  <span className="inspector-eyebrow">Available sizes</span>
                  <div className="inspector-chips">{details.sizes.map((size) => <span key={size}>{size}</span>)}</div>
                </div>
                <div>
                  <span className="inspector-eyebrow">Component states</span>
                  <div className="inspector-state-list">
                    {stateRules.map((state, index) => (
                      <div className="inspector-state-card" key={`${state.name}-${state.suffix}`}>
                        <div className="inspector-state-card__title"><i className={index === 0 ? 'is-active' : ''} />{state.name}</div>
                        <code>{state.suffix || 'Base styles'}</code>
                        {state.declarations.length > 0 && (
                          <span>{state.declarations.join('; ')}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <p>States and sizes are documented for this component family. Use the live specimens behind the inspector to test interactive states.</p>
              </div>
            ) : (
              <pre><code>{content}</code></pre>
            )}
          </div>
          <button className="inspector-reselect" type="button" onClick={() => setActive(true)}>
            <CursorIcon /> Select another element
          </button>
        </aside>
      )}

      <button
        className={`inspector-trigger floating-tool ${active ? 'is-active' : ''}`}
        type="button"
        aria-pressed={active}
        aria-label={active ? 'Exit inspector' : 'Inspect an element'}
        title="Inspect · drag to move"
        onClick={() => {
          if (active) stopInspecting();
          else {
            window.dispatchEvent(new CustomEvent('design-tool:activate', { detail: 'inspect' }));
            setActive(true);
          }
        }}
        data-inspector-ui
        {...inspectorDrag}
      >
        <CursorIcon />
        <span>{active ? 'Exit inspector' : 'Inspect'}</span>
      </button>
    </>
  );
}
