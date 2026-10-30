import "server-only";

import { createHash } from "node:crypto";
import { headers } from "next/headers";

import { createAdminClient } from "@/lib/supabase/admin-client";

/**
 * Sabit pencereli sayaç (`public.rate_limit_hit`, yalnızca service role).
 * Limit içindeyse true. Veritabanı hatasında oyunu kırmamak için açık kalır (true).
 */
export async function rateLimitHit(
  key: string,
  windowSeconds: number,
  max: number,
): Promise<boolean> {
  const admin = createAdminClient();
  const { data, error } = await admin.rpc("rate_limit_hit", {
    p_key: key,
    p_window_seconds: windowSeconds,
    p_max: max,
  });
  if (error) {
    console.warn("[rateLimitHit]", error.message);
    return true;
  }
  return data !== false;
}

/** İstemci IP'sinin hash'i (ham IP saklanmaz). Vercel x-forwarded-for'u kendisi yazar. */
export async function clientIpKey(): Promise<string> {
  const h = await headers();
  const ip =
    h.get("x-real-ip")?.trim() ||
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";
  return createHash("sha256").update(ip).digest("hex").slice(0, 32);
}
