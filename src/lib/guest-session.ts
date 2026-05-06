export const DAKT_GUEST_USERNAME_KEY = "dakt_guest_username";

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

export function clearGuestUsername(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(DAKT_GUEST_USERNAME_KEY);
    dispatchGuestUsernameChanged();
  } catch {
    /* ignore */
  }
}
