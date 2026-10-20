"use client";

import { useState, useTransition } from "react";

import { updateCoopHostBypass } from "@/app/yonetim/actions";

type Props = {
  initialHostBypass: boolean;
  tableMissing: boolean;
};

const MODES = [
  {
    hostBypass: false,
    title: "Saf Birlik",
    description: "Zarf, odadaki herkes aynı şüpheliyi seçince açılır.",
  },
  {
    hostBypass: true,
    title: "Saf Birlik + Host Bypass",
    description:
      "Anlaşılamazsa oda kurucusu kendi oyuyla zarfı herkes için açabilir.",
  },
] as const;

export function CoopAyarlarForm({ initialHostBypass, tableMissing }: Props) {
  const [hostBypass, setHostBypass] = useState(initialHostBypass);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function save() {
    setFeedback(null);
    startTransition(async () => {
      const res = await updateCoopHostBypass(hostBypass);
      setFeedback("error" in res ? res.error : "✓ Kaydedildi");
    });
  }

  return (
    <div className="gm-card" style={{ position: "relative" }}>
      <div className="gm-card-corner" />
      <h2 className="gm-section-title" style={{ marginBottom: 16 }}>
        Co-op Çözüm Modu
      </h2>
      <p
        className="mb-6 max-w-xl text-[13px] leading-relaxed"
        style={{ color: "var(--gm-meta)" }}
      >
        Çözüm zarfından önce oda içi oylama yapılır. Bu ayar tüm odalarda
        geçerlidir.
      </p>

      {tableMissing ? (
        <p
          className="mb-6 text-[12px] tracking-[0.08em]"
          style={{ color: "var(--bordeaux-bright)" }}
          role="alert"
        >
          coop_settings tablosu okunamadı. Önce
          supabase/manual/coop_voting_and_settings.sql dosyasını çalıştır.
        </p>
      ) : null}

      <fieldset className="mb-6 space-y-3 border-0 p-0">
        <legend className="sr-only">Co-op çözüm modu</legend>
        {MODES.map((m) => (
          <label key={m.title} className="flex cursor-pointer items-start gap-3">
            <input
              type="radio"
              name="coop_solution_mode"
              className="mt-1"
              checked={hostBypass === m.hostBypass}
              onChange={() => setHostBypass(m.hostBypass)}
            />
            <span>
              <span
                className="block text-[12px] font-semibold uppercase tracking-[0.14em]"
                style={{ color: "var(--gm-ink)" }}
              >
                {m.title}
              </span>
              <span
                className="mt-1 block text-[12px]"
                style={{ color: "var(--gm-meta)" }}
              >
                {m.description}
              </span>
            </span>
          </label>
        ))}
      </fieldset>

      <button
        type="button"
        className="gm-button gm-button-accent"
        disabled={isPending || hostBypass === initialHostBypass}
        onClick={save}
      >
        {isPending ? "Kaydediliyor…" : "Kaydet"}
      </button>

      {feedback ? (
        <p
          className="mt-4 text-[12px] tracking-[0.08em]"
          role="status"
          style={{
            color: feedback.startsWith("✓")
              ? "var(--gm-meta-light)"
              : "var(--bordeaux-bright)",
          }}
        >
          {feedback}
        </p>
      ) : null}
    </div>
  );
}
