import type { CaseData, Suspect } from "@/lib/case-types";

function normalize(s: string): string {
  return s
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
}

function textMentionsName(text: string, name: string): boolean {
  const hay = normalize(text);
  const full = normalize(name.trim());
  if (!full) return false;
  if (hay.includes(full)) return true;
  const first = full.split(/\s+/)[0] ?? "";
  return first.length >= 3 && hay.includes(first);
}

/**
 * Yanlış seçilen şüpheli için deduction'dan ders kartı.
 * Failin adını içeren metinler elenir (spoiler yok).
 */
export function lessonForWrongSuspect(
  caseData: CaseData,
  suspectId: string,
): { html: string; source: "elimination" | "contradiction" | "fallback" } {
  const suspect = caseData.suspects.find((s) => s.id === suspectId);
  const culprit = caseData.verdict.perpetratorName;
  const fallback = caseData.verdict.wrongAnswerMessage;

  if (!suspect) {
    return { html: fallback, source: "fallback" };
  }

  const pools: Array<{
    items: CaseData["deduction"]["elimination"];
    source: "elimination" | "contradiction";
  }> = [
    { items: caseData.deduction.elimination, source: "elimination" },
    { items: caseData.deduction.contradictions, source: "contradiction" },
  ];

  for (const pool of pools) {
    for (const item of pool.items) {
      if (!textMentionsName(item.text, suspect.name)) continue;
      if (textMentionsName(item.text, culprit)) continue;
      return { html: item.text, source: pool.source };
    }
  }

  return { html: fallback, source: "fallback" };
}

export function remainingSuspects(
  suspects: Suspect[],
  lockedIds: readonly string[],
): Suspect[] {
  const locked = new Set(lockedIds);
  return suspects.filter((s) => !locked.has(s.id));
}
