import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nasıl Oynanır · D.A.K.T.",
  description:
    "Dosyayı aç, incele, oyla, zarfı aç — hızlı analist brifi.",
};

const STEPS = [
  {
    num: "01",
    title: "Dosyayı Aç",
    body:
      "Davalar menüsünden bir vakaya gir. Ekibini kur ya da tek başına başla.",
  },
  {
    num: "02",
    title: "İncele",
    body:
      "İfadeleri oku, delilleri damgala (APPROVED/DENIED/CLASSIFIED), zaman çizelgesini diz, deduction board'da notlar al.",
  },
  {
    num: "03",
    title: "Oyla",
    body:
      "Çözüm zarfından önce şüpheli listesinden faili seç. Co-op'ta herkesin aynı kişiye oy vermesi gerekir.",
  },
  {
    num: "04",
    title: "Zarfı Aç",
    body:
      "Doğru tahmin: dava çözüldü. Yanlış: fail kaçtı. Bir dahaki sefere daha dikkatli analiz et.",
  },
] as const;

const btnMono =
  "[font-family:var(--font-jetbrains-mono),ui-monospace,monospace] text-[10px] font-medium uppercase tracking-[0.26em]";

export default function NasilOynanirPage() {
  return (
    <div className="relative z-[1] mx-auto w-full max-w-[720px] flex-1 px-5 py-10 md:px-7 md:py-14">
      <header className="mb-12 md:mb-16">
        <h1 className="mb-3 text-4xl font-semibold text-[var(--paper)] [font-family:var(--font-cormorant),serif] md:text-5xl">
          Nasıl Oynanır?
        </h1>
        <p className="text-[13px] tracking-[0.06em] text-[var(--subtitle-text)] [font-family:var(--font-special-elite),monospace]">
          Hızlı bir analiz brifi.
        </p>
      </header>

      <ol className="mb-12 flex list-none flex-col gap-10 md:mb-16 md:gap-12">
        {STEPS.map((step) => (
          <li key={step.num} className="relative pl-5 md:pl-7">
            <span
              className="absolute left-0 top-0 bottom-0 w-0.5 bg-[var(--bordeaux)]"
              aria-hidden
            />
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-8">
              <span
                className="shrink-0 text-[clamp(3.5rem,12vw,5rem)] font-semibold italic leading-none text-[var(--bordeaux-bright)] [font-family:var(--font-cormorant),serif]"
                aria-hidden
              >
                {step.num}
              </span>
              <div className="min-w-0 pt-1">
                <h2 className="mb-3 text-2xl font-semibold text-[var(--kraft-light)] [font-family:var(--font-cormorant),serif] md:text-[1.75rem]">
                  {step.title}
                </h2>
                <p className="text-[13px] leading-[1.8] tracking-[0.05em] text-[var(--body-text)] [font-family:var(--font-special-elite),monospace]">
                  {step.body}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="mb-12 border border-[var(--bordeaux)] bg-[var(--anthracite)] p-6 md:mb-14 md:p-8">
        <p className="text-[12px] leading-[1.85] tracking-[0.05em] text-[var(--subtitle-text)] [font-family:var(--font-special-elite),monospace]">
          Co-op modunda 1-5 oyuncu aynı oda kodu ile bir dosyaya beraber
          bağlanabilir. Damga vurma, not alma, oylama — hepsi senkronize.
        </p>
      </div>

      <div className="flex justify-center pb-8 md:justify-start md:pb-10">
        <Link
          href="/davalar"
          className={`${btnMono} inline-flex items-center justify-center border border-[var(--bordeaux-bright)] bg-[var(--bordeaux)] px-10 py-4 text-[var(--kraft-light)] transition-colors hover:bg-[var(--bordeaux-bright)]`}
        >
          Hadi başla →
        </Link>
      </div>
    </div>
  );
}
