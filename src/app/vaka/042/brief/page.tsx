import { ClientDocArticle } from "../ClientDocArticle";

export default function BriefPage() {
  return (
    <section id="brief">
      <div className="section-head">
        <div className="section-num">01</div>
        <h2 className="section-title">Vaka Özeti</h2>
        <span className="section-sub">042-A · Olay Yeri</span>
      </div>

      <ClientDocArticle
        dataDoc="brief"
        stamps={["approved", "denied", "classified"]}
        headerMain={
          <>
            <div className="doc-id">
              T.C. İçişleri Bakanlığı · Kriminal Soruşturma Birimi
            </div>
            <h2 className="doc-title">Soruşturma Dosyası — Olay Özeti</h2>
          </>
        }
        body={
          <>
            <dl className="doc-meta">
              <dt>Vaka No</dt>
              <dd>042</dd>
              <dt>Dosya Tipi</dt>
              <dd>Şüpheli Ölüm — Yüksek Öncelik</dd>
              <dt>Olay Tarihi</dt>
              <dd>13 Mayıs 2025 · 04:15</dd>
              <dt>Konum</dt>
              <dd>İstanbul · Kadıköy · Caferağa Mah. 47. Sokak</dd>
              <dt>Kurban</dt>
              <dd>Burak Karaağaç (28, erkek)</dd>
            </dl>

            <h3>Olay</h3>
            <p>
              13 Mayıs 2025 sabahı saat 04:15 sularında, Caferağa Mahallesi
              47. Sokak üzerindeki çöp konteynerinde 28 yaşındaki{" "}
              <strong>Burak Karaağaç&apos;ın</strong> cansız bedeni
              bulunmuştur. Kurban, başına aldığı künt bir darbe sonucu
              ölmüştür.
            </p>
            <p>
              Ceset, eski sevgilisi <strong>Aylin Yalçın&apos;ın</strong>{" "}
              oturduğu apartmana yalnızca <strong>10 metre</strong>{" "}
              mesafededir.
            </p>

            <h3>Zaman Aralığı</h3>
            <p>
              Kurban son olarak{" "}
              <strong>12 Mayıs 2025 gecesi saat 22:00</strong> civarında cep
              telefonu sinyaliyle Caferağa Mahallesi&apos;nde tespit edilmiştir.
              Adli tıp ön değerlendirmesine göre ölüm,{" "}
              <strong>22:30 ile 00:30 arası</strong> gerçekleşmiştir. Ceset
              04:15&apos;te bulunmuştur — yani ölüm sonrası en az{" "}
              <strong>3-6 saat</strong> arasında konteynere yerleştirilmiştir.
            </p>

            <h3>Görev</h3>
            <p>
              Bu dosyada yer alan tüm belgeleri dikkatlice incele.
              Çelişkileri bul, ifadeleri karşılaştır, fiziksel delilleri
              çözümle. Gerçek katili ve cinayet yöntemini{" "}
              <strong>mantıksal olarak ispatla</strong>.
            </p>
            <p
              style={{
                background: "rgba(107,22,32,0.1)",
                padding: "12px 16px",
                borderLeft: "3px solid var(--bordeaux)",
              }}
            >
              <strong>UYARI (XOR):</strong> Bu davada bazı ipuçları yalnızca{" "}
              <strong>bir tanesi doğru olabilir</strong>. Yanlış çıkarım failin
              serbest kalmasıyla sonuçlanacaktır.
            </p>

            <div className="doc-signature">
              <div className="sig-line">
                Düzenleyen
                <br />
                Kriminal Soruşturma Birimi
              </div>
              <div className="sig-name">G. Aras</div>
            </div>
          </>
        }
      />
    </section>
  );
}
