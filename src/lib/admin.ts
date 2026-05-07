import { createClient } from "@/lib/supabase/server";

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
