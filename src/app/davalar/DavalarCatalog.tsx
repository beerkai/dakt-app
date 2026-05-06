"use client";

import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";

import { useAuth } from "@/components/AuthProvider";
import { CaseCard } from "@/components/CaseCard";
import { countDocuments } from "@/lib/case-helpers";
import { readGuestUsernameTrimmed, writeGuestUsername } from "@/lib/guest-session";
import { caseTabHref } from "@/lib/case-tab-routes";
import type { CaseData } from "@/lib/case-types";

const PLACEHOLDER_CARDS = [
  { n: "070", label: "○ Yakında — Dosya №070" },
  { n: "071", label: "○ Yakında — Dosya №071" },
] as const;

/** Modal her açılışında rastgele biri input placeholder olarak seçilir. */
const GUEST_NAME_PLACEHOLDER_OPTIONS = [
  "Örn. Gece Nöbetçisi",
  "Örn. Arşiv-7",
  "Örn. Kara Kalem",
  "Örn. İz Süren",
  "Örn. Sessiz Tanık",
  "Örn. DKT-042",
  "Örn. Büro Misafiri",
  "Örn. Duman Hattı",
] as const;

const mono =
  "[font-family:var(--font-jetbrains-mono),ui-monospace,monospace]";
const typewriter =
  "[font-family:var(--font-special-elite),monospace]";

export function DavalarCatalog({ cases }: { cases: CaseData[] }) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const modalTitleId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const [guestModalOpen, setGuestModalOpen] = useState(false);
  const [guestNameDraft, setGuestNameDraft] = useState("");
  const [guestNameError, setGuestNameError] = useState(false);
  const [pendingBriefHref, setPendingBriefHref] = useState<string | null>(
    null,
  );
  const [guestNamePlaceholder, setGuestNamePlaceholder] = useState<string>(
    GUEST_NAME_PLACEHOLDER_OPTIONS[0],
  );

  const closeGuestModal = useCallback(() => {
    setGuestModalOpen(false);
    setPendingBriefHref(null);
    setGuestNameError(false);
  }, []);

  const requestOpenBrief = useCallback(
    (briefHref: string) => {
      if (readGuestUsernameTrimmed()) {
        router.push(briefHref);
        return;
      }
      if (!authLoading && user) {
        router.push(briefHref);
        return;
      }
      if (authLoading) {
        setPendingBriefHref(briefHref);
        return;
      }
      setPendingBriefHref(briefHref);
      setGuestModalOpen(true);
    },
    [router, authLoading, user],
  );

  useEffect(() => {
    if (authLoading || !pendingBriefHref) return;
    if (readGuestUsernameTrimmed()) {
      router.push(pendingBriefHref);
      setPendingBriefHref(null);
      return;
    }
    if (user) {
      router.push(pendingBriefHref);
      setPendingBriefHref(null);
      return;
    }
    setGuestModalOpen(true);
  }, [authLoading, user, pendingBriefHref, router]);

  useEffect(() => {
    if (!guestModalOpen) return;
    const list = GUEST_NAME_PLACEHOLDER_OPTIONS;
    const pick =
      list[Math.floor(Math.random() * list.length)] ?? GUEST_NAME_PLACEHOLDER_OPTIONS[0];
    setGuestNamePlaceholder(pick);
    const id = window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeGuestModal();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.cancelAnimationFrame(id);
      window.removeEventListener("keydown", onKey);
    };
  }, [guestModalOpen, closeGuestModal]);

  function submitGuest(e: FormEvent) {
    e.preventDefault();
    const trimmed = guestNameDraft.trim();
    if (!trimmed) {
      setGuestNameError(true);
      return;
    }
    writeGuestUsername(trimmed);
    const dest = pendingBriefHref;
    closeGuestModal();
    setGuestNameDraft("");
    if (dest) router.push(dest);
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-6">
        {cases.map((c) => {
          const active = c.status === "active";
          const briefHref = active ? caseTabHref(c.id, "brief") : "";
          return (
            <CaseCard
              key={c.id}
              caseNumber={c.id}
              codename={c.codename}
              location={c.location}
              summary={c.shortSummary}
              recommendedPlayers={c.recommendedPlayers}
              difficulty={c.difficulty}
              tabCount={c.enabledTabs.length}
              docCount={countDocuments(c)}
              suspectCount={c.suspects.length}
              status={active ? "DOSYA AÇIK" : "YAKINDA"}
              href={active ? briefHref : undefined}
              onCtaClick={
                active ? () => requestOpenBrief(briefHref) : undefined
              }
              ctaBusy={active ? authLoading : false}
            />
          );
        })}

        {PLACEHOLDER_CARDS.map((p) => (
          <aside
            key={p.n}
            className="relative flex flex-col overflow-hidden border border-[var(--rule)] bg-[var(--anthracite-2)] opacity-[0.92]"
            aria-label="Yakında açılacak dosya"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background:
                  "repeating-linear-gradient(-45deg, transparent, transparent 8px, rgba(255,255,255,0.03) 8px, rgba(255,255,255,0.03) 9px)",
              }}
              aria-hidden
            />
            <div className="relative flex flex-1 flex-col p-6 md:p-8">
              <p
                className={`${mono} mb-6 text-[10px] uppercase tracking-[0.32em] text-[var(--meta-label)]`}
              >
                {p.label}
              </p>
              <div className="mb-4 text-3xl font-semibold italic text-[var(--meta-label)] [font-family:var(--font-cormorant),serif] md:text-4xl">
                —
              </div>
              <p
                className={`${typewriter} mt-auto text-[12px] leading-relaxed tracking-[0.06em] text-[var(--subtitle-text)]`}
              >
                Yakında açılacak
              </p>
              <div
                className={`${mono} mt-8 flex items-center justify-center border border-dashed border-[var(--rule)] py-4 text-[9px] uppercase tracking-[0.2em] text-[var(--meta-label)]`}
              >
                Kilitli
              </div>
            </div>
          </aside>
        ))}
      </div>

      {guestModalOpen ? (
        <div
          className="fixed inset-0 z-[240] flex min-h-0 flex-col md:items-center md:justify-center md:p-6"
          role="presentation"
        >
          <button
            type="button"
            aria-label="Kapat"
            className="absolute inset-0 bg-[var(--ink)]/85"
            onClick={closeGuestModal}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={modalTitleId}
            className="relative z-[1] flex min-h-full w-full flex-col border-[var(--kraft-dark)] bg-[var(--paper)] text-[var(--ink)] shadow-[var(--shadow)] md:min-h-0 md:max-w-[480px] md:rounded-sm md:border-2"
          >
            <form
              onSubmit={submitGuest}
              className="flex flex-1 flex-col gap-6 p-6 md:p-8"
            >
              <div className="space-y-3">
                <h2
                  id={modalTitleId}
                  className="text-2xl font-semibold italic text-[var(--ink)] [font-family:var(--font-cormorant),serif]"
                >
                  Analist <em className="text-[var(--bordeaux)]">takma adın</em>
                </h2>
                <p
                  className={`${typewriter} text-[13px] leading-relaxed tracking-[0.05em] text-[var(--subtitle-text)]`}
                >
                  Dosyaya girmeden önce D.A.K.T. için kullanacağın kısa bir takma
                  ad seç. Bu ad üst menüde görünür; sertifika ve kayıtların
                  kimliği için kullanılır.
                </p>
              </div>

              <div>
                <label
                  htmlFor="dakt-guest-name"
                  className={`${mono} mb-2 block text-[9px] uppercase tracking-[0.22em] text-[var(--meta-label)]`}
                >
                  Takma ad
                </label>
                <input
                  ref={inputRef}
                  id="dakt-guest-name"
                  name="guestName"
                  autoComplete="nickname"
                  maxLength={48}
                  value={guestNameDraft}
                  onChange={(e) => {
                    setGuestNameDraft(e.target.value);
                    if (guestNameError) setGuestNameError(false);
                  }}
                  className={`box-border w-full border-2 bg-[var(--ink)]/[0.06] px-3 py-3 text-[14px] text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--meta-label)] focus:border-[var(--kraft)] ${guestNameError ? "border-[var(--bordeaux-bright)]" : "border-[var(--rule)]"}`}
                  placeholder={guestNamePlaceholder}
                />
                {guestNameError ? (
                  <p
                    className={`${mono} mt-2 text-[10px] uppercase tracking-[0.12em] text-[var(--bordeaux-bright)]`}
                  >
                    Takma ad gerekli.
                  </p>
                ) : null}
              </div>

              <div className="mt-auto flex flex-col gap-3 sm:flex-row-reverse sm:justify-end">
                <button
                  type="submit"
                  className={`${mono} inline-flex min-h-[48px] flex-1 items-center justify-center border-2 border-[var(--bordeaux-bright)] bg-[var(--bordeaux)] px-6 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--kraft-light)] transition-colors hover:bg-[var(--bordeaux-bright)] sm:flex-none`}
                >
                  ▸ Vakaya gir
                </button>
                <button
                  type="button"
                  onClick={closeGuestModal}
                  className={`${mono} inline-flex min-h-[48px] flex-1 items-center justify-center border border-[var(--ink)]/28 bg-[var(--ink)]/[0.07] px-6 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--ink)]/85 transition-colors hover:border-[var(--ink)]/40 hover:bg-[var(--ink)]/12 hover:text-[var(--ink)] sm:flex-none`}
                >
                  İptal
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
