"use client";

import { useState, type ReactNode } from "react";

export type StampKind = "approved" | "denied" | "classified" | "cross";

const STAMP_LABEL: Record<StampKind, string> = {
  approved: "Approved",
  denied: "Denied",
  classified: "Classified",
  cross: "Cross-Ref",
};

const STAMP_TEXT: Record<StampKind, string> = {
  approved: "APPROVED",
  denied: "DENIED",
  classified: "CLASSIFIED",
  cross: "CROSS-REF",
};

export function ClientDocArticle({
  dataDoc,
  stamps,
  headerMain,
  body,
}: {
  dataDoc?: string;
  stamps: StampKind[];
  headerMain: ReactNode;
  body: ReactNode;
}) {
  const [active, setActive] = useState<StampKind | null>(null);

  function toggle(kind: StampKind) {
    setActive((prev) => (prev === kind ? null : kind));
  }

  return (
    <article className="doc" data-doc={dataDoc}>
      {active !== null ? (
        <div className={`stamp stamp-${active}`} data-type={active}>
          {STAMP_TEXT[active]}
        </div>
      ) : null}
      <div className="doc-header">
        <div>{headerMain}</div>
        <div className="doc-stamp-area">
          <div className="stamp-controls">
            {stamps.map((s) => (
              <button
                key={s}
                type="button"
                className="stamp-btn"
                data-stamp={s}
                onClick={() => toggle(s)}
              >
                {STAMP_LABEL[s]}
              </button>
            ))}
          </div>
        </div>
      </div>
      {body}
    </article>
  );
}
