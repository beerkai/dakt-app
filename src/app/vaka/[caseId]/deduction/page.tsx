import { getCase, isTabEnabled } from "@/lib/case-helpers";
import { sectionNumForTab } from "@/lib/case-section-utils";
import { notFound } from "next/navigation";

import { PanoBoardClient } from "./PanoBoardClient";

export default async function DeductionPage({
  params,
}: {
  params: Promise<{ caseId: string }>;
}) {
  const { caseId } = await params;
  const caseData = getCase(caseId);
  if (!caseData || !isTabEnabled(caseData, "deduction")) notFound();

  const num = sectionNumForTab(caseData, "deduction");

  return <PanoBoardClient caseId={caseId} sectionNum={num} />;
}
