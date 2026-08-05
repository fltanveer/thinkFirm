import { cx } from '../../lib/cx';
import { Button } from './Button';
import { IconChevronDown } from './icons';

export interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  className?: string;
}

function pageRange(page: number, totalPages: number): (number | 'ellipsis')[] {
  const pages = new Set([1, totalPages, page, page - 1, page + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);
  const out: (number | 'ellipsis')[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - (sorted[i - 1] as number) > 1) out.push('ellipsis');
    out.push(p);
  });
  return out;
}

export function Pagination({ page, totalPages, onChange, className }: PaginationProps) {
  return (
    <div className={cx('flex items-center justify-between', className)}>
      <Button
        variant="stroke-gray"
        size="sm"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        icon={<IconChevronDown className="rotate-90" />}
      >
        Previous
      </Button>
      <div className="flex items-center gap-xs">
        {pageRange(page, totalPages).map((p, i) =>
          p === 'ellipsis' ? (
            <span key={`e-${i}`} className="px-xs text-caption text-text-secondary">
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onChange(p)}
              className={cx(
                'inline-flex h-2xl w-2xl items-center justify-center rounded-xs text-caption transition-colors',
                p === page ? 'bg-primary-0 font-semibold text-primary-7' : 'text-text-secondary hover:bg-gray-3 hover:text-text-primary'
              )}
            >
              {p}
            </button>
          )
        )}
      </div>
      <Button variant="stroke-gray" size="sm" disabled={page >= totalPages} onClick={() => onChange(page + 1)}>
        Next
        <IconChevronDown className="-rotate-90" />
      </Button>
    </div>
  );
}
