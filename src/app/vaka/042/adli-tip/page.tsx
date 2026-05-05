import { ClientDocArticle } from "../ClientDocArticle";

export default function AdliTipPage() {
  return (
    <section id="forensics">
      <div className="section-head">
        <div className="section-num">04</div>
        <h2 className="section-title">Adli Tıp & Olay Yeri</h2>
        <span className="section-sub">042-A · 042-B</span>
      </div>

      <ClientDocArticle
        dataDoc="autopsy"
        stamps={["approved", "classified"]}
        headerMain={
          <>
            <div className="doc-id">
              042-B · İstanbul Adli Tıp Kurumu — 1. İhtisas Kurulu
            </div>
            <h2 className="doc-title">Otopsi Raporu</h2>
          </>
        }
        body={
          <>
            <dl className="doc-meta">
              <dt>Olay Tarihi</dt>
              <dd>13.05.2025</dd>
              <dt>Rapor Tarihi</dt>
              <dd>14.05.2025</dd>
              <dt>Hazırlayan</dt>
              <dd>Uzm. Dr. N. Aytaç</dd>
            </dl>

            <h3>Dış Muayene</h3>
            <ul>
              <li>
                Baş arka{" "}
                <strong>sol oksipital bölgede ~6 cm çapında hematom</strong>
              </li>
              <li>Deri altı kanama ve ezilme belirgin</li>
              <li>
                Kafa tası kırığı yok, fakat{" "}
                <strong>beyin içi kanama</strong> tespit edildi
              </li>
              <li>Burun ve sağ kulaktan düşük miktarda kan sızması</li>
            </ul>

            <h3>İç Muayene</h3>
            <ul>
              <li>Beyin zarları altında subdural hematom</li>
              <li>
                Kalp, akciğer, karaciğer ve dalakta travmatik bulguya rastlanmadı
              </li>
              <li>
                Toksikoloji: Kanda etanol (<strong>0.04 g/dL</strong>), başka
                kimyasal yok
              </li>
              <li>
                Cinsel saldırıya veya{" "}
                <strong>savunma yaralanmasına dair bulgu yok</strong>
              </li>
            </ul>

            <h3>Ölüm Sebebi</h3>
            <p>
              Baş bölgesine <strong>arkadan</strong> alınan künt bir darbe
              sonucu gelişen travmatik beyin kanaması. Ölüm, kaza veya intihar
              değil, <strong>dış müdahale kaynaklıdır</strong>.
            </p>

            <h3>Ölüm Zamanı & Sonuç</h3>
            <p>
              Ölüm zamanı <strong>22:30 ile 00:30 arası</strong>. Ceset en az 3,
              en fazla 6 saat sonra konteynere yerleştirilmiştir.
            </p>
            <p>
              Darbenin yeri ve şiddeti,{" "}
              <strong>
                failin kurbana arkadan yaklaştığını ve hedefli hareket ettiğini
              </strong>{" "}
              göstermektedir. Tüm bulgular üçüncü şahıs müdahalesine işaret
              etmektedir.
            </p>

            <div className="doc-signature">
              <div className="sig-line">Uzm. Dr.</div>
              <div className="sig-name">N. Aytaç</div>
            </div>
          </>
        }
      />

      <ClientDocArticle
        dataDoc="scene"
        stamps={["approved", "cross"]}
        headerMain={
          <>
            <div className="doc-id">042-A · Olay Yeri İnceleme</div>
            <h2 className="doc-title">Olay Yeri Raporu</h2>
          </>
        }
        body={
          <>
            <h3>Bulgular</h3>
            <ol>
              <li>
                Kurban, siyah çöp torbası içinde,{" "}
                <strong>sırt üstü pozisyonda</strong>. Sol elinden sarkan kan
                izleri mevcut.
              </li>
              <li>
                Baş arkasında 6 cm çapında <strong>künt travma</strong> —
                muhtemel alet: ağır, yüzeyi düz olmayan bir cisim.
              </li>
              <li>
                Kıyafetlerde <strong>yırtılma ya da sürüklenme izi yok</strong>{" "}
                — vücut bütünlüğü korunmuş, ölüm sonrası taşınmış.
              </li>
              <li>Pantolon cebinde sadece bir <strong>ev anahtarı</strong>.</li>
              <li>
                Çöp torbası ağız kısmında{" "}
                <strong>eldivenle dokunulmuş</strong> izleri.
              </li>
              <li>
                47. Sokak&apos;taki apartman giriş kamerası{" "}
                <strong>02:30&apos;da bir kadın</strong> figürünü konteyner
                yönüne yürürken gösteriyor — Aylin Yalçın ile eşleşiyor.
              </li>
            </ol>

            <p
              style={{
                background: "rgba(107,22,32,0.1)",
                padding: 12,
                borderLeft: "3px solid var(--bordeaux)",
              }}
            >
              <strong>Ön Not:</strong> Cinayet aleti olay yerinde bulunamamıştır.
              Olay yeri temizlenmiş izlenimi vermemektedir.{" "}
              <strong>
                Cinayet mahalli olarak farklı bir konum da ihtimal
                dahilindedir.
              </strong>
            </p>

            <div className="doc-signature">
              <div className="sig-line">Komiser Yardımcısı</div>
              <div className="sig-name">G. Aras</div>
            </div>
          </>
        }
      />
    </section>
  );
}
