"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import ConfirmModal from "@/components/ConfirmModal";
import { UserColorPicker } from "@/components/UserColorPicker";
import { clearActiveSession } from "@/lib/active-session";
import { changePassword, deleteOwnAccount } from "./actions";
import {
  ANALYST_COLOR_HEX,
  ANALYST_COLOR_LABEL_TR,
} from "@/lib/colors";
import type { Profile } from "@/lib/supabase/types";

const mono =
  "[font-family:var(--font-jetbrains-mono),ui-monospace,monospace]";

const labelMono =
  "mb-2 block text-[9px] uppercase tracking-[0.22em] text-[var(--meta-label)] [font-family:var(--font-jetbrains-mono),monospace]";

const inputClass =
  "w-full border border-[var(--kraft-dark)] bg-[var(--anthracite)] px-4 py-3 text-[13px] text-[var(--body-text)] [font-family:var(--font-special-elite),monospace] placeholder:text-[var(--meta-label)] focus:border-[var(--kraft)] focus:outline-none";

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
    firstTryRate: number;
    fastestSolveSec: number;
    totalDurationSec: number;
  };
}) {
  const router = useRouter();
  const [colorOpen, setColorOpen] = useState(false);

  const [pwOpen, setPwOpen] = useState(false);
  const [pwBusy, setPwBusy] = useState(false);
  const [pwMessage, setPwMessage] = useState<
    { kind: "ok" | "error"; text: string } | null
  >(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  async function handlePasswordSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pwBusy) return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const currentPassword = String(data.get("current") ?? "");
    const newPassword = String(data.get("next") ?? "");
    const repeat = String(data.get("repeat") ?? "");
    if (newPassword !== repeat) {
      setPwMessage({ kind: "error", text: "Yeni şifreler eşleşmiyor." });
      return;
    }
    setPwBusy(true);
    setPwMessage(null);
    const result = await changePassword({ currentPassword, newPassword });
    setPwBusy(false);
    if ("error" in result) {
      setPwMessage({ kind: "error", text: result.error });
      return;
    }
    form.reset();
    setPwMessage({ kind: "ok", text: "Şifren güncellendi." });
  }

  async function handleDeleteAccount() {
    if (deleteBusy) return;
    setDeleteBusy(true);
    setDeleteError(null);
    const result = await deleteOwnAccount(deleteConfirm);
    if ("error" in result) {
      setDeleteError(result.error);
      setDeleteBusy(false);
      return;
    }
    clearActiveSession();
    window.dispatchEvent(new Event("dakt-session-change"));
    router.push("/");
    router.refresh();
  }

  function formatDurationSec(s: number) {
    if (s <= 0) return "—";
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m} dk ${sec} sn`;
  }

  const hex = ANALYST_COLOR_HEX[profile.color];
  const label = ANALYST_COLOR_LABEL_TR[profile.color];
  const firstTryLabel =
    stats.totalSolved > 0 ? `${stats.firstTryRate}%` : "—";

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

      <ConfirmModal
        open={deleteOpen}
        onClose={() => {
          if (!deleteBusy) setDeleteOpen(false);
        }}
        onConfirm={() => void handleDeleteAccount()}
        title="Hesabı kalıcı olarak sil"
        description="Çözüm geçmişin, rozetlerin ve oda kayıtların silinir; host olduğun açık odalar kapatılır. Bu işlem geri alınamaz."
        confirmText={deleteBusy ? "Siliniyor…" : "Hesabı Sil"}
        variant="danger"
        confirmDisabled={deleteBusy || deleteConfirm.trim() !== profile.username}
      >
        <div className="mb-6">
          <label htmlFor="delete-confirm" className={labelMono}>
            Onay için takma adını yaz: {profile.username}
          </label>
          <input
            id="delete-confirm"
            type="text"
            value={deleteConfirm}
            onChange={(e) => setDeleteConfirm(e.target.value)}
            autoComplete="off"
            className={inputClass}
          />
          {deleteError ? (
            <p
              role="alert"
              className={`${mono} mt-2 text-[10px] uppercase tracking-[0.18em] text-[var(--bordeaux-bright)]`}
            >
              {deleteError}
            </p>
          ) : null}
        </div>
      </ConfirmModal>

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
              İlk denemede çözme
            </p>
            <p className={`text-xl text-[var(--kraft-light)] ${mono}`}>
              {firstTryLabel}
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
          {email ? (
            <button
              type="button"
              onClick={() => {
                setPwOpen((v) => !v);
                setPwMessage(null);
              }}
              aria-expanded={pwOpen}
              aria-controls="profil-sifre-form"
              className={`${mono} border border-[var(--kraft)] bg-transparent px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-[var(--kraft-light)] transition-colors hover:border-[var(--kraft-light)]`}
            >
              Şifre Değiştir
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => {
              setDeleteConfirm("");
              setDeleteError(null);
              setDeleteOpen(true);
            }}
            className={`${mono} border border-[var(--bordeaux)] bg-transparent px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-[var(--bordeaux-bright)] transition-colors hover:bg-[var(--bordeaux)] hover:text-[var(--paper)]`}
          >
            Hesabı Sil
          </button>
        </div>

        {pwOpen ? (
          <form
            id="profil-sifre-form"
            onSubmit={(e) => void handlePasswordSubmit(e)}
            className="mt-6 flex flex-col gap-4"
          >
            <div>
              <label htmlFor="pw-current" className={labelMono}>
                Mevcut şifre
              </label>
              <input
                id="pw-current"
                name="current"
                type="password"
                autoComplete="current-password"
                required
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="pw-next" className={labelMono}>
                Yeni şifre
              </label>
              <input
                id="pw-next"
                name="next"
                type="password"
                autoComplete="new-password"
                minLength={6}
                required
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="pw-repeat" className={labelMono}>
                Yeni şifre (tekrar)
              </label>
              <input
                id="pw-repeat"
                name="repeat"
                type="password"
                autoComplete="new-password"
                minLength={6}
                required
                className={inputClass}
              />
            </div>
            {pwMessage ? (
              <p
                role={pwMessage.kind === "error" ? "alert" : "status"}
                className={`${mono} text-[10px] uppercase tracking-[0.18em] ${
                  pwMessage.kind === "error"
                    ? "text-[var(--bordeaux-bright)]"
                    : "text-[var(--kraft-light)]"
                }`}
              >
                {pwMessage.text}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={pwBusy}
              className={`${mono} border border-[var(--bordeaux-bright)] bg-[var(--bordeaux)] px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-[var(--paper)] hover:bg-[var(--bordeaux-bright)] disabled:opacity-50`}
            >
              {pwBusy ? "Güncelleniyor…" : "▸ Şifreyi Güncelle"}
            </button>
          </form>
        ) : null}
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
