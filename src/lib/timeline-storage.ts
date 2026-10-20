export type SoloTimelineState = {
  order: string[];
  settled: boolean;
};

export function timelineStorageKey(caseId: string): string {
  return `dakt_timeline_${caseId}`;
}

export const TIMELINE_CHANGED_EVENT = "dakt-timeline-changed";

export function readSoloTimeline(caseId: string): SoloTimelineState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(timelineStorageKey(caseId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return null;
    }
    const order = (parsed as SoloTimelineState).order;
    const settled = (parsed as SoloTimelineState).settled;
    if (!Array.isArray(order) || !order.every((x) => typeof x === "string")) {
      return null;
    }
    return { order, settled: settled === true };
  } catch {
    return null;
  }
}

export function writeSoloTimeline(
  caseId: string,
  state: SoloTimelineState,
): void {
  try {
    localStorage.setItem(timelineStorageKey(caseId), JSON.stringify(state));
    window.dispatchEvent(
      new CustomEvent(TIMELINE_CHANGED_EVENT, { detail: { caseId } }),
    );
  } catch {
    /* ignore */
  }
}

export function isSoloTimelineSettled(caseId: string): boolean {
  return readSoloTimeline(caseId)?.settled === true;
}
