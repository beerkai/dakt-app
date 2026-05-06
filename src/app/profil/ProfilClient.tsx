"use client";

import Link from "next/link";
import { useState } from "react";

import { UserColorPicker } from "@/components/UserColorPicker";
import {
  ANALYST_COLOR_HEX,
  ANALYST_COLOR_LABEL_TR,
} from "@/lib/colors";
import type { Profile } from "@/lib/supabase/types";

const mono =
  "[font-family:var(--font-jetbrains-mono),ui-monospace,monospace]";

export function ProfilClient({
  profile,
  email,
  memberSinceLabel,
  stats,
}: {
  profile: Profile;
  email: string;
  memberSinceLabel: string;
  stats: {
    totalSolved: number;
    avgAccuracy: number;
    fastestSolveSec: number;
    totalDurationSec: number;
  };
}) {
  const [colorOpen, setColorOpen] = useState(false);

  function formatDurationSec(s: number) {
    if (s <= 0) return "—";
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m} dk ${sec} sn`;
  }

  const hex = ANALYST_COLOR_HEX[profile.color];
  const label = ANALYST_COLOR_LABEL_TR[profile.color];
  const avgLabel =
    stats.totalSolved > 0 ? `${stats.avgAccuracy}%` : "—";

  return (
    <div className="relative z-[1] mx-auto w-full max-w-[640px] flex-1 px-5 py-10 md:px-7 md:py-14">
      <header className="mb-10">
        <h1 className="mb-2 text-4xl font-semibold italic text-[var(--paper)] [font-family:var(--font-cormorant),serif] md:text-5xl">
          Profil
        </h1>
        <p
          className={`text-[12px] tracking-[0.08em] text-[var(--subtitle-text)] [font-family:var(--font-special-elite),monospace]`}
        >
          Hesap bilgileri ve ayarlar
        </p>
      </header>

      <section
        className="mb-10 border border-[var(--kraft-dark)] bg-[var(--anthracite-2)] p-6 md:p-8"
        aria-labelledby="profil-hesap"
      >
        <h2 id="profil-hesap" className="sr-only">
          Hesap bilgileri
        </h2>
        <p className="mb-2 text-[clamp(1.75rem,4vw,2.5rem)] italic leading-tight text-[var(--kraft)] [font-family:var(--font-cormorant),serif]">
          {profile.username}
        </p>
        <div className="mb-4 flex items-center gap-3">
          <span
            className="size-6 shrink-0 rounded-full border border-[var(--rule)]"
            style={{ backgroundColor: hex }}
            aria-hidden
          />
          <span
            className={`${mono} text-[10px] uppercase tracking-[0.24em] text-[var(--kraft-light)]`}
          >
            {label}
          </span>
        </div>
        {email ? (
          <p className="mb-4 text-[12px] text-[var(--kraft-dark)]">{email}</p>
        ) : null}
        <p className={`mb-6 text-[11px] text-[var(--meta-label)] ${mono}`}>
          Üye olma tarihi: {memberSinceLabel}
        </p>
        <button
          type="button"
          onClick={() => setColorOpen(true)}
          className={`${mono} border border-[var(--kraft)] bg-transparent px-4 py-3 text-[10px] uppercase tracking-[0.22em] text-[var(--kraft-light)] transition-colors hover:border-[var(--kraft-light)] hover:bg-[var(--anthracite)]`}
        >
          Renk Değiştir
        </button>
      </section>

      <UserColorPicker
        currentColor={profile.color}
        open={colorOpen}
        onClose={() => setColorOpen(false)}
      />

      <section
        className="mb-10 border border-[var(--rule)] bg-[var(--anthracite)] p-6 md:p-8"
        aria-labelledby="profil-istatistik"
      >
        <h2
          id="profil-istatistik"
          className={`mb-4 text-[10px] uppercase tracking-[0.28em] text-[var(--meta-label)] ${mono}`}
        >
          İstatistik özeti
        </h2>
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <div className="border border-[var(--rule)] bg-[var(--anthracite-2)] p-4">
            <p className={`${mono} mb-1 text-[9px] uppercase tracking-[0.2em] text-[var(--meta-label)]`}>
              Çözülen vaka
            </p>
            <p className={`text-xl text-[var(--kraft-light)] ${mono}`}>
              {stats.totalSolved}
            </p>
          </div>
          <div className="border border-[var(--rule)] bg-[var(--anthracite-2)] p-4">
            <p className={`${mono} mb-1 text-[9px] uppercase tracking-[0.2em] text-[var(--meta-label)]`}>
              Ortalama doğruluk
            </p>
            <p className={`text-xl text-[var(--kraft-light)] ${mono}`}>
              {avgLabel}
            </p>
          </div>
          <div className="border border-[var(--rule)] bg-[var(--anthracite-2)] p-4">
            <p className={`${mono} mb-1 text-[9px] uppercase tracking-[0.2em] text-[var(--meta-label)]`}>
              En hızlı çözüm
            </p>
            <p className={`text-lg text-[var(--kraft-light)] ${mono}`}>
              {formatDurationSec(stats.fastestSolveSec)}
            </p>
          </div>
          <div className="border border-[var(--rule)] bg-[var(--anthracite-2)] p-4">
            <p className={`${mono} mb-1 text-[9px] uppercase tracking-[0.2em] text-[var(--meta-label)]`}>
              Toplam çözüm süresi
            </p>
            <p className={`text-lg text-[var(--kraft-light)] ${mono}`}>
              {formatDurationSec(stats.totalDurationSec)}
            </p>
          </div>
        </div>
        <p className={`mb-4 flex flex-wrap gap-x-3 gap-y-2 text-[10px] uppercase tracking-[0.18em] text-[var(--meta-label)] ${mono}`}>
          <Link
            href="/profil/basarilar"
            className="border-b border-[var(--kraft-dark)] text-[var(--kraft)] transition-colors hover:border-[var(--bordeaux-bright)] hover:text-[var(--bordeaux-bright)]"
          >
            Detaylı istatistikler → Başarılar
          </Link>
          <Link
            href="/profil/gecmis"
            className="border-b border-[var(--kraft-dark)] text-[var(--kraft)] transition-colors hover:border-[var(--bordeaux-bright)] hover:text-[var(--bordeaux-bright)]"
          >
            Geçmiş kaydını gör →
          </Link>
        </p>
      </section>

      <section
        className="border border-dashed border-[var(--rule)] bg-[var(--anthracite)]/80 p-5 md:p-6"
        aria-label="Hesap riskleri"
      >
        <h2 className={`mb-4 text-[10px] uppercase tracking-[0.28em] text-[var(--meta-label)] ${mono}`}>
          Tehlikeli bölge
        </h2>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            disabled
            className={`${mono} cursor-not-allowed border border-[var(--rule)] bg-[var(--anthracite-2)] px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-[var(--meta-label)] opacity-60`}
          >
            Hesap Sil ○ YAKINDA
          </button>
          <span
            className={`inline-flex items-center px-2 text-[10px] uppercase tracking-[0.18em] text-[var(--kraft-dark)] ${mono}`}
          >
            Şifre değiştir —{" "}
            <span className="text-[var(--meta-label)]">yakında</span>
          </span>
        </div>
      </section>

      <p className="mt-8 text-center">
        <Link
          href="/davalar"
          className={`${mono} text-[10px] uppercase tracking-[0.24em] text-[var(--kraft)] underline-offset-4 hover:text-[var(--bordeaux-bright)]`}
        >
          ← Davalara dön
        </Link>
      </p>
    </div>
  );
}
