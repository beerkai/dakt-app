import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aydınlatma Metni · D.A.K.T.",
  description: "KVKK kapsamında veri işleme aydınlatma metni",
};

export default function AydinlatmaMetniPage() {
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
        Aydınlatma Metni
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
        KVKK · Son güncelleme: 8 Mayıs 2026
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
        Veri Sorumlusu
      </h2>
      <p>
        D.A.K.T. (Division of Analytic Knowledge & Testimonies), dakt.app
        üzerinden çalışan kurmaca polisiye araştırma oyunudur. Şu an erken aşama
        (beta) ürün olarak Berkay Aytekin tarafından bireysel olarak
        işletilmektedir. İletişim:{" "}
        <a
          href="mailto:jointhedakt@gmail.com"
          style={{ color: "var(--kraft)" }}
        >
          jointhedakt@gmail.com
        </a>
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
        İşlenen Kişisel Veriler
      </h2>
      <p>D.A.K.T. aşağıdaki kişisel verileri işler:</p>
      <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
        <li>
          Kayıtlı kullanıcılar için: e-posta adresi, kullanıcı adı (analist
          takma adı), tercih edilen renk
        </li>
        <li>
          Oyun aktivitesi: çözülen vakalar, doğruluk skoru, oda katılımları,
          son aktivite zamanı
        </li>
        <li>
          Misafir kullanıcılar için: yalnızca kullanıcı adı (tarayıcıda
          saklanır, sunucuya gönderilmez)
        </li>
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
        İşleme Amacı
      </h2>
      <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
        <li>Hesabınızı oluşturmak ve oyun ilerlemenizi kaydetmek</li>
        <li>
          Co-op (çok oyunculu) odalarda diğer kullanıcılarla bağlantınızı
          sağlamak
        </li>
        <li>Hesap güvenliği ve hizmet kalitesi için temel teknik kayıtları tutmak</li>
        <li>Kötüye kullanım durumlarında hesap kısıtlaması uygulayabilmek</li>
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
        Verilerin Saklandığı Yer
      </h2>
      <p>
        Veriler, üçüncü parti veritabanı sağlayıcısı
        <strong style={{ color: "var(--kraft)" }}> Supabase Inc. </strong>
        (Almanya, Frankfurt) tarafından sağlanan sunucularda saklanır. Kayıt
        sırasında verilerinizin Almanya&apos;da işlenmesini onaylamış olursunuz.
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
        Saklama Süresi
      </h2>
      <p>
        Hesap aktif olduğu sürece veriler işlenmeye devam eder. Kullanıcı
        hesabını sildiğinde tüm kişisel veriler
        <strong style={{ color: "var(--kraft)" }}> 30 gün içinde </strong>
        veritabanından kalıcı olarak silinir.
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
        Haklarınız (KVKK Madde 11)
      </h2>
      <p>Aşağıdaki haklara sahipsiniz:</p>
      <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
        <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
        <li>Hangi verilerin işlendiğini bilme</li>
        <li>Yanlış işlenen verilerin düzeltilmesini isteme</li>
        <li>Verilerinizin silinmesini isteme</li>
        <li>Otomatik analiz sonuçlarına itiraz etme</li>
        <li>Yasaya aykırı işleme nedeniyle zarara uğradıysanız tazminat talep etme</li>
      </ul>
      <p>
        Bu hakları kullanmak için{" "}
        <a
          href="mailto:jointhedakt@gmail.com"
          style={{ color: "var(--kraft)" }}
        >
          jointhedakt@gmail.com
        </a>{" "}
        adresinden bizimle iletişime geçebilirsiniz. Talebiniz
        <strong style={{ color: "var(--kraft)" }}> 30 gün içinde </strong>
        yanıtlanır.
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
        Çerezler
      </h2>
      <p>
        D.A.K.T. yalnızca işleyiş için zorunlu çerezler kullanır (oturum açma,
        oda durumu). Reklam veya izleme çerezi yoktur. Detaylar:{" "}
        <Link href="/yasal/cerez-politikasi" style={{ color: "var(--kraft)" }}>
          Çerez Politikası
        </Link>
        .
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
        Değişiklikler
      </h2>
      <p>
        Bu metin değişebilir. Değişiklikler dakt.app üzerinde yayınlandığı
        tarihten itibaren geçerlidir. Önemli değişikliklerde kayıtlı kullanıcılar
        e-posta ile bilgilendirilir.
      </p>
    </div>
  );
}
