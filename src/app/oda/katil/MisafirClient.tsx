"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";

import { ensureAnonProfile, joinRoom } from "@/app/oda/actions";
import { useAuth } from "@/components/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import type { AnalystColor } from "@/lib/supabase/types";

const mono =
  "[font-family:var(--font-jetbrains-mono),ui-monospace,monospace]";
const typewriter =
  "[font-family:var(--font-special-elite),monospace]";

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
}: {
  value: AnalystColor;
  onChange: (c: AnalystColor) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {COLOR_OPTIONS.map((c) => (
        <button
          key={c.id}
          type="button"
          title={c.label}
          aria-label={c.label}
          aria-pressed={value === c.id}
          onClick={() => onChange(c.id)}
          className={`size-10 shrink-0 border-2 transition-[border-color,box-shadow] ${
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

export function MisafirClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const supabase = useMemo(() => createClient(), []);
  const redirectedForSession = useRef(false);

  const codeFromUrl = useMemo(() => {
    const raw = (searchParams.get("code") ?? "")
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 6);
    return raw.length === 6 ? raw : "";
  }, [searchParams]);

  const autojoin = searchParams.get("autojoin") === "true";

  const [username, setUsername] = useState("");
  const [color, setColor] = useState<AnalystColor>("mavi");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (authLoading || !user || !codeFromUrl || redirectedForSession.current) {
      return;
    }
    redirectedForSession.current = true;
    router.replace(
      `/oda/katil?code=${encodeURIComponent(codeFromUrl)}${autojoin ? "&autojoin=true" : ""}`,
    );
  }, [authLoading, autojoin, codeFromUrl, router, user]);

  const runAfterAuth = useCallback(async () => {
    await new Promise((r) => setTimeout(r, 80));
    router.refresh();
  }, [router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!codeFromUrl) {
      setError("Geçerli bir oda kodu yok. Önce kod gir.");
      return;
    }
    const trimmed = username.trim();
    if (!trimmed) {
      setError("Takma ad gerekli.");
      return;
    }

    setBusy(true);
    setError(null);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        const { error: authError } = await supabase.auth.signInAnonymously({
          options: {
            data: { username: trimmed, color },
          },
        });
        if (authError) {
          setError(authError.message || "Misafir girişi başarısız");
          return;
        }
      }

      await runAfterAuth();

      const ensured = await ensureAnonProfile(trimmed, color);
      if ("error" in ensured) {
        setError(ensured.error);
        return;
      }

      const result = await joinRoom(codeFromUrl);

      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.log("joinRoom result (misafir):", result);
      }

      if (result == null || typeof result !== "object") {
        setError("Beklenmeyen bir yanıt, tekrar dene");
        return;
      }

      if ("requiresGuestSetup" in result && result.requiresGuestSetup) {
        setError("Oturum senkronize edilemedi, sayfayı yenileyip tekrar dene.");
        return;
      }
      if ("error" in result && result.error) {
        setError(result.error);
        return;
      }
      if (
        "success" in result &&
        result.success === true &&
        typeof result.code === "string" &&
        result.code.length > 0
      ) {
        router.refresh();
        router.push(`/oda/${result.code}`);
        return;
      }

      setError("Beklenmeyen bir hata oluştu");
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.error("misafir join error:", err);
      }
      setError("Bağlantı hatası, tekrar dene");
    } finally {
      setBusy(false);
    }
  }

  if (authLoading) {
    return (
      <p className={`${mono} text-[10px] uppercase tracking-[0.22em] text-[var(--kraft)]`}>
        Yükleniyor…
      </p>
    );
  }

  if (!codeFromUrl) {
    return (
      <div className="space-y-4">
        <p className={`${typewriter} text-[13px] text-[var(--body-text)]`}>
          Oda kodu eksik veya uzunluğu yanlış.{" "}
          <Link
            href="/oda/katil"
            className={`${mono} text-[var(--kraft)] underline-offset-4 hover:underline`}
          >
            Kod girişine dön
          </Link>
        </p>
      </div>
    );
  }

  if (user) {
    return (
      <p className={`${mono} text-[10px] uppercase tracking-[0.22em] text-[var(--kraft)]`}>
        Yönlendiriliyor…
      </p>
    );
  }

  return (
    <form
      onSubmit={(ev) => void handleSubmit(ev)}
      className="relative z-[1] pointer-events-auto space-y-8"
    >
      <div
        className={`${mono} border-b border-[var(--kraft-dark)] pb-6 text-[12px] uppercase tracking-[0.35em] text-[var(--kraft)]`}
      >
        Kod: {codeFromUrl}
      </div>

      <div>
        <h2
          className="mb-2 text-xl font-semibold italic text-[var(--paper)] [font-family:var(--font-cormorant),serif]"
        >
          Misafir olarak katıl
        </h2>
        <p className={`${typewriter} text-[13px] text-[var(--subtitle-text)]`}>
          Bu seans için takma ad ve renk seç.
        </p>
      </div>

      <div>
        <label
          htmlFor="dakt-guest-join-name"
          className={`${mono} mb-2 block text-[9px] uppercase tracking-[0.22em] text-[var(--meta-label)]`}
        >
          Takma adın
        </label>
        <input
          id="dakt-guest-join-name"
          name="username"
          type="text"
          autoComplete="nickname"
          maxLength={48}
          value={username}
          autoFocus={autojoin}
          disabled={busy}
          onChange={(e) => {
            setUsername(e.target.value);
            if (error) setError(null);
          }}
          className="w-full border-2 border-[var(--kraft-dark)] bg-[var(--anthracite-2)] px-4 py-3 text-[14px] text-[var(--body-text)] [font-family:var(--font-special-elite),monospace] placeholder:text-[var(--meta-label)] focus:border-[var(--bordeaux-bright)] focus:outline-none disabled:opacity-60"
          placeholder="Analist-…"
        />
      </div>

      <div>
        <p
          className={`${mono} mb-3 block text-[9px] uppercase tracking-[0.22em] text-[var(--meta-label)]`}
        >
          Rengini seç
        </p>
        <ColorSquares value={color} onChange={setColor} />
      </div>

      {error ? (
        <p
          className={`${mono} text-[10px] uppercase tracking-[0.14em] text-[var(--bordeaux-bright)]`}
        >
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={busy}
        className={`${mono} inline-flex min-h-[52px] w-full items-center justify-center border border-[var(--bordeaux-bright)] bg-[var(--bordeaux)] px-10 py-4 text-[10px] font-medium uppercase tracking-[0.24em] text-[var(--kraft-light)] transition-colors hover:bg-[var(--bordeaux-bright)] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto`}
      >
        {busy ? "Katılıyorsun…" : "▸ Odaya katıl"}
      </button>

      <p className={`${typewriter} text-[12px] text-[var(--subtitle-text)]`}>
        Hesabın varsa{" "}
        <Link
          href="/giris"
          className={`${mono} text-[var(--kraft)] underline-offset-4 hover:underline`}
        >
          Giriş yap
        </Link>
      </p>
    </form>
  );
}
