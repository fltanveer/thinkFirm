import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';

export type PillVariant = 'neutral' | 'primary' | 'error' | 'warning' | 'success' | 'info';

export interface PillProps {
  variant?: PillVariant;
  dot?: boolean;
  children: ReactNode;
  className?: string;
}

// Compact status label — capped at radius-xxs (2px), same as checkboxes and
// tag chips (never radius-xs or larger).
const RADIUS = 'rounded-xxs';

const VARIANT_CLASSES: Record<PillVariant, string> = {
  neutral: 'border-gray-4 bg-gray-3 text-text-secondary',
  primary: 'border-primary-2 bg-primary-0 text-primary-7',
  error: 'border-error-border bg-error-bg text-error-text',
  warning: 'border-warning-border bg-warning-bg text-warning-text',
  success: 'border-success-border bg-success-bg text-success-text',
  info: 'border-info-border bg-info-bg text-info-text',
};

const DOT_CLASSES: Record<PillVariant, string> = {
  neutral: 'bg-gray-6',
  primary: 'bg-primary-6',
  error: 'bg-error-base',
  warning: 'bg-warning-base',
  success: 'bg-success-base',
  info: 'bg-info-base',
};

export function Pill({ variant = 'neutral', dot = false, children, className }: PillProps) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-xxs border px-sm py-[2px] text-caption font-medium',
        RADIUS,
        VARIANT_CLASSES[variant],
        className
      )}
    >
      {dot && <span className={cx('h-[6px] w-[6px] rounded-full', DOT_CLASSES[variant])} aria-hidden />}
      {children}
    </span>
  );
}
