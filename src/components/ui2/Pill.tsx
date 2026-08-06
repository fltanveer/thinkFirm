import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';

export type PillVariant = 'neutral' | 'primary' | 'error' | 'warning' | 'success' | 'info';

export interface PillProps {
  variant?: PillVariant;
  dot?: boolean;
  children: ReactNode;
  className?: string;
}

const RADIUS = 'rounded-sg2-xs';

const VARIANT_CLASSES: Record<PillVariant, string> = {
  neutral: 'border-sg2-gray-200 bg-sg2-gray-100 text-sg2-text-secondary',
  primary: 'border-sg2-primary-50 bg-sg2-primary-30 text-sg2-primary-90',
  error: 'border-sg2-danger-30 bg-sg2-danger-10 text-sg2-danger-90',
  warning: 'border-sg2-warning-30 bg-sg2-warning-10 text-sg2-warning-90',
  success: 'border-sg2-success-30 bg-sg2-success-10 text-sg2-success-90',
  info: 'border-sg2-info-30 bg-sg2-info-10 text-sg2-info-90',
};

const DOT_CLASSES: Record<PillVariant, string> = {
  neutral: 'bg-sg2-gray-400',
  primary: 'bg-sg2-primary-100',
  error: 'bg-sg2-danger-60',
  warning: 'bg-sg2-warning-60',
  success: 'bg-sg2-success-60',
  info: 'bg-sg2-info-60',
};

export function Pill({ variant = 'neutral', dot = false, children, className }: PillProps) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-sg2-xxs border px-sg2-sm py-[2px] text-sg2-caption font-medium',
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
