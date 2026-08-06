import { useRef, useState } from 'react';
import { cx } from '../../../lib/cx';
import { Switch } from '../../ui2/Switch';
import { IconGripVertical, IconPin, IconSearch } from '../../ui/icons';
import type { ColumnItem } from '../advanced-filter/types';

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
      <div className="shrink-0 border-b border-sg2-gray-200 px-sg2-xl py-sg2-lg">
        <div className="mb-sg2-md flex items-end justify-between gap-sg2-lg">
          <div>
            <h3 className="text-sg2-body-md font-semibold text-sg2-text-heading">Table columns</h3>
            <p className="mt-sg2-xxs text-sg2-caption text-sg2-text-secondary">Reorder columns, set widths, and control visibility.</p>
          </div>
          <span className="shrink-0 rounded-sg2-sm border border-sg2-primary-40 bg-sg2-primary-30 px-sg2-sm py-sg2-xs text-sg2-caption font-medium text-sg2-primary-90">
            {visibleCount} visible
          </span>
        </div>
        <div className="relative">
          <IconSearch className="pointer-events-none absolute left-sg2-md top-1/2 -translate-y-1/2 text-sg2-gray-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search columns…"
            className="w-full rounded-sg2-sm border border-sg2-gray-300 bg-sg2-bg-card py-sg2-sm pl-sg2-3xl pr-sg2-md text-sg2-body-md text-sg2-text-primary outline-none transition-colors placeholder:text-sg2-gray-500 focus:border-sg2-primary-100 focus:ring-4 focus:ring-sg2-focus-ring/15"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto bg-sg2-bg-well p-sg2-lg">
        <div className="flex flex-col gap-sg2-sm">
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
                  'group flex items-center gap-sg2-md rounded-sg2-sm border bg-sg2-bg-card px-sg2-md py-sg2-sm shadow-sg2-xs transition-all',
                  dragOverIndex === i ? 'border-sg2-primary-100' : 'border-transparent',
                  col.pinned ? 'border-sg2-primary-40 bg-sg2-primary-30' : 'hover:border-sg2-gray-300 hover:shadow-sg2-sm',
                  isHeader && 'sticky top-0 z-10 border-sg2-gray-200 bg-sg2-gray-100 shadow-none'
                )}
              >
                <span className={cx('shrink-0 cursor-grab text-sg2-gray-400 group-hover:text-sg2-gray-600', isHeader && 'invisible')}>
                  <IconGripVertical />
                </span>
                {isHeader ? (
                  <>
                    <span className="w-28 shrink-0 text-sg2-caption font-semibold text-sg2-text-heading">Column name</span>
                    <span className="w-24 shrink-0 text-sg2-caption font-semibold text-sg2-text-heading">Width</span>
                    <span className="flex flex-1 justify-end">
                      <span className="w-32 text-center text-sg2-caption font-semibold text-sg2-text-heading">Column visibility</span>
                    </span>
                    <span className="w-12 shrink-0 text-center text-sg2-caption font-semibold text-sg2-text-heading">Freeze</span>
                  </>
                ) : (
                  <>
                    <span className="w-28 shrink-0 truncate text-sg2-body-md text-sg2-text-primary">{col.label}</span>
                    <input
                      value={col.width}
                      onChange={(e) => update(col.id, { width: e.target.value })}
                      aria-label={`${col.label} column width`}
                      className="w-24 rounded-sg2-sm border border-sg2-gray-300 bg-sg2-bg-card px-sg2-sm py-sg2-xs text-sg2-caption text-sg2-text-primary outline-none transition-colors placeholder:text-sg2-gray-500 focus:border-sg2-primary-100 focus:ring-4 focus:ring-sg2-focus-ring/15"
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
                          'rounded-sg2-sm border p-sg2-xs transition-colors',
                          col.pinned ? 'border-sg2-primary-100 bg-sg2-primary-100 text-sg2-text-on-primary' : 'border-sg2-gray-300 text-sg2-gray-500 hover:bg-sg2-gray-200'
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
