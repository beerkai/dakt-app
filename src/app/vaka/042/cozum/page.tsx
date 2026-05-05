"use client";

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const MIN_FALLBACK = 260;

export default function CozumPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [frontH, setFrontH] = useState(0);
  const [backH, setBackH] = useState(0);

  const frontSizerRef = useRef<HTMLDivElement>(null);
  const backSizerRef = useRef<HTMLDivElement>(null);

  const measure = useCallback(() => {
    const hf = frontSizerRef.current?.offsetHeight ?? 0;
    const hb = backSizerRef.current?.offsetHeight ?? 0;
    setFrontH(hf);
    setBackH(hb);
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(() => measure());
    const f = frontSizerRef.current;
    const b = backSizerRef.current;
    if (f) ro.observe(f);
    if (b) ro.observe(b);
    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
    };
  }, [measure]);

  const targetMin = Math.max(
    isOpen ? backH || MIN_FALLBACK : frontH || MIN_FALLBACK,
    MIN_FALLBACK,
  );

  const close = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const open = () => {
    measure();
    setIsOpen(true);
  };

  return (
    <section id="solution">
      <div className="section-head">
        <div className="section-num">09</div>
        <h2 className="section-title">Çözüm Zarfı</h2>
        <span className="section-sub">042-Z2 · Sınırlı Erişim</span>
      </div>

      <div className="envelope-flip-scene">
        <div
          className={`envelope-flip-inner${isOpen ? " is-open" : ""}`}
          aria-live="polite"
          style={{ minHeight: targetMin }}
        >
          <div className="envelope-face envelope-face--front">
            <div ref={frontSizerRef}>
              <div className="gate" id="gate">
                <div className="gate-seal">
                  ⬢ KAPALI ZARF · ANALİZ ÖNCESİ AÇMAYIN ⬢
                </div>
                <h2 className="gate-title">Hazır mısın?</h2>
                <p className="gate-warn">
                  Zarfı açmadan önce şu beş soruya kendi çıkarımlarınla cevap
                  vermiş olmalısın:
                  <br />
                  <br />
                  <strong style={{ color: "var(--kraft)" }}>1.</strong> Burak
                  tam olarak saat kaçta öldürüldü?
                  <br />
                  <strong style={{ color: "var(--kraft)" }}>2.</strong> Cinayet
                  nerede işlendi?
                  <br />
                  <strong style={{ color: "var(--kraft)" }}>3.</strong> Cinayet
                  aleti neydi?
                  <br />
                  <strong style={{ color: "var(--kraft)" }}>4.</strong> Failin
                  gerçek motivasyonu neydi?
                  <br />
                  <strong style={{ color: "var(--kraft)" }}>5.</strong> Failin
                  kim olduğuna hangi belgeler dayanıyor?
                  <br />
                  <br />
                  Yanıtların tutarsızsa zarfı açmak için{" "}
                  <em>henüz hazır değilsin</em>.
                </p>
                <button
                  type="button"
                  className="gate-btn"
                  id="openGate"
                  onClick={open}
                >
                  ▸ ZARFI AÇ
                </button>
              </div>
            </div>
          </div>

          <div
            className="envelope-face envelope-face--back"
            aria-hidden={!isOpen}
          >
            <div ref={backSizerRef}>
              <article className="verdict">
                <div className="verdict-stamp">CLASSIFIED</div>
                <div className="doc-id" style={{ marginBottom: 12 }}>
                  042-Z2 · Resmi Çözüm Belgesi · 15.05.2025
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 24,
                    margin: "0 0 8px",
                  }}
                >
                  Failin Kimliği:
                </h3>
                <div className="verdict-name">Meryem Güldağ</div>

                <h3>Cinayet Saati</h3>
                <p>
                  Yaklaşık <strong>22:14</strong>. Burak&apos;ın telefon
                  sinyalinin kesildiği an. 22:19&apos;daki &quot;okundu&quot;
                  işareti failin telefonu açtığını gösterir — yani Burak o
                  sırada ölmüştü.
                </p>

                <h3>Cinayet Yeri</h3>
                <p>
                  Aylin&apos;in dairesinin <strong>içi değil</strong>. Apartman
                  içerisinde — kat arası, koridor veya boş bir alan. Olay yeri
                  kameraları ve asansör logları (
                  <strong>23:08 → 23:17</strong> hareketinin iki yöne yapıldığı
                  pencereye dikkat: bu fail için cesedi taşıma operasyonudur,
                  ölüm öncesi değil).
                </p>

                <h3>Cinayet Aleti</h3>
                <p>
                  Olay yerinde bulunamadı. Profil: ağır, tek elle
                  taşınabilir, yüzeyi düz olmayan bir cisim. Olası:{" "}
                  <strong>
                    eski tip masa ayağı, demir kitaplık aparatı, beton parçası
                  </strong>
                  . Failin profesyonel çevresinden (akademik mobilya)
                  erişebileceği türde.
                </p>

                <h3>Motivasyon</h3>
                <p>
                  Psikolojik saplantı. Terk edilme korkusu. Kontrol kaybı.
                  Burak&apos;ın &quot;kesin kopuş&quot; sinyali fail
                  Meryem&apos;de yıkım etkisi yaratmıştır. Sesli mesajda
                  &quot;konuşmazsan bu bir suç olur&quot; tehdidi — Meryem suçu
                  önceden, açıkça ilan etmiştır. Fail, kontrol kaybını
                  &quot;sonsuz kontrol&quot;e çevirmek için cinayeti işlemiştir.
                </p>

                <h3>Dayandığı Belgeler</h3>
                <ol>
                  <li>
                    <strong>042-I (Sesli mesaj):</strong> Doğrudan tehdit
                    kaydı. &quot;Konuşmazsan bu bir suç olur.&quot;
                  </li>
                  <li>
                    <strong>GSM Sinyal:</strong> Burak 22:14&apos;te ölmüş;
                    Meryem ifadesinde &quot;23:00&apos;ü geçmişti, Burak
                    kapıdaydı&quot; diyor — <strong>zaman çelişkisi</strong>.
                    Meryem, Burak&apos;la 22:00-22:30 arasında binada
                    karşılaştığını gizliyor.
                  </li>
                  <li>
                    <strong>22:19 &quot;okundu&quot;:</strong> Mesajı failin
                    Meryem&apos;in kendisi açtı (kendine gönderdiği mesajın
                    okunduğunu kontrol etmek için olası refleks).
                  </li>
                  <li>
                    <strong>Şükrü Tanıklığı:</strong> &quot;Topuklu, saçları
                    açık kadın&quot; — Aylin değil (Aylin evinden
                    çıkmamıştı), Meryem&apos;le eşleşiyor.
                  </li>
                  <li>
                    <strong>Asansör 23:08–23:17:</strong> Aylin ve Emir bu
                    pencereyi üstlenmiyor. Cesedin Kat 4&apos;ten indirilmesi
                    için kullanılmış olabilir — ya da bu pencerede fail
                    (Meryem) cesetle ilgili düzenleme yapmış.
                  </li>
                  <li>
                    <strong>Otopsi:</strong> Arkadan, hedefli, savunma izi yok
                    — kurban faili tanıyor ve güveniyor. Eski hoca-öğrenci
                    ilişkisi profile uyuyor.
                  </li>
                  <li>
                    <strong>Polaroid (Emir) ve Aylin&apos;in çöpü</strong>{" "}
                    kasıtlı yanıltıcılardır (red herring). Ölüme bağlanmıyor.
                  </li>
                </ol>

                <p
                  style={{
                    background: "rgba(107,22,32,0.12)",
                    padding: 16,
                    borderLeft: "3px solid var(--bordeaux)",
                    marginTop: 24,
                  }}
                >
                  <strong>SONUÇ:</strong> Aylin yalnızca evsel atık attı (042
                  raporu temiz). Emir polaroid hırsızı, fail değil. Şükrü
                  tanık. Sinem alibili.{" "}
                  <strong>Fail Meryem Güldağ&apos;dır.</strong>
                </p>

                <div className="doc-signature">
                  <div className="sig-line">Kıdemli Kriminal Analist · EGM</div>
                  <div className="sig-name">Onaylı</div>
                </div>

                <button
                  type="button"
                  className="envelope-close-btn"
                  onClick={close}
                >
                  ◂ Zarfı Kapat
                </button>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
