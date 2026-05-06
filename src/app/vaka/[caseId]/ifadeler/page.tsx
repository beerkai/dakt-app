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

  const suspectOrder = caseData.suspects.map((s) => s.name);
  const testimoniesSorted = [...caseData.testimonies].sort((a, b) => {
    const ai = suspectOrder.indexOf(a.suspectName);
    const bi = suspectOrder.indexOf(b.suspectName);
    const ar = ai === -1 ? 999 : ai;
    const br = bi === -1 ? 999 : bi;
    if (ar !== br) return ar - br;
    return (a.session ?? 1) - (b.session ?? 1);
  });

  return (
    <section id="testimonies">
      <div className="section-head">
        <div className="section-num">{num}</div>
        <h2 className="section-title">Polis İfadeleri</h2>
        <span className="section-sub">{sub}</span>
      </div>

      {testimoniesSorted.map((t) => (
        <TestimonyArticle key={t.id} caseId={caseId} t={t} />
      ))}
    </section>
  );
}
