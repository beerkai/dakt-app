"use server";

import { revalidatePath } from "next/cache";

import { checkAdmin, logAdminAction } from "@/lib/admin";
import { createAdminClient } from "@/lib/supabase/admin-client";
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
  const { data: targetProfile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();

  if (targetProfile?.role === "admin") {
    return { error: "Admin hesapları silinemez. Önce rolü değiştir." };
  }

  const adminClient = createAdminClient();

  await adminClient.from("profiles").delete().eq("id", userId);
  await adminClient.from("solved_cases").delete().eq("user_id", userId);
  await adminClient.from("room_players").delete().eq("user_id", userId);

  const { error: authError } = await adminClient.auth.admin.deleteUser(userId);

  if (authError) {
    return { error: "Auth silme başarısız: " + authError.message };
  }

  await logAdminAction({
    action: "delete_user",
    targetType: "user",
    targetId: userId,
    targetLabel: `@${username} (silindi)`,
    payload: { username, deleted_at: new Date().toISOString() },
  });

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

export async function resetSingleCaseProgress(
  userId: string,
  username: string,
  caseId: string,
) {
  await ensureAdmin();
  const supabase = await createClient();

  const { error } = await supabase
    .from("solved_cases")
    .delete()
    .eq("user_id", userId)
    .eq("case_id", caseId);

  if (error) return { error: error.message };

  await logAdminAction({
    action: "reset_single_case",
    targetType: "user",
    targetId: userId,
    targetLabel: `@${username} → Vaka ${caseId}`,
    payload: { case_id: caseId },
  });

  revalidatePath(`/yonetim/analistler/${userId}`);
  return { success: true };
}

export async function changeUsername(
  userId: string,
  oldUsername: string,
  newUsername: string,
) {
  await ensureAdmin();

  const trimmed = newUsername.trim();
  if (trimmed.length < 2 || trimmed.length > 24) {
    return { error: "Username 2-24 karakter arası olmalı" };
  }
  if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) {
    return { error: "Username sadece harf, rakam, _ içerebilir" };
  }

  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", trimmed)
    .neq("id", userId)
    .maybeSingle();

  if (existing) {
    return { error: "Bu username zaten kullanımda" };
  }

  const { error } = await supabase
    .from("profiles")
    .update({ username: trimmed })
    .eq("id", userId);

  if (error) return { error: error.message };

  await logAdminAction({
    action: "change_username",
    targetType: "user",
    targetId: userId,
    targetLabel: `@${oldUsername} → @${trimmed}`,
    payload: { old: oldUsername, new: trimmed },
  });

  revalidatePath(`/yonetim/analistler/${userId}`);
  revalidatePath("/yonetim/analistler");
  return { success: true };
}
