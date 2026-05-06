import { Fragment } from "react";
import { ClientDocArticle } from "../ClientDocArticle";
import { getCase } from "@/lib/case-helpers";
import { notFound } from "next/navigation";
import { sectionNumForTab } from "@/lib/case-section-utils";

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
      <div className="section-head">
        <div className="section-num">{num}</div>
        <h2 className="section-title">Vaka Özeti</h2>
        <span className="section-sub">{sub}</span>
      </div>

      <ClientDocArticle
        dataDoc="brief"
        stamps={caseData.brief.stamps}
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
            <dl className="doc-meta">
              {caseData.brief.metaPairs.map((row) => (
                <Fragment key={`${row.label}-${row.value}`}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </Fragment>
              ))}
            </dl>
            {caseData.brief.sections.map((sec) => (
              <section key={sec.title}>
                <h3>{sec.title}</h3>
                <div dangerouslySetInnerHTML={{ __html: sec.body }} />
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
                <div className="sig-name">{caseData.brief.signature.name}</div>
              </div>
            ) : null}
          </>
        }
      />
    </section>
  );
}
