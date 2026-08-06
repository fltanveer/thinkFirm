import { useState } from 'react';
import { Button } from '../components/ui2/Button';
import { ButtonGroup } from '../components/ui2/ButtonGroup';
import { SplitButton } from '../components/ui2/SplitButton';
import { Checkbox } from '../components/ui2/Checkbox';
import { Radio } from '../components/ui2/Radio';
import { Switch } from '../components/ui2/Switch';
import { Input } from '../components/ui2/Input';
import { Select } from '../components/ui2/Select';
import { Combobox } from '../components/ui2/Combobox';
import { Tabs } from '../components/ui2/Tabs';
import { Modal } from '../components/ui2/Modal';
import { ConfirmModal, type ConfirmVariant } from '../components/ui2/ConfirmModal';
import { Pill } from '../components/ui2/Pill';
import { Badge, BadgeDot } from '../components/ui2/Badge';
import { ProgressBar } from '../components/ui2/ProgressBar';
import { Card } from '../components/ui2/Card';
import { Avatar, AvatarGroup } from '../components/ui2/Avatar';
import { Table, type TableColumn } from '../components/ui2/Table';
import {
  IconPlus,
  IconShield,
  IconFolder,
  IconBarChart,
  IconDots,
  IconChevronDown,
} from '../components/ui/icons';
import { GlobalHeader } from '../components/docs/GlobalHeader';
import { SideNav2 } from '../components/styleguide2/SideNav2';
import { Section, SubSection } from '../components/styleguide/Section';
import { ColorSwatch2 } from '../components/styleguide2/ColorSwatch2';
import { RadiusSwatch2 } from '../components/styleguide2/RadiusSwatch2';
import { ShadowSwatch2 } from '../components/styleguide2/ShadowSwatch2';
import { TypeSpecimen2 } from '../components/styleguide2/TypeSpecimen2';
import {
  colors2,
  radius2,
  typeScale2,
  lineHeights2,
  fontWeights2,
  shadowScale2,
  componentHeights2,
  iconSizes2,
} from '../tokens/generated-2';

const BUTTON_SIZES = ['sm', 'md', 'lg'] as const;
const BUTTON_VARIANTS = ['primary', 'stroke', 'stroke-gray', 'ghost'] as const;

function ButtonRow({ variant }: { variant: (typeof BUTTON_VARIANTS)[number] }) {
  return (
    <div className="flex flex-col gap-sg2-md">
      {BUTTON_SIZES.map((size) => (
        <div key={size} className="flex flex-wrap items-center gap-sg2-md">
          <span className="w-8 text-sg2-caption text-sg2-text-secondary">{size}</span>
          <Button variant={variant} size={size}>
            Default
          </Button>
          <Button variant={variant} size={size} disabled>
            Disabled
          </Button>
          <Button variant={variant} size={size} loading>
            Loading
          </Button>
        </div>
      ))}
      <p className="text-sg2-caption text-sg2-text-secondary">Hover / click the buttons above to preview live hover &amp; active states.</p>
    </div>
  );
}

interface Person {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'invited' | 'suspended';
}

const PEOPLE: Person[] = [
  { id: '1', name: 'Aria Chen', email: 'aria@thinkfirm.io', role: 'Admin', status: 'active' },
  { id: '2', name: 'Ben Okafor', email: 'ben@thinkfirm.io', role: 'Editor', status: 'active' },
  { id: '3', name: 'Carmen Ruiz', email: 'carmen@thinkfirm.io', role: 'Viewer', status: 'invited' },
  { id: '4', name: 'Devon Blake', email: 'devon@thinkfirm.io', role: 'Editor', status: 'suspended' },
];

const STATUS_PILL: Record<Person['status'], { variant: 'success' | 'info' | 'error'; label: string }> = {
  active: { variant: 'success', label: 'Active' },
  invited: { variant: 'info', label: 'Invited' },
  suspended: { variant: 'error', label: 'Suspended' },
};

const PEOPLE_COLUMNS: TableColumn<Person>[] = [
  {
    key: 'name',
    header: 'Name',
    render: (row) => (
      <div className="flex items-center gap-sg2-sm">
        <Avatar name={row.name} size="sm" />
        <div className="flex flex-col">
          <span className="font-medium text-sg2-text-primary">{row.name}</span>
          <span className="text-sg2-caption text-sg2-text-secondary">{row.email}</span>
        </div>
      </div>
    ),
  },
  { key: 'role', header: 'Role', render: (row) => row.role },
  {
    key: 'status',
    header: 'Status',
    render: (row) => <Pill variant={STATUS_PILL[row.status].variant} dot>{STATUS_PILL[row.status].label}</Pill>,
  },
  {
    key: 'actions',
    header: '',
    align: 'right',
    render: () => (
      <Button variant="ghost" size="sm" iconOnly icon={<IconDots />} aria-label="Row actions" />
    ),
  },
];

const COMBOBOX_OPTIONS = [
  { value: 'aria', label: 'Aria Chen' },
  { value: 'ben', label: 'Ben Okafor' },
  { value: 'carmen', label: 'Carmen Ruiz' },
  { value: 'devon', label: 'Devon Blake' },
  { value: 'elin', label: 'Elin Sorensen' },
  { value: 'farid', label: 'Farid Haidari' },
];

const CONFIRM_VARIANTS: { variant: ConfirmVariant; title: string; message: string }[] = [
  { variant: 'error', title: 'Delete project?', message: 'This action permanently deletes the project and cannot be undone.' },
  { variant: 'warning', title: 'Unsaved changes', message: 'You have unsaved changes that will be lost if you leave this page.' },
  { variant: 'success', title: 'Payment received', message: 'Your subscription has been renewed for another 12 months.' },
  { variant: 'info', title: 'New version available', message: 'A new version of the app is ready — reload to update.' },
];

type ModalSizeKey = 'sm' | 'md' | 'lg';

export default function StyleGuide2() {
  const [cbList, setCbList] = useState([true, false, true]);
  const [radioPlan, setRadioPlan] = useState<'free' | 'pro' | 'team'>('pro');
  const [switchOn, setSwitchOn] = useState(true);

  const [textValue, setTextValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [comboSingle, setComboSingle] = useState<string | null>(null);
  const [comboMulti, setComboMulti] = useState<string[]>(['aria', 'ben']);

  const [underlineTab, setUnderlineTab] = useState('overview');
  const [segmentedTab, setSegmentedTab] = useState('week');
  const [boxedTab, setBoxedTab] = useState('general');
  const [iconFilledTab, setIconFilledTab] = useState('shield');
  const [iconPillTab, setIconPillTab] = useState('activity');

  const [modalOpen, setModalOpen] = useState<ModalSizeKey | null>(null);
  const [scrollModalOpen, setScrollModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState<ConfirmVariant | null>(null);

  // Interactive-States aliases (primary-default, danger-hover, ...) live in
  // the same flat colors2 object and would otherwise collide with these
  // startsWith() filters — restricted to numeric ramp steps only so they
  // show up once, in the dedicated "Interactive states" grid below.
  const numericStep = (prefix: string) => new RegExp(`^${prefix}-\\d+$`);
  const primaryColors = Object.entries(colors2).filter(([k]) => numericStep('primary').test(k));
  const grayColors = Object.entries(colors2).filter(([k]) => numericStep('gray').test(k));
  const dangerColors = Object.entries(colors2).filter(([k]) => numericStep('danger').test(k));
  const warningColors = Object.entries(colors2).filter(([k]) => numericStep('warning').test(k));
  const successColors = Object.entries(colors2).filter(([k]) => numericStep('success').test(k));
  const infoColors = Object.entries(colors2).filter(([k]) => numericStep('info').test(k));
  const backgroundKeys = ['bg-page', 'bg-layout', 'bg-card', 'bg-nested-card', 'bg-well', 'bg-primary-subtle'];
  const backgroundColors = backgroundKeys.map((k) => [k, colors2[k as keyof typeof colors2]] as const);
  const baseColors = (['white', 'black'] as const).map((k) => [k, colors2[k]] as const);
  const supportingColors = Object.entries(colors2).filter(([k]) => k.startsWith('supporting-'));
  const textColors = Object.entries(colors2).filter(([k]) => k.startsWith('text-'));
  const borderColors = Object.entries(colors2).filter(([k]) => k.startsWith('border-'));
  const interactiveKeys = ['primary-default', 'primary-hover', 'primary-pressed', 'primary-disabled', 'danger-default', 'danger-hover', 'success-default', 'warning-default'];
  const interactiveColors = interactiveKeys.map((k) => [k, colors2[k as keyof typeof colors2]] as const);

  return (
    <div className="style-guide">
      <GlobalHeader />
      <div className="guide-layout">
        <SideNav2 />
        <main className="guide-main min-w-0 flex-1" id="top">
          <header className="guide-hero">
            <div className="guide-hero__copy">
              <div className="guide-kicker"><span>●</span> Interface library · Style Guide 2</div>
              <h1>Same components.<br /><em>A second language.</em></h1>
              <p>Every primitive from Style Guide 1, rebuilt against a second, structurally different token export — proof the component layer and the token layer are properly decoupled.</p>
              <div className="guide-hero__actions">
                <a href="#sg2-buttons">Explore components <span>↓</span></a>
                <span>Powered by <code>tokens-old.json</code></span>
              </div>
            </div>
            <div className="guide-hero__stats" aria-label="Style guide 2 summary">
              <div><strong>08</strong><span>Component groups</span></div>
              <div><strong>{Object.keys(colors2).length}</strong><span>Color tokens</span></div>
              <div><strong>100%</strong><span>Inspectable</span></div>
            </div>
          </header>

        <Section id="sg2-buttons" title="Buttons" description="Primary, stroke (brand + gray) and ghost variants across sm/md/lg, plus disabled and loading states.">
          <SubSection title="Primary">
            <ButtonRow variant="primary" />
          </SubSection>
          <SubSection title="Stroke">
            <ButtonRow variant="stroke" />
          </SubSection>
          <SubSection title="Stroke — gray (neutral secondary)">
            <ButtonRow variant="stroke-gray" />
          </SubSection>
          <SubSection title="Ghost">
            <ButtonRow variant="ghost" />
          </SubSection>
          <SubSection title="Icon-only">
            <div className="flex flex-wrap items-center gap-sg2-md">
              {BUTTON_VARIANTS.map((variant) =>
                BUTTON_SIZES.map((size) => (
                  <Button key={`${variant}-${size}`} variant={variant} size={size} iconOnly icon={<IconPlus />} aria-label="Add" />
                ))
              )}
            </div>
          </SubSection>
        </Section>

        <Section id="sg2-button-groups" title="Button Groups & Split Button" description="Joined button rows, and a primary action with an attached dropdown of secondary actions.">
          <SubSection title="Button group">
            <div className="flex flex-wrap items-center gap-sg2-xl">
              <ButtonGroup>
                <Button variant="stroke-gray" size="sm">Day</Button>
                <Button variant="stroke-gray" size="sm">Week</Button>
                <Button variant="stroke-gray" size="sm">Month</Button>
                <Button variant="stroke-gray" size="sm">Year</Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button variant="primary" size="md" iconOnly icon={<IconPlus />} aria-label="Add" />
                <Button variant="primary" size="md" iconOnly icon={<IconDots />} aria-label="More" />
                <Button variant="primary" size="md" iconOnly icon={<IconChevronDown />} aria-label="Expand" />
              </ButtonGroup>
            </div>
          </SubSection>
          <SubSection title="Split button">
            <div className="flex flex-wrap items-center gap-sg2-xl">
              <SplitButton
                label="Deploy"
                variant="primary"
                options={[
                  { value: 'staging', label: 'Deploy to staging' },
                  { value: 'preview', label: 'Deploy preview' },
                  { value: 'rollback', label: 'Rollback last deploy' },
                ]}
                onSelect={() => {}}
              />
              <SplitButton
                label="Export"
                variant="stroke-gray"
                options={[
                  { value: 'csv', label: 'Export as CSV' },
                  { value: 'json', label: 'Export as JSON' },
                  { value: 'pdf', label: 'Export as PDF' },
                ]}
                onSelect={() => {}}
              />
            </div>
          </SubSection>
        </Section>

        <Section id="sg2-checkboxes" title="Checkboxes & Radio" description="Unchecked, checked, indeterminate and disabled states, each in three sizes.">
          <SubSection title="Checkbox — sizes">
            <div className="flex flex-wrap items-center gap-sg2-2xl">
              <Checkbox size="sm" label="Small" checked onChange={() => {}} />
              <Checkbox size="md" label="Medium (default)" checked onChange={() => {}} />
              <Checkbox size="lg" label="Large" checked onChange={() => {}} />
            </div>
          </SubSection>
          <SubSection title="Checkbox — states">
            <div className="flex flex-wrap gap-sg2-2xl">
              <Checkbox label="Unchecked" checked={false} onChange={() => {}} />
              <Checkbox label="Checked" checked={true} onChange={() => {}} />
              <Checkbox label="Indeterminate" indeterminate onChange={() => {}} />
              <Checkbox label="Disabled — unchecked" disabled checked={false} onChange={() => {}} />
              <Checkbox label="Disabled — checked" disabled checked={true} onChange={() => {}} />
              <Checkbox label="Disabled — indeterminate" disabled indeterminate onChange={() => {}} />
            </div>
          </SubSection>
          <SubSection title="Checkbox list">
            <div className="flex flex-col gap-sg2-sm rounded-sg2-sm border border-sg2-gray-200 bg-sg2-bg-card p-sg2-lg">
              {['Email notifications', 'SMS notifications', 'Push notifications'].map((label, i) => (
                <Checkbox
                  key={label}
                  label={label}
                  checked={cbList[i]}
                  onChange={() => setCbList((prev) => prev.map((v, idx) => (idx === i ? !v : v)))}
                />
              ))}
            </div>
          </SubSection>
          <SubSection title="Radio — sizes">
            <div className="flex flex-wrap items-center gap-sg2-2xl">
              <Radio size="sm" name="sg2-radio-size-demo-sm" label="Small" checked readOnly />
              <Radio size="md" name="sg2-radio-size-demo-md" label="Medium (default)" checked readOnly />
              <Radio size="lg" name="sg2-radio-size-demo-lg" label="Large" checked readOnly />
            </div>
          </SubSection>
          <SubSection title="Radio — group">
            <div className="flex flex-col gap-sg2-sm rounded-sg2-sm border border-sg2-gray-200 bg-sg2-bg-card p-sg2-lg">
              {(['free', 'pro', 'team'] as const).map((plan) => (
                <Radio
                  key={plan}
                  name="sg2-radio-plan"
                  label={plan === 'free' ? 'Free' : plan === 'pro' ? 'Pro' : 'Team'}
                  checked={radioPlan === plan}
                  onChange={() => setRadioPlan(plan)}
                />
              ))}
              <Radio name="sg2-radio-plan" label="Enterprise (disabled)" disabled checked={false} onChange={() => {}} />
            </div>
          </SubSection>
        </Section>

        <Section id="sg2-switches" title="Switches" description="On/off and disabled variants, in three sizes — track capped at radius-sm (4px), knob at radius-xs (2px), tokens-old.json's equivalents of style guide 1's radius-xs/radius-xxs ceiling.">
          <SubSection title="Sizes">
            <div className="flex flex-wrap items-center gap-sg2-2xl">
              <Switch size="sm" label="Small" checked onChange={() => {}} />
              <Switch size="md" label="Medium (default)" checked onChange={() => {}} />
              <Switch size="lg" label="Large" checked onChange={() => {}} />
            </div>
          </SubSection>
          <SubSection title="States">
            <div className="flex flex-wrap gap-sg2-2xl">
              <Switch label="On" checked={switchOn} onChange={() => setSwitchOn((v) => !v)} />
              <Switch label="Off" checked={false} onChange={() => {}} />
              <Switch label="Disabled — on" disabled checked={true} onChange={() => {}} />
              <Switch label="Disabled — off" disabled checked={false} onChange={() => {}} />
            </div>
          </SubSection>
        </Section>

        <Section id="sg2-inputs" title="Inputs & Selects" description="Text inputs, native selects and a searchable combobox — all capped at radius-sm (4px).">
          <SubSection title="Text input — sizes">
            <div className="flex max-w-[36rem] flex-col gap-sg2-lg">
              <Input size="sm" label="Small" placeholder="Enter a value" />
              <Input size="md" label="Medium (default)" placeholder="Enter a value" />
              <Input size="lg" label="Large" placeholder="Enter a value" />
            </div>
          </SubSection>
          <SubSection title="Text input — states">
            <div className="grid max-w-[36rem] grid-cols-2 gap-sg2-lg">
              <Input label="Default" placeholder="Enter a value" value={textValue} onChange={(e) => setTextValue(e.target.value)} />
              <Input label="Focused" placeholder="Click to focus" autoFocus helperText="This field has autofocus for demo purposes" />
              <Input label="Error" placeholder="Enter a value" defaultValue="not-an-email" error="Enter a valid email address" />
              <Input label="Disabled" placeholder="Enter a value" disabled helperText="This field is disabled" />
            </div>
          </SubSection>
          <SubSection title="Select — sizes">
            <div className="flex max-w-[36rem] flex-col gap-sg2-lg">
              <Select size="sm" label="Small" defaultValue="free">
                <option value="free">Free</option>
                <option value="pro">Pro</option>
              </Select>
              <Select size="md" label="Medium (default)" defaultValue="free">
                <option value="free">Free</option>
                <option value="pro">Pro</option>
              </Select>
              <Select size="lg" label="Large" defaultValue="free">
                <option value="free">Free</option>
                <option value="pro">Pro</option>
              </Select>
            </div>
          </SubSection>
          <SubSection title="Select — states">
            <div className="grid max-w-[36rem] grid-cols-2 gap-sg2-lg">
              <Select label="Default" value={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
                <option value="">Choose a plan</option>
                <option value="free">Free</option>
                <option value="pro">Pro</option>
                <option value="team">Team</option>
              </Select>
              <Select label="Error" defaultValue="" error="Please choose a plan">
                <option value="">Choose a plan</option>
                <option value="free">Free</option>
              </Select>
              <Select label="Disabled" disabled defaultValue="free">
                <option value="free">Free</option>
              </Select>
            </div>
          </SubSection>
          <SubSection title="Searchable combobox — sizes">
            <div className="flex max-w-[36rem] flex-col gap-sg2-lg">
              <Combobox size="sm" label="Small" options={COMBOBOX_OPTIONS} value={null} onChange={() => {}} placeholder="Search people…" />
              <Combobox size="md" label="Medium (default)" options={COMBOBOX_OPTIONS} value={null} onChange={() => {}} placeholder="Search people…" />
              <Combobox size="lg" label="Large" options={COMBOBOX_OPTIONS} value={null} onChange={() => {}} placeholder="Search people…" />
            </div>
          </SubSection>
          <SubSection title="Searchable combobox — variants">
            <div className="grid max-w-[36rem] grid-cols-1 gap-sg2-lg">
              <Combobox label="Single-select" options={COMBOBOX_OPTIONS} value={comboSingle} onChange={setComboSingle} placeholder="Search people…" />
              <Combobox label="Multi-select" multiple options={COMBOBOX_OPTIONS} value={comboMulti} onChange={setComboMulti} placeholder="Add people…" />
              <Combobox label="No matches (try typing 'zzz')" options={COMBOBOX_OPTIONS} value={null} onChange={() => {}} />
            </div>
          </SubSection>
        </Section>

        <Section id="sg2-tabs" title="Tabs" description="Underline, segmented/pill, boxed/card and two icon-tab styles.">
          <SubSection title="Underline — dashboard navigation">
            <Tabs
              variant="underline"
              items={[
                { value: 'overview', label: 'Overview' },
                { value: 'activity', label: 'Activity' },
                { value: 'settings', label: 'Settings' },
                { value: 'archived', label: 'Archived', disabled: true },
              ]}
              value={underlineTab}
              onChange={setUnderlineTab}
            />
          </SubSection>
          <SubSection title="Segmented / pill — filter toggle">
            <Tabs
              variant="segmented"
              items={[
                { value: 'day', label: 'Day' },
                { value: 'week', label: 'Week' },
                { value: 'month', label: 'Month' },
              ]}
              value={segmentedTab}
              onChange={setSegmentedTab}
              className="max-w-[24rem]"
            />
          </SubSection>
          <SubSection title="Boxed / card — settings navigation">
            <Tabs
              variant="boxed"
              items={[
                { value: 'general', label: 'General' },
                { value: 'billing', label: 'Billing' },
                { value: 'members', label: 'Members', disabled: true },
              ]}
              value={boxedTab}
              onChange={setBoxedTab}
            />
          </SubSection>
          <SubSection title="Icon-filled — active tab gets a color fill">
            <Tabs
              variant="icon-filled"
              items={[
                { value: 'shield', label: 'Label', icon: <IconShield width={16} height={16} /> },
                { value: 'folder', label: 'Label', icon: <IconFolder width={16} height={16} /> },
              ]}
              value={iconFilledTab}
              onChange={setIconFilledTab}
            />
          </SubSection>
          <SubSection title="Icon-pill — neutral fill, with badge count">
            <Tabs
              variant="icon-pill"
              items={[
                { value: 'activity', label: 'Activity', icon: <IconBarChart width={16} height={16} /> },
                { value: 'details', label: 'Details', icon: <IconBarChart width={16} height={16} /> },
                { value: 'legal', label: 'Legal', icon: <IconBarChart width={16} height={16} />, badge: 3 },
                { value: 'documents', label: 'Documents', icon: <IconBarChart width={16} height={16} /> },
              ]}
              value={iconPillTab}
              onChange={setIconPillTab}
            />
          </SubSection>
        </Section>

        <Section id="sg2-modals" title="Modals" description="Standard modal (sm/md/lg), scrollable body, and confirmation modals in all four color variants.">
          <SubSection title="Standard modal">
            <div className="flex flex-wrap gap-sg2-md">
              <Button variant="stroke" size="sm" onClick={() => setModalOpen('sm')}>Open small</Button>
              <Button variant="stroke" size="sm" onClick={() => setModalOpen('md')}>Open medium</Button>
              <Button variant="stroke" size="sm" onClick={() => setModalOpen('lg')}>Open large</Button>
              <Button variant="stroke" size="sm" onClick={() => setScrollModalOpen(true)}>Open scrollable</Button>
            </div>
          </SubSection>
          <SubSection title="Confirmation modals">
            <div className="flex flex-wrap gap-sg2-md">
              {CONFIRM_VARIANTS.map((c) => (
                <Button key={c.variant} variant="stroke" size="sm" onClick={() => setConfirmOpen(c.variant)}>
                  Open {c.variant}
                </Button>
              ))}
            </div>
          </SubSection>
        </Section>

        <Section id="sg2-pills-badges" title="Pills & Badges" description="Compact status labels and count/dot indicators — capped at radius-xs (2px), same as checkboxes.">
          <SubSection title="Pills — status labels">
            <div className="flex flex-wrap gap-sg2-sm">
              <Pill variant="neutral">Draft</Pill>
              <Pill variant="primary">In review</Pill>
              <Pill variant="info" dot>Scheduled</Pill>
              <Pill variant="success" dot>Active</Pill>
              <Pill variant="warning" dot>At risk</Pill>
              <Pill variant="error" dot>Suspended</Pill>
            </div>
          </SubSection>
          <SubSection title="Badges — count">
            <div className="flex flex-wrap items-center gap-sg2-xl">
              <span className="inline-flex items-center gap-sg2-xs text-sg2-body-md text-sg2-text-primary">Inbox <Badge>4</Badge></span>
              <span className="inline-flex items-center gap-sg2-xs text-sg2-body-md text-sg2-text-primary">Errors <Badge variant="error">12</Badge></span>
              <span className="inline-flex items-center gap-sg2-xs text-sg2-body-md text-sg2-text-primary">Drafts <Badge variant="neutral">99+</Badge></span>
            </div>
          </SubSection>
          <SubSection title="Badges — dot indicator">
            <div className="flex flex-wrap items-center gap-sg2-2xl">
              <span className="relative inline-flex">
                <Button variant="stroke-gray" size="sm" iconOnly icon={<IconDots />} aria-label="Notifications" />
                <BadgeDot className="absolute -right-sg2-xxs -top-sg2-xxs" />
              </span>
              <span className="relative inline-flex">
                <Avatar name="Elin Sorensen" size="md" />
                <BadgeDot variant="success" className="absolute -right-sg2-xxs -top-sg2-xxs" />
              </span>
            </div>
          </SubSection>
        </Section>

        <Section id="sg2-progress" title="Progress" description="Determinate and indeterminate progress bars, in two sizes and every semantic color.">
          <SubSection title="Sizes & values">
            <div className="flex max-w-[28rem] flex-col gap-sg2-lg">
              <ProgressBar size="sm" value={35} label="Small" showValue />
              <ProgressBar size="md" value={68} label="Medium (default)" showValue />
            </div>
          </SubSection>
          <SubSection title="Semantic colors">
            <div className="flex max-w-[28rem] flex-col gap-sg2-lg">
              <ProgressBar variant="primary" value={72} label="Upload progress" showValue />
              <ProgressBar variant="success" value={100} label="Backup complete" showValue />
              <ProgressBar variant="warning" value={82} label="Storage used" showValue />
              <ProgressBar variant="error" value={18} label="Sync failing" showValue />
              <ProgressBar variant="info" indeterminate label="Processing…" />
            </div>
          </SubSection>
        </Section>

        <Section id="sg2-cards" title="Cards" description="Header/body/footer container, capped at radius-sm (4px).">
          <SubSection title="Basic & with header actions">
            <div className="grid max-w-[42rem] grid-cols-2 gap-sg2-lg">
              <Card title="Basic card">
                <p className="text-sg2-body-md text-sg2-text-secondary">A card with just a title and body content — no footer or header actions.</p>
              </Card>
              <Card title="Team members" subtitle="4 people" actions={<Button variant="ghost" size="sm" iconOnly icon={<IconDots />} aria-label="Card actions" />}>
                <AvatarGroup people={PEOPLE.map((p) => ({ name: p.name }))} size="sm" />
              </Card>
            </div>
          </SubSection>
          <SubSection title="Stat card & card with footer">
            <div className="grid max-w-[42rem] grid-cols-2 gap-sg2-lg">
              <Card>
                <div className="flex flex-col gap-sg2-xs">
                  <span className="text-sg2-caption text-sg2-text-secondary">Monthly revenue</span>
                  <span className="text-sg2-h4 font-semibold text-sg2-text-heading">$48,200</span>
                  <Pill variant="success" dot className="w-fit">+12.4% vs last month</Pill>
                </div>
              </Card>
              <Card title="Delete workspace" subtitle="This action cannot be undone" footer={<div className="flex justify-end gap-sg2-sm"><Button variant="stroke-gray" size="sm">Cancel</Button><Button variant="primary" size="sm">Delete</Button></div>}>
                <p className="text-sg2-body-md text-sg2-text-secondary">All projects, members and billing history will be permanently removed.</p>
              </Card>
            </div>
          </SubSection>
        </Section>

        <Section id="sg2-avatars" title="Avatars" description="Circle (exempt from the radius ceiling) or square (radius-sm/4px). Initials fill deterministically from the primary ramp.">
          <SubSection title="Sizes">
            <div className="flex flex-wrap items-end gap-sg2-lg">
              <Avatar name="Aria Chen" size="sm" />
              <Avatar name="Ben Okafor" size="md" />
              <Avatar name="Carmen Ruiz" size="lg" />
              <Avatar name="Devon Blake" size="xl" />
            </div>
          </SubSection>
          <SubSection title="Shape — square (radius-sm)">
            <div className="flex flex-wrap items-end gap-sg2-lg">
              <Avatar name="Aria Chen" size="sm" shape="square" />
              <Avatar name="Ben Okafor" size="md" shape="square" />
              <Avatar name="Carmen Ruiz" size="lg" shape="square" status="online" />
              <Avatar name="Devon Blake" size="xl" shape="square" />
            </div>
          </SubSection>
          <SubSection title="Status indicator">
            <div className="flex flex-wrap gap-sg2-lg">
              <Avatar name="Aria Chen" status="online" />
              <Avatar name="Ben Okafor" status="away" />
              <Avatar name="Carmen Ruiz" status="busy" />
              <Avatar name="Devon Blake" status="offline" />
            </div>
          </SubSection>
          <SubSection title="Group with overflow">
            <AvatarGroup people={[...PEOPLE.map((p) => ({ name: p.name })), { name: 'Elin Sorensen' }, { name: 'Farid Haidari' }]} max={4} />
          </SubSection>
        </Section>

        <Section id="sg2-table" title="Table" description="Header row, hover states and mixed cell content (avatar, pill, row actions) — outer wrapper capped at radius-sm (4px).">
          <SubSection title="People">
            <Table columns={PEOPLE_COLUMNS} data={PEOPLE} getRowKey={(row) => row.id} />
          </SubSection>
        </Section>

        <Section id="sg2-colors" title="Colors & Backgrounds" description="Every color group in tokens-old.json, labeled with token name and hex value.">
          <SubSection title="Primary ramp (10–100)">
            <div className="grid grid-cols-5 gap-sg2-md sm:grid-cols-10">
              {primaryColors.map(([name, hex]) => (
                <ColorSwatch2 key={name} name={name} hex={hex} />
              ))}
            </div>
          </SubSection>
          <SubSection title="Neutral-Gray (50–950)">
            <div className="grid grid-cols-6 gap-sg2-md sm:grid-cols-11">
              {grayColors.map(([name, hex]) => (
                <ColorSwatch2 key={name} name={name} hex={hex} />
              ))}
            </div>
          </SubSection>
          <SubSection title="Danger">
            <div className="grid grid-cols-5 gap-sg2-md">
              {dangerColors.map(([name, hex]) => (
                <ColorSwatch2 key={name} name={name} hex={hex} />
              ))}
            </div>
          </SubSection>
          <SubSection title="Warning">
            <div className="grid grid-cols-5 gap-sg2-md">
              {warningColors.map(([name, hex]) => (
                <ColorSwatch2 key={name} name={name} hex={hex} />
              ))}
            </div>
          </SubSection>
          <SubSection title="Success">
            <div className="grid grid-cols-5 gap-sg2-md">
              {successColors.map(([name, hex]) => (
                <ColorSwatch2 key={name} name={name} hex={hex} />
              ))}
            </div>
          </SubSection>
          <SubSection title="Info">
            <div className="grid grid-cols-5 gap-sg2-md">
              {infoColors.map(([name, hex]) => (
                <ColorSwatch2 key={name} name={name} hex={hex} />
              ))}
            </div>
          </SubSection>
          <SubSection title="Backgrounds">
            <div className="grid grid-cols-3 gap-sg2-md sm:grid-cols-6">
              {backgroundColors.map(([name, hex]) => (
                <ColorSwatch2 key={name} name={name} hex={hex} />
              ))}
            </div>
          </SubSection>
          <SubSection title="Base, Supporting, Text, Border — groups tokens.json doesn't have">
            <div className="grid grid-cols-3 gap-sg2-md sm:grid-cols-6">
              {[...baseColors, ...supportingColors, ...textColors, ...borderColors].map(([name, hex]) => (
                <ColorSwatch2 key={name} name={name} hex={hex} />
              ))}
            </div>
          </SubSection>
          <SubSection title="Interactive states — explicit default/hover/pressed/disabled aliases">
            <div className="grid grid-cols-4 gap-sg2-md">
              {interactiveColors.map(([name, hex]) => (
                <ColorSwatch2 key={name} name={name} hex={hex} />
              ))}
            </div>
          </SubSection>
        </Section>

        <Section id="sg2-typography" title="Typography, Radius & Shadows" description="Type scale, radius scale and shadow scale as visual references.">
          <SubSection title="Type scale">
            <div className="flex flex-col">
              {typeScale2.map((t) => (
                <TypeSpecimen2 key={t.name} {...t} />
              ))}
            </div>
            <p className="text-sg2-caption text-sg2-text-secondary">
              Unlike tokens.json, line-heights here aren't paired per size — they're three reusable modes:{' '}
              {lineHeights2.map((l) => `${l.name} (${l.value})`).join(', ')}.
            </p>
          </SubSection>
          <SubSection title="Font weights">
            <div className="flex flex-col gap-sg2-sm">
              {Object.entries(fontWeights2).map(([key, label]) => (
                <div key={key} className="flex items-center gap-sg2-lg">
                  <span className="w-32 text-sg2-caption text-sg2-text-secondary">{key}</span>
                  <span
                    className={
                      key === 'bold' ? 'text-sg2-body-md font-bold' : key === 'semibold' ? 'text-sg2-body-md font-semibold' : key === 'medium' ? 'text-sg2-body-md font-medium' : 'text-sg2-body-md font-normal'
                    }
                  >
                    {label} — The quick brown fox jumps over the lazy dog
                  </span>
                </div>
              ))}
            </div>
          </SubSection>
          <SubSection title="Radius scale">
            <div className="grid grid-cols-6 gap-sg2-lg sm:grid-cols-11">
              {Object.entries(radius2).map(([name, px]) => (
                <RadiusSwatch2 key={name} name={name} px={px} />
              ))}
            </div>
          </SubSection>
          <SubSection title="Shadow scale (approximated — offset/blur not in tokens-old.json, only colors)">
            <div className="grid grid-cols-4 gap-sg2-lg sm:grid-cols-7">
              {shadowScale2.map((s) => (
                <ShadowSwatch2 key={s.tier} name={s.tier} boxShadow={s.boxShadow} token={s.token} />
              ))}
            </div>
          </SubSection>
          <SubSection title="Sizing — component heights & icon sizes (no equivalent group in tokens.json)">
            <div className="flex flex-wrap gap-sg2-xl">
              {componentHeights2.map((s) => (
                <div key={s.name} className="flex flex-col items-center gap-sg2-xs">
                  <div className="flex items-center justify-center rounded-sg2-sm border border-sg2-gray-300 bg-sg2-bg-card px-sg2-md text-sg2-caption text-sg2-text-secondary" style={{ height: `${s.px}px` }}>
                    {s.px}px
                  </div>
                  <div className="text-sg2-caption text-sg2-text-primary">size-{s.name}</div>
                </div>
              ))}
              {iconSizes2.map((s) => (
                <div key={s.name} className="flex flex-col items-center gap-sg2-xs">
                  <div className="flex items-center justify-center rounded-sg2-sm border border-sg2-gray-300 bg-sg2-bg-card text-sg2-text-secondary" style={{ width: `${s.px}px`, height: `${s.px}px` }}>
                    +
                  </div>
                  <div className="text-sg2-caption text-sg2-text-primary">icon-{s.name} · {s.px}px</div>
                </div>
              ))}
            </div>
          </SubSection>
        </Section>
        </main>
      </div>

      <Modal open={modalOpen === 'sm'} onClose={() => setModalOpen(null)} title="Small modal" size="sm" footer={<><Button variant="stroke" size="sm" onClick={() => setModalOpen(null)}>Cancel</Button><Button size="sm" onClick={() => setModalOpen(null)}>Save</Button></>}>
        A compact modal, useful for quick confirmations or single-field forms.
      </Modal>
      <Modal open={modalOpen === 'md'} onClose={() => setModalOpen(null)} title="Medium modal" size="md" footer={<><Button variant="stroke" size="sm" onClick={() => setModalOpen(null)}>Cancel</Button><Button size="sm" onClick={() => setModalOpen(null)}>Save</Button></>}>
        The default modal size for most forms and detail views.
      </Modal>
      <Modal open={modalOpen === 'lg'} onClose={() => setModalOpen(null)} title="Large modal" size="lg" footer={<><Button variant="stroke" size="sm" onClick={() => setModalOpen(null)}>Cancel</Button><Button size="sm" onClick={() => setModalOpen(null)}>Save</Button></>}>
        A wide modal for dense content such as tables or multi-column forms.
      </Modal>
      <Modal
        open={scrollModalOpen}
        onClose={() => setScrollModalOpen(false)}
        title="Terms of service"
        size="md"
        scrollableBody
        footer={<><Button variant="stroke" size="sm" onClick={() => setScrollModalOpen(false)}>Decline</Button><Button size="sm" onClick={() => setScrollModalOpen(false)}>Accept</Button></>}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <p key={i} className="mb-sg2-md">
            Section {i + 1}: this is placeholder long-form content used to demonstrate the modal body scrolling once it
            exceeds the available height, while the header and footer stay fixed in place.
          </p>
        ))}
      </Modal>

      {CONFIRM_VARIANTS.map((c) => (
        <ConfirmModal
          key={c.variant}
          open={confirmOpen === c.variant}
          onClose={() => setConfirmOpen(null)}
          onConfirm={() => setConfirmOpen(null)}
          variant={c.variant}
          title={c.title}
          message={c.message}
        />
      ))}
    </div>
  );
}
