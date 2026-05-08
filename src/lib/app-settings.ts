import "server-only";

import { createAdminClient } from "@/lib/supabase/admin-client";
import { createClient } from "@/lib/supabase/server";

export const SETTINGS_KEYS = {
  COOP_HOST_BYPASS: "coop_solution_host_bypass_enabled",
} as const;

export async function getCoopHostBypassEnabled(): Promise<boolean> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("app_settings")
    .select("value")
    .eq("key", SETTINGS_KEYS.COOP_HOST_BYPASS)
    .maybeSingle();

  if (error) {
    console.warn("[getCoopHostBypassEnabled]", error.message);
    return false;
  }

  const v = data?.value;
  return v === true;
}

export async function setCoopHostBypassEnabled(enabled: boolean) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("app_settings").upsert({
    key: SETTINGS_KEYS.COOP_HOST_BYPASS,
    value: enabled,
    updated_at: new Date().toISOString(),
  });
  if (error) throw error;
}
