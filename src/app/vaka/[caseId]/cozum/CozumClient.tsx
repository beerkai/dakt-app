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
import type { Suspect, VerdictData } from "@/lib/case-types";
import {
  accuracyPercentForAttempts,
  clearPlaythroughProgressForCase,
  cozumSessionStorageKey,
  formatDurationMs,
  incrementAttemptCount,
  readAttemptCount,
  readCaseStartTimestamp,
  serverSolvedRecordedStorageKey,
} from "@/lib/case-playthrough-storage";
import { clearActiveSession } from "@/lib/active-session";
import { readGuestUsernameTrimmed } from "@/lib/guest-session";
import {
  upsertLocalSolvedRecord,
} from "@/lib/local-solved-storage";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/AuthProvider";
// Aşama 4 (SSR sertifika): Certificate + formatCertificateDate yeniden eklenecek.
// import { Certificate, type CertificateHandle } from "@/components/Certificate";
import {
  MARKED_SUSPECTS_CHANGED_EVENT,
  markedSuspectsStorageKey,
  readMarkedSuspects,
} from "@/lib/marked-suspects-storage";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { useRoomActivePlayers } from "@/hooks/useRoomActivePlayers";
import { useRoomVoting } from "@/hooks/useRoomVoting";

type ViewState = "voting" | "envelope" | "result";

const MIN_FLIP_H = 260;

type VoteSuspect = {
  suspectId: string;
  idLine: string;
  name: string;
  role: string;
  quote: string;
};

function VerdictDocumentHtml({
  verdict,
}: {
  verdict: VerdictData;
}) {
  return (
    <article
      className="verdict"
      style={{ marginTop: 24 }}
      dangerouslySetInnerHTML={{ __html: verdict.solutionHtml }}
    />
  );
}

export type CozumCoopMeta = {
  roomId: string;
  myUserId: string;
  myUsername: string;
  myColor: string | null;
  isHost: boolean;
  hostBypassEnabled: boolean;
};

function analystChipBackground(color: string | null): string {
  switch (color) {
    case "mavi":
      return "var(--analyst-blue)";
    case "sari":
      return "var(--analyst-yellow)";
    case "yesil":
      return "var(--analyst-green)";
    case "mor":
      return "var(--analyst-purple)";
    case "turuncu":
      return "var(--analyst-orange)";
    default:
      return "var(--kraft)";
  }
}

function CoopVotingSection({
  voteSuspects,
  markedSet,
  coopMeta,
  voting,
  activePlayerCount,
  btnMono,
  onOpenEnvelopeForAll,
}: {
  voteSuspects: VoteSuspect[];
  markedSet: Set<string>;
  coopMeta: CozumCoopMeta;
  voting: ReturnType<typeof useRoomVoting>;
  activePlayerCount: number;
  btnMono: string;
  onOpenEnvelopeForAll: (suspectId: string) => void | Promise<void>;
}) {
  const voteCounts = voteSuspects.reduce<Record<string, number>>((acc, s) => {
    acc[s.suspectId] = voting.votes.filter(
      (v) => v.voted_suspect_id === s.suspectId,
    ).length;
    return acc;
  }, {});

  const totalVotes = voting.votes.length;
  const allVoted = activePlayerCount > 0 && totalVotes >= activePlayerCount;
  const uniqueSuspectsVoted = new Set(
    voting.votes.map((v) => v.voted_suspect_id),
  );
  const isUnanimous = allVoted && uniqueSuspectsVoted.size === 1;
  const consensusSuspectId = isUnanimous
    ? (voting.votes[0]?.voted_suspect_id ?? null)
    : null;

  return (
    <>
      <div className="cozum-callout-warn">
        ◎ CO-OP — Ekibin aynı şüpheliye oy vermesi gerekir. Oy sayısı güncellenir;
        zarf yalnızca oy birliği (veya host bypass kuralı) ile açılır.
      </div>

      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <p
          className={`${btnMono} text-[10px] text-[var(--kraft-dark)]`}
        >
          CO-OP · {totalVotes}/{activePlayerCount || "—"} OY
          {coopMeta.hostBypassEnabled && coopMeta.isHost
            ? " · HOST BYPASS AKTİF"
            : ""}
        </p>
      </div>

      <div className="suspect-grid">
        {voteSuspects.map((s) => {
          const myVoteIs = voting.myVote?.voted_suspect_id === s.suspectId;
          const voteCount = voteCounts[s.suspectId] ?? 0;
          const votersForThis = voting.votes.filter(
            (v) => v.voted_suspect_id === s.suspectId,
          );

          return (
            <div
              key={s.suspectId}
              role="button"
              tabIndex={0}
              className={`relative suspect-card${myVoteIs ? " suspect-card--vote-selected" : ""}${voting.loading ? " opacity-80" : ""}`}
              onClick={() => {
                void voting.castVote(
                  s.suspectId,
                  coopMeta.myUsername,
                  coopMeta.myColor,
                );
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  void voting.castVote(
                    s.suspectId,
                    coopMeta.myUsername,
                    coopMeta.myColor,
                  );
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
              {myVoteIs ? (
                <span
                  className={`${btnMono} absolute right-2 top-2 rounded border border-[var(--bordeaux-bright)] bg-[var(--bordeaux)] px-1.5 py-0.5 text-[8px] text-[var(--paper)]`}
                >
                  OYUM
                </span>
              ) : null}
              <div className="suspect-id">{s.idLine}</div>
              <h3 className="suspect-name">{s.name}</h3>
              <div className="suspect-role">{s.role}</div>
              <p className="suspect-quote">{s.quote}</p>
              {voteCount > 0 ? (
                <div
                  className="mt-3 flex flex-wrap gap-1 border-t border-dashed border-[var(--rule)] pt-2"
                  style={{ marginTop: 12 }}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                >
                  {votersForThis.map((v) => (
                    <span
                      key={v.id}
                      className="text-[9px] uppercase tracking-[0.08em]"
                      style={{
                        background: analystChipBackground(v.user_color),
                        color: "var(--ink)",
                        padding: "2px 8px",
                        fontFamily: "var(--font-jetbrains-mono), monospace",
                      }}
                    >
                      ★ {v.username}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div
        className="flex flex-col items-stretch gap-4 pb-8 pt-2"
        style={{
          border: "1px solid var(--rule)",
          padding: 20,
          background: "var(--anthracite-2)",
        }}
      >
        {!voting.myVote ? (
          <p
            className={`text-center text-[13px] text-[var(--kraft-light)] [font-family:var(--font-special-elite),monospace]`}
          >
            Şüpheli kartına tıklayarak oy ver.
          </p>
        ) : !allVoted ? (
          <>
            <p
              className={`text-center text-[13px] text-[var(--kraft-light)] [font-family:var(--font-special-elite),monospace]`}
            >
              Diğer analistler oylamayı tamamlasın…
            </p>
            <button
              type="button"
              onClick={() => void voting.retractVote()}
              className={`${btnMono} border border-[var(--rule)] bg-transparent py-3 text-[var(--kraft)] hover:border-[var(--kraft)]`}
            >
              ◂ Oyumu Geri Çek
            </button>
          </>
        ) : isUnanimous && consensusSuspectId ? (
          <>
            <p
              className={`text-center text-[18px] italic text-[var(--paper)] [font-family:var(--font-cormorant),serif]`}
            >
              Oy birliği sağlandı.
            </p>
            <button
              type="button"
              onClick={() => void onOpenEnvelopeForAll(consensusSuspectId)}
              className={`${btnMono} border border-[var(--bordeaux-bright)] bg-[var(--bordeaux)] py-4 text-[var(--paper)] hover:bg-[var(--bordeaux-bright)] md:py-[18px]`}
            >
              ▸ Zarfı Aç
            </button>
          </>
        ) : (
          <>
            <p
              className={`text-center text-[18px] italic text-[var(--bordeaux-bright)] [font-family:var(--font-cormorant),serif]`}
            >
              Anlaşılamadı. Oylar farklı.
            </p>
            <p
              className={`text-center text-[12px] text-[var(--kraft)] [font-family:var(--font-special-elite),monospace]`}
            >
              Tartışın ve oylarınızı değiştirin; host bypass kapalıysa oy birliği
              şart.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={() => void voting.retractVote()}
                className={`${btnMono} border border-[var(--rule)] bg-transparent py-3 text-[var(--kraft)]`}
              >
                ◂ Oyumu Geri Çek
              </button>
              {coopMeta.hostBypassEnabled && coopMeta.isHost && voting.myVote ? (
                <button
                  type="button"
                  onClick={() =>
                    void onOpenEnvelopeForAll(
                      voting.myVote!.voted_suspect_id,
                    )
                  }
                  className={`${btnMono} border border-[var(--bordeaux-bright)] bg-transparent py-3 text-[var(--bordeaux-bright)]`}
                >
                  ▸ Yine de Aç (Host)
                </button>
              ) : null}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export function CozumClient({
  caseId,
  codename,
  suspects,
  verdict,
  serverHasSolvedRecord = false,
  coopMeta = null,
}: {
  caseId: string;
  codename: string;
  suspects: Suspect[];
  verdict: VerdictData;
  /** Kayıtlı kullanıcı: bu vaka için solved_cases satırı var mı (profil senkronu). */
  serverHasSolvedRecord?: boolean;
  coopMeta?: CozumCoopMeta | null;
}) {
  const router = useRouter();
  const { user } = useAuth();
  const hasRecordedSolved = useRef(false);
  const coopChannelRef = useRef<RealtimeChannel | null>(null);
  const viewRef = useRef<ViewState>("voting");

  const inCoopSolution = Boolean(coopMeta);
  const roomIdForCoop = coopMeta?.roomId ?? null;
  const userIdForCoop = coopMeta?.myUserId ?? null;
  const voting = useRoomVoting(roomIdForCoop, userIdForCoop);
  const { count: activePlayerCount } = useRoomActivePlayers(roomIdForCoop);

  const openCoopEnvelope = useCallback(
    async (suspectId: string) => {
      const ch = coopChannelRef.current;
      if (ch) {
        await ch.send({
          type: "broadcast",
          event: "goto_envelope",
          payload: { suspectId },
        });
        return;
      }
      if (viewRef.current === "voting") {
        incrementAttemptCount(caseId);
        setSelectedSuspect(suspectId);
        setVoteConfirmed(false);
        setView("envelope");
        setEnvelopeOpen(false);
      }
    },
    [caseId],
  );

  useEffect(() => {
    if (!coopMeta?.roomId || !user) return;
    const supabase = createClient();
    const ch = supabase.channel(`coop_cozum:${coopMeta.roomId}`, {
      config: { broadcast: { self: true } },
    });
    ch.on("broadcast", { event: "goto_envelope" }, ({ payload }) => {
      const p = payload as { suspectId?: string };
      const sid = p?.suspectId;
      if (!sid || typeof sid !== "string") return;
      if (viewRef.current !== "voting") return;
      incrementAttemptCount(caseId);
      setSelectedSuspect(sid);
      setVoteConfirmed(false);
      setView("envelope");
      setEnvelopeOpen(false);
    });
    ch.subscribe((status) => {
      if (status === "SUBSCRIBED") {
        coopChannelRef.current = ch;
      }
    });
    return () => {
      coopChannelRef.current = null;
      void supabase.removeChannel(ch);
    };
  }, [coopMeta?.roomId, user, caseId]);
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

  const voteSuspects: VoteSuspect[] = useMemo(() => {
    const marked = new Set(markedSuspectIds);
    const order = new Map(
      baseVoteSuspects.map((v, i) => [v.suspectId, i] as const),
    );
    return [...baseVoteSuspects].sort((a, b) => {
      const aM = marked.has(a.suspectId) ? 0 : 1;
      const bM = marked.has(b.suspectId) ? 0 : 1;
      if (aM !== bM) return aM - bM;
      return (order.get(a.suspectId) ?? 0) - (order.get(b.suspectId) ?? 0);
    });
  }, [baseVoteSuspects, markedSuspectIds]);

  const markedSet = useMemo(
    () => new Set(markedSuspectIds),
    [markedSuspectIds],
  );

  const correctId = verdict.perpetratorId;

  const [view, setView] = useState<ViewState>("voting");
  const [selectedSuspect, setSelectedSuspect] = useState<string | null>(null);
  const [voteConfirmed, setVoteConfirmed] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [showVerdictDoc, setShowVerdictDoc] = useState(false);

  type SuccessMeta = { durationMs: number; attempts: number; accuracy: number };
  const [successMeta, setSuccessMeta] = useState<SuccessMeta | null>(null);
  // Aşama 4: const [certModalOpen, setCertModalOpen] = useState(false);
  // Aşama 4: const certRef = useRef<CertificateHandle>(null);
  const [analystDisplay, setAnalystDisplay] = useState("Misafir Analist");

  viewRef.current = view;

  useEffect(() => {
    function readName() {
      const v = readGuestUsernameTrimmed();
      setAnalystDisplay(v ?? "Misafir Analist");
    }
    readName();
    function onGuest() {
      readName();
    }
    window.addEventListener("dakt_guest_changed", onGuest);
    return () => window.removeEventListener("dakt_guest_changed", onGuest);
  }, []);

  useEffect(() => {
    setSuccessMeta(null);
    hasRecordedSolved.current = false;
    // Aşama 4: setCertModalOpen(false);
  }, [caseId]);

  useEffect(() => {
    if (view !== "result" || !isCorrect || !successMeta) return;
    if (hasRecordedSolved.current) return;

    const durationSeconds = Math.floor(successMeta.durationMs / 1000);

    if (user) {
      hasRecordedSolved.current = true;
      const supabase = createClient();
      void (async () => {
        const { error } = await supabase.from("solved_cases").upsert(
          {
            user_id: user.id,
            case_id: caseId,
            accuracy: successMeta.accuracy,
            attempt_count: successMeta.attempts,
            duration_seconds: durationSeconds,
            solved_at: new Date().toISOString(),
          },
          { onConflict: "user_id,case_id" },
        );
        if (error) {
          console.error("Vaka kaydı hatası:", error);
        } else {
          try {
            localStorage.setItem(serverSolvedRecordedStorageKey(caseId), "1");
          } catch {
            /* ignore */
          }
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
  }, [view, isCorrect, user, successMeta, caseId]);

  useEffect(() => {
    if (view !== "result" || !isCorrect) return;
    clearActiveSession();
    window.dispatchEvent(new Event("dakt-session-change"));
  }, [view, isCorrect]);

  /* Aşama 4: sertifika modal — Escape ile kapatma
  useEffect(() => {
    if (!certModalOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setCertModalOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [certModalOpen]);
  */
  const frontSizerRef = useRef<HTMLDivElement>(null);
  const flipInnerRef = useRef<HTMLDivElement>(null);
  const [flipMinH, setFlipMinH] = useState(MIN_FLIP_H);

  useEffect(() => {
    try {
      localStorage.removeItem(cozumSessionStorageKey(caseId));
    } catch {
      /* ignore */
    }
  }, [caseId]);

  useEffect(() => {
    if (!user) return;
    const flagKey = serverSolvedRecordedStorageKey(caseId);
    let hadFlag = false;
    try {
      hadFlag = localStorage.getItem(flagKey) === "1";
    } catch {
      /* ignore */
    }
    if (!serverHasSolvedRecord && hadFlag) {
      clearPlaythroughProgressForCase(caseId);
      return;
    }
    if (serverHasSolvedRecord && !hadFlag) {
      try {
        localStorage.setItem(flagKey, "1");
      } catch {
        /* ignore */
      }
    }
  }, [user, caseId, serverHasSolvedRecord]);

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
    if (!selectedSuspect) return;
    incrementAttemptCount(caseId);
    setVoteConfirmed(true);
    window.setTimeout(() => {
      setVoteConfirmed(false);
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
    const ok = selectedSuspect === correctId;
    setView("result");
    setIsCorrect(ok);
    if (ok) {
      const start = readCaseStartTimestamp(caseId);
      const durationMs =
        start != null ? Math.max(0, Date.now() - start) : 0;
      const attempts = readAttemptCount(caseId);
      const accuracy = accuracyPercentForAttempts(attempts);
      setSuccessMeta({ durationMs, attempts, accuracy });
    }
  }

  const btnMono =
    "[font-family:var(--font-jetbrains-mono),monospace] text-[10px] font-medium uppercase tracking-[0.26em] transition-colors duration-300 ease-in-out";

  return (
    <>
      {view === "voting" && (
        <>
          {inCoopSolution && coopMeta ? (
            <CoopVotingSection
              voteSuspects={voteSuspects}
              markedSet={markedSet}
              coopMeta={coopMeta}
              voting={voting}
              activePlayerCount={activePlayerCount}
              btnMono={btnMono}
              onOpenEnvelopeForAll={openCoopEnvelope}
            />
          ) : (
            <>
              <div className="cozum-callout-warn">
                ⚠ DİKKAT — Tek hakkın var. Şüpheli listesinden faili işaret et.
                Yanlış tahmin: dosya kapanır, fail kaçar. Doğru tahmin: dava
                çözülür.
              </div>

              <div className="suspect-grid">
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
              <div className="text-[var(--ink)]">{verdict.perpetratorName}</div>
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
            <div className="relative pt-5">
              <span
                className={`${btnMono} pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap text-[9px] tracking-[0.18em] text-[var(--meta-label)] opacity-100`}
                aria-hidden
              >
                ○ YAKINDA
              </span>
              <button
                type="button"
                disabled
                title={analystDisplay}
                className={`${btnMono} w-full border-2 border-[var(--rule)] bg-[var(--anthracite-2)] py-4 font-semibold text-[var(--meta-label)] opacity-50 shadow-none`}
                style={{ cursor: "not-allowed" }}
              >
                Sertifikayı İndir
              </button>
            </div>
          </div>

          {showVerdictDoc ? <VerdictDocumentHtml verdict={verdict} /> : null}
        </div>
      )}

      {/* Aşama 4 (SSR sertifika): modal + PNG — geçici kapalı
      {certModalOpen && successMeta ? (
        <div
          className="fixed inset-0 z-[280] flex items-center justify-center p-4 md:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
        >
          <button
            type="button"
            className="absolute inset-0 border-0 bg-[var(--ink)]/80 backdrop-blur-sm"
            aria-label="Pencereyi kapat"
            onClick={() => setCertModalOpen(false)}
          />
          <div
            className="relative z-[1] flex max-h-[min(96vh,940px)] w-full max-w-[800px] flex-col overflow-hidden rounded border-2 border-[var(--kraft-dark)] bg-[var(--paper)] shadow-[var(--shadow)]"
            style={{ boxSizing: "border-box" }}
          >
            <h3
              id="cert-modal-title"
              className="border-b border-[var(--rule)] px-4 py-3 text-center text-[13px] font-semibold tracking-[0.12em] text-[var(--ink)] [font-family:var(--font-cormorant),serif]"
            >
              Dosya kapama sertifikası
            </h3>
            <div
              className="min-h-0 flex-1 overflow-auto px-4 py-4 md:p-5"
              style={{ boxSizing: "border-box" }}
            >
              <div
                className="mx-auto w-full max-w-[800px]"
                style={{ boxSizing: "border-box" }}
              >
                <Certificate
                  ref={certRef}
                  analystName={analystDisplay}
                  caseNumber={caseId}
                  codename={codename}
                  date={formatCertificateDate()}
                  analysisTime={formatDurationMs(successMeta.durationMs)}
                  attemptCount={successMeta.attempts}
                  accuracy={successMeta.accuracy}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 border-t border-[var(--rule)] bg-[var(--anthracite)] p-3 sm:flex-row sm:justify-end sm:gap-3">
              <button
                type="button"
                onClick={() => setCertModalOpen(false)}
                className={`${btnMono} border border-[var(--kraft)] px-4 py-3 text-[var(--kraft-light)] hover:border-[var(--kraft-light)]`}
              >
                Kapat
              </button>
              <button
                type="button"
                onClick={() => void certRef.current?.downloadPng()}
                className={`${btnMono} border border-[var(--bordeaux-bright)] bg-[var(--bordeaux)] px-4 py-3 text-[var(--paper)] hover:bg-[var(--bordeaux-bright)]`}
              >
                PNG İndir
              </button>
            </div>
          </div>
        </div>
      ) : null}
      */}

      {view === "result" && !isCorrect && (
        <div className="cozum-result-fail">
          <div
            className="mx-auto mb-8 inline-block border-4 border-double px-5 py-3 text-[clamp(1.1rem,3.5vw,1.75rem)] font-bold uppercase tracking-[0.22em] text-[var(--classified)]"
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              transform: "rotate(-5deg)",
            }}
          >
            Classified
          </div>
          <h2
            className="mb-4 text-[clamp(2rem,6vw,3.25rem)] font-semibold italic text-[var(--bordeaux-bright)]"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            FAİL KAÇTI
          </h2>
          <p
            className="mb-6 text-[11px] uppercase tracking-[0.22em] text-[var(--subtitle-text)]"
            style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}
          >
            DOSYA №{caseId} · KAPATILDI · ÇÖZÜLEMEDİ
          </p>
          <p
            className="mx-auto mb-10 max-w-lg text-[13px] leading-[1.85] tracking-[0.05em] text-[var(--body-text)]"
            style={{ fontFamily: "var(--font-special-elite), monospace" }}
          >
            {(() => {
              const [a, b] = verdict.wrongAnswerMessage.split("[SECILEN_ISIM]");
              return (
                <>
                  {a}
                  <strong className="text-[var(--kraft-light)]">{selectedName}</strong>
                  {b}
                </>
              );
            })()}
          </p>
          <div className="flex flex-col gap-3 sm:mx-auto sm:max-w-md">
            <Link
              href="/davalar"
              className={`${btnMono} inline-flex justify-center border border-[var(--bordeaux)] bg-[var(--bordeaux)] py-4 text-[var(--paper)] hover:bg-[var(--bordeaux-bright)]`}
            >
              Yeni Vakaya Geç
            </Link>
            <button
              type="button"
              onClick={() => router.push(`/vaka/${caseId}/brief`)}
              className={`${btnMono} border border-[var(--kraft)] bg-transparent py-4 text-[var(--kraft-light)] hover:border-[var(--kraft-light)] hover:bg-[rgba(255,255,255,0.04)]`}
            >
              Bu Vakayı Tekrar İncele
            </button>
          </div>
        </div>
      )}
    </>
  );
}
