import { useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cx } from '../../lib/cx';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  size?: InputSize;
}

const RADIUS = 'rounded-sg2-sm';

const SIZE_CLASSES: Record<InputSize, string> = {
  sm: 'px-sg2-sm py-sg2-xs text-sg2-caption',
  md: 'px-sg2-md py-sg2-sm text-sg2-body-md',
  lg: 'px-sg2-lg py-sg2-md text-sg2-body-lg',
};

export function Input({ label, helperText, error, disabled, size = 'md', className, id, ...rest }: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const hasError = Boolean(error);

  return (
    <div className="flex flex-col gap-sg2-xs">
      {label && (
        <label htmlFor={inputId} className="text-sg2-caption font-medium text-sg2-text-secondary">
          {label}
        </label>
      )}
      <input
        id={inputId}
        disabled={disabled}
        aria-invalid={hasError || undefined}
        className={cx(
          'w-full border text-sg2-text-primary outline-none transition-colors',
          'placeholder:text-sg2-gray-500',
          RADIUS,
          SIZE_CLASSES[size],
          disabled
            ? 'cursor-not-allowed border-sg2-gray-300 bg-sg2-bg-well text-sg2-text-disabled'
            : hasError
              ? 'border-sg2-danger-60 bg-sg2-bg-card focus:ring-4 focus:ring-sg2-danger-60/15'
              : 'border-sg2-gray-300 bg-sg2-bg-card focus:border-sg2-primary-100 focus:ring-4 focus:ring-sg2-focus-ring/15',
          className
        )}
        {...rest}
      />
      {(helperText || error) && (
        <span className={cx('text-sg2-caption', hasError ? 'text-sg2-danger-90' : 'text-sg2-text-secondary')}>
          {error || helperText}
        </span>
      )}
    </div>
  );
}
