"use client";

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
import { writeGuestUsername } from "@/lib/guest-session";
import { caseTabHref } from "@/lib/case-tab-routes";
import type { CaseCatalogItem } from "@/lib/case-types";
import { useAppOverlayLock } from "@/hooks/useAppOverlayLock";

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
  "[font-family:var(--font-newsreader),serif]";

export function DavalarCatalog({
  cases,
  solvedCaseIds = [],
  archivedRoomClosed = false,
  notInRoomNotice = false,
}: {
  cases: CaseCatalogItem[];
  solvedCaseIds?: string[];
  archivedRoomClosed?: boolean;
  notInRoomNotice?: boolean;
}) {
  const { loading: authLoading } = useAuth();
  const modalTitleId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const [guestModalOpen, setGuestModalOpen] = useState(false);
  const [guestNameDraft, setGuestNameDraft] = useState("");
  const [guestNameError, setGuestNameError] = useState(false);
  const [pendingGuestCaseId, setPendingGuestCaseId] = useState<string | null>(
    null,
  );
  const [choiceAfterGuestCaseId, setChoiceAfterGuestCaseId] = useState<
    string | null
  >(null);
  const [guestNamePlaceholder, setGuestNamePlaceholder] = useState<string>(
    GUEST_NAME_PLACEHOLDER_OPTIONS[0],
  );
  useAppOverlayLock(guestModalOpen);

  const closeGuestModal = useCallback(() => {
    setGuestModalOpen(false);
    setPendingGuestCaseId(null);
    setGuestNameError(false);
  }, []);

  const clearChoiceSignal = useCallback(() => {
    setChoiceAfterGuestCaseId(null);
  }, []);

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
    const cid = pendingGuestCaseId;
    setGuestNameDraft("");
    setGuestModalOpen(false);
    setGuestNameError(false);
    setPendingGuestCaseId(null);
    if (cid) {
      setChoiceAfterGuestCaseId(cid);
    }
  }

  return (
    <>
      {archivedRoomClosed ? (
        <p
          className={`${mono} mb-8 border border-[var(--bordeaux-bright)]/40 bg-[var(--anthracite)] px-4 py-3 text-[10px] uppercase tracking-[0.14em] text-[var(--bordeaux-bright)]`}
          role="status"
        >
          Bu oda kapatıldı veya arşivlendi. Yeni bir oda kurabilir veya başka bir
          koda katılabilirsin.
        </p>
      ) : null}
      {notInRoomNotice ? (
        <p
          className={`${mono} mb-8 border border-[var(--kraft-dark)] bg-[var(--anthracite)] px-4 py-3 text-[10px] uppercase tracking-[0.14em] text-[var(--kraft)]`}
          role="status"
        >
          Bu lobide kayıtlı değilsin veya oturumun eşleşmedi. Oda koduyla tekrar
          katılmayı dene.
        </p>
      ) : null}
      {cases.length === 0 ? (
        <p
          className={`${typewriter} mb-8 border border-dashed border-[var(--rule)] bg-[var(--anthracite-2)] px-6 py-8 text-center text-[16px] leading-relaxed text-[var(--subtitle-text)]`}
          role="status"
        >
          Şu an incelemeye açık dosya yok. Arşiv yeniden açıldığında yeni
          vakalar burada listelenecek.
        </p>
      ) : null}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-6">
        {cases.map((c) => {
          const active = c.active;
          const briefHref = active ? caseTabHref(c.id, "brief") : "";
          const solved = active && solvedCaseIds.includes(c.id);
          return (
            <CaseCard
              key={c.id}
              caseNumber={c.id}
              codename={c.codename}
              location={c.location}
              summary={c.shortSummary}
              recommendedPlayers={c.recommendedPlayers}
              difficulty={c.difficulty}
              tabCount={c.tabCount}
              docCount={c.docCount}
              suspectCount={c.suspectCount}
              status={active ? "DOSYA AÇIK" : "YAKINDA"}
              isSolved={solved}
              briefHref={active ? briefHref : undefined}
              onGuestGate={
                active
                  ? () => {
                      setPendingGuestCaseId(c.id);
                      setGuestModalOpen(true);
                    }
                  : undefined
              }
              choiceAfterGuestCaseId={choiceAfterGuestCaseId}
              onConsumeGuestChoiceOpen={clearChoiceSignal}
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
                className={`${typewriter} mt-auto text-[15px] leading-relaxed text-[var(--subtitle-text)]`}
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
        <div className="app-overlay" role="presentation">
          <button
            type="button"
            aria-label="Kapat"
            className="app-overlay-backdrop"
            onClick={closeGuestModal}
          />
          <form
            onSubmit={submitGuest}
            role="dialog"
            aria-modal="true"
            aria-labelledby={modalTitleId}
            className="app-overlay-panel app-overlay-panel--paper"
          >
            <div className="sheet-grab md:hidden" aria-hidden />
            <div className="app-overlay-scroll flex flex-col gap-5">
              <div className="space-y-3">
                <h2
                  id={modalTitleId}
                  className="m-0 text-2xl font-semibold italic text-[var(--ink)] [font-family:var(--font-cormorant),serif]"
                >
                  Analist <em className="text-[var(--bordeaux)]">takma adın</em>
                </h2>
                <p
                  className={`${typewriter} m-0 text-[16px] leading-relaxed text-[var(--subtitle-text)]`}
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
            </div>
            <div className="app-overlay-actions app-overlay-actions--paper">
              <button
                type="button"
                onClick={closeGuestModal}
                className="confirm-btn confirm-btn-cancel"
              >
                İptal
              </button>
              <button
                type="submit"
                className="confirm-btn confirm-btn-primary"
              >
                ▸ Vakaya gir
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
}
