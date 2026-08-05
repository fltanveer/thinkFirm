import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobalHeader } from '../components/docs/GlobalHeader';
import { Section, SubSection } from '../components/styleguide/Section';
import { CodeSnippet } from '../components/docs/CodeSnippet';
import { Button } from '../components/ui/Button';
import { AdvancedFilterModal, type AdvancedFilterState } from '../components/patterns/advanced-filter';

const ADVANCED_FILTER_SNIPPET = `import { useState } from 'react';
import { AdvancedFilterModal } from '../components/patterns/advanced-filter';
import { Button } from '../components/ui/Button';

function TableToolbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="stroke-gray" size="sm" onClick={() => setOpen(true)}>
        Advanced Filter
      </Button>

      <AdvancedFilterModal
        open={open}
        onClose={() => setOpen(false)}
        onApply={(state) => {
          // state: { tags, columns, conditions }
          console.log(state);
        }}
      />
    </>
  );
}`;

export default function MasterComponents() {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg-layout">
      <GlobalHeader />
      <header className="flex items-center justify-between border-b border-gray-4 bg-card px-xl py-lg">
        <div>
          <h1 className="text-h4 font-semibold text-text-heading">Master Components</h1>
          <p className="mt-xs text-body text-text-secondary">
            Global, composite patterns assembled from style-guide primitives — copy the snippet, drop it into any page.
          </p>
        </div>
        <Link to="/dashboard" className="text-body text-text-secondary hover:text-text-primary">
          Dashboard →
        </Link>
      </header>

      <main className="mx-auto max-w-[72rem] px-xl py-2xl">
        <div className="mb-2xl rounded-xs border border-warning-border bg-warning-bg px-lg py-lg">
          <h2 className="text-body font-semibold text-warning-text">Suggested additions to the style guide</h2>
          <p className="mt-xs text-caption text-warning-text">
            Built while assembling the Advanced Filter pattern below — pieces this pattern needed that the style guide
            doesn't have as documented primitives yet:
          </p>
          <ul className="mt-sm flex flex-col gap-xs text-caption text-warning-text">
            <li>
              <strong>Vertical grouped nav list</strong> — a text-only nav list with uppercase group labels and a
              left-edge active indicator bar (used here for the modal's left rail). Similar to the app Sidebar but
              without mandatory icons. Currently built as a one-off inside this pattern; worth promoting to a real
              <code className="mx-xxs rounded-xxs bg-card px-xxs">ui/</code> primitive if more than this one place
              needs it.
            </li>
            <li>
              <strong>Input / Select don't expose a wrapper className</strong> — <code className="mx-xxs rounded-xxs bg-card px-xxs">className</code>{' '}
              lands on the inner control, which already hardcodes <code className="mx-xxs rounded-xxs bg-card px-xxs">w-full</code>. Sizing
              a field (e.g. a narrow AND/OR select) means wrapping it in an extra div rather than passing a width
              class directly — worked around here, but a <code className="mx-xxs rounded-xxs bg-card px-xxs">wrapperClassName</code> prop
              would remove the workaround.
            </li>
            <li>
              <strong>Input has no leading-icon slot</strong> — every search box (this pattern, the Dashboard page)
              hand-rolls an absolutely-positioned icon + padding override. An optional{' '}
              <code className="mx-xxs rounded-xxs bg-card px-xxs">icon</code> prop on <code className="mx-xxs rounded-xxs bg-card px-xxs">Input</code>{' '}
              would remove the repetition.
            </li>
          </ul>
          <p className="mt-sm text-caption text-warning-text">
            Already extended directly (small, additive, non-breaking): <code className="mx-xxs rounded-xxs bg-card px-xxs">Modal</code> gained an{' '}
            <code className="mx-xxs rounded-xxs bg-card px-xxs">xl</code> size, a <code className="mx-xxs rounded-xxs bg-card px-xxs">noPadding</code> flag
            for custom body layouts, and a <code className="mx-xxs rounded-xxs bg-card px-xxs">footerLeft</code> slot (e.g. "Clear all").
          </p>
        </div>

        <Section
          id="advanced-filter"
          title="Advanced Filter for Table"
          description="A wide modal combining a grouped left nav with three swappable panes — tag checklist, column visibility/width/pin/reorder, and a recursive AND/OR rule builder. Built from Modal, Checkbox, Switch, Select, Input and Button."
        >
          <SubSection title="Live preview">
            <Button variant="stroke-gray" size="sm" onClick={() => setFilterOpen(true)}>
              Open Advanced Filter
            </Button>
            <AdvancedFilterModal
              open={filterOpen}
              onClose={() => setFilterOpen(false)}
              onApply={(state: AdvancedFilterState) => {
                console.log('Advanced filter applied', state);
              }}
            />
          </SubSection>
          <SubSection title="Usage">
            <CodeSnippet code={ADVANCED_FILTER_SNIPPET} />
          </SubSection>
        </Section>
      </main>
    </div>
  );
}
