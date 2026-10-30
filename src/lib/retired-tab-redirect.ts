import { redirect } from "next/navigation";

import { getCase, isTabEnabled } from "@/lib/case-helpers";
import { caseTabHref } from "@/lib/case-tab-routes";

/**
 * Kaldırılan kronoloji sekmesinin eski URL'leri (/timeline, /kronoloji) yer imleri
 * 404 vermesin diye sekme sırasındaki bir sonraki sekmeye (PANO → Çözüm → Brief) yönlenir.
 * `?room=` korunur (co-op).
 */
export async function redirectRetiredTimeline({
  params,
  searchParams,
}: {
  params: Promise<{ caseId: string }>;
  searchParams: Promise<{ room?: string | string[] }>;
}): Promise<never> {
  const { caseId } = await params;
  const { room } = await searchParams;
  const roomId = typeof room === "string" ? room : null;
  const c = getCase(caseId);
  const target = !c
    ? "brief"
    : isTabEnabled(c, "deduction")
      ? "deduction"
      : isTabEnabled(c, "cozum")
        ? "cozum"
        : "brief";
  redirect(caseTabHref(caseId, target, roomId));
}
