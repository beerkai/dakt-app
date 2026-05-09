"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { resetSolvedHistory } from "@/app/profil/actions";
import ConfirmModal from "@/components/ConfirmModal";

const mono =
  "[font-family:var(--font-jetbrains-mono),ui-monospace,monospace]";
const typewriter =
  "[font-family:var(--font-special-elite),monospace]";

function clearPlaythroughLocalStorage() {
  if (typeof window === "undefined") return;
  try {
    const toRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;
      if (
        key.startsWith("dakt_attempts_") ||
        key.startsWith("dakt_case_start_") ||
        /^dakt_v.+_cozum_session$/.test(key)
      ) {
        toRemove.push(key);
      }
    }
    for (const k of toRemove) localStorage.removeItem(k);
  } catch {
    /* ignore */
  }
}

export function ResetHistoryButton() {
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toastKey, setToastKey] = useState(0);
  const [toastMessage, setToastMessage] = useState("");

  async function runReset() {
    setConfirmOpen(false);
    const result = await resetSolvedHistory();
    if ("error" in result) {
      setToastMessage(result.error);
      setToastKey((k) => k + 1);
      return;
    }
    clearPlaythroughLocalStorage();
    router.refresh();
    setToastMessage("Geçmiş sıfırlandı");
    setToastKey((k) => k + 1);
  }

  return (
    <>
      <section
        className="mt-12 border-t border-[var(--rule)] pt-12"
        aria-labelledby="gecmis-tehlike-alani"
      >
        <h2
          id="gecmis-tehlike-alani"
          className={`mb-3 text-[10px] uppercase tracking-[0.28em] text-[var(--bordeaux-bright)] ${mono}`}
        >
          Tehlike bölgesi
        </h2>
        <p className={`mb-5 max-w-xl text-[12px] leading-relaxed text-[var(--subtitle-text)] ${typewriter}`}>
          Çözüm geçmişini sıfırla — tüm vaka çözüm kayıtların ve başarım
          ilerlemen silinir. Bu işlem geri alınamaz.
        </p>
        <button
          type="button"
          onClick={() => setConfirmOpen(true)}
          className={`${mono} border border-[var(--bordeaux-bright)] bg-transparent px-5 py-3 text-[10px] uppercase tracking-[0.22em] text-[var(--bordeaux-bright)] transition-colors hover:border-[var(--bordeaux-bright)] hover:bg-[var(--bordeaux)] hover:text-[var(--paper)]`}
        >
          ✗ Geçmişi sıfırla
        </button>
      </section>

      <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          void runReset();
        }}
        title="Emin misin?"
        description="Tüm çözüm geçmişin silinecek."
        confirmText="Sıfırla"
        cancelText="İptal"
        variant="danger"
      />

      {toastKey > 0 ? (
        <div
          key={toastKey}
          className="site-nav-logout-toast"
          role="status"
          aria-live="polite"
        >
          ● {toastMessage}
        </div>
      ) : null}
    </>
  );
}
