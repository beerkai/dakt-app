"use client";

import domtoimage from "dom-to-image-more";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
  type ReactNode,
} from "react";

const PAPER = "#f1e7cf";
const INK = "#0e0f10";
const BORDEAUX = "#6b1620";
const KRAFT_DARK = "#8a774f";

export type CertificateProps = {
  analystName: string;
  caseNumber: string;
  codename: string;
  date: string;
  analysisTime: string;
  attemptCount: number;
  accuracy: number;
};

export type CertificateHandle = {
  downloadPng: () => Promise<void>;
};

function safeFilenamePart(s: string): string {
  const t = s.trim().replace(/[^a-zA-Z0-9._-]+/g, "-");
  return (t.length ? t : "analist").slice(0, 48);
}

function InfoRow({
  label,
  children,
  last,
}: {
  label: string;
  children: ReactNode;
  last?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        marginBottom: last ? 0 : 6,
        alignItems: "baseline",
      }}
    >
      <span
        style={{
          color: KRAFT_DARK,
          fontWeight: 700,
          minWidth: 130,
          fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
          fontSize: 11,
          letterSpacing: "0.1em",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "var(--font-special-elite), ui-monospace, monospace",
          fontSize: 13,
          color: INK,
        }}
      >
        {children}
      </span>
    </div>
  );
}

export const Certificate = forwardRef<CertificateHandle, CertificateProps>(
  function Certificate(props, ref) {
    const certificateRef = useRef<HTMLDivElement>(null);
    const [busy, setBusy] = useState(false);

    const downloadPng = useCallback(async () => {
      const node = certificateRef.current;
      if (!node || busy) return;
      setBusy(true);
      try {
        const dataUrl = await domtoimage.toPng(node, {
          quality: 1,
          bgcolor: PAPER,
          width: 1600,
          height: 1200,
          style: {
            transform: "scale(2)",
            transformOrigin: "top left",
            width: "800px",
            height: "600px",
          },
        });

        const link = document.createElement("a");
        link.download = `dakt-sertifika-${props.caseNumber}-${safeFilenamePart(props.analystName)}.png`;
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.error("Sertifika PNG oluşturulamadı:", e);
      } finally {
        setBusy(false);
      }
    }, [busy, props.analystName, props.caseNumber]);

    useImperativeHandle(ref, () => ({ downloadPng }), [downloadPng]);

    const cn = props.codename.toLocaleUpperCase("tr-TR");

    return (
      <div
        style={{
          margin: "0 auto",
          width: 800,
          boxSizing: "border-box",
        }}
      >
        <div
          ref={certificateRef}
          style={{
            width: 800,
            height: 600,
            margin: 0,
            boxSizing: "border-box",
            position: "relative",
            background: PAPER,
            padding: "60px 80px",
            fontFamily: "var(--font-special-elite), ui-monospace, monospace",
            color: INK,
            border: "none",
            outline: "none",
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent 0px,
                transparent 30px,
                rgba(107, 22, 32, 0.04) 30px,
                rgba(107, 22, 32, 0.04) 31px
              ),
              radial-gradient(
                ellipse at top right,
                rgba(138, 119, 79, 0.18),
                transparent 50%
              )
            `,
            boxShadow: `
              inset 0 0 0 4px ${BORDEAUX},
              inset 0 0 0 6px ${PAPER},
              inset 0 0 0 7px ${BORDEAUX}
            `,
            overflow: "visible",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 40,
              right: 60,
              border: `4px double ${BORDEAUX}`,
              color: BORDEAUX,
              fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
              fontWeight: 700,
              fontSize: 22,
              padding: "10px 22px",
              letterSpacing: "0.1em",
              transform: "rotate(-8deg)",
              opacity: 0.85,
              pointerEvents: "none",
              zIndex: 2,
            }}
          >
            CLASSIFIED
          </div>

          <div
            style={{
              marginTop: 40,
              textAlign: "center",
              fontFamily: "var(--font-cormorant), serif",
              fontStyle: "italic",
              fontWeight: 600,
              fontSize: 56,
              letterSpacing: "0.3em",
              color: BORDEAUX,
            }}
          >
            D.A.K.T.
          </div>

          <div
            lang="en"
            style={{
              marginTop: 8,
              textAlign: "center",
              fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
              fontSize: 11,
              letterSpacing: "0.25em",
              color: KRAFT_DARK,
            }}
          >
            DIVISION OF ANALYTIC KNOWLEDGE & TESTIMONIES
          </div>

          <div
            style={{
              margin: "32px auto",
              width: 200,
              height: 1,
              background: KRAFT_DARK,
            }}
          />

          <div
            style={{
              textAlign: "center",
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 700,
              fontSize: 28,
              color: INK,
            }}
          >
            DOSYA KAPAMA SERTİFİKASI
          </div>

          <div
            style={{
              marginTop: 24,
              textAlign: "center",
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 600,
              fontSize: 18,
              color: BORDEAUX,
            }}
          >
            DOSYA №{props.caseNumber} ({cn})
          </div>

          <p
            style={{
              marginTop: 20,
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: 0,
              textAlign: "center",
              fontFamily: "var(--font-special-elite), ui-monospace, monospace",
              fontSize: 13,
              lineHeight: 1.7,
              color: INK,
              maxWidth: 540,
            }}
          >
            Bu belge, aşağıda kimliği belirtilen analistin söz konusu vakayı
            başarıyla çözdüğünü tasdik eder.
          </p>

          <div
            style={{
              margin: "32px auto 0",
              maxWidth: 400,
              padding: "20px 24px",
              background: "rgba(138, 119, 79, 0.08)",
              borderLeft: `3px solid ${BORDEAUX}`,
              borderTop: "none",
              borderRight: "none",
              borderBottom: "none",
              boxSizing: "border-box",
            }}
          >
            <InfoRow label="ANALİST:">{props.analystName}</InfoRow>
            <InfoRow label="TARİH:">{props.date}</InfoRow>
            <InfoRow label="ANALİZ SÜRESİ:">{props.analysisTime}</InfoRow>
            <InfoRow label="DENEME:">{props.attemptCount}. denemede</InfoRow>
            <InfoRow label="DOĞRULUK:" last>
              {props.accuracy}%
            </InfoRow>
          </div>

          <div
            style={{
              position: "absolute",
              bottom: 30,
              left: 80,
              right: 80,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
              fontSize: 11,
              letterSpacing: "0.2em",
              color: "rgba(0,0,0,0.4)",
              zIndex: 1,
            }}
          >
            <span>D.A.K.T. — 2026</span>
            <span>dakt.app · @dakt.app</span>
          </div>
        </div>
      </div>
    );
  },
);
