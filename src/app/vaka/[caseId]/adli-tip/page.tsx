import { getCase, isTabEnabled } from "@/lib/case-helpers";
import { notFound } from "next/navigation";
import { sectionNumForTab } from "@/lib/case-section-utils";
import { RenderCaseDocument } from "../RenderCaseDocument";

export default async function AdliTipPage({
  params,
}: {
  params: Promise<{ caseId: string }>;
}) {
  const { caseId } = await params;
  const caseData = getCase(caseId);
  if (!caseData || !isTabEnabled(caseData, "adli-tip")) notFound();

  const num = sectionNumForTab(caseData, "adli-tip");
  const sub = caseData.tabSectionSub["adli-tip"] ?? "";

  return (
    <section id="forensics">
      <div className="section-head">
        <div className="section-num">{num}</div>
        <h2 className="section-title">Adli Tıp & Olay Yeri</h2>
        <span className="section-sub">{sub}</span>
      </div>

      {caseData.forensics.map((doc) => (
        <RenderCaseDocument key={doc.id} doc={doc} />
      ))}
    </section>
  );
}
