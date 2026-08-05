import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface TableColumn<T> {
  key: string;
  header: string;
  align?: 'left' | 'right' | 'center';
  render: (row: T) => ReactNode;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  getRowKey: (row: T) => string;
  className?: string;
}

// HARD CONSTRAINT: outer wrapper caps at radius-xs (4px), same as every
// other component.
const RADIUS = 'rounded-xs';

const ALIGN_CLASSES = { left: 'text-left', right: 'text-right', center: 'text-center' } as const;

export function Table<T>({ columns, data, getRowKey, className }: TableProps<T>) {
  return (
    <div className={cx('overflow-x-auto border border-gray-4', RADIUS, className)}>
      <table className="w-full border-collapse text-body">
        <thead>
          <tr className="border-b border-gray-4 bg-gray-2">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cx(
                  'whitespace-nowrap px-lg py-sm text-caption font-semibold uppercase tracking-wide text-text-secondary',
                  ALIGN_CLASSES[col.align ?? 'left']
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={getRowKey(row)} className="border-b border-gray-4 transition-colors last:border-b-0 hover:bg-gray-2">
              {columns.map((col) => (
                <td key={col.key} className={cx('px-lg py-sm text-text-primary', ALIGN_CLASSES[col.align ?? 'left'])}>
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
