"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import {
  DAKT_GUEST_USERNAME_KEY,
  clearGuestUsername,
} from "@/lib/guest-session";

const mono =
  "[font-family:var(--font-jetbrains-mono),ui-monospace,monospace]";

export function SiteNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuSlideIn, setMenuSlideIn] = useState(false);
  const [guestUsername, setGuestUsername] = useState<string | null>(null);
  const [logoutToastKey, setLogoutToastKey] = useState(0);
  const [shareToastKey, setShareToastKey] = useState(0);

  const readGuest = useCallback(() => {
    try {
      const raw = localStorage.getItem(DAKT_GUEST_USERNAME_KEY);
      const v = raw?.trim();
      setGuestUsername(v && v.length > 0 ? v : null);
    } catch {
      setGuestUsername(null);
    }
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      readGuest();
    });
    function onStorage(e: StorageEvent) {
      if (e.key === DAKT_GUEST_USERNAME_KEY || e.key === null) readGuest();
    }
    function onLocalGuestChange() {
      readGuest();
    }
    window.addEventListener("storage", onStorage);
    window.addEventListener("dakt_guest_changed", onLocalGuestChange);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("dakt_guest_changed", onLocalGuestChange);
    };
  }, [pathname, readGuest]);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMenuOpen(false));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      setMenuSlideIn(false);
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setMenuSlideIn(true));
    });
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(id);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (logoutToastKey === 0) return;
    const id = window.setTimeout(() => setLogoutToastKey(0), 3000);
    return () => window.clearTimeout(id);
  }, [logoutToastKey]);

  useEffect(() => {
    if (shareToastKey === 0) return;
    const id = window.setTimeout(() => setShareToastKey(0), 3000);
    return () => window.clearTimeout(id);
  }, [shareToastKey]);

  const handleShare = useCallback(async () => {
    setMenuOpen(false);
    const url =
      typeof window !== "undefined" ? window.location.origin : "";
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title: "D.A.K.T. — Karaağaç Davası",
          text: "Bu vakayı çözmemde bana yardım eder misin?",
          url,
        });
        return;
      }
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setShareToastKey((n) => n + 1);
    } catch {
      /* ignore */
    }
  }, []);

  const handleLogout = useCallback(() => {
    clearGuestUsername();
    setGuestUsername(null);
    setLogoutToastKey((n) => n + 1);
    setMenuOpen(false);
  }, []);

  const closeMobileMenu = useCallback(() => setMenuOpen(false), []);

  const navMidLinkClass = `${mono} text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--kraft)] transition-colors duration-200 hover:text-[var(--bordeaux-bright)]`;

  const outlineBtn =
    "inline-flex shrink-0 items-center justify-center border border-[var(--kraft)] bg-transparent font-medium uppercase tracking-[0.2em] text-[var(--kraft-light)] transition-colors [font-family:var(--font-jetbrains-mono),ui-monospace,monospace] hover:border-[var(--kraft-light)] hover:bg-[var(--anthracite-2)]";

  const loggedIn = guestUsername !== null;
  const guestUpper = guestUsername?.toLocaleUpperCase("tr-TR") ?? "";

  return (
    <>
      <header
        className="sticky top-0 z-[200] border-b border-[var(--rule)] bg-[var(--ink)]/95 backdrop-blur-sm"
        style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.35)" }}
      >
        <div
          className={`mx-auto flex max-w-[1360px] items-center justify-between gap-6 px-4 py-2.5 md:px-7 md:py-3 ${mono}`}
        >
          {/* —— Masaüstü: sol —— */}
          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="/"
              title="Division of Analytic Knowledge & Testimonies"
              className="shrink-0 text-[22px] italic leading-none tracking-[0.4em] text-[var(--kraft)] [font-family:var(--font-cormorant),serif] transition-colors hover:text-[var(--kraft-light)]"
            >
              D.A.K.T.
            </Link>
            <Link
              href="/"
              className="shrink-0 text-[15px] font-normal leading-none text-[var(--kraft)] transition-colors hover:text-[var(--bordeaux-bright)]"
              aria-label="Ana sayfa"
            >
              /
            </Link>
          </div>

          {/* —— Masaüstü: orta —— */}
          <nav
            className="hidden items-center gap-6 md:flex"
            aria-label="Site bölümleri"
          >
            <Link href="/davalar" className={navMidLinkClass}>
              Davalar
            </Link>
            <Link href="/nasil-oynanir" className={navMidLinkClass}>
              Nasıl Oynanır
            </Link>
          </nav>

          {/* —— Masaüstü: sağ —— */}
          <div className="hidden items-center gap-4 md:flex">
            <button
              type="button"
              title="Bağlantıyı paylaş"
              onClick={() => void handleShare()}
              className="cursor-pointer border-0 bg-transparent p-0 text-[20px] leading-none text-[var(--kraft)] transition-colors duration-200 hover:text-[var(--bordeaux-bright)]"
              aria-label="Bağlantıyı paylaş"
            >
              ↗
            </button>

            {loggedIn ? (
              <button
                type="button"
                title="Çıkış yap"
                onClick={handleLogout}
                className={`inline-flex min-h-0 cursor-pointer items-center gap-2 rounded-none border border-[var(--kraft-dark)] bg-transparent px-3 py-1.5 transition-[border-color,box-shadow] hover:border-[var(--bordeaux-bright)] hover:shadow-[0_0_14px_rgba(168,36,47,0.28)] ${mono}`}
              >
                <span
                  className="site-nav-user-pulse shrink-0 rounded-full"
                  aria-hidden
                />
                <span className="max-w-[min(200px,18vw)] truncate text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--kraft)]">
                  {guestUsername}
                </span>
                <span
                  className="shrink-0 text-[14px] leading-none text-[var(--kraft-dark)]"
                  aria-hidden
                >
                  ×
                </span>
              </button>
            ) : (
              <Link
                href="/giris"
                className={`${outlineBtn} px-4 py-2.5 text-[10px]`}
              >
                Giriş Yap
              </Link>
            )}
          </div>

          {/* —— Mobil —— */}
          <div className="flex w-full min-w-0 items-center justify-between gap-4 md:hidden">
            <Link
              href="/"
              title="Division of Analytic Knowledge & Testimonies"
              className="min-w-0 shrink truncate text-[18px] italic tracking-[0.28em] text-[var(--kraft)] [font-family:var(--font-cormorant),serif]"
            >
              D.A.K.T.
            </Link>
            <div className="flex min-w-0 shrink-0 items-center gap-3">
              {loggedIn ? (
                <p
                  className={`m-0 flex max-w-[100px] min-w-0 items-center gap-1 ${mono} text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--kraft)]`}
                  title={guestUsername ?? undefined}
                >
                  <span
                    className="site-nav-user-pulse shrink-0 rounded-full"
                    aria-hidden
                  />
                  <span className="min-w-0 truncate">{guestUsername}</span>
                </p>
              ) : null}
              <button
                type="button"
                className="flex size-10 shrink-0 items-center justify-center border-0 bg-transparent text-[24px] leading-none text-[var(--kraft)] transition-colors hover:text-[var(--bordeaux-bright)]"
                aria-expanded={menuOpen}
                aria-controls="site-nav-mobile-overlay"
                aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
                onClick={() => setMenuOpen((v) => !v)}
              >
                ☰
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobil tam ekran menü */}
      {menuOpen ? (
        <div
          id="site-nav-mobile-overlay"
          className="fixed inset-0 z-[300] flex md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site menüsü"
        >
          <button
            type="button"
            className="min-h-0 min-w-0 flex-1 cursor-default border-0 bg-[var(--ink)]/98 p-0"
            aria-label="Menüyü kapat"
            onClick={closeMobileMenu}
          />
          <div
            className={`flex h-full min-h-0 w-[min(88vw,420px)] shrink-0 flex-col overflow-y-auto border-l border-[rgba(255,255,255,0.08)] bg-[var(--ink)] p-8 shadow-[-12px_0_40px_rgba(0,0,0,0.45)] transition-transform duration-300 ease-out ${
              menuSlideIn ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="m-0 text-[36px] italic leading-tight tracking-[0.12em] text-[var(--kraft)] [font-family:var(--font-cormorant),serif]">
                  D.A.K.T.
                </p>
                <p
                  lang="en"
                  className={`mt-3 max-w-[280px] text-[9px] font-medium uppercase leading-relaxed tracking-[0.14em] text-[var(--kraft-dark)] ${mono}`}
                >
                  Division of Analytic Knowledge &amp; Testimonies
                </p>
              </div>
              <button
                type="button"
                className="border-0 bg-transparent p-2 text-[22px] leading-none text-[var(--kraft)] transition-colors hover:text-[var(--bordeaux-bright)]"
                aria-label="Kapat"
                onClick={closeMobileMenu}
              >
                ×
              </button>
            </div>

            <div
              className="mb-6 border-b border-[rgba(255,255,255,0.1)]"
              aria-hidden
            />

            <nav className="flex flex-col" aria-label="Mobil gezinme">
              <Link
                href="/davalar"
                className={`border-0 border-b border-[rgba(255,255,255,0.06)] bg-transparent py-4 text-left text-[16px] font-medium uppercase tracking-[0.18em] text-[var(--kraft)] transition-colors hover:text-[var(--bordeaux-bright)] ${mono}`}
                onClick={closeMobileMenu}
              >
                ▸ Davalar
              </Link>
              <Link
                href="/nasil-oynanir"
                className={`border-0 border-b border-[rgba(255,255,255,0.06)] bg-transparent py-4 text-left text-[16px] font-medium uppercase tracking-[0.18em] text-[var(--kraft)] transition-colors hover:text-[var(--bordeaux-bright)] ${mono}`}
                onClick={closeMobileMenu}
              >
                ▸ Nasıl Oynanır
              </Link>
              <button
                type="button"
                className={`cursor-pointer border-0 border-b border-[rgba(255,255,255,0.06)] bg-transparent py-4 text-left text-[16px] font-medium uppercase tracking-[0.18em] text-[var(--kraft)] transition-colors hover:text-[var(--bordeaux-bright)] ${mono}`}
                onClick={() => void handleShare()}
              >
                ▸ Paylaş
              </button>
            </nav>

            <div
              className="mb-6 mt-2 border-b border-[rgba(255,255,255,0.1)]"
              aria-hidden
            />

            <div className="mt-auto flex flex-col gap-4 pt-4">
              {loggedIn ? (
                <>
                  <p
                    className={`m-0 text-center text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--meta-label)] ${mono}`}
                  >
                    ● ÇEVRİMİÇİ OLARAK: {guestUpper}
                  </p>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className={`${outlineBtn} w-full py-4 text-[11px]`}
                  >
                    Çıkış Yap
                  </button>
                </>
              ) : (
                <Link
                  href="/giris"
                  onClick={closeMobileMenu}
                  className={`inline-flex w-full items-center justify-center border border-[var(--bordeaux-bright)] bg-[var(--bordeaux)] py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--paper)] transition-colors [font-family:var(--font-jetbrains-mono),ui-monospace,monospace] hover:bg-[var(--bordeaux-bright)]`}
                >
                  Giriş Yap
                </Link>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {logoutToastKey > 0 ? (
        <div
          key={logoutToastKey}
          className="site-nav-logout-toast"
          role="status"
          aria-live="polite"
        >
          ● Çıkış yapıldı
        </div>
      ) : null}

      {shareToastKey > 0 ? (
        <div
          key={shareToastKey}
          className="site-nav-logout-toast"
          role="status"
          aria-live="polite"
        >
          ● Bağlantı kopyalandı
        </div>
      ) : null}
    </>
  );
}
