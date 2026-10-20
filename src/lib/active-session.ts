export type SessionMode = "solo" | "coop";

export interface ActiveSession {
  mode: SessionMode;
  caseId: string;
  caseName: string;
  startedAt: number;
  username: string;
  roomId?: string;
  code?: string;
  isHost?: boolean;
}

const KEY = "dakt_active_session";

export function getActiveSession(): ActiveSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ActiveSession;
  } catch {
    return null;
  }
}

export function setActiveSession(session: ActiveSession): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(session));
}

export function clearActiveSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}

export function hasActiveSession(): boolean {
  return getActiveSession() !== null;
}

export function getSessionLabel(session: ActiveSession): string {
  if (session.mode === "coop") {
    return `Biraz mola — ${session.caseName} · ODA ${session.code}`;
  }
  return `Yarım kalan vaka — ${session.caseName}`;
}

export function getReturnUrl(session: ActiveSession): string {
  if (session.mode === "coop" && session.roomId) {
    return `/vaka/${session.caseId}/brief?room=${session.roomId}`;
  }
  return `/vaka/${session.caseId}/brief`;
}

function coopVoteFinishedKey(roomId: string) {
  return `dakt_coop_vote_finished_${roomId}`;
}

/** Bu sekmede oylama sonuçlandı: oda `solved` olunca sonuç ekranında kal. */
export function markCoopVoteFinished(roomId: string): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(coopVoteFinishedKey(roomId), "1");
  } catch {
    /* ignore */
  }
}

export function isCoopVoteFinished(roomId: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(coopVoteFinishedKey(roomId)) === "1";
  } catch {
    return false;
  }
}

export function clearCoopVoteFinished(roomId: string): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(coopVoteFinishedKey(roomId));
  } catch {
    /* ignore */
  }
}
