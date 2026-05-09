"use client";

import { createClient } from "@/lib/supabase/client";

export type CoopSettings = {
  hostBypassEnabled: boolean;
};

/** Sunucudaki co-op yönetim ayarları (tablo yoksa / hata — güvenli varsayılan). */
export async function getCoopSettings(): Promise<CoopSettings> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("coop_settings")
    .select("host_bypass_enabled")
    .limit(1)
    .maybeSingle();

  if (error || !data) {
    return { hostBypassEnabled: false };
  }

  return {
    hostBypassEnabled: Boolean(
      (data as { host_bypass_enabled?: boolean }).host_bypass_enabled,
    ),
  };
}
