import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import {
  calculateBadges,
  calculateStats,
  formatDuration,
  formatTotalPlayTime,
  type SolvedCaseMetrics,
} from "@/lib/badges";
import { getAllCases } from "@/lib/case-helpers";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Başarılar · D.A.K.T.",
  description: "Analiz performansın ve rozetler.",
};

const mono =
  "[font-family:var(--font-jetbrains-mono),ui-monospace,monospace]";
const typewriter =
  "[font-family:var(--font-special-elite),monospace]";

export default async function ProfilBasarilarPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/giris");

  const { data: solvedRows } = await supabase
    .from("solved_cases")
    .select("case_id, accuracy, attempt_count, duration_seconds, solved_at")
    .eq("user_id", user.id);

  const solved = (solvedRows ?? []) as SolvedCaseMetrics[];
  const activeCaseCount = getAllCases().filter((c) => c.status === "active")
    .length;
  const badges = calculateBadges(solved, activeCaseCount);
  const stats = calculateStats(solved);
  const unlockedCount = badges.filter((b) => b.unlocked).length;

  const dateFmt = new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (stats.totalSolved === 0) {
    return (
      <div className="relative z-[1] mx-auto w-full max-w-[960px] flex-1 px-5 py-12 md:px-7 md:py-16">
        <header className="mb-12 text-center">
          <h1 className="mb-3 text-4xl font-semibold italic text-[var(--paper)] [font-family:var(--font-cormorant),serif] md:text-5xl">
            Başarılar
          </h1>
          <p className={`text-[13px] text-[var(--subtitle-text)] ${typewriter}`}>
            Analiz performansın ve kazandığın rozetler
          </p>
        </header>
        <p className="mx-auto mb-8 max-w-lg text-center text-lg italic leading-relaxed text-[var(--kraft-dark)] [font-family:var(--font-cormorant),serif] md:text-xl">
          Henüz hiç vaka çözmedin. İlk dosyanı açmak için davalara git.
        </p>
        <div className="text-center">
          <Link
            href="/davalar"
            className={`inline-flex border border-[var(--bordeaux-bright)] bg-[var(--bordeaux)] px-8 py-4 text-[10px] uppercase tracking-[0.26em] text-[var(--paper)] transition-colors hover:bg-[var(--bordeaux-bright)] ${mono}`}
          >
            Davalara Git →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-[1] mx-auto w-full max-w-[960px] flex-1 px-5 py-10 md:px-7 md:py-14">
      <header className="mb-10 md:mb-12">
        <h1 className="mb-3 text-4xl font-semibold italic text-[var(--paper)] [font-family:var(--font-cormorant),serif] md:text-5xl">
          Başarılar
        </h1>
        <p className={`text-[13px] tracking-[0.06em] text-[var(--subtitle-text)] ${typewriter}`}>
          Analiz performansın ve kazandığın rozetler
        </p>
      </header>

      <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-3">
        <StatCard
          label="ÇÖZÜLEN VAKA"
          value={String(stats.totalSolved)}
          sub="toplam dosya"
        />
        <StatCard
          label="ORTALAMA DENEME"
          value={
            stats.totalSolved > 0
              ? stats.averageAttempts.toLocaleString("tr-TR")
              : "—"
          }
          sub="çözüm başına oylama"
        />
        <StatCard
          label="EN HIZLI ÇÖZÜM"
          value={
            stats.fastestSolve != null
              ? formatDuration(stats.fastestSolve)
              : "—"
          }
          sub="rekorun"
        />
        <StatCard
          label="İLK DENEME ORANI"
          value={`%${stats.firstTryRate}`}
          sub="ilk seferde çözdüklerin"
        />
        <StatCard
          label="MÜKEMMEL ÇÖZÜM"
          value={String(stats.perfectScores)}
          sub="ilk denemede kapanan dosya"
        />
        <StatCard
          label="TOPLAM SÜRE"
          value={formatTotalPlayTime(stats.totalPlayTime)}
          sub="analiz süresi"
        />
      </div>

      <section aria-labelledby="rozet-baslik">
        <h2
          id="rozet-baslik"
          className={`mb-6 flex flex-wrap items-baseline gap-3 text-[11px] uppercase tracking-[0.28em] text-[var(--kraft)] ${mono}`}
        >
          Rozetler
          <span className="text-[var(--meta-label)]">
            {unlockedCount}/{badges.length}
          </span>
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`group flex flex-col border p-4 transition-[box-shadow,opacity] ${
                b.unlocked
                  ? "border-[var(--bordeaux-bright)] bg-[var(--anthracite-2)] shadow-[0_0_20px_rgba(168,36,47,0.12)]"
                  : "border-[var(--kraft-dark)] bg-[var(--anthracite-2)] opacity-[0.42]"
              } hover:shadow-[0_0_18px_rgba(201,180,138,0.08)]`}
            >
              <span
                className={`mb-2 text-[36px] leading-none [font-family:var(--font-cormorant),serif] ${
                  b.unlocked ? "text-[var(--kraft)]" : "text-[var(--kraft-dark)]"
                }`}
                aria-hidden
              >
                {b.icon}
              </span>
              <h3 className="mb-1 text-base italic text-[var(--paper)] [font-family:var(--font-cormorant),serif]">
                {b.title}
              </h3>
              <p
                className={`mb-3 flex-1 text-[11px] leading-relaxed text-[var(--kraft-dark)] ${typewriter}`}
              >
                {b.description}
              </p>
              {b.unlocked && b.unlockedAt ? (
                <p className="mt-auto text-[10px] italic text-[var(--meta-label)]">
                  {dateFmt.format(new Date(b.unlockedAt))}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="border border-[var(--rule)] bg-[var(--anthracite-2)] p-4 md:p-5">
      <p className={`mb-3 text-[9px] uppercase tracking-[0.26em] text-[var(--meta-label)] ${mono}`}>
        {label}
      </p>
      <p className="mb-2 text-[clamp(2rem,6vw,3.5rem)] leading-none text-[var(--kraft)] [font-family:var(--font-cormorant),serif]">
        {value}
      </p>
      <p className={`text-[9px] uppercase tracking-[0.2em] text-[var(--kraft-dark)] ${mono}`}>
        {sub}
      </p>
    </div>
  );
}
