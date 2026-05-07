"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import type { CaseData } from "@/lib/case-types";
import { clearActiveSession } from "@/lib/active-session";

export function TerminatedClient({
  caseData,
  durationSeconds,
}: {
  caseData: CaseData;
  durationSeconds: number;
}) {
  const router = useRouter();

  useEffect(() => {
    clearActiveSession();
    window.dispatchEvent(new Event("dakt-session-change"));
  }, []);

  function formatDuration(secs: number): string {
    if (secs <= 0) return "—";
    const mins = Math.floor(secs / 60);
    const remainSecs = secs % 60;
    return `${mins} dk ${remainSecs} sn`;
  }

  function handleSoloContinue() {
    router.push(`/vaka/${caseData.id}/brief`);
  }

  function handleHome() {
    router.push("/");
  }

  const codenameUpper = caseData.codename.toLocaleUpperCase("tr-TR");

  return (
    <div className="terminated-page">
      <div className="terminated-card">
        <div className="terminated-corner" aria-hidden />

        <div className="terminated-stamp">⊗ SONLANDIRILDI</div>

        <h1 className="terminated-title">Host vakayı sonlandırdı</h1>

        <div className="terminated-meta">
          <div className="terminated-meta-row">
            <span className="terminated-meta-label">VAKA</span>
            <span className="terminated-meta-value">{codenameUpper}</span>
          </div>
          {durationSeconds > 0 ? (
            <div className="terminated-meta-row">
              <span className="terminated-meta-label">SÜRE</span>
              <span className="terminated-meta-value">
                {formatDuration(durationSeconds)}
              </span>
            </div>
          ) : null}
          <div className="terminated-meta-row">
            <span className="terminated-meta-label">DURUM</span>
            <span className="terminated-meta-value">Oturum kapatıldı</span>
          </div>
        </div>

        <p className="terminated-description">
          Vakaya tek başına devam edip kaldığın yerden bitirebilirsin. Notların
          ve ilerlemen saklanır. Best record olarak çözüm sürene bakılır (eğer
          çözersen).
        </p>

        <div className="terminated-actions">
          <button
            type="button"
            onClick={handleHome}
            className="confirm-btn confirm-btn-cancel"
          >
            Anasayfaya Dön
          </button>
          <button
            type="button"
            onClick={handleSoloContinue}
            className="confirm-btn confirm-btn-primary"
          >
            ▸ Tek Başıma Devam Et
          </button>
        </div>
      </div>
    </div>
  );
}
