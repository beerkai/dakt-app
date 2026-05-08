import Link from "next/link";

function SiteFooterLegalRow() {
  return (
    <div
      style={{
        fontSize: 9,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        opacity: 0.6,
        display: "flex",
        gap: 16,
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <Link
        href="/yasal/aydinlatma-metni"
        style={{ color: "inherit", textDecoration: "none" }}
      >
        Aydınlatma Metni
      </Link>
      <span aria-hidden>·</span>
      <Link
        href="/yasal/kullanim-kosullari"
        style={{ color: "inherit", textDecoration: "none" }}
      >
        Kullanım Koşulları
      </Link>
      <span aria-hidden>·</span>
      <Link
        href="/yasal/cerez-politikasi"
        style={{ color: "inherit", textDecoration: "none" }}
      >
        Çerez Politikası
      </Link>
    </div>
  );
}

function SiteFooterBrandRow() {
  return (
    <div style={{ marginBottom: 8 }}>
      D.A.K.T. ·{" "}
      <em lang="en">DIVISION OF ANALYTIC KNOWLEDGE &amp; TESTIMONIES</em> ·
      dakt.app ·{" "}
      <a
        href="https://instagram.com/dakt.app"
        target="_blank"
        rel="noopener noreferrer"
        className="foot-instagram"
      >
        @dakt.app
      </a>{" "}
      ·{" "}
      <a href="mailto:join@dakt.app" className="foot-email">
        join@dakt.app
      </a>
    </div>
  );
}

export default function SiteFooter({
  variant = "case",
}: {
  variant?: "case" | "marketing";
}) {
  if (variant === "marketing") {
    return (
      <footer className="relative z-[1] mt-auto border-t border-[var(--rule)] px-5 py-10 md:px-7">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 text-center md:text-left">
          <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--subtitle-text)] [font-family:var(--font-jetbrains-mono),monospace]">
            <SiteFooterBrandRow />
          </div>
          <SiteFooterLegalRow />
          <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--meta-label)] [font-family:var(--font-jetbrains-mono),monospace]">
            © 2026
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="foot">
      <SiteFooterBrandRow />
      <SiteFooterLegalRow />
    </footer>
  );
}
