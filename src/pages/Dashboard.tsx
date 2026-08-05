import { useState } from 'react';
import { Sidebar, type SidebarSection, type SidebarBottomLink } from '../components/app/Sidebar';
import { Breadcrumb } from '../components/app/Breadcrumb';
import { StatTile } from '../components/app/StatTile';
import { Button } from '../components/ui/Button';
import { Tabs, type TabItem } from '../components/ui/Tabs';
import { Table, type TableColumn } from '../components/ui/Table';
import { Pagination } from '../components/ui/Pagination';
import { Pill } from '../components/ui/Pill';
import { Chip } from '../components/ui/Chip';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import {
  IconBarChart,
  IconMonitor,
  IconShield,
  IconTarget,
  IconClipboard,
  IconFolder,
  IconAlertTriangle,
  IconSliders,
  IconDocSearch,
  IconBell,
  IconBolt,
  IconInfo,
  IconSparkle,
  IconBook,
  IconGear,
  IconDots,
  IconBox,
  IconFilter,
  IconPlus,
  IconSearch,
} from '../components/ui/icons';

const SIDEBAR_SECTIONS: SidebarSection[] = [
  { id: 'overview', label: 'Overview', items: [{ id: 'dashboard', label: 'Dashboard', icon: <IconBarChart /> }] },
  {
    id: 'workspaces',
    label: 'Workspaces',
    items: [
      { id: 'screening', label: 'Screening', icon: <IconMonitor /> },
      { id: 'resilience', label: 'Resilience', icon: <IconShield /> },
      { id: 'engagement', label: 'Engagement', icon: <IconTarget /> },
      { id: 'assessments', label: 'Assessments', icon: <IconClipboard /> },
      { id: 'projects', label: 'Projects', icon: <IconFolder /> },
    ],
  },
  {
    id: 'governance',
    label: 'Governance',
    items: [
      { id: 'risks', label: 'Risks', icon: <IconAlertTriangle /> },
      { id: 'controls', label: 'Controls', icon: <IconSliders /> },
      { id: 'audits', label: 'Audits', icon: <IconDocSearch /> },
      { id: 'reports', label: 'Reports', icon: <IconBarChart /> },
    ],
  },
  {
    id: 'activity-group',
    label: 'Activity',
    items: [
      { id: 'notifications', label: 'Notifications', icon: <IconBell />, badge: 999 },
      { id: 'actions', label: 'Actions', icon: <IconBolt /> },
    ],
  },
  {
    id: 'resources',
    label: 'Resources',
    items: [
      { id: 'support', label: 'Support', icon: <IconInfo /> },
      { id: 'whats-new', label: "What's new", icon: <IconSparkle /> },
      { id: 'roadmap', label: 'Roadmap', icon: <IconBook /> },
    ],
  },
];

const BOTTOM_LINKS: SidebarBottomLink[] = [
  { id: 'settings', label: 'Settings', icon: <IconGear /> },
  { id: 'license', label: 'License', icon: <IconShield /> },
];

const TOP_TABS: TabItem[] = [
  { value: 'activity', label: 'Activity', icon: <IconBarChart width={16} height={16} /> },
  { value: 'details', label: 'Details', icon: <IconBarChart width={16} height={16} /> },
  { value: 'legal', label: 'Legal', icon: <IconBarChart width={16} height={16} />, badge: 3 },
  { value: 'documents', label: 'Documents', icon: <IconBarChart width={16} height={16} /> },
];

const SECONDARY_NAV_ICONS = [IconAlertTriangle, IconSliders, IconDocSearch, IconBarChart];
const SECONDARY_NAV_LABELS = [
  'Risks', 'Controls', 'Audits', 'Reports', 'Assessments', 'Mitigations', 'Compliance', 'Monitoring',
  'Documentation', 'Policies', 'Training', 'Incident Reports', 'Findings', 'Recommendations', 'Follow-ups',
];
const SECONDARY_NAV = SECONDARY_NAV_LABELS.map((label, i) => ({
  id: label.toLowerCase().replace(/\s+/g, '-'),
  label,
  icon: SECONDARY_NAV_ICONS[i % SECONDARY_NAV_ICONS.length],
}));

const STAT_TILES = [
  { icon: <IconBarChart />, value: 20, label: 'Tasks Overview' },
  { icon: <IconMonitor />, value: 400, label: 'Yearly Audits' },
  { icon: <IconFolder />, value: 11, label: 'Auto-completed tasks' },
  { icon: <IconFolder />, value: 32, label: 'Max-acceleration' },
  { icon: <IconBarChart />, value: 75, label: 'Pending Reviews' },
  { icon: <IconMonitor />, value: 150, label: 'Team Collaborations' },
];

interface PersonRow {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
  teams: string[];
}

const ROWS: PersonRow[] = Array.from({ length: 4 }).map((_, i) => ({
  id: String(i + 1),
  name: 'Olivia Rhye',
  email: 'olivia@untitledui.com',
  role: 'Product Designer',
  status: 'Active',
  teams: ['Design', 'Product', 'Marketing'],
}));

const COLUMNS: TableColumn<PersonRow>[] = [
  {
    key: 'name',
    header: 'Name',
    render: (row) => (
      <div className="flex items-center gap-sm">
        <Avatar name={row.name} size="sm" />
        <div className="flex flex-col">
          <span className="font-medium text-text-primary">{row.name}</span>
          <span className="text-caption text-text-secondary">{row.email}</span>
        </div>
      </div>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    render: (row) => (
      <Pill variant={row.status === 'Active' ? 'neutral' : 'error'} dot>
        {row.status}
      </Pill>
    ),
  },
  { key: 'role', header: 'Role', render: (row) => row.role },
  { key: 'email', header: 'Email address', render: (row) => row.email },
  {
    key: 'teams',
    header: 'Teams',
    render: (row) => (
      <div className="flex flex-wrap gap-xs">
        {row.teams.map((team) => (
          <Pill key={team} variant="neutral">
            {team}
          </Pill>
        ))}
      </div>
    ),
  },
  {
    key: 'actions',
    header: '',
    align: 'right',
    render: () => <Button variant="ghost" size="sm" iconOnly icon={<IconDots />} aria-label="Row actions" />,
  },
];

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState('screening');
  const [topTab, setTopTab] = useState('activity');
  const [secondaryNav, setSecondaryNav] = useState('controls');
  const [page, setPage] = useState(1);
  const [companyFilter, setCompanyFilter] = useState(true);
  const [search, setSearch] = useState('');

  return (
    <div className="flex h-screen bg-bg-layout">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((v) => !v)}
        sections={SIDEBAR_SECTIONS}
        activeId={activeNav}
        onSelect={setActiveNav}
        bottomLinks={BOTTOM_LINKS}
        user={{ name: 'Abhishek Patel', role: 'Resource Manager' }}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-6xl shrink-0 items-center justify-between border-b border-gray-4 bg-card px-xl">
          <Breadcrumb items={[{ label: 'Cases' }, { label: 'Dashboard' }]} onBack={() => {}} />
          <Tabs variant="icon-filled" items={TOP_TABS} value={topTab} onChange={setTopTab} />
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="border-b border-gray-4 px-xl py-lg">
            <h1 className="text-h4 font-semibold text-text-heading">Dashboard</h1>
          </div>

          <div className="flex items-start gap-0 p-xl">
            <nav className="flex w-[220px] shrink-0 flex-col border border-gray-4 bg-card">
              {SECONDARY_NAV.map((item) => {
                const active = item.id === secondaryNav;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSecondaryNav(item.id)}
                    className={cxRow(active)}
                  >
                    <Icon width={16} height={16} />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div className="flex-1 border border-l-0 border-gray-4 bg-card p-xl">
              <div className="flex items-center justify-between gap-md">
                <h2 className="text-title font-semibold text-text-heading">Table</h2>
                <div className="flex items-center gap-sm">
                  <Button variant="stroke-gray" size="sm">Button</Button>
                  <Button variant="primary" size="sm">Button</Button>
                  <Button variant="ghost" size="sm" iconOnly icon={<IconDots />} aria-label="More" />
                </div>
              </div>

              <div className="mt-lg grid grid-cols-3 gap-md sm:grid-cols-6">
                {STAT_TILES.map((tile) => (
                  <StatTile key={tile.label} {...tile} />
                ))}
              </div>

              <div className="mt-lg flex flex-wrap items-center justify-between gap-md rounded-xs border border-gray-4 bg-gray-1 px-lg py-md">
                <div className="flex items-center gap-sm text-body text-text-secondary">
                  <IconBox className="text-gray-7" />
                  Showing tasks linked to <span className="font-semibold text-text-primary">Leadership Audit &amp; Assessment</span>
                </div>
                <div className="flex items-center gap-sm">
                  <Button variant="stroke-gray" size="sm">Action</Button>
                  <Button variant="stroke-gray" size="sm">
                    <IconFilter />
                    Show Only These
                  </Button>
                  <Button variant="ghost" size="sm">Clear Spotlight</Button>
                </div>
              </div>

              <div className="mt-lg flex flex-wrap items-center justify-between gap-md">
                <div className="flex flex-wrap items-center gap-sm">
                  <Chip icon={<IconShield width={13} height={13} />} active>Label</Chip>
                  <Chip icon={<IconFolder width={13} height={13} />}>Label</Chip>
                  {companyFilter && (
                    <Chip onRemove={() => setCompanyFilter(false)}>Top 50 Companies</Chip>
                  )}
                  <Chip icon={<IconPlus width={13} height={13} />} onClick={() => setCompanyFilter(true)}>Add</Chip>
                </div>
                <div className="flex items-center gap-sm">
                  <div className="relative">
                    <IconSearch className="pointer-events-none absolute left-sm top-1/2 -translate-y-1/2 text-gray-7" />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Placeholder"
                      className="w-56 rounded-xs border border-gray-5 bg-card py-xs pl-2xl pr-sm text-caption text-text-primary outline-none transition-colors placeholder:text-gray-7 focus:border-primary-6 focus:ring-4 focus:ring-focus-ring/15"
                    />
                  </div>
                  <Button variant="primary" size="sm">
                    <IconFilter />
                    Filter
                    <Badge variant="neutral">5</Badge>
                  </Button>
                </div>
              </div>

              <Table className="mt-lg" columns={COLUMNS} data={ROWS} getRowKey={(row) => row.id} />

              <Pagination className="mt-lg" page={page} totalPages={7} onChange={setPage} />
            </div>
          </div>
        </main>

        <footer className="flex shrink-0 items-center justify-between border-t border-gray-4 bg-card px-xl py-md text-caption text-text-secondary">
          <span>© 2026. All rights reserved.</span>
          <div className="flex gap-lg">
            <a href="#" className="hover:text-text-primary">Policy</a>
            <a href="#" className="hover:text-text-primary">Terms &amp; Conditions</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

function cxRow(active: boolean) {
  return [
    'flex w-full items-center gap-sm border-b border-gray-4 px-lg py-md text-left text-body transition-colors last:border-b-0',
    active ? 'bg-primary-0 font-medium text-primary-7' : 'text-text-secondary hover:bg-gray-2 hover:text-text-primary',
  ].join(' ');
}
