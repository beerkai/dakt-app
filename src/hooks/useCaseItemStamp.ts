"use client";

import { useCallback, useEffect, useState } from "react";
import type { PlayerStampKind } from "@/lib/case-types";
import {
  readStampMap,
  setItemStamp,
  stampsStorageKey,
} from "@/lib/case-stamp-storage";

export function useCaseItemStamp(
  enabled: boolean,
  caseId: string,
  itemId: string,
) {
  const [active, setActive] = useState<PlayerStampKind | null>(null);

  useEffect(() => {
    if (!enabled || !caseId || !itemId) {
      setActive(null);
      return;
    }
    const map = readStampMap(caseId);
    setActive(map[itemId] ?? null);
  }, [enabled, caseId, itemId]);

  useEffect(() => {
    if (!enabled || !caseId || !itemId) return;
    function onStorage(e: StorageEvent) {
      if (e.key !== stampsStorageKey(caseId) && e.key !== null) return;
      const map = readStampMap(caseId);
      setActive(map[itemId] ?? null);
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [enabled, caseId, itemId]);

  const select = useCallback(
    (kind: PlayerStampKind) => {
      if (!enabled || !caseId || !itemId) return;
      const next = active === kind ? null : kind;
      setItemStamp(caseId, itemId, next);
      setActive(next);
    },
    [enabled, caseId, itemId, active],
  );

  return { active, select };
}
