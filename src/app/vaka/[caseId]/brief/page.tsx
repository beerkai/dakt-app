import { Fragment } from "react";
import { BriefPlayStartMount } from "../BriefPlayStartMount";
import { ClientDocArticle } from "../ClientDocArticle";
import { getCase } from "@/lib/case-helpers";
import { notFound } from "next/navigation";
import { sectionNumForTab } from "@/lib/case-section-utils";
import { safeHtml } from "@/lib/html-sanitize";
import { caseTabCanonical } from "@/lib/canonical";

export const generateMetadata = caseTabCanonical("brief");

export default async function BriefPage({
  params,
}: {
  params: Promise<{ caseId: string }>;
}) {
  const { caseId } = await params;
  const caseData = getCase(caseId);
  if (!caseData) notFound();

  const num = sectionNumForTab(caseData, "brief");
  const sub = caseData.tabSectionSub.brief ?? "";

  return (
    <section id="brief">
      <BriefPlayStartMount caseId={caseId} />
      <div className="section-head">
        <div className="section-num">{num}</div>
        <h2 className="section-title">Vaka Özeti</h2>
        <span className="section-sub">{sub}</span>
      </div>

      <ClientDocArticle
        caseId={caseId}
        itemId="brief"
        enableStamps={false}
        headerMain={
          <>
            <div className="doc-id">
              T.C. İçişleri Bakanlığı · Kriminal Soruşturma Birimi
            </div>
            <h2 className="doc-title">Soruşturma Dosyası — Olay Özeti</h2>
          </>
        }
        body={
          <>
            <div className="brief-two-col">
              <dl className="doc-meta">
                {caseData.brief.metaPairs.map((row) => (
                  <Fragment key={`${row.label}-${row.value}`}>
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                  </Fragment>
                ))}
              </dl>
              <div className="brief-two-col-main">
                {caseData.brief.sections.map((sec) => (
                  <section key={sec.title}>
                    <h3>{sec.title}</h3>
                    <div dangerouslySetInnerHTML={safeHtml(sec.body)} />
                  </section>
                ))}
                {caseData.brief.signature ? (
                  <div className="doc-signature">
                    <div
                      className="sig-line"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {caseData.brief.signature.role}
                    </div>
                    <div className="sig-name">
                      {caseData.brief.signature.name}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </>
        }
      />
      <div
        style={{
          marginTop: 48,
          paddingTop: 24,
          borderTop: "1px dashed var(--rule)",
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: 10,
          letterSpacing: "0.15em",
          color: "var(--kraft-dark)",
          textAlign: "center",
          opacity: 0.7,
          fontStyle: "italic",
          lineHeight: 1.7,
        }}
      >
        ◉ KURMACA · Tüm karakterler ve olaylar hayalidir.
        <br />
        Gerçek kişiler veya olaylarla benzerlik tamamen tesadüfidir.
      </div>
    </section>
  );
}
