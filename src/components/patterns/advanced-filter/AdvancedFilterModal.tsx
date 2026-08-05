import { useState } from 'react';
import type { ReactNode } from 'react';
import { cx } from '../../../lib/cx';
import { Modal } from '../../ui/Modal';
import { Button } from '../../ui/Button';
import { IconColumns, IconSliders } from '../../ui/icons';
import { TagsView } from './TagsView';
import { ColumnsView } from './ColumnsView';
import { ConditionsView } from './ConditionsView';
import { nextId } from './types';
import type { AdvancedFilterState, ConditionGroup, TagItem, ColumnItem } from './types';

export function defaultTags(): TagItem[] {
  return [
    { id: nextId('tag'), label: 'Urgent', checked: true },
    { id: nextId('tag'), label: 'High Priority', checked: true },
    { id: nextId('tag'), label: 'Management', checked: false, disabled: true },
    { id: nextId('tag'), label: 'C-Suite', checked: true },
    { id: nextId('tag'), label: 'Medium Priority', checked: true },
    { id: nextId('tag'), label: 'Team Lead', checked: true },
    { id: nextId('tag'), label: 'Low Priority', checked: false, disabled: true },
    { id: nextId('tag'), label: 'Operational', checked: true },
    { id: nextId('tag'), label: 'Critical', checked: true },
    { id: nextId('tag'), label: 'Departmental', checked: true },
    { id: nextId('tag'), label: 'Routine', checked: false, disabled: true },
    { id: nextId('tag'), label: 'Support', checked: true },
    { id: nextId('tag'), label: 'Strategic', checked: true },
    { id: nextId('tag'), label: 'Executive', checked: true },
    { id: nextId('tag'), label: 'Project Based', checked: false, disabled: true },
    { id: nextId('tag'), label: 'Advisory', checked: true },
    { id: nextId('tag'), label: 'Development', checked: true },
    { id: nextId('tag'), label: 'On-Going', checked: true },
    { id: nextId('tag'), label: 'Research', checked: false, disabled: true },
    { id: nextId('tag'), label: 'Ad Hoc', checked: true },
    { id: nextId('tag'), label: 'Collaborative', checked: true },
  ];
}

export function defaultColumns(): ColumnItem[] {
  const rows: [string, string, boolean, boolean][] = [
    ['Name', '200px', false, false],
    ['Email', '250px', true, true],
    ['Role', '300px', false, false],
    ['Department', '150px', false, false],
    ['Status', '350px', false, false],
    ['Created', '400px', false, false],
    ['Updated', '450px', false, false],
    ['Owner', '500px', false, false],
    ['Priority', '550px', false, false],
  ];
  return [
    { id: 'id', label: 'ID', width: '', visible: true, pinned: true },
    ...rows.map(([label, width, visible, pinned]) => ({ id: nextId('col'), label, width, visible, pinned })),
  ];
}

export function defaultConditions(): ConditionGroup {
  return {
    type: 'group',
    id: nextId('group'),
    combinator: 'AND',
    children: [
      { type: 'rule', id: nextId('rule'), field: 'Status', operator: 'Equals', value: '' },
      {
        type: 'group',
        id: nextId('group'),
        combinator: 'AND',
        children: [
          { type: 'rule', id: nextId('rule'), field: '', operator: 'Equals', value: '' },
          {
            type: 'group',
            id: nextId('group'),
            combinator: 'AND',
            children: [
              { type: 'rule', id: nextId('rule'), field: '', operator: 'Equals', value: '' },
              {
                type: 'group',
                id: nextId('group'),
                combinator: 'AND',
                children: [{ type: 'rule', id: nextId('rule'), field: '', operator: 'Equals', value: '' }],
              },
            ],
          },
        ],
      },
    ],
  };
}

interface NavItem {
  id: string;
  label: string;
  icon?: ReactNode;
}

interface NavSection {
  id: string;
  label: string;
  items: NavItem[];
}

const DEFAULT_NAV: NavSection[] = [
  {
    id: 'view-configuration',
    label: 'View configuration',
    items: [
      { id: 'columns', label: 'Columns', icon: <IconColumns width={15} height={15} /> },
      { id: 'conditions', label: 'Conditions', icon: <IconSliders width={15} height={15} /> },
    ],
  },
  {
    id: 'filters',
    label: 'Filters',
    items: [
      { id: 'department', label: 'Department' },
      { id: 'role', label: 'Role' },
      { id: 'status', label: 'Status' },
    ],
  },
  {
    id: 'saved-filters',
    label: 'Saved filters',
    items: [
      { id: 'top-50', label: 'Top 50 Companies' },
      { id: 'top-20', label: 'Top 20 Companies' },
    ],
  },
  {
    id: 'saved-views',
    label: 'Saved views',
    items: [
      { id: 'view-main', label: 'View Main' },
      { id: 'view-sub', label: 'View Sub' },
    ],
  },
];

export interface AdvancedFilterModalProps {
  open: boolean;
  onClose: () => void;
  onApply: (state: AdvancedFilterState) => void;
  initialState?: AdvancedFilterState;
  nav?: NavSection[];
}

// Composite/global pattern built entirely from style-guide primitives
// (Modal, Select, Input, Checkbox, Switch, Button) plus one pattern-local
// piece: the grouped vertical nav on the left, which isn't a style-guide
// primitive yet (see suggestions on the Master Components page).
export function AdvancedFilterModal({ open, onClose, onApply, initialState, nav = DEFAULT_NAV }: AdvancedFilterModalProps) {
  const [activeId, setActiveId] = useState(nav[0].items[0].id);
  const [tags, setTags] = useState<TagItem[]>(initialState?.tags ?? defaultTags);
  const [columns, setColumns] = useState<ColumnItem[]>(initialState?.columns ?? defaultColumns);
  const [conditions, setConditions] = useState<ConditionGroup>(initialState?.conditions ?? defaultConditions);

  function handleApply() {
    onApply({ tags, columns, conditions });
    onClose();
  }

  function handleClearAll() {
    setTags((prev) => prev.map((t) => (t.disabled ? t : { ...t, checked: false })));
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Advanced Filter"
      size="xl"
      placement="right"
      noPadding
      footerLeft={
        <button type="button" onClick={handleClearAll} className="text-body text-text-secondary hover:text-text-primary">
          Clear all
        </button>
      }
      footer={
        <>
          <Button variant="stroke-gray" size="sm">
            Save Filter
          </Button>
          <Button variant="stroke-gray" size="sm" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" size="sm" onClick={handleApply}>
            Apply
          </Button>
        </>
      }
    >
      <div className="advanced-filter flex h-full" data-component-family="modals">
        <nav className="advanced-filter__nav flex w-[232px] shrink-0 flex-col gap-lg overflow-y-auto border-r border-gray-4 bg-gray-1 p-lg">
          <div className="px-sm pb-xs">
            <div className="text-caption font-semibold text-text-heading">Configure your view</div>
            <p className="mt-xxs text-caption text-text-secondary">Choose fields, rules, and saved presets.</p>
          </div>
          {nav.map((section) => (
            <div key={section.id} className="flex flex-col gap-xxs">
              <div className="px-sm py-xxs text-caption font-semibold uppercase tracking-wide text-text-secondary">
                {section.label}
              </div>
              {section.items.map((item) => {
                const active = item.id === activeId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveId(item.id)}
                    className={cx(
                      'relative flex items-center gap-sm rounded-xs px-sm py-sm text-body transition-all',
                      active
                        ? 'bg-card font-medium text-primary-6 shadow-xs'
                        : 'text-text-secondary hover:bg-gray-3 hover:text-text-primary'
                    )}
                  >
                    {active && <span className="absolute -left-[9px] top-1/2 h-3/5 w-[2px] -translate-y-1/2 rounded-full bg-primary-6" aria-hidden />}
                    {item.icon}
                    {item.label}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="min-w-0 flex-1 bg-card">
          {activeId === 'columns' ? (
            <ColumnsView columns={columns} onChange={setColumns} />
          ) : activeId === 'conditions' ? (
            <ConditionsView root={conditions} onChange={setConditions} />
          ) : (
            <TagsView tags={tags} onChange={setTags} />
          )}
        </div>
      </div>
    </Modal>
  );
}
