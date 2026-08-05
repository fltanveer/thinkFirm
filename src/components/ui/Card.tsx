import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface CardProps {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
}

// HARD CONSTRAINT: capped at radius-xs (4px), same ceiling as every other
// component.
const RADIUS = 'rounded-xs';

export function Card({ title, subtitle, actions, footer, children, className }: CardProps) {
  return (
    <div className={cx('flex flex-col border border-gray-4 bg-card', RADIUS, className)}>
      {(title || subtitle || actions) && (
        <div className="flex items-center justify-between gap-md border-b border-gray-4 px-lg py-md">
          <div className="flex flex-col gap-[2px]">
            {title && <h3 className="text-body font-semibold text-text-heading">{title}</h3>}
            {subtitle && <p className="text-caption text-text-secondary">{subtitle}</p>}
          </div>
          {actions}
        </div>
      )}
      {children && <div className="px-lg py-lg text-body text-text-primary">{children}</div>}
      {footer && <div className="border-t border-gray-4 px-lg py-md">{footer}</div>}
    </div>
  );
}
