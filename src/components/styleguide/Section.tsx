import type { ReactNode } from 'react';

export function Section({ id, title, description, children }: { id: string; title: string; description?: string; children: ReactNode }) {
  return (
    <section id={id} className="guide-section scroll-mt-2xl">
      <div className="guide-section__heading">
        <span className="guide-section__index">{id.slice(0, 2).toUpperCase()}</span>
        <div>
          <h2 className="text-h4 font-semibold text-text-heading">{title}</h2>
          {description && <p className="mt-xs max-w-[42rem] text-body text-text-secondary">{description}</p>}
        </div>
      </div>
      <div className="guide-section__content">{children}</div>
    </section>
  );
}

export function SubSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="specimen-card" data-inspectable data-specimen={title}>
      <div className="specimen-card__bar">
        <h3>{title}</h3>
        <span>Live preview</span>
      </div>
      <div className="specimen-card__canvas">{children}</div>
    </div>
  );
}
