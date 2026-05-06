"use client";

import { useMemo } from "react";

/** Deterministic waveform matching original script behavior (~80 bars, peak zone 51–59). */
export function WaveformClient() {
  const heights = useMemo(() => {
    const out: number[] = [];
    let seed = 42_001;
    for (let i = 0; i < 80; i++) {
      seed = (seed * 1103515245 + 12345) >>> 0;
      const r = (seed % 1000) / 1000;
      let h = 20 + r * 50;
      if (i > 50 && i < 60) {
        const r2 = ((seed >> 8) % 1000) / 1000;
        h = 70 + r2 * 20;
      }
      out.push(h);
    }
    return out;
  }, []);

  return (
    <div className="waveform" id="waveform">
      {heights.map((h, i) => (
        <div
          key={i}
          className="waveform-bar"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}
