import { getCase, isTabEnabled } from "@/lib/case-helpers";
import { sectionNumForTab } from "@/lib/case-section-utils";
import { buildShuffledTimelineCards } from "@/lib/timeline-cards";
import { notFound } from "next/navigation";

import { TimelineBoardClient } from "./TimelineBoardClient";

export default async function TimelinePage({
  params,
}: {
  params: Promise<{ caseId: string }>;
}) {
  const { caseId } = await params;
  const caseData = getCase(caseId);
  if (!caseData || !isTabEnabled(caseData, "timeline")) notFound();

  const num = sectionNumForTab(caseData, "timeline");
  const sub = caseData.tabSectionSub.timeline ?? "Olay sırası · Karışık kartlar";
  const cards = buildShuffledTimelineCards(caseData);

  return (
    <section id="timeline">
      <div className="section-head">
        <div className="section-num">{num}</div>
        <h2 className="section-title">Olay Kronolojisi</h2>
        <span className="section-sub">{sub}</span>
      </div>

      <TimelineBoardClient
        caseId={caseId}
        initialCards={cards}
        sectionHint="Kartları doğru zamana diz. Faili seçmeden önce saati oturt."
      />
    </section>
  );
}
