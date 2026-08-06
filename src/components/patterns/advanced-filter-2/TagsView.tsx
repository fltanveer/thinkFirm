import { useMemo, useState } from 'react';
import { Checkbox } from '../../ui2/Checkbox';
import { IconSearch } from '../../ui/icons';
import type { TagItem } from '../advanced-filter/types';

export interface TagsViewProps {
  tags: TagItem[];
  onChange: (tags: TagItem[]) => void;
}

export function TagsView({ tags, onChange }: TagsViewProps) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tags;
    return tags.filter((t) => t.label.toLowerCase().includes(q));
  }, [tags, query]);

  function toggle(id: string) {
    onChange(tags.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t)));
  }

  const selectedCount = tags.filter((tag) => tag.checked).length;

  return (
    <div className="flex h-full flex-col">
      <div className="shrink-0 border-b border-sg2-gray-200 px-sg2-xl py-sg2-lg">
        <div className="mb-sg2-md flex items-end justify-between gap-sg2-lg">
          <div>
            <h3 className="text-sg2-body-md font-semibold text-sg2-text-heading">Filter by tags</h3>
            <p className="mt-sg2-xxs text-sg2-caption text-sg2-text-secondary">Select one or more tags to narrow the results.</p>
          </div>
          <span className="shrink-0 rounded-sg2-sm border border-sg2-primary-40 bg-sg2-primary-30 px-sg2-sm py-sg2-xs text-sg2-caption font-medium text-sg2-primary-90">
            {selectedCount} selected
          </span>
        </div>
        <div className="relative">
          <IconSearch className="pointer-events-none absolute left-sg2-md top-1/2 -translate-y-1/2 text-sg2-gray-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tags…"
            className="w-full rounded-sg2-sm border border-sg2-gray-300 bg-sg2-bg-card py-sg2-sm pl-sg2-3xl pr-sg2-md text-sg2-body-md text-sg2-text-primary outline-none transition-colors placeholder:text-sg2-gray-500 focus:border-sg2-primary-100 focus:ring-4 focus:ring-sg2-focus-ring/15"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto bg-sg2-bg-well p-sg2-lg">
        <div className="grid grid-cols-2 gap-sg2-sm">
          {filtered.map((tag) => (
            <div key={tag.id} className="rounded-sg2-sm border border-sg2-gray-200 bg-sg2-bg-card p-sg2-md shadow-sg2-xs transition-colors hover:border-sg2-gray-300">
              <Checkbox
                label={tag.label}
                checked={tag.checked}
                disabled={tag.disabled}
                onChange={() => toggle(tag.id)}
                data-component-family="checkboxes"
              />
            </div>
          ))}
          {filtered.length === 0 && <p className="text-sg2-caption text-sg2-text-secondary">No tags match “{query}”.</p>}
        </div>
      </div>
    </div>
  );
}
