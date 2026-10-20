"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { MouseEvent as ReactMouseEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { leaveRoom } from "@/app/oda/actions";
import ConfirmModal from "@/components/ConfirmModal";
import { useAuth } from "@/components/AuthProvider";
import { UserDropdown } from "@/components/UserDropdown";
import { ANALYST_COLOR_HEX } from "@/lib/colors";
import { clearActiveSession, getActiveSession } from "@/lib/active-session";
import {
  DAKT_GUEST_USERNAME_KEY,
  DAKT_USER_COLOR_KEY,
  clearGuestUsername,
  readGuestColor,
} from "@/lib/guest-session";
import type { AnalystColor, Profile } from "@/lib/supabase/types";

const mono =
  "[font-family:var(--font-jetbrains-mono),ui-monospace,monospace]";

export function SiteNav() {
  const pathname = usePathname();
  const router = useRouter();
  const {
    user,
    profile,
    loading: authLoading,
    signingOut,
    signOutAndRedirect,
  } = useAuth();
  const [stableProfile, setStableProfile] = useState<Profile | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const accountMenuDesktopRef = useRef<HTMLDivElement>(null);
  const accountMenuMobileRef = useRef<HTMLDivElement>(null);
  const [menuSlideIn, setMenuSlideIn] = useState(false);
  const [guestUsername, setGuestUsername] = useState<string | null>(null);
  const [guestColor, setGuestColor] = useState<AnalystColor | null>(null);
  const [shareToastKey, setShareToastKey] = useState(0);
  const [welcomeToastKey, setWelcomeToastKey] = useState(0);
  const [welcomeTransferCount, setWelcomeTransferCount] = useState(0);
  const [exitModalOpen, setExitModalOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [farewellVisible, setFarewellVisible] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const [exitIsCoop, setExitIsCoop] = useState(false);

  const isInCase = pathname?.startsWith("/vaka/") ?? false;
  const isInLobby =
    Boolean(pathname?.startsWith("/oda/") && !pathname.includes("/katil"));

  const readGuest = useCallback(() => {
    try {
      const raw = localStorage.getItem(DAKT_GUEST_USERNAME_KEY);
      const v = raw?.trim();
      setGuestUsername(v && v.length > 0 ? v : null);
      setGuestColor(readGuestColor());
    } catch {
      setGuestUsername(null);
      setGuestColor(null);
    }
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      readGuest();
    });
    function onStorage(e: StorageEvent) {
      if (
        e.key === DAKT_GUEST_USERNAME_KEY ||
        e.key === DAKT_USER_COLOR_KEY ||
        e.key === null
      ) {
        readGuest();
      }
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
    if (signingOut) {
      setStableProfile(null);
      return;
    }

    if (user && profile) {
      setStableProfile(profile);
    }

    if (!user && !authLoading) {
      setStableProfile(null);
    }
  }, [user, profile, authLoading, signingOut]);

  useEffect(() => {
    if (menuOpen) setAccountMenuOpen(false);
  }, [menuOpen]);

  useEffect(() => {
    if (!accountMenuOpen) return;
    function handleClickOutside(e: MouseEvent) {
      const t = e.target as Node;
      const inDesktop = accountMenuDesktopRef.current?.contains(t);
      const inMobile = accountMenuMobileRef.current?.contains(t);
      if (!inDesktop && !inMobile) {
        setAccountMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [accountMenuOpen]);

  useEffect(() => {
    if (!accountMenuOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setAccountMenuOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [accountMenuOpen]);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setMenuOpen(false);
      setAccountMenuOpen(false);
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("dakt_welcome_transfer");
      if (raw) {
        const n = parseInt(raw, 10);
        sessionStorage.removeItem("dakt_welcome_transfer");
        if (Number.isFinite(n) && n > 0) {
          setWelcomeTransferCount(n);
          setWelcomeToastKey((k) => k + 1);
        }
      }
    } catch {
      /* ignore */
    }
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
    if (shareToastKey === 0) return;
    const id = window.setTimeout(() => setShareToastKey(0), 3000);
    return () => window.clearTimeout(id);
  }, [shareToastKey]);

  useEffect(() => {
    if (welcomeToastKey === 0) return;
    const id = window.setTimeout(() => setWelcomeToastKey(0), 5000);
    return () => window.clearTimeout(id);
  }, [welcomeToastKey]);

  const handleShare = useCallback(async () => {
    setMenuOpen(false);
    setAccountMenuOpen(false);
    const url =
      typeof window !== "undefined" ? window.location.origin : "";
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title: "D.A.K.T. — Polisiye analiz oyunu",
          text: "Birlikte bir vaka çözelim mi?",
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
    setMenuOpen(false);
    setAccountMenuOpen(false);
    setLogoutModalOpen(true);
  }, []);

  async function handleConfirmLogout() {
    setLogoutModalOpen(false);

    clearGuestUsername();
    clearActiveSession();
    window.dispatchEvent(new Event("dakt-session-change"));
    window.dispatchEvent(new Event("dakt_guest_changed"));

    setFarewellVisible(true);

    window.setTimeout(() => {
      void (async () => {
        await signOutAndRedirect();
        setFarewellVisible(false);
        setStableProfile(null);
      })();
    }, 1500);
  }

  const closeMobileMenu = useCallback(() => setMenuOpen(false), []);

  function handleNavClick(e: ReactMouseEvent<HTMLAnchorElement>, href: string) {
    if (!isInCase && !isInLobby) return;
    e.preventDefault();
    setAccountMenuOpen(false);
    setMenuOpen(false);
    setExitIsCoop(getActiveSession()?.mode === "coop");
    setPendingHref(href);
    setExitModalOpen(true);
  }

  const handleTakeBreak = useCallback(() => {
    if (pendingHref) {
      router.push(pendingHref);
    }
    setPendingHref(null);
    setExitModalOpen(false);
  }, [pendingHref, router]);

  const handlePermanentExit = useCallback(async () => {
    const session = getActiveSession();
    const href = pendingHref;

    if (session?.mode === "coop" && session.roomId) {
      try {
        const result = await leaveRoom(session.roomId);
        if (result && "error" in result && result.error) {
           
          console.error("Leave room error:", result.error);
        }
      } catch (err) {
         
        console.error("Leave room error:", err);
      }
    }

    clearActiveSession();
    window.dispatchEvent(new Event("dakt-session-change"));

    if (href) {
      router.push(href);
    }
  }, [pendingHref, router]);

  const navMidLinkClass = `${mono} text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--kraft)] transition-colors duration-200 hover:text-[var(--bordeaux-bright)]`;

  const outlineBtn =
    "inline-flex shrink-0 items-center justify-center border border-[var(--kraft)] bg-transparent font-medium uppercase tracking-[0.2em] text-[var(--kraft-light)] transition-colors [font-family:var(--font-jetbrains-mono),ui-monospace,monospace] hover:border-[var(--kraft-light)] hover:bg-[var(--anthracite-2)]";

  const primaryBtn =
    "inline-flex shrink-0 items-center justify-center border border-[var(--bordeaux-bright)] bg-[var(--bordeaux)] font-medium uppercase tracking-[0.2em] text-[var(--kraft-light)] transition-colors [font-family:var(--font-jetbrains-mono),ui-monospace,monospace] hover:bg-[var(--bordeaux-bright)]";

  const isRegistered = Boolean(user);
  const effectiveProfile = profile ?? stableProfile;
  const showUserChip = isRegistered || guestUsername !== null;
  const displayName =
    effectiveProfile?.username ??
    (user?.email ? (user.email.split("@")[0] ?? user.email) : null) ??
    guestUsername ??
    "";
  const analystColor = effectiveProfile?.color ?? guestColor;
  const roleLabel = isRegistered ? "ANALIST" : "MİSAFİR";
  const guestUpper = guestUsername?.toLocaleUpperCase("tr-TR") ?? "";
  const identityUpper = displayName.toLocaleUpperCase("tr-TR");

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
              onClick={(e) => handleNavClick(e, "/")}
            >
              D.A.K.T.
            </Link>
            <Link
              href="/"
              className="shrink-0 text-[15px] font-normal leading-none text-[var(--kraft)] transition-colors hover:text-[var(--bordeaux-bright)]"
              aria-label="Ana sayfa"
              onClick={(e) => handleNavClick(e, "/")}
            >
              /
            </Link>
          </div>

          {/* —— Masaüstü: orta —— */}
          <nav
            className="hidden items-center gap-6 md:flex"
            aria-label="Site bölümleri"
          >
            <Link
              href="/davalar"
              className={navMidLinkClass}
              onClick={(e) => handleNavClick(e, "/davalar")}
            >
              Davalar
            </Link>
            <Link
              href="/nasil-oynanir"
              className={navMidLinkClass}
              onClick={(e) => handleNavClick(e, "/nasil-oynanir")}
            >
              Nasıl Oynanır
            </Link>
          </nav>

          {/* —— Masaüstü: sağ —— */}
          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              title="Bağlantıyı paylaş"
              onClick={() => void handleShare()}
              className="cursor-pointer border-0 bg-transparent p-0 text-[20px] leading-none text-[var(--kraft)] transition-colors duration-200 hover:text-[var(--bordeaux-bright)]"
              aria-label="Bağlantıyı paylaş"
            >
              ↗
            </button>

            {isRegistered ? (
              effectiveProfile ? (
                <div className="relative" ref={accountMenuDesktopRef}>
                  <button
                    type="button"
                    aria-expanded={accountMenuOpen}
                    aria-haspopup="menu"
                    onClick={() => setAccountMenuOpen((v) => !v)}
                    className={`inline-flex min-h-0 cursor-pointer items-center gap-2 rounded-none border border-[var(--kraft-dark)] bg-transparent px-3 py-1.5 transition-[border-color,box-shadow] hover:border-[var(--bordeaux-bright)] hover:shadow-[0_0_14px_rgba(168,36,47,0.28)] ${mono}`}
                  >
                    <span
                      className="site-nav-user-pulse shrink-0 rounded-full site-nav-user-pulse--analist"
                      aria-hidden
                    />
                    {analystColor ? (
                      <span
                        className="size-2 shrink-0 rounded-sm border border-[var(--rule)]"
                        style={{
                          backgroundColor: ANALYST_COLOR_HEX[analystColor],
                        }}
                        aria-hidden
                      />
                    ) : null}
                    <span className="max-w-[min(200px,18vw)] truncate text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--kraft)]">
                      {effectiveProfile.username}
                    </span>
                    <span
                      className="shrink-0 text-[10px] leading-none text-[var(--kraft-dark)]"
                      aria-hidden
                    >
                      ▾
                    </span>
                  </button>
                  {accountMenuOpen ? (
                    <UserDropdown
                      profile={effectiveProfile}
                      email={user?.email}
                      onClose={() => setAccountMenuOpen(false)}
                      onRequestSignOut={() => setLogoutModalOpen(true)}
                      onBeforeProfileNav={(e, href) =>
                        handleNavClick(e, href)
                      }
                    />
                  ) : null}
                </div>
              ) : (
                <span
                  className="inline-block shrink-0 align-middle"
                  style={{ width: 120, minHeight: 36 }}
                  aria-hidden
                />
              )
            ) : guestUsername ? (
              <div className="group relative inline-flex min-h-0 items-center">
                <button
                  type="button"
                  title={roleLabel}
                  onClick={handleLogout}
                  className={`inline-flex min-h-0 cursor-pointer items-center gap-2 rounded-none border border-[var(--kraft-dark)] bg-transparent px-3 py-1.5 transition-[border-color,box-shadow] hover:border-[var(--bordeaux-bright)] hover:shadow-[0_0_14px_rgba(168,36,47,0.28)] ${mono}`}
                >
                  <span
                    className="site-nav-user-pulse shrink-0 rounded-full site-nav-user-pulse--misafir"
                    aria-hidden
                  />
                  {analystColor ? (
                    <span
                      className="size-2 shrink-0 rounded-sm border border-[var(--rule)]"
                      style={{
                        backgroundColor: ANALYST_COLOR_HEX[analystColor],
                      }}
                      title={analystColor}
                      aria-hidden
                    />
                  ) : null}
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
                <span className="site-nav-live-tooltip">{roleLabel}</span>
              </div>
            ) : !authLoading ? (
              <>
                <Link
                  href="/giris"
                  className={`${outlineBtn} px-4 py-2.5 text-[10px]`}
                >
                  Giriş Yap
                </Link>
                <Link
                  href="/giris?tab=kayit"
                  className={`${primaryBtn} px-4 py-2.5 text-[10px]`}
                >
                  Kayıt Ol
                </Link>
              </>
            ) : (
              <span
                className="inline-block shrink-0"
                style={{ width: 168, minHeight: 36 }}
                aria-hidden
              />
            )}
          </div>

          {/* —— Mobil —— */}
          <div className="flex w-full min-w-0 items-center justify-between gap-4 md:hidden">
            <Link
              href="/"
              title="Division of Analytic Knowledge & Testimonies"
              className="min-w-0 shrink truncate text-[18px] italic tracking-[0.28em] text-[var(--kraft)] [font-family:var(--font-cormorant),serif]"
              onClick={(e) => handleNavClick(e, "/")}
            >
              D.A.K.T.
            </Link>
            <div className="flex min-w-0 shrink-0 items-center gap-3">
              {isRegistered ? (
                effectiveProfile ? (
                  <div className="relative" ref={accountMenuMobileRef}>
                    <button
                      type="button"
                      aria-expanded={accountMenuOpen}
                      aria-haspopup="menu"
                      onClick={() => setAccountMenuOpen((v) => !v)}
                      className={`group relative m-0 flex max-w-[120px] min-w-0 cursor-pointer items-center gap-1 border border-[var(--kraft-dark)] bg-transparent px-2 py-1 text-left ${mono} text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--kraft)]`}
                      title={effectiveProfile.username}
                    >
                      <span
                        className="site-nav-user-pulse shrink-0 rounded-full site-nav-user-pulse--analist"
                        aria-hidden
                      />
                      {analystColor ? (
                        <span
                          className="size-1.5 shrink-0 rounded-sm border border-[var(--rule)]"
                          style={{
                            backgroundColor: ANALYST_COLOR_HEX[analystColor],
                          }}
                          aria-hidden
                        />
                      ) : null}
                      <span className="min-w-0 truncate">
                        {effectiveProfile.username}
                      </span>
                      <span className="shrink-0 text-[9px] text-[var(--kraft-dark)]" aria-hidden>
                        ▾
                      </span>
                    </button>
                    {accountMenuOpen ? (
                      <UserDropdown
                        profile={effectiveProfile}
                        email={user?.email}
                        onClose={() => setAccountMenuOpen(false)}
                        onRequestSignOut={() => setLogoutModalOpen(true)}
                        onBeforeProfileNav={(e, href) =>
                          handleNavClick(e, href)
                        }
                      />
                    ) : null}
                  </div>
                ) : (
                  <span
                    className="inline-block shrink-0"
                    style={{ width: 96, minHeight: 28 }}
                    aria-hidden
                  />
                )
              ) : guestUsername ? (
                <p
                  className={`group relative m-0 flex max-w-[100px] min-w-0 items-center gap-1 ${mono} text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--kraft)]`}
                  title={guestUsername}
                >
                  <span
                    className="site-nav-user-pulse shrink-0 rounded-full site-nav-user-pulse--misafir"
                    aria-hidden
                  />
                  {analystColor ? (
                    <span
                      className="size-1.5 shrink-0 rounded-sm border border-[var(--rule)]"
                      style={{
                        backgroundColor: ANALYST_COLOR_HEX[analystColor],
                      }}
                      aria-hidden
                    />
                  ) : null}
                  <span className="min-w-0 truncate">{guestUsername}</span>
                  <span className="site-nav-live-tooltip">{roleLabel}</span>
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
                onClick={(e) => {
                  handleNavClick(e, "/davalar");
                  closeMobileMenu();
                }}
              >
                ▸ Davalar
              </Link>
              <Link
                href="/nasil-oynanir"
                className={`border-0 border-b border-[rgba(255,255,255,0.06)] bg-transparent py-4 text-left text-[16px] font-medium uppercase tracking-[0.18em] text-[var(--kraft)] transition-colors hover:text-[var(--bordeaux-bright)] ${mono}`}
                onClick={(e) => {
                  handleNavClick(e, "/nasil-oynanir");
                  closeMobileMenu();
                }}
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
              {isRegistered && effectiveProfile ? (
                <Link
                  href="/profil"
                  className={`border-0 border-b border-[rgba(255,255,255,0.06)] bg-transparent py-4 text-left text-[16px] font-medium uppercase tracking-[0.18em] text-[var(--kraft)] transition-colors hover:text-[var(--bordeaux-bright)] ${mono}`}
                  onClick={(e) => {
                    handleNavClick(e, "/profil");
                    closeMobileMenu();
                  }}
                >
                  ▸ Profilim
                </Link>
              ) : null}
            </nav>

            <div
              className="mb-6 mt-2 border-b border-[rgba(255,255,255,0.1)]"
              aria-hidden
            />

            <div className="mt-auto flex flex-col gap-4 pt-4">
              {showUserChip ? (
                <>
                  <p
                    className={`m-0 text-center text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--meta-label)] ${mono}`}
                  >
                    ● ÇEVRİMİÇİ OLARAK:{" "}
                    {isRegistered ? identityUpper : guestUpper}
                  </p>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className={`${outlineBtn} w-full py-4 text-[11px]`}
                  >
                    Çıkış Yap
                  </button>
                </>
              ) : !authLoading ? (
                <div className="flex flex-col gap-3">
                  <Link
                    href="/giris"
                    onClick={closeMobileMenu}
                    className={`${outlineBtn} w-full py-4 text-[11px]`}
                  >
                    Giriş Yap
                  </Link>
                  <Link
                    href="/giris?tab=kayit"
                    onClick={closeMobileMenu}
                    className={`${primaryBtn} w-full py-4 text-[11px]`}
                  >
                    Kayıt Ol
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      {welcomeToastKey > 0 ? (
        <div
          key={welcomeToastKey}
          className="site-nav-logout-toast"
          role="status"
          aria-live="polite"
        >
          ● Hoş geldin! Misafirken çözdüğün {welcomeTransferCount} vaka hesabına
          aktarıldı.
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

      <ConfirmModal
        open={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
        title="Çıkış yapmak istediğine emin misin?"
        description="Oturumun kapatılacak. Yarım kalan vakaların ve oda üyeliklerin korunmaz, dosyaların kalır."
        confirmText="Çıkış Yap"
        cancelText="Vazgeç"
        variant="warning"
      />

      {farewellVisible ? (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center"
          style={{
            background: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(8px)",
            animation: "fadeIn 0.3s ease",
          }}
          aria-live="polite"
        >
          <div
            style={{
              background: "var(--anthracite)",
              border: "1px solid var(--bordeaux)",
              padding: "40px 48px",
              maxWidth: 460,
              textAlign: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-1px",
                left: "-1px",
                width: 24,
                height: 24,
                borderTop: "3px solid var(--bordeaux-bright)",
                borderLeft: "3px solid var(--bordeaux-bright)",
              }}
            />

            <div
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: 10,
                letterSpacing: "0.3em",
                color: "var(--kraft-dark)",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              ◉ OTURUM KAPATILIYOR
            </div>

            <div
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontStyle: "italic",
                fontSize: 28,
                color: "var(--paper)",
                lineHeight: 1.3,
                marginBottom: 12,
              }}
            >
              Görüşürüz, Analist.
            </div>

            <div
              style={{
                fontFamily: "var(--font-special-elite), monospace",
                fontSize: 13,
                color: "var(--kraft-light)",
                opacity: 0.8,
              }}
            >
              Dosyaların güvende.
            </div>
          </div>
        </div>
      ) : null}

      <ConfirmModal
        open={exitModalOpen}
        onClose={() => {
          setExitModalOpen(false);
          setPendingHref(null);
        }}
        onConfirm={handleTakeBreak}
        title={
          exitIsCoop ? "Vakadan ayrılıyor musun?" : "Vakadan çıkıyor musun?"
        }
        description={
          exitIsCoop
            ? "Mola: oda devam eder, kolayca dönersin. Ayrıl: kod ile tekrar katılırsın."
            : "Mola: chip ile geri gelirsin. Çık: davalardan baştan girersin."
        }
        confirmText="Biraz Mola"
        altActionText={exitIsCoop ? "Vakadan Ayrıl" : "Çık"}
        onAltAction={handlePermanentExit}
        altActionVariant="danger"
        cancelText="Vakaya Geri Dön"
        variant="warning"
      />
    </>
  );
}
