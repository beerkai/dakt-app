import { getCase, isTabEnabled } from "@/lib/case-helpers";
import { notFound } from "next/navigation";
import { sectionNumForTab } from "@/lib/case-section-utils";
import { MessageThread } from "@/components/MessageThread";
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
  const threads = caseData.messageThreads ?? [];
  const num = sectionNumForTab(caseData, "belgeler");
  const sub = caseData.tabSectionSub.belgeler ?? "";
  const empty = docs.length === 0 && threads.length === 0;

  return (
    <section id="documents">
      <div className="section-head">
        <div className="section-num">{num}</div>
        <h2 className="section-title">Belgeler & Yazışmalar</h2>
        <span className="section-sub">{sub}</span>
      </div>

      {empty ? (
        <p className="text-[var(--subtitle-text)] [font-family:var(--font-special-elite),monospace]">
          Bu dosya için belge sekmesi tanımlanmadı.
        </p>
      ) : (
        <div className="flex min-w-0 flex-col gap-8">
          {docs.length > 0 ? (
            <div className="case-doc-grid">
              {docs.map((doc) => (
                <RenderCaseDocument key={doc.id} caseId={caseId} doc={doc} />
              ))}
            </div>
          ) : null}
          {threads.map((thread) => (
            <MessageThread key={thread.id} thread={thread} />
          ))}
        </div>
      )}
    </section>
  );
}
