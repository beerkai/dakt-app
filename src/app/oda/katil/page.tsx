import { Suspense } from "react";

import { KatilClient } from "./KatilClient";

const mono =
  "[font-family:var(--font-jetbrains-mono),ui-monospace,monospace]";
const typewriter =
  "[font-family:var(--font-special-elite),monospace]";

export default function OdaKatilPage() {
  return (
    <div className="relative z-[1] mx-auto w-full max-w-[640px] flex-1 px-5 py-10 md:px-7 md:py-14">
      <header className="mb-12 border-b border-[var(--kraft-dark)] pb-10">
        <p
          className={`${mono} mb-4 text-[10px] uppercase tracking-[0.32em] text-[var(--kraft)]`}
        >
          Co-op
        </p>
        <h1 className="mb-4 text-4xl font-semibold italic text-[var(--paper)] [font-family:var(--font-cormorant),serif] md:text-5xl">
          Bir Odaya Katıl
        </h1>
        <p
          className={`${typewriter} max-w-md text-[13px] leading-relaxed tracking-[0.06em] text-[var(--subtitle-text)]`}
        >
          Sana paylaşılan 6 haneli kodu gir.
        </p>
      </header>

      <Suspense
        fallback={
          <p
            className={`${mono} text-[10px] uppercase tracking-[0.22em] text-[var(--kraft)]`}
          >
            Yükleniyor…
          </p>
        }
      >
        <KatilClient />
      </Suspense>
    </div>
  );
}
