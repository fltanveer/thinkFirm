import { cx } from '../../lib/cx';

// The type scale is a small fixed set produced at token-build time. Written
// out literally (rather than interpolated as `text-${slug}`) so Tailwind's
// class scanner can actually see and generate each utility — a dynamically
// built classname string would get purged.
const TEXT_CLASS: Record<string, string> = {
  h1: 'text-h1',
  h2: 'text-h2',
  h3: 'text-h3',
  h4: 'text-h4',
  h5: 'text-h5',
  title: 'text-title',
  body: 'text-body',
  caption: 'text-caption',
  'badge-text': 'text-badge-text',
};

export function TypeSpecimen({
  name,
  slug,
  size,
  lineHeight,
  lineHeightToken,
}: {
  name: string;
  slug: string;
  size: number;
  lineHeight: number | null;
  lineHeightToken: string | null;
}) {
  return (
    <div className="flex items-baseline justify-between gap-xl border-b border-gray-4 py-md last:border-b-0">
      <span className={cx(TEXT_CLASS[slug], 'font-semibold text-text-heading')}>{name} — Sphinx of black quartz</span>
      <span className="shrink-0 text-caption text-text-secondary">
        {size}px
        {lineHeight != null ? ` / ${lineHeight}px (${lineHeightToken})` : ' / no line-height token'}
      </span>
    </div>
  );
}
