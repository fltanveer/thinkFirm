import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface StatTileProps {
  icon: ReactNode;
  value: string | number;
  label: string;
  className?: string;
}

export function StatTile({ icon, value, label, className }: StatTileProps) {
  return (
    <div className={cx('flex flex-col gap-xs border border-primary-1 bg-primary-0 px-lg py-md', 'rounded-xs', className)}>
      <div className="flex items-center gap-xs text-primary-6">
        {icon}
        <span className="text-h5 font-semibold text-primary-7">{value}</span>
      </div>
      <span className="text-caption text-text-secondary">{label}</span>
    </div>
  );
}
