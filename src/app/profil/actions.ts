"use server";

import { revalidatePath } from "next/cache";

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
