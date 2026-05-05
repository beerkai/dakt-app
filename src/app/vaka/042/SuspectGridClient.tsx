"use client";

import { useState } from "react";

const SUSPECTS = [
  {
    id: "aylin",
    idLine: "SUSP-01 · CFR-47/4",
    name: "Aylin Yalçın",
    role: "Eski sevgili · Olay gecesi evdeydi",
    quote:
      '"Çöp atmak için dışarı çıktım. Konteynerin kapağı açıktı."',
  },
  {
    id: "emir",
    idLine: "SUSP-02 · MOD-26/2",
    name: "Emir Sezer",
    role: "Yakın arkadaş · Aylin'in evindeydi",
    quote: '"Sadece sohbet etmek istedim. Bir şarap aldım, gittim."',
  },
  {
    id: "sinem",
    idLine: "SUSP-03 · FNR-10/5",
    name: "Sinem Gürbüz",
    role: 'Yeni ilişki · "O gece bana gelecekti"',
    quote:
      "\"23:00'e kadar bekledim. Cevap gelmedi. Çok sinirlendim.\"",
  },
  {
    id: "sukru",
    idLine: "SUSP-04 · CFR-47/B",
    name: "Şükrü Aydın",
    role: "Apartman görevlisi · 11 yıllık kapıcı",
    quote:
      '"Gece çöp atan biri vardı ama tanıyamadım. Kadına benziyordu."',
  },
  {
    id: "meryem",
    idLine: "SUSP-05 · RSP-05/3",
    name: "Meryem Güldağ",
    role: "Eski danışman hocası · Tehditkâr ses kaydı",
    quote:
      '"Eğer benimle bir daha konuşmazsan... bu bir suç olur Burak."',
  },
] as const;

export function SuspectGridClient() {
  const [flagged, setFlagged] = useState<Set<string>>(new Set());

  function toggle(key: string) {
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  return (
    <div className="suspect-grid" id="suspectGrid">
      {SUSPECTS.map((s) => (
        <div
          key={s.id}
          className={`suspect-card${flagged.has(s.id) ? " flagged" : ""}`}
          data-suspect={s.id}
          onClick={() => toggle(s.id)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggle(s.id);
            }
          }}
          role="button"
          tabIndex={0}
        >
          <div className="suspect-id">{s.idLine}</div>
          <h3 className="suspect-name">{s.name}</h3>
          <div className="suspect-role">{s.role}</div>
          <p className="suspect-quote">{s.quote}</p>
          <button
            type="button"
            className="suspect-flag"
            onClick={(e) => {
              e.stopPropagation();
              toggle(s.id);
            }}
          >
            ⚐ İŞARETLE
          </button>
        </div>
      ))}
    </div>
  );
}
