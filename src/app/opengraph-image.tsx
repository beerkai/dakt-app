import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const alt = "D.A.K.T. — Polisiye analiz oyunu";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#f1e7cf";
const INK = "#0e0f10";
const BORDEAUX = "#6b1620";
const KRAFT_DARK = "#8a774f";

export default async function OpengraphImage() {
  const dir = join(process.cwd(), "src/assets/fonts");
  const [elite, cormorant, mono] = await Promise.all([
    readFile(join(dir, "SpecialElite-Regular.ttf")),
    readFile(join(dir, "CormorantGaramond-Bold.ttf")),
    readFile(join(dir, "JetBrainsMono-Medium.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: INK,
          padding: 36,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: PAPER,
            border: `3px solid ${BORDEAUX}`,
            padding: "56px 72px",
            color: INK,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "Mono",
              fontSize: 20,
              letterSpacing: 6,
              color: KRAFT_DARK,
            }}
          >
            <span>DOSYA ARŞİVİ · GİZLİ</span>
            <span>DAKT.APP</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontFamily: "Cormorant",
                fontSize: 148,
                lineHeight: 1,
                color: INK,
              }}
            >
              D.A.K.T.
            </div>
            <div
              style={{
                fontFamily: "Elite",
                fontSize: 30,
                marginTop: 18,
                color: "#3a3832",
              }}
            >
              Division of Analytic Knowledge &amp; Testimonies
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                fontFamily: "Elite",
                fontSize: 24,
                color: INK,
              }}
            >
              Belgeleri incele. İfadeleri karşılaştır. Faili bul.
            </div>
            <div
              style={{
                display: "flex",
                border: `4px solid ${BORDEAUX}`,
                color: BORDEAUX,
                padding: "10px 22px",
                fontFamily: "Mono",
                fontSize: 22,
                letterSpacing: 4,
                whiteSpace: "nowrap",
                flexShrink: 0,
                transform: "rotate(-6deg)",
              }}
            >
              POLİSİYE ANALİZ
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Elite", data: elite, weight: 400, style: "normal" },
        { name: "Cormorant", data: cormorant, weight: 700, style: "normal" },
        { name: "Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
