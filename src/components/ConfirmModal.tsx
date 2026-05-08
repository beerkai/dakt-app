"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

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
}

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
}: ConfirmModalProps) {
  useEffect(() => {
    if (!open) return;
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") (onCancel ?? onClose)();
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onClose, onCancel]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  if (!open) return null;
  if (typeof document === "undefined") return null;

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

  return createPortal(
    <div className="confirm-modal-backdrop" onClick={handleCancel}>
      <div
        className="confirm-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="confirm-modal-corner" />

        <h3 className="confirm-modal-title">{title}</h3>

        {description ? (
          <p className="confirm-modal-description">{description}</p>
        ) : null}

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
            className={confirmClassName}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
