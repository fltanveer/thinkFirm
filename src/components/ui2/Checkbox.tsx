import { useEffect, useId, useRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cx } from '../../lib/cx';
import { IconCheck, IconMinus } from '../ui/icons';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  indeterminate?: boolean;
  label?: string;
  size?: CheckboxSize;
}

// tokens-old.json's radius-xs (2px) plays the role tokens.json's radius-xxs
// plays — the compact-control ceiling, different step name.
const RADIUS = 'rounded-sg2-xs';

const BOX_SIZE_CLASSES: Record<CheckboxSize, string> = {
  sm: 'h-sg2-lg w-sg2-lg',
  md: 'h-sg2-xl w-sg2-xl',
  lg: 'h-sg2-2xl w-sg2-2xl',
};

const ICON_SIZE: Record<CheckboxSize, number> = {
  sm: 9,
  md: 12,
  lg: 15,
};

const LABEL_TEXT_CLASSES: Record<CheckboxSize, string> = {
  sm: 'text-sg2-caption',
  md: 'text-sg2-body-md',
  lg: 'text-sg2-body-lg',
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
      className={cx('inline-flex items-center gap-sg2-sm', disabled ? 'cursor-not-allowed' : 'cursor-pointer', className)}
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
            'peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-sg2-focus-ring',
            disabled
              ? active
                ? 'border-sg2-gray-400 bg-sg2-gray-400 text-sg2-gray-600'
                : 'border-sg2-gray-400 bg-sg2-gray-200 text-transparent'
              : active
                ? 'border-sg2-primary-100 bg-sg2-primary-100 text-sg2-text-on-primary'
                : 'border-sg2-gray-300 bg-sg2-bg-card text-transparent'
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
        <span className={cx(LABEL_TEXT_CLASSES[size], disabled ? 'text-sg2-text-disabled' : 'text-sg2-text-primary')}>
          {label}
        </span>
      )}
    </label>
  );
}
