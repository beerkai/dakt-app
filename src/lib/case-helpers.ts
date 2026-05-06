import { case042 } from "@/data/cases/042";
import { case067 } from "@/data/cases/067";
import type { CaseData, TabId } from "./case-types";

const ALL_CASES: Record<string, CaseData> = {
  "042": case042,
  "067": case067,
};

export function getCase(id: string): CaseData | null {
  return ALL_CASES[id] ?? null;
}

export function getAllCases(): CaseData[] {
  return Object.values(ALL_CASES);
}

export function isTabEnabled(caseData: CaseData, tab: TabId): boolean {
  return caseData.enabledTabs.includes(tab);
}
