"use client";

import { getActiveSession } from "@/lib/active-session";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { useFloatingLayer } from "@/hooks/useFloatingLayer";

const SOLO_VARIANTS = [
  "{codename} davası dört gözle daha hızlı çözülür.",
  "Solo bir analist iyi düşünür. İki analist çapraz okur.",
  "Bu dosyada birden fazla yalan var. İkinci bir göz iyi gelir.",
  "Co-op modunda her oyuncu kendi rengiyle çizer. Sen tek başınasın.",
  "{victim} davası açık. Yardım çağırmak zayıflık değildir.",
  "Bu vakada herkes bir şey saklıyor. İki analist iki kat dikkat eder.",
] as const;

function victimFirstName(victim: string): string {
  const t = victim.trim();
  if (!t) return "";
  return t.split(/\s+/)[0] ?? t;
}

function formatVariant(
  template: string,
  codename: string,
  victim: string,
): string {
  return template
    .replaceAll("{codename}", codename)
    .replaceAll("{victim}", victimFirstName(victim));
}

export function VakaCaseSoloTease({
  caseId,
  codename,
  fullTitle,
  victim,
}: {
  caseId: string;
  codename: string;
  fullTitle: string;
  victim: string;
}) {
  const searchParams = useSearchParams();
  const roomIdFromUrl = searchParams.get("room");

  // URL'de room yoksa active session'dan kontrol et
  const session = getActiveSession();
  const roomId = roomIdFromUrl || (session?.roomId ?? null);

  const [coopBlocked, setCoopBlocked] = useState(false);
  const [visible, setVisible] = useState(false);
  const [feedback, setFeedback] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  useFloatingLayer("tease", rootRef, visible && !roomId && !coopBlocked);
  const [variantIdx] = useState(() =>
    Math.floor(Math.random() * SOLO_VARIANTS.length),
  );

  useEffect(() => {
    function checkCoopSession() {
      // URL'de room varsa zaten co-op modda, toast asla görünmesin
      if (roomId) {
        setCoopBlocked(true);
        return;
      }

      // URL'de room YOKSA, active session co-op mu kontrol et
      const session = getActiveSession();
      if (session?.mode === "coop") {
        // Co-op session var ama URL'de room yok
        // (büyük ihtimal navigation sırasında kayıp) → toast gösterme
        setCoopBlocked(true);
        return;
      }

      setCoopBlocked(false);
    }

    checkCoopSession();

    function handleSessionChange() {
      checkCoopSession();
    }

    window.addEventListener("dakt-session-change", handleSessionChange);
    window.addEventListener("storage", handleSessionChange);

    return () => {
      window.removeEventListener("dakt-session-change", handleSessionChange);
      window.removeEventListener("storage", handleSessionChange);
    };
  }, [roomId]);

  useEffect(() => {
    if (roomId || coopBlocked) {
      setVisible(false);
      return;
    }

    const id = requestAnimationFrame(() => {
      try {
        if (sessionStorage.getItem(`dakt_solo_dismissed_${caseId}`) === "1")
          return;
      } catch {
        return;
      }
      setVisible(true);
    });
    return () => cancelAnimationFrame(id);
  }, [caseId, roomId, coopBlocked]);

  const dismiss = useCallback(() => {
    try {
      sessionStorage.setItem(`dakt_solo_dismissed_${caseId}`, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
    setFeedback("");
  }, [caseId]);

  const briefUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/vaka/${caseId}/brief`
      : `/vaka/${caseId}/brief`;

  async function sendToFriend() {
    setFeedback("");

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `D.A.K.T. · ${fullTitle}`,
          text: `${codename} dosyasını birlikte inceleyelim.`,
          url: briefUrl,
        });
        return;
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(briefUrl);
      setFeedback("Bağlantı kopyalandı");
      window.setTimeout(() => setFeedback(""), 2500);
    } catch {
      setFeedback("Kopyalanamadı");
      window.setTimeout(() => setFeedback(""), 2500);
    }
  }

  if (roomId || coopBlocked) return null;
  if (!visible) return null;

  const teaserLine = formatVariant(
    SOLO_VARIANTS[variantIdx] ?? SOLO_VARIANTS[0],
    codename,
    victim,
  );

  return (
    <div
      ref={rootRef}
      className="vaka042-solo-tease pointer-events-auto fixed bottom-[var(--app-float-offset)] right-4 z-[var(--z-float)] max-w-[min(100vw-2rem,320px)] border-2 border-[var(--bordeaux)] bg-[var(--anthracite)] p-4 shadow-[var(--shadow)] md:bottom-8 md:right-8"
      role="dialog"
      aria-labelledby="solo-tease-title"
      aria-live="polite"
    >
      <p
        id="solo-tease-title"
        className="mb-3 text-[16px] leading-[1.55] text-[var(--kraft-light)] [font-family:var(--font-newsreader),serif]"
      >
        <span className="text-[var(--bordeaux-bright)]" aria-hidden>
          ●
        </span>{" "}
        Şu an tek başınasın.
        <br />
        {teaserLine}
      </p>

      {feedback ? (
        <p className="mb-3 text-[10px] uppercase tracking-[0.16em] text-[var(--kraft)] [font-family:var(--font-jetbrains-mono),monospace]">
          {feedback}
        </p>
      ) : null}

      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          onClick={() => void sendToFriend()}
          className="flex-1 border border-[var(--bordeaux-bright)] bg-[var(--bordeaux)] px-3 py-2.5 text-[9px] font-medium uppercase tracking-[0.18em] text-[var(--kraft-light)] transition-colors [font-family:var(--font-jetbrains-mono),monospace] hover:bg-[var(--bordeaux-bright)] sm:flex-none"
        >
          Arkadaşına gönder
        </button>
        <button
          type="button"
          onClick={dismiss}
          className="flex-1 border border-[var(--kraft-dark)] bg-transparent px-3 py-2.5 text-[9px] font-medium uppercase tracking-[0.18em] text-[var(--kraft)] transition-colors [font-family:var(--font-jetbrains-mono),monospace] hover:border-[var(--kraft)] sm:flex-none"
        >
          Tek başıma devam
        </button>
      </div>
    </div>
  );
}
