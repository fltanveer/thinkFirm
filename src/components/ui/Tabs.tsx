import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface TabItem {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: ReactNode;
  badge?: string | number;
}

export interface TabsProps {
  variant: 'underline' | 'segmented' | 'boxed' | 'icon-filled' | 'icon-pill';
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

// HARD CONSTRAINT: every component caps at radius-xs (4px) — nothing on
// this page uses a larger radius. Compact pieces (badges, chips) go smaller
// still, at radius-xxs (2px), same as elsewhere. Fully circular shapes
// (radio dots) aren't a "corner radius" call and sit outside this rule.
const RADIUS = 'rounded-xs';
const BADGE_RADIUS = 'rounded-xxs';

export function Tabs({ variant, items, value, onChange, className }: TabsProps) {
  if (variant === 'segmented') {
    return (
      <div className={cx('inline-flex gap-xxs bg-gray-3 p-xxs', RADIUS, className)} role="tablist">
        {items.map((item) => {
          const active = item.value === value;
          return (
            <button
              key={item.value}
              type="button"
              role="tab"
              aria-selected={active}
              disabled={item.disabled}
              onClick={() => onChange(item.value)}
              className={cx(
                'flex-1 whitespace-nowrap px-lg py-xs text-body transition-colors',
                RADIUS,
                item.disabled
                  ? 'cursor-not-allowed text-text-disabled'
                  : active
                    ? 'bg-card text-text-primary shadow-xs'
                    : 'text-text-secondary hover:text-text-primary'
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === 'boxed') {
    return (
      <div className={cx('flex gap-xxs border-b border-gray-4', className)} role="tablist">
        {items.map((item) => {
          const active = item.value === value;
          return (
            <button
              key={item.value}
              type="button"
              role="tab"
              aria-selected={active}
              disabled={item.disabled}
              onClick={() => onChange(item.value)}
              className={cx(
                'rounded-t-xs border border-b-0 px-lg py-sm text-body transition-colors',
                item.disabled
                  ? 'cursor-not-allowed border-transparent bg-transparent text-text-disabled'
                  : active
                    ? 'border-gray-4 bg-card text-text-primary'
                    : 'border-transparent bg-gray-2 text-text-secondary hover:text-text-primary'
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    );
  }

  // icon-filled: active state gets a color-tinted fill plus a short
  // underline bar flush with the shared baseline, under just that tab.
  if (variant === 'icon-filled') {
    return (
      <div className={cx('relative flex gap-xs border-b border-gray-4', className)} role="tablist">
        {items.map((item) => {
          const active = item.value === value;
          return (
            <button
              key={item.value}
              type="button"
              role="tab"
              aria-selected={active}
              disabled={item.disabled}
              onClick={() => onChange(item.value)}
              className={cx(
                'relative inline-flex items-center gap-xs px-md py-sm text-body font-medium transition-colors',
                RADIUS,
                item.disabled
                  ? 'cursor-not-allowed text-text-disabled'
                  : active
                    ? 'bg-primary-0 text-primary-6'
                    : 'text-text-secondary hover:bg-gray-3 hover:text-text-primary'
              )}
            >
              {item.icon}
              {item.label}
              {item.badge != null && (
                <span
                  className={cx(
                    'inline-flex min-w-[1.1rem] items-center justify-center bg-primary-6 px-xxs py-[1px] text-caption text-card',
                    BADGE_RADIUS
                  )}
                >
                  {item.badge}
                </span>
              )}
              {active && !item.disabled && (
                <span className="absolute inset-x-0 -bottom-px h-[2px] bg-primary-6" aria-hidden />
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // icon-pill: neutral gray fill, icon+label turn primary blue when active,
  // and a separate full-width underline bar sits below with a visible gap
  // (not flush against the pill) — no shared baseline divider.
  if (variant === 'icon-pill') {
    return (
      <div className={cx('flex gap-xs', className)} role="tablist">
        {items.map((item) => {
          const active = item.value === value;
          return (
            <div key={item.value} className="flex flex-col items-stretch gap-md">
              <button
                type="button"
                role="tab"
                aria-selected={active}
                disabled={item.disabled}
                onClick={() => onChange(item.value)}
                className={cx(
                  'inline-flex items-center gap-xs px-md py-sm text-body font-medium transition-colors',
                  RADIUS,
                  item.disabled
                    ? 'cursor-not-allowed text-text-disabled'
                    : active
                      ? 'bg-gray-2 text-primary-6'
                      : 'text-text-secondary hover:bg-gray-3 hover:text-text-primary'
                )}
              >
                {item.icon}
                {item.label}
                {item.badge != null && (
                  <span
                    className={cx(
                      'inline-flex min-w-[1.1rem] items-center justify-center bg-primary-6 px-xxs py-[1px] text-caption text-card',
                      BADGE_RADIUS
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
              <span className={cx('h-[3px] w-full', active && !item.disabled ? 'bg-primary-6' : 'bg-transparent')} aria-hidden />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cx('flex gap-xl border-b border-gray-4', className)} role="tablist">
      {items.map((item) => {
        const active = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={active}
            disabled={item.disabled}
            onClick={() => onChange(item.value)}
            className={cx(
              'border-b-2 px-xs pb-sm text-body transition-colors',
              item.disabled
                ? 'cursor-not-allowed border-transparent text-text-disabled'
                : active
                  ? 'border-primary-6 text-primary-6'
                  : 'border-transparent text-text-secondary hover:text-text-primary'
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
