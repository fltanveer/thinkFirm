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
    container: 'border-success-border bg-success-bg',
    icon: 'text-success-base',
    title: 'text-success-text',
    glyph: CheckmarkCircle02Icon,
  },
  error: {
    container: 'border-error-border bg-error-bg',
    icon: 'text-error-base',
    title: 'text-error-text',
    glyph: Cancel01Icon,
  },
} as const;

export function AuthAlert({ variant, title, message, onDismiss }: AuthAlertProps) {
  const style = STYLES[variant];

  return (
    <div
      role="alert"
      className={cx(
        'fixed right-xl top-xl z-50 flex w-[calc(100%-2rem)] max-w-[25rem] items-start gap-md rounded-xs border p-xl shadow-lg',
        style.container
      )}
    >
      <HugeiconsIcon icon={style.glyph} size={20} className={cx('mt-[1px] shrink-0', style.icon)} />

      <div className="min-w-0 flex-1">
        <p className={cx('text-body font-semibold', style.title)}>{title}</p>
        <p className="mt-xs text-body leading-relaxed text-text-secondary">{message}</p>
      </div>

      <button
        type="button"
        aria-label="Dismiss alert"
        onClick={onDismiss}
        className="-mr-md -mt-md inline-flex h-[44px] w-[44px] shrink-0 items-center justify-center text-text-secondary transition-colors hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
      >
        <HugeiconsIcon icon={Cancel01Icon} size={18} />
      </button>
    </div>
  );
}
