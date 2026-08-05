import { useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cx } from '../../lib/cx';

export type SwitchSize = 'sm' | 'md' | 'lg';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  size?: SwitchSize;
}

// Track/knob dimensions per size, each internally consistent:
// trackWidth - knobSize - 2*padding = translate distance. Padding stays
// p-xs at every size (same "frame" thickness) so sm/md/lg read as one
// consistent shape scaled up, not three differently-proportioned switches.
const OUTER_CLASSES: Record<SwitchSize, string> = {
  sm: 'h-3xl w-5xl',
  md: 'h-4xl w-6xl',
  lg: 'h-5xl w-7xl',
};

const KNOB_CLASSES: Record<SwitchSize, string> = {
  sm: 'h-xl w-xl',
  md: 'h-3xl w-3xl',
  lg: 'h-4xl w-4xl',
};

const TRANSLATE_CLASSES: Record<SwitchSize, string> = {
  sm: 'translate-x-xl',
  md: 'translate-x-xl',
  lg: 'translate-x-3xl',
};

const LABEL_TEXT_CLASSES: Record<SwitchSize, string> = {
  sm: 'text-caption',
  md: 'text-body',
  lg: 'text-title',
};

export function Switch({ label, disabled, checked, size = 'md', className, id, ...rest }: SwitchProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <label
      htmlFor={inputId}
      className={cx('inline-flex items-center gap-sm', disabled ? 'cursor-not-allowed' : 'cursor-pointer', className)}
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
            // Track capped at radius-xs (4px), same ceiling as inputs.
            'pointer-events-none absolute inset-0 rounded-xs p-xs transition-colors',
            'peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus-ring',
            disabled ? (checked ? 'bg-primary-2' : 'bg-gray-2') : checked ? 'bg-primary-6' : 'bg-gray-3'
          )}
        >
          <span
            className={cx(
              // Knob is the compact piece — capped at radius-xxs (2px).
              'block rounded-xxs bg-card shadow-sm transition-transform',
              KNOB_CLASSES[size],
              checked && TRANSLATE_CLASSES[size]
            )}
          />
        </span>
      </span>
      {label && (
        <span className={cx(LABEL_TEXT_CLASSES[size], disabled ? 'text-text-disabled' : 'text-text-primary')}>{label}</span>
      )}
    </label>
  );
}
