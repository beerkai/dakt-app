/** Same-tab güncellemeler için (storage yalnızca diğer sekmelerde tetiklenir). */
export const MARKED_SUSPECTS_CHANGED_EVENT = "dakt_marked_suspects_changed";

export function markedSuspectsStorageKey(caseId: string): string {
  return `dakt_marked_suspects_${caseId}`;
}

export function readMarkedSuspects(caseId: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(markedSuspectsStorageKey(caseId));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x): x is string => typeof x === "string");
  } catch {
    return [];
  }
}

export function writeMarkedSuspects(caseId: string, ids: string[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      markedSuspectsStorageKey(caseId),
      JSON.stringify(ids),
    );
    window.dispatchEvent(new Event(MARKED_SUSPECTS_CHANGED_EVENT));
  } catch {
    /* quota / private mode */
  }
}

/** Mevcut listeyi koruyarak tek ID ekle veya çıkar; yeni diziyi döner. */
export function toggleMarkedSuspect(
  caseId: string,
  suspectId: string,
): string[] {
  const cur = readMarkedSuspects(caseId);
  const set = new Set(cur);
  if (set.has(suspectId)) set.delete(suspectId);
  else set.add(suspectId);
  const next = Array.from(set);
  writeMarkedSuspects(caseId, next);
  return next;
}
