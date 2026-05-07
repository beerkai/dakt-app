import Link from "next/link";

const btnMono =
  "[font-family:var(--font-jetbrains-mono),ui-monospace,monospace] text-[10px] font-medium uppercase tracking-[0.26em] transition-colors";

export default function Home() {
  return (
    <main className="relative z-[1] flex min-h-full flex-1 flex-col">
      {/* —— A) Hero —— */}
      <section
        className="relative mx-auto w-full max-w-[1440px] px-5 pb-8 pt-8 md:px-7 md:pb-12 md:pt-10"
        aria-labelledby="landing-hero-heading"
      >
        <div
          className="pointer-events-none absolute left-1/2 top-[55%] z-0 h-[min(70vh,520px)] w-[min(140%,900px)] -translate-x-1/2 rounded-[50%] opacity-90 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(107, 22, 32, 0.45) 0%, rgba(201, 180, 138, 0.08) 38%, transparent 65%)",
          }}
          aria-hidden
        />

        <div className="relative z-[1]">
          <div className="classification-strip mb-6 md:mb-8" lang="en">
            EYES ONLY · CLASSIFIED · ANALYST CLEARANCE REQUIRED
          </div>

          <h1
            id="landing-hero-heading"
            className="mb-5 max-w-[1100px] [font-family:var(--font-cormorant),serif] text-[clamp(3rem,9vw,8rem)] font-semibold italic leading-[0.94] tracking-[-0.02em] text-[var(--paper)]"
          >
            Sen bir Analiz Uzmanısın.
          </h1>

          <p
            className="max-w-[640px] text-[clamp(13px,2.5vw,15px)] leading-[1.75] tracking-[0.05em] text-[var(--subtitle-text)] [font-family:var(--font-special-elite),monospace]"
          >
            D.A.K.T. — bürokratik bir gizlilik içinde, soğuk bir ofiste,
            vakaları çözen bir analist olursun. İfadeleri çapraz oku, delilleri
            damgala, faili bul. Tek başına ya da 1-5 kişilik ekibinle.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/giris"
              className={`${btnMono} inline-flex min-h-[52px] items-center justify-center border border-[var(--bordeaux-bright)] bg-[var(--bordeaux)] px-8 py-4 text-[var(--paper)] hover:bg-[var(--bordeaux-bright)] md:min-h-0 md:px-10 md:py-[18px]`}
            >
              ▸ Misafir Olarak Oyna
            </Link>
            <Link
              href="/davalar"
              className={`${btnMono} inline-flex min-h-[52px] items-center justify-center border border-[var(--kraft)] bg-transparent px-8 py-4 text-[var(--kraft-light)] hover:border-[var(--kraft-light)] hover:bg-[var(--anthracite-2)] md:min-h-0 md:px-10 md:py-[18px]`}
            >
              Davaları Gör
            </Link>
          </div>

          <div className="mt-8">
            <p className="max-w-lg text-[12px] tracking-[0.06em] text-[var(--subtitle-text)] [font-family:var(--font-special-elite),monospace]">
              Arkadaşının kurduğu odaya mı katılıyorsun?{" "}
              <Link
                href="/oda/katil"
                className={`${btnMono} text-[var(--kraft)] underline-offset-4 hover:text-[var(--kraft-light)] hover:underline`}
              >
                Kod ile Katıl →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* —— B) Özellik şeridi —— */}
      <section
        className="relative z-[1] mx-auto w-full max-w-[1440px] px-5 py-12 md:px-7 md:py-16"
        aria-labelledby="landing-features-heading"
      >
        <h2 id="landing-features-heading" className="sr-only">
          Oyun özellikleri
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-6">
          <article className="relative overflow-hidden border border-[var(--kraft-dark)] bg-[var(--anthracite)] p-6 shadow-[var(--shadow)] md:p-7">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.12]"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 20% 0%, rgba(201, 180, 138, 0.5), transparent 55%)",
              }}
              aria-hidden
            />
            <div className="relative">
              <span
                className="mb-4 block text-2xl text-[var(--kraft)]"
                aria-hidden
              >
                ●
              </span>
              <h3 className="mb-3 text-2xl font-semibold italic text-[var(--paper)] [font-family:var(--font-cormorant),serif]">
                Çok oyunculu
              </h3>
              <p className="mb-4 text-[13px] leading-relaxed tracking-[0.05em] text-[var(--subtitle-text)] [font-family:var(--font-special-elite),monospace]">
                1-5 kişiye kadar co-op. Aynı dosyayı, aynı anda inceleyin.
              </p>
              <p className="border-l-2 border-[var(--bordeaux-bright)] pl-3 text-[9px] uppercase leading-snug tracking-[0.22em] text-[var(--kraft)] [font-family:var(--font-jetbrains-mono),monospace]">
                Önerilen: 3-4 analist
              </p>
            </div>
          </article>

          <article className="relative overflow-hidden border border-[var(--kraft-dark)] bg-[var(--anthracite)] p-6 shadow-[var(--shadow)] md:p-7">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.12]"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(107, 22, 32, 0.35), transparent 55%)",
              }}
              aria-hidden
            />
            <div className="relative">
              <span
                className="mb-4 block text-2xl text-[var(--kraft)]"
                aria-hidden
              >
                ◆
              </span>
              <h3 className="mb-3 text-2xl font-semibold italic text-[var(--paper)] [font-family:var(--font-cormorant),serif]">
                Gerçek dosya hissi
              </h3>
              <p className="text-[13px] leading-relaxed tracking-[0.05em] text-[var(--subtitle-text)] [font-family:var(--font-special-elite),monospace]">
                Damgalar, mühürler, daktilo notlar. Dijital ama elinde
                tutuyormuş gibi.
              </p>
            </div>
          </article>

          <article className="relative overflow-hidden border border-[var(--kraft-dark)] bg-[var(--anthracite)] p-6 shadow-[var(--shadow)] md:p-7">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.12]"
              style={{
                background:
                  "radial-gradient(ellipse 70% 50% at 80% 0%, rgba(201, 180, 138, 0.45), transparent 50%)",
              }}
              aria-hidden
            />
            <div className="relative">
              <span
                className="mb-4 block text-2xl text-[var(--kraft)]"
                aria-hidden
              >
                ▲
              </span>
              <h3 className="mb-3 text-2xl font-semibold italic text-[var(--paper)] [font-family:var(--font-cormorant),serif]">
                Aylık yeni vaka
              </h3>
              <p className="text-[13px] leading-relaxed tracking-[0.05em] text-[var(--subtitle-text)] [font-family:var(--font-special-elite),monospace]">
                Her ay yeni bir cinayet, yeni bir gizem.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* —— C) Dosya peek —— */}
      <section className="relative z-[1] mx-auto w-full max-w-[1440px] px-5 pb-16 md:px-7 md:pb-24">
        <div className="relative overflow-hidden border-2 border-[var(--kraft-dark)] bg-[linear-gradient(165deg,var(--paper)_0%,var(--paper-dim)_100%)] p-6 text-[var(--ink)] shadow-[var(--shadow)] md:p-10">
          <div
            className="pointer-events-none absolute -right-8 -top-6 rotate-12 border-4 border-[var(--bordeaux)] px-4 py-2 opacity-[0.35] [font-family:var(--font-jetbrains-mono),monospace] text-[10px] font-bold uppercase tracking-[0.35em] text-[var(--bordeaux)]"
            aria-hidden
          >
            SINIFLI
          </div>
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                var(--ink) 0px,
                var(--ink) 1px,
                transparent 1px,
                transparent 4px
            )`,
            }}
            aria-hidden
          />

          <div className="relative max-w-[520px]">
            <p className="mb-1 text-[10px] uppercase tracking-[0.3em] text-[var(--meta-label)] [font-family:var(--font-jetbrains-mono),monospace]">
              Dosya №042 · Karaağaç
            </p>
            <p
              className="mb-4 text-xs tracking-[0.28em] text-[var(--bordeaux)] [font-family:var(--font-jetbrains-mono),monospace]"
              lang="en"
            >
              EYES ONLY · ANALYST CLEARANCE
            </p>
            <p className="mb-3 text-3xl font-semibold italic leading-tight text-[var(--ink)] [font-family:var(--font-cormorant),serif] md:text-4xl">
              Operasyon özeti
            </p>
            <p className="mb-6 text-[12px] leading-[1.8] tracking-[0.06em] text-[var(--anthracite-2)] [font-family:var(--font-special-elite),monospace]">
              Kadıköy, Caferağa. Konteyner sahası. Kimlik tespiti bekleyen beden,
              beş ifade, on bir ek belge. Çelişkiler kayıtlı; damga setin
              hazır…
            </p>
            <Link
              href="/davalar"
              className={`${btnMono} inline-flex items-center border border-[var(--bordeaux)] bg-[var(--bordeaux)] px-6 py-3 text-[var(--paper)] hover:bg-[var(--bordeaux-bright)]`}
            >
              İlk vakanı aç →
            </Link>
          </div>
        </div>
      </section>

      {/* —— D) Alt footer —— */}
      <footer className="relative z-[1] mt-auto border-t border-[var(--rule)] px-5 py-10 md:px-7">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 text-center md:text-left">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--subtitle-text)] [font-family:var(--font-jetbrains-mono),monospace]">
            D.A.K.T. ·{" "}
            <a
              href="https://instagram.com/dakt.app"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer normal-case transition-colors hover:text-[var(--kraft-light)]"
            >
              @dakt.app
            </a>{" "}
            · jointhedakt@gmail.com
          </p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--meta-label)] [font-family:var(--font-jetbrains-mono),monospace]">
            © 2026
          </p>
        </div>
      </footer>
    </main>
  );
}
