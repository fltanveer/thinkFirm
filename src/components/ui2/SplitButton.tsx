import { useEffect, useRef, useState } from 'react';
import { cx } from '../../lib/cx';
import { Button, type ButtonSize, type ButtonVariant } from './Button';
import { IconChevronDown } from '../ui/icons';

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

const RADIUS = 'rounded-sg2-sm';

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

  const dividerClass = variant === 'primary' ? 'border-sg2-primary-90' : 'border-sg2-gray-300';

  return (
    <div className="relative inline-flex" ref={rootRef}>
      <Button
        variant={variant}
        size={size}
        disabled={disabled}
        onClick={onClick}
        radiusClassName="rounded-l-sg2-sm rounded-r-sg2-none"
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
        radiusClassName="rounded-r-sg2-sm rounded-l-sg2-none"
        className={cx('border-l', dividerClass)}
        onClick={() => setOpen((v) => !v)}
      />
      {open && (
        <ul
          role="listbox"
          className={cx('absolute right-0 top-full z-10 mt-sg2-xs w-44 border border-sg2-gray-300 bg-sg2-bg-card py-sg2-xs shadow-sg2-md', RADIUS)}
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
              className="cursor-pointer px-sg2-md py-sg2-sm text-sg2-body-md text-sg2-text-primary hover:bg-sg2-primary-30 hover:text-sg2-primary-90"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
