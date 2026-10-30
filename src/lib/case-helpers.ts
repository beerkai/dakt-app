import { case016 } from "@/data/cases/016";
import { case027 } from "@/data/cases/027";
import { case033 } from "@/data/cases/033";
import { case036 } from "@/data/cases/036";
import { case042 } from "@/data/cases/042";
import { case048 } from "@/data/cases/048";
import { case053 } from "@/data/cases/053";
import { case067 } from "@/data/cases/067";
import { case082 } from "@/data/cases/082";
import { case089 } from "@/data/cases/089";
import { case104 } from "@/data/cases/104";
import { case114 } from "@/data/cases/114";
import { orderedEnabledTabs } from "./case-tab-routes";
import type { CaseCatalogItem, CaseData, TabId } from "./case-types";

const TAB_HAS_CONTENT: Partial<Record<TabId, (c: CaseData) => boolean>> = {
  supheliler: (c) => (c.suspects?.length ?? 0) > 0,
  ifadeler: (c) => (c.testimonies?.length ?? 0) > 0,
  "adli-tip": (c) => (c.forensics?.length ?? 0) > 0,
  deliller: (c) => (c.evidence?.length ?? 0) > 0,
  belgeler: (c) =>
    (c.documents?.length ?? 0) + (c.messageThreads?.length ?? 0) > 0,
  teknik: (c) => (c.technical?.length ?? 0) > 0 || Boolean(c.technicalAudio),
};

/**
 * Kronoloji (timeline) sekmesi kaldırıldı: vaka verisinde `timeline` dursa da
 * sekme şeride/rotalara eklenmez. Eski /timeline URL'leri bir sonraki sekmeye yönlenir.
 */
const RETIRED_TABS = new Set<TabId>(["timeline"]);

/** İçeriği olmayan sekmeleri şeritten ve rotalardan düşürür. */
function withContentTabs(c: CaseData): CaseData {
  const enabledTabs = c.enabledTabs.filter(
    (tab) => !RETIRED_TABS.has(tab) && (TAB_HAS_CONTENT[tab]?.(c) ?? true),
  );
  return enabledTabs.length === c.enabledTabs.length &&
    enabledTabs.every((t, i) => t === c.enabledTabs[i])
    ? c
    : { ...c, enabledTabs };
}

const ALL_CASES: Record<string, CaseData> = Object.fromEntries(
  Object.entries({
    "016": case016,
    "027": case027,
    "033": case033,
    "036": case036,
    "042": case042,
    "048": case048,
    "053": case053,
    "067": case067,
    "082": case082,
    "089": case089,
    "104": case104,
    "114": case114,
  }).map(([id, c]) => [id, withContentTabs(c)]),
);

export function getCase(id: string): CaseData | null {
  return ALL_CASES[id] ?? null;
}

export function getAllCases(): CaseData[] {
  return Object.values(ALL_CASES).sort(
    (a, b) => parseInt(a.id, 10) - parseInt(b.id, 10),
  );
}

/** Yönetim listesi: statik dosyalardan özet satırları */
export interface CaseAdminSummary {
  id: string;
  codename: string;
  suspectCount: number;
  documentCount: number;
}

export function getAllCaseAdminSummaries(): CaseAdminSummary[] {
  return getAllCases().map((c) => ({
    id: c.id,
    codename: c.codename,
    suspectCount: c.suspects?.length ?? 0,
    documentCount: countDocuments(c),
  }));
}

/** Kart özetleri için: tüm “belge benzeri” parçaların sayısı */
export function countDocuments(c: CaseData): number {
  return (
    (c.testimonies?.length ?? 0) +
    (c.forensics?.length ?? 0) +
    (c.evidence?.length ?? 0) +
    (c.documents?.length ?? 0) +
    (c.messageThreads?.length ?? 0) +
    (c.technical?.length ?? 0)
  );
}

export function isTabEnabled(caseData: CaseData, tab: TabId): boolean {
  return caseData.enabledTabs.includes(tab);
}

/** Şeritte görünen sekme sayısı (`sectionNumForTab` ile aynı liste). */
export function visibleTabCount(caseData: CaseData): number {
  return orderedEnabledTabs(caseData.enabledTabs).length;
}

export function toCatalogItem(c: CaseData): CaseCatalogItem {
  return {
    id: c.id,
    codename: c.codename,
    location: c.location,
    shortSummary: c.shortSummary,
    recommendedPlayers: c.recommendedPlayers,
    difficulty: c.difficulty,
    active: c.status === "active",
    tabCount: visibleTabCount(c),
    docCount: countDocuments(c),
    suspectCount: c.suspects.length,
  };
}
