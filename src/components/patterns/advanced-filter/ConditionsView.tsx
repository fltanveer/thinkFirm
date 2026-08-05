import { Fragment } from 'react';
import { cx } from '../../../lib/cx';
import { Select } from '../../ui/Select';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { IconPlus, IconTrash } from '../../ui/icons';
import { nextId } from './types';
import type { ConditionGroup, ConditionNode, ConditionRule } from './types';

const FIELDS = ['Name', 'Status', 'Role', 'Department', 'Priority', 'Created date', 'Assignee'];
const OPERATORS = ['Equals', 'Not equals', 'Contains', 'Greater than', 'Less than'];

function emptyRule(): ConditionRule {
  return { type: 'rule', id: nextId('rule'), field: '', operator: 'Equals', value: '' };
}

function emptyGroup(): ConditionGroup {
  return { type: 'group', id: nextId('group'), combinator: 'AND', children: [emptyRule()] };
}

export interface ConditionsViewProps {
  root: ConditionGroup;
  onChange: (root: ConditionGroup) => void;
}

export function ConditionsView({ root, onChange }: ConditionsViewProps) {
  const ruleCount = countRules(root);
  return (
    <div className="flex h-full flex-col" data-component-family="inputs">
      <div className="flex shrink-0 items-center justify-between border-b border-gray-4 px-xl py-lg">
        <div>
          <h3 className="text-body font-semibold text-text-heading">Conditions</h3>
          <p className="mt-xxs text-caption text-text-secondary">Build rules to control which records are included.</p>
        </div>
        <span className="rounded-xs border border-primary-2 bg-primary-0 px-sm py-xs text-caption font-medium text-primary-7">
          {ruleCount} {ruleCount === 1 ? 'rule' : 'rules'}
        </span>
      </div>
      <div className="flex-1 overflow-y-auto bg-gray-1 p-xl">
        <GroupBlock group={root} onChange={onChange} depth={0} />
      </div>
    </div>
  );
}

function countRules(group: ConditionGroup): number {
  return group.children.reduce((total, child) => total + (child.type === 'rule' ? 1 : countRules(child)), 0);
}

function GroupBlock({
  group,
  onChange,
  depth,
  onDelete,
}: {
  group: ConditionGroup;
  onChange: (group: ConditionGroup) => void;
  depth: number;
  onDelete?: () => void;
}) {
  function updateChild(id: string, next: ConditionNode) {
    onChange({ ...group, children: group.children.map((c) => (c.id === id ? next : c)) });
  }

  function removeChild(id: string) {
    onChange({ ...group, children: group.children.filter((c) => c.id !== id) });
  }

  function addRule() {
    onChange({ ...group, children: [...group.children, emptyRule()] });
  }

  function addGroup() {
    onChange({ ...group, children: [...group.children, emptyGroup()] });
  }

  return (
    <div className={cx('condition-group rounded-md border bg-card shadow-xs', depth > 0 ? 'border-primary-2' : 'border-gray-4')}>
      <div className={cx('flex flex-wrap items-center gap-sm rounded-t-md border-b px-md py-sm', depth > 0 ? 'border-primary-2 bg-primary-0' : 'border-gray-4 bg-card')}>
        <span className="mr-xs text-caption font-semibold text-text-heading">
          {depth === 0 ? 'Match records when' : `Nested group · Level ${depth}`}
        </span>
        <div className="inline-flex rounded-xs border border-gray-5 bg-gray-2 p-xxs" aria-label="Condition logic">
          {(['AND', 'OR'] as const).map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={group.combinator === value}
              onClick={() => onChange({ ...group, combinator: value })}
              className={cx(
                'rounded-xxs px-sm py-xxs text-caption font-semibold transition-colors',
                group.combinator === value ? 'bg-card text-primary-6 shadow-xs' : 'text-text-secondary hover:text-text-primary'
              )}
            >
              {value}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-xs">
          <Button variant="ghost" size="sm" icon={<IconPlus width={13} height={13} />} onClick={addRule}>Add rule</Button>
          <Button variant="stroke-gray" size="sm" icon={<IconPlus width={13} height={13} />} onClick={addGroup}>Add group</Button>
        </div>
        {onDelete && (
          <button
            type="button"
            aria-label="Remove group"
            onClick={onDelete}
            className="rounded-xs p-xs text-gray-7 transition-colors hover:bg-error-bg hover:text-error-base"
          >
            <IconTrash width={14} height={14} />
          </button>
        )}
      </div>

      <div className="condition-group__children flex flex-col p-lg">
        {group.children.map((child, index) => (
          <Fragment key={child.id}>
            {index > 0 && <div className="condition-joiner"><span>{group.combinator}</span></div>}
            {child.type === 'rule' ? (
              <RuleRow rule={child} onChange={(next) => updateChild(child.id, next)} onDelete={() => removeChild(child.id)} />
            ) : (
              <GroupBlock
                group={child}
                depth={depth + 1}
                onChange={(next) => updateChild(child.id, next)}
                onDelete={() => removeChild(child.id)}
              />
            )}
          </Fragment>
        ))}
        {group.children.length === 0 && (
          <button type="button" onClick={addRule} className="rounded-xs border border-dashed border-gray-5 px-lg py-xl text-caption text-text-secondary hover:border-primary-4 hover:bg-primary-0 hover:text-primary-6">
            + Add your first rule
          </button>
        )}
      </div>
    </div>
  );
}

function RuleRow({
  rule,
  onChange,
  onDelete,
}: {
  rule: ConditionRule;
  onChange: (rule: ConditionRule) => void;
  onDelete: () => void;
}) {
  return (
    <div className="condition-rule grid grid-cols-[minmax(9rem,1fr)_minmax(9rem,1fr)_minmax(10rem,1.25fr)_32px] items-end gap-md rounded-xs border border-gray-4 bg-card p-md transition-colors hover:border-gray-5 hover:shadow-xs">
      <div className="min-w-0">
        <span className="mb-xs block text-caption font-medium text-text-secondary">Field</span>
        <Select size="sm" value={rule.field} onChange={(e) => onChange({ ...rule, field: e.target.value })}>
          <option value="">Select field</option>
          {FIELDS.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </Select>
      </div>
      <div className="min-w-0">
        <span className="mb-xs block text-caption font-medium text-text-secondary">Operator</span>
        <Select size="sm" value={rule.operator} onChange={(e) => onChange({ ...rule, operator: e.target.value })}>
          {OPERATORS.map((op) => (
            <option key={op} value={op}>
              {op}
            </option>
          ))}
        </Select>
      </div>
      <div className="min-w-0">
        <span className="mb-xs block text-caption font-medium text-text-secondary">Value</span>
        <Input size="sm" placeholder="Value" value={rule.value} onChange={(e) => onChange({ ...rule, value: e.target.value })} />
      </div>
      <Button className="text-gray-7 hover:bg-error-bg hover:text-error-base" variant="ghost" size="sm" iconOnly icon={<IconTrash />} aria-label="Remove rule" onClick={onDelete} />
    </div>
  );
}
