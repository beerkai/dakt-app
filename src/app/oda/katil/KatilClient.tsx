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
import ConfirmModal from "@/components/ConfirmModal";
import { RouteSkeleton } from "@/components/RouteSkeleton";
import { useAuth } from "@/components/AuthProvider";
import {
  clearActiveSession,
  getActiveSession,
  getReturnUrl,
  type ActiveSession,
} from "@/lib/active-session";

const mono =
  "[font-family:var(--font-jetbrains-mono),ui-monospace,monospace]";
const typewriter =
  "[font-family:var(--font-newsreader),serif]";

export function KatilClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const autojoinTried = useRef(false);

  const [overwriteOpen, setOverwriteOpen] = useState(false);
  const [pendingCode, setPendingCode] = useState<string | null>(null);
  const [overwriteSession, setOverwriteSession] =
    useState<ActiveSession | null>(null);

  const normalizedFromUrl = (searchParams.get("code") ?? "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 6);
  const autojoin = searchParams.get("autojoin") === "true";

  const [prevCodeFromUrl, setPrevCodeFromUrl] = useState("");
  if (prevCodeFromUrl !== normalizedFromUrl) {
    setPrevCodeFromUrl(normalizedFromUrl);
    if (normalizedFromUrl.length > 0) setCode(normalizedFromUrl);
  }

  const runJoin = useCallback(
    async (raw: string) => {
      const trimmed = raw.toUpperCase().trim().replace(/[^A-Z0-9]/g, "");
      if (trimmed.length !== 6) {
        setError("6 haneli kod gir");
        return;
      }
      setBusy(true);
      setError(null);

      try {
        const result = await joinRoom(trimmed);

        if (process.env.NODE_ENV === "development") {
           
          console.log("joinRoom result:", result);
        }

        if (result == null || typeof result !== "object") {
          setError("Beklenmeyen bir yanıt, tekrar dene");
          return;
        }

        if ("requiresGuestSetup" in result && result.requiresGuestSetup) {
          router.push(
            `/oda/katil/misafir?code=${encodeURIComponent(result.code)}${autojoin ? "&autojoin=true" : ""}`,
          );
          return;
        }

        if ("requiresRejoin" in result && result.requiresRejoin) {
          router.push(`/oda/${result.code}/tekrar-katil`);
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
          const dest = `/oda/${result.code}`;
          router.refresh();
          router.push(dest);
          return;
        }

        setError("Beklenmeyen bir hata oluştu");
      } catch (err) {
        if (process.env.NODE_ENV === "development") {
           
          console.error("joinRoom error:", err);
        }
        setError("Bağlantı hatası, tekrar dene");
      } finally {
        setBusy(false);
      }
    },
    [autojoin, router],
  );

  useEffect(() => {
    if (!autojoin || !normalizedFromUrl || normalizedFromUrl.length !== 6) {
      return;
    }
    if (authLoading || autojoinTried.current) return;

    if (!user) {
      autojoinTried.current = true;
      router.replace(
        `/oda/katil/misafir?code=${encodeURIComponent(normalizedFromUrl)}&autojoin=true`,
      );
      return;
    }

    autojoinTried.current = true;
    void runJoin(normalizedFromUrl);
  }, [autojoin, authLoading, user, normalizedFromUrl, runJoin, router]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (busy || authLoading) return;
    const trimmed = code.toUpperCase().trim().replace(/[^A-Z0-9]/g, "");
    if (trimmed.length !== 6) {
      setError("6 haneli kod gir");
      return;
    }

    const existing = getActiveSession();
    if (existing) {
      const same =
        existing.code?.toUpperCase() === trimmed ||
        (existing.mode === "coop" && existing.code === trimmed);
      if (same) {
        router.push(`/oda/${trimmed}`);
        return;
      }
      setOverwriteSession(existing);
      setPendingCode(trimmed);
      setOverwriteOpen(true);
      return;
    }

    await runJoin(trimmed);
  }

  function handleOverwriteConfirm() {
    clearActiveSession();
    window.dispatchEvent(new Event("dakt-session-change"));
    const next = pendingCode;
    setOverwriteOpen(false);
    setPendingCode(null);
    setOverwriteSession(null);
    if (next) void runJoin(next);
  }

  function handleReturnToExisting() {
    const s = overwriteSession ?? getActiveSession();
    if (s) router.push(getReturnUrl(s));
    setOverwriteOpen(false);
    setPendingCode(null);
    setOverwriteSession(null);
  }

  if (authLoading) {
    return <RouteSkeleton kind="fields" />;
  }

  return (
    <>
      <div className="relative z-[2] pointer-events-auto">
        <p
          className={`${typewriter} mb-8 max-w-md text-[16px] leading-relaxed text-[var(--subtitle-text)]`}
        >
          {!user
            ? "Kodu girip katıl: bir sonraki adımda misafir analist olarak takma ad ve renk seçersin."
            : "Kayıtlı hesabınla doğrudan odaya gir."}
        </p>

        <form onSubmit={(ev) => void onSubmit(ev)} className="space-y-8">
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
              type="text"
              inputMode="text"
              autoCapitalize="characters"
              autoComplete="off"
              maxLength={6}
              autoFocus
              value={code}
              disabled={busy}
              placeholder="K7M2X9"
              onChange={(e) => {
                const next = e.target.value
                  .toUpperCase()
                  .replace(/[^A-Z0-9]/g, "")
                  .slice(0, 6);
                setCode(next);
                if (error) setError(null);
              }}
              className="box-border w-full max-w-md border-2 border-[var(--kraft-dark)] bg-transparent py-4 pl-6 pr-6 text-center text-3xl uppercase tracking-[0.4em] text-[var(--paper)] outline-none [font-family:var(--font-jetbrains-mono),ui-monospace,monospace] placeholder:text-[var(--kraft-dark)]/40 focus:border-[var(--bordeaux-bright)] disabled:opacity-60"
            />
          </div>

          {error ? (
            <p
              className={`${mono} text-[10px] uppercase tracking-[0.14em] text-[var(--bordeaux-bright)]`}
            >
              {error}
            </p>
          ) : null}

          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <button
              type="submit"
              disabled={busy || code.replace(/[^A-Z0-9]/g, "").length !== 6}
              className={`${mono} inline-flex min-h-[52px] items-center justify-center border border-[var(--bordeaux-bright)] bg-[var(--bordeaux)] px-10 py-4 text-[10px] font-medium uppercase tracking-[0.24em] text-[var(--kraft-light)] transition-colors hover:bg-[var(--bordeaux-bright)] disabled:cursor-not-allowed disabled:opacity-50`}
            >
              {busy ? "Katılıyorsun…" : "Katıl"}
            </button>
            {!user ? (
              <Link
                href="/giris"
                className={`tap-target ${mono} text-[9px] uppercase tracking-[0.2em] text-[var(--kraft)] underline-offset-4 hover:text-[var(--kraft-light)] hover:underline`}
              >
                Kayıtlı hesapla giriş →
              </Link>
            ) : null}
          </div>
        </form>
      </div>

      <ConfirmModal
        open={overwriteOpen}
        onClose={() => {
          setOverwriteOpen(false);
          setPendingCode(null);
          setOverwriteSession(null);
        }}
        onConfirm={handleOverwriteConfirm}
        onCancel={handleReturnToExisting}
        title="Aktif vakan var"
        description={
          overwriteSession
            ? `${overwriteSession.caseName} vakasında bir oturumun açık. Yeni odaya katılırsan o oturumu kaybedeceksin (best record'un saklanır). Devam etmek istiyor musun?`
            : "Aktif bir oturumun var. Devam etmek istiyor musun?"
        }
        confirmText="Yeni Odaya Katıl"
        cancelText="Mevcut Vakaya Dön"
        variant="warning"
      />
    </>
  );
}
