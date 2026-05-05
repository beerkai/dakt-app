export default function DelillerPage() {
  return (
    <section id="evidence">
      <div className="section-head">
        <div className="section-num">05</div>
        <h2 className="section-title">Fiziksel Deliller</h2>
        <span className="section-sub">3 Adet Delil Fişi</span>
      </div>

      <div className="evidence-grid">
        <div className="evidence-card">
          <span className="evidence-tag">Fiziksel</span>
          <div className="evidence-code">BRK-AKT01</div>
          <h3 className="evidence-title">Anahtar — &quot;KA 4-D&quot;</h3>
          <p className="evidence-desc">
            Gümüş tekli metal anahtar. Burak&apos;ın pantolon cebinden çıktı.{" "}
            <strong>Aylin&apos;in dairesinin kilidine uyuyor.</strong>
          </p>
          <div className="evidence-detail">
            <span>▸ Parmak izi:</span> Yalnızca Burak&apos;ın.
            <br />
            <span>▸ Çelişki:</span> Aylin ifadesinde anahtar bilgisi yok.
            <br />
            <span>▸ Soru:</span> Kapıyı çalıp neden anahtar kullanmadı?
          </div>
        </div>

        <div className="evidence-card">
          <span className="evidence-tag">Fiziksel</span>
          <div className="evidence-code">EMR-PLR01</div>
          <h3 className="evidence-title">Polaroid Fotoğraf</h3>
          <p className="evidence-desc">
            4×5 cm, {"Aylin & Burak"} birlikte.{" "}
            <strong>Emir&apos;in gömlek cebinden çıktı.</strong> Aylin&apos;in
            buzdolabındaki fotoğraflarla eşleşiyor.
          </p>
          <div className="evidence-detail">
            <span>▸ Parmak izi:</span> Sol üst kenarda Emir&apos;in.
            <br />
            <span>▸ DNA:</span> Aylin/Burak&apos;a ait iz yok.
            <br />
            <span>▸ Açıklama:</span> &quot;Duygusal anda aldım.&quot;
          </div>
        </div>

        <div className="evidence-card">
          <span className="evidence-tag">DNA</span>
          <div className="evidence-code">AYL-HTL01</div>
          <h3 className="evidence-title">Lavanta Kokulu Havlu</h3>
          <p className="evidence-desc">
            Açık gri mikrofiber havlu.{" "}
            <strong>
              Konteyner içinde, Aylin&apos;in çöp attığını söylediği yerde
              bulundu.
            </strong>
          </p>
          <div className="evidence-detail">
            <span>▸ DNA:</span> Burak Karaağaç&apos;ın deri hücreleri.
            <br />
            <span>▸ Köken:</span> Burak&apos;ın evindeki havlu setiyle aynı seri.
            <br />
            <span>▸ Aylin&apos;in setinden değil.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
