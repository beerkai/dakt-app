"use server";

import { revalidatePath } from "next/cache";

import { checkAdmin, logAdminAction } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";

async function ensureAdmin() {
  const { isAdmin } = await checkAdmin();
  if (!isAdmin) {
    throw new Error("Yetkisiz işlem");
  }
}

export async function setTester(userId: string, value: boolean) {
  await ensureAdmin();
  const supabase = await createClient();

  const { error } = await supabase
    .from("profiles")
    .update({ is_tester: value })
    .eq("id", userId);

  if (error) return { error: error.message };

  await logAdminAction({
    action: value ? "grant_tester" : "revoke_tester",
    targetType: "user",
    targetId: userId,
  });

  revalidatePath(`/yonetim/analistler/${userId}`);
  revalidatePath("/yonetim/analistler");
  return { success: true };
}

export async function resetUserProgress(userId: string, username: string) {
  await ensureAdmin();
  const supabase = await createClient();

  const { error } = await supabase
    .from("solved_cases")
    .delete()
    .eq("user_id", userId);

  if (error) return { error: error.message };

  await logAdminAction({
    action: "reset_user_progress",
    targetType: "user",
    targetId: userId,
    targetLabel: `@${username}`,
  });

  revalidatePath(`/yonetim/analistler/${userId}`);
  return { success: true };
}

export async function suspendUser(
  userId: string,
  username: string,
  reason: string,
) {
  await ensureAdmin();
  const supabase = await createClient();

  const { error } = await supabase
    .from("profiles")
    .update({
      suspended_at: new Date().toISOString(),
      suspended_reason: reason,
    })
    .eq("id", userId);

  if (error) return { error: error.message };

  await logAdminAction({
    action: "suspend_user",
    targetType: "user",
    targetId: userId,
    targetLabel: `@${username}`,
    payload: { reason },
  });

  revalidatePath(`/yonetim/analistler/${userId}`);
  return { success: true };
}

export async function unsuspendUser(userId: string, username: string) {
  await ensureAdmin();
  const supabase = await createClient();

  const { error } = await supabase
    .from("profiles")
    .update({
      suspended_at: null,
      suspended_reason: null,
    })
    .eq("id", userId);

  if (error) return { error: error.message };

  await logAdminAction({
    action: "unsuspend_user",
    targetType: "user",
    targetId: userId,
    targetLabel: `@${username}`,
  });

  revalidatePath(`/yonetim/analistler/${userId}`);
  return { success: true };
}

export async function deleteUser(userId: string, username: string) {
  await ensureAdmin();
  const supabase = await createClient();

  await logAdminAction({
    action: "delete_user",
    targetType: "user",
    targetId: userId,
    targetLabel: `@${username}`,
  });

  const { error } = await supabase.from("profiles").delete().eq("id", userId);

  if (error) return { error: error.message };

  revalidatePath("/yonetim/analistler");
  return { success: true, redirect: "/yonetim/analistler" as const };
}

export async function setCaseStatus(caseId: string, newStatus: string) {
  await ensureAdmin();
  const supabase = await createClient();

  const updates: Record<string, unknown> = { status: newStatus };
  if (newStatus === "published")
    updates.published_at = new Date().toISOString();
  if (newStatus === "archived")
    updates.archived_at = new Date().toISOString();

  const { error } = await supabase
    .from("cases_metadata")
    .update(updates)
    .eq("case_id", caseId);

  if (error) return { error: error.message };

  await logAdminAction({
    action: "change_case_status",
    targetType: "case",
    targetId: caseId,
    targetLabel: `Vaka ${caseId}`,
    payload: { new_status: newStatus },
  });

  revalidatePath("/yonetim/vakalar");
  revalidatePath("/davalar");
  return { success: true };
}
