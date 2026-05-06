"use client";

import { useEffect, useState } from "react";

export function VakaCaseBar({
  caseId,
  codename,
}: {
  caseId: string;
  codename: string;
}) {
  const [clock, setClock] = useState("--:--:-- · UTC+3");

  useEffect(() => {
    function tick() {
      const d = new Date();
      const h = String(d.getHours()).padStart(2, "0");
      const m = String(d.getMinutes()).padStart(2, "0");
      const s = String(d.getSeconds()).padStart(2, "0");
      setClock(`${h}:${m}:${s} · UTC+3`);
    }
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const tag = `VAKA-${caseId} // ${codename.toLocaleUpperCase("tr-TR")}`;

  return (
    <div className="bar">
      <div className="bar-left">
        <span className="bar-logo">D.A.K.T.</span>
        <span className="bar-case-tag">{tag}</span>
        <span className="bar-meta">
          Division of Analytic Knowledge & Testimonies
        </span>
      </div>
      <div className="bar-right">
        <span>
          <span className="live-dot" />
          OPS // CANLI
        </span>
        <span id="clock">{clock}</span>
      </div>
    </div>
  );
}
