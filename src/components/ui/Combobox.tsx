import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { cx } from '../../lib/cx';
import { IconChevronDown, IconSearch, IconX } from './icons';

export interface ComboboxOption {
  value: string;
  label: string;
}

export type ComboboxSize = 'sm' | 'md' | 'lg';

interface ComboboxBaseProps {
  options: ComboboxOption[];
  label?: string;
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

// HARD CONSTRAINT: dropdown surface + input cap at radius-xs (4px). The cap
// is a ceiling, not a per-size value, so it doesn't vary with size.
const RADIUS = 'rounded-xs';
// Tag chips are a compact element — capped at radius-xxs (2px), never larger.
const CHIP_RADIUS = 'rounded-xxs';

const SIZE_CLASSES: Record<ComboboxSize, string> = {
  sm: 'px-sm py-xs text-caption',
  md: 'px-md py-sm text-body',
  lg: 'px-lg py-md text-title',
};

const OPTION_SIZE_CLASSES: Record<ComboboxSize, string> = {
  sm: 'px-sm py-xs text-caption',
  md: 'px-md py-sm text-body',
  lg: 'px-lg py-md text-title',
};

export function Combobox(props: ComboboxProps) {
  const { options, label, placeholder = 'Search…', menuSearch = false, required = false, disabled, className, size = 'md' } = props;
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
    <div className={cx('flex flex-col gap-xs', className)} ref={rootRef}>
      {label && (
        <label htmlFor={autoId} className="text-caption font-medium text-text-secondary">
          {label} {required && <span className="text-error-base">*</span>}
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
              'flex w-full items-center justify-between gap-md border bg-card text-left outline-none transition-colors',
              RADIUS,
              SIZE_CLASSES[size],
              disabled
                ? 'cursor-not-allowed border-gray-5 bg-well text-text-disabled'
                : open
                  ? 'border-primary-6 ring-4 ring-focus-ring/15'
                  : 'border-gray-5 text-text-primary'
            )}
          >
            <span className={selectedSingle ? 'text-text-primary' : 'text-gray-7'}>
              {selectedSingle?.label ?? placeholder}
            </span>
            <IconChevronDown className={cx('shrink-0 text-gray-7 transition-transform', open && 'rotate-180')} />
          </button>
        ) : (
          <div
            className={cx(
              'flex w-full flex-wrap items-center gap-xs border bg-card outline-none transition-colors',
              RADIUS,
              SIZE_CLASSES[size],
              disabled
                ? 'cursor-not-allowed border-gray-5 bg-well'
                : open
                  ? 'border-primary-6 ring-4 ring-focus-ring/15'
                  : 'border-gray-5'
            )}
            onClick={() => !disabled && (setOpen(true), inputRef.current?.focus())}
          >
            <IconSearch className="shrink-0 text-gray-7" />
            {props.multiple &&
              props.value.map((v) => {
                const opt = options.find((o) => o.value === v);
                if (!opt) return null;
                return (
                  <span
                    key={v}
                    className={cx(
                      'inline-flex items-center gap-xxs bg-primary-0 px-sm py-xxs text-caption text-primary-7',
                      CHIP_RADIUS
                    )}
                  >
                    {opt.label}
                    <button
                      type="button"
                      aria-label={`Remove ${opt.label}`}
                      className="text-primary-6 hover:text-primary-8"
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
                'min-w-[4rem] flex-1 bg-transparent text-text-primary outline-none placeholder:text-text-secondary',
                size === 'sm' ? 'text-caption' : size === 'lg' ? 'text-title' : 'text-body',
                disabled && 'cursor-not-allowed text-text-disabled'
              )}
            />
            {hasValue && !disabled && (
              <button
                type="button"
                aria-label="Clear selection"
                className="shrink-0 text-gray-7 hover:text-text-primary"
                onClick={(e) => {
                  e.stopPropagation();
                  clearAll();
                }}
              >
                <IconX />
              </button>
            )}
            <IconChevronDown className="shrink-0 text-gray-7" />
          </div>
        )}

        {open && !disabled && menuSearch && (
          <div className={cx('absolute z-10 mt-xs w-full border border-gray-5 bg-card p-sm shadow-lg', RADIUS)}>
            <div className={cx('flex items-center gap-sm border border-gray-5 bg-card px-lg py-md', RADIUS)}>
              <IconSearch className="shrink-0 text-gray-7" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search categories…"
                aria-label="Search support categories"
                autoFocus
                className="min-w-0 flex-1 bg-transparent text-title text-text-primary outline-none placeholder:text-text-secondary"
              />
            </div>
            <ul id={`${autoId}-listbox`} role="listbox" className="mt-sm max-h-60 overflow-y-auto pr-xs">
              {filtered.length === 0 ? (
                <li className={cx(OPTION_SIZE_CLASSES[size], 'text-text-secondary')}>No categories found</li>
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
                        'cursor-pointer rounded-xs',
                        OPTION_SIZE_CLASSES[size],
                        selected
                          ? 'bg-primary-1 font-medium text-primary-7'
                          : i === highlighted
                            ? 'bg-gray-2 text-text-primary'
                            : 'text-text-primary'
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
              'absolute z-10 mt-xs max-h-60 w-full overflow-auto border border-gray-5 bg-card py-xs shadow-md',
              RADIUS
            )}
          >
            {filtered.length === 0 ? (
              <li className={cx(OPTION_SIZE_CLASSES[size], 'text-text-secondary')}>No results</li>
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
                    i === highlighted ? 'bg-primary-0 text-primary-7' : 'text-text-primary'
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
