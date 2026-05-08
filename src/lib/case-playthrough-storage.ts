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

/** Kayıtlı kullanıcı: son başarılı solve Supabase'e işlendi mi (yerel bayrak). */
export function serverSolvedRecordedStorageKey(caseId: string): string {
  return `dakt_case_server_recorded_${caseId}`;
}

export function cozumSessionStorageKey(caseId: string): string {
  return `dakt_v${caseId}_cozum_session`;
}

/** GM sıfırlaması vb. — sunucuda kayıt yokken kalan yerel ilerlemeyi temizler. */
export function clearPlaythroughProgressForCase(caseId: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(attemptsStorageKey(caseId));
    localStorage.removeItem(caseStartStorageKey(caseId));
    localStorage.removeItem(serverSolvedRecordedStorageKey(caseId));
    localStorage.removeItem(cozumSessionStorageKey(caseId));
  } catch {
    /* ignore */
  }
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

export function accuracyPercentForAttempts(attempts: number): number {
  if (attempts <= 1) return 100;
  if (attempts === 2) return 66;
  if (attempts === 3) return 33;
  return 10;
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
