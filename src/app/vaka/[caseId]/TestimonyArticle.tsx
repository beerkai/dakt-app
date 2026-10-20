import { Fragment } from "react";
import { ClientDocArticle } from "./ClientDocArticle";
import { safeHtml, testimonialParagraphHtml } from "@/lib/html-sanitize";
import type { Testimony } from "@/lib/case-types";

export function TestimonyArticle({
  caseId,
  t,
}: {
  caseId: string;
  t: Testimony;
}) {
  const headingTitle =
    t.session != null && !/\([123]\.\s*Oturum\)/.test(t.title)
      ? `${t.title} (${t.session}. Oturum)`
      : t.title;

  const metaRows =
    t.metaRows ??
    (
      [
        ["Tarih", t.date],
        ["Doğum", t.birth],
        ["Meslek", t.occupation],
        ["Adres", t.address],
      ] as const
    ).map(([label, value]) => ({ label, value }));

  return (
    <ClientDocArticle
      caseId={caseId}
      itemId={t.id}
      headerMain={
        <>
          <div className="doc-id">{t.headerDocId}</div>
          <h2 className="doc-title">{headingTitle}</h2>
        </>
      }
      body={
        <>
          <dl className="doc-meta">
            {metaRows.map(({ label, value }) => (
              <Fragment key={`${t.id}-${label}`}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </Fragment>
            ))}
          </dl>
          {t.paragraphs.map((para, i) => {
            const trimmed = para.trimStart();
            if (trimmed.startsWith("<")) {
              return (
                <div
                  key={`${t.id}-p-${i}`}
                  dangerouslySetInnerHTML={safeHtml(para)}
                />
              );
            }
            return (
              <p
                key={`${t.id}-p-${i}`}
                dangerouslySetInnerHTML={testimonialParagraphHtml(para)}
              />
            );
          })}
          <div className="doc-signature">
            <div className="sig-line">
              {t.signatureRole ?? "İfade Sahibi · Baskısız"}
            </div>
            <div className="sig-name">{t.signature}</div>
          </div>
        </>
      }
    />
  );
}
