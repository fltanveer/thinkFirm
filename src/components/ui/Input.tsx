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

// HARD CONSTRAINT: inputs/selects/dropdowns cap at radius-xs (4px) — never
// larger, even where a "default" larger radius pattern exists elsewhere.
// The cap is a ceiling, not a per-size value, so it doesn't vary with size.
const RADIUS = 'rounded-xs';

const SIZE_CLASSES: Record<InputSize, string> = {
  sm: 'px-sm py-xs text-caption',
  md: 'px-md py-sm text-body',
  lg: 'px-lg py-md text-title',
};

export function Input({ label, helperText, error, disabled, size = 'md', className, id, ...rest }: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const hasError = Boolean(error);

  return (
    <div className="flex flex-col gap-xs">
      {label && (
        <label htmlFor={inputId} className="text-caption font-medium text-text-secondary">
          {label}
        </label>
      )}
      <input
        id={inputId}
        disabled={disabled}
        aria-invalid={hasError || undefined}
        className={cx(
          'w-full border text-text-primary outline-none transition-colors',
          'placeholder:text-gray-7',
          RADIUS,
          SIZE_CLASSES[size],
          // focus-ring/error-base rings render at low opacity (a soft glow
          // around the border) rather than a solid ring, which read as too
          // heavy at full strength.
          disabled
            ? 'cursor-not-allowed border-gray-5 bg-well text-text-disabled'
            : hasError
              ? 'border-error-base bg-card focus:ring-4 focus:ring-error-base/15'
              : 'border-gray-5 bg-card focus:border-primary-6 focus:ring-4 focus:ring-focus-ring/15',
          className
        )}
        {...rest}
      />
      {(helperText || error) && (
        <span className={cx('text-caption', hasError ? 'text-error-text' : 'text-text-secondary')}>
          {error || helperText}
        </span>
      )}
    </div>
  );
}
