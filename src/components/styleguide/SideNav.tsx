const SECTIONS = [
  { id: 'buttons', label: 'Buttons' },
  { id: 'button-groups', label: 'Button Groups & Split' },
  { id: 'checkboxes', label: 'Checkboxes & Radio' },
  { id: 'switches', label: 'Switches' },
  { id: 'inputs', label: 'Inputs & Selects' },
  { id: 'tabs', label: 'Tabs' },
  { id: 'modals', label: 'Modals' },
  { id: 'pills-badges', label: 'Pills & Badges' },
  { id: 'progress', label: 'Progress' },
  { id: 'cards', label: 'Cards' },
  { id: 'avatars', label: 'Avatars' },
  { id: 'table', label: 'Table' },
  { id: 'colors', label: 'Colors & Backgrounds' },
  { id: 'typography', label: 'Typography, Radius & Shadows' },
];

export function SideNav() {
  return (
    <nav className="guide-nav" aria-label="Style guide sections">
      <div className="guide-nav__label">Foundations &amp; UI</div>
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="guide-nav__link"
        >
          <span />
          {s.label}
        </a>
      ))}
      <div className="guide-nav__tip"><kbd>I</kbd><span>Use the inspector to explore any element.</span></div>
    </nav>
  );
}
