import { useState } from 'react';
import type { ReactNode } from 'react';
import { cx } from '../../../lib/cx';
import { Button } from '../../ui2/Button';
import { Radio } from '../../ui2/Radio';
import { Select } from '../../ui2/Select';
import { IconArrowLeft, IconArrowRight, IconCalendar, IconCheck, IconInfo } from '../../ui/icons';

interface WizardStep {
  id: string;
  label: string;
  render: () => ReactNode;
}

// Raw input styled to match ui2/Input but with a trailing icon slot —
// ui2/Input (like ui1/Input) has no icon slot yet, same documented gap as
// the search boxes in the Advanced Filter pattern.
function DateField({ placeholder }: { placeholder: string }) {
  return (
    <div className="relative">
      <input
        readOnly
        placeholder={placeholder}
        className="w-full cursor-pointer rounded-sg2-sm border border-sg2-gray-300 bg-sg2-bg-card py-sg2-sm pl-sg2-md pr-sg2-3xl text-sg2-body-md text-sg2-text-primary outline-none transition-colors placeholder:text-sg2-gray-500 focus:border-sg2-primary-100 focus:ring-4 focus:ring-sg2-focus-ring/15"
      />
      <IconCalendar className="pointer-events-none absolute right-sg2-md top-1/2 -translate-y-1/2 text-sg2-gray-500" />
    </div>
  );
}

// Same rationale as DateField — ui2/Select has no leading-icon slot, so the
// flag is composed as a raw select rather than fighting the primitive's
// hardcoded padding.
function CountryField() {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-sg2-md top-1/2 -translate-y-1/2 text-[15px] leading-none">🇺🇸</span>
      <select
        defaultValue=""
        className="w-full appearance-none rounded-sg2-sm border border-sg2-gray-300 bg-sg2-bg-card py-sg2-sm pr-sg2-2xl text-sg2-body-md text-sg2-text-primary outline-none transition-colors focus:border-sg2-primary-100 focus:ring-4 focus:ring-sg2-focus-ring/15"
        style={{ paddingLeft: 'calc(var(--spacing-sg2-md) + 22px)' }}
      >
        <option value="" disabled>
          Select country
        </option>
        <option value="us">United States</option>
        <option value="ca">Canada</option>
        <option value="gb">United Kingdom</option>
      </select>
      <svg width={16} height={16} viewBox="0 0 16 16" fill="none" className="pointer-events-none absolute right-sg2-sm top-1/2 -translate-y-1/2 text-sg2-gray-500">
        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function FieldLabel({ children, hint }: { children: ReactNode; hint?: boolean }) {
  return (
    <div className="mb-sg2-xs flex items-center gap-sg2-xs text-sg2-body-md text-sg2-text-primary">
      {children}
      {hint && <IconInfo className="text-sg2-gray-500" width={14} height={14} />}
    </div>
  );
}

function SocialAccountsStep() {
  return (
    <div className="flex flex-col gap-sg2-lg pb-sg2-lg">
      <div className="flex flex-col gap-sg2-sm">
        <p className="text-sg2-body-lg font-semibold text-sg2-text-heading">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </p>
        <p className="text-sg2-body-md text-sg2-text-secondary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </p>
      </div>

      <div>
        <FieldLabel hint>Text Box</FieldLabel>
        <input
          placeholder="Placeholder"
          className="w-full rounded-sg2-sm border border-sg2-gray-300 bg-sg2-bg-card px-sg2-md py-sg2-sm text-sg2-body-md text-sg2-text-primary outline-none transition-colors placeholder:text-sg2-gray-500 focus:border-sg2-primary-100 focus:ring-4 focus:ring-sg2-focus-ring/15"
        />
      </div>

      <div>
        <FieldLabel>Radio Horizontal</FieldLabel>
        <div className="flex flex-wrap items-center gap-sg2-lg">
          <Radio name="wizard2-radio-demo" />
          <Radio name="wizard2-radio-demo" label="Home" />
          <Radio name="wizard2-radio-demo" label="Applications" />
          <Radio name="wizard2-radio-demo" label="Desktop" checked readOnly />
          <Radio name="wizard2-radio-demo-2" label="Downloads" checked readOnly />
          <Radio name="wizard2-radio-demo-2" label="Documents" />
        </div>
      </div>

      <div>
        <FieldLabel>Country Dropdown</FieldLabel>
        <CountryField />
      </div>

      <div>
        <FieldLabel>Datepicker</FieldLabel>
        <DateField placeholder="Choose date" />
      </div>

      <div>
        <FieldLabel>Grouped Multi Select</FieldLabel>
        <Select defaultValue="">
          <option value="" disabled>
            Select grouped items
          </option>
          <optgroup label="Design">
            <option value="ui">UI</option>
            <option value="ux">UX</option>
          </optgroup>
          <optgroup label="Engineering">
            <option value="fe">Frontend</option>
            <option value="be">Backend</option>
          </optgroup>
        </Select>
      </div>

      <div>
        <FieldLabel>Single Select</FieldLabel>
        <Select defaultValue="">
          <option value="" disabled>
            Placeholder
          </option>
          <option value="1">Option one</option>
          <option value="2">Option two</option>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-sg2-lg">
        <div>
          <FieldLabel>Datepicker Start Date</FieldLabel>
          <DateField placeholder="Choose date" />
        </div>
        <div>
          <FieldLabel>Datepicker End Date</FieldLabel>
          <DateField placeholder="Choose date" />
        </div>
      </div>
    </div>
  );
}

function PaymentInfoStep() {
  return (
    <div className="flex flex-col gap-sg2-lg pb-sg2-lg">
      <p className="text-sg2-body-md text-sg2-text-secondary">Add a card to continue. We only store the last 4 digits.</p>
      <div>
        <FieldLabel>Card number</FieldLabel>
        <input
          placeholder="1234 1234 1234 1234"
          className="w-full rounded-sg2-sm border border-sg2-gray-300 bg-sg2-bg-card px-sg2-md py-sg2-sm text-sg2-body-md text-sg2-text-primary outline-none transition-colors placeholder:text-sg2-gray-500 focus:border-sg2-primary-100 focus:ring-4 focus:ring-sg2-focus-ring/15"
        />
      </div>
      <div className="grid grid-cols-2 gap-sg2-lg">
        <div>
          <FieldLabel>Expiry</FieldLabel>
          <input
            placeholder="MM / YY"
            className="w-full rounded-sg2-sm border border-sg2-gray-300 bg-sg2-bg-card px-sg2-md py-sg2-sm text-sg2-body-md text-sg2-text-primary outline-none transition-colors placeholder:text-sg2-gray-500 focus:border-sg2-primary-100 focus:ring-4 focus:ring-sg2-focus-ring/15"
          />
        </div>
        <div>
          <FieldLabel>CVC</FieldLabel>
          <input
            placeholder="123"
            className="w-full rounded-sg2-sm border border-sg2-gray-300 bg-sg2-bg-card px-sg2-md py-sg2-sm text-sg2-body-md text-sg2-text-primary outline-none transition-colors placeholder:text-sg2-gray-500 focus:border-sg2-primary-100 focus:ring-4 focus:ring-sg2-focus-ring/15"
          />
        </div>
      </div>
    </div>
  );
}

function SuccessStep() {
  return (
    <div className="flex flex-col items-center gap-sg2-sm py-sg2-xl text-center">
      <span className="inline-flex h-sg2-7xl w-sg2-7xl items-center justify-center rounded-full bg-sg2-success-20 text-sg2-success-90">
        <IconCheck width={22} height={22} />
      </span>
      <p className="text-sg2-body-lg font-semibold text-sg2-text-heading">You're all set</p>
      <p className="max-w-[24rem] text-sg2-body-md text-sg2-text-secondary">Your account is ready to go — everything above has been saved.</p>
    </div>
  );
}

const STEPS: WizardStep[] = [
  { id: 'personal-info', label: 'Personal info', render: () => null },
  { id: 'social-accounts', label: 'Social accounts', render: SocialAccountsStep },
  { id: 'payment-info', label: 'Payment info', render: PaymentInfoStep },
  { id: 'success', label: 'Success', render: SuccessStep },
];

function StepIcon({ status }: { status: 'done' | 'active' | 'pending' }) {
  if (status === 'done') {
    return (
      <span className="inline-flex h-sg2-xl w-sg2-xl shrink-0 items-center justify-center rounded-full bg-sg2-primary-100 text-sg2-text-on-primary">
        <IconCheck width={11} height={11} strokeWidth={2} />
      </span>
    );
  }
  if (status === 'active') {
    return (
      <span className="inline-flex h-sg2-xl w-sg2-xl shrink-0 items-center justify-center rounded-full border-2 border-sg2-primary-100 bg-sg2-bg-card">
        <span className="h-sg2-sm w-sg2-sm rounded-full bg-sg2-primary-100" />
      </span>
    );
  }
  return <span className="inline-flex h-sg2-xl w-sg2-xl shrink-0 rounded-full border-2 border-sg2-gray-300 bg-sg2-bg-card" />;
}

// Circular progress indicator has no primitive yet — ui2/ProgressBar only
// covers the linear track. One-off conic-gradient ring, same "built for one
// place, promote later if reused" status as the AdvancedFilter pattern's
// grouped nav list.
function ProgressRing({ percent }: { percent: number }) {
  return (
    <span
      className="inline-block h-sg2-lg w-sg2-lg shrink-0 rounded-full"
      style={{ background: `conic-gradient(var(--color-sg2-primary-100) ${percent}%, var(--color-sg2-gray-200) 0)` }}
    >
      <span className="flex h-full w-full items-center justify-center p-[3px]">
        <span className="h-full w-full rounded-full bg-sg2-bg-card" />
      </span>
    </span>
  );
}

// Style Guide 2 pattern — vertical wizard/stepper. Built entirely from
// ui2/ primitives (Button, Radio, Select) plus the same kind of pattern-
// local, not-yet-promoted pieces AdvancedFilterModal needed (a trailing-icon
// date field, a leading-icon select, a circular progress ring).
export function WizardVertical() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const percent = Math.round(((currentIndex + 1) / STEPS.length) * 100);

  return (
    <div className="w-full rounded-sg2-md border border-sg2-gray-200 bg-sg2-bg-card shadow-sg2-xs">
      <div className="border-b border-sg2-gray-200 px-sg2-xl py-sg2-lg">
        <h3 className="text-sg2-body-lg font-semibold text-sg2-text-heading">Wizard (Vertical)</h3>
      </div>

      <div className="px-sg2-xl py-sg2-lg">
        {STEPS.map((step, index) => {
          const status = index < currentIndex ? 'done' : index === currentIndex ? 'active' : 'pending';
          const isLast = index === STEPS.length - 1;
          return (
            <div key={step.id} className="flex gap-sg2-md">
              <div className="flex flex-col items-center">
                <StepIcon status={status} />
                {!isLast && <span className={cx('mt-sg2-xxs w-[2px] flex-1', status === 'done' ? 'bg-sg2-primary-100' : 'bg-sg2-gray-200')} />}
              </div>
              <div className={cx('min-w-0 flex-1', !isLast && 'pb-sg2-lg')}>
                <button
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  className={cx(
                    'text-left text-sg2-body-lg font-medium transition-colors',
                    status === 'active' && 'text-sg2-primary-100',
                    status === 'done' && 'text-sg2-text-primary hover:text-sg2-primary-100',
                    status === 'pending' && 'text-sg2-text-disabled'
                  )}
                >
                  {step.label}
                </button>
                {status === 'active' && <div className="mt-sg2-md">{step.render()}</div>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between border-t border-sg2-gray-200 px-sg2-xl py-sg2-lg">
        <Button
          variant="stroke-gray"
          size="sm"
          icon={<IconArrowLeft width={14} height={14} />}
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
        >
          Previous
        </Button>
        <div className="flex items-center gap-sg2-md">
          <span className="inline-flex items-center gap-sg2-xs rounded-full border border-sg2-primary-40 bg-sg2-primary-30 px-sg2-md py-sg2-xs text-sg2-caption font-medium text-sg2-primary-90">
            <ProgressRing percent={percent} />
            {percent}% done – keep going!
          </span>
          <Button
            variant="primary"
            size="sm"
            className="flex-row-reverse"
            icon={<IconArrowRight width={14} height={14} />}
            disabled={currentIndex === STEPS.length - 1}
            onClick={() => setCurrentIndex((i) => Math.min(STEPS.length - 1, i + 1))}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
