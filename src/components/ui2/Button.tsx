import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { IconSpinner } from '../ui/icons';

export type ButtonVariant = 'primary' | 'stroke' | 'stroke-gray' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  iconOnly?: boolean;
  icon?: ReactNode;
  children?: ReactNode;
  radiusClassName?: string;
}

// tokens-old.json's radius-sm (4px) plays the role tokens.json's radius-xs
// plays — same input/button ceiling, different step name.
const RADIUS = 'rounded-sg2-sm';

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-sg2-md py-sg2-xs text-sg2-caption gap-sg2-xs',
  md: 'px-sg2-lg py-sg2-sm text-sg2-body-md gap-sg2-sm',
  lg: 'px-sg2-xl py-sg2-md text-sg2-body-lg gap-sg2-sm',
};

const ICON_ONLY_SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'p-sg2-xs',
  md: 'p-sg2-sm',
  lg: 'p-sg2-md',
};

// Interactive-States isn't wired in as separate classes — its default/hover/
// pressed steps (primary-100/90/80) are just referenced directly off the
// Primary ramp below.
const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: cx(
    'bg-sg2-primary-100 text-sg2-text-on-primary border border-transparent',
    'hover:bg-sg2-primary-90 active:bg-sg2-primary-80',
    'disabled:bg-sg2-gray-300 disabled:text-sg2-gray-600'
  ),
  stroke: cx(
    'bg-transparent text-sg2-primary-100 border border-sg2-primary-100',
    'hover:bg-sg2-primary-30 hover:text-sg2-primary-90 hover:border-sg2-primary-90',
    'active:bg-sg2-primary-40 active:border-sg2-primary-80',
    'disabled:border-sg2-gray-400 disabled:text-sg2-gray-600 disabled:bg-transparent'
  ),
  'stroke-gray': cx(
    'bg-transparent text-sg2-text-primary border border-sg2-gray-300',
    'hover:border-sg2-gray-400 hover:bg-sg2-gray-200',
    'active:bg-sg2-gray-300 active:border-sg2-gray-400',
    'disabled:border-sg2-gray-300 disabled:text-sg2-text-disabled disabled:bg-transparent'
  ),
  ghost: cx(
    'bg-transparent text-sg2-text-primary border border-transparent',
    'hover:bg-sg2-gray-200 active:bg-sg2-gray-300',
    'disabled:text-sg2-text-disabled disabled:bg-transparent'
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
