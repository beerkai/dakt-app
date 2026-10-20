import Link from "next/link";

export default function NotFound() {
  return (
    <div className="terminated-page">
      <div className="terminated-card">
        <div className="terminated-corner" aria-hidden />
        <div className="terminated-stamp">⊘ KAYIT YOK</div>
        <h1 className="terminated-title">Dosya bulunamadı</h1>
        <p className="terminated-description">
          Aradığın sayfa arşivde yok ya da erişimine kapalı. Bağlantıyı kontrol
          et veya davalar listesinden devam et.
        </p>
        <div className="terminated-actions">
          <Link href="/" className="confirm-btn confirm-btn-cancel">
            Anasayfaya Dön
          </Link>
          <Link href="/davalar" className="confirm-btn confirm-btn-primary">
            ▸ Davalara Git
          </Link>
        </div>
      </div>
    </div>
  );
}
