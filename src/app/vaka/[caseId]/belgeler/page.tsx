import { getCase, isTabEnabled } from "@/lib/case-helpers";
import { notFound } from "next/navigation";
import { sectionNumForTab } from "@/lib/case-section-utils";
import { RenderCaseDocument } from "../RenderCaseDocument";

export default async function BelgelerPage({
  params,
}: {
  params: Promise<{ caseId: string }>;
}) {
  const { caseId } = await params;
  const caseData = getCase(caseId);
  if (!caseData || !isTabEnabled(caseData, "belgeler")) notFound();

  const docs = caseData.documents ?? [];
  const num = sectionNumForTab(caseData, "belgeler");
  const sub = caseData.tabSectionSub.belgeler ?? "";

  return (
    <section id="documents">
      <div className="section-head">
        <div className="section-num">{num}</div>
        <h2 className="section-title">Belgeler & Yazışmalar</h2>
        <span className="section-sub">{sub}</span>
      </div>

      {docs.length === 0 ? (
        <p className="text-[var(--subtitle-text)] [font-family:var(--font-special-elite),monospace]">
          Bu dosya için belge sekmesi tanımlanmadı.
        </p>
      ) : (
        <div className="case-doc-grid">
          {docs.map((doc) => (
            <RenderCaseDocument key={doc.id} caseId={caseId} doc={doc} />
          ))}
        </div>
      )}
    </section>
  );
}
