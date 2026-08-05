import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { IconSpinner } from './icons';

export type ButtonVariant = 'primary' | 'stroke' | 'stroke-gray' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  iconOnly?: boolean;
  icon?: ReactNode;
  children?: ReactNode;
  // Escape hatch for compound components (ButtonGroup, SplitButton) that
  // need to zero out one side's radius to visually join buttons — replaces
  // the default radius-xs entirely rather than layering a conflicting
  // rounded-* class on top of it.
  radiusClassName?: string;
}

// Buttons are capped at radius-xs (4px) too, same ceiling as inputs.
const RADIUS = 'rounded-xs';

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-md py-xs text-caption gap-xs',
  md: 'px-lg py-sm text-body gap-sm',
  lg: 'px-xl py-md text-title gap-sm',
};

const ICON_ONLY_SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'p-xs',
  md: 'p-sm',
  lg: 'p-md',
};

// on-primary text needs to read white against primary-6; tokens.json has no
// dedicated "on-primary" text token, so `card` (#ffffff) is reused here as
// the closest real token for that value.
const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: cx(
    'bg-primary-6 text-card border border-transparent',
    'hover:bg-primary-7 active:bg-primary-8',
    'disabled:bg-gray-3 disabled:text-gray-7'
  ),
  stroke: cx(
    'bg-transparent text-primary-6 border border-primary-6',
    'hover:bg-primary-0 hover:text-primary-7 hover:border-primary-7',
    'active:bg-primary-1 active:border-primary-8',
    'disabled:border-gray-6 disabled:text-gray-8 disabled:bg-transparent'
  ),
  // Neutral/gray outline — a secondary action that shouldn't compete with
  // the brand-colored stroke variant above (e.g. "Cancel" next to a primary
  // "Save").
  'stroke-gray': cx(
    'bg-transparent text-text-primary border border-gray-5',
    'hover:border-gray-6 hover:bg-gray-3',
    'active:bg-gray-4 active:border-gray-6',
    'disabled:border-gray-5 disabled:text-text-disabled disabled:bg-transparent'
  ),
  ghost: cx(
    'bg-transparent text-text-primary border border-transparent',
    'hover:bg-gray-3 active:bg-gray-4',
    'disabled:text-text-disabled disabled:bg-transparent'
  ),
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  iconOnly = false,
  icon,
  disabled,
  children,
  className,
  radiusClassName,
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cx(
        'inline-flex items-center justify-center font-sans font-medium transition-colors',
        'disabled:cursor-not-allowed',
        radiusClassName ?? RADIUS,
        iconOnly ? ICON_ONLY_SIZE_CLASSES[size] : SIZE_CLASSES[size],
        VARIANT_CLASSES[variant],
        className
      )}
      {...rest}
    >
      {loading ? <IconSpinner /> : icon}
      {!iconOnly && children}
    </button>
  );
}
