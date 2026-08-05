import { useRef, useState } from 'react';
import { cx } from '../../../lib/cx';
import { Switch } from '../../ui/Switch';
import { IconGripVertical, IconPin, IconSearch } from '../../ui/icons';
import type { ColumnItem } from './types';

export interface ColumnsViewProps {
  columns: ColumnItem[];
  onChange: (columns: ColumnItem[]) => void;
}

export function ColumnsView({ columns, onChange }: ColumnsViewProps) {
  const [query, setQuery] = useState('');
  const dragIndex = useRef<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const filtered = query.trim()
    ? columns.filter((c) => c.label.toLowerCase().includes(query.trim().toLowerCase()))
    : columns;
  const visibleCount = columns.filter((column) => column.id !== 'id' && column.visible).length;

  function update(id: string, patch: Partial<ColumnItem>) {
    onChange(columns.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  }

  function reorder(from: number, to: number) {
    if (from === to) return;
    const next = [...columns];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next);
  }

  return (
    <div className="flex h-full flex-col">
      <div className="shrink-0 border-b border-gray-4 px-xl py-lg">
        <div className="mb-md flex items-end justify-between gap-lg">
          <div>
            <h3 className="text-body font-semibold text-text-heading">Table columns</h3>
            <p className="mt-xxs text-caption text-text-secondary">Reorder columns, set widths, and control visibility.</p>
          </div>
          <span className="shrink-0 rounded-xs border border-primary-2 bg-primary-0 px-sm py-xs text-caption font-medium text-primary-7">
            {visibleCount} visible
          </span>
        </div>
        <div className="relative">
          <IconSearch className="pointer-events-none absolute left-md top-1/2 -translate-y-1/2 text-gray-7" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search columns…"
            className="w-full rounded-xs border border-gray-5 bg-card py-sm pl-3xl pr-md text-body text-text-primary outline-none transition-colors placeholder:text-gray-7 focus:border-primary-6 focus:ring-4 focus:ring-focus-ring/15"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto bg-gray-1 p-lg">
        <div className="flex flex-col gap-sm">
          {filtered.map((col, i) => {
            const isHeader = col.id === 'id';
            return (
              <div
                key={col.id}
                draggable={!isHeader}
                onDragStart={() => (dragIndex.current = i)}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOverIndex(i);
                }}
                onDragLeave={() => setDragOverIndex((v) => (v === i ? null : v))}
                onDrop={(e) => {
                  e.preventDefault();
                  if (dragIndex.current != null) reorder(dragIndex.current, i);
                  dragIndex.current = null;
                  setDragOverIndex(null);
                }}
                onDragEnd={() => {
                  dragIndex.current = null;
                  setDragOverIndex(null);
                }}
                className={cx(
                  'group flex items-center gap-md rounded-xs border bg-card px-md py-sm shadow-xs transition-all',
                  dragOverIndex === i ? 'border-primary-6' : 'border-transparent',
                  col.pinned ? 'border-primary-2 bg-primary-0' : 'hover:border-gray-5 hover:shadow-sm',
                  isHeader && 'sticky top-0 z-10 border-gray-4 bg-gray-2 shadow-none'
                )}
              >
                <span className={cx('shrink-0 cursor-grab text-gray-6 group-hover:text-gray-8', isHeader && 'invisible')}>
                  <IconGripVertical />
                </span>
                {isHeader ? (
                  <>
                    <span className="w-28 shrink-0 text-caption font-semibold text-text-heading">Column name</span>
                    <span className="w-24 shrink-0 text-caption font-semibold text-text-heading">Width</span>
                    <span className="flex flex-1 justify-end">
                      <span className="w-32 text-center text-caption font-semibold text-text-heading">Column visibility</span>
                    </span>
                    <span className="w-12 shrink-0 text-center text-caption font-semibold text-text-heading">Freeze</span>
                  </>
                ) : (
                  <>
                    <span className="w-28 shrink-0 truncate text-body text-text-primary">{col.label}</span>
                    <input
                      value={col.width}
                      onChange={(e) => update(col.id, { width: e.target.value })}
                      aria-label={`${col.label} column width`}
                      className="w-24 rounded-xs border border-gray-5 bg-card px-sm py-xs text-caption text-text-primary outline-none transition-colors placeholder:text-gray-7 focus:border-primary-6 focus:ring-4 focus:ring-focus-ring/15"
                    />
                    <span className="flex flex-1 justify-end">
                      <span className="flex w-32 justify-center">
                        <Switch
                          size="sm"
                          checked={col.visible}
                          onChange={() => update(col.id, { visible: !col.visible })}
                          aria-label={`Show ${col.label} column`}
                          data-component-family="switches"
                        />
                      </span>
                    </span>
                    <span className="flex w-12 shrink-0 justify-center">
                      <button
                        type="button"
                        aria-label={col.pinned ? `Unfreeze ${col.label}` : `Freeze ${col.label}`}
                        aria-pressed={col.pinned}
                        onClick={() => update(col.id, { pinned: !col.pinned })}
                        className={cx(
                          'rounded-xs border p-xs transition-colors',
                          col.pinned ? 'border-primary-6 bg-primary-6 text-card' : 'border-gray-5 text-gray-7 hover:bg-gray-3'
                        )}
                      >
                        <IconPin width={14} height={14} />
                      </button>
                    </span>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
