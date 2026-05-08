import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kullanım Koşulları · D.A.K.T.",
  description: "D.A.K.T. hizmet kullanım koşulları",
};

export default function KullanimKosullariPage() {
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
        Kullanım Koşulları
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
        Kabul
      </h2>
      <p>
        D.A.K.T.&apos;ı (dakt.app) kullanarak bu koşulları kabul etmiş olursunuz.
        Kabul etmiyorsanız hizmeti kullanmamalısınız.
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
        Hizmet Tanımı
      </h2>
      <p>
        D.A.K.T., kurmaca polisiye vakaları araştıran bir yapay zeka destekli
        oyun deneyimidir. Tüm vakalar, karakterler ve olaylar hayalidir. Gerçek
        kişi, kurum veya olaylarla benzerlik tamamen tesadüfidir.
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
        Yaş Sınırı
      </h2>
      <p>
        D.A.K.T. cinayet, suç ve şiddet temalı içerikler barındırır. Hizmeti
        kullanabilmek için en az 16 yaşında olmalısınız. Kayıt sırasında 16
        yaşından büyük olduğunuzu beyan edersiniz.
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
        Hesap Sorumluluğu
      </h2>
      <p>
        Hesabınızın güvenliğinden siz sorumlusunuz. Hesabınızı başkalarıyla
        paylaşmayın. Kullanıcı adınız diğer oyuncular tarafından görülebilir;
        gerçek adınızı veya kişisel bilgilerinizi içermesin.
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
        Yasak Davranışlar
      </h2>
      <p>
        Aşağıdaki davranışlar yasaktır ve hesap askıya almaya yol açar:
      </p>
      <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
        <li>Diğer kullanıcılara taciz, hakaret, ayrımcılık</li>
        <li>Otomatik araçlar (bot) ile sistem yükleme</li>
        <li>Sistem güvenlik açıklarını sömürme</li>
        <li>Çoklu hesap açarak yasakları aşma</li>
        <li>Telif hakkı ihlali içeren içerik paylaşımı</li>
      </ul>

      <h2
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: 24,
          color: "var(--paper)",
          marginTop: 32,
          marginBottom: 12,
        }}
      >
        Hesap Sonlandırma
      </h2>
      <p>
        D.A.K.T., yasak davranışlar veya Topluluk kurallarına aykırı hareket
        halinde hesabı askıya alma veya silme hakkını saklı tutar. Kullanıcı
        dilediği zaman hesabını silebilir.
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
        Vakalar ve İçerik
      </h2>
      <p>
        Vakalar yapay zeka destekli oluşturulmuş kurmaca metinlerdir. Hiçbir vaka
        gerçek bir cinayet, kayıp veya suç vakasını canlandırmaz. Vakalardaki
        şiddet temaları sanatsal/yaratıcı amaçla kullanılmıştır, gerçek hayatta
        uygulanmaması gereken davranışları temsil eder.
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
        Sorumluluk Sınırlaması
      </h2>
      <p>
        D.A.K.T. erken aşama (beta) bir üründür. Hizmet &quot;olduğu gibi&quot;
        sunulur. Veri kaybı, hizmet kesintisi veya teknik hatalardan doğabilecek
        zararlardan D.A.K.T. sorumlu tutulamaz. Yasal sınırlar dahilinde
        sorumluluk reddedilir.
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
        Fikri Mülkiyet
      </h2>
      <p>
        D.A.K.T. markası, vakaların metinleri, oyun mekanikleri ve yazılım Berkay
        Aytekin&apos;e aittir. İzinsiz kopyalama, dağıtma veya türev eser üretimi
        yasaktır.
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
        Uygulanacak Hukuk
      </h2>
      <p>
        Bu sözleşme Türkiye Cumhuriyeti yasalarına tabidir. Uyuşmazlık durumunda
        İstanbul Mahkemeleri ve İcra Daireleri yetkilidir.
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
        Sorularınız için:{" "}
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
