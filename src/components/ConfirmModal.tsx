"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";

import { useAppOverlayLock } from "@/hooks/useAppOverlayLock";

export type ConfirmVariant = "default" | "warning" | "danger";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: ConfirmVariant;
  altActionText?: string;
  onAltAction?: (() => void) | (() => Promise<void>);
  altActionVariant?: ConfirmVariant;
  /** Cancel / secondary: defaults to onClose when omitted */
  onCancel?: () => void;
  /** Açıklama ile butonlar arasına ek içerik (ör. onay alanı). */
  children?: ReactNode;
  confirmDisabled?: boolean;
}

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Evet",
  cancelText = "İptal",
  variant = "default",
  altActionText,
  onAltAction,
  altActionVariant = "default",
  onCancel,
  children,
  confirmDisabled = false,
}: ConfirmModalProps) {
  const titleId = useId();
  const descId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        (onCancel ?? onClose)();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const items = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose, onCancel]);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    return () => previouslyFocused?.focus?.();
  }, [open]);

  useAppOverlayLock(open);

  if (!open) return null;

  const confirmClassName =
    variant === "danger"
      ? "confirm-btn confirm-btn-danger"
      : variant === "warning"
        ? "confirm-btn confirm-btn-warning"
        : "confirm-btn confirm-btn-primary";

  const altClassName =
    altActionVariant === "danger"
      ? "confirm-btn confirm-btn-danger-outline"
      : altActionVariant === "warning"
        ? "confirm-btn confirm-btn-warning-outline"
        : "confirm-btn confirm-btn-alt";

  const handleCancel = () => {
    (onCancel ?? onClose)();
  };

  return (
    <div className="confirm-modal-backdrop" onClick={handleCancel}>
      <div
        ref={dialogRef}
        className="confirm-modal"
        role={variant === "danger" ? "alertdialog" : "dialog"}
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="confirm-modal-grab sheet-grab" aria-hidden />
        <div className="confirm-modal-corner" aria-hidden />

        <div className="confirm-modal-body">
          <h3 id={titleId} className="confirm-modal-title">
            {title}
          </h3>

          {description ? (
            <p id={descId} className="confirm-modal-description">
              {description}
            </p>
          ) : null}

          {children}
        </div>

        <div className="confirm-modal-actions">
          <button
            type="button"
            onClick={handleCancel}
            className="confirm-btn confirm-btn-cancel"
          >
            {cancelText}
          </button>

          {altActionText && onAltAction ? (
            <button
              type="button"
              onClick={() => {
                void (async () => {
                  try {
                    await Promise.resolve(onAltAction());
                  } finally {
                    onClose();
                  }
                })();
              }}
              className={altClassName}
            >
              {altActionText}
            </button>
          ) : null}

          <button
            type="button"
            onClick={() => {
              onConfirm();
            }}
            disabled={confirmDisabled}
            className={confirmClassName}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
