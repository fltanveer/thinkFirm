import { cx } from '../../lib/cx';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
export type AvatarStatus = 'online' | 'away' | 'busy' | 'offline';
export type AvatarShape = 'circle' | 'square';

export interface AvatarProps {
  name: string;
  src?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  shape?: AvatarShape;
  className?: string;
}

// circle: same exemption as the radio dot (roundness intrinsic to the
// pattern, not a corner-radius call). square: capped at radius-xs (4px),
// same ceiling as every other component.
const SHAPE_CLASSES: Record<AvatarShape, string> = {
  circle: 'rounded-full',
  square: 'rounded-xs',
};

const SIZE_CLASSES: Record<AvatarSize, string> = {
  sm: 'h-3xl w-3xl text-caption',
  md: 'h-4xl w-4xl text-body',
  lg: 'h-5xl w-5xl text-title',
  xl: 'h-6xl w-6xl text-h5',
};

const STATUS_DOT_SIZE: Record<AvatarSize, string> = {
  sm: 'h-xs w-xs',
  md: 'h-sm w-sm',
  lg: 'h-sm w-sm',
  xl: 'h-md w-md',
};

const STATUS_CLASSES: Record<AvatarStatus, string> = {
  online: 'bg-success-base',
  away: 'bg-warning-base',
  busy: 'bg-error-base',
  offline: 'bg-gray-6',
};

// Deterministic (not random) fill color, cycling through the primary ramp
// by name — same avatar always renders the same color.
const FILL_CLASSES = ['bg-primary-4', 'bg-primary-5', 'bg-primary-6', 'bg-primary-7'];

function initialsFor(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}

function fillFor(name: string) {
  const sum = Array.from(name).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return FILL_CLASSES[sum % FILL_CLASSES.length];
}

export function Avatar({ name, src, size = 'md', status, shape = 'circle', className }: AvatarProps) {
  return (
    <span className={cx('relative inline-flex shrink-0', SIZE_CLASSES[size], className)}>
      {src ? (
        <img src={src} alt={name} className={cx('h-full w-full object-cover', SHAPE_CLASSES[shape])} />
      ) : (
        <span
          className={cx(
            'flex h-full w-full items-center justify-center font-medium text-card',
            SHAPE_CLASSES[shape],
            fillFor(name)
          )}
        >
          {initialsFor(name)}
        </span>
      )}
      {status && (
        <span
          className={cx(
            'absolute bottom-0 right-0 rounded-full ring-2 ring-card',
            STATUS_DOT_SIZE[size],
            STATUS_CLASSES[status]
          )}
          aria-label={status}
        />
      )}
    </span>
  );
}

export interface AvatarGroupProps {
  people: { name: string; src?: string }[];
  size?: AvatarSize;
  shape?: AvatarShape;
  max?: number;
  className?: string;
}

export function AvatarGroup({ people, size = 'md', shape = 'circle', max = 4, className }: AvatarGroupProps) {
  const shown = people.slice(0, max);
  const overflow = people.length - shown.length;

  return (
    <div className={cx('flex items-center', className)}>
      {shown.map((person, i) => (
        <span key={person.name} className={cx(SHAPE_CLASSES[shape], 'ring-2 ring-card', i > 0 && '-ml-sm')}>
          <Avatar name={person.name} src={person.src} size={size} shape={shape} />
        </span>
      ))}
      {overflow > 0 && (
        <span
          className={cx(
            '-ml-sm flex items-center justify-center bg-gray-3 font-medium text-text-secondary ring-2 ring-card',
            SHAPE_CLASSES[shape],
            SIZE_CLASSES[size]
          )}
        >
          +{overflow}
        </span>
      )}
    </div>
  );
}
