"use client";

import type { Suspect } from "@/lib/case-types";
import {
  MARKED_SUSPECTS_CHANGED_EVENT,
  markedSuspectsStorageKey,
  readMarkedSuspects,
  toggleMarkedSuspect,
} from "@/lib/marked-suspects-storage";
import { useCallback, useEffect, useState } from "react";

export function SuspectGridClient({
  caseId,
  suspects,
}: {
  caseId: string;
  suspects: Suspect[];
}) {
  const [marked, setMarked] = useState<Set<string>>(() => new Set());

  const syncFromStorage = useCallback(() => {
    setMarked(new Set(readMarkedSuspects(caseId)));
  }, [caseId]);

  useEffect(() => {
    syncFromStorage();
    function onStorage(e: StorageEvent) {
      if (e.key === markedSuspectsStorageKey(caseId) || e.key === null) {
        syncFromStorage();
      }
    }
    window.addEventListener(MARKED_SUSPECTS_CHANGED_EVENT, syncFromStorage);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(MARKED_SUSPECTS_CHANGED_EVENT, syncFromStorage);
      window.removeEventListener("storage", onStorage);
    };
  }, [caseId, syncFromStorage]);

  function toggle(suspectId: string) {
    toggleMarkedSuspect(caseId, suspectId);
  }

  return (
    <div className="suspect-grid suspect-grid-profile" id="suspectGrid">
      {suspects.map((s) => {
        const isMarked = marked.has(s.id);
        return (
          <div
            key={s.id}
            className={`suspect-card${isMarked ? " flagged" : ""}`}
            data-suspect={s.id}
          >
            <div className="suspect-id">{s.code}</div>
            <h3 className="suspect-name">{s.name}</h3>
            <div className="suspect-role">{s.role}</div>
            <p className="suspect-quote">{s.quote}</p>
            <button
              type="button"
              className="suspect-flag"
              onClick={() => toggle(s.id)}
            >
              {isMarked
              ? "× ŞÜPHELENDİKLERİMDEN ÇIKAR"
              : "⚐ ŞÜPHELENDİKLERİME EKLE"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
