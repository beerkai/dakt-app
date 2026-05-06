"use client";

import type { Evidence } from "@/lib/case-types";
import {
  PLAYER_STAMP_BTN_LABEL,
  PLAYER_STAMP_ORDER,
  PLAYER_STAMP_OVERLAY,
} from "@/lib/case-types";
import { useCaseItemStamp } from "@/hooks/useCaseItemStamp";

export function EvidenceStampCard({
  caseId,
  evidence: e,
}: {
  caseId: string;
  evidence: Evidence;
}) {
  const { active, select } = useCaseItemStamp(true, caseId, e.id);

  return (
    <div className="evidence-card" data-evidence={e.id}>
      {active !== null ? (
        <div className={`stamp stamp-${active}`} data-type={active}>
          {PLAYER_STAMP_OVERLAY[active]}
        </div>
      ) : null}
      <div className="evidence-stamp-controls">
        <div className="stamp-controls" role="group" aria-label="Delil damgaları">
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
      <span className="evidence-tag">{e.tag}</span>
      <div className="evidence-code">{e.id}</div>
      <h3 className="evidence-title">{e.title}</h3>
      <p
        className="evidence-desc"
        dangerouslySetInnerHTML={{ __html: e.description }}
      />
      <div className="evidence-detail">
        {e.details.map((d, i) => (
          <span key={`${e.id}-d-${i}`}>
            <span>▸ {d.label}:</span>{" "}
            <span dangerouslySetInnerHTML={{ __html: d.value }} />
            <br />
          </span>
        ))}
      </div>
    </div>
  );
}
