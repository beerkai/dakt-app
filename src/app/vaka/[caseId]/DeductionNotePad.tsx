"use client";

import { useEffect, useState, type ChangeEvent } from "react";

export function DeductionNotePad({ caseId }: { caseId: string }) {
  const storageKey = `dakt-vaka-${caseId}-analyst-note`;
  const [value, setValue] = useState("");

  useEffect(() => {
    queueMicrotask(() => {
      const stored = localStorage.getItem(storageKey);
      if (stored) setValue(stored);
    });
  }, [storageKey]);

  function onChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const v = e.target.value;
    setValue(v);
    localStorage.setItem(storageKey, v);
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
