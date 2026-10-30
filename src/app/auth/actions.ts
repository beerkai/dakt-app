"use server";

import { revalidatePath } from "next/cache";

import type { GuestProgressPayload } from "@/lib/guest-progress-transfer";
import { getCase } from "@/lib/case-helpers";
import { createAdminClient } from "@/lib/supabase/admin-client";
import { createClient } from "@/lib/supabase/server";
import { isUsernameTaken } from "@/lib/username-availability";
import type { AnalystColor } from "@/lib/supabase/types";

const ANALYST_COLORS: AnalystColor[] = [
  "mavi",
  "sari",
  "yesil",
  "mor",
  "turuncu",
];

function parseColor(raw: string | null): AnalystColor {
  const v = raw?.trim().toLowerCase();
  if (v && ANALYST_COLORS.includes(v as AnalystColor)) {
    return v as AnalystColor;
  }
  return "mavi";
}

export type AuthActionResult = { success: true } | { error: string };

export async function signUp(formData: FormData): Promise<AuthActionResult> {
  const supabase = await createClient();

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const username = String(formData.get("username") ?? "").trim();
  const color = parseColor(String(formData.get("color") ?? ""));

  if (!email || !password || !username) {
    return { error: "E-posta, şifre ve takma ad gerekli." };
  }
  if (password.length < 6) {
    return { error: "Şifre en az 6 karakter olmalı." };
  }

  if (await isUsernameTaken(username)) {
    return { error: "Bu analist takma adı zaten kullanılıyor." };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username, color },
    },
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  return { success: true };
}

export async function signIn(formData: FormData): Promise<AuthActionResult> {
  const supabase = await createClient();

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "E-posta ve şifre gerekli." };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("suspended_at")
      .eq("id", user.id)
      .maybeSingle();

    if (profile?.suspended_at) {
      await supabase.auth.signOut();
      return {
        error:
          "Bu hesap askıya alınmış. Detay için: destek@dakt.app",
      };
    }
  }

  revalidatePath("/", "layout");
  return { success: true };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
}

export type TransferGuestProgressResult =
  | {
      success: true;
      solvedCount: number;
      playthroughCount: number;
    }
  | { error: string };

const MAX_DURATION_SECONDS = 60 * 60 * 24 * 30;
const MAX_ATTEMPTS = 1000;

function clampInt(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, Math.floor(value)));
}

/**
 * Misafir localStorage ilerlemesini hesaba yazar (service role).
 * solved_cases istemci yazımı kapalı olduğu için buradan geçmek zorunlu.
 */
export async function transferGuestProgress(
  payload: GuestProgressPayload,
): Promise<TransferGuestProgressResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Giriş yapılmamış" };

  const admin = createAdminClient();
  let solvedCount = 0;
  let playthroughCount = 0;

  const plays = Array.isArray(payload.playthroughs)
    ? payload.playthroughs
    : [];
  for (const play of plays.slice(0, 50)) {
    if (!play || typeof play.caseId !== "string") continue;
    const caseData = getCase(play.caseId);
    if (!caseData) continue;

    const { data: existing } = await admin
      .from("case_playthroughs")
      .select("started_at, attempt_count, locked_suspect_ids")
      .eq("user_id", user.id)
      .eq("case_id", caseData.id)
      .maybeSingle();

    const guestStarted =
      play.startedAtMs != null && Number.isFinite(play.startedAtMs)
        ? new Date(play.startedAtMs).toISOString()
        : null;
    const startedAt =
      existing?.started_at && guestStarted
        ? new Date(String(existing.started_at)).getTime() <=
          new Date(guestStarted).getTime()
          ? String(existing.started_at)
          : guestStarted
        : (existing?.started_at as string | undefined) ??
          guestStarted ??
          new Date().toISOString();

    const attemptCount = Math.max(
      clampInt(Number(existing?.attempt_count ?? 0), 0, MAX_ATTEMPTS),
      clampInt(Number(play.attemptCount ?? 0), 0, MAX_ATTEMPTS),
    );

    const locked = new Set<string>(
      Array.isArray(existing?.locked_suspect_ids)
        ? (existing.locked_suspect_ids as string[])
        : [],
    );
    for (const id of play.lockedSuspectIds ?? []) {
      if (typeof id === "string" && id) locked.add(id);
    }

    const { error } = await admin.from("case_playthroughs").upsert(
      {
        user_id: user.id,
        case_id: caseData.id,
        started_at: startedAt,
        attempt_count: attemptCount,
        locked_suspect_ids: [...locked],
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,case_id" },
    );
    if (!error) playthroughCount += 1;
    else console.warn("[transferGuest] playthrough:", error.message);
  }

  // Çözümler en son: submit_solution RPC'si (SECURITY DEFINER) cevabı
  // case_answers'tan doğrular ve süreyi yukarıda yazılan playthrough'tan hesaplar.
  // Şüpheli kimliği olmayan (eski) ya da yanlış kayıtlar aktarılmaz.
  const solved = Array.isArray(payload.solved) ? payload.solved : [];
  for (const row of solved.slice(0, 50)) {
    if (!row || typeof row.case_id !== "string") continue;
    if (typeof row.suspect_id !== "string" || !row.suspect_id) continue;
    const caseData = getCase(row.case_id);
    if (!caseData) continue;
    const solvedAtMs =
      typeof row.solved_at === "string" ? Date.parse(row.solved_at) : NaN;
    const { data, error } = await supabase.rpc("submit_solution", {
      p_case_id: caseData.id,
      p_suspect_id: row.suspect_id,
      p_attempt_count: clampInt(Number(row.attempt_count), 1, MAX_ATTEMPTS),
      p_duration_seconds: clampInt(
        Number(row.duration_seconds),
        0,
        MAX_DURATION_SECONDS,
      ),
      p_solved_at: Number.isFinite(solvedAtMs)
        ? new Date(solvedAtMs).toISOString()
        : null,
    });
    if (error) console.warn("[transferGuest] solved:", error.message);
    else if ((data as { solved?: boolean } | null)?.solved === true) {
      solvedCount += 1;
    }
  }

  if (solvedCount > 0) {
    revalidatePath("/davalar");
    revalidatePath("/profil");
    revalidatePath("/profil/gecmis");
    revalidatePath("/profil/basarilar");
  }

  return { success: true, solvedCount, playthroughCount };
}
