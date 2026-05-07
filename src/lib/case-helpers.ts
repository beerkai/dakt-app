import { case042 } from "@/data/cases/042";
import { case067 } from "@/data/cases/067";
import { case089 } from "@/data/cases/089";
import { case114 } from "@/data/cases/114";
import type { CaseData, TabId } from "./case-types";

const ALL_CASES: Record<string, CaseData> = {
  "042": case042,
  "067": case067,
  "089": case089,
  "114": case114,
};

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
