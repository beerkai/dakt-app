"use client";

import html2canvas from "html2canvas";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

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

export const Certificate = forwardRef<CertificateHandle, CertificateProps>(
  function Certificate(props, ref) {
    const innerRef = useRef<HTMLDivElement>(null);
    const [busy, setBusy] = useState(false);

    const downloadPng = useCallback(async () => {
      const el = innerRef.current;
      if (!el || busy) return;
      setBusy(true);
      try {
        const canvas = await html2canvas(el, {
          scale: 2,
          backgroundColor: "#f1e7cf",
          logging: false,
        });
        await new Promise<void>((resolve, reject) => {
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error("PNG oluşturulamadı"));
                return;
              }
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `dakt-sertifika-${props.caseNumber}-${safeFilenamePart(props.analystName)}.png`;
              a.click();
              URL.revokeObjectURL(url);
              resolve();
            },
            "image/png",
            0.95,
          );
        });
      } finally {
        setBusy(false);
      }
    }, [busy, props.analystName, props.caseNumber]);

    useImperativeHandle(ref, () => ({ downloadPng }), [downloadPng]);

    const cn = props.codename.toLocaleUpperCase("tr-TR");

    return (
      <div className="cert-wrap">
        <div
          ref={innerRef}
          className="cert-sheet"
          style={{
            width: 800,
            height: 600,
            boxSizing: "border-box",
            position: "relative",
            backgroundColor: "var(--paper)",
            color: "var(--ink)",
            border: "4px solid var(--bordeaux)",
            boxShadow:
              "inset 0 0 0 2px rgba(107, 22, 32, 0.35), var(--shadow)",
            padding: "48px 56px",
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent 0px,
                transparent 28px,
                rgba(107, 22, 32, 0.035) 28px,
                rgba(107, 22, 32, 0.035) 29px
              ),
              radial-gradient(ellipse at top right, rgba(138, 119, 79, 0.2), transparent 50%),
              radial-gradient(ellipse at bottom left, rgba(138, 119, 79, 0.12), transparent 55%)
            `,
            fontFamily: "var(--font-special-elite), ui-monospace, monospace",
          }}
        >
          <div
            className="cert-classified-stamp"
            style={{
              position: "absolute",
              top: 36,
              right: 40,
              border: "3px double var(--bordeaux)",
              color: "var(--bordeaux)",
              padding: "8px 16px",
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.2em",
              transform: "rotate(-9deg)",
              opacity: 0.88,
            }}
          >
            CLASSIFIED
          </div>

          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: 36,
                fontWeight: 600,
                fontStyle: "italic",
                letterSpacing: "0.22em",
                marginBottom: 8,
              }}
            >
              D.A.K.T.
            </div>
            <div
              style={{
                height: 1,
                background: "var(--bordeaux)",
                opacity: 0.45,
                maxWidth: 320,
                margin: "0 auto 12px",
              }}
            />
            <div
              lang="en"
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: 9,
                letterSpacing: "0.14em",
                color: "var(--kraft-dark)",
                marginBottom: 28,
              }}
            >
              DIVISION OF ANALYTIC KNOWLEDGE & TESTIMONIES
            </div>
            <div
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: "0.06em",
                marginBottom: 20,
              }}
            >
              DOSYA KAPAMA SERTİFİKASI
            </div>
            <p
              style={{
                fontSize: 13,
                lineHeight: 1.75,
                maxWidth: 520,
                margin: "0 auto 28px",
                color: "var(--anthracite-2)",
              }}
            >
              Bu belge, aşağıda kimliği belirtilen analistin{" "}
              <strong>
                DOSYA №{props.caseNumber} ({cn})
              </strong>{" "}
              vakasını başarıyla çözdüğünü tasdik eder.
            </p>
          </div>

          <div
            style={{
              maxWidth: 440,
              margin: "0 auto",
              border: "2px solid rgba(107, 22, 32, 0.45)",
              padding: "20px 24px",
              borderRadius: 2,
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: 11,
              lineHeight: 1.85,
              letterSpacing: "0.06em",
            }}
          >
            <div>
              <span style={{ color: "var(--kraft-dark)" }}>ANALİST:</span>{" "}
              {props.analystName}
            </div>
            <div>
              <span style={{ color: "var(--kraft-dark)" }}>TARİH:</span>{" "}
              {props.date}
            </div>
            <div>
              <span style={{ color: "var(--kraft-dark)" }}>
                ANALİZ SÜRESİ:
              </span>{" "}
              {props.analysisTime}
            </div>
            <div>
              <span style={{ color: "var(--kraft-dark)" }}>DENEME:</span>{" "}
              {props.attemptCount}. denemede
            </div>
            <div>
              <span style={{ color: "var(--kraft-dark)" }}>DOĞRULUK:</span>{" "}
              {props.accuracy}%
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              bottom: 36,
              left: 48,
              fontFamily: "var(--font-cormorant), serif",
              fontSize: 13,
              fontStyle: "italic",
              color: "var(--kraft-dark)",
              opacity: 0.9,
            }}
          >
            ◆ mühür · D.A.K.T.
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 32,
              right: 48,
              fontFamily: "var(--font-special-elite), monospace",
              fontSize: 11,
              letterSpacing: "0.08em",
              color: "var(--meta-label)",
            }}
          >
            dakt.app · @dakt.app
          </div>
        </div>
      </div>
    );
  },
);
