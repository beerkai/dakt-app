"use client";

import { createClient } from "@/lib/supabase/client";

export async function getCoopSettings(): Promise<{
  hostBypassEnabled: boolean;
}> {
  const supabase = createClient();
  const { data } = await supabase
    .from("app_settings")
    .select("value")
    .eq("key", "coop_solution_mode")
    .maybeSingle();

  const value = data?.value as { mode?: string } | undefined;
  const mode = value?.mode ?? "unanimous";
  return {
    hostBypassEnabled: mode === "unanimous_with_host_bypass",
  };
}
