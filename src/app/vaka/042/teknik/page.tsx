import { ClientDocArticle } from "../ClientDocArticle";
import { WaveformClient } from "../WaveformClient";

export default function TeknikPage() {
  return (
    <section id="technical">
      <div className="section-head">
        <div className="section-num">06</div>
        <h2 className="section-title">Teknik Analizler</h2>
        <span className="section-sub">042-H · 042-I · 042-J · GSM</span>
      </div>

      <div className="audio-unit">
        <div className="audio-head">
          <span className="audio-label">
            042-I · Sesli Mesaj Transkripti · Meryem → Burak
          </span>
          <span className="audio-duration">
            00:59 · 12.05.2025 · 21:00
          </span>
        </div>
        <WaveformClient />
        <div className="transcript">
          <p>
            Burak... Bu seni kaçıncı arayışım bilmiyorum. Seninle konuşmak
            istiyorum, sadece bu.
          </p>
          <p>Cevap vermemen sessizlik değil; bu bir inkâr, bu bir silme çabası.</p>
          <p>
            Beni susturamazsın Burak. Çünkü ben senin susturduğun sesinim.
          </p>
          <p>
            <span className="highlight">
              &quot;Eğer benimle bir daha konuşmazsan... bu bir suç olur
              Burak.&quot;
            </span>
          </p>
          <p>Bekliyorum. ...Ve sen bunu duymadığını söyleme. Çünkü artık susmayacağım.</p>
        </div>
      </div>

      <div style={{ marginTop: 32 }}>
        <ClientDocArticle
          dataDoc="gsm"
          stamps={["approved", "cross"]}
          headerMain={
            <>
              <div className="doc-id">Telsimcell · GSM Adli İşlem</div>
              <h2 className="doc-title">Baz İstasyonu Sinyal Geçmişi</h2>
            </>
          }
          body={
            <>
              <p>
                <strong>SIM:</strong> Burak Karaağaç · 0588 957 23 12
              </p>

              <table className="signal-table">
                <thead>
                  <tr>
                    <th>Saat</th>
                    <th>Konum / Olay</th>
                    <th>Tip</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>20:45</td>
                    <td>Fenerbahçe — Sahil Caddesi</td>
                    <td>LTE Data</td>
                  </tr>
                  <tr>
                    <td>21:22</td>
                    <td>Moda Caddesi · Sesli görüşme 4dk</td>
                    <td>Voice</td>
                  </tr>
                  <tr>
                    <td>21:58</td>
                    <td>Caferağa 47. Sok. — Bina önü</td>
                    <td>Sinyal güçlendi</td>
                  </tr>
                  <tr>
                    <td>22:06</td>
                    <td>
                      Caferağa 47. Sok. — <strong>Bina içi</strong>
                    </td>
                    <td>Zayıf sinyal</td>
                  </tr>
                  <tr className="alert">
                    <td>22:14</td>
                    <td>Sinyal kesildi · cihaz kapatıldı/parazit</td>
                    <td>OFFLINE</td>
                  </tr>
                  <tr className="alert">
                    <td>22:19</td>
                    <td>WhatsApp &quot;okundu&quot; — Meryem mesajı</td>
                    <td>Cihaz açıldı</td>
                  </tr>
                  <tr>
                    <td>00:37</td>
                    <td>Statik sinyal — hareketsiz</td>
                    <td>Sabit</td>
                  </tr>
                </tbody>
              </table>

              <p
                style={{
                  marginTop: 18,
                  background: "rgba(107,22,32,0.1)",
                  padding: 12,
                  borderLeft: "3px solid var(--bordeaux)",
                }}
              >
                <strong>Kritik:</strong> 22:19&apos;daki &quot;okundu&quot;
                işareti, Burak&apos;ın darbeyi aldığı düşünülen anın hemen
                sonrasıdır. Cihazı <strong>fail</strong> açmış olabilir.
              </p>

              <div className="doc-signature">
                <div className="sig-line">GSM Adli İşlem Sorumlusu</div>
                <div className="sig-name">Gülce A.</div>
              </div>
            </>
          }
        />
      </div>

      <div style={{ marginTop: 32 }}>
        <ClientDocArticle
          dataDoc="video"
          stamps={["cross", "classified"]}
          headerMain={
            <>
              <div className="doc-id">042-H · Kriminal Görüntü İnceleme</div>
              <h2 className="doc-title">CCTV Analizi & Saat Sapması</h2>
            </>
          }
          body={
            <>
              <h3>Görüntü Tespiti — 12 Mayıs Gecesi</h3>
              <ul>
                <li>
                  <strong>02:39:44</strong> — Aylin&apos;e benzer kadın figür,
                  elinde siyah çöp torbası
                </li>
                <li>
                  <strong>02:40:17</strong> — Konteynere poşeti bırakır
                </li>
                <li>
                  <strong>02:40:36</strong> — Geri döner, apartman girişine
                  yönelir
                </li>
                <li>
                  <strong>02:41:12</strong> — Kameradan çıkar
                </li>
              </ul>

              <p
                style={{
                  background: "rgba(107,22,32,0.15)",
                  padding: "14px 18px",
                  border: "1px solid var(--bordeaux)",
                  marginTop: 16,
                }}
              >
                <strong>SAAT SAPMASI:</strong> NTP devre dışı. Sistem saati{" "}
                <strong>+47 dakika geride</strong>. Tüm kamera kayıtlarına +47 dk
                eklenecek.
                <br />
                Kamera <strong>02:41</strong> = Gerçek <strong>03:28</strong>
              </p>

              <h3>Asansör Hareket Günlüğü (Şükrü Aydın · Manuel)</h3>
              <table className="signal-table">
                <thead>
                  <tr>
                    <th>Saat</th>
                    <th>Hareket</th>
                    <th>Not</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="alert">
                    <td>23:08</td>
                    <td>Kat 0 → Kat 4</td>
                    <td>Yukarı çıkış</td>
                  </tr>
                  <tr className="alert">
                    <td>23:17</td>
                    <td>Kat 4 → Kat 0</td>
                    <td>Adımlar hızlıydı</td>
                  </tr>
                  <tr>
                    <td>01:03</td>
                    <td>Kat 0 → Kat 4</td>
                    <td>Sessiz çıkış (Emir)</td>
                  </tr>
                  <tr>
                    <td>03:01</td>
                    <td>Kat 4 → Kat 0</td>
                    <td>Kapı sesi (Emir)</td>
                  </tr>
                </tbody>
              </table>

              <p style={{ marginTop: 14 }}>
                <strong>Not:</strong> Kat 4&apos;te yalnızca Aylin oturuyor.{" "}
                <strong>
                  23:08 çıkışını ve 23:17 inişini hiçbir şüpheli üstlenmiyor.
                </strong>
              </p>

              <div className="doc-signature">
                <div className="sig-line">Kriminal Görüntü Analisti</div>
                <div className="sig-name">Sibel Kurt</div>
              </div>
            </>
          }
        />
      </div>
    </section>
  );
}
