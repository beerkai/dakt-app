"use client";

import { useEffect } from "react";

export default function YonetimError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="gm-card" role="alert">
      <p className="gm-kicker">Bağlantı</p>
      <h1 className="gm-page-title" style={{ fontSize: 22 }}>
        Bu sayfa yüklenemedi
      </h1>
      <p style={{ margin: "12px 0 20px", color: "var(--gm-muted)" }}>
        Sorgu tamamlanamadı. Tekrar dene; sorun sürerse veritabanı
        bağlantısını kontrol et.
        {error.digest ? (
          <span style={{ display: "block", marginTop: 8, color: "var(--gm-faint)" }}>
            Kayıt {error.digest}
          </span>
        ) : null}
      </p>
      <button type="button" className="gm-button gm-button-accent" onClick={() => unstable_retry()}>
        Tekrar dene
      </button>
    </div>
  );
}
