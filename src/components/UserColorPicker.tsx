"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { updateProfileColor } from "@/app/profil/actions";
import { ANALYST_COLOR_HEX } from "@/lib/colors";
import type { AnalystColor } from "@/lib/supabase/types";

const COLORS: AnalystColor[] = [
  "mavi",
  "sari",
  "yesil",
  "mor",
  "turuncu",
];

const mono =
  "[font-family:var(--font-jetbrains-mono),ui-monospace,monospace]";

export function UserColorPicker({
  currentColor,
  open,
  onClose,
}: {
  currentColor: AnalystColor;
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [selected, setSelected] = useState<AnalystColor>(currentColor);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setSelected(currentColor);
      setError(null);
    }
  }, [open, currentColor]);

  if (!open) return null;

  async function handleSave() {
    setSaving(true);
    setError(null);
    const result = await updateProfileColor(selected);
    setSaving(false);
    if ("error" in result) {
      setError(result.error);
      return;
    }
    router.refresh();
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[280] flex items-center justify-center p-4 md:p-6"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 border-0 bg-[var(--ink)]/80 backdrop-blur-sm"
        aria-label="Kapat"
        onClick={() => !saving && onClose()}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="color-picker-title"
        className={`relative z-[1] w-full max-w-[400px] border border-[var(--kraft-dark)] bg-[var(--anthracite)] p-6 shadow-[var(--shadow)] md:p-8 ${mono}`}
      >
        <h2
          id="color-picker-title"
          className="mb-2 text-xl italic text-[var(--kraft)] [font-family:var(--font-cormorant),serif]"
        >
          Analist rengi
        </h2>
        <p className="mb-6 text-[11px] uppercase tracking-[0.2em] text-[var(--meta-label)]">
          Menü ve profil görünümünde kullanılır.
        </p>

        <div className="mb-6 flex flex-wrap justify-center gap-3">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              title={c}
              disabled={saving}
              onClick={() => setSelected(c)}
              className={`size-[60px] shrink-0 border-2 transition-[border-color,box-shadow] ${
                selected === c
                  ? "border-[var(--bordeaux)] shadow-[0_0_0_2px_var(--bordeaux-bright)]"
                  : "border-[var(--rule)] hover:border-[var(--kraft-dark)]"
              }`}
              style={{ backgroundColor: ANALYST_COLOR_HEX[c] }}
            />
          ))}
        </div>

        {error ? (
          <p className="mb-4 text-[11px] text-[var(--bordeaux-bright)]">
            {error}
          </p>
        ) : null}

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            disabled={saving}
            onClick={onClose}
            className="border border-[var(--kraft)] bg-transparent px-4 py-3 text-[10px] uppercase tracking-[0.24em] text-[var(--kraft-light)] hover:border-[var(--kraft-light)]"
          >
            İptal
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => void handleSave()}
            className="border border-[var(--bordeaux-bright)] bg-[var(--bordeaux)] px-4 py-3 text-[10px] uppercase tracking-[0.24em] text-[var(--paper)] hover:bg-[var(--bordeaux-bright)]"
          >
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      </div>
    </div>
  );
}
