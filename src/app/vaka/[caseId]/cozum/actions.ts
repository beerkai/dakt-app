"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export type RecordSolvedCaseResult =
  | { success: true }
  | { success: false; error: string };

export async function recordSolvedCase(input: {
  caseId: string;
  accuracy: number;
  attemptCount: number;
  durationSeconds: number;
}): Promise<RecordSolvedCaseResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Giriş yapılmamış" };

  const { error } = await supabase.from("solved_cases").upsert(
    {
      user_id: user.id,
      case_id: input.caseId,
      accuracy: input.accuracy,
      attempt_count: input.attemptCount,
      duration_seconds: input.durationSeconds,
      solved_at: new Date().toISOString(),
    },
    { onConflict: "user_id,case_id" },
  );

  if (error) return { success: false, error: error.message };

  revalidatePath("/davalar");
  revalidatePath("/profil");
  revalidatePath("/profil/gecmis");
  revalidatePath("/profil/basarilar");
  revalidatePath(`/vaka/${input.caseId}`, "layout");
  return { success: true };
}
