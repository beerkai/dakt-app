import type { Metadata } from "next";
import { CaseCard } from "@/components/CaseCard";

export const metadata: Metadata = {
  title: "Aktif Dosyalar · D.A.K.T.",
  description: "Erişimine açık sınıflandırılmış vaka dosyaları.",
};

export default function DavalarPage() {
  return (
    <div className="relative z-[1] mx-auto w-full max-w-[1280px] flex-1 px-5 py-10 md:px-7 md:py-14">
      <header className="mb-10 md:mb-12">
        <h1 className="mb-3 text-4xl font-semibold italic text-[var(--paper)] [font-family:var(--font-cormorant),serif] md:text-5xl">
          <em className="text-[var(--kraft)]">Aktif</em> Dosyalar
        </h1>
        <p
          className="max-w-xl text-[13px] tracking-[0.06em] text-[var(--subtitle-text)] [font-family:var(--font-special-elite),monospace]"
        >
          Erişimine açık vakalar.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6">
        <CaseCard
          caseNumber="042"
          codename="Karaağaç"
          location="İstanbul · Kadıköy"
          summary="Bir çöp konteynerinde bulunan bir beden. Beş şüpheli, on bir belge, bir gerçek."
          recommendedPlayers="3-4"
          difficulty="Orta"
          href="/vaka/042/brief"
          status="AKTİF"
        />

        <aside
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
              className="mb-6 text-[10px] uppercase tracking-[0.32em] text-[var(--meta-label)] [font-family:var(--font-jetbrains-mono),monospace]"
            >
              ○ Yakında — Dosya №067
            </p>
            <div className="mb-4 text-3xl font-semibold italic text-[var(--meta-label)] [font-family:var(--font-cormorant),serif] md:text-4xl">
              —
            </div>
            <p
              className="mt-auto text-[12px] leading-relaxed tracking-[0.06em] text-[var(--subtitle-text)] [font-family:var(--font-special-elite),monospace]"
            >
              Yakında açılacak
            </p>
            <div
              className="mt-8 flex items-center justify-center border border-dashed border-[var(--rule)] py-4 text-[9px] uppercase tracking-[0.2em] text-[var(--meta-label)] [font-family:var(--font-jetbrains-mono),monospace]"
            >
              Kilitli
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
