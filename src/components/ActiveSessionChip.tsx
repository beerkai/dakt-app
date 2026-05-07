"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  type ActiveSession,
  clearActiveSession,
  getActiveSession,
  getReturnUrl,
} from "@/lib/active-session";

import ConfirmModal from "./ConfirmModal";

function lobbyPathMatches(pathname: string | null, code: string | undefined) {
  if (!pathname || !code) return false;
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] !== "oda") return false;
  return parts[1]?.toUpperCase() === code.toUpperCase();
}

export default function ActiveSessionChip() {
  const router = useRouter();
  const pathname = usePathname();

  const [session, setSession] = useState<ActiveSession | null>(null);
  const [closeModalOpen, setCloseModalOpen] = useState(false);

  useEffect(() => {
    function loadSession() {
      setSession(getActiveSession());
    }

    loadSession();

    function handleSessionChange() {
      loadSession();
    }

    window.addEventListener("dakt-session-change", handleSessionChange);
    window.addEventListener("storage", handleSessionChange);

    return () => {
      window.removeEventListener("dakt-session-change", handleSessionChange);
      window.removeEventListener("storage", handleSessionChange);
    };
  }, []);

  if (!session) return null;

  if (pathname?.startsWith(`/vaka/${session.caseId}`)) return null;

  if (
    session.mode === "coop" &&
    session.code &&
    lobbyPathMatches(pathname, session.code) &&
    !pathname?.includes("/tekrar-katil")
  ) {
    return null;
  }

  function handleReturn() {
    if (!session) return;
    router.push(getReturnUrl(session));
  }

  function handleConfirmClose() {
    clearActiveSession();
    setSession(null);
    window.dispatchEvent(new Event("dakt-session-change"));
  }

  const isCoop = session.mode === "coop";

  return (
    <>
      <div className="active-session-chip">
        <div className="active-session-chip-row">
          <span
            className={isCoop ? "live-dot live-dot-green" : "live-dot"}
          />
          <span className="active-session-chip-label">
            {isCoop ? "BİRAZ MOLA" : "YARIM KALAN VAKA"}
          </span>
          <button
            type="button"
            onClick={() => setCloseModalOpen(true)}
            className="active-session-chip-close"
            aria-label="Oturumu kapat"
          >
            ×
          </button>
        </div>

        <div className="active-session-chip-info">
          <span className="active-session-chip-case">{session.caseName}</span>
          {isCoop ? (
            <span className="active-session-chip-code">
              ODA {session.code}
            </span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={handleReturn}
          className="active-session-chip-return"
        >
          ▸ VAKAYA DÖN
        </button>
      </div>

      <ConfirmModal
        open={closeModalOpen}
        onClose={() => setCloseModalOpen(false)}
        onConfirm={() => {
          handleConfirmClose();
          setCloseModalOpen(false);
        }}
        title="Aktif oturumu kapat"
        description={
          isCoop
            ? "Bu oturumu kapatırsan, vakaya dönmek için kod ile yeniden katılman gerekir. Arkadaşların oda devam ederse senin için bekler."
            : "Bu oturumu kapatırsan, vakaya dönmek için davalar sayfasından yeniden girmen gerek. İlerlemen kaybolur ama best record'un saklanır."
        }
        confirmText="Oturumu Kapat"
        cancelText="İptal"
        variant="danger"
      />
    </>
  );
}
