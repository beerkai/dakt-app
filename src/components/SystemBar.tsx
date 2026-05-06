"use client";

import { useEffect, useState } from "react";

/** Sadece vaka dosyaları: operasyon şeridi (canlı saat, UTC+3). */
export function SystemBar() {
  const [parts, setParts] = useState({ h: "--", m: "--", s: "--" });

  useEffect(() => {
    function tick() {
      const d = new Date();
      setParts({
        h: String(d.getHours()).padStart(2, "0"),
        m: String(d.getMinutes()).padStart(2, "0"),
        s: String(d.getSeconds()).padStart(2, "0"),
      });
    }
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const { h, m, s } = parts;

  return (
    <div
      className="system-bar flex items-center justify-end border-b border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.4)] px-4 py-1 md:px-7 md:py-1.5"
      title="D.A.K.T. operasyon merkezine bağlısın"
    >
      <p
        className="m-0 flex flex-wrap items-center justify-end gap-x-1.5 gap-y-0.5 text-[var(--kraft-dark)] [font-family:var(--font-jetbrains-mono),ui-monospace,monospace] text-[9px] font-medium uppercase leading-none tracking-[0.2em] md:text-[10px]"
      >
        <span className="live-dot mb-px inline-block shrink-0 align-middle" aria-hidden />
        <span>Bağlantı</span>
        <span aria-hidden className="opacity-60">
          ·
        </span>
        <span>Canlı</span>
        <span aria-hidden className="opacity-60">
          ·
        </span>
        <span className="inline md:hidden tabular-nums">
          {h}:{m} UTC+3
        </span>
        <span className="hidden md:inline tabular-nums">
          {h}:{m}:{s} · UTC+3
        </span>
      </p>
    </div>
  );
}
