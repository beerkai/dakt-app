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
      "İfadeleri oku, delilleri damgala (şüpheli / ele alındı / elendi), şüphelendiklerini işaretle, Pano'ya notlarını yaz.",
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
      "Doğru tahmin: dava çözüldü. Yanlış: fail kaçtı — dosyaya dönüp yeniden inceleyebilirsin, ama her deneme kayda geçer.",
  },
] as const;

const btnMono =
  "[font-family:var(--font-jetbrains-mono),ui-monospace,monospace] text-[10px] font-medium uppercase tracking-[0.26em]";

export default function NasilOynanirPage() {
  return (
    <div className="relative z-[1] mx-auto w-full max-w-[1440px] flex-1 px-5 py-10 md:px-7 md:py-14">
      <header className="mb-10 md:mb-12">
        <h1 className="mb-3 text-4xl font-semibold text-[var(--paper)] [font-family:var(--font-cormorant),serif] md:text-5xl">
          Nasıl Oynanır?
        </h1>
        <p className="max-w-xl text-[16px] text-[var(--subtitle-text)] [font-family:var(--font-newsreader),serif]">
          Hızlı bir analiz brifi.
        </p>
      </header>

      <ol className="mb-12 grid list-none grid-cols-1 gap-6 md:mb-14 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-6">
        {STEPS.map((step) => (
          <li
            key={step.num}
            className="relative flex flex-col border border-[var(--kraft-dark)] bg-[var(--anthracite)] p-6 shadow-[var(--shadow)] md:p-7"
          >
            <span
              className="mb-4 text-[clamp(2.5rem,8vw,3.5rem)] font-semibold italic leading-none text-[var(--bordeaux-bright)] [font-family:var(--font-cormorant),serif]"
              aria-hidden
            >
              {step.num}
            </span>
            <h2 className="mb-3 text-xl font-semibold text-[var(--kraft-light)] [font-family:var(--font-cormorant),serif] md:text-[1.35rem]">
              {step.title}
            </h2>
            <p className="flex-1 text-[16px] leading-[1.55] text-[var(--body-text)] [font-family:var(--font-newsreader),serif]">
              {step.body}
            </p>
          </li>
        ))}
      </ol>

      <div className="mb-12 border border-[var(--bordeaux)] bg-[var(--anthracite)] p-6 md:mb-14 md:p-8">
        <p className="text-[15px] leading-[1.55] text-[var(--subtitle-text)] [font-family:var(--font-newsreader),serif]">
          Co-op modunda 1-5 oyuncu aynı oda kodu ile bir dosyaya beraber
          bağlanabilir. Oda, oyuncular ve oylama canlı senkronize; damgalar ve
          Pano notları her analistin kendi cihazında tutulur.
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
