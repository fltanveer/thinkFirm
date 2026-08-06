import { useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cx } from '../../lib/cx';

export type SwitchSize = 'sm' | 'md' | 'lg';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  size?: SwitchSize;
}

// tokens-old.json's spacing steps are NOT the same pixel values as
// tokens.json's (e.g. old xl=24px vs current xl=16px) — reusing style guide
// 1's exact class names would silently break the knob-fits-track arithmetic
// (outer height - 2*padding = knob size). Recomputed against old's own scale:
// padding stays xs(4px) at every size; outer height - 8 = knob size; outer
// width - knob - 8 = translate distance (one knob-width of travel), each a
// real step in tokens-old.json's spacing scale (sm: 16/8/24/8,
// md: 32/24/56/24, lg: 64/56/128/56).
const OUTER_CLASSES: Record<SwitchSize, string> = {
  sm: 'h-sg2-lg w-sg2-xl',
  md: 'h-sg2-2xl w-sg2-3xl',
  lg: 'h-sg2-4xl w-sg2-7xl',
};

const KNOB_CLASSES: Record<SwitchSize, string> = {
  sm: 'h-sg2-sm w-sg2-sm',
  md: 'h-sg2-xl w-sg2-xl',
  lg: 'h-sg2-3xl w-sg2-3xl',
};

const TRANSLATE_CLASSES: Record<SwitchSize, string> = {
  sm: 'translate-x-sg2-sm',
  md: 'translate-x-sg2-xl',
  lg: 'translate-x-sg2-3xl',
};

const LABEL_TEXT_CLASSES: Record<SwitchSize, string> = {
  sm: 'text-sg2-caption',
  md: 'text-sg2-body-md',
  lg: 'text-sg2-body-lg',
};

export function Switch({ label, disabled, checked, size = 'md', className, id, ...rest }: SwitchProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <label
      htmlFor={inputId}
      className={cx('inline-flex items-center gap-sg2-sm', disabled ? 'cursor-not-allowed' : 'cursor-pointer', className)}
    >
      <span className={cx('relative inline-flex shrink-0 items-center', OUTER_CLASSES[size])}>
        <input
          id={inputId}
          type="checkbox"
          role="switch"
          checked={checked}
          disabled={disabled}
          className="peer absolute inset-0 m-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
          {...rest}
        />
        <span
          aria-hidden
          className={cx(
            'pointer-events-none absolute inset-0 rounded-sg2-sm p-sg2-xs transition-colors',
            'peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-sg2-focus-ring',
            disabled ? (checked ? 'bg-sg2-primary-30' : 'bg-sg2-gray-200') : checked ? 'bg-sg2-primary-100' : 'bg-sg2-gray-300'
          )}
        >
          <span
            className={cx(
              'block rounded-sg2-xs bg-sg2-bg-card shadow-sg2-sm transition-transform',
              KNOB_CLASSES[size],
              checked && TRANSLATE_CLASSES[size]
            )}
          />
        </span>
      </span>
      {label && (
        <span className={cx(LABEL_TEXT_CLASSES[size], disabled ? 'text-sg2-text-disabled' : 'text-sg2-text-primary')}>{label}</span>
      )}
    </label>
  );
}
