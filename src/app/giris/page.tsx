"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";

import { signIn, signUp } from "@/app/auth/actions";
import {
  DAKT_GUEST_USERNAME_KEY,
  DAKT_USER_COLOR_KEY,
  clearGuestUsername,
  readGuestColor,
  writeGuestColor,
  writeGuestUsername,
} from "@/lib/guest-session";
import {
  clearLocalSolvedRecords,
  readLocalSolvedRecords,
} from "@/lib/local-solved-storage";
import { createClient } from "@/lib/supabase/client";
import type { AnalystColor } from "@/lib/supabase/types";

type Tab = "misafir" | "kayit" | "giris";

const tabBtn =
  "[font-family:var(--font-jetbrains-mono),ui-monospace,monospace] flex-1 border px-3 py-3 text-[9px] font-medium uppercase tracking-[0.18em] transition-colors sm:flex-none sm:px-5";

const labelMono =
  "mb-2 block text-[9px] uppercase tracking-[0.22em] text-[var(--meta-label)] [font-family:var(--font-jetbrains-mono),monospace]";

const inputClass =
  "w-full border border-[var(--kraft-dark)] bg-[var(--anthracite)] px-4 py-3 text-[13px] text-[var(--body-text)] [font-family:var(--font-special-elite),monospace] placeholder:text-[var(--meta-label)] focus:border-[var(--kraft)] focus:outline-none";

const COLOR_OPTIONS: { id: AnalystColor; fill: string; label: string }[] = [
  { id: "mavi", fill: "#4a90d9", label: "Mavi" },
  { id: "sari", fill: "#d4c04a", label: "Sarı" },
  { id: "yesil", fill: "#5a9f6e", label: "Yeşil" },
  { id: "mor", fill: "#8b6fad", label: "Mor" },
  { id: "turuncu", fill: "#c67d4a", label: "Turuncu" },
];

function ColorSquares({
  value,
  onChange,
  name,
}: {
  value: AnalystColor;
  onChange: (c: AnalystColor) => void;
  name?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {name ? <input type="hidden" name={name} value={value} /> : null}
      {COLOR_OPTIONS.map((c) => (
        <button
          key={c.id}
          type="button"
          title={c.label}
          aria-label={c.label}
          aria-pressed={value === c.id}
          onClick={() => onChange(c.id)}
          className={`size-9 shrink-0 border-2 transition-[border-color,box-shadow] ${
            value === c.id
              ? "border-[var(--bordeaux)] shadow-[0_0_0_1px_var(--bordeaux-bright)]"
              : "border-[var(--rule)] hover:border-[var(--kraft-dark)]"
          }`}
          style={{ backgroundColor: c.fill }}
        />
      ))}
    </div>
  );
}

export default function GirisPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("misafir");
  const [tabLocked, setTabLocked] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestColor, setGuestColor] = useState<AnalystColor>("mavi");
  const [guestError, setGuestError] = useState(false);
  const [sessionGuest, setSessionGuest] = useState<string | null>(null);

  const [signUpError, setSignUpError] = useState<string | null>(null);
  const [signInError, setSignInError] = useState<string | null>(null);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [signInLoading, setSignInLoading] = useState(false);
  const [suspendedRedirect, setSuspendedRedirect] = useState(false);

  const [regColor, setRegColor] = useState<AnalystColor>("mavi");

  async function handleSignUp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSignUpError(null);
    setSignUpLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await signUp(formData);
    if ("error" in result) {
      setSignUpError(result.error);
      setSignUpLoading(false);
      return;
    }

    let transferred = 0;
    try {
      const localSolved = readLocalSolvedRecords();
      if (localSolved.length > 0) {
        const supabase = createClient();
        let u = (await supabase.auth.getSession()).data.session?.user ?? null;
        if (!u) {
          await new Promise((r) => setTimeout(r, 150));
          u = (await supabase.auth.getUser()).data.user;
        }
        if (u) {
          const records = localSolved.map((s) => ({
            user_id: u!.id,
            case_id: s.case_id,
            accuracy: s.accuracy,
            attempt_count: s.attempt_count,
            duration_seconds: s.duration_seconds,
            solved_at: s.solved_at,
          }));
          const { error: upErr } = await supabase
            .from("solved_cases")
            .upsert(records, { onConflict: "user_id,case_id" });
          if (!upErr) {
            transferred = records.length;
            clearLocalSolvedRecords();
          } else {
            console.error("Misafir çözüm aktarımı:", upErr);
          }
        }
      }
    } catch (e) {
      console.error("Misafir çözüm aktarımı:", e);
    }

    if (transferred > 0) {
      try {
        sessionStorage.setItem("dakt_welcome_transfer", String(transferred));
      } catch {
        /* ignore */
      }
    }

    setSignUpLoading(false);
    router.refresh();
    router.push("/");
  }

  async function handleSignIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSignInError(null);
    setSignInLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await signIn(formData);
    if ("error" in result) {
      setSignInError(result.error);
      setSignInLoading(false);
      return;
    }
    router.refresh();
    router.push("/");
  }

  useEffect(() => {
    if (tabLocked) return;
    if (typeof window === "undefined") return;
    const suspended =
      new URLSearchParams(window.location.search).get("error") ===
      "suspended";
    setSuspendedRedirect(suspended);
    if (suspended) {
      setTab("giris");
      setTabLocked(true);
      return;
    }
    const q = new URLSearchParams(window.location.search).get("tab");
    if (q === "kayit" || q === "giris" || q === "misafir") {
      setTab(q);
      setTabLocked(true);
    }
  }, [tabLocked]);

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
        const gc = readGuestColor();
        if (gc) setGuestColor(gc);
      } catch {
        setSessionGuest(null);
        setGuestName("");
      }
    }
    readSession();
    function onStorage(e: StorageEvent) {
      if (
        e.key === DAKT_GUEST_USERNAME_KEY ||
        e.key === DAKT_USER_COLOR_KEY ||
        e.key === null
      ) {
        readSession();
      }
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
    setGuestColor("mavi");
  }

  function handleGuestContinue() {
    const t = guestName.trim();
    if (!t) {
      setGuestError(true);
      return;
    }
    setGuestError(false);
    writeGuestUsername(t);
    writeGuestColor(guestColor);
    router.push("/davalar");
  }

  return (
    <div className="relative z-[1] mx-auto w-full max-w-[480px] flex-1 px-5 py-10 md:px-7 md:py-14">
      {suspendedRedirect ? (
        <div
          style={{
            padding: "12px 16px",
            border: "1px solid var(--bordeaux)",
            background: "rgba(107, 22, 32, 0.1)",
            color: "var(--bordeaux-bright)",
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.1em",
            marginBottom: 16,
          }}
          role="alert"
        >
          ◉ Bu hesap askıya alınmış. Detay için iletişime geç: destek@dakt.app
        </div>
      ) : null}
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
            onClick={() => {
              setTab(id);
              setTabLocked(true);
            }}
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

          <div className="mb-8">
            <span className={labelMono}>Analist rengi</span>
            <ColorSquares value={guestColor} onChange={setGuestColor} />
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
          <h1 className="mb-3 text-3xl font-semibold text-[var(--paper)] [font-family:var(--font-cormorant),serif] md:text-4xl">
            Kayıt Ol
          </h1>
          <p className="mb-8 text-[13px] leading-relaxed tracking-[0.05em] text-[var(--subtitle-text)] [font-family:var(--font-special-elite),monospace]">
            Misafir olarak başlayabilirsin, hesabını sonradan oluşturursun. Tüm
            ilerlemen aktarılır.
          </p>

          <form className="space-y-5" onSubmit={handleSignUp}>
            <div>
              <label htmlFor="reg-email" className={labelMono}>
                E-posta
              </label>
              <input
                id="reg-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                disabled={signUpLoading}
                placeholder="analist@buro.gov"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="reg-pass" className={labelMono}>
                Şifre (en az 6 karakter)
              </label>
              <input
                id="reg-pass"
                name="password"
                type="password"
                required
                minLength={6}
                autoComplete="new-password"
                disabled={signUpLoading}
                placeholder="••••••••"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="reg-analyst" className={labelMono}>
                Analist takma adı
              </label>
              <input
                id="reg-analyst"
                name="username"
                type="text"
                required
                autoComplete="nickname"
                disabled={signUpLoading}
                placeholder="Çağrı kodun"
                className={inputClass}
              />
            </div>
            <div>
              <span className={labelMono}>Analist rengi</span>
              <ColorSquares
                value={regColor}
                onChange={setRegColor}
                name="color"
              />
            </div>
            {signUpError ? (
              <p className="text-[11px] tracking-[0.06em] text-[var(--bordeaux-bright)] [font-family:var(--font-jetbrains-mono),monospace]">
                {signUpError}
              </p>
            ) : null}

            <div
              style={{
                marginTop: 24,
                marginBottom: 16,
                display: "grid",
                gap: 12,
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  cursor: "pointer",
                  fontSize: 12,
                  lineHeight: 1.6,
                  color: "var(--kraft-light)",
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                }}
              >
                <input
                  type="checkbox"
                  name="age_consent"
                  required
                  style={{ marginTop: 4, accentColor: "var(--bordeaux)" }}
                />
                <span>
                  <strong>16 yaşımdan büyüğüm</strong> ve{" "}
                  {"D.A.K.T.'ın"} cinayet/şiddet temalı içerik barındırdığını
                  anlıyorum.
                </span>
              </label>

              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  cursor: "pointer",
                  fontSize: 12,
                  lineHeight: 1.6,
                  color: "var(--kraft-light)",
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                }}
              >
                <input
                  type="checkbox"
                  name="kvkk_consent"
                  required
                  style={{ marginTop: 4, accentColor: "var(--bordeaux)" }}
                />
                <span>
                  <Link
                    href="/yasal/aydinlatma-metni"
                    target="_blank"
                    style={{
                      color: "var(--kraft)",
                      textDecoration: "underline",
                    }}
                  >
                    Aydınlatma Metni
                  </Link>
                  {"'ni"} okudum, kişisel verilerimin işlenmesini kabul ediyorum.
                  Verilerimin{" "}
                  <strong>Almanya&apos;da (Supabase)</strong> işlenmesini
                  onaylıyorum.
                </span>
              </label>

              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  cursor: "pointer",
                  fontSize: 12,
                  lineHeight: 1.6,
                  color: "var(--kraft-light)",
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                }}
              >
                <input
                  type="checkbox"
                  name="terms_consent"
                  required
                  style={{ marginTop: 4, accentColor: "var(--bordeaux)" }}
                />
                <span>
                  <Link
                    href="/yasal/kullanim-kosullari"
                    target="_blank"
                    style={{
                      color: "var(--kraft)",
                      textDecoration: "underline",
                    }}
                  >
                    Kullanım Koşulları
                  </Link>
                  {"'nı"} okudum, kabul ediyorum.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={signUpLoading}
              className="w-full cursor-pointer border border-[var(--bordeaux-bright)] bg-[var(--bordeaux)] py-4 text-[10px] font-medium uppercase tracking-[0.24em] text-[var(--kraft-light)] transition-colors [font-family:var(--font-jetbrains-mono),monospace] hover:bg-[var(--bordeaux-bright)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {signUpLoading ? "Hesap oluşturuluyor..." : "Hesap Oluştur"}
            </button>
          </form>

          <p className="mt-8 text-center text-[11px] text-[var(--meta-label)] [font-family:var(--font-special-elite),monospace]">
            Şimdilik{" "}
            <button
              type="button"
              onClick={() => {
                setTab("misafir");
                setTabLocked(true);
              }}
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
          <h1 className="mb-3 text-3xl font-semibold text-[var(--paper)] [font-family:var(--font-cormorant),serif] md:text-4xl">
            Giriş Yap
          </h1>
          <p className="mb-8 text-[13px] leading-relaxed tracking-[0.05em] text-[var(--subtitle-text)] [font-family:var(--font-special-elite),monospace]">
            Kayıtlı analist hesabınla dosyalarına eriş.
          </p>

          <form className="space-y-5" onSubmit={handleSignIn}>
            <div>
              <label htmlFor="login-email" className={labelMono}>
                E-posta
              </label>
              <input
                id="login-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                disabled={signInLoading}
                placeholder="analist@buro.gov"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="login-pass" className={labelMono}>
                Şifre
              </label>
              <input
                id="login-pass"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                disabled={signInLoading}
                placeholder="••••••••"
                className={inputClass}
              />
            </div>
            {signInError ? (
              <p className="text-[11px] tracking-[0.06em] text-[var(--bordeaux-bright)] [font-family:var(--font-jetbrains-mono),monospace]">
                {signInError}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={signInLoading}
              className="w-full cursor-pointer border border-[var(--bordeaux-bright)] bg-[var(--bordeaux)] py-4 text-[10px] font-medium uppercase tracking-[0.24em] text-[var(--kraft-light)] transition-colors [font-family:var(--font-jetbrains-mono),monospace] hover:bg-[var(--bordeaux-bright)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {signInLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </button>
          </form>

          <p className="mt-8 text-center text-[11px] text-[var(--meta-label)] [font-family:var(--font-special-elite),monospace]">
            <button
              type="button"
              onClick={() => {
                setTab("misafir");
                setTabLocked(true);
              }}
              className="border-b border-[var(--kraft-dark)] text-[var(--kraft)] hover:border-[var(--kraft)]"
            >
              Misafir
            </button>{" "}
            olarak veya{" "}
            <button
              type="button"
              onClick={() => {
                setTab("kayit");
                setTabLocked(true);
              }}
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
