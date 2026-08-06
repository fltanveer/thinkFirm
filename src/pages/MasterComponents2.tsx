import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobalHeader } from '../components/docs/GlobalHeader';
import { Section, SubSection } from '../components/styleguide/Section';
import { CodeSnippet } from '../components/docs/CodeSnippet';
import { Button } from '../components/ui2/Button';
import { AdvancedFilterModal, type AdvancedFilterState } from '../components/patterns/advanced-filter-2';
import { WizardVertical } from '../components/patterns/wizard-2/WizardVertical';

const ADVANCED_FILTER_SNIPPET = `import { useState } from 'react';
import { AdvancedFilterModal } from '../components/patterns/advanced-filter-2';
import { Button } from '../components/ui2/Button';

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

const WIZARD_SNIPPET = `import { WizardVertical } from '../components/patterns/wizard-2/WizardVertical';

function OnboardingPage() {
  return <WizardVertical />;
}`;

export default function MasterComponents2() {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-sg2-bg-layout">
      <GlobalHeader />
      <header className="flex items-center justify-between border-b border-sg2-gray-200 bg-sg2-bg-card px-sg2-xl py-sg2-lg">
        <div>
          <h1 className="text-sg2-body-lg font-semibold text-sg2-text-heading">Master Components 2</h1>
          <p className="mt-sg2-xs text-sg2-body-md text-sg2-text-secondary">
            Global, composite patterns assembled from Style Guide 2 primitives — copy the snippet, drop it into any page.
          </p>
        </div>
        <Link to="/master-components" className="text-sg2-body-md text-sg2-text-secondary hover:text-sg2-text-primary">
          Master Components →
        </Link>
      </header>

      <main className="mx-auto max-w-[72rem] px-sg2-xl py-sg2-2xl">
        <div className="mb-sg2-2xl rounded-sg2-sm border border-sg2-warning-30 bg-sg2-warning-10 px-sg2-lg py-sg2-lg">
          <h2 className="text-sg2-body-md font-semibold text-sg2-warning-100">Suggested additions to Style Guide 2</h2>
          <p className="mt-sg2-xs text-sg2-caption text-sg2-warning-100">
            Same gaps as Master Components v1 (Input/Select have no icon slot, the filter's nav list isn't a primitive) —
            plus one new one found while building the wizard below:
          </p>
          <ul className="mt-sg2-sm flex flex-col gap-sg2-xs text-sg2-caption text-sg2-warning-100">
            <li>
              <strong>No circular progress primitive</strong> — <code className="mx-sg2-xxs rounded-sg2-xs bg-sg2-bg-card px-sg2-xxs">ui2/ProgressBar</code>{' '}
              only covers the linear track. The wizard's "% done" ring below is a one-off conic-gradient; worth a{' '}
              <code className="mx-sg2-xxs rounded-sg2-xs bg-sg2-bg-card px-sg2-xxs">variant="circular"</code> if more than
              this one place needs it.
            </li>
          </ul>
        </div>

        <Section
          id="sg2-advanced-filter"
          title="Advanced Filter for Table"
          description="Style Guide 2 twin of the Master Components v1 pattern — same wide modal, grouped left nav, and three swappable panes, restyled with ui2/ primitives and tokens-old.json."
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

        <Section
          id="sg2-wizard-vertical"
          title="Wizard (Vertical)"
          description="A vertical stepper for multi-step flows — completed/active/pending step states with a connecting rail, expanding to show that step's fields. Built from Button, Radio and Select."
        >
          <SubSection title="Live preview">
            <WizardVertical />
          </SubSection>
          <SubSection title="Usage">
            <CodeSnippet code={WIZARD_SNIPPET} />
          </SubSection>
        </Section>
      </main>
    </div>
  );
}
