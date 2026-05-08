"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
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

  const { data: existing } = await supabase
    .from("profiles")
    .select("username")
    .eq("username", username)
    .maybeSingle();

  if (existing) {
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
