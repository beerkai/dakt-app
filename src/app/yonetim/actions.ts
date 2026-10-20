"use server";

import { getCase } from "@/lib/case-helpers";
import { revalidatePath } from "next/cache";

import { purgeUserAccount } from "@/lib/account-deletion";
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

  const adminDb = createAdminClient();

  const { error } = await adminDb
    .from("profiles")
    .update({ is_tester: value })
    .eq("id", userId);

  if (error) {
    console.error("[setTester] Update error:", error);
    return { error: "Güncelleme başarısız: " + error.message };
  }

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
  const adminDb = createAdminClient();

  const { error } = await adminDb
    .from("solved_cases")
    .delete()
    .eq("user_id", userId);

  if (error) {
    console.error("[resetUserProgress] Delete error:", error);
    return { error: error.message };
  }

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
  const adminDb = createAdminClient();

  const { error } = await adminDb
    .from("profiles")
    .update({
      suspended_at: new Date().toISOString(),
      suspended_reason: reason,
    })
    .eq("id", userId);

  if (error) {
    console.error("[suspendUser] Update error:", error);
    return { error: error.message };
  }

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
  const adminDb = createAdminClient();

  const { error } = await adminDb
    .from("profiles")
    .update({
      suspended_at: null,
      suspended_reason: null,
    })
    .eq("id", userId);

  if (error) {
    console.error("[unsuspendUser] Update error:", error);
    return { error: error.message };
  }

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

  const adminDb = createAdminClient();
  const { data: targetProfile, error: roleError } = await adminDb
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .maybeSingle();

  if (roleError) {
    return { error: "Rol okunamadı: " + roleError.message };
  }

  if (targetProfile?.role === "admin") {
    return { error: "Admin hesapları silinemez. Önce rolü değiştir." };
  }

  const purged = await purgeUserAccount(userId);
  if ("error" in purged) return { error: purged.error };

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

const CASE_STATUSES = ["draft", "test", "published", "archived"] as const;

export async function setCaseStatus(caseId: string, newStatus: string) {
  await ensureAdmin();
  if (!(CASE_STATUSES as readonly string[]).includes(newStatus)) {
    return { error: "Geçersiz vaka durumu" };
  }
  if (!getCase(caseId)) return { error: "Vaka bulunamadı" };
  const adminDb = createAdminClient();

  const updates: Record<string, string> = { status: newStatus };
  if (newStatus === "published")
    updates.published_at = new Date().toISOString();
  if (newStatus === "archived")
    updates.archived_at = new Date().toISOString();

  const { error } = await adminDb
    .from("cases_metadata")
    .upsert({ case_id: caseId, ...updates }, { onConflict: "case_id" });

  if (error) {
    console.error("[setCaseStatus] Update error:", error);
    return { error: error.message };
  }

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
  const adminDb = createAdminClient();

  const { error } = await adminDb
    .from("solved_cases")
    .delete()
    .eq("user_id", userId)
    .eq("case_id", caseId);

  if (error) {
    console.error("[resetSingleCaseProgress] Delete error:", error);
    return { error: error.message };
  }

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

  const adminDb = createAdminClient();

  const { data: existing } = await adminDb
    .from("profiles")
    .select("id")
    .eq("username", trimmed)
    .neq("id", userId)
    .maybeSingle();

  if (existing) {
    return { error: "Bu username zaten kullanımda" };
  }

  const { error } = await adminDb
    .from("profiles")
    .update({ username: trimmed })
    .eq("id", userId);

  if (error) {
    console.error("[changeUsername] Update error:", error);
    return { error: error.message };
  }

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

export async function adminTerminateRoom(roomId: string) {
  await ensureAdmin();

  const adminDb = createAdminClient();

  const { data: room, error: fetchError } = await adminDb
    .from("rooms")
    .select("code, case_id, status")
    .eq("id", roomId)
    .maybeSingle();

  if (fetchError) {
    console.error("[adminTerminateRoom] Fetch error:", fetchError);
    return { error: "Oda okunamadı: " + fetchError.message };
  }

  if (!room) {
    return { error: "Oda bulunamadı (silinmiş olabilir)" };
  }

  const now = new Date().toISOString();
  const roomUpdate: Record<string, string> = {
    status: "archived",
    archived_at: now,
  };
  if (room.status !== "archived") {
    roomUpdate.finished_at = now;
  }

  const { error: updateError } = await adminDb
    .from("rooms")
    .update(roomUpdate)
    .eq("id", roomId);

  if (updateError) {
    console.error("[adminTerminateRoom] Update error:", updateError);
    return { error: "Sonlandırma başarısız: " + updateError.message };
  }

  await adminDb
    .from("room_players")
    .update({ left_at: now })
    .eq("room_id", roomId)
    .is("left_at", null);

  await logAdminAction({
    action: "admin_terminate_room",
    targetType: "room",
    targetId: roomId,
    targetLabel: `Oda ${room.code} (Vaka ${room.case_id})`,
    payload: { previous_status: room.status },
  });

  revalidatePath("/yonetim/odalar");
  revalidatePath("/yonetim/odalar/gecmis");
  revalidatePath("/yonetim");

  return { success: true };
}

export async function changeUserRole(
  userId: string,
  username: string,
  newRole: "admin" | "user",
) {
  await ensureAdmin();

  // Güvenlik 1: Kendine rol değiştirme yapamaz
  const supabase = await createClient();
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();
  if (currentUser?.id === userId) {
    return {
      error:
        "Kendi rolünü değiştiremezsin. Başka bir admin hesabı tanımla.",
    };
  }

  const adminDb = createAdminClient();

  const { data: target, error: targetError } = await adminDb
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .maybeSingle();

  if (targetError) {
    return { error: "Rol okunamadı: " + targetError.message };
  }
  if (!target) return { error: "Kullanıcı bulunamadı" };

  if (newRole === "user" && target.role === "admin") {
    const { count, error: countError } = await adminDb
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");

    if (countError) {
      return { error: "Yönetici sayısı okunamadı: " + countError.message };
    }
    if ((count ?? 0) <= 1) {
      return {
        error:
          "Son yöneticiyi indiremezsin. Önce başka bir yönetici tanımla.",
      };
    }
  }

  const { error } = await adminDb
    .from("profiles")
    .update({ role: newRole })
    .eq("id", userId);

  if (error) {
    console.error("[changeUserRole] Update error:", error);
    return { error: "Rol değiştirme başarısız: " + error.message };
  }

  await logAdminAction({
    action: newRole === "admin" ? "promote_to_admin" : "demote_from_admin",
    targetType: "user",
    targetId: userId,
    targetLabel: `@${username}`,
    payload: { new_role: newRole },
  });

  revalidatePath(`/yonetim/analistler/${userId}`);
  revalidatePath("/yonetim/analistler");
  return { success: true };
}

export async function updateCoopHostBypass(
  enabled: boolean,
): Promise<{ success: true } | { error: string }> {
  await ensureAdmin();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const adminDb = createAdminClient();
  const { error } = await adminDb.from("coop_settings").upsert(
    {
      id: 1,
      host_bypass_enabled: enabled,
      updated_at: new Date().toISOString(),
      updated_by: user?.id ?? null,
    },
    { onConflict: "id" },
  );

  if (error) {
    console.error("[updateCoopHostBypass]", error);
    return { error: error.message };
  }

  await logAdminAction({
    action: "coop_host_bypass_change",
    targetType: "system",
    targetLabel: "Co-op host bypass",
    payload: { host_bypass_enabled: enabled },
  });

  revalidatePath("/yonetim/ayarlar");
  return { success: true };
}
