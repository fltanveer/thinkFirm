import { cx } from '../../lib/cx';

export type ProgressVariant = 'primary' | 'success' | 'warning' | 'error' | 'info';
export type ProgressSize = 'sm' | 'md';

export interface ProgressBarProps {
  value?: number;
  max?: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  label?: string;
  showValue?: boolean;
  indeterminate?: boolean;
  className?: string;
}

const RADIUS = 'rounded-sg2-sm';

const HEIGHT_CLASSES: Record<ProgressSize, string> = {
  sm: 'h-sg2-xxs',
  md: 'h-sg2-xs',
};

const FILL_CLASSES: Record<ProgressVariant, string> = {
  primary: 'bg-sg2-primary-100',
  success: 'bg-sg2-success-60',
  warning: 'bg-sg2-warning-60',
  error: 'bg-sg2-danger-60',
  info: 'bg-sg2-info-60',
};

export function ProgressBar({
  value = 0,
  max = 100,
  variant = 'primary',
  size = 'md',
  label,
  showValue = false,
  indeterminate = false,
  className,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cx('flex flex-col gap-sg2-xs', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between text-sg2-caption text-sg2-text-secondary">
          {label && <span>{label}</span>}
          {showValue && !indeterminate && <span>{Math.round(pct)}%</span>}
        </div>
      )}
      <div
        className={cx('w-full overflow-hidden bg-sg2-gray-200', RADIUS, HEIGHT_CLASSES[size])}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={cx(
            'h-full',
            RADIUS,
            FILL_CLASSES[variant],
            indeterminate ? 'w-1/3 animate-progress-indeterminate' : 'transition-[width] duration-300'
          )}
          style={indeterminate ? undefined : { width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
