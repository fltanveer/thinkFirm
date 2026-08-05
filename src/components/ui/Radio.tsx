import { useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cx } from '../../lib/cx';

export type RadioSize = 'sm' | 'md' | 'lg';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  size?: RadioSize;
}

// A radio's circular shape is intrinsic to the control (same reasoning as
// the switch pill originally) — not a corner-radius call, so it isn't
// subject to the input radius-xs/xxs ceiling.
const RADIUS = 'rounded-full';

const BOX_SIZE_CLASSES: Record<RadioSize, string> = {
  sm: 'h-lg w-lg',
  md: 'h-xl w-xl',
  lg: 'h-2xl w-2xl',
};

const DOT_SIZE_CLASSES: Record<RadioSize, string> = {
  sm: 'h-xs w-xs',
  md: 'h-sm w-sm',
  lg: 'h-md w-md',
};

const LABEL_TEXT_CLASSES: Record<RadioSize, string> = {
  sm: 'text-caption',
  md: 'text-body',
  lg: 'text-title',
};

export function Radio({ label, disabled, size = 'md', className, id, checked, ...rest }: RadioProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <label
      htmlFor={inputId}
      className={cx('inline-flex items-center gap-sm', disabled ? 'cursor-not-allowed' : 'cursor-pointer', className)}
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
            'peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus-ring',
            disabled
              ? checked
                ? 'border-gray-6 bg-gray-3'
                : 'border-gray-6 bg-gray-3'
              : checked
                ? 'border-primary-6 bg-card'
                : 'border-gray-5 bg-card'
          )}
        >
          {checked && (
            <span
              className={cx('rounded-full', DOT_SIZE_CLASSES[size], disabled ? 'bg-gray-6' : 'bg-primary-6')}
            />
          )}
        </span>
      </span>
      {label && (
        <span className={cx(LABEL_TEXT_CLASSES[size], disabled ? 'text-text-disabled' : 'text-text-primary')}>
          {label}
        </span>
      )}
    </label>
  );
}
