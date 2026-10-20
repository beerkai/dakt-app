export function lockedSuspectsStorageKey(caseId: string): string {
  return `dakt_locked_suspects_${caseId}`;
}

export const LOCKED_SUSPECTS_CHANGED_EVENT = "dakt-locked-suspects-changed";

export function readLockedSuspects(caseId: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(lockedSuspectsStorageKey(caseId));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x): x is string => typeof x === "string");
  } catch {
    return [];
  }
}

export function writeLockedSuspects(caseId: string, ids: string[]): void {
  try {
    const unique = [...new Set(ids)];
    localStorage.setItem(
      lockedSuspectsStorageKey(caseId),
      JSON.stringify(unique),
    );
    window.dispatchEvent(
      new CustomEvent(LOCKED_SUSPECTS_CHANGED_EVENT, { detail: { caseId } }),
    );
  } catch {
    /* ignore */
  }
}

export function lockSuspectLocal(caseId: string, suspectId: string): string[] {
  const next = [...new Set([...readLockedSuspects(caseId), suspectId])];
  writeLockedSuspects(caseId, next);
  return next;
}
