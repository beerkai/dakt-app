import { DeductionNotePad } from "../DeductionNotePad";

export default function DeductionPage() {
  return (
    <section id="board">
      <div className="section-head">
        <div className="section-num">08</div>
        <h2 className="section-title">Deduction Board</h2>
        <span className="section-sub">Çelişkiler · Bağlantılar</span>
      </div>

      <div className="board">
        <div className="board-grid">
          <div className="board-col">
            <h4>▸ Çelişki Haritası</h4>
            <div className="board-item">
              <span className="pin" />
              <strong>23:08–23:17 boşluğu:</strong> Aylin evinde, Emir henüz yok.
              Bu 9 dakikada Kat 4&apos;e çıkıp inen kim?
            </div>
            <div className="board-item">
              <span className="pin" />
              <strong>Burak&apos;ın anahtarı:</strong> Aylin&apos;in kapısına uyuyor.
              Kapıyı çalıp neden kullanmadı? — Belki içeri girdi.
            </div>
            <div className="board-item">
              <span className="pin" />
              <strong>Meryem&apos;in ifadesi:</strong> &quot;23:00&apos;ü
              geçmişti, Burak&apos;ın kapıya yöneldiğini gördüm.&quot; Ama
              Burak&apos;ın telefonu 22:06&apos;da bina içinde,
              22:14&apos;te susuyor — Meryem&apos;in tanıkladığı saatten önce
              ölmüş.
            </div>
            <div className="board-item">
              <span className="pin" />
              <strong>22:19 &quot;okundu&quot;:</strong> Burak öldükten sonra
              mesajı kim açtı? Telefon failin elindeydi.
            </div>
            <div className="board-item">
              <span className="pin" />
              <strong>Lavanta havlusu:</strong> Burak&apos;ın evinden,
              Aylin&apos;in çöpünde. DNA: Burak. Havlu cesetle birlikte taşındı
              mı?
            </div>
          </div>

          <div className="board-col">
            <h4>▸ Eleme Mantığı</h4>
            <div className="board-item">
              <span className="pin" />
              <strong>Sinem:</strong> Olay gecesi Fenerbahçe&apos;de, anne
              tanıklığı. Fiziksel temas imkansız. ✗
            </div>
            <div className="board-item">
              <span className="pin" />
              <strong>Emir:</strong> 01:00–03:00 arası Aylin&apos;in evinde.
              Ölüm 22:30–00:30. Zaman uyuşmuyor. Polaroid hırsızlığı motif değil.
              ✗
            </div>
            <div className="board-item">
              <span className="pin" />
              <strong>Şükrü:</strong> Tanık. Topuklu kadın gördüğünü beyan etti,
              kendi kadın değil. ✗
            </div>
            <div className="board-item">
              <span className="pin" />
              <strong>Aylin:</strong> 23:00&apos;te Burak&apos;ı içeri almadı
              (kendi beyanı). Savunma izi yok — Burak kıza arkadan yaklaşmadı. Ev
              ortamı ölüm yeri değil (yer bulgusu yok). Daha çok{" "}
              <strong>tuzaklayıcı değil tuzaklanan</strong> profili. ⚠
            </div>
            <div className="board-item">
              <span className="pin" />
              <strong>Meryem:</strong> Kendisi binada bulunduğunu kabul ediyor.
              23:00 sonrasında olduğunu söylüyor — fakat Burak
              22:14&apos;te ölmüştü. Yani{" "}
              <strong>
                22:00–22:30 arasında Burak&apos;la binada karşılaştığını gizliyor.
              </strong>{" "}
              Tehdit mesajı motif. Saplantı dosyaları profil.{" "}
              <strong>Saçları açık + topuklu kadın = Şükrü tanıklığı.</strong> ✓
            </div>
          </div>
        </div>

        <DeductionNotePad />
      </div>
    </section>
  );
}
