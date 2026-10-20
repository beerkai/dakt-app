"use client";

import { ensurePlaythroughStart } from "@/app/vaka/[caseId]/cozum/actions";
import { ensureCaseStartTimestamp } from "@/lib/case-playthrough-storage";
import { useEffect } from "react";

/** /brief ilk ziyarette dosya süresi başlangıcını kaydeder (yoksa). */
export function BriefPlayStartMount({ caseId }: { caseId: string }) {
  useEffect(() => {
    ensureCaseStartTimestamp(caseId);
    void ensurePlaythroughStart(caseId);
  }, [caseId]);
  return null;
}
