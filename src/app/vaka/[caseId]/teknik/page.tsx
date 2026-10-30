import { getCase, isTabEnabled } from "@/lib/case-helpers";
import { notFound } from "next/navigation";
import { sectionNumForTab } from "@/lib/case-section-utils";
import { RenderCaseDocument } from "../RenderCaseDocument";
import { WaveformClient } from "../WaveformClient";
import { safeHtml } from "@/lib/html-sanitize";
import { caseTabCanonical } from "@/lib/canonical";

export const generateMetadata = caseTabCanonical("teknik");

export default async function TeknikPage({
  params,
}: {
  params: Promise<{ caseId: string }>;
}) {
  const { caseId } = await params;
  const caseData = getCase(caseId);
  if (!caseData || !isTabEnabled(caseData, "teknik")) notFound();

  const num = sectionNumForTab(caseData, "teknik");
  const sub = caseData.tabSectionSub.teknik ?? "";
  const audio = caseData.technicalAudio;

  return (
    <section id="technical">
      <div className="section-head">
        <div className="section-num">{num}</div>
        <h2 className="section-title">Teknik Analizler</h2>
        <span className="section-sub">{sub}</span>
      </div>

      <div className="case-doc-grid">
        {caseData.technical.map((doc) => (
          <div key={doc.id} className="case-doc-grid-cell">
            <RenderCaseDocument caseId={caseId} doc={doc} />
            {audio && doc.id.endsWith("gsm") ? (
              <div className="audio-unit">
                <div className="audio-head">
                  <span className="audio-label">{audio.label}</span>
                  <span className="audio-duration">{audio.durationLine}</span>
                </div>
                <WaveformClient />
                <div className="transcript">
                  {audio.transcript.map((line, i) => (
                    <p
                      key={`${doc.id}-tr-${i}`}
                      dangerouslySetInnerHTML={safeHtml(line)}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
