"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

import { useAppOverlayLock } from "@/hooks/useAppOverlayLock";

export function BottomSheet({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useAppOverlayLock(open);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const previously = document.activeElement as HTMLElement | null;

    function focusables() {
      if (!panel) return [];
      return Array.from(
        panel.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.hasAttribute("disabled"));
    }

    const first = focusables()[0];
    (first ?? panel)?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previously?.focus();
    };
  }, [open]);

  if (!open || typeof document === "undefined") return null;

  // Portal to <body>: the trigger often lives inside cards that get a
  // `transform` on hover/tap (e.g. `.suspect-card:hover`), which turns
  // `position: fixed` into card-relative positioning and lets the backdrop
  // swallow taps meant for the sheet options. Rendering at the body level
  // also lifts the sheet out of the page's `z-[1]` stacking context.
  return createPortal(
    <div className="sheet-root">
      <button
        type="button"
        className="sheet-backdrop"
        aria-label="Kapat"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className="sheet-panel"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
      >
        <div className="sheet-grab" aria-hidden />
        <div className="sheet-head">
          <h2 className="sheet-title">{title}</h2>
          <button type="button" className="sheet-close" onClick={onClose}>
            Kapat
          </button>
        </div>
        <div className="sheet-body">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
