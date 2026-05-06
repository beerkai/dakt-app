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

type ViewState = "voting" | "envelope" | "result";

const GUEST_KEY = "dakt_guest_username";
const COZUM_SESSION_KEY = "dakt_v042_cozum_session";
const CORRECT_SUSPECT_ID = "suspect-05";

// TODO: Co-op'ta tüm oyuncuların aynı suspectId'ye oy vermesi gerekir.
// Şu an votes.length === 1 yeterli. Supabase entegrasyonunda
// votes.every(v => v.suspectId === votes[0].suspectId) kontrolü gelecek.

const SUSPECTS = [
  {
    suspectId: "suspect-01",
    idLine: "SUSP-01 · CFR-47/4",
    name: "Aylin Yalçın",
    role: "Eski sevgili · Olay gecesi evdeydi",
    quote:
      '"Çöp atmak için dışarı çıktım. Konteynerin kapağı açıktı."',
  },
  {
    suspectId: "suspect-02",
    idLine: "SUSP-02 · MOD-26/2",
    name: "Emir Sezer",
    role: "Yakın arkadaş · Aylin'in evindeydi",
    quote: '"Sadece sohbet etmek istedim. Bir şarap aldım, gittim."',
  },
  {
    suspectId: "suspect-03",
    idLine: "SUSP-03 · FNR-10/5",
    name: "Sinem Gürbüz",
    role: 'Yeni ilişki · "O gece bana gelecekti"',
    quote:
      '"23:00\'e kadar bekledim. Cevap gelmedi. Çok sinirlendim."',
  },
  {
    suspectId: "suspect-04",
    idLine: "SUSP-04 · CFR-47/B",
    name: "Şükrü Aydın",
    role: "Apartman görevlisi · 11 yıllık kapıcı",
    quote:
      '"Gece çöp atan biri vardı ama tanıyamadım. Kadına benziyordu."',
  },
  {
    suspectId: "suspect-05",
    idLine: "SUSP-05 · RSP-05/3",
    name: "Meryem Güldağ",
    role: "Eski danışman hocası · Tehditkâr ses kaydı",
    quote:
      '"Eğer benimle bir daha konuşmazsan... bu bir suç olur Burak."',
  },
] as const;

const MIN_FLIP_H = 260;

function getPlayerId(): string {
  try {
    const u = localStorage.getItem(GUEST_KEY)?.trim();
    return u && u.length > 0 ? u : "anon";
  } catch {
    return "anon";
  }
}

function formatAnalysisDuration(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m} dakika ${sec} saniye`;
}

function VerdictDocument() {
  return (
    <article className="verdict" style={{ marginTop: 24 }}>
      <div className="verdict-stamp">CLASSIFIED</div>
      <div className="doc-id" style={{ marginBottom: 12 }}>
        042-Z2 · Resmi Çözüm Belgesi · 15.05.2025
      </div>
      <h3
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: 24,
          margin: "0 0 8px",
        }}
      >
        Failin Kimliği:
      </h3>
      <div className="verdict-name">Meryem Güldağ</div>

      <h3>Cinayet Saati</h3>
      <p>
        Yaklaşık <strong>22:14</strong>. Burak&apos;ın telefon sinyalinin
        kesildiği an. 22:19&apos;daki &quot;okundu&quot; işareti failin telefonu
        açtığını gösterir — yani Burak o sırada ölmüştü.
      </p>

      <h3>Cinayet Yeri</h3>
      <p>
        Aylin&apos;in dairesinin <strong>içi değil</strong>. Apartman içerisinde
        — kat arası, koridor veya boş bir alan. Olay yeri kameraları ve asansör
        logları (
        <strong>23:08 → 23:17</strong> hareketinin iki yöne yapıldığı pencereye
        dikkat: bu fail için cesedi taşıma operasyonudur, ölüm öncesi değil).
      </p>

      <h3>Cinayet Aleti</h3>
      <p>
        Olay yerinde bulunamadı. Profil: ağır, tek elle taşınabilir, yüzeyi düz
        olmayan bir cisim. Olası:{" "}
        <strong>
          eski tip masa ayağı, demir kitaplık aparatı, beton parçası
        </strong>
        . Failin profesyonel çevresinden (akademik mobilya) erişebileceği türde.
      </p>

      <h3>Motivasyon</h3>
      <p>
        Psikolojik saplantı. Terk edilme korkusu. Kontrol kaybı. Burak&apos;ın
        &quot;kesin kopuş&quot; sinyali fail Meryem&apos;de yıkım etkisi
        yaratmıştır. Sesli mesajda &quot;konuşmazsan bu bir suç olur&quot;
        tehdidi — Meryem suçu önceden, açıkça ilan etmiştır. Fail, kontrol
        kaybını &quot;sonsuz kontrol&quot;e çevirmek için cinayeti işlemiştir.
      </p>

      <h3>Dayandığı Belgeler</h3>
      <ol>
        <li>
          <strong>042-I (Sesli mesaj):</strong> Doğrudan tehdit kaydı.
          &quot;Konuşmazsan bu bir suç olur.&quot;
        </li>
        <li>
          <strong>GSM Sinyal:</strong> Burak 22:14&apos;te ölmüş; Meryem
          ifadesinde &quot;23:00&apos;ü geçmişti, Burak kapıdaydı&quot; diyor —{" "}
          <strong>zaman çelişkisi</strong>. Meryem, Burak&apos;la 22:00-22:30
          arasında binada karşılaştığını gizliyor.
        </li>
        <li>
          <strong>22:19 &quot;okundu&quot;:</strong> Mesajı failin Meryem&apos;in
          kendisi açtı (kendine gönderdiği mesajın okunduğunu kontrol etmek için
          olası refleks).
        </li>
        <li>
          <strong>Şükrü Tanıklığı:</strong> &quot;Topuklu, saçları açık
          kadın&quot; — Aylin değil (Aylin evinden çıkmamıştı), Meryem&apos;le
          eşleşiyor.
        </li>
        <li>
          <strong>Asansör 23:08–23:17:</strong> Aylin ve Emir bu pencereyi
          üstlenmiyor. Cesedin Kat 4&apos;ten indirilmesi için kullanılmış olabilir
          — ya da bu pencerede fail (Meryem) cesetle ilgili düzenleme yapmış.
        </li>
        <li>
          <strong>Otopsi:</strong> Arkadan, hedefli, savunma izi yok — kurban
          faili tanıyor ve güveniyor. Eski hoca-öğrenci ilişkisi profile uyuyor.
        </li>
        <li>
          <strong>Polaroid (Emir) ve Aylin&apos;in çöpü</strong> kasıtlı
          yanıltıcılardır (red herring). Ölüme bağlanmıyor.
        </li>
      </ol>

      <p
        style={{
          background: "rgba(107,22,32,0.12)",
          padding: 16,
          borderLeft: "3px solid var(--bordeaux)",
          marginTop: 24,
        }}
      >
        <strong>SONUÇ:</strong> Aylin yalnızca evsel atık attı (042 raporu
        temiz). Emir polaroid hırsızı, fail değil. Şükrü tanık. Sinem alibili.{" "}
        <strong>Fail Meryem Güldağ&apos;dır.</strong>
      </p>

      <div className="doc-signature">
        <div className="sig-line">Kıdemli Kriminal Analist · EGM</div>
        <div className="sig-name">Onaylı</div>
      </div>
    </article>
  );
}

export default function CozumPage() {
  const router = useRouter();
  const [view, setView] = useState<ViewState>("voting");
  const [selectedSuspect, setSelectedSuspect] = useState<string | null>(null);
  const [voteConfirmed, setVoteConfirmed] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [votes, setVotes] = useState<
    Array<{ playerId: string; suspectId: string }>
  >([]);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [showVerdictDoc, setShowVerdictDoc] = useState(false);

  const analysisStartedAt = useRef<number>(Date.now());
  const frontSizerRef = useRef<HTMLDivElement>(null);
  const flipInnerRef = useRef<HTMLDivElement>(null);
  const [flipMinH, setFlipMinH] = useState(MIN_FLIP_H);

  useEffect(() => {
    try {
      localStorage.removeItem(COZUM_SESSION_KEY);
    } catch {
      /* ignore */
    }
  }, []);

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
    SUSPECTS.find((s) => s.suspectId === selectedSuspect)?.name ?? "—";

  function handleConfirmVote() {
    if (!selectedSuspect) return;
    const playerId = getPlayerId();
    setVotes([{ playerId, suspectId: selectedSuspect }]);
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
    setView("result");
    setIsCorrect(selectedSuspect === CORRECT_SUSPECT_ID);
  }

  const analysisElapsed =
    view === "result" ? Date.now() - analysisStartedAt.current : 0;

  const btnMono =
    "[font-family:var(--font-jetbrains-mono),monospace] text-[10px] font-medium uppercase tracking-[0.26em] transition-colors duration-300 ease-in-out";

  return (
    <section id="solution">
      <div className="section-head">
        <div className="section-num">09</div>
        <h2 className="section-title">Çözüm Zarfı</h2>
        <span className="section-sub">Failin Tahmini Tespiti</span>
      </div>

      {view === "voting" && (
        <>
          <div className="cozum-callout-warn">
            ⚠ DİKKAT — Tek hakkın var. Şüpheli listesinden faili işaret et.
            Yanlış tahmin: dosya kapanır, fail kaçar. Doğru tahmin: dava çözülür.
          </div>

          <div className="suspect-grid">
            {SUSPECTS.map((s) => {
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
                  <h2 className="gate-title" style={{ fontSize: "clamp(1.75rem,5vw,2.75rem)" }}>
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
              <div className="text-[var(--ink)]">Meryem Güldağ</div>
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

          {showVerdictDoc ? <VerdictDocument /> : null}
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
            DOSYA №042 · KAPATILDI · ÇÖZÜLEMEDİ
          </p>
          <p
            className="mx-auto mb-10 max-w-lg text-[13px] leading-[1.85] tracking-[0.05em] text-[var(--body-text)]"
            style={{ fontFamily: "var(--font-special-elite), monospace" }}
          >
            Tahminin yanlıştı. Bu vakada{" "}
            <strong className="text-[var(--kraft-light)]">{selectedName}</strong>{" "}
            failin kendisi değildi — sadece çevresinden biri. Gerçek fail
            kayıtlardan silindi. Davanın izi kapandı.
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
              onClick={() => router.push("/vaka/042/brief")}
              className={`${btnMono} border border-[var(--kraft)] bg-transparent py-4 text-[var(--kraft-light)] hover:border-[var(--kraft-light)] hover:bg-[rgba(255,255,255,0.04)]`}
            >
              Bu Vakayı Tekrar İncele
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
