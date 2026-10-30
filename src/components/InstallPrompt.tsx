"use client";

import { useEffect, useRef, useState } from "react";

import { useFloatingLayer } from "@/hooks/useFloatingLayer";

const DISMISS_KEY = "dakt_install_dismissed_at";
const DISMISS_MS = 14 * 24 * 60 * 60 * 1000;
const mono =
  "[font-family:var(--font-jetbrains-mono),ui-monospace,monospace]";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function dismissedRecently() {
  try {
    const raw = localStorage.getItem(DISMISS_KEY);
    if (!raw) return false;
    return Date.now() - Number(raw) < DISMISS_MS;
  } catch {
    return true;
  }
}

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in navigator &&
      (navigator as Navigator & { standalone?: boolean }).standalone === true)
  );
}

export function InstallPrompt() {
  const [mode, setMode] = useState<"android" | "ios" | null>(null);
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  useFloatingLayer("install", rootRef, mode !== null);

  useEffect(() => {
    if (dismissedRecently() || isStandalone()) return;

    let androidEvent: BeforeInstallPromptEvent | null = null;

    function sync() {
      if (document.documentElement.dataset.ageOk !== "1") return;
      if (dismissedRecently() || isStandalone()) return;
      const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
      if (androidEvent) setMode("android");
      else if (ios) setMode("ios");
    }

    function onPrompt(event: Event) {
      event.preventDefault();
      androidEvent = event as BeforeInstallPromptEvent;
      setDeferred(androidEvent);
      sync();
    }

    window.addEventListener("beforeinstallprompt", onPrompt);
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-age-ok"],
    });
    sync();

    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      observer.disconnect();
    };
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
    setMode(null);
  }

  async function install() {
    if (!deferred) return;
    await deferred.prompt();
    const choice = await deferred.userChoice;
    if (choice.outcome === "accepted") dismiss();
    else setMode(null);
    setDeferred(null);
  }

  if (!mode) return null;

  return (
    <div ref={rootRef} className="install-prompt md:hidden" role="dialog" aria-label="Ana ekrana ekle">
      <p className={`${mono} install-prompt-kicker`}>Ana ekran</p>
      <p className="install-prompt-text">
        {mode === "ios"
          ? "Paylaş düğmesine bas, sonra “Ana Ekrana Ekle”. D.A.K.T. tam ekran açılır."
          : "D.A.K.T.'yi ana ekrana ekle. Tarayıcı çerçevesi kalkar, dosya uygulamada açılır."}
      </p>
      <div className="install-prompt-actions">
        {mode === "android" ? (
          <button type="button" className={`${mono} install-prompt-add`} onClick={() => void install()}>
            Ekle
          </button>
        ) : null}
        <button type="button" className={`${mono} install-prompt-later`} onClick={dismiss}>
          Şimdi değil
        </button>
      </div>
    </div>
  );
}
