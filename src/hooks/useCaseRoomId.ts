"use client";

import { useSearchParams } from "next/navigation";
import { useSyncExternalStore } from "react";

import { getActiveSession } from "@/lib/active-session";

function subscribe(onChange: () => void) {
  window.addEventListener("dakt-session-change", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("dakt-session-change", onChange);
    window.removeEventListener("storage", onChange);
  };
}

/**
 * Co-op oda kimliği: önce URL'deki `?room=`, yoksa aynı vakaya ait aktif
 * co-op oturumu. URL parametresi gezinme sırasında düşse bile odadan kopulmaz.
 */
export function useCaseRoomId(caseId?: string): string | null {
  const searchParams = useSearchParams();
  const fromUrl = searchParams.get("room");

  const fromSession = useSyncExternalStore(
    subscribe,
    () => {
      const s = getActiveSession();
      if (s?.mode !== "coop" || !s.roomId) return null;
      if (caseId && s.caseId !== caseId) return null;
      return s.roomId;
    },
    () => null,
  );

  return fromUrl || fromSession;
}
