/** İlk /brief girişi — üzerine yazma yok (oyun süresi devam eder). */
export function caseStartStorageKey(caseId: string): string {
  return `dakt_case_start_${caseId}`;
}

export function ensureCaseStartTimestamp(caseId: string): void {
  if (typeof window === "undefined") return;
  try {
    const k = caseStartStorageKey(caseId);
    if (localStorage.getItem(k) != null) return;
    localStorage.setItem(k, String(Date.now()));
  } catch {
    /* ignore */
  }
}

export function readCaseStartTimestamp(caseId: string): number | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(caseStartStorageKey(caseId));
    if (raw == null) return null;
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

export function attemptsStorageKey(caseId: string): string {
  return `dakt_attempts_${caseId}`;
}

export function readAttemptCount(caseId: string): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = localStorage.getItem(attemptsStorageKey(caseId));
    if (raw == null) return 0;
    const n = parseInt(raw, 10);
    return Number.isFinite(n) && n >= 0 ? n : 0;
  } catch {
    return 0;
  }
}

/** Oyumu Onayla her basıldığında +1; güncel değeri döner. */
export function incrementAttemptCount(caseId: string): number {
  if (typeof window === "undefined") return 0;
  const next = readAttemptCount(caseId) + 1;
  try {
    localStorage.setItem(attemptsStorageKey(caseId), String(next));
  } catch {
    /* ignore */
  }
  return next;
}

/** Onaylanan oy sayısına göre doğruluk: n denemede doğru → yaklaşık 100/n (%). */
export function accuracyPercentForAttempts(attempts: number): number {
  const n = Math.max(1, Math.floor(attempts));
  if (n <= 1) return 100;
  return Math.max(10, Math.round(100 / n));
}

export function formatCertificateDate(d = new Date()): string {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
}

export function formatDurationMs(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m} dk ${sec} sn`;
}
