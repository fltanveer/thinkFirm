import { useState } from 'react';
import type { ReactNode } from 'react';
import { cx } from '../../../lib/cx';
import { Modal } from '../../ui2/Modal';
import { Button } from '../../ui2/Button';
import { IconColumns, IconSliders } from '../../ui/icons';
import { TagsView } from './TagsView';
import { ColumnsView } from './ColumnsView';
import { ConditionsView } from './ConditionsView';
import { nextId } from '../advanced-filter/types';
import type { AdvancedFilterState, ConditionGroup, TagItem, ColumnItem } from '../advanced-filter/types';

export function defaultTags(): TagItem[] {
  return [
    { id: nextId('tag2'), label: 'Urgent', checked: true },
    { id: nextId('tag2'), label: 'High Priority', checked: true },
    { id: nextId('tag2'), label: 'Management', checked: false, disabled: true },
    { id: nextId('tag2'), label: 'C-Suite', checked: true },
    { id: nextId('tag2'), label: 'Medium Priority', checked: true },
    { id: nextId('tag2'), label: 'Team Lead', checked: true },
    { id: nextId('tag2'), label: 'Low Priority', checked: false, disabled: true },
    { id: nextId('tag2'), label: 'Operational', checked: true },
    { id: nextId('tag2'), label: 'Critical', checked: true },
    { id: nextId('tag2'), label: 'Departmental', checked: true },
    { id: nextId('tag2'), label: 'Routine', checked: false, disabled: true },
    { id: nextId('tag2'), label: 'Support', checked: true },
    { id: nextId('tag2'), label: 'Strategic', checked: true },
    { id: nextId('tag2'), label: 'Executive', checked: true },
    { id: nextId('tag2'), label: 'Project Based', checked: false, disabled: true },
    { id: nextId('tag2'), label: 'Advisory', checked: true },
    { id: nextId('tag2'), label: 'Development', checked: true },
    { id: nextId('tag2'), label: 'On-Going', checked: true },
    { id: nextId('tag2'), label: 'Research', checked: false, disabled: true },
    { id: nextId('tag2'), label: 'Ad Hoc', checked: true },
    { id: nextId('tag2'), label: 'Collaborative', checked: true },
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
    ...rows.map(([label, width, visible, pinned]) => ({ id: nextId('col2'), label, width, visible, pinned })),
  ];
}

export function defaultConditions(): ConditionGroup {
  return {
    type: 'group',
    id: nextId('group2'),
    combinator: 'AND',
    children: [
      { type: 'rule', id: nextId('rule2'), field: 'Status', operator: 'Equals', value: '' },
      {
        type: 'group',
        id: nextId('group2'),
        combinator: 'AND',
        children: [
          { type: 'rule', id: nextId('rule2'), field: '', operator: 'Equals', value: '' },
          {
            type: 'group',
            id: nextId('group2'),
            combinator: 'AND',
            children: [
              { type: 'rule', id: nextId('rule2'), field: '', operator: 'Equals', value: '' },
              {
                type: 'group',
                id: nextId('group2'),
                combinator: 'AND',
                children: [{ type: 'rule', id: nextId('rule2'), field: '', operator: 'Equals', value: '' }],
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

// Style Guide 2 twin of components/patterns/advanced-filter — same
// structure and behavior, restyled entirely with ui2/ primitives and
// sg2-prefixed tokens. See MasterComponents2 for the suggested-additions
// note (identical gaps, since this is a 1:1 port).
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
        <button type="button" onClick={handleClearAll} className="text-sg2-body-md text-sg2-text-secondary hover:text-sg2-text-primary">
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
      <div className="advanced-filter-2 flex h-full" data-component-family="modals">
        <nav className="advanced-filter-2__nav flex w-[232px] shrink-0 flex-col gap-sg2-lg overflow-y-auto border-r border-sg2-gray-200 bg-sg2-bg-well p-sg2-lg">
          <div className="px-sg2-sm pb-sg2-xs">
            <div className="text-sg2-caption font-semibold text-sg2-text-heading">Configure your view</div>
            <p className="mt-sg2-xxs text-sg2-caption text-sg2-text-secondary">Choose fields, rules, and saved presets.</p>
          </div>
          {nav.map((section) => (
            <div key={section.id} className="flex flex-col gap-sg2-xxs">
              <div className="px-sg2-sm py-sg2-xxs text-sg2-caption font-semibold uppercase tracking-wide text-sg2-text-secondary">
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
                      'relative flex items-center gap-sg2-sm rounded-sg2-sm px-sg2-sm py-sg2-sm text-sg2-body-md transition-all',
                      active
                        ? 'bg-sg2-bg-card font-medium text-sg2-primary-100 shadow-sg2-xs'
                        : 'text-sg2-text-secondary hover:bg-sg2-gray-200 hover:text-sg2-text-primary'
                    )}
                  >
                    {active && <span className="absolute -left-[9px] top-1/2 h-3/5 w-[2px] -translate-y-1/2 rounded-full bg-sg2-primary-100" aria-hidden />}
                    {item.icon}
                    {item.label}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="min-w-0 flex-1 bg-sg2-bg-card">
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
