import type { AnalystColor } from "@/lib/supabase/types";

export const DAKT_GUEST_USERNAME_KEY = "dakt_guest_username";
export const DAKT_USER_COLOR_KEY = "dakt_user_color";

export function dispatchGuestUsernameChanged(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("dakt_guest_changed"));
}

/** localStorage’dan trimlenmiş takma ad; yoksa null. */
export function readGuestUsernameTrimmed(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem(DAKT_GUEST_USERNAME_KEY)?.trim();
    return v && v.length > 0 ? v : null;
  } catch {
    return null;
  }
}

export function writeGuestUsername(name: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(DAKT_GUEST_USERNAME_KEY, name.trim());
    dispatchGuestUsernameChanged();
  } catch {
    /* ignore */
  }
}

/** Misafir analist rengi (turkçe kod: mavi, sari, …). */
export function writeGuestColor(color: AnalystColor): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(DAKT_USER_COLOR_KEY, color);
    dispatchGuestUsernameChanged();
  } catch {
    /* ignore */
  }
}

export function readGuestColor(): AnalystColor | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(DAKT_USER_COLOR_KEY)?.trim().toLowerCase();
    if (
      raw === "mavi" ||
      raw === "sari" ||
      raw === "yesil" ||
      raw === "mor" ||
      raw === "turuncu"
    ) {
      return raw;
    }
    return null;
  } catch {
    return null;
  }
}

export function clearGuestUsername(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(DAKT_GUEST_USERNAME_KEY);
    localStorage.removeItem(DAKT_USER_COLOR_KEY);
    dispatchGuestUsernameChanged();
  } catch {
    /* ignore */
  }
}
