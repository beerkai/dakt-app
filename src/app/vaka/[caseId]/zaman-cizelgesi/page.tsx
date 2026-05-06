import { getCase, isTabEnabled } from "@/lib/case-helpers";
import { notFound } from "next/navigation";
import { sectionNumForTab } from "@/lib/case-section-utils";
import { TimelineBoardClient } from "./TimelineBoardClient";

export default async function ZamanCizelgesiPage({
  params,
}: {
  params: Promise<{ caseId: string }>;
}) {
  const { caseId } = await params;
  const caseData = getCase(caseId);
  if (!caseData || !isTabEnabled(caseData, "zaman-cizelgesi")) notFound();

  const num = sectionNumForTab(caseData, "zaman-cizelgesi");
  const sub = caseData.tabSectionSub["zaman-cizelgesi"] ?? "";

  return (
    <TimelineBoardClient
      events={caseData.timeline}
      initialOrder={caseData.timelineInitialOrder}
      sectionNum={num}
      sectionSub={sub}
    />
  );
}
