"use client";

import { ANALYST_COLOR_HEX } from "@/lib/colors";
import { PLAYER_STAMP_BTN_LABEL, type PlayerStampKind } from "@/lib/case-types";
import type { RoomItemMark } from "@/lib/room-item-marks";
import type { AnalystColor } from "@/lib/supabase/types";

const MARK_DOT: Record<PlayerStampKind, string> = {
  supheli: "●",
  "ele-alindi": "✓",
  elendi: "×",
};

function colorHex(code: string): string {
  if (code in ANALYST_COLOR_HEX) {
    return ANALYST_COLOR_HEX[code as AnalystColor];
  }
  return "#c9b48a";
}

export function PeerStampDots({
  peers,
  surface = "paper",
}: {
  peers: RoomItemMark[];
  surface?: "paper" | "dark";
}) {
  if (peers.length === 0) return null;

  return (
    <div
      className={`peer-stamp-dots peer-stamp-dots--${surface}`}
      aria-label="Odadaki diğer damgalar"
    >
      {peers.map((peer) => {
        const label = PLAYER_STAMP_BTN_LABEL[peer.mark_kind];
        const name = peer.username.trim() || "Analist";
        return (
          <span
            key={`${peer.user_id}-${peer.item_id}-${peer.mark_kind}`}
            className="peer-stamp-dot"
            title={`${name}: ${label}`}
            style={{ ["--peer-color" as string]: colorHex(peer.user_color) }}
          >
            <span className="peer-stamp-dot-glyph" aria-hidden>
              {MARK_DOT[peer.mark_kind]}
            </span>
            <span className="absolute -m-px h-px w-px overflow-hidden border-0 p-0 whitespace-nowrap [clip:rect(0,0,0,0)]">
              {name}: {label}
            </span>
          </span>
        );
      })}
    </div>
  );
}
