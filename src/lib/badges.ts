import type { SolvedCase } from "@/lib/supabase/types";

export type SolvedCaseMetrics = Pick<
  SolvedCase,
  "case_id" | "accuracy" | "attempt_count" | "duration_seconds" | "solved_at"
>;

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export function calculateBadges(
  solved: SolvedCaseMetrics[],
  activeCaseCount: number,
): Badge[] {
  const totalSolved = solved.length;
  const firstTry = solved.filter((s) => s.attempt_count === 1).length;
  const fastSolves = solved.filter((s) => s.duration_seconds < 600).length;

  const sortedByDate = [...solved].sort(
    (a, b) =>
      new Date(a.solved_at).getTime() - new Date(b.solved_at).getTime(),
  );

  const fifthSolveDate = sortedByDate[4]?.solved_at;

  return [
    {
      id: "first-case",
      title: "İlk Vaka",
      description: "İlk vakanı çöz",
      icon: "◆",
      unlocked: totalSolved >= 1,
      unlockedAt: sortedByDate[0]?.solved_at,
    },
    {
      id: "five-cases",
      title: "Beş Dosya",
      description: "5 vaka çöz",
      icon: "★",
      unlocked: totalSolved >= 5,
      unlockedAt: fifthSolveDate,
    },
    {
      id: "perfect-solve",
      title: "Saf Doğruluk",
      description: "%100 doğruluk ile bir vaka çöz (ilk denemede)",
      icon: "⬢",
      unlocked: firstTry >= 1,
      unlockedAt: solved.find((s) => s.attempt_count === 1)?.solved_at,
    },
    {
      id: "three-perfect",
      title: "Üç Mükemmel",
      description: "İlk denemede 3 vaka çöz",
      icon: "▲",
      unlocked: firstTry >= 3,
    },
    {
      id: "speed-runner",
      title: "Hızlı Analist",
      description: "Bir vakayı 10 dakikadan kısa sürede çöz",
      icon: "●",
      unlocked: fastSolves >= 1,
      unlockedAt: solved.find((s) => s.duration_seconds < 600)?.solved_at,
    },
    {
      id: "all-current-cases",
      title: "Tüm Aktif Dosyalar",
      description: "Mevcut tüm aktif vakaları çöz",
      icon: "⊕",
      unlocked: activeCaseCount > 0 && totalSolved >= activeCaseCount,
    },
  ];
}

export function calculateStats(solved: SolvedCaseMetrics[]) {
  if (solved.length === 0) {
    return {
      totalSolved: 0,
      averageAccuracy: 0,
      fastestSolve: null as number | null,
      totalPlayTime: 0,
      firstTryRate: 0,
      perfectScores: 0,
    };
  }

  const totalSolved = solved.length;
  const averageAccuracy = Math.round(
    solved.reduce((sum, s) => sum + s.accuracy, 0) / totalSolved,
  );
  const fastestSolve = Math.min(...solved.map((s) => s.duration_seconds));
  const totalPlayTime = solved.reduce((sum, s) => sum + s.duration_seconds, 0);
  const firstTryCount = solved.filter((s) => s.attempt_count === 1).length;
  const firstTryRate = Math.round((firstTryCount / totalSolved) * 100);
  const perfectScores = solved.filter((s) => s.attempt_count === 1).length;

  return {
    totalSolved,
    averageAccuracy,
    fastestSolve,
    totalPlayTime,
    firstTryRate,
    perfectScores,
  };
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins} dk ${secs} sn`;
}

export function formatTotalPlayTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  if (hours > 0) return `${hours} saat ${mins} dk`;
  return `${mins} dk`;
}
