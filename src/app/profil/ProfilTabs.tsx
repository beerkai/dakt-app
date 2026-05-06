"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const mono =
  "[font-family:var(--font-jetbrains-mono),ui-monospace,monospace]";

const tabs = [
  { href: "/profil", label: "Hesap", match: (p: string) => p === "/profil" },
  {
    href: "/profil/basarilar",
    label: "Başarılar",
    match: (p: string) => p.startsWith("/profil/basarilar"),
  },
  {
    href: "/profil/gecmis",
    label: "Geçmiş",
    match: (p: string) => p.startsWith("/profil/gecmis"),
  },
] as const;

export function ProfilTabs() {
  const pathname = usePathname();

  return (
    <div
      className={`sticky top-[var(--site-nav-offset)] z-[50] border-b border-[var(--rule)] bg-[var(--ink)]/95 backdrop-blur-sm ${mono}`}
    >
      <nav
        className="mx-auto flex max-w-[1440px] gap-0 px-5 md:px-7"
        aria-label="Profil bölümleri"
      >
        {tabs.map(({ href, label, match }) => {
          const active = match(pathname);
          return (
            <Link
              key={href}
              href={href}
              className={`relative px-4 py-3 text-[10px] font-medium uppercase tracking-[0.28em] transition-colors md:px-6 md:py-3.5 ${
                active
                  ? "text-[var(--kraft-light)]"
                  : "text-[var(--kraft-dark)] hover:text-[var(--kraft)]"
              }`}
            >
              {label}
              {active ? (
                <span
                  className="absolute bottom-0 left-3 right-3 h-0.5 bg-[var(--bordeaux-bright)] md:left-4 md:right-4"
                  aria-hidden
                />
              ) : null}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
