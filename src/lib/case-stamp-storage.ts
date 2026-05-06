import type { PlayerStampKind } from "@/lib/case-types";

export function stampsStorageKey(caseId: string): string {
  return `dakt_stamps_${caseId}`;
}

export type CaseStampMap = Record<string, PlayerStampKind>;

export function readStampMap(caseId: string): CaseStampMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(stampsStorageKey(caseId));
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }
    return parsed as CaseStampMap;
  } catch {
    return {};
  }
}

export function writeStampMap(caseId: string, map: CaseStampMap): void {
  try {
    localStorage.setItem(stampsStorageKey(caseId), JSON.stringify(map));
  } catch {
    /* ignore quota / private mode */
  }
}

export function setItemStamp(
  caseId: string,
  itemId: string,
  value: PlayerStampKind | null,
): void {
  const map = readStampMap(caseId);
  if (value === null) {
    delete map[itemId];
  } else {
    map[itemId] = value;
  }
  writeStampMap(caseId, map);
}
