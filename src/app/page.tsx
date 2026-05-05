import Link from "next/link";

const metaFields = [
  { label: "Vaka Kodu", value: "DAKT-042-KRG" },
  { label: "Operasyon", value: "Karaağaç" },
  { label: "Sınıflandırma", value: "Yüksek Öncelik" },
  { label: "Şüpheli Sayısı", value: "05" },
  { label: "Belge", value: "11 Adet" },
  { label: "Açılış", value: "15.05.2025" },
] as const;

export default function Home() {
  return (
    <main className="relative z-[1] flex min-h-full flex-1 flex-col">
      <section className="hero" aria-labelledby="hero-heading">
        <div className="classification-strip">
          EYES ONLY · CLASSIFIED · ANALYST CLEARANCE REQUIRED
        </div>

        <h1 id="hero-heading" className="hero-title">
          Vaka <em>№ 042</em>
          <br />
          <em className="hero-title-place">Karaağaç</em> Dosyası.
        </h1>

        <p className="hero-subtitle">
          Caferağa, 13 Mayıs 2025, 04:15. Bir çöp konteynerinde bulunan bir
          beden. Beş şüpheli, on bir belge, bir gerçek. Çelişkileri eşle,
          ifadeleri çapraz oku, delili damgala.{" "}
          <strong>
            Yanlış çıkarım failin serbest kalmasıdır.
          </strong>
        </p>

        <div className="hero-meta-grid" role="list">
          {metaFields.map((row) => (
            <div
              key={row.label}
              className="hero-meta-cell"
              role="listitem"
            >
              <div className="lbl">{row.label}</div>
              <div className="val">{row.value}</div>
            </div>
          ))}
        </div>

        <div className="hero-cta-wrap">
          <Link href="/vaka/042/brief" className="hero-enter-btn">
            Vakaya Gir
          </Link>
        </div>
      </section>
    </main>
  );
}
