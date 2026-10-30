import { getCase, isTabEnabled } from "@/lib/case-helpers";
import { notFound } from "next/navigation";
import { sectionNumForTab } from "@/lib/case-section-utils";
import { EvidenceStampCard } from "../EvidenceStampCard";
import { caseTabCanonical } from "@/lib/canonical";

export const generateMetadata = caseTabCanonical("deliller");

export default async function DelillerPage({
  params,
}: {
  params: Promise<{ caseId: string }>;
}) {
  const { caseId } = await params;
  const caseData = getCase(caseId);
  if (!caseData || !isTabEnabled(caseData, "deliller")) notFound();

  const num = sectionNumForTab(caseData, "deliller");
  const sub = caseData.tabSectionSub.deliller ?? "";

  return (
    <section id="evidence">
      <div className="section-head">
        <div className="section-num">{num}</div>
        <h2 className="section-title">Fiziksel Deliller</h2>
        <span className="section-sub">{sub}</span>
      </div>

      <div className="evidence-grid">
        {caseData.evidence.map((e) => (
          <EvidenceStampCard key={e.id} caseId={caseId} evidence={e} />
        ))}
      </div>
    </section>
  );
}
