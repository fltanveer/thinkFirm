import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { IconX } from './icons';

export interface ChipProps {
  icon?: ReactNode;
  children: ReactNode;
  active?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
  className?: string;
}

// Interactive filter tag — capped at radius-xxs (2px), same as Pill/Badge
// (never radius-xs or larger).
const RADIUS = 'rounded-xxs';

export function Chip({ icon, children, active = false, onRemove, onClick, className }: ChipProps) {
  const Tag = onClick ? 'button' : 'span';
  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={cx(
        'inline-flex items-center gap-xs border px-sm py-xs text-caption font-medium transition-colors',
        RADIUS,
        active
          ? 'border-primary-2 bg-primary-0 text-primary-7'
          : 'border-gray-5 bg-card text-text-primary hover:bg-gray-3',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {icon}
      {children}
      {onRemove && (
        <button
          type="button"
          aria-label="Remove filter"
          className={cx('text-gray-7 hover:text-text-primary', active && 'text-primary-6 hover:text-primary-8')}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <IconX width={11} height={11} strokeWidth={2} />
        </button>
      )}
    </Tag>
  );
}
