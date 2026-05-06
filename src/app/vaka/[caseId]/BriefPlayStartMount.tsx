"use client";

import { ensureCaseStartTimestamp } from "@/lib/case-playthrough-storage";
import { useEffect } from "react";

/** /brief ilk ziyarette dosya süresi başlangıcını kaydeder (yoksa). */
export function BriefPlayStartMount({ caseId }: { caseId: string }) {
  useEffect(() => {
    ensureCaseStartTimestamp(caseId);
  }, [caseId]);
  return null;
}
