"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { Suspect, VerdictData } from "@/lib/case-types";

type ViewState = "voting" | "envelope" | "result";

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

function formatAnalysisDuration(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m} dakika ${sec} saniye`;
}

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

export function CozumClient({
  caseId,
  suspects,
  verdict,
}: {
  caseId: string;
  suspects: Suspect[];
  verdict: VerdictData;
}) {
  const router = useRouter();
  const voteSuspects: VoteSuspect[] = suspects.map((s) => ({
    suspectId: s.id,
    idLine: s.code,
    name: s.name,
    role: s.role,
    quote: s.quote,
  }));

  const correctId = verdict.perpetratorId;

  const [view, setView] = useState<ViewState>("voting");
  const [selectedSuspect, setSelectedSuspect] = useState<string | null>(null);
  const [voteConfirmed, setVoteConfirmed] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [showVerdictDoc, setShowVerdictDoc] = useState(false);

  const analysisStartedAt = useRef(0);
  const [analysisElapsed, setAnalysisElapsed] = useState(0);
  const frontSizerRef = useRef<HTMLDivElement>(null);
  const flipInnerRef = useRef<HTMLDivElement>(null);
  const [flipMinH, setFlipMinH] = useState(MIN_FLIP_H);

  useEffect(() => {
    analysisStartedAt.current = performance.now();
  }, [caseId]);

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
    if (!selectedSuspect) return;
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
      setAnalysisElapsed(performance.now() - analysisStartedAt.current);
    }
  }

  const btnMono =
    "[font-family:var(--font-jetbrains-mono),monospace] text-[10px] font-medium uppercase tracking-[0.26em] transition-colors duration-300 ease-in-out";

  return (
    <>
      {view === "voting" && (
        <>
          <div className="cozum-callout-warn">
            ⚠ DİKKAT — Tek hakkın var. Şüpheli listesinden faili işaret et.
            Yanlış tahmin: dosya kapanır, fail kaçar. Doğru tahmin: dava çözülür.
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
            className="mb-10 grid gap-6 text-left sm:grid-cols-3"
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
                {formatAnalysisDuration(analysisElapsed)}
              </div>
            </div>
            <div>
              <div className="mb-2 text-[var(--meta-label)]">Doğruluk</div>
              <div className="text-[var(--ink)]">100%</div>
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
            <div className="relative">
              <span
                className="absolute -top-2 right-3 z-10 text-[8px] uppercase tracking-[0.2em] text-[var(--meta-label)]"
                style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}
              >
                ○ Yakında
              </span>
              <button
                type="button"
                disabled
                className={`${btnMono} w-full cursor-not-allowed border border-[var(--rule)] bg-[var(--anthracite-2)] py-4 text-[var(--meta-label)] opacity-70`}
              >
                Sertifikayı İndir
              </button>
            </div>
          </div>

          {showVerdictDoc ? <VerdictDocumentHtml verdict={verdict} /> : null}
        </div>
      )}

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
