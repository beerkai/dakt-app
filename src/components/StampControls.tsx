"use client";

import { useState } from "react";

import { BottomSheet } from "@/components/BottomSheet";
import {
  PLAYER_STAMP_BTN_LABEL,
  PLAYER_STAMP_ORDER,
  type PlayerStampKind,
} from "@/lib/case-types";

export function StampControls({
  active,
  select,
  label = "Damgalar",
  surface = "paper",
}: {
  active: PlayerStampKind | null;
  select: (kind: PlayerStampKind) => void;
  label?: string;
  surface?: "paper" | "dark";
}) {
  const [open, setOpen] = useState(false);
  const triggerClass =
    surface === "dark"
      ? "stamp-sheet-trigger stamp-sheet-trigger-dark"
      : "stamp-sheet-trigger";

  return (
    <>
      <div className="stamp-controls stamp-controls-desktop" role="group" aria-label={label}>
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
      <div className="stamp-sheet-mobile">
        <button type="button" className={triggerClass} onClick={() => setOpen(true)}>
          {active ? PLAYER_STAMP_BTN_LABEL[active] : "Damgala"}
        </button>
        <BottomSheet open={open} title="Damga" onClose={() => setOpen(false)}>
          <div className="stamp-sheet-list" role="group" aria-label={label}>
            {PLAYER_STAMP_ORDER.map((kind) => (
              <button
                key={kind}
                type="button"
                className={`stamp-sheet-option stamp-btn-${kind}${active === kind ? " is-active" : ""}`}
                aria-pressed={active === kind}
                onClick={() => {
                  select(kind);
                  setOpen(false);
                }}
              >
                {PLAYER_STAMP_BTN_LABEL[kind]}
              </button>
            ))}
          </div>
        </BottomSheet>
      </div>
    </>
  );
}
