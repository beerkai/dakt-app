"use client";

import { useEffect, useState, type ChangeEvent } from "react";

const STORAGE_KEY = "dakt-vaka-042-analyst-note";

export function DeductionNotePad() {
  const [value, setValue] = useState("");

  useEffect(() => {
    queueMicrotask(() => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setValue(stored);
    });
  }, []);

  function onChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const v = e.target.value;
    setValue(v);
    localStorage.setItem(STORAGE_KEY, v);
  }

  return (
    <textarea
      className="note-pad"
      placeholder="ANALIST NOTU — Düşüncelerini buraya yaz. Bu not lokal kalır, ekiple paylaşılmaz."
      value={value}
      onChange={onChange}
    />
  );
}
