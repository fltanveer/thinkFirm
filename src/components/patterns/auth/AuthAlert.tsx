import { HugeiconsIcon } from '@hugeicons/react';
import { Cancel01Icon, CheckmarkCircle02Icon } from '@hugeicons-pro/core-stroke-rounded';
import { cx } from '../../../lib/cx';

interface AuthAlertProps {
  variant: 'success' | 'error';
  title: string;
  message: string;
  onDismiss: () => void;
}

const STYLES = {
  success: {
    container: 'border-sg2-success-50 bg-sg2-success-20',
    icon: 'text-sg2-success-90',
    title: 'text-sg2-success-100',
    glyph: CheckmarkCircle02Icon,
  },
  error: {
    container: 'border-sg2-danger-30 bg-sg2-danger-10/20',
    icon: 'text-sg2-danger-60',
    title: 'text-sg2-danger-90',
    glyph: Cancel01Icon,
  },
} as const;

export function AuthAlert({ variant, title, message, onDismiss }: AuthAlertProps) {
  const style = STYLES[variant];

  return (
    <div
      role="alert"
      className={cx(
        'fixed right-sg2-lg top-sg2-lg z-50 flex w-[calc(100%-2rem)] max-w-[25rem] items-start gap-sg2-md rounded-sg2-lg border p-sg2-lg shadow-sg2-lg',
        style.container
      )}
    >
      <HugeiconsIcon icon={style.glyph} size={20} className={cx('mt-[1px] shrink-0', style.icon)} />

      <div className="min-w-0 flex-1">
        <p className={cx('text-sg2-body-md font-semibold', style.title)}>{title}</p>
        <p className="mt-sg2-xs text-sg2-body-sm leading-relaxed text-sg2-text-secondary">{message}</p>
      </div>

      <button
        type="button"
        aria-label="Dismiss alert"
        onClick={onDismiss}
        className="-mr-sg2-md -mt-sg2-md inline-flex h-[44px] w-[44px] shrink-0 items-center justify-center text-sg2-gray-500 transition-colors hover:text-sg2-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sg2-focus-ring"
      >
        <HugeiconsIcon icon={Cancel01Icon} size={18} />
      </button>
    </div>
  );
}
