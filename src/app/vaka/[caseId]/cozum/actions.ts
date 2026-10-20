"use server";

import { revalidatePath } from "next/cache";

import { getCase } from "@/lib/case-helpers";
import { sanitizeCaseHtml } from "@/lib/html-sanitize";
import { createAdminClient } from "@/lib/supabase/admin-client";
import { createClient } from "@/lib/supabase/server";
import { lessonForWrongSuspect } from "@/lib/wrong-verdict-lesson";

export type RevealVerdictResult =
  | {
      correct: true;
      perpetratorName: string;
      solutionHtml: string;
      attemptCount: number;
      durationSeconds: number;
    }
  | {
      correct: false;
      wrongAnswerMessage: string;
      lessonHtml: string;
      lockedSuspectId: string;
      attemptCount: number;
    }
  | { error: string };

const MAX_DURATION_SECONDS = 60 * 60 * 24 * 30;
const MAX_ATTEMPTS = 1000;

function clampInt(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, Math.floor(value)));
}

async function bumpPlaythroughAttempt(
  userId: string,
  caseId: string,
  lockSuspectId?: string,
): Promise<{ attemptCount: number; startedAt: string | null }> {
  const admin = createAdminClient();
  const now = new Date().toISOString();
  const { data: existing } = await admin
    .from("case_playthroughs")
    .select("attempt_count, started_at, locked_suspect_ids")
    .eq("user_id", userId)
    .eq("case_id", caseId)
    .maybeSingle();

  const prevAttempts = clampInt(Number(existing?.attempt_count ?? 0), 0, MAX_ATTEMPTS);
  const attemptCount = clampInt(prevAttempts + 1, 1, MAX_ATTEMPTS);
  const locked = new Set<string>(
    Array.isArray(existing?.locked_suspect_ids)
      ? (existing.locked_suspect_ids as string[])
      : [],
  );
  if (lockSuspectId) locked.add(lockSuspectId);

  const { error } = await admin.from("case_playthroughs").upsert(
    {
      user_id: userId,
      case_id: caseId,
      started_at: existing?.started_at ?? now,
      attempt_count: attemptCount,
      locked_suspect_ids: [...locked],
      updated_at: now,
    },
    { onConflict: "user_id,case_id" },
  );
  if (error) {
    console.warn("[playthrough] bump:", error.message);
  }

  return {
    attemptCount,
    startedAt: String(existing?.started_at ?? now),
  };
}

/** Brief açılışında sunucu süresini başlatır (giriş yapmış kullanıcı). */
export async function ensurePlaythroughStart(
  caseId: string,
): Promise<{ ok: true } | { error: string }> {
  const caseData = getCase(caseId);
  if (!caseData) return { error: "Vaka bulunamadı" };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: true };

  const admin = createAdminClient();
  const { data: existing } = await admin
    .from("case_playthroughs")
    .select("user_id")
    .eq("user_id", user.id)
    .eq("case_id", caseId)
    .maybeSingle();
  if (existing) return { ok: true };

  const now = new Date().toISOString();
  const { error } = await admin.from("case_playthroughs").insert({
    user_id: user.id,
    case_id: caseId,
    started_at: now,
    attempt_count: 0,
    locked_suspect_ids: [],
    updated_at: now,
  });
  if (error && !error.message.includes("duplicate")) {
    return { error: error.message };
  }
  return { ok: true };
}

/** Oy verildikten sonra sonucu döner; çözüm bilgisi istemciye önceden gönderilmez. */
export async function revealVerdict(
  caseId: string,
  suspectId: string,
  roomId?: string | null,
): Promise<RevealVerdictResult> {
  const caseData = getCase(caseId);
  if (!caseData) return { error: "Vaka bulunamadı" };
  if (!caseData.suspects.some((s) => s.id === suspectId)) {
    return { error: "Şüpheli bulunamadı" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { verdict } = caseData;
  const correct = verdict.perpetratorId === suspectId;

  let attemptCount = 1;
  let startedAt: string | null = null;
  if (user) {
    const bumped = await bumpPlaythroughAttempt(
      user.id,
      caseId,
      correct ? undefined : suspectId,
    );
    attemptCount = bumped.attemptCount;
    startedAt = bumped.startedAt;
  }

  if (correct) {
    const durationSeconds = startedAt
      ? clampInt(
          (Date.now() - new Date(startedAt).getTime()) / 1000,
          0,
          MAX_DURATION_SECONDS,
        )
      : 0;
    return {
      correct: true,
      perpetratorName: verdict.perpetratorName,
      solutionHtml: sanitizeCaseHtml(verdict.solutionHtml),
      attemptCount,
      durationSeconds,
    };
  }

  if (roomId) {
    const ctx = await requireActiveRoomMember(roomId);
    if (!("error" in ctx) && String(ctx.room.case_id) === caseId) {
      const { error } = await ctx.admin.from("room_elim_suspects").upsert(
        {
          room_id: roomId,
          suspect_id: suspectId,
          eliminated_at: new Date().toISOString(),
        },
        { onConflict: "room_id,suspect_id" },
      );
      if (error) console.warn("[revealVerdict] room elim:", error.message);
    }
  }

  const lesson = lessonForWrongSuspect(caseData, suspectId);
  return {
    correct: false,
    wrongAnswerMessage: verdict.wrongAnswerMessage,
    lessonHtml: sanitizeCaseHtml(lesson.html),
    lockedSuspectId: suspectId,
    attemptCount,
  };
}

export type RecordSolvedCaseResult =
  | { success: true; attemptCount: number; durationSeconds: number }
  | { success: false; error: string };

export async function recordSolvedCase(input: {
  caseId: string;
  suspectId: string;
  /** Yedek: sunucu playthrough yoksa (eski satır) kullanılır. */
  attemptCount?: number;
  durationSeconds?: number;
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

  const admin = createAdminClient();
  const { data: play } = await admin
    .from("case_playthroughs")
    .select("attempt_count, started_at")
    .eq("user_id", user.id)
    .eq("case_id", caseData.id)
    .maybeSingle();

  const attemptCount = clampInt(
    Number(play?.attempt_count ?? input.attemptCount ?? 1),
    1,
    MAX_ATTEMPTS,
  );
  const durationSeconds = play?.started_at
    ? clampInt(
        (Date.now() - new Date(String(play.started_at)).getTime()) / 1000,
        0,
        MAX_DURATION_SECONDS,
      )
    : clampInt(Number(input.durationSeconds ?? 0), 0, MAX_DURATION_SECONDS);

  const { error } = await admin.from("solved_cases").upsert(
    {
      user_id: user.id,
      case_id: caseData.id,
      accuracy: 100,
      attempt_count: attemptCount,
      duration_seconds: durationSeconds,
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
  return { success: true, attemptCount, durationSeconds };
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

  return { admin, room, user };
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
