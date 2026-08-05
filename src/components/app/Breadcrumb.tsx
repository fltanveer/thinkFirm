import { cx } from '../../lib/cx';
import { IconChevronRight } from '../ui/icons';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onBack?: () => void;
  className?: string;
}

export function Breadcrumb({ items, onBack, className }: BreadcrumbProps) {
  return (
    <div className={cx('flex items-center gap-sm text-body', className)}>
      {onBack && (
        <button type="button" onClick={onBack} aria-label="Back" className="rounded-xs text-gray-7 hover:text-text-primary">
          <IconChevronRight className="rotate-180" />
        </button>
      )}
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-sm">
            {i > 0 && <span className="text-gray-5">/</span>}
            <span className={last ? 'font-semibold text-text-primary' : 'text-text-secondary'}>{item.label}</span>
          </span>
        );
      })}
    </div>
  );
}
