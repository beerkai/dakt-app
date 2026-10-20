import "server-only";

import { createAdminClient } from "@/lib/supabase/admin-client";

/**
 * Kullanıcının oyun verisini temizler, host olduğu açık odaları arşivler ve
 * auth kaydını siler. Service role gerektirir.
 */
export async function purgeUserAccount(
  userId: string,
): Promise<{ success: true } | { error: string }> {
  const adminClient = createAdminClient();

  const { error: solvedErr } = await adminClient
    .from("solved_cases")
    .delete()
    .eq("user_id", userId);
  if (solvedErr) console.error("[purgeUserAccount] solved_cases:", solvedErr);

  const { error: playErr } = await adminClient
    .from("case_playthroughs")
    .delete()
    .eq("user_id", userId);
  if (playErr) console.error("[purgeUserAccount] case_playthroughs:", playErr);

  const { error: votesErr } = await adminClient
    .from("room_votes")
    .delete()
    .eq("user_id", userId);
  if (votesErr) console.error("[purgeUserAccount] room_votes:", votesErr);

  const { error: roomPlayersErr } = await adminClient
    .from("room_players")
    .delete()
    .eq("user_id", userId);
  if (roomPlayersErr) {
    console.error("[purgeUserAccount] room_players:", roomPlayersErr);
  }

  const now = new Date().toISOString();
  await adminClient
    .from("rooms")
    .update({ status: "archived", archived_at: now, finished_at: now })
    .eq("host_user_id", userId)
    .in("status", ["waiting", "playing"]);

  const { error: profileErr } = await adminClient
    .from("profiles")
    .delete()
    .eq("id", userId);
  if (profileErr) console.error("[purgeUserAccount] profiles:", profileErr);

  const { error: authError } = await adminClient.auth.admin.deleteUser(userId);
  if (authError) return { error: "Auth silme başarısız: " + authError.message };

  return { success: true };
}
