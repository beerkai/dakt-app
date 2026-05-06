import { getCase, isTabEnabled } from "@/lib/case-helpers";
import { notFound } from "next/navigation";
import { sectionNumForTab } from "@/lib/case-section-utils";
import { DeductionNotePad } from "../DeductionNotePad";

export default async function DeductionPage({
  params,
}: {
  params: Promise<{ caseId: string }>;
}) {
  const { caseId } = await params;
  const caseData = getCase(caseId);
  if (!caseData || !isTabEnabled(caseData, "deduction")) notFound();

  const num = sectionNumForTab(caseData, "deduction");
  const sub = caseData.tabSectionSub.deduction ?? "";

  return (
    <section id="board">
      <div className="section-head">
        <div className="section-num">{num}</div>
        <h2 className="section-title">Deduction Board</h2>
        <span className="section-sub">{sub}</span>
      </div>

      <div className="board">
        <div className="board-grid">
          <div className="board-col">
            <h4>▸ Çelişki Haritası</h4>
            {caseData.deduction.contradictions.map((item, i) => (
              <div key={`c-${i}`} className="board-item">
                {item.pin ? <span className="pin" /> : null}
                <span
                  dangerouslySetInnerHTML={{ __html: item.text }}
                />
              </div>
            ))}
          </div>

          <div className="board-col">
            <h4>▸ Eleme Mantığı</h4>
            {caseData.deduction.elimination.map((item, i) => (
              <div key={`e-${i}`} className="board-item">
                {item.pin ? <span className="pin" /> : null}
                <span
                  dangerouslySetInnerHTML={{ __html: item.text }}
                />
              </div>
            ))}
          </div>
        </div>

        <DeductionNotePad caseId={caseId} />
      </div>
    </section>
  );
}
