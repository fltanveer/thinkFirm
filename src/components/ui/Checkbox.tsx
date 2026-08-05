import { useEffect, useId, useRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cx } from '../../lib/cx';
import { IconCheck, IconMinus } from './icons';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  indeterminate?: boolean;
  label?: string;
  size?: CheckboxSize;
}

// Compact control — capped at radius-xxs (2px), never larger. The cap is a
// ceiling, not a per-size value, so it doesn't vary with size.
const RADIUS = 'rounded-xxs';

const BOX_SIZE_CLASSES: Record<CheckboxSize, string> = {
  sm: 'h-lg w-lg',
  md: 'h-xl w-xl',
  lg: 'h-2xl w-2xl',
};

const ICON_SIZE: Record<CheckboxSize, number> = {
  sm: 9,
  md: 12,
  lg: 15,
};

const LABEL_TEXT_CLASSES: Record<CheckboxSize, string> = {
  sm: 'text-caption',
  md: 'text-body',
  lg: 'text-title',
};

export function Checkbox({
  indeterminate = false,
  label,
  disabled,
  size = 'md',
  className,
  id,
  checked,
  ...rest
}: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null);
  const autoId = useId();
  const inputId = id ?? autoId;

  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const active = checked || indeterminate;
  const iconSize = ICON_SIZE[size];

  return (
    <label
      htmlFor={inputId}
      className={cx('inline-flex items-center gap-sm', disabled ? 'cursor-not-allowed' : 'cursor-pointer', className)}
    >
      <span className={cx('relative inline-flex shrink-0 items-center justify-center', BOX_SIZE_CLASSES[size])}>
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
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
              ? active
                ? 'border-gray-6 bg-gray-6 text-gray-8'
                : 'border-gray-6 bg-gray-3 text-transparent'
              : active
                ? 'border-primary-6 bg-primary-6 text-card'
                : 'border-gray-5 bg-card text-transparent'
          )}
        >
          {indeterminate ? (
            <IconMinus width={iconSize} height={iconSize} strokeWidth={2} />
          ) : (
            <IconCheck width={iconSize} height={iconSize} strokeWidth={2} />
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
