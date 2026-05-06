"use client";

import { type ReactNode } from "react";
import {
  PLAYER_STAMP_BTN_LABEL,
  PLAYER_STAMP_ORDER,
  PLAYER_STAMP_OVERLAY,
} from "@/lib/case-types";
import { useCaseItemStamp } from "@/hooks/useCaseItemStamp";

export function ClientDocArticle({
  caseId,
  itemId,
  enableStamps = true,
  headerMain,
  body,
}: {
  caseId: string;
  itemId: string;
  /** Brief vb. sayfalarda damga kapalı */
  enableStamps?: boolean;
  headerMain: ReactNode;
  body: ReactNode;
}) {
  const { active, select } = useCaseItemStamp(enableStamps, caseId, itemId);

  return (
    <article className="doc" data-doc={itemId}>
      {enableStamps && active !== null ? (
        <div className={`stamp stamp-${active}`} data-type={active}>
          {PLAYER_STAMP_OVERLAY[active]}
        </div>
      ) : null}
      <div className="doc-header">
        <div>{headerMain}</div>
        {enableStamps ? (
          <div className="doc-stamp-area">
            <div className="stamp-controls" role="group" aria-label="Damgalar">
              {PLAYER_STAMP_ORDER.map((kind) => (
                <button
                  key={kind}
                  type="button"
                  className={`stamp-btn stamp-btn-${kind}${active === kind ? " is-active" : ""}`}
                  data-stamp={kind}
                  onClick={() => select(kind)}
                  aria-pressed={active === kind}
                >
                  {PLAYER_STAMP_BTN_LABEL[kind]}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
      {body}
    </article>
  );
}
