import type { TabId } from "./case-types";

export const TAB_ROUTE_SLUG: Record<TabId, string> = {
  brief: "brief",
  supheliler: "supheliler",
  ifadeler: "ifadeler",
  "adli-tip": "adli-tip",
  deliller: "deliller",
  belgeler: "belgeler",
  teknik: "teknik",
  "zaman-cizelgesi": "zaman-cizelgesi",
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
  "zaman-cizelgesi": "Zaman Çizelgesi",
  deduction: "Deduction",
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
  "zaman-cizelgesi",
  "deduction",
  "cozum",
];

export function orderedEnabledTabs(enabled: TabId[]): TabId[] {
  const set = new Set(enabled);
  return TAB_ORDER.filter((t) => set.has(t));
}

export function caseTabHref(caseId: string, tab: TabId): string {
  return `/vaka/${caseId}/${TAB_ROUTE_SLUG[tab]}`;
}
