import { createPortal } from 'react-dom';
import { cx } from '../../lib/cx';
import { Button } from './Button';
import { IconAlertTriangle, IconCheck, IconInfo, IconX } from '../ui/icons';

export type ConfirmVariant = 'error' | 'warning' | 'success' | 'info';

export interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  variant: ConfirmVariant;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

const VARIANT_ICON: Record<ConfirmVariant, typeof IconAlertTriangle> = {
  error: IconAlertTriangle,
  warning: IconAlertTriangle,
  success: IconCheck,
  info: IconInfo,
};

// tokens-old.json calls its red ramp "Danger-color" rather than "Error" — the
// `error` variant name is kept for prop-parity with style guide 1, it just
// points at the Danger ramp internally.
const VARIANT_CLASSES: Record<ConfirmVariant, { iconBg: string; iconText: string; confirmBg: string }> = {
  error: { iconBg: 'bg-sg2-danger-10', iconText: 'text-sg2-danger-60', confirmBg: 'bg-sg2-danger-60 hover:bg-sg2-danger-90' },
  warning: { iconBg: 'bg-sg2-warning-10', iconText: 'text-sg2-warning-60', confirmBg: 'bg-sg2-warning-60 hover:bg-sg2-warning-90' },
  success: { iconBg: 'bg-sg2-success-10', iconText: 'text-sg2-success-60', confirmBg: 'bg-sg2-success-60 hover:bg-sg2-success-90' },
  info: { iconBg: 'bg-sg2-info-10', iconText: 'text-sg2-info-60', confirmBg: 'bg-sg2-info-60 hover:bg-sg2-info-90' },
};

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  variant,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
}: ConfirmModalProps) {
  if (!open) return null;
  const Icon = VARIANT_ICON[variant];
  const v = VARIANT_CLASSES[variant];

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-sg2-xl">
      <div className="absolute inset-0 bg-sg2-gray-950/40" onClick={onClose} />
      <div role="alertdialog" aria-modal="true" className="relative w-full max-w-[24rem] rounded-sg2-sm bg-sg2-bg-card p-sg2-xl shadow-sg2-xl">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-sg2-lg top-sg2-lg rounded-sg2-sm p-sg2-xxs text-sg2-gray-500 hover:bg-sg2-gray-200 hover:text-sg2-text-primary"
        >
          <IconX />
        </button>
        <div className={cx('inline-flex h-sg2-4xl w-sg2-4xl items-center justify-center rounded-full', v.iconBg, v.iconText)}>
          <Icon width={24} height={24} />
        </div>
        <h3 className="mt-sg2-lg text-sg2-body-lg font-semibold text-sg2-text-heading">{title}</h3>
        <p className="mt-sg2-xs text-sg2-body-md text-sg2-text-secondary">{message}</p>
        <div className="mt-sg2-xl flex justify-end gap-sg2-sm">
          <Button variant="stroke" size="sm" onClick={onClose}>
            {cancelLabel}
          </Button>
          <button
            type="button"
            onClick={onConfirm}
            className={cx('rounded-sg2-sm px-sg2-lg py-sg2-xs text-sg2-caption font-medium text-sg2-text-on-primary transition-colors', v.confirmBg)}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
