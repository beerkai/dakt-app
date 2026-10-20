import type { TabId } from "@/lib/case-types";

const KEY = "dakt_last_place";

export type LastPlace = {
  caseId: string;
  codename: string;
  tab: TabId;
  tabLabel: string;
  href: string;
  updatedAt: number;
};

let cachedRaw: string | null | undefined;
let cached: LastPlace | null = null;

export function readLastPlace(): LastPlace | null {
  if (typeof window === "undefined") return null;
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {
    return null;
  }
  if (raw === cachedRaw) return cached;
  cachedRaw = raw;
  if (!raw) {
    cached = null;
    return null;
  }
  try {
    const parsed = JSON.parse(raw) as LastPlace;
    if (!parsed?.caseId || !parsed.tab || !parsed.href) {
      cached = null;
      return null;
    }
    cached = parsed;
  } catch {
    cached = null;
  }
  return cached;
}

export function writeLastPlace(place: LastPlace): void {
  if (typeof window === "undefined") return;
  try {
    const raw = JSON.stringify(place);
    localStorage.setItem(KEY, raw);
    cachedRaw = raw;
    cached = place;
    window.dispatchEvent(new Event("dakt-last-place"));
  } catch {
    /* ignore quota */
  }
}
