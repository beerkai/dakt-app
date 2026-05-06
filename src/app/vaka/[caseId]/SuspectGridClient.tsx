"use client";

import type { Suspect } from "@/lib/case-types";
import { useState } from "react";

export function SuspectGridClient({ suspects }: { suspects: Suspect[] }) {
  const [flagged, setFlagged] = useState<Set<string>>(new Set());

  function toggle(key: string) {
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  return (
    <div className="suspect-grid" id="suspectGrid">
      {suspects.map((s) => (
        <div
          key={s.id}
          className={`suspect-card${flagged.has(s.id) ? " flagged" : ""}`}
          data-suspect={s.id}
          onClick={() => toggle(s.id)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggle(s.id);
            }
          }}
          role="button"
          tabIndex={0}
        >
          <div className="suspect-id">{s.code}</div>
          <h3 className="suspect-name">{s.name}</h3>
          <div className="suspect-role">{s.role}</div>
          <p className="suspect-quote">{s.quote}</p>
          <button
            type="button"
            className="suspect-flag"
            onClick={(e) => {
              e.stopPropagation();
              toggle(s.id);
            }}
          >
            ⚐ İŞARETLE
          </button>
        </div>
      ))}
    </div>
  );
}
