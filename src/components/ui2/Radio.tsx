import { useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cx } from '../../lib/cx';

export type RadioSize = 'sm' | 'md' | 'lg';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  size?: RadioSize;
}

// Circular shape is intrinsic to the control, not a corner-radius call — same
// exemption as style guide 1.
const RADIUS = 'rounded-full';

const BOX_SIZE_CLASSES: Record<RadioSize, string> = {
  sm: 'h-sg2-lg w-sg2-lg',
  md: 'h-sg2-xl w-sg2-xl',
  lg: 'h-sg2-2xl w-sg2-2xl',
};

const DOT_SIZE_CLASSES: Record<RadioSize, string> = {
  sm: 'h-sg2-xs w-sg2-xs',
  md: 'h-sg2-sm w-sg2-sm',
  lg: 'h-sg2-md w-sg2-md',
};

const LABEL_TEXT_CLASSES: Record<RadioSize, string> = {
  sm: 'text-sg2-caption',
  md: 'text-sg2-body-md',
  lg: 'text-sg2-body-lg',
};

export function Radio({ label, disabled, size = 'md', className, id, checked, ...rest }: RadioProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <label
      htmlFor={inputId}
      className={cx('inline-flex items-center gap-sg2-sm', disabled ? 'cursor-not-allowed' : 'cursor-pointer', className)}
    >
      <span className={cx('relative inline-flex shrink-0 items-center justify-center', BOX_SIZE_CLASSES[size])}>
        <input
          id={inputId}
          type="radio"
          checked={checked}
          disabled={disabled}
          className="peer absolute inset-0 m-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
          {...rest}
        />
        <span
          aria-hidden
          className={cx(
            'pointer-events-none absolute inset-0 flex items-center justify-center border transition-colors',
            RADIUS,
            'peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-sg2-focus-ring',
            disabled
              ? checked
                ? 'border-sg2-gray-400 bg-sg2-gray-300'
                : 'border-sg2-gray-400 bg-sg2-gray-300'
              : checked
                ? 'border-sg2-primary-100 bg-sg2-bg-card'
                : 'border-sg2-gray-300 bg-sg2-bg-card'
          )}
        >
          {checked && (
            <span
              className={cx('rounded-full', DOT_SIZE_CLASSES[size], disabled ? 'bg-sg2-gray-400' : 'bg-sg2-primary-100')}
            />
          )}
        </span>
      </span>
      {label && (
        <span className={cx(LABEL_TEXT_CLASSES[size], disabled ? 'text-sg2-text-disabled' : 'text-sg2-text-primary')}>
          {label}
        </span>
      )}
    </label>
  );
}
