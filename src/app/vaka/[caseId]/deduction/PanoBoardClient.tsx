"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";

import {
  migratePanoNotesKeys,
  panoNotesStorageKey,
} from "@/lib/guest-progress-transfer";

const TTL_MS = 24 * 60 * 60 * 1000;
const DEFAULT_TEXT = "Yeni not...";

export type PanoNote = {
  id: string;
  text: string;
  createdAt: number;
  rotation: number;
};

function randRotation(): number {
  return Math.round((Math.random() * 4 - 2) * 10) / 10;
}

function makeId(): string {
  return `n-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function parseNotes(raw: string | null): PanoNote[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    const now = Date.now();
    return parsed
      .filter(
        (x): x is PanoNote =>
          typeof x === "object" &&
          x !== null &&
          typeof (x as PanoNote).id === "string" &&
          typeof (x as PanoNote).text === "string" &&
          typeof (x as PanoNote).createdAt === "number",
      )
      .filter((x) => now - x.createdAt <= TTL_MS)
      .map((x) => ({
        ...x,
        rotation: typeof x.rotation === "number" ? x.rotation : 0,
      }))
      .sort((a, b) => b.createdAt - a.createdAt);
  } catch {
    return [];
  }
}

export function PanoBoardClient({
  caseId,
  sectionNum,
}: {
  caseId: string;
  sectionNum: string;
}) {
  const [notes, setNotes] = useState<PanoNote[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const taRef = useRef<HTMLTextAreaElement | null>(null);
  const focusNewIdRef = useRef<string | null>(null);
  const skipBlurRef = useRef(false);

  const persist = useCallback(
    (list: PanoNote[]) => {
      try {
        localStorage.setItem(
          panoNotesStorageKey(caseId),
          JSON.stringify(list),
        );
      } catch {
        /* ignore */
      }
    },
    [caseId],
  );

  const reload = useCallback(() => {
    try {
      migratePanoNotesKeys();
      setNotes(
        parseNotes(localStorage.getItem(panoNotesStorageKey(caseId))),
      );
    } catch {
      setNotes([]);
    }
  }, [caseId]);

  useEffect(() => {
    reload();
    setHydrated(true);
  }, [reload]);

  useLayoutEffect(() => {
    if (!editingId || focusNewIdRef.current !== editingId) return;
    taRef.current?.focus();
    taRef.current?.select();
    focusNewIdRef.current = null;
  }, [editingId, notes]);

  function addNote() {
    const id = makeId();
    const note: PanoNote = {
      id,
      text: DEFAULT_TEXT,
      createdAt: Date.now(),
      rotation: randRotation(),
    };
    focusNewIdRef.current = id;
    setNotes((prev) => {
      const now = Date.now();
      const next = [note, ...prev].filter((n) => now - n.createdAt <= TTL_MS);
      persist(next);
      return next;
    });
    setEditingId(id);
  }

  function updateText(id: string, text: string) {
    setNotes((prev) => {
      const next = prev.map((n) => (n.id === id ? { ...n, text } : n));
      persist(next);
      return next;
    });
  }

  function commitNote(id: string, text: string) {
    const trimmed = text.trim();
    setNotes((prev) => {
      let next: PanoNote[];
      if (!trimmed) next = prev.filter((n) => n.id !== id);
      else next = prev.map((n) => (n.id === id ? { ...n, text: trimmed } : n));
      const now = Date.now();
      next = next.filter((n) => now - n.createdAt <= TTL_MS);
      persist(next);
      return next;
    });
    setEditingId(null);
  }

  function removeNote(id: string, e?: MouseEvent) {
    e?.stopPropagation();
    setNotes((prev) => {
      const next = prev.filter((n) => n.id !== id);
      persist(next);
      return next;
    });
    setEditingId((cur) => (cur === id ? null : cur));
  }

  return (
    <section id="board">
      <div className="section-head">
        <div className="section-num">{sectionNum}</div>
        <h2 className="section-title">PANO</h2>
        <span className="section-sub">Notlar · Sadece sana özel</span>
      </div>

      <p className="mb-6 max-w-2xl text-[15px] leading-[1.55] text-[var(--subtitle-text)] [font-family:var(--font-newsreader),serif]">
        Bu pano sadece sana ait. Vakayla ilgili düşüncelerini, bağlantılarını,
        şüphelerini buraya yaz. Notların 24 saat saklanır. Co-op modu yakında —
        o zaman ekibinle paylaşabileceksin.
      </p>

      <div className="mb-8 flex flex-wrap items-center justify-end gap-3">
        <button
          type="button"
          onClick={addNote}
          className="border border-[var(--bordeaux-bright)] bg-[var(--bordeaux)] px-4 py-2.5 text-[9px] font-medium uppercase tracking-[0.22em] text-[var(--kraft-light)] transition-colors [font-family:var(--font-jetbrains-mono),monospace] hover:bg-[var(--bordeaux-bright)]"
        >
          + NOT EKLE
        </button>
      </div>

      {!hydrated ? null : notes.length === 0 ? (
        <p className="flex flex-wrap items-center justify-center gap-3 border border-dashed border-[var(--kraft-dark)]/50 bg-[var(--paper)]/5 px-6 py-10 text-[14px] italic leading-relaxed text-[var(--meta-label)] [font-family:var(--font-newsreader),serif]">
          <span aria-hidden className="text-[var(--kraft)]">
            ✎
          </span>
          Pano boş. İlk notunu eklemek için yukarıdan başla.
          <span aria-hidden className="text-[var(--kraft-dark)]">
            ◼
          </span>
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {notes.map((n) => (
            <article
              key={n.id}
              role="button"
              tabIndex={0}
              className="group relative min-h-[140px] cursor-text p-5 shadow-[0_4px_12px_var(--post-it-shadow),0_2px_4px_rgba(0,0,0,0.4)] transition-[box-shadow] [color:var(--post-it-text)] [font-family:var(--font-newsreader),serif] [background:var(--post-it)]"
              style={{
                transform: `rotate(${n.rotation}deg)`,
                fontSize: "14px",
                lineHeight: 1.6,
              }}
              onClick={() => setEditingId(n.id)}
              onKeyDown={(e) => {
                if (e.target !== e.currentTarget) return;
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setEditingId(n.id);
                }
              }}
            >
              <button
                type="button"
                aria-label="Notu sil"
                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded text-[18px] leading-none text-[var(--post-it-text)] opacity-0 transition-opacity hover:opacity-100 group-hover:opacity-80"
                onClick={(e) => removeNote(n.id, e)}
              >
                ×
              </button>
              {editingId === n.id ? (
                <textarea
                  ref={taRef}
                  className="min-h-[100px] w-full resize-none border-none bg-transparent p-0 text-[14px] leading-[1.6] text-[var(--post-it-text)] outline-none [font-family:var(--font-newsreader),serif] ring-0 focus:shadow-[0_0_0_2px_rgba(138,119,79,0.45)]"
                  value={n.text}
                  onChange={(e) => updateText(n.id, e.target.value)}
                  onPointerDown={(e) => e.stopPropagation()}
                  onKeyDown={(e) => {
                    e.stopPropagation();
                    if (e.key === "Escape") {
                      e.preventDefault();
                      skipBlurRef.current = true;
                      commitNote(n.id, n.text);
                    }
                  }}
                  onBlur={() => {
                    if (skipBlurRef.current) {
                      skipBlurRef.current = false;
                      return;
                    }
                    commitNote(n.id, n.text);
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <div className="whitespace-pre-wrap">{n.text}</div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
