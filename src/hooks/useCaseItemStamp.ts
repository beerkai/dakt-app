"use client";

import { useCallback, useEffect, useState } from "react";

import { useRoomMarks } from "@/components/RoomMarksProvider";
import type { PlayerStampKind } from "@/lib/case-types";
import {
  readStampMap,
  setItemStamp,
  stampsStorageKey,
} from "@/lib/case-stamp-storage";
import type { RoomItemMark } from "@/lib/room-item-marks";

export function useCaseItemStamp(
  enabled: boolean,
  caseId: string,
  itemId: string,
) {
  const { roomId, myUserId, myMarkForItem, marksForItem, setMark } =
    useRoomMarks();
  const [localTick, setLocalTick] = useState(0);

  const localActive =
    !enabled || !caseId || !itemId
      ? null
      : (readStampMap(caseId)[itemId] ?? null);
  void localTick;

  useEffect(() => {
    if (!enabled || !caseId || !itemId) return;
    function onStorage(e: StorageEvent) {
      if (e.key !== stampsStorageKey(caseId) && e.key !== null) return;
      setLocalTick((n) => n + 1);
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [enabled, caseId, itemId]);

  const roomActive =
    enabled && roomId ? myMarkForItem(itemId) : null;
  const active = roomId ? roomActive : localActive;

  const peers: RoomItemMark[] =
    enabled && roomId
      ? marksForItem(itemId).filter((m) => m.user_id !== myUserId)
      : [];

  const select = useCallback(
    (kind: PlayerStampKind) => {
      if (!enabled || !caseId || !itemId) return;
      const current = roomId ? myMarkForItem(itemId) : localActive;
      const next = current === kind ? null : kind;
      setItemStamp(caseId, itemId, next);
      setLocalTick((n) => n + 1);
      if (roomId) void setMark(itemId, next);
    },
    [
      enabled,
      caseId,
      itemId,
      roomId,
      localActive,
      myMarkForItem,
      setMark,
    ],
  );

  return { active, select, peers, roomShared: Boolean(roomId) };
}
