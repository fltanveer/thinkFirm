import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { cx } from '../../lib/cx';
import { IconChevronDown, IconSearch, IconX } from '../ui/icons';

export interface ComboboxOption {
  value: string;
  label: string;
}

export type ComboboxSize = 'sm' | 'md' | 'lg';

interface ComboboxBaseProps {
  options: ComboboxOption[];
  label?: string;
  labelClassName?: string;
  placeholder?: string;
  menuSearch?: boolean;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  size?: ComboboxSize;
}

interface SingleComboboxProps extends ComboboxBaseProps {
  multiple?: false;
  value: string | null;
  onChange: (value: string | null) => void;
}

interface MultiComboboxProps extends ComboboxBaseProps {
  multiple: true;
  value: string[];
  onChange: (value: string[]) => void;
}

export type ComboboxProps = SingleComboboxProps | MultiComboboxProps;

const RADIUS = 'rounded-sg2-sm';
const CHIP_RADIUS = 'rounded-sg2-xs';

const SIZE_CLASSES: Record<ComboboxSize, string> = {
  sm: 'px-sg2-sm py-sg2-xs text-sg2-caption',
  md: 'px-sg2-md py-sg2-sm text-sg2-body-md',
  lg: 'px-sg2-lg py-sg2-md text-sg2-body-lg',
};

const OPTION_SIZE_CLASSES: Record<ComboboxSize, string> = {
  sm: 'px-sg2-sm py-sg2-xs text-sg2-caption',
  md: 'px-sg2-md py-sg2-sm text-sg2-body-md',
  lg: 'px-sg2-lg py-sg2-md text-sg2-body-lg',
};

export function Combobox(props: ComboboxProps) {
  const { options, label, labelClassName, placeholder = 'Search…', menuSearch = false, required = false, disabled, className, size = 'md' } = props;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlighted, setHighlighted] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const autoId = useId();

  const selectedValues = useMemo(
    () => (props.multiple ? props.value : props.value ? [props.value] : []),
    [props.multiple, props.value]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const pool = props.multiple ? options.filter((o) => !selectedValues.includes(o.value)) : options;
    if (!q) return pool;
    return pool.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query, props.multiple, selectedValues]);

  useEffect(() => {
    setHighlighted(0);
  }, [query, open]);

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery('');
      }
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, []);

  function selectOption(option: ComboboxOption) {
    if (props.multiple) {
      props.onChange([...props.value, option.value]);
      setQuery('');
      inputRef.current?.focus();
    } else {
      props.onChange(option.value);
      setQuery('');
      setOpen(false);
    }
  }

  function removeTag(value: string) {
    if (props.multiple) props.onChange(props.value.filter((v) => v !== value));
  }

  function clearAll() {
    if (props.multiple) props.onChange([]);
    else props.onChange(null);
    setQuery('');
    inputRef.current?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (disabled) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setHighlighted((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setOpen(true);
      setHighlighted((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const option = filtered[highlighted];
      if (option) selectOption(option);
    } else if (e.key === 'Escape') {
      setOpen(false);
      setQuery('');
    } else if (e.key === 'Backspace' && query === '' && props.multiple && props.value.length > 0) {
      props.onChange(props.value.slice(0, -1));
    }
  }

  const selectedSingle = !props.multiple && props.value ? options.find((o) => o.value === props.value) : null;
  const hasValue = props.multiple ? props.value.length > 0 : Boolean(props.value);

  return (
    <div className={cx('flex flex-col gap-sg2-xs', className)} ref={rootRef}>
      {label && (
        <label
          htmlFor={autoId}
          className={cx(labelClassName ?? 'text-sg2-caption', 'font-medium text-sg2-text-secondary')}
        >
          {label} {required && <span className="text-sg2-danger-60">*</span>}
        </label>
      )}
      <div className="relative">
        {menuSearch ? (
          <button
            id={autoId}
            type="button"
            role="combobox"
            aria-expanded={open}
            aria-controls={`${autoId}-listbox`}
            aria-required={required}
            disabled={disabled}
            onClick={() => setOpen((value) => !value)}
            className={cx(
              'flex w-full items-center justify-between gap-sg2-md border bg-sg2-bg-card text-left outline-none transition-colors',
              RADIUS,
              SIZE_CLASSES[size],
              disabled
                ? 'cursor-not-allowed border-sg2-gray-300 bg-sg2-bg-well text-sg2-text-disabled'
                : open
                  ? 'border-sg2-primary-100 ring-4 ring-sg2-focus-ring/15'
                  : 'border-sg2-gray-300 text-sg2-text-primary'
            )}
          >
            <span className={selectedSingle ? 'text-sg2-text-primary' : 'text-sg2-gray-500'}>
              {selectedSingle?.label ?? placeholder}
            </span>
            <IconChevronDown className={cx('shrink-0 text-sg2-gray-500 transition-transform', open && 'rotate-180')} />
          </button>
        ) : (
          <div
            className={cx(
              'flex w-full flex-wrap items-center gap-sg2-xs border bg-sg2-bg-card outline-none transition-colors',
              RADIUS,
              SIZE_CLASSES[size],
              disabled
                ? 'cursor-not-allowed border-sg2-gray-300 bg-sg2-bg-well'
                : open
                  ? 'border-sg2-primary-100 ring-4 ring-sg2-focus-ring/15'
                  : 'border-sg2-gray-300'
            )}
            onClick={() => !disabled && (setOpen(true), inputRef.current?.focus())}
          >
            <IconSearch className="shrink-0 text-sg2-gray-500" />
            {props.multiple &&
              props.value.map((v) => {
                const opt = options.find((o) => o.value === v);
                if (!opt) return null;
                return (
                  <span
                    key={v}
                    className={cx(
                      'inline-flex items-center gap-sg2-xxs bg-sg2-primary-30 px-sg2-sm py-sg2-xxs text-sg2-caption text-sg2-primary-90',
                      CHIP_RADIUS
                    )}
                  >
                    {opt.label}
                    <button
                      type="button"
                      aria-label={`Remove ${opt.label}`}
                      className="text-sg2-primary-100 hover:text-sg2-primary-80"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeTag(v);
                      }}
                    >
                      <IconX width={10} height={10} strokeWidth={2} />
                    </button>
                  </span>
                );
              })}
            <input
              ref={inputRef}
              id={autoId}
              role="combobox"
              aria-expanded={open}
              aria-controls={`${autoId}-listbox`}
              aria-required={required}
              required={required}
              disabled={disabled}
              placeholder={selectedSingle ? selectedSingle.label : placeholder}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              onKeyDown={onKeyDown}
              className={cx(
                'min-w-[4rem] flex-1 bg-transparent text-sg2-text-primary outline-none placeholder:text-sg2-gray-500',
                size === 'sm' ? 'text-sg2-caption' : size === 'lg' ? 'text-sg2-body-lg' : 'text-sg2-body-md',
                disabled && 'cursor-not-allowed text-sg2-text-disabled'
              )}
            />
            {hasValue && !disabled && (
              <button
                type="button"
                aria-label="Clear selection"
                className="shrink-0 text-sg2-gray-500 hover:text-sg2-text-primary"
                onClick={(e) => {
                  e.stopPropagation();
                  clearAll();
                }}
              >
                <IconX />
              </button>
            )}
            <IconChevronDown className="shrink-0 text-sg2-gray-500" />
          </div>
        )}

        {open && !disabled && menuSearch && (
          <div
            className={cx(
              'absolute z-10 mt-sg2-xs w-full border border-sg2-gray-300 bg-sg2-bg-card p-sg2-sm shadow-sg2-lg',
              RADIUS
            )}
          >
            <div className={cx('flex items-center gap-sg2-sm border border-sg2-gray-300 bg-sg2-bg-card px-sg2-md py-sg2-sm', RADIUS)}>
              <IconSearch className="shrink-0 text-sg2-gray-500" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search categories…"
                aria-label="Search support categories"
                autoFocus
                className="min-w-0 flex-1 bg-transparent text-sg2-body-sm text-sg2-text-primary outline-none placeholder:text-sg2-gray-500"
              />
            </div>
            <ul id={`${autoId}-listbox`} role="listbox" className="mt-sg2-sm max-h-60 overflow-y-auto pr-sg2-xs">
              {filtered.length === 0 ? (
                <li className={cx(OPTION_SIZE_CLASSES[size], 'text-sg2-text-secondary')}>No categories found</li>
              ) : (
                filtered.map((option, i) => {
                  const selected = option.value === selectedSingle?.value;
                  return (
                    <li
                      key={option.value}
                      role="option"
                      aria-selected={selected}
                      onPointerDown={(e) => e.preventDefault()}
                      onPointerEnter={() => setHighlighted(i)}
                      onClick={() => selectOption(option)}
                      className={cx(
                        'cursor-pointer rounded-sg2-sm',
                        OPTION_SIZE_CLASSES[size],
                        selected
                          ? 'bg-sg2-primary-30 font-medium text-sg2-primary-100'
                          : i === highlighted
                            ? 'bg-sg2-gray-100 text-sg2-text-primary'
                            : 'text-sg2-text-primary'
                      )}
                    >
                      {option.label}
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        )}

        {open && !disabled && !menuSearch && (
          <ul
            id={`${autoId}-listbox`}
            role="listbox"
            className={cx(
              'absolute z-10 mt-sg2-xs max-h-60 w-full overflow-auto border border-sg2-gray-300 bg-sg2-bg-card py-sg2-xs shadow-sg2-md',
              RADIUS
            )}
          >
            {filtered.length === 0 ? (
              <li className={cx(OPTION_SIZE_CLASSES[size], 'text-sg2-text-secondary')}>No results</li>
            ) : (
              filtered.map((option, i) => (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={i === highlighted}
                  onPointerDown={(e) => e.preventDefault()}
                  onClick={() => selectOption(option)}
                  className={cx(
                    'cursor-pointer',
                    OPTION_SIZE_CLASSES[size],
                    i === highlighted ? 'bg-sg2-primary-30 text-sg2-primary-90' : 'text-sg2-text-primary'
                  )}
                >
                  {option.label}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
