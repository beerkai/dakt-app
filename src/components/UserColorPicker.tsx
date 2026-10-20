"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { updateProfileColor } from "@/app/profil/actions";
import { ANALYST_COLOR_HEX } from "@/lib/colors";
import type { AnalystColor } from "@/lib/supabase/types";
import { useAppOverlayLock } from "@/hooks/useAppOverlayLock";

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
  useAppOverlayLock(open);

  useEffect(() => {
    if (open) {
      setSelected(currentColor);
      setError(null);
    }
  }, [open, currentColor]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && !saving) onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, saving, onClose]);

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
    <div className="app-overlay" role="presentation">
      <button
        type="button"
        className="app-overlay-backdrop"
        aria-label="Kapat"
        onClick={() => !saving && onClose()}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="color-picker-title"
        className={`app-overlay-panel ${mono}`}
      >
        <div className="sheet-grab md:hidden" aria-hidden />
        <div className="app-overlay-scroll">
          <h2
            id="color-picker-title"
            className="mb-2 text-xl italic text-[var(--kraft)] [font-family:var(--font-cormorant),serif]"
          >
            Analist rengi
          </h2>
          <p className="mb-6 text-[11px] uppercase tracking-[0.2em] text-[var(--meta-label)]">
            Menü ve profil görünümünde kullanılır.
          </p>

          <div className="mb-2 flex flex-wrap justify-center gap-3">
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
            <p className="mt-4 text-[11px] text-[var(--bordeaux-bright)]">
              {error}
            </p>
          ) : null}
        </div>
        <div className="app-overlay-actions">
          <button
            type="button"
            disabled={saving}
            onClick={onClose}
            className="confirm-btn confirm-btn-cancel"
          >
            İptal
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => void handleSave()}
            className="confirm-btn confirm-btn-primary"
          >
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      </div>
    </div>
  );
}
