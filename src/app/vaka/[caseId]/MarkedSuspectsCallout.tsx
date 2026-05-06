"use client";

import { useEffect, useState } from "react";
import {
  MARKED_SUSPECTS_CHANGED_EVENT,
  markedSuspectsStorageKey,
  readMarkedSuspects,
} from "@/lib/marked-suspects-storage";

export function MarkedSuspectsCallout({
  caseId,
  suspects,
}: {
  caseId: string;
  suspects: readonly { id: string; name: string }[];
}) {
  const [markedIds, setMarkedIds] = useState<string[]>([]);

  useEffect(() => {
    function sync() {
      setMarkedIds(readMarkedSuspects(caseId));
    }
    sync();
    window.addEventListener(MARKED_SUSPECTS_CHANGED_EVENT, sync);
    function onStorage(e: StorageEvent) {
      if (e.key === markedSuspectsStorageKey(caseId) || e.key === null) {
        sync();
      }
    }
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(MARKED_SUSPECTS_CHANGED_EVENT, sync);
      window.removeEventListener("storage", onStorage);
    };
  }, [caseId]);

  const names = markedIds
    .map((id) => suspects.find((s) => s.id === id)?.name)
    .filter((n): n is string => Boolean(n));
  const n = names.length;

  return (
    <div
      className="deduction-marked-callout"
      role="status"
      aria-live="polite"
    >
      {n === 0 ? (
        <p className="deduction-marked-callout-text">
          Şüpheli listesinden kimleri şüphelendiklerine ekleyeceğini seç. Oylama
          anında daha hızlı odaklanırsın.
        </p>
      ) : (
        <p className="deduction-marked-callout-text">
          <span className="deduction-marked-callout-lead">
            ⚐ Şüphelendiklerine eklediğin{" "}
          </span>
          <strong>{n} kişi:</strong> {names.join(", ")}.
          <span className="deduction-marked-callout-tail">
            {" "}
            Oylama ekranında bu kişiler öne çıkacak.
          </span>
        </p>
      )}
    </div>
  );
}
