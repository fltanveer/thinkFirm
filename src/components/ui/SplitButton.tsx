import { useEffect, useRef, useState } from 'react';
import { cx } from '../../lib/cx';
import { Button, type ButtonSize, type ButtonVariant } from './Button';
import { IconChevronDown } from './icons';

export interface SplitButtonOption {
  value: string;
  label: string;
}

export interface SplitButtonProps {
  label: string;
  onClick?: () => void;
  options: SplitButtonOption[];
  onSelect: (value: string) => void;
  variant?: Extract<ButtonVariant, 'primary' | 'stroke' | 'stroke-gray'>;
  size?: ButtonSize;
  disabled?: boolean;
}

// HARD CONSTRAINT: dropdown surface caps at radius-xs (4px), same as every
// other component.
const RADIUS = 'rounded-xs';

export function SplitButton({ label, onClick, options, onSelect, variant = 'primary', size = 'md', disabled }: SplitButtonProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, []);

  const dividerClass = variant === 'primary' ? 'border-primary-7' : 'border-gray-5';

  return (
    <div className="relative inline-flex" ref={rootRef}>
      <Button
        variant={variant}
        size={size}
        disabled={disabled}
        onClick={onClick}
        radiusClassName="rounded-l-xs rounded-r-none"
        className={cx('border-r-0', variant !== 'primary' && dividerClass)}
      >
        {label}
      </Button>
      <Button
        variant={variant}
        size={size}
        disabled={disabled}
        iconOnly
        icon={<IconChevronDown className={cx('transition-transform', open && 'rotate-180')} />}
        aria-label={open ? 'Close options' : 'More options'}
        aria-expanded={open}
        radiusClassName="rounded-r-xs rounded-l-none"
        className={cx('border-l', dividerClass)}
        onClick={() => setOpen((v) => !v)}
      />
      {open && (
        <ul
          role="listbox"
          className={cx('absolute right-0 top-full z-10 mt-xs w-44 border border-gray-5 bg-card py-xs shadow-md', RADIUS)}
        >
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={false}
              onClick={() => {
                onSelect(option.value);
                setOpen(false);
              }}
              className="cursor-pointer px-md py-sm text-body text-text-primary hover:bg-primary-0 hover:text-primary-7"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
