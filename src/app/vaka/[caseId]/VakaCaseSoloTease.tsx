"use client";

import { useCallback, useEffect, useState } from "react";

export function VakaCaseSoloTease({
  caseId,
  codename,
  fullTitle,
}: {
  caseId: string;
  codename: string;
  fullTitle: string;
}) {
  const [visible, setVisible] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
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
  }, [caseId]);

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

  if (!visible) return null;

  return (
    <div
      className="vaka042-solo-tease pointer-events-auto fixed bottom-5 right-4 z-[160] max-w-[min(100vw-2rem,320px)] border-2 border-[var(--bordeaux)] bg-[var(--anthracite)] p-4 shadow-[var(--shadow)] md:bottom-8 md:right-8"
      role="dialog"
      aria-labelledby="solo-tease-title"
      aria-live="polite"
    >
      <p
        id="solo-tease-title"
        className="mb-3 text-[13px] leading-[1.65] tracking-[0.05em] text-[var(--kraft-light)] [font-family:var(--font-special-elite),monospace]"
      >
        <span className="text-[var(--bordeaux-bright)]" aria-hidden>
          ●
        </span>{" "}
        Şu an tek başınasın.
        <br />
        {codename} davası dört gözle daha hızlı çözülür.
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
