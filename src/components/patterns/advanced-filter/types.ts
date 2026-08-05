export interface TagItem {
  id: string;
  label: string;
  checked: boolean;
  disabled?: boolean;
}

export interface ColumnItem {
  id: string;
  label: string;
  width: string;
  visible: boolean;
  pinned: boolean;
}

export type ConditionCombinator = 'AND' | 'OR';

export interface ConditionRule {
  type: 'rule';
  id: string;
  field: string;
  operator: string;
  value: string;
}

export interface ConditionGroup {
  type: 'group';
  id: string;
  combinator: ConditionCombinator;
  children: ConditionNode[];
}

export type ConditionNode = ConditionRule | ConditionGroup;

export interface AdvancedFilterState {
  tags: TagItem[];
  columns: ColumnItem[];
  conditions: ConditionGroup;
}

let idCounter = 0;
export function nextId(prefix: string) {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}
