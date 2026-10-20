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
      className="age-content-gate fixed inset-0 z-[400] flex items-center justify-center"
      style={{
        background: "rgba(0, 0, 0, 0.92)",
        backdropFilter: "blur(12px)",
      }}
      role="dialog"
      aria-labelledby="age-gate-title"
      aria-modal="true"
    >
      <div
        style={{
          background: "var(--anthracite)",
          border: "1px solid var(--bordeaux)",
          padding: "44px 40px",
          maxWidth: 520,
          margin: "0 24px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-1px",
            left: "-1px",
            width: 32,
            height: 32,
            borderTop: "3px solid var(--bordeaux-bright)",
            borderLeft: "3px solid var(--bordeaux-bright)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-1px",
            right: "-1px",
            width: 32,
            height: 32,
            borderBottom: "3px solid var(--bordeaux-bright)",
            borderRight: "3px solid var(--bordeaux-bright)",
          }}
        />

        <div
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.35em",
            color: "var(--bordeaux-bright)",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          ⚠ EYES ONLY · CLASSIFIED CONTENT
        </div>

        <h2
          id="age-gate-title"
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontStyle: "italic",
            fontSize: 36,
            color: "var(--paper)",
            lineHeight: 1.2,
            margin: 0,
            marginBottom: 20,
          }}
        >
          +16 İçerik Uyarısı
        </h2>

        <p
          style={{
            fontFamily: "var(--font-special-elite), monospace",
            fontSize: 14,
            color: "var(--kraft-light)",
            lineHeight: 1.7,
            margin: 0,
            marginBottom: 16,
          }}
        >
          D.A.K.T. <em>kurmaca polisiye</em> bir araştırma oyunudur. Vakalar
          cinayet, şiddet, suç içerikli temalar barındırır. Tüm karakterler ve
          olaylar hayalidir.
        </p>

        <p
          style={{
            fontFamily: "var(--font-special-elite), monospace",
            fontSize: 13,
            color: "var(--kraft)",
            lineHeight: 1.6,
            margin: 0,
            marginBottom: 36,
            opacity: 0.85,
          }}
        >
          16 yaşından küçük kullanıcılar için uygun değildir.
        </p>

        <button
          type="button"
          onClick={handleAccept}
          style={{
            background: "var(--bordeaux)",
            border: "1px solid var(--bordeaux-bright)",
            color: "var(--paper)",
            padding: "16px 36px",
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 12,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--bordeaux-bright)";
            e.currentTarget.style.letterSpacing = "0.4em";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--bordeaux)";
            e.currentTarget.style.letterSpacing = "0.3em";
          }}
        >
          ▸ 16 yaşından büyüğüm, devam et
        </button>

        <div
          style={{
            marginTop: 24,
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 9,
            letterSpacing: "0.2em",
            color: "var(--kraft-dark)",
            textTransform: "uppercase",
            opacity: 0.6,
          }}
        >
          dakt.app · Division of Analytic Knowledge & Testimonies
        </div>
      </div>
    </div>
  );
}
