"use client";

import { useState } from "react";

import { setCoopHostBypassAction } from "./actions";

export function SettingsForm({
  initialHostBypass,
}: {
  initialHostBypass: boolean;
}) {
  const [hostBypass, setHostBypass] = useState(initialHostBypass);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  async function handleSave() {
    setSaving(true);
    try {
      await setCoopHostBypassAction(hostBypass);
      setSavedAt(Date.now());
      window.setTimeout(() => setSavedAt(null), 2400);
    } catch (e) {
      alert("Kaydetme başarısız: " + (e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      style={{
        background: "var(--anthracite)",
        border: "1px solid var(--rule)",
        padding: "32px 28px",
        marginBottom: 32,
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontStyle: "italic",
          fontSize: 24,
          color: "var(--paper)",
          marginBottom: 6,
        }}
      >
        Co-op Çözüm Modu
      </h2>
      <p
        style={{
          fontFamily: "var(--font-special-elite), monospace",
          fontSize: 12,
          color: "var(--kraft)",
          lineHeight: 1.6,
          marginBottom: 20,
        }}
      >
        Çoklu oyunculu odalarda zarfın nasıl açılacağını belirler.
      </p>

      <div style={{ display: "grid", gap: 16 }}>
        <label
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
            cursor: "pointer",
            padding: 16,
            border: hostBypass ? "1px solid var(--rule)" : "1px solid var(--bordeaux)",
            background: hostBypass
              ? "transparent"
              : "rgba(127, 31, 56, 0.08)",
            transition: "all 0.2s",
          }}
        >
          <input
            type="radio"
            name="coop_mode"
            checked={!hostBypass}
            onChange={() => setHostBypass(false)}
            style={{ marginTop: 4, accentColor: "var(--bordeaux)" }}
          />
          <div>
            <div
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: 13,
                color: "var(--paper)",
                marginBottom: 4,
                fontWeight: 600,
                letterSpacing: "0.1em",
              }}
            >
              SAF BİRLİK
            </div>
            <div
              style={{
                fontFamily: "var(--font-special-elite), monospace",
                fontSize: 12,
                color: "var(--kraft-light)",
                lineHeight: 1.6,
              }}
            >
              Herkes aynı şüpheliye oy vermelidir. Oy birliği sağlanana kadar
              zarf açılamaz. (Varsayılan)
            </div>
          </div>
        </label>

        <label
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
            cursor: "pointer",
            padding: 16,
            border: hostBypass ? "1px solid var(--bordeaux)" : "1px solid var(--rule)",
            background: hostBypass
              ? "rgba(127, 31, 56, 0.08)"
              : "transparent",
            transition: "all 0.2s",
          }}
        >
          <input
            type="radio"
            name="coop_mode"
            checked={hostBypass}
            onChange={() => setHostBypass(true)}
            style={{ marginTop: 4, accentColor: "var(--bordeaux)" }}
          />
          <div>
            <div
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: 13,
                color: "var(--paper)",
                marginBottom: 4,
                fontWeight: 600,
                letterSpacing: "0.1em",
              }}
            >
              SAF BİRLİK + HOST BYPASS
            </div>
            <div
              style={{
                fontFamily: "var(--font-special-elite), monospace",
                fontSize: 12,
                color: "var(--kraft-light)",
                lineHeight: 1.6,
              }}
            >
              Aynı kural geçerli. Ek olarak host &quot;yine de aç&quot;
              diyerek tek başına zarfı açabilir.
            </div>
          </div>
        </label>
      </div>

      <div
        style={{
          marginTop: 28,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <button
          type="button"
          onClick={() => void handleSave()}
          disabled={saving || hostBypass === initialHostBypass}
          style={{
            background: "var(--bordeaux)",
            border: "1px solid var(--bordeaux-bright)",
            color: "var(--paper)",
            padding: "12px 28px",
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            cursor: saving ? "wait" : "pointer",
            opacity: saving || hostBypass === initialHostBypass ? 0.5 : 1,
          }}
        >
          {saving ? "Kaydediliyor..." : "Kaydet"}
        </button>

        {savedAt ? (
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: 11,
              color: "var(--accent-success, #0a7d4f)",
              letterSpacing: "0.15em",
            }}
          >
            ✓ Kaydedildi
          </span>
        ) : null}
      </div>
    </div>
  );
}
