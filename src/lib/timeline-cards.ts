import type { CaseData, TimelineEvent } from "@/lib/case-types";

/** İstemciye giden kart — doğru sıra bu tipte taşınmaz. */
export type TimelineCard = {
  id: string;
  time: string;
  event: string;
  source: string;
  critical?: boolean;
};

function toCard(e: TimelineEvent): TimelineCard {
  return {
    id: e.id,
    time: e.time,
    event: e.event,
    source: e.source,
    critical: e.critical,
  };
}

/**
 * Karışık başlangıç sırasına göre kart listesi üretir.
 * Canonical `timeline` dizisini istemciye prop olarak verme.
 */
export function buildShuffledTimelineCards(caseData: CaseData): TimelineCard[] {
  const byId = new Map(caseData.timeline.map((e) => [e.id, e]));
  const order =
    caseData.timelineInitialOrder.length > 0
      ? caseData.timelineInitialOrder
      : caseData.timeline.map((e) => e.id);

  const cards: TimelineCard[] = [];
  const seen = new Set<string>();
  for (const id of order) {
    const e = byId.get(id);
    if (!e || seen.has(id)) continue;
    seen.add(id);
    cards.push(toCard(e));
  }
  for (const e of caseData.timeline) {
    if (seen.has(e.id)) continue;
    cards.push(toCard(e));
  }
  return cards;
}

export function canonicalTimelineIds(caseData: CaseData): string[] {
  return caseData.timeline.map((e) => e.id);
}
