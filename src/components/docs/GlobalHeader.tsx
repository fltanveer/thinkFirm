import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { cx } from '../../lib/cx';
import { IconChevronDown } from '../ui/icons';

interface NavLinkItem {
  to: string;
  label: string;
  newTab?: boolean;
}

interface NavDropdownItem {
  label: string;
  items: NavLinkItem[];
}

type NavEntry = NavLinkItem | NavDropdownItem;

function isDropdown(entry: NavEntry): entry is NavDropdownItem {
  return 'items' in entry;
}

const NAV_LINKS: NavEntry[] = [
  { to: '/style-guide', label: 'Style Guide' },
  { to: '/style-guide-2', label: 'Style Guide 2' },
  { to: '/master-components', label: 'Master Components' },
  { to: '/master-components-2', label: 'Master Components 2' },
  { label: 'Pages', items: [{ to: '/auth/sign-in', label: 'Auth', newTab: true }, { to: '/policy', label: 'Policy', newTab: true }] },
];

function NavDropdown({ entry }: { entry: NavDropdownItem }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isActive = entry.items.some((item) => location.pathname.startsWith(item.to));

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div className="guide-topbar__dropdown" ref={rootRef}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cx('guide-topbar__nav-link guide-topbar__nav-trigger', isActive && 'is-active')}
      >
        {entry.label}
        <IconChevronDown className={cx('guide-topbar__nav-chevron', open && 'is-open')} width={13} height={13} />
      </button>
      {open && (
        <div className="guide-topbar__dropdown-panel" role="menu">
          {entry.items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              role="menuitem"
              target={item.newTab ? '_blank' : undefined}
              rel={item.newTab ? 'noopener noreferrer' : undefined}
              className={({ isActive: itemActive }) => cx('guide-topbar__dropdown-item', itemActive && 'is-active')}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

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
          {NAV_LINKS.map((entry) =>
            isDropdown(entry) ? (
              <NavDropdown key={entry.label} entry={entry} />
            ) : (
              <NavLink
                key={entry.to}
                to={entry.to}
                className={({ isActive }) => cx('guide-topbar__nav-link', isActive && 'is-active')}
              >
                {entry.label}
              </NavLink>
            )
          )}
        </nav>
      </div>
      <div className="guide-topbar__meta">
        <span className="status-dot" />
        System healthy <b>v1.0</b>
      </div>
    </div>
  );
}
