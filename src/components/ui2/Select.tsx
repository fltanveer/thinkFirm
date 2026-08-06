import { useId } from 'react';
import type { SelectHTMLAttributes } from 'react';
import { cx } from '../../lib/cx';
import { IconChevronDown } from '../ui/icons';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  size?: SelectSize;
}

const RADIUS = 'rounded-sg2-sm';

const SIZE_CLASSES: Record<SelectSize, string> = {
  sm: 'px-sg2-sm py-sg2-xs pr-sg2-xl text-sg2-caption',
  md: 'px-sg2-md py-sg2-sm pr-sg2-2xl text-sg2-body-md',
  lg: 'px-sg2-lg py-sg2-md pr-sg2-3xl text-sg2-body-lg',
};

const ICON_POSITION: Record<SelectSize, string> = {
  sm: 'right-sg2-xs',
  md: 'right-sg2-sm',
  lg: 'right-sg2-sm',
};

export function Select({ label, helperText, error, disabled, size = 'md', className, id, children, ...rest }: SelectProps) {
  const autoId = useId();
  const selectId = id ?? autoId;
  const hasError = Boolean(error);

  return (
    <div className="flex flex-col gap-sg2-xs">
      {label && (
        <label htmlFor={selectId} className="text-sg2-caption font-medium text-sg2-text-secondary">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          className={cx(
            'w-full appearance-none border bg-sg2-bg-card text-sg2-text-primary outline-none transition-colors',
            RADIUS,
            SIZE_CLASSES[size],
            disabled
              ? 'cursor-not-allowed border-sg2-gray-300 bg-sg2-bg-well text-sg2-text-disabled'
              : hasError
                ? 'border-sg2-danger-60 focus:ring-4 focus:ring-sg2-danger-60/15'
                : 'border-sg2-gray-300 focus:border-sg2-primary-100 focus:ring-4 focus:ring-sg2-focus-ring/15',
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
            disabled ? 'text-sg2-text-disabled' : 'text-sg2-gray-500'
          )}
        />
      </div>
      {(helperText || error) && (
        <span className={cx('text-sg2-caption', hasError ? 'text-sg2-danger-90' : 'text-sg2-text-secondary')}>
          {error || helperText}
        </span>
      )}
    </div>
  );
}
