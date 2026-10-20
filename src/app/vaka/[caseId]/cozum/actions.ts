"use server";

import { revalidatePath } from "next/cache";

import { getCase } from "@/lib/case-helpers";
import { createAdminClient } from "@/lib/supabase/admin-client";
import { createClient } from "@/lib/supabase/server";

export type RevealVerdictResult =
  | { correct: true; perpetratorName: string; solutionHtml: string }
  | { correct: false; wrongAnswerMessage: string }
  | { error: string };

/** Oy verildikten sonra sonucu döner; çözüm bilgisi istemciye önceden gönderilmez. */
export async function revealVerdict(
  caseId: string,
  suspectId: string,
): Promise<RevealVerdictResult> {
  const caseData = getCase(caseId);
  if (!caseData) return { error: "Vaka bulunamadı" };
  if (!caseData.suspects.some((s) => s.id === suspectId)) {
    return { error: "Şüpheli bulunamadı" };
  }

  const { verdict } = caseData;
  if (verdict.perpetratorId === suspectId) {
    return {
      correct: true,
      perpetratorName: verdict.perpetratorName,
      solutionHtml: verdict.solutionHtml,
    };
  }
  return { correct: false, wrongAnswerMessage: verdict.wrongAnswerMessage };
}

export type RecordSolvedCaseResult =
  | { success: true }
  | { success: false; error: string };

const MAX_DURATION_SECONDS = 60 * 60 * 24 * 30;
const MAX_ATTEMPTS = 1000;

function clampInt(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, Math.floor(value)));
}

export async function recordSolvedCase(input: {
  caseId: string;
  suspectId: string;
  attemptCount: number;
  durationSeconds: number;
}): Promise<RecordSolvedCaseResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Giriş yapılmamış" };

  const caseData = getCase(input.caseId);
  if (!caseData) return { success: false, error: "Vaka bulunamadı" };
  if (caseData.verdict.perpetratorId !== input.suspectId) {
    return { success: false, error: "Çözüm doğrulanamadı" };
  }

  // Kayıt yalnızca doğru çözümde yazıldığı için doğruluk her zaman %100;
  // performans farkı attempt_count üzerinden okunur.
  const admin = createAdminClient();
  const { error } = await admin.from("solved_cases").upsert(
    {
      user_id: user.id,
      case_id: caseData.id,
      accuracy: 100,
      attempt_count: clampInt(input.attemptCount, 1, MAX_ATTEMPTS),
      duration_seconds: clampInt(input.durationSeconds, 0, MAX_DURATION_SECONDS),
      solved_at: new Date().toISOString(),
    },
    { onConflict: "user_id,case_id" },
  );

  if (error) return { success: false, error: error.message };

  revalidatePath("/davalar");
  revalidatePath("/profil");
  revalidatePath("/profil/gecmis");
  revalidatePath("/profil/basarilar");
  revalidatePath(`/vaka/${caseData.id}`, "layout");
  return { success: true };
}

type CoopActionResult = { success: true } | { success: false; error: string };

async function requireActiveRoomMember(roomId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Giriş yapılmamış" as const };

  const admin = createAdminClient();
  const { data: member } = await admin
    .from("room_players")
    .select("user_id")
    .eq("room_id", roomId)
    .eq("user_id", user.id)
    .is("left_at", null)
    .maybeSingle();
  if (!member) return { error: "Bu odanın aktif üyesi değilsin" as const };

  const { data: room } = await admin
    .from("rooms")
    .select("id, case_id, status, code")
    .eq("id", roomId)
    .maybeSingle();
  if (!room) return { error: "Oda bulunamadı" as const };

  return { admin, room };
}

/** Yanlış sonuçtan sonra yeni tur için odadaki oyları temizler. */
export async function resetRoomVotes(roomId: string): Promise<CoopActionResult> {
  const ctx = await requireActiveRoomMember(roomId);
  if ("error" in ctx) return { success: false, error: ctx.error ?? "Hata" };

  const { error } = await ctx.admin
    .from("room_votes")
    .delete()
    .eq("room_id", roomId);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

/** Doğru çözümden sonra odayı kapatır (status=solved) ve oyları temizler. */
export async function completeCoopRoom(
  roomId: string,
  suspectId: string,
): Promise<CoopActionResult> {
  const ctx = await requireActiveRoomMember(roomId);
  if ("error" in ctx) return { success: false, error: ctx.error ?? "Hata" };
  const { admin, room } = ctx;

  const caseData = getCase(String(room.case_id));
  if (!caseData || caseData.verdict.perpetratorId !== suspectId) {
    return { success: false, error: "Çözüm doğrulanamadı" };
  }

  if (room.status === "playing") {
    const { error } = await admin
      .from("rooms")
      .update({ status: "solved", finished_at: new Date().toISOString() })
      .eq("id", roomId)
      .eq("status", "playing");
    if (error) return { success: false, error: error.message };
  }

  await admin.from("room_votes").delete().eq("room_id", roomId);

  if (room.code) revalidatePath(`/oda/${String(room.code).toUpperCase()}`);
  return { success: true };
}
