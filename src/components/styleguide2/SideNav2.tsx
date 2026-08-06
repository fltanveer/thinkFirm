const SECTIONS = [
  { id: 'sg2-buttons', label: 'Buttons' },
  { id: 'sg2-button-groups', label: 'Button Groups & Split' },
  { id: 'sg2-checkboxes', label: 'Checkboxes & Radio' },
  { id: 'sg2-switches', label: 'Switches' },
  { id: 'sg2-inputs', label: 'Inputs & Selects' },
  { id: 'sg2-tabs', label: 'Tabs' },
  { id: 'sg2-modals', label: 'Modals' },
  { id: 'sg2-pills-badges', label: 'Pills & Badges' },
  { id: 'sg2-progress', label: 'Progress' },
  { id: 'sg2-cards', label: 'Cards' },
  { id: 'sg2-avatars', label: 'Avatars' },
  { id: 'sg2-table', label: 'Table' },
  { id: 'sg2-colors', label: 'Colors & Backgrounds' },
  { id: 'sg2-typography', label: 'Typography, Radius & Shadows' },
];

export function SideNav2() {
  return (
    <nav className="guide-nav" aria-label="Style guide 2 sections">
      <div className="guide-nav__label">Foundations &amp; UI</div>
      {SECTIONS.map((s) => (
        <a key={s.id} href={`#${s.id}`} className="guide-nav__link">
          <span />
          {s.label}
        </a>
      ))}
      <div className="guide-nav__tip"><kbd>I</kbd><span>Use the inspector to explore any element.</span></div>
    </nav>
  );
}
