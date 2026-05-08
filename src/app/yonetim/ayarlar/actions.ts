"use server";

import { ensureAdmin } from "@/lib/admin";
import { setCoopHostBypassEnabled } from "@/lib/app-settings";
import { revalidatePath } from "next/cache";

export async function setCoopHostBypassAction(enabled: boolean) {
  await ensureAdmin();
  await setCoopHostBypassEnabled(enabled);
  revalidatePath("/yonetim/ayarlar");
}
