"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
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
    <div className="terminated-page">
      <div className="terminated-card" role="alert">
        <div className="terminated-corner" aria-hidden />
        <div className="terminated-stamp">⚠ BAĞLANTI KESİLDİ</div>
        <h1 className="terminated-title">Bir şeyler ters gitti</h1>
        <p className="terminated-description">
          Dosya yüklenirken beklenmeyen bir hata oluştu. Tekrar dene; sorun
          sürerse anasayfadan devam edebilirsin.
          {error.digest ? (
            <span className="mt-3 block opacity-60">Kayıt: {error.digest}</span>
          ) : null}
        </p>
        <div className="terminated-actions">
          <Link href="/" className="confirm-btn confirm-btn-cancel">
            Anasayfaya Dön
          </Link>
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="confirm-btn confirm-btn-primary"
          >
            ▸ Tekrar Dene
          </button>
        </div>
      </div>
    </div>
  );
}
