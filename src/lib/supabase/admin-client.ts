import "server-only";

import { createClient } from "@supabase/supabase-js";

/**
 * Service role client — RLS bypass, admin-only operations.
 * SADECE server-side kullan. Client-side ifşa OLMASIN.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL eksik");
  }
  if (!serviceKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY eksik — Vercel env variables kontrol et",
    );
  }

  return createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
