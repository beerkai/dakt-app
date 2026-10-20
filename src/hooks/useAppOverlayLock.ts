"use client";

import { useEffect } from "react";

let overlayLockCount = 0;

/** Overlay açıkken scroll’u kilitle ve alt sekmeyi gizle. */
export function useAppOverlayLock(open: boolean) {
  useEffect(() => {
    if (!open) return;
    overlayLockCount += 1;
    document.documentElement.dataset.appOverlay = "1";
    document.body.style.overflow = "hidden";
    return () => {
      overlayLockCount = Math.max(0, overlayLockCount - 1);
      if (overlayLockCount === 0) {
        delete document.documentElement.dataset.appOverlay;
        document.body.style.overflow = "";
      }
    };
  }, [open]);
}
