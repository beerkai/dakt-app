"use client";

import { useState } from "react";

const ACCEPTED_KEY = "dakt_age_content_accepted_v1";

/**
 * <head> içinde ilk boyamadan önce çalışır: onay daha önce verildiyse kapı CSS
 * ile gizlenir. Böylece ne ilk ziyaretçiye içerik sızar ne de onaylamış
 * kullanıcıda kapı yanıp söner.
 */
export const AGE_GATE_BOOT_SCRIPT = `try{if(localStorage.getItem(${JSON.stringify(
  ACCEPTED_KEY,
)})==="true")document.documentElement.dataset.ageOk="1"}catch(e){}`;

export default function AgeContentGate() {
  const [accepted, setAccepted] = useState(false);

  function handleAccept() {
    try {
      localStorage.setItem(ACCEPTED_KEY, "true");
    } catch {}
    document.documentElement.dataset.ageOk = "1";
    setAccepted(true);
  }

  if (accepted) return null;

  return (
    <div
      className="age-content-gate"
      role="dialog"
      aria-labelledby="age-gate-title"
      aria-modal="true"
    >
      <div className="age-content-gate-panel">
        <div className="age-content-gate-corner age-content-gate-corner--tl" aria-hidden />
        <div className="age-content-gate-corner age-content-gate-corner--br" aria-hidden />

        <p className="age-content-gate-kicker">
          EYES ONLY · CLASSIFIED CONTENT
        </p>

        <h2 id="age-gate-title" className="age-content-gate-title">
          +16 İçerik Uyarısı
        </h2>

        <p className="age-content-gate-copy">
          D.A.K.T. <em>kurmaca polisiye</em> bir araştırma oyunudur. Vakalar
          cinayet, şiddet, suç içerikli temalar barındırır. Tüm karakterler ve
          olaylar hayalidir.
        </p>

        <p className="age-content-gate-copy age-content-gate-copy--soft">
          16 yaşından küçük kullanıcılar için uygun değildir.
        </p>

        <button
          type="button"
          onClick={handleAccept}
          className="age-content-gate-cta"
        >
          ▸ 16 yaşından büyüğüm, devam et
        </button>

        <p className="age-content-gate-foot">
          dakt.app · Division of Analytic Knowledge & Testimonies
        </p>
      </div>
    </div>
  );
}
