import { getCase, isTabEnabled } from "@/lib/case-helpers";
import { notFound } from "next/navigation";
import { sectionNumForTab } from "@/lib/case-section-utils";
import { TestimonyArticle } from "../TestimonyArticle";

export default async function IfadelerPage({
  params,
}: {
  params: Promise<{ caseId: string }>;
}) {
  const { caseId } = await params;
  const caseData = getCase(caseId);
  if (!caseData || !isTabEnabled(caseData, "ifadeler")) notFound();

  const num = sectionNumForTab(caseData, "ifadeler");
  const sub = caseData.tabSectionSub.ifadeler ?? "";

  return (
    <section id="testimonies">
      <div className="section-head">
        <div className="section-num">{num}</div>
        <h2 className="section-title">Polis İfadeleri</h2>
        <span className="section-sub">{sub}</span>
      </div>

      {caseData.testimonies.map((t) => (
        <TestimonyArticle key={t.id} caseId={caseId} t={t} />
      ))}
    </section>
  );
}
