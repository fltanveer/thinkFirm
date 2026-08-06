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

const RADIUS = 'rounded-sg2-sm';

const ALIGN_CLASSES = { left: 'text-left', right: 'text-right', center: 'text-center' } as const;

export function Table<T>({ columns, data, getRowKey, className }: TableProps<T>) {
  return (
    <div className={cx('overflow-x-auto border border-sg2-gray-200', RADIUS, className)}>
      <table className="w-full border-collapse text-sg2-body-md">
        <thead>
          <tr className="border-b border-sg2-gray-200 bg-sg2-gray-100">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cx(
                  'whitespace-nowrap px-sg2-lg py-sg2-sm text-sg2-caption font-semibold uppercase tracking-wide text-sg2-text-secondary',
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
            <tr key={getRowKey(row)} className="border-b border-sg2-gray-200 transition-colors last:border-b-0 hover:bg-sg2-gray-100">
              {columns.map((col) => (
                <td key={col.key} className={cx('px-sg2-lg py-sg2-sm text-sg2-text-primary', ALIGN_CLASSES[col.align ?? 'left'])}>
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
