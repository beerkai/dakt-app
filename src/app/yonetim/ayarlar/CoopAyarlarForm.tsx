"use client";

import { useState, useTransition } from "react";

import {
  updateCoopSolutionMode,
  type CoopSolutionModeSetting,
} from "@/app/yonetim/actions";

type Props = {
  initialMode: CoopSolutionModeSetting;
};

export function CoopAyarlarForm({ initialMode }: Props) {
  const [mode, setMode] = useState<CoopSolutionModeSetting>(initialMode);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function save() {
    setFeedback(null);
    startTransition(() => {
      void (async () => {
        const res = await updateCoopSolutionMode(mode);
        if ("error" in res) {
          setFeedback(res.error);
          return;
        }
        setFeedback("✓ Kaydedildi");
      })();
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
        Çözüm zarfından önce oda içi oylama. Host bypass açıkken anlaşılamazlıkta
        yalnızca oda kurucusu kendi oyuyla zarfı açabilir.
      </p>

      <fieldset className="mb-6 space-y-3 border-0 p-0">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="radio"
            name="coop_solution_mode"
            className="mt-1"
            checked={mode === "unanimous"}
            onChange={() => setMode("unanimous")}
          />
          <span>
            <span
              className="block text-[12px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: "var(--gm-ink)" }}
            >
              Saf Birlik
            </span>
            <span
              className="mt-1 block text-[12px]"
              style={{ color: "var(--gm-meta)" }}
            >
              Herkes aynı şüpheliyi seçmeli.
            </span>
          </span>
        </label>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="radio"
            name="coop_solution_mode"
            className="mt-1"
            checked={mode === "unanimous_with_host_bypass"}
            onChange={() => setMode("unanimous_with_host_bypass")}
          />
          <span>
            <span
              className="block text-[12px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: "var(--gm-ink)" }}
            >
              Saf Birlik + Host Bypass
            </span>
            <span
              className="mt-1 block text-[12px]"
              style={{ color: "var(--gm-meta)" }}
            >
              Anlaşılamazsa host &quot;Yine de Aç&quot; ile kendi oyuyla devam eder.
            </span>
          </span>
        </label>
      </fieldset>

      <button
        type="button"
        className="gm-button gm-button-accent"
        disabled={isPending}
        onClick={() => save()}
      >
        Kaydet
      </button>

      {feedback ? (
        <p
          className="mt-4 text-[12px] tracking-[0.08em]"
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
