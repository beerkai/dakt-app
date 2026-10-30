"use client";

import { ensurePlaythroughStart } from "@/app/vaka/[caseId]/cozum/actions";
import { ensureCaseStartTimestamp } from "@/lib/case-playthrough-storage";
import { useEffect } from "react";
import { runInBackground } from "@/lib/background-task";

/** /brief ilk ziyarette dosya süresi başlangıcını kaydeder (yoksa). */
export function BriefPlayStartMount({ caseId }: { caseId: string }) {
  useEffect(() => {
    ensureCaseStartTimestamp(caseId);
    // Server action; tam sayfa geçişinde iptal edilirse WebKit "Load failed"
    // ile reddeder → yakala (bkz. runInBackground).
    runInBackground(() => ensurePlaythroughStart(caseId), "BriefPlayStart");
  }, [caseId]);
  return null;
}
