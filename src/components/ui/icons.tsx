// Minimal inline icon set. All strokes use currentColor so icon color always
// comes from the parent's text-* (token-driven) class — no color is set here.
import type { SVGProps } from 'react';

const base = {
  width: 16,
  height: 16,
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function IconPlus(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M8 3v10M3 8h10" />
    </svg>
  );
}

export function IconX(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

export function IconCheck(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 8.5l3 3 6-7" />
    </svg>
  );
}

export function IconMinus(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 8h9" />
    </svg>
  );
}

export function IconChevronDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

export function IconSearch(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="7" cy="7" r="4.5" />
      <path d="M13 13l-2.5-2.5" />
    </svg>
  );
}

export function IconAlertTriangle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M8 2.5l6.5 11h-13L8 2.5z" />
      <path d="M8 6.5v3.25" />
      <path d="M8 12.25h.01" />
    </svg>
  );
}

export function IconInfo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="8" cy="8" r="6" />
      <path d="M8 7.5v4M8 5.25h.01" />
    </svg>
  );
}

export function IconShield(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M8 1.5l5 2v4c0 3.5-2.2 5.8-5 7-2.8-1.2-5-3.5-5-7v-4l5-2z" />
      <path d="M5.75 8l1.5 1.5 3-3" />
    </svg>
  );
}

export function IconFolder(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M2 4.5a1 1 0 0 1 1-1h2.7l1.2 1.5H13a1 1 0 0 1 1 1V11a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4.5z" />
    </svg>
  );
}

export function IconBarChart(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M3 13V7M8 13V3M13 13V9.5" />
    </svg>
  );
}

export function IconDots(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="currentColor" {...props}>
      <circle cx="3.5" cy="8" r="1.4" />
      <circle cx="8" cy="8" r="1.4" />
      <circle cx="12.5" cy="8" r="1.4" />
    </svg>
  );
}

export function IconSliders(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M3 4h4M11 4h2M3 8h1M6 8h7M3 12h8M13 12h0.5" />
      <circle cx="9" cy="4" r="1.3" />
      <circle cx="4.5" cy="8" r="1.3" />
      <circle cx="10.5" cy="12" r="1.3" />
    </svg>
  );
}

export function IconDocSearch(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 2h4.5L11 4.5V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" />
      <path d="M8.5 2v2.5H11" />
      <circle cx="6.75" cy="9.25" r="1.75" />
      <path d="M8 10.5l1.5 1.5" />
    </svg>
  );
}

export function IconMonitor(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="2" y="3" width="12" height="8" rx="1" />
      <path d="M6 14h4M8 11v3" />
    </svg>
  );
}

export function IconClipboard(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="2.5" width="9" height="11" rx="1" />
      <rect x="6" y="1.5" width="4" height="2" rx="0.5" />
      <path d="M5.5 7.5h5M5.5 10h5" />
    </svg>
  );
}

export function IconTarget(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="8" cy="8" r="5.5" />
      <circle cx="8" cy="8" r="2.6" />
      <circle cx="8" cy="8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconBell(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M8 2.5a3 3 0 0 0-3 3v2.1c0 .6-.2 1.2-.6 1.6L3.5 10.8h9l-.9-1.6c-.4-.4-.6-1-.6-1.6V5.5a3 3 0 0 0-3-3z" />
      <path d="M6.5 12.5a1.5 1.5 0 0 0 3 0" />
    </svg>
  );
}

export function IconBolt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M8.5 2 4 9h3l-.5 5L12 7H9l.5-5z" />
    </svg>
  );
}

export function IconSparkle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M8 2l1 3.5L12.5 6.5 9 8l-1 3.5L7 8 3.5 6.5 7 5.5 8 2z" />
    </svg>
  );
}

export function IconBook(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M3 3.5c1.5-.7 3-.7 4.5 0v9c-1.5-.7-3-.7-4.5 0v-9zM13 3.5c-1.5-.7-3-.7-4.5 0v9c1.5-.7 3-.7 4.5 0v-9z" />
    </svg>
  );
}

export function IconGear(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="8" cy="8" r="2" />
      <path d="M8 1.5v2M8 12.5v2M14.5 8h-2M3.5 8h-2M12.6 3.4l-1.4 1.4M4.8 11.2l-1.4 1.4M12.6 12.6l-1.4-1.4M4.8 4.8L3.4 3.4" />
    </svg>
  );
}

export function IconChevronRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M6 4l4 4-4 4" />
    </svg>
  );
}

export function IconFilter(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M2.5 3h11L9 8.5V13l-2 1V8.5L2.5 3z" />
    </svg>
  );
}

export function IconBox(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M8 2l6 3.2v5.6L8 14l-6-3.2V5.2L8 2z" />
      <path d="M2 5.2 8 8.4l6-3.2M8 8.4V14" />
    </svg>
  );
}

export function IconPanelLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="2" y="2.5" width="12" height="11" rx="2" />
      <path d="M6.5 2.5v11" />
    </svg>
  );
}

export function IconColumns(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="2" y="2.5" width="12" height="11" rx="1" />
      <path d="M6.3 2.5v11M9.7 2.5v11" />
    </svg>
  );
}

export function IconCopy(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="5.5" y="5.5" width="8" height="8" rx="1.2" />
      <path d="M3.5 10V3.5a1 1 0 0 1 1-1H10" />
    </svg>
  );
}

export function IconGripVertical(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="currentColor" {...props}>
      <circle cx="6" cy="4" r="1.1" />
      <circle cx="6" cy="8" r="1.1" />
      <circle cx="6" cy="12" r="1.1" />
      <circle cx="10" cy="4" r="1.1" />
      <circle cx="10" cy="8" r="1.1" />
      <circle cx="10" cy="12" r="1.1" />
    </svg>
  );
}

export function IconPin(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M9.5 2.5l4 4-2 1.2-2.8 2.8-.7-.7L5.2 12.6l-1-1L7 8.8l-.7-.7 2.8-2.8 1.2-2z" />
      <path d="M5.5 10.5 3 13" />
    </svg>
  );
}

export function IconTrash(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M3 4.5h10M6 4.5V3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1.5M12.5 4.5 12 13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1l-.5-8.5" />
      <path d="M6.5 7.5v4M9.5 7.5v4" />
    </svg>
  );
}

export function IconCalendar(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="3.5" width="11" height="10" rx="1.5" />
      <path d="M2.5 6.5h11M5.5 2v3M10.5 2v3" />
    </svg>
  );
}

export function IconArrowLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M13 8H3M7 4l-4 4 4 4" />
    </svg>
  );
}

export function IconArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export function IconEye(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M1.5 8S4 3 8 3s6.5 5 6.5 5-2.5 5-6.5 5-6.5-5-6.5-5z" />
      <circle cx="8" cy="8" r="2" />
    </svg>
  );
}

export function IconEyeOff(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M2 2l12 12" />
      <path d="M6.6 3.4A6.5 6.5 0 0 1 8 3c4 0 6.5 5 6.5 5a12 12 0 0 1-2.1 2.7M4.4 4.4A12.4 12.4 0 0 0 1.5 8s2.5 5 6.5 5a6.4 6.4 0 0 0 2.6-.55" />
      <path d="M6.6 9.4a2 2 0 0 0 2.8 2.8" />
    </svg>
  );
}

export function IconLink(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M6.5 9.5l3-3" />
      <path d="M7 5.5l.7-.7a2.5 2.5 0 0 1 3.5 3.5l-.7.7M9 10.5l-.7.7a2.5 2.5 0 0 1-3.5-3.5l.7-.7" />
    </svg>
  );
}

export function IconSmartphone(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="4.5" y="1.5" width="7" height="13" rx="1.5" />
      <path d="M7.25 12h1.5" />
    </svg>
  );
}

export function IconSpinner(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      className={`animate-spin ${props.className ?? ''}`}
      {...props}
    >
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth={1.5} opacity={0.25} />
      <path d="M14.25 8a6.25 6.25 0 0 0-6.25-6.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  );
}
