import { cx } from '../../lib/cx';

// Written out literally so Tailwind's class scanner can see and generate
// each utility — a dynamically built `text-sg2-${slug}` string would get purged.
const TEXT_CLASS: Record<string, string> = {
  caption: 'text-sg2-caption',
  'body-sm': 'text-sg2-body-sm',
  'body-md': 'text-sg2-body-md',
  'body-lg': 'text-sg2-body-lg',
  h4: 'text-sg2-h4',
  h3: 'text-sg2-h3',
  h2: 'text-sg2-h2',
  h1: 'text-sg2-h1',
  display: 'text-sg2-display',
};

export function TypeSpecimen2({ name, slug, size }: { name: string; slug: string; size: number }) {
  return (
    <div className="flex items-baseline justify-between gap-sg2-xl border-b border-sg2-gray-200 py-sg2-md last:border-b-0">
      <span className={cx(TEXT_CLASS[slug], 'font-semibold text-sg2-text-heading')}>{name} — Sphinx of black quartz</span>
      <span className="shrink-0 text-sg2-caption text-sg2-text-secondary">{size}px</span>
    </div>
  );
}
