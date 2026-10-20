import type { CaseData, TabId } from "./case-types";
import { orderedEnabledTabs } from "./case-tab-routes";

export function sectionNumForTab(
  caseData: Pick<CaseData, "enabledTabs">,
  tab: TabId,
): string {
  const ord = orderedEnabledTabs(caseData.enabledTabs);
  const i = ord.indexOf(tab);
  return String(Math.max(0, i) + 1).padStart(2, "0");
}
