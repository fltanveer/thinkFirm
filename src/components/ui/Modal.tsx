import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { IconX } from './icons';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  size?: ModalSize;
  footer?: ReactNode;
  // Left-aligned footer content (e.g. a "Clear all" link) — renders opposite
  // `footer`, which stays right-aligned. Existing callers that only pass
  // `footer` are unaffected.
  footerLeft?: ReactNode;
  children: ReactNode;
  scrollableBody?: boolean;
  // Composite layouts (e.g. a modal with its own left nav + content panes)
  // need to manage their own body padding — set true to drop the default
  // px-xl/py-lg.
  noPadding?: boolean;
  // Drawers share the modal's focus layer, backdrop, header, and footer but
  // anchor to the viewport edge instead of appearing in the center.
  placement?: 'center' | 'right';
}

// Modal width isn't covered by the spacing scale (its values top out at
// spacing-11xl/160px, far below a usable dialog width) — these max-widths
// are structural layout sizes, not a token category tokens.json defines.
// Written as arbitrary rem values (not the named max-w-sm/lg/2xl utilities)
// because Tailwind resolves those names against our own --spacing-sm/lg/2xl
// tokens here, which would collapse them to a few pixels.
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
        placement === 'right' ? 'items-stretch justify-end' : 'items-center justify-center p-xl'
      )}
    >
      <div className="modal-backdrop absolute inset-0 bg-gray-13/40" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cx(
          // Capped at radius-xs (4px), same ceiling as every other component.
          'relative flex w-full flex-col bg-card shadow-xl',
          placement === 'right'
            ? 'modal-panel--right rounded-l-xs'
            : 'max-h-[calc(100vh-4rem)] rounded-xs',
          SIZE_CLASSES[size]
        )}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-gray-4 px-xl py-lg">
          <h2 className="text-title font-semibold text-text-heading">{title}</h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="rounded-xs p-xxs text-gray-7 transition-colors hover:bg-gray-3 hover:text-text-primary"
          >
            <IconX />
          </button>
        </div>
        <div
          className={cx(
            'min-h-0 flex-1 text-body text-text-primary',
            !noPadding && 'px-xl py-lg',
            scrollableBody && 'overflow-y-auto'
          )}
        >
          {children}
        </div>
        {(footer || footerLeft) && (
          <div className="flex shrink-0 items-center justify-between border-t border-gray-4 px-xl py-lg">
            <div>{footerLeft}</div>
            <div className="flex gap-sm">{footer}</div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
