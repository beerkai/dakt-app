import type { TabId } from "./case-types";

export const TAB_ROUTE_SLUG: Record<TabId, string> = {
  brief: "brief",
  supheliler: "supheliler",
  ifadeler: "ifadeler",
  "adli-tip": "adli-tip",
  deliller: "deliller",
  belgeler: "belgeler",
  teknik: "teknik",
  timeline: "timeline",
  deduction: "deduction",
  cozum: "cozum",
};

export const TAB_LABEL: Record<TabId, string> = {
  brief: "Brief",
  supheliler: "Şüpheliler",
  ifadeler: "İfadeler",
  "adli-tip": "Adli Tıp",
  deliller: "Deliller",
  belgeler: "Belgeler",
  teknik: "Teknik",
  timeline: "Saat",
  deduction: "PANO",
  cozum: "Çözüm",
};

const TAB_ORDER: TabId[] = [
  "brief",
  "supheliler",
  "ifadeler",
  "adli-tip",
  "deliller",
  "belgeler",
  "teknik",
  "deduction",
  "cozum",
];

export function orderedEnabledTabs(enabled: TabId[]): TabId[] {
  const set = new Set(enabled);
  return TAB_ORDER.filter((t) => set.has(t));
}

export function caseTabHref(
  caseId: string,
  tab: TabId,
  roomId?: string | null,
): string {
  const base = `/vaka/${caseId}/${TAB_ROUTE_SLUG[tab]}`;
  return roomId ? `${base}?room=${encodeURIComponent(roomId)}` : base;
}

/** Sekme şeridindeki (alt nav) önceki / sonraki sekme — slayt gezinmesi için. */
export function adjacentTabs(
  enabled: TabId[],
  current: string,
): { prev: TabId | null; next: TabId | null } {
  const tabs = orderedEnabledTabs(enabled);
  const i = tabs.findIndex((t) => TAB_ROUTE_SLUG[t] === current);
  if (i < 0) return { prev: null, next: null };
  return { prev: tabs[i - 1] ?? null, next: tabs[i + 1] ?? null };
}
