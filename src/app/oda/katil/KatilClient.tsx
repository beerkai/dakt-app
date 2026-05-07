"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";

import { joinRoom } from "@/app/oda/actions";
import { useAuth } from "@/components/AuthProvider";

const mono =
  "[font-family:var(--font-jetbrains-mono),ui-monospace,monospace]";
const typewriter =
  "[font-family:var(--font-special-elite),monospace]";

export function KatilClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const autojoinTried = useRef(false);

  const normalizedFromUrl = (searchParams.get("code") ?? "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 6);
  const autojoin = searchParams.get("autojoin") === "true";

  useEffect(() => {
    if (normalizedFromUrl.length > 0) {
      setCode(normalizedFromUrl);
    }
  }, [normalizedFromUrl]);

  const runJoin = useCallback(
    async (raw: string) => {
      const trimmed = raw.toUpperCase().trim();
      if (trimmed.length !== 6) {
        setError("Kod 6 karakter olmalı");
        return;
      }
      setBusy(true);
      setError(null);
      const result = await joinRoom(trimmed);
      setBusy(false);
      if (result?.error) {
        setError(result.error);
        return;
      }
      if (result?.success && result.code) {
        router.push(`/oda/${result.code}`);
      }
    },
    [router],
  );

  useEffect(() => {
    if (!autojoin || !normalizedFromUrl || normalizedFromUrl.length !== 6) {
      return;
    }
    if (authLoading || !user || autojoinTried.current) return;
    autojoinTried.current = true;
    void runJoin(normalizedFromUrl);
  }, [autojoin, authLoading, user, normalizedFromUrl, runJoin]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (busy || authLoading) return;
    if (!user) return;
    await runJoin(code);
  }

  if (authLoading) {
    return (
      <p className={`${mono} text-[10px] uppercase tracking-[0.22em] text-[var(--kraft)]`}>
        Yükleniyor…
      </p>
    );
  }

  if (!user) {
    return (
      <div className="space-y-6">
        <p
          className={`${typewriter} text-[13px] leading-relaxed tracking-[0.05em] text-[var(--body-text)]`}
        >
          Co-op odaları için kayıtlı hesabınla giriş yapman gerekir.
        </p>
        <Link
          href="/giris"
          className={`${mono} inline-flex min-h-[48px] items-center justify-center border-2 border-[var(--bordeaux-bright)] bg-[var(--bordeaux)] px-8 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--kraft-light)] transition-colors hover:bg-[var(--bordeaux-bright)]`}
        >
          Giriş yap →
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div>
        <label
          htmlFor="dakt-room-code"
          className={`${mono} mb-3 block text-[9px] uppercase tracking-[0.22em] text-[var(--meta-label)]`}
        >
          Oda kodu
        </label>
        <input
          id="dakt-room-code"
          name="roomCode"
          inputMode="text"
          autoCapitalize="characters"
          autoComplete="off"
          maxLength={6}
          value={code}
          disabled={busy}
          onChange={(e) => {
            const next = e.target.value
              .toUpperCase()
              .replace(/[^A-Z0-9]/g, "")
              .slice(0, 6);
            setCode(next);
            if (error) setError(null);
          }}
          className={`${mono} box-border w-full max-w-md border-2 border-[var(--kraft-dark)] bg-[var(--anthracite-2)] px-4 py-4 text-center text-[1.75rem] uppercase tracking-[0.35em] text-[var(--paper)] outline-none transition-colors focus:border-[var(--kraft)] disabled:opacity-60`}
          placeholder="──────"
        />
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
        disabled={busy || code.length !== 6}
        className={`${mono} inline-flex min-h-[52px] items-center justify-center border border-[var(--bordeaux-bright)] bg-[var(--bordeaux)] px-10 py-4 text-[10px] font-medium uppercase tracking-[0.24em] text-[var(--kraft-light)] transition-colors hover:bg-[var(--bordeaux-bright)] disabled:cursor-not-allowed disabled:opacity-50`}
      >
        {busy ? "Katılıyorsun…" : "Katıl"}
      </button>
    </form>
  );
}
