import { Fragment } from 'react';
import { cx } from '../../../lib/cx';
import { Select } from '../../ui2/Select';
import { Input } from '../../ui2/Input';
import { Button } from '../../ui2/Button';
import { IconPlus, IconTrash } from '../../ui/icons';
import { nextId } from '../advanced-filter/types';
import type { ConditionGroup, ConditionNode, ConditionRule } from '../advanced-filter/types';

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
      <div className="flex shrink-0 items-center justify-between border-b border-sg2-gray-200 px-sg2-xl py-sg2-lg">
        <div>
          <h3 className="text-sg2-body-md font-semibold text-sg2-text-heading">Conditions</h3>
          <p className="mt-sg2-xxs text-sg2-caption text-sg2-text-secondary">Build rules to control which records are included.</p>
        </div>
        <span className="rounded-sg2-sm border border-sg2-primary-40 bg-sg2-primary-30 px-sg2-sm py-sg2-xs text-sg2-caption font-medium text-sg2-primary-90">
          {ruleCount} {ruleCount === 1 ? 'rule' : 'rules'}
        </span>
      </div>
      <div className="flex-1 overflow-y-auto bg-sg2-bg-well p-sg2-xl">
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
    <div className={cx('condition-group-2 rounded-sg2-md border bg-sg2-bg-card shadow-sg2-xs', depth > 0 ? 'border-sg2-primary-40' : 'border-sg2-gray-200')}>
      <div className={cx('flex flex-wrap items-center gap-sg2-sm rounded-t-sg2-md border-b px-sg2-md py-sg2-sm', depth > 0 ? 'border-sg2-primary-40 bg-sg2-primary-30' : 'border-sg2-gray-200 bg-sg2-bg-card')}>
        <span className="mr-sg2-xs text-sg2-caption font-semibold text-sg2-text-heading">
          {depth === 0 ? 'Match records when' : `Nested group · Level ${depth}`}
        </span>
        <div className="inline-flex rounded-sg2-sm border border-sg2-gray-300 bg-sg2-gray-100 p-sg2-xxs" aria-label="Condition logic">
          {(['AND', 'OR'] as const).map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={group.combinator === value}
              onClick={() => onChange({ ...group, combinator: value })}
              className={cx(
                'rounded-sg2-xs px-sg2-sm py-sg2-xxs text-sg2-caption font-semibold transition-colors',
                group.combinator === value ? 'bg-sg2-bg-card text-sg2-primary-100 shadow-sg2-xs' : 'text-sg2-text-secondary hover:text-sg2-text-primary'
              )}
            >
              {value}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-sg2-xs">
          <Button variant="ghost" size="sm" icon={<IconPlus width={13} height={13} />} onClick={addRule}>Add rule</Button>
          <Button variant="stroke-gray" size="sm" icon={<IconPlus width={13} height={13} />} onClick={addGroup}>Add group</Button>
        </div>
        {onDelete && (
          <button
            type="button"
            aria-label="Remove group"
            onClick={onDelete}
            className="rounded-sg2-sm p-sg2-xs text-sg2-gray-500 transition-colors hover:bg-sg2-danger-10 hover:text-sg2-danger-60"
          >
            <IconTrash width={14} height={14} />
          </button>
        )}
      </div>

      <div className="condition-group-2__children flex flex-col p-sg2-lg">
        {group.children.map((child, index) => (
          <Fragment key={child.id}>
            {index > 0 && <div className="condition-joiner-2"><span>{group.combinator}</span></div>}
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
          <button type="button" onClick={addRule} className="rounded-sg2-sm border border-dashed border-sg2-gray-300 px-sg2-lg py-sg2-xl text-sg2-caption text-sg2-text-secondary hover:border-sg2-primary-70 hover:bg-sg2-primary-30 hover:text-sg2-primary-100">
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
    <div className="condition-rule-2 grid grid-cols-[minmax(9rem,1fr)_minmax(9rem,1fr)_minmax(10rem,1.25fr)_32px] items-end gap-sg2-md rounded-sg2-sm border border-sg2-gray-200 bg-sg2-bg-card p-sg2-md transition-colors hover:border-sg2-gray-300 hover:shadow-sg2-xs">
      <div className="min-w-0">
        <span className="mb-sg2-xs block text-sg2-caption font-medium text-sg2-text-secondary">Field</span>
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
        <span className="mb-sg2-xs block text-sg2-caption font-medium text-sg2-text-secondary">Operator</span>
        <Select size="sm" value={rule.operator} onChange={(e) => onChange({ ...rule, operator: e.target.value })}>
          {OPERATORS.map((op) => (
            <option key={op} value={op}>
              {op}
            </option>
          ))}
        </Select>
      </div>
      <div className="min-w-0">
        <span className="mb-sg2-xs block text-sg2-caption font-medium text-sg2-text-secondary">Value</span>
        <Input size="sm" placeholder="Value" value={rule.value} onChange={(e) => onChange({ ...rule, value: e.target.value })} />
      </div>
      <Button className="text-sg2-gray-500 hover:bg-sg2-danger-10 hover:text-sg2-danger-60" variant="ghost" size="sm" iconOnly icon={<IconTrash />} aria-label="Remove rule" onClick={onDelete} />
    </div>
  );
}
