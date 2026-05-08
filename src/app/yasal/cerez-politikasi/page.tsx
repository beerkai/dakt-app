import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Çerez Politikası · D.A.K.T.",
  description: "D.A.K.T. çerez kullanımı ve yönetimi",
};

export default function CerezPolitikasiPage() {
  return (
    <div
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "60px 28px 120px",
        fontFamily: "var(--font-special-elite), monospace",
        lineHeight: 1.8,
        color: "#d6cdb6",
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: 11,
          letterSpacing: "0.2em",
          color: "var(--kraft-dark)",
          textTransform: "uppercase",
          textDecoration: "none",
          display: "inline-block",
          marginBottom: 32,
        }}
      >
        ◂ Anasayfa
      </Link>

      <h1
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontStyle: "italic",
          fontSize: 48,
          color: "var(--paper)",
          marginBottom: 8,
          lineHeight: 1.1,
        }}
      >
        Çerez Politikası
      </h1>

      <p
        style={{
          fontSize: 11,
          letterSpacing: "0.2em",
          color: "var(--kraft-dark)",
          textTransform: "uppercase",
          marginBottom: 48,
        }}
      >
        Son güncelleme: 8 Mayıs 2026
      </p>

      <h2
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: 24,
          color: "var(--paper)",
          marginTop: 32,
          marginBottom: 12,
        }}
      >
        Çerez Nedir?
      </h2>
      <p>
        Çerezler, web siteleri tarafından tarayıcınızda saklanan küçük metin
        dosyalarıdır. Tercihlerinizi hatırlamak ve hizmetin çalışmasını sağlamak
        için kullanılırlar.
      </p>

      <h2
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: 24,
          color: "var(--paper)",
          marginTop: 32,
          marginBottom: 12,
        }}
      >
        D.A.K.T. Hangi Çerezleri Kullanır?
      </h2>

      <h3
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: 18,
          color: "var(--paper)",
          marginTop: 24,
          marginBottom: 8,
        }}
      >
        Zorunlu çerezler (her zaman aktif)
      </h3>
      <p>
        Bu çerezler hizmetin temel işleyişi için zorunludur ve kapatılamaz:
      </p>
      <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
        <li>Oturum açma ve kullanıcı doğrulama (Supabase Auth)</li>
        <li>Oyun durumu (mevcut oda, mola durumu)</li>
        <li>16+ içerik onayı (sayfa her açılışta tekrar sormamak için)</li>
        <li>Misafir kullanıcı adı (kayıt olmadan oynayabilmek için)</li>
      </ul>

      <h3
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: 18,
          color: "var(--paper)",
          marginTop: 24,
          marginBottom: 8,
        }}
      >
        Analitik çerezler
      </h3>
      <p>
        D.A.K.T. şu an üçüncü parti analitik çerez (Google Analytics, Facebook
        Pixel vb.) kullanmamaktadır. İleride eklenirse bu politika güncellenecek
        ve sizin onayınız alınacaktır.
      </p>

      <h3
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: 18,
          color: "var(--paper)",
          marginTop: 24,
          marginBottom: 8,
        }}
      >
        Reklam çerezleri
      </h3>
      <p>D.A.K.T. reklam göstermez. Reklam takip çerezi yoktur.</p>

      <h2
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: 24,
          color: "var(--paper)",
          marginTop: 32,
          marginBottom: 12,
        }}
      >
        Çerezleri Nasıl Yönetebilirsiniz?
      </h2>
      <p>
        Tarayıcınızın ayarlarından çerezleri silebilir veya engelleyebilirsiniz.
        Ancak zorunlu çerezleri engellerseniz giriş yapamaz, oda kuramaz veya
        çözümlerinizi kaydedemezsiniz.
      </p>

      <h2
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: 24,
          color: "var(--paper)",
          marginTop: 32,
          marginBottom: 12,
        }}
      >
        İletişim
      </h2>
      <p>
        Çerez kullanımı hakkında sorularınız için:{" "}
        <a
          href="mailto:jointhedakt@gmail.com"
          style={{ color: "var(--kraft)" }}
        >
          jointhedakt@gmail.com
        </a>
      </p>
    </div>
  );
}
