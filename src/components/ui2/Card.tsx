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

const RADIUS = 'rounded-sg2-sm';

export function Card({ title, subtitle, actions, footer, children, className }: CardProps) {
  return (
    <div className={cx('flex flex-col border border-sg2-gray-200 bg-sg2-bg-card', RADIUS, className)}>
      {(title || subtitle || actions) && (
        <div className="flex items-center justify-between gap-sg2-md border-b border-sg2-gray-200 px-sg2-lg py-sg2-md">
          <div className="flex flex-col gap-[2px]">
            {title && <h3 className="text-sg2-body-md font-semibold text-sg2-text-heading">{title}</h3>}
            {subtitle && <p className="text-sg2-caption text-sg2-text-secondary">{subtitle}</p>}
          </div>
          {actions}
        </div>
      )}
      {children && <div className="px-sg2-lg py-sg2-lg text-sg2-body-md text-sg2-text-primary">{children}</div>}
      {footer && <div className="border-t border-sg2-gray-200 px-sg2-lg py-sg2-md">{footer}</div>}
    </div>
  );
}
