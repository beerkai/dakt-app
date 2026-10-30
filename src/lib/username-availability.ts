import "server-only";

import { createAdminClient } from "@/lib/supabase/admin-client";

/**
 * Takma ad başka bir hesapta kullanılıyor mu?
 * `profiles` SELECT yalnızca kendi satırına açık olduğundan bu kontrol
 * service role ile sunucuda yapılır; yalnızca boolean döner, satır sızdırmaz.
 */
export async function isUsernameTaken(
  username: string,
  excludeUserId?: string,
): Promise<boolean> {
  const admin = createAdminClient();
  let q = admin.from("profiles").select("id").eq("username", username);
  if (excludeUserId) q = q.neq("id", excludeUserId);
  const { data, error } = await q.limit(1);
  if (error) {
    console.warn("[isUsernameTaken]", error.message);
    return false;
  }
  return (data?.length ?? 0) > 0;
}
