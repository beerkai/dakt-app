"use server";

import { revalidatePath } from "next/cache";

import { purgeUserAccount } from "@/lib/account-deletion";
import { createClient } from "@/lib/supabase/server";
import type { AnalystColor } from "@/lib/supabase/types";

const VALID: AnalystColor[] = ["mavi", "sari", "yesil", "mor", "turuncu"];

export type UpdateColorResult = { success: true } | { error: string };

export type ResetSolvedHistoryResult =
  | { success: true }
  | { error: string };

export async function updateProfileColor(
  color: string,
): Promise<UpdateColorResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Giriş yapılmamış" };

  const c = color.trim().toLowerCase();
  if (!VALID.includes(c as AnalystColor)) {
    return { error: "Geçersiz renk" };
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      color: c,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/profil");
  revalidatePath("/", "layout");
  revalidatePath("/davalar");
  return { success: true };
}

export async function resetSolvedHistory(): Promise<ResetSolvedHistoryResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Giriş yapılmamış" };

  const { error } = await supabase
    .from("solved_cases")
    .delete()
    .eq("user_id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/profil");
  revalidatePath("/profil/gecmis");
  revalidatePath("/profil/basarilar");
  revalidatePath("/davalar");
  revalidatePath("/", "layout");
  return { success: true };
}

export type AccountActionResult = { success: true } | { error: string };

const MIN_PASSWORD_LENGTH = 6;

export async function changePassword(input: {
  currentPassword: string;
  newPassword: string;
}): Promise<AccountActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) return { error: "Giriş yapılmamış" };

  if (input.newPassword.length < MIN_PASSWORD_LENGTH) {
    return { error: `Yeni şifre en az ${MIN_PASSWORD_LENGTH} karakter olmalı.` };
  }
  if (input.newPassword === input.currentPassword) {
    return { error: "Yeni şifre eskisiyle aynı olamaz." };
  }

  const { error: reauthError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: input.currentPassword,
  });
  if (reauthError) return { error: "Mevcut şifre hatalı." };

  const { error } = await supabase.auth.updateUser({
    password: input.newPassword,
  });
  if (error) return { error: error.message };

  return { success: true };
}

export async function deleteOwnAccount(
  confirmUsername: string,
): Promise<AccountActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Giriş yapılmamış" };

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, role")
    .eq("id", user.id)
    .maybeSingle();
  if (!profile) return { error: "Profil bulunamadı" };
  if (profile.role === "admin") {
    return { error: "Admin hesapları buradan silinemez." };
  }
  if (confirmUsername.trim() !== profile.username) {
    return { error: "Takma ad eşleşmiyor." };
  }

  const purged = await purgeUserAccount(user.id);
  if ("error" in purged) return purged;

  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  return { success: true };
}
