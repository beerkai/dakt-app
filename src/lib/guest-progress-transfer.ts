/**
 * Misafir → kayıtlı hesap aktarımı.
 * Damga / kronoloji / kilit anahtarları zaten caseId bazlı (cihazda kalır).
 * Sunucuya: çözülen vakalar + playthrough (süre / deneme / kilitler).
 * Pano notları: eski misafir anahtarından kararlı anahtara migrate edilir.
 */

import {
  readAttemptCount,
  readCaseStartTimestamp,
} from "@/lib/case-playthrough-storage";
import { DAKT_GUEST_USERNAME_KEY } from "@/lib/guest-session";
import { readLockedSuspects } from "@/lib/locked-suspects-storage";
import {
  clearLocalSolvedRecords,
  readLocalSolvedRecords,
  type LocalSolvedRecord,
} from "@/lib/local-solved-storage";

export type GuestPlaythroughTransfer = {
  caseId: string;
  startedAtMs: number | null;
  attemptCount: number;
  lockedSuspectIds: string[];
};

export type GuestProgressPayload = {
  solved: LocalSolvedRecord[];
  playthroughs: GuestPlaythroughTransfer[];
  notesMigrated: number;
};

const NOTES_PREFIX = "dakt_notes_";

/** Kararlı pano anahtarı — misafir adından bağımsız. */
export function panoNotesStorageKey(caseId: string): string {
  return `${NOTES_PREFIX}${caseId}`;
}

function collectCaseIdsFromStorage(): string[] {
  if (typeof window === "undefined") return [];
  const ids = new Set<string>();
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;
      const m =
        /^dakt_(?:stamps|case_start|attempts|locked_suspects|timeline|notes)_(\d+)/.exec(
          key,
        );
      if (m?.[1]) ids.add(m[1]);
    }
  } catch {
    /* ignore */
  }
  for (const s of readLocalSolvedRecords()) ids.add(s.case_id);
  return [...ids];
}

/** Eski `dakt_notes_${caseId}_${guest}` → `dakt_notes_${caseId}`. */
export function migratePanoNotesKeys(): number {
  if (typeof window === "undefined") return 0;
  let migrated = 0;
  try {
    const guest =
      localStorage.getItem(DAKT_GUEST_USERNAME_KEY)?.trim() || "anon";
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k?.startsWith(NOTES_PREFIX)) keys.push(k);
    }

    const byCase = new Map<string, string[]>();
    for (const key of keys) {
      const rest = key.slice(NOTES_PREFIX.length);
      const stableMatch = /^(\d+)$/.exec(rest);
      if (stableMatch) {
        const caseId = stableMatch[1]!;
        const list = byCase.get(caseId) ?? [];
        list.push(key);
        byCase.set(caseId, list);
        continue;
      }
      const legacy = /^(\d+)_(.+)$/.exec(rest);
      if (legacy) {
        const caseId = legacy[1]!;
        const list = byCase.get(caseId) ?? [];
        list.push(key);
        byCase.set(caseId, list);
      }
    }

    for (const [caseId, caseKeys] of byCase) {
      const target = panoNotesStorageKey(caseId);
      if (localStorage.getItem(target)) {
        for (const k of caseKeys) {
          if (k !== target && (k.endsWith(`_${guest}`) || k.endsWith("_anon"))) {
            localStorage.removeItem(k);
          }
        }
        continue;
      }
      const preferred =
        caseKeys.find((k) => k === `${NOTES_PREFIX}${caseId}_${guest}`) ??
        caseKeys.find((k) => k.endsWith("_anon")) ??
        caseKeys[0];
      if (!preferred) continue;
      const raw = localStorage.getItem(preferred);
      if (raw == null) continue;
      localStorage.setItem(target, raw);
      migrated += 1;
      for (const k of caseKeys) {
        if (k !== target) localStorage.removeItem(k);
      }
    }
  } catch {
    /* ignore */
  }
  return migrated;
}

function collectPlaythroughs(): GuestPlaythroughTransfer[] {
  const caseIds = collectCaseIdsFromStorage();
  const out: GuestPlaythroughTransfer[] = [];
  for (const caseId of caseIds) {
    const startedAtMs = readCaseStartTimestamp(caseId);
    const attemptCount = readAttemptCount(caseId);
    const lockedSuspectIds = readLockedSuspects(caseId);
    if (
      startedAtMs == null &&
      attemptCount <= 0 &&
      lockedSuspectIds.length === 0
    ) {
      continue;
    }
    out.push({
      caseId,
      startedAtMs,
      attemptCount,
      lockedSuspectIds,
    });
  }
  return out;
}

export function collectGuestProgress(): GuestProgressPayload {
  const notesMigrated = migratePanoNotesKeys();
  return {
    solved: readLocalSolvedRecords(),
    playthroughs: collectPlaythroughs(),
    notesMigrated,
  };
}

export function clearTransferredGuestServerState(): void {
  clearLocalSolvedRecords();
}

export function guestProgressSummary(p: GuestProgressPayload): {
  solvedCount: number;
  playthroughCount: number;
  notesMigrated: number;
  hasAnything: boolean;
} {
  return {
    solvedCount: p.solved.length,
    playthroughCount: p.playthroughs.length,
    notesMigrated: p.notesMigrated,
    hasAnything:
      p.solved.length > 0 ||
      p.playthroughs.length > 0 ||
      p.notesMigrated > 0,
  };
}
