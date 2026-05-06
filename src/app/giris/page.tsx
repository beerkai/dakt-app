"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  DAKT_GUEST_USERNAME_KEY,
  clearGuestUsername,
  writeGuestUsername,
} from "@/lib/guest-session";

type Tab = "misafir" | "kayit" | "giris";

const tabBtn =
  "[font-family:var(--font-jetbrains-mono),ui-monospace,monospace] flex-1 border px-3 py-3 text-[9px] font-medium uppercase tracking-[0.18em] transition-colors sm:flex-none sm:px-5";

const labelMono =
  "mb-2 block text-[9px] uppercase tracking-[0.22em] text-[var(--meta-label)] [font-family:var(--font-jetbrains-mono),monospace]";

const inputClass =
  "w-full border border-[var(--kraft-dark)] bg-[var(--anthracite)] px-4 py-3 text-[13px] text-[var(--body-text)] [font-family:var(--font-special-elite),monospace] placeholder:text-[var(--meta-label)] focus:border-[var(--kraft)] focus:outline-none";

export default function GirisPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("misafir");
  const [guestName, setGuestName] = useState("");
  const [guestError, setGuestError] = useState(false);
  const [sessionGuest, setSessionGuest] = useState<string | null>(null);

  useEffect(() => {
    function readSession() {
      try {
        const v = localStorage.getItem(DAKT_GUEST_USERNAME_KEY)?.trim();
        if (v && v.length > 0) {
          setSessionGuest(v);
          setGuestName(v);
        } else {
          setSessionGuest(null);
          setGuestName("");
        }
      } catch {
        setSessionGuest(null);
        setGuestName("");
      }
    }
    readSession();
    function onStorage(e: StorageEvent) {
      if (e.key === DAKT_GUEST_USERNAME_KEY || e.key === null) readSession();
    }
    function onLocalGuestChange() {
      readSession();
    }
    window.addEventListener("storage", onStorage);
    window.addEventListener("dakt_guest_changed", onLocalGuestChange);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("dakt_guest_changed", onLocalGuestChange);
    };
  }, []);

  function clearGuestSession() {
    clearGuestUsername();
    setSessionGuest(null);
    setGuestName("");
  }

  function handleGuestContinue() {
    const t = guestName.trim();
    if (!t) {
      setGuestError(true);
      return;
    }
    setGuestError(false);
    writeGuestUsername(t);
    router.push("/davalar");
  }

  return (
    <div className="relative z-[1] mx-auto w-full max-w-[480px] flex-1 px-5 py-10 md:px-7 md:py-14">
      <div
        className="mb-10 flex flex-col gap-2 border border-[var(--rule)] sm:flex-row sm:flex-wrap sm:gap-0"
        role="tablist"
        aria-label="Erişim seçenekleri"
      >
        {(
          [
            ["misafir", "Misafir"],
            ["kayit", "Kayıt Ol"],
            ["giris", "Giriş Yap"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            id={`tab-${id}`}
            aria-controls={`panel-${id}`}
            className={`${tabBtn} ${
              tab === id
                ? "border-[var(--kraft)] bg-[var(--anthracite-2)] text-[var(--kraft-light)]"
                : "border-[var(--rule)] bg-transparent text-[var(--subtitle-text)] hover:border-[var(--kraft-dark)] hover:text-[var(--body-text)]"
            }`}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "misafir" && (
        <section
          id="panel-misafir"
          role="tabpanel"
          aria-labelledby="tab-misafir"
        >
          <h1 className="mb-3 text-3xl font-semibold text-[var(--paper)] [font-family:var(--font-cormorant),serif] md:text-4xl">
            Hızlıca Başla
          </h1>
          <p className="mb-8 text-[13px] leading-relaxed tracking-[0.05em] text-[var(--subtitle-text)] [font-family:var(--font-special-elite),monospace]">
            Bir analist takma adı seç, vakaya gir. Hesap oluşturmaya gerek yok.
          </p>

          <div className="mb-8 border-2 border-[var(--bordeaux)] bg-[var(--paper-dim)] p-4 text-[12px] leading-[1.75] tracking-[0.04em] text-[var(--ink)] [font-family:var(--font-special-elite),monospace]">
            ⓘ Misafir oyuncuların ilerlemesi 24 saat sonra silinir. Kalıcı kayıt
            için hesap oluştur.
          </div>

          <div className="mb-6">
            <label htmlFor="guest-name" className={labelMono}>
              Analist takma adın
            </label>
            <input
              id="guest-name"
              type="text"
              name="guestName"
              autoComplete="nickname"
              placeholder="örn: KAI-042"
              value={guestName}
              onChange={(e) => {
                setGuestName(e.target.value);
                setGuestError(false);
              }}
              className={`${inputClass} ${guestError ? "border-[var(--bordeaux-bright)]" : ""}`}
            />
            {guestError ? (
              <p className="mt-2 text-[11px] tracking-[0.06em] text-[var(--bordeaux-bright)] [font-family:var(--font-jetbrains-mono),monospace]">
                Lütfen bir takma ad gir.
              </p>
            ) : null}
          </div>

          {sessionGuest ? (
            <div className="mb-6 border-2 border-[var(--bordeaux)] bg-[var(--anthracite-2)] p-4 md:p-5">
              <p className="text-[12px] leading-[1.75] tracking-[0.05em] text-[var(--body-text)] [font-family:var(--font-special-elite),monospace]">
                <span className="text-[var(--bordeaux-bright)]" aria-hidden>
                  ●
                </span>{" "}
                Şu an &apos;
                <span className="text-[var(--kraft-light)]">{sessionGuest}</span>
                &apos; olarak girişlisin.
              </p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={clearGuestSession}
                  className="inline-flex flex-1 items-center justify-center border border-[var(--kraft)] bg-transparent px-4 py-3 text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--kraft-light)] transition-colors [font-family:var(--font-jetbrains-mono),monospace] hover:border-[var(--kraft-light)] hover:bg-[var(--anthracite)] sm:flex-none"
                >
                  Çıkış Yap
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/davalar")}
                  className="inline-flex flex-1 items-center justify-center border border-[var(--bordeaux-bright)] bg-[var(--bordeaux)] px-4 py-3 text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--kraft-light)] transition-colors [font-family:var(--font-jetbrains-mono),monospace] hover:bg-[var(--bordeaux-bright)] sm:flex-none"
                >
                  Davalara Git →
                </button>
              </div>
            </div>
          ) : null}

          <button
            type="button"
            onClick={handleGuestContinue}
            className="w-full border border-[var(--bordeaux-bright)] bg-[var(--bordeaux)] py-4 text-[10px] font-medium uppercase tracking-[0.26em] text-[var(--kraft-light)] transition-colors [font-family:var(--font-jetbrains-mono),ui-monospace,monospace] hover:bg-[var(--bordeaux-bright)]"
          >
            ▸ Devam Et
          </button>
        </section>
      )}

      {tab === "kayit" && (
        <section
          id="panel-kayit"
          role="tabpanel"
          aria-labelledby="tab-kayit"
        >
          <div className="mb-6 border border-[var(--rule)] bg-[var(--anthracite-2)] px-4 py-3 text-center text-[9px] uppercase tracking-[0.2em] text-[var(--subtitle-text)] [font-family:var(--font-jetbrains-mono),monospace]">
            ○ Yakında — Hesap sistemi yakında aktif olacak
          </div>
          <h1 className="mb-3 text-3xl font-semibold text-[var(--paper)] [font-family:var(--font-cormorant),serif] md:text-4xl">
            Kayıt Ol
          </h1>
          <p className="mb-8 text-[13px] leading-relaxed tracking-[0.05em] text-[var(--subtitle-text)] [font-family:var(--font-special-elite),monospace]">
            Misafir olarak başlayabilirsin, hesabını sonradan oluşturursun. Tüm
            ilerlemen aktarılır.
          </p>

          <form className="space-y-5 opacity-70" aria-disabled="true">
            <div>
              <label htmlFor="reg-email" className={labelMono}>
                E-posta
              </label>
              <input
                id="reg-email"
                className={inputClass}
                disabled
                placeholder="analist@buro.gov"
              />
            </div>
            <div>
              <label htmlFor="reg-pass" className={labelMono}>
                Şifre
              </label>
              <input
                id="reg-pass"
                type="password"
                className={inputClass}
                disabled
                placeholder="••••••••"
              />
            </div>
            <div>
              <label htmlFor="reg-analyst" className={labelMono}>
                Analist adı
              </label>
              <input
                id="reg-analyst"
                className={inputClass}
                disabled
                placeholder="Çağrı kodun"
              />
            </div>
            <button
              type="button"
              disabled
              className="w-full cursor-not-allowed border border-[var(--rule)] bg-[var(--anthracite-2)] py-4 text-[10px] font-medium uppercase tracking-[0.24em] text-[var(--meta-label)] [font-family:var(--font-jetbrains-mono),monospace]"
            >
              Kaydı Tamamla
            </button>
          </form>

          <p className="mt-8 text-center text-[11px] text-[var(--meta-label)] [font-family:var(--font-special-elite),monospace]">
            Şimdilik{" "}
            <button
              type="button"
              onClick={() => setTab("misafir")}
              className="border-b border-[var(--kraft-dark)] text-[var(--kraft)] hover:border-[var(--kraft)]"
            >
              Misafir
            </button>{" "}
            sekmesinden devam et.
          </p>
        </section>
      )}

      {tab === "giris" && (
        <section
          id="panel-giris"
          role="tabpanel"
          aria-labelledby="tab-giris"
        >
          <div className="mb-6 border border-[var(--rule)] bg-[var(--anthracite-2)] px-4 py-3 text-center text-[9px] uppercase tracking-[0.2em] text-[var(--subtitle-text)] [font-family:var(--font-jetbrains-mono),monospace]">
            ○ Yakında — Giriş yakında aktif olacak
          </div>
          <h1 className="mb-3 text-3xl font-semibold text-[var(--paper)] [font-family:var(--font-cormorant),serif] md:text-4xl">
            Giriş Yap
          </h1>
          <p className="mb-8 text-[13px] leading-relaxed tracking-[0.05em] text-[var(--subtitle-text)] [font-family:var(--font-special-elite),monospace]">
            Kayıtlı analist hesabınla dosyalarına eriş.
          </p>

          <form className="space-y-5 opacity-70" aria-disabled="true">
            <div>
              <label htmlFor="login-email" className={labelMono}>
                E-posta
              </label>
              <input
                id="login-email"
                className={inputClass}
                disabled
                placeholder="analist@buro.gov"
              />
            </div>
            <div>
              <label htmlFor="login-pass" className={labelMono}>
                Şifre
              </label>
              <input
                id="login-pass"
                type="password"
                className={inputClass}
                disabled
                placeholder="••••••••"
              />
            </div>
            <button
              type="button"
              disabled
              className="w-full cursor-not-allowed border border-[var(--rule)] bg-[var(--anthracite-2)] py-4 text-[10px] font-medium uppercase tracking-[0.24em] text-[var(--meta-label)] [font-family:var(--font-jetbrains-mono),monospace]"
            >
              Giriş Yap
            </button>
          </form>

          <p className="mt-8 text-center text-[11px] text-[var(--meta-label)] [font-family:var(--font-special-elite),monospace]">
            <button
              type="button"
              onClick={() => setTab("misafir")}
              className="border-b border-[var(--kraft-dark)] text-[var(--kraft)] hover:border-[var(--kraft)]"
            >
              Misafir
            </button>{" "}
            olarak veya{" "}
            <button
              type="button"
              onClick={() => setTab("kayit")}
              className="border-b border-[var(--kraft-dark)] text-[var(--kraft)] hover:border-[var(--kraft)]"
            >
              kayıt
            </button>{" "}
            sekmesine bak.
          </p>
        </section>
      )}
    </div>
  );
}
