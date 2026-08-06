import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';

export type BadgeVariant = 'primary' | 'neutral' | 'error' | 'warning' | 'success' | 'info';

export interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const RADIUS = 'rounded-sg2-xs';

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  primary: 'bg-sg2-primary-100 text-sg2-text-on-primary',
  neutral: 'bg-sg2-gray-400 text-sg2-text-on-primary',
  error: 'bg-sg2-danger-60 text-sg2-text-on-primary',
  warning: 'bg-sg2-warning-60 text-sg2-text-on-primary',
  success: 'bg-sg2-success-60 text-sg2-text-on-primary',
  info: 'bg-sg2-info-60 text-sg2-text-on-primary',
};

export function Badge({ variant = 'primary', children, className }: BadgeProps) {
  return (
    <span
      className={cx(
        'inline-flex min-w-[1.1rem] items-center justify-center px-sg2-xxs py-[1px] text-sg2-caption font-medium',
        RADIUS,
        VARIANT_CLASSES[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export interface BadgeDotProps {
  variant?: BadgeVariant;
  className?: string;
}

export function BadgeDot({ variant = 'error', className }: BadgeDotProps) {
  const dotClass: Record<BadgeVariant, string> = {
    primary: 'bg-sg2-primary-100',
    neutral: 'bg-sg2-gray-400',
    error: 'bg-sg2-danger-60',
    warning: 'bg-sg2-warning-60',
    success: 'bg-sg2-success-60',
    info: 'bg-sg2-info-60',
  };
  return <span className={cx('inline-block h-sg2-sm w-sg2-sm rounded-full ring-2 ring-sg2-bg-card', dotClass[variant], className)} />;
}
