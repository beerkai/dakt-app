"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useState } from "react";

import { createRoom } from "@/app/oda/actions";
import { useAuth } from "@/components/AuthProvider";
import { DAKT_LOCAL_SOLVED_KEY } from "@/lib/local-solved-storage";
import { readGuestUsernameTrimmed } from "@/lib/guest-session";

export type CaseStatus = "DOSYA AÇIK" | "YAKINDA";

export type CaseCardProps = {
  caseNumber: string;
  codename: string;
  location: string;
  summary: string;
  recommendedPlayers: string;
  difficulty: string;
  /** Sekme / belge / şüpheli özeti (Davalar grid) */
  tabCount: number;
  docCount: number;
  suspectCount: number;
  /** Solo brief rotası; sadece aktif kartlarda */
  briefHref?: string;
  /** Kayıtsız misafir: takma ad modalına yönlendir (parent) */
  onGuestGate?: () => void;
  /** Misafir takma adı kaydettikten sonra seçim modalını aç */
  choiceAfterGuestCaseId?: string | null;
  onConsumeGuestChoiceOpen?: () => void;
  /** Oturum yüklenirken buton kilitlenir (ör. useAuth loading). */
  ctaBusy?: boolean;
  /** Kayıtlı kullanıcı: sunucudan gelen çözüm durumu */
  isSolved?: boolean;
  status: CaseStatus;
};

const mono =
  "[font-family:var(--font-jetbrains-mono),ui-monospace,monospace]";
const typewriter =
  "[font-family:var(--font-special-elite),monospace]";

export function CaseCard({
  caseNumber,
  codename,
  location,
  summary,
  recommendedPlayers,
  difficulty,
  tabCount,
  docCount,
  suspectCount,
  briefHref,
  onGuestGate,
  choiceAfterGuestCaseId,
  onConsumeGuestChoiceOpen,
  ctaBusy,
  isSolved,
  status,
}: CaseCardProps) {
  const router = useRouter();
  const { user } = useAuth();
  const choiceTitleId = useId();
  const [localSolvedIds, setLocalSolvedIds] = useState<string[]>([]);
  const [choiceModalOpen, setChoiceModalOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  useEffect(() => {
    function readLocal() {
      if (typeof window === "undefined") return;
      if (user) {
        setLocalSolvedIds([]);
        return;
      }
      try {
        const raw = localStorage.getItem(DAKT_LOCAL_SOLVED_KEY);
        if (!raw) {
          setLocalSolvedIds([]);
          return;
        }
        const parsed = JSON.parse(raw) as unknown;
        if (!Array.isArray(parsed)) {
          setLocalSolvedIds([]);
          return;
        }
        const ids = parsed
          .map((x) =>
            x && typeof x === "object" && typeof (x as { case_id?: string }).case_id === "string"
              ? (x as { case_id: string }).case_id
              : null,
          )
          .filter((x): x is string => x != null);
        setLocalSolvedIds(ids);
      } catch {
        setLocalSolvedIds([]);
      }
    }

    readLocal();

    function onLocal() {
      readLocal();
    }
    function onStorage(e: StorageEvent) {
      if (e.key === DAKT_LOCAL_SOLVED_KEY || e.key === null) readLocal();
    }

    window.addEventListener("dakt_local_solved_changed", onLocal);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("dakt_local_solved_changed", onLocal);
      window.removeEventListener("storage", onStorage);
    };
  }, [user]);

  useEffect(() => {
    if (!choiceAfterGuestCaseId || choiceAfterGuestCaseId !== caseNumber) {
      return;
    }
    setChoiceModalOpen(true);
    onConsumeGuestChoiceOpen?.();
  }, [choiceAfterGuestCaseId, caseNumber, onConsumeGuestChoiceOpen]);

  const active = status === "DOSYA AÇIK";
  const busy = Boolean(ctaBusy);
  const serverSolved = Boolean(isSolved);
  const guestSolved = !user && localSolvedIds.includes(caseNumber);
  const solved = active && (serverSolved || guestSolved);

  function handleCaseClick() {
    if (!active || !briefHref) return;
    if (busy) return;
    const guestNameLive = readGuestUsernameTrimmed();
    if (!user && !guestNameLive) {
      onGuestGate?.();
      return;
    }
    setCreateError(null);
    setChoiceModalOpen(true);
  }

  function closeChoiceModal() {
    setChoiceModalOpen(false);
    setCreateError(null);
  }

  async function handleCreateRoom() {
    if (!user) return;
    setCreating(true);
    setCreateError(null);
    const result = await createRoom(caseNumber);
    if (result?.error) {
      setCreateError(result.error);
      setCreating(false);
      return;
    }
    if (result?.success && result.code) {
      router.push(`/oda/${result.code}`);
      return;
    }
    setCreating(false);
  }

  function handleSolo() {
    if (!briefHref) return;
    closeChoiceModal();
    router.push(briefHref);
  }

  return (
    <article
      className={`group relative flex flex-col overflow-hidden border border-[var(--kraft-dark)] bg-[var(--anthracite)] shadow-[var(--shadow)]${solved ? " case-card--solved" : ""}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-100"
        style={{
          background: active
            ? "radial-gradient(ellipse 90% 70% at 15% 0%, rgba(201, 180, 138, 0.14), transparent 55%), radial-gradient(ellipse 60% 50% at 100% 100%, rgba(107, 22, 32, 0.12), transparent 50%)"
            : "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(106, 102, 91, 0.15), transparent 55%)",
        }}
        aria-hidden
      />

      <div className="relative flex flex-1 flex-col p-6 md:p-8">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
          <p
            className={`${mono} text-[10px] uppercase tracking-[0.35em] text-[var(--kraft)]`}
          >
            Dosya №{caseNumber}
          </p>
          <p
            className={`${mono} flex flex-wrap items-center justify-end gap-2 text-[9px] uppercase tracking-[0.28em] ${
              active
                ? solved
                  ? "text-[var(--solved)]"
                  : "text-[var(--kraft)]"
                : "text-[var(--meta-label)]"
            }`}
          >
            {active ? (
              solved ? (
                <span className="case-solved-badge">✓ ÇÖZÜLDÜ</span>
              ) : (
                <>
                  <span aria-hidden>●</span>
                  DOSYA AÇIK
                </>
              )
            ) : (
              <>
                <span aria-hidden>○</span>
                {status}
              </>
            )}
          </p>
        </div>

        <h2
          className="mb-3 text-[clamp(2.5rem,6vw,4rem)] font-semibold italic leading-[0.98] text-[var(--paper)] [font-family:var(--font-cormorant),serif]"
        >
          {codename}
        </h2>

        <p
          className={`${typewriter} mb-4 text-[12px] uppercase tracking-[0.14em] text-[var(--subtitle-text)]`}
        >
          {location}
        </p>

        <p
          className={`${typewriter} mb-8 flex-1 text-[13px] leading-[1.75] tracking-[0.05em] text-[var(--body-text)]`}
        >
          {summary}
        </p>

        <p
          className={`${mono} mb-6 text-[9px] uppercase tracking-[0.22em] text-[var(--meta-label)]`}
        >
          Önerilen: {recommendedPlayers} analist · Zorluk: {difficulty}
        </p>

        <div
          className={`${mono} mb-4 border-t border-[var(--rule)] py-2 text-[10px] uppercase tracking-[0.22em] text-[var(--kraft-dark)]`}
        >
          {tabCount} SEKME · {docCount} BELGE · {suspectCount} ŞÜPHELİ
        </div>

        {active && briefHref ? (
          <button
            type="button"
            onClick={handleCaseClick}
            disabled={busy}
            aria-busy={busy}
            className={`${mono} inline-flex w-full items-center justify-center border border-[var(--bordeaux-bright)] bg-[var(--bordeaux)] py-4 text-[10px] font-medium uppercase tracking-[0.26em] text-[var(--kraft-light)] transition-colors hover:bg-[var(--bordeaux-bright)] md:w-auto md:self-start md:px-10 ${busy ? "cursor-wait opacity-75" : "cursor-pointer"}`}
          >
            {busy ? "Yükleniyor..." : "Dosyayı aç →"}
          </button>
        ) : (
          <div
            className={`${mono} flex w-full items-center justify-center border border-dashed border-[var(--rule)] py-4 text-[9px] uppercase tracking-[0.2em] text-[var(--meta-label)] md:w-auto md:self-start md:px-10`}
          >
            Kilitli
          </div>
        )}
      </div>

      {choiceModalOpen ? (
        <div
          className="fixed inset-0 z-[240] flex min-h-0 flex-col md:items-center md:justify-center md:p-6"
          role="presentation"
        >
          <button
            type="button"
            aria-label="Kapat"
            className="absolute inset-0 z-0 bg-[var(--ink)]/90"
            onClick={closeChoiceModal}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={choiceTitleId}
            className="relative z-[2] flex max-h-[min(92vh,920px)] min-h-full w-full max-w-[480px] flex-col overflow-hidden border border-[var(--kraft-dark)] bg-[var(--anthracite)] shadow-[var(--shadow)] md:min-h-0 md:rounded-sm pointer-events-auto"
            style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 3px,
                rgba(255,255,255,0.02) 3px,
                rgba(255,255,255,0.02) 4px
              )`,
            }}
          >
            <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-6 md:p-8">
              <div className="space-y-3 text-center md:text-left">
                <p
                  className="text-[clamp(1.35rem,4vw,1.75rem)] font-semibold italic leading-tight tracking-[0.06em] text-[var(--kraft)] [font-family:var(--font-cormorant),serif]"
                >
                  {codename}
                </p>
                <h2
                  id={choiceTitleId}
                  className="text-lg font-semibold italic leading-snug text-[var(--paper)] [font-family:var(--font-cormorant),serif] md:text-[18px]"
                >
                  Bu vakayı nasıl açmak istersin?
                </h2>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  type="button"
                  onClick={handleSolo}
                  className="group flex w-full flex-col items-start gap-1 border border-[var(--kraft-dark)] bg-[var(--anthracite-2)]/50 px-5 py-4 text-left transition-[border-color,box-shadow] hover:border-[var(--bordeaux-bright)] hover:shadow-[0_0_24px_rgba(107,22,32,0.25)]"
                >
                  <span className={`${mono} text-[13px] uppercase tracking-[0.14em] text-[var(--kraft)]`}>
                    <span aria-hidden className="mr-2 inline-block">
                      ◉
                    </span>
                    Tek başına oyna
                  </span>
                  <span
                    className={`${typewriter} text-[12px] leading-relaxed tracking-[0.06em] text-[var(--kraft-dark)]`}
                  >
                    Solo analist olarak çöz
                  </span>
                </button>

                {user ? (
                  <button
                    type="button"
                    disabled={creating}
                    onClick={() => void handleCreateRoom()}
                    className="group flex w-full flex-col items-start gap-2 border border-[var(--kraft-dark)] bg-[var(--anthracite-2)]/50 px-5 py-4 text-left transition-[border-color,box-shadow] hover:border-[var(--bordeaux-bright)] hover:shadow-[0_0_24px_rgba(107,22,32,0.25)] disabled:cursor-wait disabled:opacity-60"
                  >
                    <span className={`${mono} text-[13px] uppercase tracking-[0.14em] text-[var(--kraft)]`}>
                      <span aria-hidden className="mr-2 inline-block">
                        ⊕
                      </span>
                      {creating ? "Oda hazırlanıyor..." : "Oda kur"}
                    </span>
                    <span
                      className={`${typewriter} text-[12px] leading-relaxed tracking-[0.06em] text-[var(--kraft-dark)]`}
                    >
                      5 kişiye kadar ekiple oyna
                    </span>
                    <span
                      className={`${mono} border border-[var(--bordeaux)]/40 bg-[var(--bordeaux)]/15 px-2 py-1 text-[9px] uppercase tracking-[0.2em] text-[var(--bordeaux-bright)]`}
                    >
                      ★ Host sen olursun
                    </span>
                  </button>
                ) : (
                  <>
                    <div
                      className="pointer-events-none flex w-full flex-col items-start gap-2 border border-dashed border-[var(--rule)] bg-[var(--ink)]/20 px-5 py-4 text-left opacity-75"
                      aria-disabled="true"
                    >
                      <span
                        className={`${mono} text-[13px] uppercase tracking-[0.14em] text-[var(--meta-label)]`}
                      >
                        <span aria-hidden className="mr-2 inline-block">
                          ⊕
                        </span>
                        Oda kur
                      </span>
                      <span
                        className={`${typewriter} text-[12px] text-[var(--meta-label)]`}
                      >
                        5 kişiye kadar ekiple oyna
                      </span>
                    </div>
                    <div className="case-modal-guest-warning">
                      <p
                        className={`${typewriter} text-[12px] leading-relaxed tracking-[0.05em] text-[var(--body-text)]`}
                      >
                        Co-op için <strong className="text-[var(--paper)]">hesap gerekli</strong>.
                        Arkadaşlarınla birlikte çözmek istersen:
                      </p>
                      <div className="case-modal-cta-row">
                        <Link href="/giris?tab=kayit" onClick={closeChoiceModal}>
                          Kayıt ol
                        </Link>
                        <Link href="/giris?tab=giris" onClick={closeChoiceModal}>
                          Giriş yap
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {createError ? (
                <p
                  className={`${mono} text-[10px] uppercase tracking-[0.12em] text-[var(--bordeaux-bright)]`}
                >
                  {createError}
                </p>
              ) : null}

              <div className="border-t border-[var(--rule)] pt-6">
                <p
                  className={`${typewriter} mb-4 text-center text-[12px] tracking-[0.05em] text-[var(--subtitle-text)] md:text-left`}
                >
                  Bir odaya katılmak istersen:
                </p>
                <div className="flex justify-center md:justify-start">
                  <Link
                    href="/oda/katil"
                    onClick={closeChoiceModal}
                    className={`${mono} inline-flex border border-[var(--kraft)] px-5 py-3 text-[11px] uppercase tracking-[0.2em] text-[var(--kraft-light)] transition-colors hover:border-[var(--bordeaux-bright)] hover:bg-[var(--bordeaux)]/15`}
                  >
                    ▸ Kod ile katıl
                  </Link>
                </div>
              </div>

              <button
                type="button"
                onClick={closeChoiceModal}
                className={`${mono} inline-flex min-h-[44px] items-center justify-center border border-[var(--kraft-dark)] bg-transparent px-6 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--kraft)] transition-colors hover:border-[var(--kraft)] hover:text-[var(--kraft-light)]`}
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </article>
  );
}
