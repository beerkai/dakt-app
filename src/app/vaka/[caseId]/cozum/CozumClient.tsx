"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Suspect } from "@/lib/case-types";
import {
  accuracyPercentForAttempts,
  formatDurationMs,
  incrementAttemptCount,
  readAttemptCount,
  readCaseStartTimestamp,
} from "@/lib/case-playthrough-storage";
import { clearActiveSession, getActiveSession } from "@/lib/active-session";
import { readGuestUsernameTrimmed } from "@/lib/guest-session";
import {
  upsertLocalSolvedRecord,
} from "@/lib/local-solved-storage";
import { useAuth } from "@/components/AuthProvider";
import { useCaseRoomId } from "@/hooks/useCaseRoomId";
import { useRoomActivePlayers } from "@/hooks/useRoomActivePlayers";
import { getCoopSettings, type CoopSettings } from "@/lib/get-coop-settings";
import { CoopVotingOverlay } from "./CoopVotingOverlay";
import { caseTabHref } from "@/lib/case-tab-routes";
import {
  clearCoopVoteFinished,
  markCoopVoteFinished,
} from "@/lib/active-session";
import {
  completeCoopRoom,
  recordSolvedCase,
  resetRoomVotes,
  revealVerdict,
  type RevealVerdictResult,
} from "./actions";
import {
  MARKED_SUSPECTS_CHANGED_EVENT,
  markedSuspectsStorageKey,
  readMarkedSuspects,
} from "@/lib/marked-suspects-storage";
import {
  LOCKED_SUSPECTS_CHANGED_EVENT,
  lockSuspectLocal,
  readLockedSuspects,
} from "@/lib/locked-suspects-storage";
import { createClient } from "@/lib/supabase/client";
import {
  isSoloTimelineSettled,
  TIMELINE_CHANGED_EVENT,
} from "@/lib/timeline-storage";
import { safeHtml } from "@/lib/html-sanitize";

type ViewState = "voting" | "envelope" | "result" | "lesson";

function cozumSessionKey(caseId: string) {
  return `dakt_v${caseId}_cozum_session`;
}

const MIN_FLIP_H = 260;

type VoteSuspect = {
  suspectId: string;
  idLine: string;
  name: string;
  role: string;
  quote: string;
};

function VerdictDocumentHtml({ solutionHtml }: { solutionHtml: string }) {
  return (
    <article
      className="verdict"
      style={{ marginTop: 24 }}
      dangerouslySetInnerHTML={{ __html: solutionHtml }}
    />
  );
}

export function CozumClient({
  caseId,
  suspects,
  requiresTimeline = false,
}: {
  caseId: string;
  suspects: Suspect[];
  /** Saat sekmesi varsa fail seçiminden önce kronoloji kilitlenmeli. */
  requiresTimeline?: boolean;
}) {
  const router = useRouter();
  const { user } = useAuth();
  const hasRecordedSolved = useRef(false);
  const voteSubmitLockRef = useRef(false);
  const flipHandledRef = useRef(false);
  const [timelineSettled, setTimelineSettled] = useState(false);
  const [timelineReady, setTimelineReady] = useState(false);
  const baseVoteSuspects: VoteSuspect[] = useMemo(
    () =>
      suspects.map((s) => ({
        suspectId: s.id,
        idLine: s.code,
        name: s.name,
        role: s.role,
        quote: s.quote,
      })),
    [suspects],
  );

  const [markedSuspectIds, setMarkedSuspectIds] = useState<string[]>([]);
  const [lockedSuspectIds, setLockedSuspectIds] = useState<string[]>([]);

  useEffect(() => {
    function syncMarked() {
      setMarkedSuspectIds(readMarkedSuspects(caseId));
    }
    syncMarked();
    window.addEventListener(MARKED_SUSPECTS_CHANGED_EVENT, syncMarked);
    function onStorage(e: StorageEvent) {
      if (e.key === markedSuspectsStorageKey(caseId) || e.key === null) {
        syncMarked();
      }
    }
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(MARKED_SUSPECTS_CHANGED_EVENT, syncMarked);
      window.removeEventListener("storage", onStorage);
    };
  }, [caseId]);

  // ═══ CO-OP STATE ═══
  const roomId = useCaseRoomId(caseId);

  useEffect(() => {
    let cancelled = false;

    async function syncLocked() {
      if (roomId) {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("room_elim_suspects")
          .select("suspect_id")
          .eq("room_id", roomId);
        if (cancelled) return;
        if (error) {
          console.warn("[Cozum] locked suspects:", error.message);
          setLockedSuspectIds(readLockedSuspects(caseId));
          return;
        }
        setLockedSuspectIds(
          (data ?? []).map((r) => String(r.suspect_id)).filter(Boolean),
        );
        return;
      }
      setLockedSuspectIds(readLockedSuspects(caseId));
    }

    void syncLocked();

    function onLocal() {
      if (!roomId) setLockedSuspectIds(readLockedSuspects(caseId));
    }
    window.addEventListener(LOCKED_SUSPECTS_CHANGED_EVENT, onLocal);
    window.addEventListener("storage", onLocal);

    const supabase = createClient();
    const channel = roomId
      ? supabase
          .channel(`room-elim:${roomId}`)
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "room_elim_suspects",
              filter: `room_id=eq.${roomId}`,
            },
            () => {
              void syncLocked();
            },
          )
          .subscribe()
      : null;

    return () => {
      cancelled = true;
      window.removeEventListener(LOCKED_SUSPECTS_CHANGED_EVENT, onLocal);
      window.removeEventListener("storage", onLocal);
      if (channel) void supabase.removeChannel(channel);
    };
  }, [caseId, roomId]);

  const voteSuspects: VoteSuspect[] = useMemo(() => {
    const locked = new Set(lockedSuspectIds);
    const open = baseVoteSuspects.filter((v) => !locked.has(v.suspectId));
    const marked = new Set(markedSuspectIds);
    const order = new Map(open.map((v, i) => [v.suspectId, i] as const));
    return [...open].sort((a, b) => {
      const aM = marked.has(a.suspectId) ? 0 : 1;
      const bM = marked.has(b.suspectId) ? 0 : 1;
      if (aM !== bM) return aM - bM;
      return (order.get(a.suspectId) ?? 0) - (order.get(b.suspectId) ?? 0);
    });
  }, [baseVoteSuspects, markedSuspectIds, lockedSuspectIds]);

  const markedSet = useMemo(
    () => new Set(markedSuspectIds),
    [markedSuspectIds],
  );

  type Verdict = Exclude<RevealVerdictResult, { error: string }>;
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [revealError, setRevealError] = useState<string | null>(null);
  const revealPromiseRef = useRef<Promise<Verdict | null> | null>(null);

  const startReveal = useCallback(
    (suspectId: string) => {
      setRevealError(null);
      revealPromiseRef.current = revealVerdict(caseId, suspectId, roomId)
        .then((r) => {
          if ("error" in r) {
            setRevealError(r.error);
            return null;
          }
          setVerdict(r);
          return r;
        })
        .catch(() => {
          setRevealError("Sonuç alınamadı, bağlantını kontrol et.");
          return null;
        });
    },
    [caseId, roomId],
  );

  const [view, setView] = useState<ViewState>("voting");
  const [selectedSuspect, setSelectedSuspect] = useState<string | null>(null);
  const [voteConfirmed, setVoteConfirmed] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [showVerdictDoc, setShowVerdictDoc] = useState(false);

  type SuccessMeta = { durationMs: number; attempts: number; accuracy: number };
  const [successMeta, setSuccessMeta] = useState<SuccessMeta | null>(null);
  const [solvedRecorded, setSolvedRecorded] = useState(false);
  const [coopVoteComplete, setCoopVoteComplete] = useState(false);
  const [hostBypassEnabled, setHostBypassEnabled] = useState(false);
  const [coopIsHost, setCoopIsHost] = useState(false);

  useEffect(() => {
    setSuccessMeta(null);
    hasRecordedSolved.current = false;
    setCoopVoteComplete(false);
    voteSubmitLockRef.current = false;
    flipHandledRef.current = false;
  }, [caseId]);

  useEffect(() => {
    if (view !== "result" || !isCorrect || !successMeta) return;
    if (hasRecordedSolved.current) return;

    const durationSeconds = Math.floor(successMeta.durationMs / 1000);

    if (user) {
      void (async () => {
        const result = await recordSolvedCase({
          caseId,
          suspectId: selectedSuspect ?? "",
          attemptCount: successMeta.attempts,
          durationSeconds,
        });
        if (result.success) {
          hasRecordedSolved.current = true;
          setSolvedRecorded(true);
          router.refresh();
        } else {
          console.error("Vaka kaydı hatası:", result.error);
        }
      })();
      return;
    }

    if (readGuestUsernameTrimmed()) {
      hasRecordedSolved.current = true;
      upsertLocalSolvedRecord({
        case_id: caseId,
        accuracy: successMeta.accuracy,
        attempt_count: successMeta.attempts,
        duration_seconds: durationSeconds,
        solved_at: new Date().toISOString(),
      });
    }
  }, [view, isCorrect, user, successMeta, caseId, selectedSuspect, router]);

  useEffect(() => {
    if (view !== "result" || !isCorrect) return;

    clearActiveSession();
    window.dispatchEvent(new Event("dakt-session-change"));
  }, [view, isCorrect]);

  const isCoop = Boolean(roomId);

  useEffect(() => {
    if (!requiresTimeline) return;

    let cancelled = false;

    async function syncTimelineGate() {
      if (roomId) {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("room_timeline")
          .select("settled")
          .eq("room_id", roomId)
          .maybeSingle();
        if (cancelled) return;
        if (error) console.warn("[Cozum] timeline gate:", error.message);
        setTimelineSettled(data?.settled === true);
        setTimelineReady(true);
        return;
      }
      setTimelineSettled(isSoloTimelineSettled(caseId));
      setTimelineReady(true);
    }

    void syncTimelineGate();

    function onSoloChange() {
      if (!roomId) setTimelineSettled(isSoloTimelineSettled(caseId));
    }
    window.addEventListener(TIMELINE_CHANGED_EVENT, onSoloChange);
    window.addEventListener("storage", onSoloChange);

    const supabase = createClient();
    const channel = roomId
      ? supabase
          .channel(`cozum-timeline-gate:${roomId}`)
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "room_timeline",
              filter: `room_id=eq.${roomId}`,
            },
            (payload) => {
              const row = payload.new as { settled?: boolean } | null;
              if (row && typeof row.settled === "boolean") {
                setTimelineSettled(row.settled);
              }
            },
          )
          .subscribe()
      : null;

    return () => {
      cancelled = true;
      window.removeEventListener(TIMELINE_CHANGED_EVENT, onSoloChange);
      window.removeEventListener("storage", onSoloChange);
      if (channel) void supabase.removeChannel(channel);
    };
  }, [requiresTimeline, roomId, caseId]);

  const {
    count: activePlayerCount,
    userIds: activeUserIds,
    loading: playersLoading,
  } = useRoomActivePlayers(isCoop ? roomId : null);

  // ═══ CO-OP: host bypass ayarını oku ═══
  useEffect(() => {
    if (!isCoop) return;
    void getCoopSettings().then((s: CoopSettings) =>
      setHostBypassEnabled(s.hostBypassEnabled),
    );
  }, [isCoop]);

  // ═══ CO-OP: host durumunu sync et ═══
  useEffect(() => {
    function syncHost() {
      setCoopIsHost(Boolean(getActiveSession()?.isHost));
    }
    syncHost();
    window.addEventListener("dakt-session-change", syncHost);
    return () =>
      window.removeEventListener("dakt-session-change", syncHost);
  }, []);

  const frontSizerRef = useRef<HTMLDivElement>(null);
  const flipInnerRef = useRef<HTMLDivElement>(null);
  const [flipMinH, setFlipMinH] = useState(MIN_FLIP_H);

  useEffect(() => {
    try {
      localStorage.removeItem(cozumSessionKey(caseId));
    } catch {
      /* ignore */
    }
  }, [caseId]);

  const measureFlip = useCallback(() => {
    const h = frontSizerRef.current?.offsetHeight ?? 0;
    setFlipMinH(Math.max(h || MIN_FLIP_H, MIN_FLIP_H));
  }, []);

  useLayoutEffect(() => {
    if (view !== "envelope") return;
    measureFlip();
    const ro = new ResizeObserver(() => measureFlip());
    const el = frontSizerRef.current;
    if (el) ro.observe(el);
    window.addEventListener("resize", measureFlip);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measureFlip);
    };
  }, [view, measureFlip]);

  const selectedName =
    voteSuspects.find((s) => s.suspectId === selectedSuspect)?.name ?? "—";

  function handleConfirmVote() {
    if (!selectedSuspect || voteSubmitLockRef.current) return;
    voteSubmitLockRef.current = true;
    incrementAttemptCount(caseId);
    startReveal(selectedSuspect);
    setVoteConfirmed(true);
    window.setTimeout(() => {
      setVoteConfirmed(false);
      flipHandledRef.current = false;
      setView("envelope");
      setEnvelopeOpen(false);
    }, 800);
  }

  function handleOpenEnvelope() {
    measureFlip();
    setEnvelopeOpen(true);
  }

  function handleFlipTransitionEnd(e: React.TransitionEvent<HTMLDivElement>) {
    if (e.propertyName !== "transform") return;
    if (e.target !== flipInnerRef.current) return;
    if (!envelopeOpen || view !== "envelope") return;
    if (flipHandledRef.current) return;
    flipHandledRef.current = true;
    void finishReveal();
  }

  async function finishReveal() {
    const result = await revealPromiseRef.current;
    if (!result) {
      flipHandledRef.current = false;
      voteSubmitLockRef.current = false;
      setEnvelopeOpen(false);
      setCoopVoteComplete(false);
      setView("voting");
      return;
    }
    const ok = result.correct;
    setIsCorrect(ok);
    if (!ok && typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
      try {
        navigator.vibrate(40);
      } catch {
        /* bazı tarayıcılar titreşimi reddeder */
      }
    }
    if (isCoop && roomId && selectedSuspect) {
      if (!ok) clearCoopVoteFinished(roomId);
      void (ok
        ? completeCoopRoom(roomId, selectedSuspect)
        : resetRoomVotes(roomId)
      ).then((r) => {
        if (!r.success) console.error("Co-op oda güncellemesi:", r.error);
      });
    }
    if (ok) {
      setView("result");
      const attempts = result.attemptCount || readAttemptCount(caseId);
      const durationMs =
        result.durationSeconds > 0
          ? result.durationSeconds * 1000
          : (() => {
              const start = readCaseStartTimestamp(caseId);
              return start != null ? Math.max(0, Date.now() - start) : 0;
            })();
      setSuccessMeta({
        durationMs,
        attempts,
        accuracy: accuracyPercentForAttempts(attempts),
      });
      return;
    }

    const lockedId = result.lockedSuspectId;
    if (!roomId) {
      setLockedSuspectIds(lockSuspectLocal(caseId, lockedId));
    } else {
      setLockedSuspectIds((prev) =>
        prev.includes(lockedId) ? prev : [...prev, lockedId],
      );
    }
    setView("lesson");
    voteSubmitLockRef.current = false;
  }

  function continueAfterLesson() {
    setView("voting");
    setSelectedSuspect(null);
    setVerdict(null);
    setEnvelopeOpen(false);
    setCoopVoteComplete(false);
    flipHandledRef.current = false;
    voteSubmitLockRef.current = false;
  }

  const btnMono =
    "[font-family:var(--font-jetbrains-mono),monospace] text-[10px] font-medium uppercase tracking-[0.26em] transition-colors duration-300 ease-in-out";

  const clockLocked = !requiresTimeline || timelineSettled;
  const showTimelineGate =
    requiresTimeline && timelineReady && !timelineSettled && view === "voting";

  return (
    <>
      {requiresTimeline && !timelineReady && view === "voting" ? (
        <p
          className={`${btnMono} mb-6 text-[var(--kraft)]`}
          style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}
        >
          Kronoloji durumu kontrol ediliyor…
        </p>
      ) : null}

      {showTimelineGate ? (
        <div className="cozum-callout-warn mb-6">
          Faili seçmeden önce saati oturt.{" "}
          <Link
            href={caseTabHref(caseId, "timeline", roomId)}
            className="underline"
          >
            Kronoloji sekmesine git
          </Link>
        </div>
      ) : null}

      {/* ═══ CO-OP OYLAMA OVERLAY ═══ */}
      {clockLocked && isCoop && !coopVoteComplete && roomId && (
        user?.id ? (
          playersLoading || activePlayerCount < 1 ? (
            <p
              className={`${btnMono} mb-6 text-[var(--kraft)]`}
              style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}
            >
              {playersLoading
                ? "Analistler yükleniyor…"
                : "Odada aktif analist bekleniyor…"}
            </p>
          ) : (
            <CoopVotingOverlay
              roomId={roomId}
              suspects={voteSuspects.map((s) => ({
                id: s.suspectId,
                name: s.name,
                role: s.role,
                code: s.idLine,
              }))}
              activeUserIds={activeUserIds}
              userId={user.id}
              onVoteComplete={(suspectId: string) => {
                markCoopVoteFinished(roomId);
                startReveal(suspectId);
                setSelectedSuspect(suspectId);
                setCoopVoteComplete(true);
                incrementAttemptCount(caseId);
                flipHandledRef.current = false;
                setView("envelope");
                setEnvelopeOpen(false);
              }}
              hostBypassEnabled={hostBypassEnabled}
              isHost={coopIsHost}
            />
          )
        ) : (
          <div className="cozum-callout-warn mb-6">
            Co-op oylaması için oturum gerekiyor.{" "}
            <Link href="/giris" className="underline">
              Giriş yap ya da misafir olarak devam et
            </Link>
            , ardından oda koduyla tekrar katıl.
          </div>
        )
      )}

      {revealError && view === "voting" ? (
        <p role="alert" className="cozum-callout-warn mb-6">
          {revealError}
        </p>
      ) : null}

      {/* ═══ SOLO OYLAMA (mevcut akış) ═══ */}
      {clockLocked && view === "voting" && (!isCoop || coopVoteComplete) && (
        <>
          <div className="cozum-callout-warn">
            ⚠ DİKKAT — Şüpheli listesinden faili işaret et. Yanlış tahmin: fail
            kaçar, dosyaya dönüp yeniden inceleyebilirsin ama her deneme kayda
            geçer. Doğru tahmin: dava çözülür.
          </div>

          <div
            className="suspect-grid"
            role="radiogroup"
            aria-label="Fail olarak işaretlenecek şüpheli"
          >
            {voteSuspects.map((s) => {
              const sel = selectedSuspect === s.suspectId;
              return (
                <div
                  key={s.suspectId}
                  role="radio"
                  aria-checked={sel}
                  tabIndex={0}
                  className={`suspect-card${sel ? " suspect-card--vote-selected" : ""}${voteConfirmed && sel ? " suspect-card--vote-confirm" : ""}`}
                  onClick={() => setSelectedSuspect(s.suspectId)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedSuspect(s.suspectId);
                    }
                  }}
                >
                  {markedSet.has(s.suspectId) ? (
                    <span
                      className="suspect-vote-marked-pref"
                      aria-hidden
                      title="Şüphelendiklerinde"
                    >
                      ⚐
                    </span>
                  ) : null}
                  <div className="suspect-id">{s.idLine}</div>
                  <h3 className="suspect-name">{s.name}</h3>
                  <div className="suspect-role">{s.role}</div>
                  <p className="suspect-quote">{s.quote}</p>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col items-stretch gap-4 pb-8 pt-2">
            {!selectedSuspect ? (
              <button
                type="button"
                disabled
                className={`${btnMono} cursor-not-allowed border border-[var(--rule)] bg-[var(--anthracite-2)] py-4 text-[var(--meta-label)]`}
              >
                ▸ Bir şüpheli seç
              </button>
            ) : (
              <button
                type="button"
                onClick={handleConfirmVote}
                className={`${btnMono} border border-[var(--bordeaux-bright)] bg-[var(--bordeaux)] py-4 text-[var(--paper)] hover:bg-[var(--bordeaux-bright)] md:py-[18px]`}
              >
                ▸ Oyumu Onayla — {selectedName}
              </button>
            )}
          </div>
        </>
      )}

      {view === "envelope" && (
        <div className="envelope-flip-scene">
          <div
            ref={flipInnerRef}
            role="presentation"
            className={`envelope-flip-inner${envelopeOpen ? " is-open" : ""}`}
            style={{ minHeight: flipMinH }}
            onTransitionEnd={handleFlipTransitionEnd}
          >
            <div className="envelope-face envelope-face--front">
              <div ref={frontSizerRef}>
                <div className="gate">
                  <div className="gate-seal">
                    ⬢ KAPALI ZARF · OYUNUZ KAYDEDİLDİ ⬢
                  </div>
                  <h2
                    className="gate-title"
                    style={{
                      fontSize: "clamp(1.75rem,5vw,2.75rem)",
                    }}
                  >
                    Sonucu öğrenmek için zarfı aç.
                  </h2>
                  <p
                    className="gate-warn"
                    style={{
                      color: "var(--kraft-light)",
                      fontSize: "clamp(1.1rem,3vw,1.5rem)",
                      fontFamily: "var(--font-cormorant), serif",
                      fontWeight: 600,
                      marginBottom: 24,
                    }}
                  >
                    OYUNUZ: {selectedName}
                  </p>
                  <button
                    type="button"
                    className="gate-btn"
                    onClick={handleOpenEnvelope}
                  >
                    ▸ ZARFI AÇ
                  </button>
                </div>
              </div>
            </div>

            <div
              className="envelope-face envelope-face--back"
              aria-hidden={!envelopeOpen}
            >
              <div className="cozum-envelope-neutral-back">
                Sınıflı sonuç yükleniyor · gözlerinizi ayırmayın
              </div>
            </div>
          </div>
        </div>
      )}

      {view === "result" && isCorrect && (
        <div className="cozum-result-success">
          <div className="stamp stamp-approved cozum-stamp-solved">
            ÇÖZÜLDÜ
          </div>

          <h2
            className="mb-4 text-[clamp(2rem,6vw,3.5rem)] font-semibold italic leading-tight"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            DOSYA KAPATILDI
          </h2>
          <div
            className="mb-8 h-px w-full max-w-xl"
            style={{ background: "var(--kraft-dark)" }}
          />

          <div
            className="mb-10 grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-4"
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            <div>
              <div className="mb-2 text-[var(--meta-label)]">Fail</div>
              <div className="text-[var(--ink)]">
                {verdict?.correct ? verdict.perpetratorName : "—"}
              </div>
            </div>
            <div>
              <div className="mb-2 text-[var(--meta-label)]">
                Analiz süresi
              </div>
              <div className="normal-case tracking-normal text-[var(--ink)]">
                {successMeta
                  ? formatDurationMs(successMeta.durationMs)
                  : "—"}
              </div>
            </div>
            <div>
              <div className="mb-2 text-[var(--meta-label)]">Deneme</div>
              <div className="normal-case tracking-normal text-[var(--ink)]">
                {successMeta ? `${successMeta.attempts}. deneme` : "—"}
              </div>
            </div>
            <div>
              <div className="mb-2 text-[var(--meta-label)]">Doğruluk</div>
              <div className="text-[var(--ink)]">
                {successMeta ? `${successMeta.accuracy}%` : "—"}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => setShowVerdictDoc((v) => !v)}
              className={`${btnMono} border border-[var(--bordeaux)] bg-[var(--bordeaux)] py-4 text-[var(--paper)] hover:bg-[var(--bordeaux-bright)]`}
            >
              {showVerdictDoc ? "▸ Belgeyi Gizle" : "▸ Çözüm Zarfını Gör"}
            </button>
            <Link
              href="/davalar"
              className={`${btnMono} inline-flex justify-center border border-[var(--kraft-dark)] py-4 text-[var(--ink)] hover:border-[var(--bordeaux)]`}
            >
              Davalara Dön
            </Link>
            {user && solvedRecorded ? (
              <div className="flex flex-col gap-2 sm:flex-row">
                <a
                  href={`/vaka/${caseId}/sertifika?indir`}
                  download
                  className={`${btnMono} inline-flex flex-1 justify-center border-2 border-[var(--kraft)] py-4 font-semibold text-[var(--kraft-light)] hover:border-[var(--kraft-light)]`}
                >
                  ▸ Sertifikayı İndir
                </a>
                <a
                  href={`/vaka/${caseId}/sertifika`}
                  target="_blank"
                  rel="noopener"
                  className={`${btnMono} inline-flex justify-center border border-[var(--rule)] px-6 py-4 text-[var(--meta-label)] hover:text-[var(--kraft-light)]`}
                >
                  Önizle
                </a>
              </div>
            ) : !user ? (
              <Link
                href="/giris?tab=kayit"
                className={`${btnMono} inline-flex justify-center border border-dashed border-[var(--rule)] py-4 text-[var(--meta-label)] hover:text-[var(--kraft-light)]`}
              >
                Sertifika için hesap aç
              </Link>
            ) : null}
          </div>

          {showVerdictDoc && verdict?.correct ? (
            <VerdictDocumentHtml solutionHtml={verdict.solutionHtml} />
          ) : null}
        </div>
      )}


      {view === "lesson" && verdict && !verdict.correct ? (
        <div className="cozum-result-fail cozum-lesson">
          <p
            className="mb-4 text-[11px] uppercase tracking-[0.22em] text-[var(--subtitle-text)]"
            style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}
          >
            DOSYA №{caseId} · ELEME · {selectedName}
          </p>
          <h2
            className="mb-4 text-[clamp(1.75rem,5vw,2.75rem)] font-semibold italic text-[var(--bordeaux-bright)]"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            Bu şüpheli fail değil
          </h2>
          <p
            className="mx-auto mb-6 max-w-lg text-[15px] leading-[1.55] text-[var(--body-text)]"
            style={{ fontFamily: "var(--font-newsreader), serif" }}
          >
            {(() => {
              const message = verdict.wrongAnswerMessage;
              const [a, b] = message.split("[SECILEN_ISIM]");
              return (
                <>
                  {a}
                  <strong className="text-[var(--kraft-light)]">
                    {selectedName}
                  </strong>
                  {b}
                </>
              );
            })()}
          </p>
          <article
            className="cozum-lesson-card mx-auto mb-10 max-w-lg"
            dangerouslySetInnerHTML={safeHtml(verdict.lessonHtml)}
          />
          <div className="flex flex-col gap-3 sm:mx-auto sm:max-w-md">
            {voteSuspects.length > 0 ? (
              <button
                type="button"
                onClick={continueAfterLesson}
                className={`${btnMono} border border-[var(--bordeaux)] bg-[var(--bordeaux)] py-4 text-[var(--paper)] hover:bg-[var(--bordeaux-bright)]`}
              >
                ▸ Başka şüpheli seç
              </button>
            ) : (
              <p className="cozum-callout-warn text-center">
                Açık şüpheli kalmadı. Dosyayı yeniden incele.
              </p>
            )}
            <button
              type="button"
              onClick={() => router.push(caseTabHref(caseId, "brief", roomId))}
              className={`${btnMono} border border-[var(--kraft)] bg-transparent py-4 text-[var(--kraft-light)] hover:border-[var(--kraft-light)]`}
            >
              Dosyaya dön
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
