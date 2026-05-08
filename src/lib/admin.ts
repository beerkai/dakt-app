import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin-client";

const SUPER_ADMIN_EMAIL = "beerkai@outlook.com";

export interface AdminCheck {
  isAdmin: boolean;
  user: { id: string; email: string | null } | null;
  profile: { username: string; role: string } | null;
}

/**
 * Server-side admin kontrolü.
 * Hibrit: profiles.role = 'admin' VEYA email = SUPER_ADMIN_EMAIL
 */
export async function checkAdmin(): Promise<AdminCheck> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { isAdmin: false, user: null, profile: null };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, role")
    .eq("id", user.id)
    .maybeSingle();

  const isAdminByRole = profile?.role === "admin";
  const isAdminByEmail = user.email === SUPER_ADMIN_EMAIL;

  return {
    isAdmin: isAdminByRole || isAdminByEmail,
    user: { id: user.id, email: user.email ?? null },
    profile: profile
      ? { username: profile.username, role: profile.role }
      : null,
  };
}

/** Sunucu aksiyonlarında — yetkisizse hata fırlatır. */
export async function ensureAdmin() {
  const { isAdmin } = await checkAdmin();
  if (!isAdmin) {
    throw new Error("Yetkisiz işlem");
  }
}

/**
 * Audit log'a kayıt yaz.
 */
export async function logAdminAction(params: {
  action: string;
  targetType?: "user" | "case" | "room" | "system";
  targetId?: string;
  targetLabel?: string;
  payload?: Record<string, unknown>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .single();

  await supabase.from("admin_audit_log").insert({
    admin_id: user.id,
    admin_username: profile?.username ?? "—",
    action: params.action,
    target_type: params.targetType ?? null,
    target_id: params.targetId ?? null,
    target_label: params.targetLabel ?? null,
    payload: params.payload ?? null,
  });
}

/**
 * Tüm auth.users satırlarını sayfalayarak userId → email eşlemesi.
 * Service role gerekir — sadece server.
 */
export async function getAllUserEmails(): Promise<
  Map<string, string | null>
> {
  const adminClient = createAdminClient();
  const emailMap = new Map<string, string | null>();

  let page = 1;
  const perPage = 100;

  while (true) {
    const { data, error } = await adminClient.auth.admin.listUsers({
      page,
      perPage,
    });

    if (error) {
      console.error("listUsers error:", error);
      break;
    }

    if (!data?.users || data.users.length === 0) break;

    for (const u of data.users) {
      emailMap.set(u.id, u.email ?? null);
    }

    if (data.users.length < perPage) break;
    page += 1;
  }

  return emailMap;
}

/** Tek kullanıcının e-postası (auth.users). */
export async function getUserEmail(userId: string): Promise<string | null> {
  const adminClient = createAdminClient();
  const { data, error } = await adminClient.auth.admin.getUserById(userId);

  if (error || !data?.user) return null;
  return data.user.email ?? null;
}
