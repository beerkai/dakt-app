import Link from "next/link";

export type CaseStatus = "DOSYA AÇIK" | "YAKINDA";

export type CaseCardProps = {
  caseNumber: string;
  codename: string;
  location: string;
  summary: string;
  recommendedPlayers: string;
  difficulty: string;
  /** Sekme / belge / şüpheli özeti (Davalar grid) */
  tabCount: number;
  docCount: number;
  suspectCount: number;
  /** Yoksa veya pasif kartta buton gösterilmez */
  href?: string;
  /** Varsa CTA `Link` yerine tıklanınca bu çağrılır (ör. misafir takma adı modalı). */
  onCtaClick?: () => void;
  /** Oturum yüklenirken buton kilitlenir (ör. useAuth loading). */
  ctaBusy?: boolean;
  /** Kayıtlı kullanıcı bu vakayı çözdüyse rozet + hafif solukluk */
  isSolved?: boolean;
  status: CaseStatus;
};

const mono =
  "[font-family:var(--font-jetbrains-mono),ui-monospace,monospace]";
const typewriter =
  "[font-family:var(--font-special-elite),monospace]";

export function CaseCard({
  caseNumber,
  codename,
  location,
  summary,
  recommendedPlayers,
  difficulty,
  tabCount,
  docCount,
  suspectCount,
  href,
  onCtaClick,
  ctaBusy,
  isSolved,
  status,
}: CaseCardProps) {
  const active = status === "DOSYA AÇIK";
  const busy = Boolean(ctaBusy);
  const solved = Boolean(isSolved && active);

  return (
    <article
      className={`group relative flex flex-col overflow-hidden border border-[var(--kraft-dark)] bg-[var(--anthracite)] shadow-[var(--shadow)]${solved ? " case-card--solved" : ""}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-100"
        style={{
          background: active
            ? "radial-gradient(ellipse 90% 70% at 15% 0%, rgba(201, 180, 138, 0.14), transparent 55%), radial-gradient(ellipse 60% 50% at 100% 100%, rgba(107, 22, 32, 0.12), transparent 50%)"
            : "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(106, 102, 91, 0.15), transparent 55%)",
        }}
        aria-hidden
      />

      <div className="relative flex flex-1 flex-col p-6 md:p-8">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
          <p
            className={`${mono} text-[10px] uppercase tracking-[0.35em] text-[var(--kraft)]`}
          >
            Dosya №{caseNumber}
          </p>
          <p
            className={`${mono} flex flex-wrap items-center justify-end gap-2 text-[9px] uppercase tracking-[0.28em] ${
              active
                ? solved
                  ? "text-[var(--solved)]"
                  : "text-[var(--kraft)]"
                : "text-[var(--meta-label)]"
            }`}
          >
            {active ? (
              solved ? (
                <span className="case-solved-badge">✓ ÇÖZÜLDÜ</span>
              ) : (
                <>
                  <span aria-hidden>●</span>
                  DOSYA AÇIK
                </>
              )
            ) : (
              <>
                <span aria-hidden>○</span>
                {status}
              </>
            )}
          </p>
        </div>

        <h2
          className="mb-3 text-[clamp(2.5rem,6vw,4rem)] font-semibold italic leading-[0.98] text-[var(--paper)] [font-family:var(--font-cormorant),serif]"
        >
          {codename}
        </h2>

        <p
          className={`${typewriter} mb-4 text-[12px] uppercase tracking-[0.14em] text-[var(--subtitle-text)]`}
        >
          {location}
        </p>

        <p
          className={`${typewriter} mb-8 flex-1 text-[13px] leading-[1.75] tracking-[0.05em] text-[var(--body-text)]`}
        >
          {summary}
        </p>

        <p
          className={`${mono} mb-6 text-[9px] uppercase tracking-[0.22em] text-[var(--meta-label)]`}
        >
          Önerilen: {recommendedPlayers} analist · Zorluk: {difficulty}
        </p>

        <div
          className={`${mono} mb-4 border-t border-[var(--rule)] py-2 text-[10px] uppercase tracking-[0.22em] text-[var(--kraft-dark)]`}
        >
          {tabCount} SEKME · {docCount} BELGE · {suspectCount} ŞÜPHELİ
        </div>

        {active && href ? (
          onCtaClick ? (
            <button
              type="button"
              onClick={() => {
                if (busy) return;
                onCtaClick();
              }}
              disabled={busy}
              aria-busy={busy}
              className={`${mono} inline-flex w-full items-center justify-center border border-[var(--bordeaux-bright)] bg-[var(--bordeaux)] py-4 text-[10px] font-medium uppercase tracking-[0.26em] text-[var(--kraft-light)] transition-colors hover:bg-[var(--bordeaux-bright)] md:w-auto md:self-start md:px-10 ${busy ? "cursor-wait opacity-75" : "cursor-pointer"}`}
            >
              {busy ? "Yükleniyor..." : "Dosyayı aç →"}
            </button>
          ) : (
            <Link
              href={href}
              className={`${mono} inline-flex w-full items-center justify-center border border-[var(--bordeaux-bright)] bg-[var(--bordeaux)] py-4 text-[10px] font-medium uppercase tracking-[0.26em] text-[var(--kraft-light)] transition-colors hover:bg-[var(--bordeaux-bright)] md:w-auto md:self-start md:px-10`}
            >
              Dosyayı aç →
            </Link>
          )
        ) : (
          <div
            className={`${mono} flex w-full items-center justify-center border border-dashed border-[var(--rule)] py-4 text-[9px] uppercase tracking-[0.2em] text-[var(--meta-label)] md:w-auto md:self-start md:px-10`}
          >
            Kilitli
          </div>
        )}
      </div>
    </article>
  );
}
