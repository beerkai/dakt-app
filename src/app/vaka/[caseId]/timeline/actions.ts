"use server";

import { getCase } from "@/lib/case-helpers";
import { canonicalTimelineIds } from "@/lib/timeline-cards";
import { createAdminClient } from "@/lib/supabase/admin-client";
import { createClient } from "@/lib/supabase/server";

export type CheckTimelineResult =
  | { correct: true }
  | { correct: false }
  | { error: string };

function sameOrder(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((id, i) => id === b[i]);
}

/**
 * Kart sırasını doğrular. Doğru sıra istemciye gönderilmez.
 * Co-op'ta doğruysa oda kronolojisi kilitlenir (settled).
 */
export async function checkTimelineOrder(
  caseId: string,
  order: string[],
  roomId?: string | null,
): Promise<CheckTimelineResult> {
  const caseData = getCase(caseId);
  if (!caseData) return { error: "Vaka bulunamadı" };
  if (!Array.isArray(order) || order.length === 0) {
    return { error: "Geçersiz sıra" };
  }
  if (!order.every((id) => typeof id === "string" && id.length > 0)) {
    return { error: "Geçersiz sıra" };
  }

  const correct = canonicalTimelineIds(caseData);
  const idSet = new Set(correct);
  if (order.length !== correct.length) return { correct: false };
  if (!order.every((id) => idSet.has(id))) return { correct: false };
  if (new Set(order).size !== order.length) return { correct: false };

  const ok = sameOrder(order, correct);
  if (!ok) return { correct: false };

  if (roomId) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { error: "Giriş yapılmamış" };

    const admin = createAdminClient();
    const { data: member } = await admin
      .from("room_players")
      .select("user_id")
      .eq("room_id", roomId)
      .eq("user_id", user.id)
      .is("left_at", null)
      .maybeSingle();
    if (!member) return { error: "Bu odanın aktif üyesi değilsin" };

    const { data: room } = await admin
      .from("rooms")
      .select("id, case_id")
      .eq("id", roomId)
      .maybeSingle();
    if (!room || String(room.case_id) !== caseId) {
      return { error: "Oda bu vakaya ait değil" };
    }

    const { error } = await admin.from("room_timeline").upsert(
      {
        room_id: roomId,
        event_order: order,
        settled: true,
        updated_by: user.id,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "room_id" },
    );
    if (error) return { error: error.message };
  }

  return { correct: true };
}
