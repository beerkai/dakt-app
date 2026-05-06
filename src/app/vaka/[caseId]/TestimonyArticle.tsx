import { Fragment } from "react";
import { ClientDocArticle } from "./ClientDocArticle";
import { testimonialParagraphHtml } from "@/lib/html-sanitize";
import type { Testimony } from "@/lib/case-types";

export function TestimonyArticle({ t }: { t: Testimony }) {
  return (
    <ClientDocArticle
      dataDoc={t.id}
      stamps={t.stamps}
      headerMain={
        <>
          <div className="doc-id">{t.headerDocId}</div>
          <h2 className="doc-title">{t.title}</h2>
        </>
      }
      body={
        <>
          <dl className="doc-meta">
            {(
              [
                ["Tarih", t.date],
                ["Doğum", t.birth],
                ["Meslek", t.occupation],
                ["Adres", t.address],
              ] as const
            ).map(([label, value]) => (
              <Fragment key={label}>
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
                  dangerouslySetInnerHTML={{ __html: para }}
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
