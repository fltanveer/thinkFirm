import { useId } from 'react';
import type { SelectHTMLAttributes } from 'react';
import { cx } from '../../lib/cx';
import { IconChevronDown } from './icons';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  size?: SelectSize;
}

// HARD CONSTRAINT: inputs/selects/dropdowns cap at radius-xs (4px). The cap
// is a ceiling, not a per-size value, so it doesn't vary with size.
const RADIUS = 'rounded-xs';

const SIZE_CLASSES: Record<SelectSize, string> = {
  sm: 'px-sm py-xs pr-xl text-caption',
  md: 'px-md py-sm pr-2xl text-body',
  lg: 'px-lg py-md pr-3xl text-title',
};

const ICON_POSITION: Record<SelectSize, string> = {
  sm: 'right-xs',
  md: 'right-sm',
  lg: 'right-sm',
};

export function Select({ label, helperText, error, disabled, size = 'md', className, id, children, ...rest }: SelectProps) {
  const autoId = useId();
  const selectId = id ?? autoId;
  const hasError = Boolean(error);

  return (
    <div className="flex flex-col gap-xs">
      {label && (
        <label htmlFor={selectId} className="text-caption font-medium text-text-secondary">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          className={cx(
            'w-full appearance-none border bg-card text-text-primary outline-none transition-colors',
            RADIUS,
            SIZE_CLASSES[size],
            disabled
              ? 'cursor-not-allowed border-gray-5 bg-well text-text-disabled'
              : hasError
                ? 'border-error-base focus:ring-4 focus:ring-error-base/15'
                : 'border-gray-5 focus:border-primary-6 focus:ring-4 focus:ring-focus-ring/15',
            className
          )}
          {...rest}
        >
          {children}
        </select>
        <IconChevronDown
          className={cx(
            'pointer-events-none absolute top-1/2 -translate-y-1/2',
            ICON_POSITION[size],
            disabled ? 'text-text-disabled' : 'text-gray-7'
          )}
        />
      </div>
      {(helperText || error) && (
        <span className={cx('text-caption', hasError ? 'text-error-text' : 'text-text-secondary')}>
          {error || helperText}
        </span>
      )}
    </div>
  );
}
