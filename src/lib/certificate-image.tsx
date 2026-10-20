import "server-only";

import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

const PAPER = "#f1e7cf";
const INK = "#0e0f10";
const BORDEAUX = "#6b1620";
const KRAFT_DARK = "#8a774f";

const FONT_DIR = join(process.cwd(), "src/assets/fonts");

async function loadFonts() {
  const [elite, cormorantBold, cormorantItalic, mono] = await Promise.all([
    readFile(join(FONT_DIR, "SpecialElite-Regular.ttf")),
    readFile(join(FONT_DIR, "CormorantGaramond-Bold.ttf")),
    readFile(join(FONT_DIR, "CormorantGaramond-SemiBoldItalic.ttf")),
    readFile(join(FONT_DIR, "JetBrainsMono-Medium.ttf")),
  ]);
  return [
    { name: "Elite", data: elite, weight: 400 as const, style: "normal" as const },
    { name: "Cormorant", data: cormorantBold, weight: 700 as const, style: "normal" as const },
    { name: "Cormorant", data: cormorantItalic, weight: 600 as const, style: "italic" as const },
    { name: "Mono", data: mono, weight: 500 as const, style: "normal" as const },
  ];
}

function formatDuration(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  return `${Math.floor(s / 60)} dk ${s % 60} sn`;
}

export function safeFilenamePart(s: string): string {
  const t = s.trim().replace(/[^a-zA-Z0-9._-]+/g, "-");
  return (t.length ? t : "analist").slice(0, 48);
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", marginBottom: 10 }}>
      <span
        style={{
          fontFamily: "Mono",
          fontSize: 20,
          letterSpacing: 2,
          color: KRAFT_DARK,
          width: 260,
        }}
      >
        {label}
      </span>
      <span style={{ fontFamily: "Elite", fontSize: 26, color: INK }}>
        {value}
      </span>
    </div>
  );
}

export type CertificateData = {
  caseId: string;
  codename: string;
  analystName: string;
  solvedAt: string;
  attempts: number;
  durationSeconds: number;
};

export async function renderCertificate(
  data: CertificateData,
  headers: Record<string, string> = {},
): Promise<ImageResponse> {
  const date = new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(data.solvedAt));
  const attempts = Math.max(1, data.attempts);
  const codename = data.codename.toLocaleUpperCase("tr-TR");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: PAPER,
          padding: 24,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            border: `8px solid ${BORDEAUX}`,
            padding: 6,
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: `2px solid ${BORDEAUX}`,
              padding: "64px 120px 48px",
              position: "relative",
              backgroundImage: `radial-gradient(ellipse at top right, rgba(138,119,79,0.22), transparent 55%)`,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 60,
                right: 90,
                display: "flex",
                border: `3px solid ${BORDEAUX}`,
                padding: 4,
                transform: "rotate(-8deg)",
                opacity: 0.85,
              }}
            >
              <div
                style={{
                  display: "flex",
                  border: `3px solid ${BORDEAUX}`,
                  color: BORDEAUX,
                  fontFamily: "Mono",
                  fontSize: 34,
                  padding: "10px 28px",
                  letterSpacing: 4,
                }}
              >
                CLASSIFIED
              </div>
            </div>

            <div
              style={{
                marginTop: 40,
                fontFamily: "Cormorant",
                fontStyle: "italic",
                fontWeight: 600,
                fontSize: 104,
                letterSpacing: 24,
                color: BORDEAUX,
              }}
            >
              D.A.K.T.
            </div>
            <div
              style={{
                marginTop: 8,
                fontFamily: "Mono",
                fontSize: 20,
                letterSpacing: 6,
                color: KRAFT_DARK,
              }}
            >
              DIVISION OF ANALYTIC KNOWLEDGE &amp; TESTIMONIES
            </div>

            <div
              style={{
                margin: "48px 0",
                width: 320,
                height: 2,
                background: KRAFT_DARK,
              }}
            />

            <div
              style={{
                fontFamily: "Cormorant",
                fontWeight: 700,
                fontSize: 56,
                color: INK,
              }}
            >
              DOSYA KAPAMA SERTİFİKASI
            </div>
            <div
              style={{
                marginTop: 20,
                fontFamily: "Cormorant",
                fontWeight: 700,
                fontSize: 36,
                color: BORDEAUX,
              }}
            >
              {`DOSYA №${data.caseId} · ${codename}`}
            </div>

            <div
              style={{
                marginTop: 28,
                maxWidth: 1000,
                textAlign: "center",
                fontFamily: "Elite",
                fontSize: 26,
                lineHeight: 1.6,
                color: INK,
              }}
            >
              Bu belge, aşağıda kimliği belirtilen analistin söz konusu vakayı
              başarıyla çözdüğünü tasdik eder.
            </div>

            <div
              style={{
                marginTop: 44,
                display: "flex",
                flexDirection: "column",
                width: 760,
                padding: "28px 40px 18px",
                background: "rgba(138,119,79,0.10)",
                borderLeft: `6px solid ${BORDEAUX}`,
              }}
            >
              <InfoRow label="ANALİST:" value={data.analystName} />
              <InfoRow label="TARİH:" value={date} />
              <InfoRow
                label="ANALİZ SÜRESİ:"
                value={formatDuration(data.durationSeconds)}
              />
              <InfoRow
                label="DENEME:"
                value={attempts === 1 ? "İlk denemede" : `${attempts}. denemede`}
              />
            </div>

            <div
              style={{
                position: "absolute",
                bottom: 40,
                left: 120,
                right: 120,
                display: "flex",
                justifyContent: "space-between",
                fontFamily: "Mono",
                fontSize: 20,
                letterSpacing: 4,
                color: "rgba(0,0,0,0.4)",
              }}
            >
              <span>{`D.A.K.T. — ${new Date(data.solvedAt).getFullYear()}`}</span>
              <span>dakt.app</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1600,
      height: 1200,
      fonts: await loadFonts(),
      headers,
    },
  );
}
