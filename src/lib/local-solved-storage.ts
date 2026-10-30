/**
 * Misafir çözümleri — kayıt sonrası Supabase'e taşınır.
 */
export const DAKT_LOCAL_SOLVED_KEY = "dakt_local_solved";

export type LocalSolvedRecord = {
  case_id: string;
  accuracy: number;
  attempt_count: number;
  duration_seconds: number;
  solved_at: string;
  /** Oy verilen şüpheli — hesaba aktarımda sunucu (submit_solution) doğrular. */
  suspect_id?: string;
};

export function dispatchLocalSolvedChanged(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("dakt_local_solved_changed"));
}

function isRecord(x: unknown): x is LocalSolvedRecord {
  if (x === null || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.case_id === "string" &&
    typeof o.accuracy === "number" &&
    typeof o.attempt_count === "number" &&
    typeof o.duration_seconds === "number" &&
    typeof o.solved_at === "string"
  );
}

export function readLocalSolvedRecords(): LocalSolvedRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(DAKT_LOCAL_SOLVED_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isRecord);
  } catch {
    return [];
  }
}

export function readLocalSolvedCaseIds(): string[] {
  return readLocalSolvedRecords().map((r) => r.case_id);
}

export function upsertLocalSolvedRecord(record: LocalSolvedRecord): void {
  if (typeof window === "undefined") return;
  try {
    const list = readLocalSolvedRecords();
    const idx = list.findIndex((s) => s.case_id === record.case_id);
    if (idx >= 0) list[idx] = record;
    else list.push(record);
    localStorage.setItem(DAKT_LOCAL_SOLVED_KEY, JSON.stringify(list));
    dispatchLocalSolvedChanged();
  } catch {
    /* ignore */
  }
}

export function clearLocalSolvedRecords(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(DAKT_LOCAL_SOLVED_KEY);
    dispatchLocalSolvedChanged();
  } catch {
    /* ignore */
  }
}
