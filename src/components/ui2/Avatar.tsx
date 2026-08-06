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

const SHAPE_CLASSES: Record<AvatarShape, string> = {
  circle: 'rounded-full',
  square: 'rounded-sg2-sm',
};

const SIZE_CLASSES: Record<AvatarSize, string> = {
  sm: 'h-sg2-3xl w-sg2-3xl text-sg2-caption',
  md: 'h-sg2-4xl w-sg2-4xl text-sg2-body-md',
  lg: 'h-sg2-5xl w-sg2-5xl text-sg2-body-lg',
  xl: 'h-sg2-6xl w-sg2-6xl text-sg2-h4',
};

const STATUS_DOT_SIZE: Record<AvatarSize, string> = {
  sm: 'h-sg2-xs w-sg2-xs',
  md: 'h-sg2-sm w-sg2-sm',
  lg: 'h-sg2-sm w-sg2-sm',
  xl: 'h-sg2-md w-sg2-md',
};

const STATUS_CLASSES: Record<AvatarStatus, string> = {
  online: 'bg-sg2-success-60',
  away: 'bg-sg2-warning-60',
  busy: 'bg-sg2-danger-60',
  offline: 'bg-sg2-gray-400',
};

const FILL_CLASSES = ['bg-sg2-primary-60', 'bg-sg2-primary-70', 'bg-sg2-primary-90', 'bg-sg2-primary-100'];

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
            'flex h-full w-full items-center justify-center font-medium text-sg2-text-on-primary',
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
            'absolute bottom-0 right-0 rounded-full ring-2 ring-sg2-bg-card',
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
        <span key={person.name} className={cx(SHAPE_CLASSES[shape], 'ring-2 ring-sg2-bg-card', i > 0 && '-ml-sg2-sm')}>
          <Avatar name={person.name} src={person.src} size={size} shape={shape} />
        </span>
      ))}
      {overflow > 0 && (
        <span
          className={cx(
            '-ml-sg2-sm flex items-center justify-center bg-sg2-gray-200 font-medium text-sg2-text-secondary ring-2 ring-sg2-bg-card',
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
