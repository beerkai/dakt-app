"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const GUEST_KEY = "dakt_guest_username";

function dispatchGuestChanged() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("dakt_guest_changed"));
}

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [guestUsername, setGuestUsername] = useState<string | null>(null);
  const [logoutToastKey, setLogoutToastKey] = useState(0);
  const [shareToastKey, setShareToastKey] = useState(0);

  const readGuest = useCallback(() => {
    try {
      const raw = localStorage.getItem(GUEST_KEY);
      const v = raw?.trim();
      setGuestUsername(v && v.length > 0 ? v : null);
    } catch {
      setGuestUsername(null);
    }
  }, []);

  useEffect(() => {
    readGuest();
    function onStorage(e: StorageEvent) {
      if (e.key === GUEST_KEY || e.key === null) readGuest();
    }
    function onLocalGuestChange() {
      readGuest();
    }
    window.addEventListener("storage", onStorage);
    window.addEventListener("dakt_guest_changed", onLocalGuestChange);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("dakt_guest_changed", onLocalGuestChange);
    };
  }, [pathname, readGuest]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

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
    setOpen(false);
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
    try {
      localStorage.removeItem(GUEST_KEY);
    } catch {
      /* ignore */
    }
    dispatchGuestChanged();
    setGuestUsername(null);
    setLogoutToastKey((n) => n + 1);
  }, []);

  const navLinkClass =
    "[font-family:var(--font-jetbrains-mono),ui-monospace,monospace] text-[10px] uppercase tracking-[0.22em] text-[var(--subtitle-text)] transition-colors hover:text-[var(--kraft-light)] md:py-0 py-3 border-b border-[var(--rule)] md:border-b-0 last:border-b-0";

  const shareNavBtnClass =
    "[font-family:var(--font-jetbrains-mono),ui-monospace,monospace] cursor-pointer border-0 bg-transparent text-left text-[10px] uppercase tracking-[0.22em] text-[var(--kraft)] transition-colors duration-200 ease-in-out hover:text-[var(--bordeaux-bright)] md:py-0 py-3 border-b border-[var(--rule)] md:border-b-0 w-full md:w-auto";

  const outlineBtn =
    "inline-flex shrink-0 items-center justify-center border border-[var(--kraft)] bg-transparent font-medium uppercase tracking-[0.2em] text-[var(--kraft-light)] transition-colors [font-family:var(--font-jetbrains-mono),ui-monospace,monospace] hover:border-[var(--kraft-light)] hover:bg-[var(--anthracite-2)]";

  const loggedIn = guestUsername !== null;

  return (
    <>
      <header
        className="sticky top-0 z-[200] border-b border-[var(--rule)] bg-[var(--ink)]/95 backdrop-blur-sm"
        style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.35)" }}
      >
        <div className="mx-auto flex max-w-[1280px] items-center gap-3 px-4 py-2.5 md:gap-4 md:px-7 md:py-3">
          <Link
            href="/"
            className="shrink-0 [font-family:var(--font-cormorant),serif] text-xl italic tracking-[0.12em] text-[var(--kraft)] md:text-2xl md:tracking-[0.18em]"
          >
            D.A.K.T.
          </Link>

          <p className="hidden min-w-0 flex-1 md:block">
            <span className="block max-w-[280px] text-[9px] uppercase leading-snug tracking-[0.14em] text-[var(--meta-label)] [font-family:var(--font-jetbrains-mono),ui-monospace,monospace]">
              Division of Analytic Knowledge &amp; Testimonies
            </span>
          </p>

          <div className="hidden flex-1 md:block" aria-hidden />

          <nav
            className="hidden items-center gap-7 md:flex"
            aria-label="Site bölümleri"
          >
            <Link href="/davalar" className={navLinkClass}>
              Davalar
            </Link>
            <Link href="/nasil-oynanir" className={navLinkClass}>
              Nasıl Oynanır
            </Link>
            <button
              type="button"
              onClick={() => void handleShare()}
              className={shareNavBtnClass}
            >
              Paylaş
            </button>
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            {loggedIn ? (
              <>
                <p
                  className="flex max-w-[min(280px,32vw)] items-center gap-1.5 text-[10px] uppercase tracking-[0.1em] text-[var(--body-text)] [font-family:var(--font-jetbrains-mono),monospace]"
                  title={guestUsername ?? undefined}
                >
                  <span
                    className="inline-block size-2 shrink-0 rounded-full bg-[#c42b36] shadow-[0_0_10px_rgba(196,43,54,0.85)]"
                    aria-hidden
                  />
                  <span className="min-w-0 truncate">{guestUsername}</span>
                  <span className="shrink-0">· ÇEVRİMİÇİ</span>
                </p>
                <button
                  type="button"
                  onClick={handleLogout}
                  className={`${outlineBtn} px-3 py-2 text-[9px]`}
                >
                  Çıkış Yap
                </button>
              </>
            ) : (
              <>
                <p
                  className="flex items-center gap-1.5 whitespace-nowrap text-[11px] tracking-[0.08em] text-[var(--body-text)] [font-family:var(--font-special-elite),monospace]"
                  title="Çevrimiçi analistler"
                >
                  <span
                    className="inline-block size-2 shrink-0 rounded-full bg-[#c42b36] shadow-[0_0_10px_rgba(196,43,54,0.85)]"
                    aria-hidden
                  />
                  1 Analist Çevrimiçi
                </p>
                <Link
                  href="/giris"
                  className="inline-flex items-center justify-center border border-[var(--kraft)] bg-transparent px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.24em] text-[var(--kraft-light)] transition-colors [font-family:var(--font-jetbrains-mono),ui-monospace,monospace] hover:border-[var(--kraft-light)] hover:bg-[var(--anthracite-2)]"
                >
                  Giriş Yap
                </Link>
                <Link
                  href="/giris"
                  className="inline-flex items-center justify-center border border-[var(--bordeaux-bright)] bg-[var(--bordeaux)] px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.24em] text-[var(--paper)] transition-colors [font-family:var(--font-jetbrains-mono),ui-monospace,monospace] hover:bg-[var(--bordeaux-bright)]"
                >
                  Kayıt Ol
                </Link>
              </>
            )}
          </div>

          {/* Mobile */}
          <div className="flex flex-1 items-center justify-end gap-2 md:hidden">
            {loggedIn ? (
              <>
                <p
                  className="flex min-w-0 max-w-[42vw] items-center gap-1 text-[9px] uppercase tracking-[0.08em] text-[var(--body-text)] [font-family:var(--font-jetbrains-mono),monospace]"
                  title={guestUsername ?? undefined}
                >
                  <span
                    className="inline-block size-1.5 shrink-0 rounded-full bg-[#c42b36]"
                    aria-hidden
                  />
                  <span className="min-w-0 truncate">{guestUsername}</span>
                  <span className="shrink-0">· ÇEVRİMİÇİ</span>
                </p>
                <button
                  type="button"
                  onClick={handleLogout}
                  className={`${outlineBtn} px-2 py-1.5 text-[8px] tracking-[0.14em]`}
                >
                  ÇIKIŞ
                </button>
              </>
            ) : (
              <>
                <p className="flex items-center gap-1 text-[10px] tracking-[0.06em] text-[var(--body-text)] [font-family:var(--font-special-elite),monospace]">
                  <span
                    className="inline-block size-1.5 shrink-0 rounded-full bg-[#c42b36]"
                    aria-hidden
                  />
                  <span className="whitespace-nowrap">1 Analist</span>
                </p>
                <Link
                  href="/giris"
                  className="inline-flex shrink-0 items-center border border-[var(--kraft)] px-2.5 py-1.5 text-[9px] uppercase tracking-[0.18em] text-[var(--kraft-light)] [font-family:var(--font-jetbrains-mono),ui-monospace,monospace]"
                >
                  Giriş
                </Link>
              </>
            )}
            <button
              type="button"
              onClick={() => void handleShare()}
              className="flex size-10 shrink-0 items-center justify-center border border-[var(--rule)] text-lg leading-none text-[var(--kraft)] transition-colors duration-200 ease-in-out [font-family:var(--font-jetbrains-mono),monospace] hover:border-[var(--kraft-dark)] hover:text-[var(--bordeaux-bright)]"
              aria-label="Paylaş"
            >
              ↗
            </button>
            <button
              type="button"
              className="flex size-10 shrink-0 items-center justify-center border border-[var(--rule)] text-[var(--kraft)] [font-family:var(--font-jetbrains-mono),monospace] hover:bg-[var(--anthracite-2)]"
              aria-expanded={open}
              aria-controls="site-nav-mobile-panel"
              aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {open ? (
          <div
            id="site-nav-mobile-panel"
            className="border-t border-[var(--rule)] bg-[var(--anthracite)] px-4 py-2 md:hidden"
          >
            <nav
              className="mx-auto flex max-w-[1280px] flex-col"
              aria-label="Mobil menü"
            >
              <Link href="/davalar" className={navLinkClass}>
                Davalar
              </Link>
              <Link href="/nasil-oynanir" className={navLinkClass}>
                Nasıl Oynanır
              </Link>
              <button
                type="button"
                onClick={() => void handleShare()}
                className={shareNavBtnClass}
              >
                Paylaş
              </button>
            </nav>
            <div className="mx-auto flex max-w-[1280px] flex-col gap-2 border-t border-[var(--rule)] pt-3 pb-4">
              {loggedIn ? (
                <button
                  type="button"
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="inline-flex w-full items-center justify-center border border-[var(--kraft)] py-3 text-[10px] font-medium uppercase tracking-[0.24em] text-[var(--kraft-light)] [font-family:var(--font-jetbrains-mono),ui-monospace,monospace]"
                >
                  Çıkış Yap
                </button>
              ) : (
                <>
                  <Link
                    href="/giris"
                    className="inline-flex w-full items-center justify-center border border-[var(--kraft)] py-3 text-[10px] uppercase tracking-[0.24em] text-[var(--kraft-light)] [font-family:var(--font-jetbrains-mono),ui-monospace,monospace]"
                  >
                    Giriş Yap
                  </Link>
                  <Link
                    href="/giris"
                    className="inline-flex w-full items-center justify-center border border-[var(--bordeaux-bright)] bg-[var(--bordeaux)] py-3 text-[10px] uppercase tracking-[0.24em] text-[var(--paper)] [font-family:var(--font-jetbrains-mono),ui-monospace,monospace]"
                  >
                    Kayıt Ol
                  </Link>
                </>
              )}
            </div>
          </div>
        ) : null}
      </header>

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
