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

const RADIUS = 'rounded-sg2-sm';
const BADGE_RADIUS = 'rounded-sg2-xs';

export function Tabs({ variant, items, value, onChange, className }: TabsProps) {
  if (variant === 'segmented') {
    return (
      <div className={cx('inline-flex gap-sg2-xxs bg-sg2-gray-200 p-sg2-xxs', RADIUS, className)} role="tablist">
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
                'flex-1 whitespace-nowrap px-sg2-lg py-sg2-xs text-sg2-body-md transition-colors',
                RADIUS,
                item.disabled
                  ? 'cursor-not-allowed text-sg2-text-disabled'
                  : active
                    ? 'bg-sg2-bg-card text-sg2-text-primary shadow-sg2-xs'
                    : 'text-sg2-text-secondary hover:text-sg2-text-primary'
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
      <div className={cx('flex gap-sg2-xxs border-b border-sg2-gray-200', className)} role="tablist">
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
                'rounded-t-sg2-sm border border-b-0 px-sg2-lg py-sg2-sm text-sg2-body-md transition-colors',
                item.disabled
                  ? 'cursor-not-allowed border-transparent bg-transparent text-sg2-text-disabled'
                  : active
                    ? 'border-sg2-gray-200 bg-sg2-bg-card text-sg2-text-primary'
                    : 'border-transparent bg-sg2-gray-100 text-sg2-text-secondary hover:text-sg2-text-primary'
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === 'icon-filled') {
    return (
      <div className={cx('relative flex gap-sg2-xs border-b border-sg2-gray-200', className)} role="tablist">
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
                'relative inline-flex items-center gap-sg2-xs px-sg2-md py-sg2-sm text-sg2-body-md font-medium transition-colors',
                RADIUS,
                item.disabled
                  ? 'cursor-not-allowed text-sg2-text-disabled'
                  : active
                    ? 'bg-sg2-primary-30 text-sg2-primary-100'
                    : 'text-sg2-text-secondary hover:bg-sg2-gray-200 hover:text-sg2-text-primary'
              )}
            >
              {item.icon}
              {item.label}
              {item.badge != null && (
                <span
                  className={cx(
                    'inline-flex min-w-[1.1rem] items-center justify-center bg-sg2-primary-100 px-sg2-xxs py-[1px] text-sg2-caption text-sg2-text-on-primary',
                    BADGE_RADIUS
                  )}
                >
                  {item.badge}
                </span>
              )}
              {active && !item.disabled && (
                <span className="absolute inset-x-0 -bottom-px h-[2px] bg-sg2-primary-100" aria-hidden />
              )}
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === 'icon-pill') {
    return (
      <div className={cx('flex gap-sg2-xs', className)} role="tablist">
        {items.map((item) => {
          const active = item.value === value;
          return (
            <div key={item.value} className="flex flex-col items-stretch gap-sg2-md">
              <button
                type="button"
                role="tab"
                aria-selected={active}
                disabled={item.disabled}
                onClick={() => onChange(item.value)}
                className={cx(
                  'inline-flex items-center gap-sg2-xs px-sg2-md py-sg2-sm text-sg2-body-md font-medium transition-colors',
                  RADIUS,
                  item.disabled
                    ? 'cursor-not-allowed text-sg2-text-disabled'
                    : active
                      ? 'bg-sg2-gray-100 text-sg2-primary-100'
                      : 'text-sg2-text-secondary hover:bg-sg2-gray-200 hover:text-sg2-text-primary'
                )}
              >
                {item.icon}
                {item.label}
                {item.badge != null && (
                  <span
                    className={cx(
                      'inline-flex min-w-[1.1rem] items-center justify-center bg-sg2-primary-100 px-sg2-xxs py-[1px] text-sg2-caption text-sg2-text-on-primary',
                      BADGE_RADIUS
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
              <span className={cx('h-[3px] w-full', active && !item.disabled ? 'bg-sg2-primary-100' : 'bg-transparent')} aria-hidden />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cx('flex gap-sg2-xl border-b border-sg2-gray-200', className)} role="tablist">
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
              'border-b-2 px-sg2-xs pb-sg2-sm text-sg2-body-md transition-colors',
              item.disabled
                ? 'cursor-not-allowed border-transparent text-sg2-text-disabled'
                : active
                  ? 'border-sg2-primary-100 text-sg2-primary-100'
                  : 'border-transparent text-sg2-text-secondary hover:text-sg2-text-primary'
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
