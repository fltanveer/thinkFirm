import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { IconX } from '../ui/icons';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  size?: ModalSize;
  footer?: ReactNode;
  footerLeft?: ReactNode;
  children: ReactNode;
  scrollableBody?: boolean;
  noPadding?: boolean;
  placement?: 'center' | 'right';
}

// Modal width isn't covered by the spacing scale here either — same
// arbitrary-rem-value approach as style guide 1's Modal, for the same reason
// (named max-w-* utilities would resolve against --spacing-sg2-* and collapse).
const SIZE_CLASSES: Record<ModalSize, string> = {
  sm: 'max-w-[24rem]',
  md: 'max-w-[32rem]',
  lg: 'max-w-[42rem]',
  xl: 'max-w-[64rem]',
};

export function Modal({
  open,
  onClose,
  title,
  size = 'md',
  footer,
  footerLeft,
  children,
  scrollableBody,
  noPadding,
  placement = 'center',
}: ModalProps) {
  if (!open) return null;

  return createPortal(
    <div
      className={cx(
        'fixed inset-0 z-50 flex',
        placement === 'right' ? 'items-stretch justify-end' : 'items-center justify-center p-sg2-xl'
      )}
    >
      <div className="modal-backdrop absolute inset-0 bg-sg2-gray-950/40" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cx(
          'relative flex w-full flex-col bg-sg2-bg-card shadow-sg2-xl',
          placement === 'right'
            ? 'modal-panel--right rounded-l-sg2-sm'
            : 'max-h-[calc(100vh-4rem)] rounded-sg2-sm',
          SIZE_CLASSES[size]
        )}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-sg2-gray-200 px-sg2-xl py-sg2-lg">
          <h2 className="text-sg2-body-lg font-semibold text-sg2-text-heading">{title}</h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="rounded-sg2-sm p-sg2-xxs text-sg2-gray-500 transition-colors hover:bg-sg2-gray-200 hover:text-sg2-text-primary"
          >
            <IconX />
          </button>
        </div>
        <div
          className={cx(
            'min-h-0 flex-1 text-sg2-body-md text-sg2-text-primary',
            !noPadding && 'px-sg2-xl py-sg2-lg',
            scrollableBody && 'overflow-y-auto'
          )}
        >
          {children}
        </div>
        {(footer || footerLeft) && (
          <div className="flex shrink-0 items-center justify-between border-t border-sg2-gray-200 px-sg2-xl py-sg2-lg">
            <div>{footerLeft}</div>
            <div className="flex gap-sg2-sm">{footer}</div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
