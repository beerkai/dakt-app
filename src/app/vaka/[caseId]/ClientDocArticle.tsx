"use client";

import { type ReactNode } from "react";
import { StampControls } from "@/components/StampControls";
import { PLAYER_STAMP_OVERLAY } from "@/lib/case-types";
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
            <StampControls active={active} select={select} />
          </div>
        ) : null}
      </div>
      {body}
    </article>
  );
}
