"use client";

import { PeerStampDots } from "@/components/PeerStampDots";
import { StampControls } from "@/components/StampControls";
import { useCaseItemStamp } from "@/hooks/useCaseItemStamp";
import type { Evidence } from "@/lib/case-types";
import { PLAYER_STAMP_OVERLAY } from "@/lib/case-types";
import { safeHtml } from "@/lib/html-sanitize";

export function EvidenceStampCard({
  caseId,
  evidence: e,
}: {
  caseId: string;
  evidence: Evidence;
}) {
  const { active, select, peers, roomShared } = useCaseItemStamp(
    true,
    caseId,
    e.id,
  );

  return (
    <div className="evidence-card" data-evidence={e.id}>
      {active !== null ? (
        <div className={`stamp stamp-${active}`} data-type={active}>
          {PLAYER_STAMP_OVERLAY[active]}
        </div>
      ) : null}
      <div className="evidence-stamp-controls">
        {roomShared ? <PeerStampDots peers={peers} surface="dark" /> : null}
        <StampControls
          active={active}
          select={select}
          label="Delil damgaları"
          surface="dark"
        />
      </div>
      <span className="evidence-tag">{e.tag}</span>
      <div className="evidence-code">{e.id}</div>
      <h3 className="evidence-title">{e.title}</h3>
      <p
        className="evidence-desc"
        dangerouslySetInnerHTML={safeHtml(e.description)}
      />
      <div className="evidence-detail">
        {e.details.map((d, i) => (
          <span key={`${e.id}-d-${i}`}>
            <span>▸ {d.label}:</span>{" "}
            <span dangerouslySetInnerHTML={safeHtml(d.value)} />
            <br />
          </span>
        ))}
      </div>
    </div>
  );
}
