import { useMemo, useState } from 'react';
import { Checkbox } from '../../ui/Checkbox';
import { IconSearch } from '../../ui/icons';
import type { TagItem } from './types';

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
      <div className="shrink-0 border-b border-gray-4 px-xl py-lg">
        <div className="mb-md flex items-end justify-between gap-lg">
          <div>
            <h3 className="text-body font-semibold text-text-heading">Filter by tags</h3>
            <p className="mt-xxs text-caption text-text-secondary">Select one or more tags to narrow the results.</p>
          </div>
          <span className="shrink-0 rounded-xs border border-primary-2 bg-primary-0 px-sm py-xs text-caption font-medium text-primary-7">
            {selectedCount} selected
          </span>
        </div>
        <div className="relative">
          <IconSearch className="pointer-events-none absolute left-md top-1/2 -translate-y-1/2 text-gray-7" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tags…"
            className="w-full rounded-xs border border-gray-5 bg-card py-sm pl-3xl pr-md text-body text-text-primary outline-none transition-colors placeholder:text-gray-7 focus:border-primary-6 focus:ring-4 focus:ring-focus-ring/15"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto bg-gray-1 p-lg">
        <div className="grid grid-cols-2 gap-sm">
          {filtered.map((tag) => (
            <div key={tag.id} className="rounded-xs border border-gray-4 bg-card p-md shadow-xs transition-colors hover:border-gray-5">
              <Checkbox
                label={tag.label}
                checked={tag.checked}
                disabled={tag.disabled}
                onChange={() => toggle(tag.id)}
                data-component-family="checkboxes"
              />
            </div>
          ))}
          {filtered.length === 0 && <p className="text-caption text-text-secondary">No tags match “{query}”.</p>}
        </div>
      </div>
    </div>
  );
}
