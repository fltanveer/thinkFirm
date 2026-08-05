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

// HARD CONSTRAINT: track/fill cap at radius-xs (4px), same as every other
// component.
const RADIUS = 'rounded-xs';

const HEIGHT_CLASSES: Record<ProgressSize, string> = {
  sm: 'h-xxs',
  md: 'h-xs',
};

const FILL_CLASSES: Record<ProgressVariant, string> = {
  primary: 'bg-primary-6',
  success: 'bg-success-base',
  warning: 'bg-warning-base',
  error: 'bg-error-base',
  info: 'bg-info-base',
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
    <div className={cx('flex flex-col gap-xs', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between text-caption text-text-secondary">
          {label && <span>{label}</span>}
          {showValue && !indeterminate && <span>{Math.round(pct)}%</span>}
        </div>
      )}
      <div
        className={cx('w-full overflow-hidden bg-gray-3', RADIUS, HEIGHT_CLASSES[size])}
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
