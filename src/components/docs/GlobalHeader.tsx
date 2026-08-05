import { Link, NavLink } from 'react-router-dom';
import { cx } from '../../lib/cx';

const NAV_LINKS = [
  { to: '/style-guide', label: 'Style Guide' },
  { to: '/master-components', label: 'Master Components' },
];

// Shared chrome for the two documentation pages (Style Guide, Master
// Components) — same brand mark, same nav, so switching between them reads
// as one site rather than two disconnected pages.
export function GlobalHeader() {
  return (
    <div className="guide-topbar">
      <div className="guide-topbar__left">
        <Link className="guide-brand" to="/style-guide" aria-label="ThinkFirm design system home">
          <span className="guide-brand__mark">tf</span>
          <span>
            <strong>ThinkFirm</strong>
            <small>Design system</small>
          </span>
        </Link>
        <nav className="guide-topbar__nav" aria-label="Documentation pages">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => cx('guide-topbar__nav-link', isActive && 'is-active')}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="guide-topbar__meta">
        <span className="status-dot" />
        System healthy <b>v1.0</b>
      </div>
    </div>
  );
}
