import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { IconChevronDown, IconChevronRight, IconPanelLeft } from '../ui/icons';

export interface SidebarNavItem {
  id: string;
  label: string;
  icon: ReactNode;
  badge?: number;
}

export interface SidebarSection {
  id: string;
  label: string;
  items: SidebarNavItem[];
}

export interface SidebarBottomLink {
  id: string;
  label: string;
  icon: ReactNode;
}

export interface SidebarUser {
  name: string;
  role: string;
  src?: string;
}

export interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  sections: SidebarSection[];
  activeId: string;
  onSelect: (id: string) => void;
  bottomLinks: SidebarBottomLink[];
  user: SidebarUser;
}

// Sidebar widths aren't a spacing-scale value (structural layout, same
// exemption as Modal's max-widths) — arbitrary px, not a tokens.json category.
const EXPANDED_WIDTH = 'w-[272px]';
const COLLAPSED_WIDTH = 'w-[76px]';

export function Sidebar({ collapsed, onToggleCollapse, sections, activeId, onSelect, bottomLinks, user }: SidebarProps) {
  return (
    <aside
      className={cx(
        'flex h-screen shrink-0 flex-col border-r border-gray-4 bg-card transition-[width] duration-200',
        collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH
      )}
    >
      <div className={cx('flex h-6xl shrink-0 items-center border-b border-gray-4', collapsed ? 'justify-center px-md' : 'justify-between px-lg')}>
        {collapsed ? (
          <span className="flex h-2xl w-2xl items-center justify-center rounded-xs bg-primary-6 text-caption font-bold text-card">L</span>
        ) : (
          <span className="text-title font-bold tracking-tight text-text-heading">LOGO</span>
        )}
        {!collapsed && (
          <button
            type="button"
            aria-label="Collapse sidebar"
            onClick={onToggleCollapse}
            className="rounded-xs p-xs text-gray-7 transition-colors hover:bg-gray-3 hover:text-text-primary"
          >
            <IconPanelLeft />
          </button>
        )}
      </div>

      {collapsed && (
        <button
          type="button"
          aria-label="Expand sidebar"
          onClick={onToggleCollapse}
          className="mx-auto mt-md flex h-2xl w-2xl items-center justify-center rounded-xs text-gray-7 transition-colors hover:bg-gray-3 hover:text-text-primary"
        >
          <IconPanelLeft />
        </button>
      )}

      <nav className="flex flex-1 flex-col gap-lg overflow-y-auto px-md py-lg">
        {sections.map((section, i) => (
          <div key={section.id} className="flex flex-col gap-xxs">
            {collapsed ? (
              i > 0 && <div className="mx-auto my-xs h-[3px] w-[3px] rounded-full bg-gray-5" />
            ) : (
              <div className="flex items-center gap-xs px-sm py-xxs text-caption font-semibold uppercase tracking-wide text-text-secondary">
                {section.label}
                <IconChevronDown width={12} height={12} />
              </div>
            )}
            {section.items.map((item) => {
              const active = item.id === activeId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelect(item.id)}
                  title={collapsed ? item.label : undefined}
                  className={cx(
                    'relative flex items-center gap-sm rounded-xs px-sm py-sm text-body transition-colors',
                    collapsed && 'justify-center',
                    active ? 'bg-primary-0 text-primary-7 font-medium' : 'text-text-secondary hover:bg-gray-3 hover:text-text-primary'
                  )}
                >
                  {item.icon}
                  {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
                  {!collapsed && item.badge != null && <Badge variant="primary">{item.badge}</Badge>}
                  {collapsed && item.badge != null && (
                    <span className="absolute right-1 top-1 h-sm w-sm rounded-full bg-primary-6 ring-2 ring-card" aria-label={`${item.badge} unread`} />
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="flex flex-col gap-xxs border-t border-gray-4 px-md py-md">
        {bottomLinks.map((link) => (
          <button
            key={link.id}
            type="button"
            title={collapsed ? link.label : undefined}
            className={cx(
              'flex items-center gap-sm rounded-xs px-sm py-sm text-body text-text-secondary transition-colors hover:bg-gray-3 hover:text-text-primary',
              collapsed && 'justify-center'
            )}
          >
            {link.icon}
            {!collapsed && (
              <>
                <span className="flex-1 text-left">{link.label}</span>
                <IconChevronRight className="text-gray-6" />
              </>
            )}
          </button>
        ))}
        <button
          type="button"
          className={cx(
            'mt-xs flex items-center gap-sm rounded-xs p-xs text-left transition-colors hover:bg-gray-3',
            collapsed && 'justify-center'
          )}
        >
          <Avatar name={user.name} src={user.src} size="md" />
          {!collapsed && (
            <>
              <span className="flex flex-1 flex-col overflow-hidden">
                <span className="truncate text-caption font-semibold text-text-primary">{user.name}</span>
                <span className="truncate text-caption text-text-secondary">{user.role}</span>
              </span>
              <IconChevronRight className="shrink-0 text-gray-6" />
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
