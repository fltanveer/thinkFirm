import { createPortal } from 'react-dom';
import { cx } from '../../lib/cx';
import { Button } from './Button';
import { IconAlertTriangle, IconCheck, IconInfo, IconX } from './icons';

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

// Every classname below reads {variant}-bg / {variant}-base / {variant}-text
// straight off the matching Error-color / Warning-color / Success-color /
// Info-color token group — nothing here is a one-off color.
const VARIANT_CLASSES: Record<ConfirmVariant, { iconBg: string; iconText: string; confirmBg: string }> = {
  error: { iconBg: 'bg-error-bg', iconText: 'text-error-base', confirmBg: 'bg-error-base hover:bg-error-text' },
  warning: {
    iconBg: 'bg-warning-bg',
    iconText: 'text-warning-base',
    confirmBg: 'bg-warning-base hover:bg-warning-text',
  },
  success: {
    iconBg: 'bg-success-bg',
    iconText: 'text-success-base',
    confirmBg: 'bg-success-base hover:bg-success-text',
  },
  info: { iconBg: 'bg-info-bg', iconText: 'text-info-base', confirmBg: 'bg-info-base hover:bg-info-text' },
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-xl">
      <div className="absolute inset-0 bg-gray-13/40" onClick={onClose} />
      <div role="alertdialog" aria-modal="true" className="relative w-full max-w-[24rem] rounded-xs bg-card p-xl shadow-xl">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-lg top-lg rounded-xs p-xxs text-gray-7 hover:bg-gray-3 hover:text-text-primary"
        >
          <IconX />
        </button>
        <div className={cx('inline-flex h-4xl w-4xl items-center justify-center rounded-full', v.iconBg, v.iconText)}>
          <Icon width={24} height={24} />
        </div>
        <h3 className="mt-lg text-title font-semibold text-text-heading">{title}</h3>
        <p className="mt-xs text-body text-text-secondary">{message}</p>
        <div className="mt-xl flex justify-end gap-sm">
          <Button variant="stroke" size="sm" onClick={onClose}>
            {cancelLabel}
          </Button>
          <button
            type="button"
            onClick={onConfirm}
            className={cx('rounded-xs px-lg py-xs text-caption font-medium text-card transition-colors', v.confirmBg)}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
