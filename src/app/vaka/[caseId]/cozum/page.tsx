import { getCase, isTabEnabled } from "@/lib/case-helpers";
import { notFound } from "next/navigation";
import { sectionNumForTab } from "@/lib/case-section-utils";
import { Suspense } from "react";
import { CozumClient } from "./CozumClient";
import { caseTabCanonical } from "@/lib/canonical";

export const generateMetadata = caseTabCanonical("cozum");

export default async function CozumPage({
  params,
}: {
  params: Promise<{ caseId: string }>;
}) {
  const { caseId } = await params;
  const caseData = getCase(caseId);
  if (!caseData || !isTabEnabled(caseData, "cozum")) notFound();

  const num = sectionNumForTab(caseData, "cozum");
  const sub = caseData.tabSectionSub.cozum ?? "";

  return (
    <section id="solution">
      <div className="section-head">
        <div className="section-num">{num}</div>
        <h2 className="section-title">Çözüm Zarfı</h2>
        <span className="section-sub">{sub}</span>
      </div>
      <Suspense fallback={null}>
        <CozumClient
          caseId={caseData.id}
          suspects={caseData.suspects}
          requiresTimeline={isTabEnabled(caseData, "timeline")}
        />
      </Suspense>
    </section>
  );
}
