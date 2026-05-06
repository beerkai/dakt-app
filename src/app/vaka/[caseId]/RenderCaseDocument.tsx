import { Fragment } from "react";
import { ClientDocArticle } from "./ClientDocArticle";
import type { Document as CaseDocument } from "@/lib/case-types";

export function RenderCaseDocument({
  caseId,
  doc,
}: {
  caseId: string;
  doc: CaseDocument;
}) {
  return (
    <ClientDocArticle
      caseId={caseId}
      itemId={doc.id}
      headerMain={
        <>
          {doc.docId ? <div className="doc-id">{doc.docId}</div> : null}
          <h2 className="doc-title">{doc.title}</h2>
        </>
      }
      body={
        <>
          {doc.meta.length > 0 ? (
            <dl className="doc-meta">
              {doc.meta.map((row) => (
                <Fragment key={`${row.label}-${row.value}`}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </Fragment>
              ))}
            </dl>
          ) : null}
          <div dangerouslySetInnerHTML={{ __html: doc.body }} />
          {doc.signature ? (
            <div className="doc-signature">
              <div
                className="sig-line"
                style={{ whiteSpace: "pre-line" }}
              >
                {doc.signature.role}
              </div>
              <div className="sig-name">{doc.signature.name}</div>
            </div>
          ) : null}
        </>
      }
    />
  );
}
