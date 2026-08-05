import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';

export type BadgeVariant = 'primary' | 'neutral' | 'error' | 'warning' | 'success' | 'info';

export interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

// Compact count/label badge — capped at radius-xxs (2px), same as pills.
const RADIUS = 'rounded-xxs';

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  primary: 'bg-primary-6 text-card',
  neutral: 'bg-gray-6 text-card',
  error: 'bg-error-base text-card',
  warning: 'bg-warning-base text-card',
  success: 'bg-success-base text-card',
  info: 'bg-info-base text-card',
};

export function Badge({ variant = 'primary', children, className }: BadgeProps) {
  return (
    <span
      className={cx(
        'inline-flex min-w-[1.1rem] items-center justify-center px-xxs py-[1px] text-caption font-medium',
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

// A standalone status/unread dot — fully circular, same exemption as radio
// dots and the confirm-modal icon circle (shape-intrinsic, not a
// corner-radius call).
export function BadgeDot({ variant = 'error', className }: BadgeDotProps) {
  const dotClass: Record<BadgeVariant, string> = {
    primary: 'bg-primary-6',
    neutral: 'bg-gray-6',
    error: 'bg-error-base',
    warning: 'bg-warning-base',
    success: 'bg-success-base',
    info: 'bg-info-base',
  };
  return <span className={cx('inline-block h-sm w-sm rounded-full ring-2 ring-card', dotClass[variant], className)} />;
}
