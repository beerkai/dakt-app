import { getCase, isTabEnabled } from "@/lib/case-helpers";
import { notFound } from "next/navigation";
import { sectionNumForTab } from "@/lib/case-section-utils";

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
          <div key={e.id} className="evidence-card">
            <span className="evidence-tag">{e.tag}</span>
            <div className="evidence-code">{e.id}</div>
            <h3 className="evidence-title">{e.title}</h3>
            <p
              className="evidence-desc"
              dangerouslySetInnerHTML={{ __html: e.description }}
            />
            <div className="evidence-detail">
              {e.details.map((d) => (
                <span key={`${d.label}-${d.value}`}>
                  <span>▸ {d.label}:</span> {d.value}
                  <br />
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
