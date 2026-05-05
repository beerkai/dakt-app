import { ClientDocArticle } from "../ClientDocArticle";

export default function IfadelerPage() {
  return (
    <section id="testimonies">
      <div className="section-head">
        <div className="section-num">03</div>
        <h2 className="section-title">Polis İfadeleri</h2>
        <span className="section-sub">042-C → 042-G</span>
      </div>

      <ClientDocArticle
        dataDoc="aylin"
        stamps={["approved", "denied", "cross"]}
        headerMain={
          <>
            <div className="doc-id">042-C · Kadıköy İlçe Emniyet Müdürlüğü</div>
            <h2 className="doc-title">İfade — Aylin Yalçın</h2>
          </>
        }
        body={
          <>
            <dl className="doc-meta">
              <dt>Tarih</dt>
              <dd>14.05.2025</dd>
              <dt>Doğum</dt>
              <dd>18.09.2000</dd>
              <dt>Meslek</dt>
              <dd>Öğrenci · Freelance içerik</dd>
              <dt>Adres</dt>
              <dd>Caferağa Mah. 47. Sok. No:17 D:4</dd>
            </dl>

            <p>
              Burak&apos;la yaklaşık iki yıldır süren bir ilişkim vardı. Son
              zamanlarda çok yıpranmıştık. Sadakatsizlik, yalanlar,
              güvensizlik... Yaklaşık bir hafta önce ilişkimizi tamamen bitirdik.
            </p>
            <p>
              12 Mayıs gecesi, gece yarısına yaklaşırken evde yalnızdım. Saat{" "}
              <strong>23:00 civarı kapı çaldı</strong>. Dürbünden baktım,
              Burak&apos;tı. Konuşmak istediğini tahmin ettim ama kapıyı açmadım.
              Hiç ses etmeden bekledim.
            </p>
            <p>
              Yaklaşık 2 saat sonra, saat{" "}
              <strong>01:00&apos;e yaklaşırken kapı çaldı. Gelen Emir&apos;di</strong>
              . Yanında şarap vardı. İçeri aldım, biraz konuştuk. Plak taktık,
              müzik dinledik, hatta güldük bile.
            </p>
            <p>
              Saat <strong>03:00 civarı Emir kalktı</strong>. Ben lavabodayken
              ceketini giymişti. Kapıya kadar uğurladım. &quot;İyi geldin&quot;
              dedim.
            </p>
            <p>
              Ben o gidince camın önünde oturdum. Bir sigara yaktım.{" "}
              <strong>03:15 civarı Emir hâlâ aşağıdaydı</strong>. Sonra bir taksi
              geldi, bindi, gitti.
            </p>
            <p>
              <strong>
                03:30 gibi mutfaktaki çöpleri alıp dışarı çıktım. Konteynerin
                kapağı açıktı. Çöpleri konteynere sallayıp hemen döndüm.
              </strong>{" "}
              Orada olağan dışı hiçbir şey fark etmedim.
            </p>
            <p>
              Burak&apos;ın öldüğünü sabah polisten öğrendim. Cesedin
              konteynerde bulunduğunu söylediklerinde midem bulandı.
            </p>

            <div className="doc-signature">
              <div className="sig-line">İfade Sahibi · Baskısız</div>
              <div className="sig-name">A. Yalçın</div>
            </div>
          </>
        }
      />

      <ClientDocArticle
        dataDoc="emir"
        stamps={["approved", "denied", "cross"]}
        headerMain={
          <>
            <div className="doc-id">042-D · Kadıköy İlçe Emniyet Müdürlüğü</div>
            <h2 className="doc-title">İfade — Emir Sezer</h2>
          </>
        }
        body={
          <>
            <dl className="doc-meta">
              <dt>Tarih</dt>
              <dd>14.05.2025</dd>
              <dt>Doğum</dt>
              <dd>11.02.2000</dd>
              <dt>Meslek</dt>
              <dd>Freelance Reklam Metin Yazarı</dd>
              <dt>Adres</dt>
              <dd>Moda Mah. Göztepe Cad. No:26 D:2</dd>
            </dl>

            <p>
              Burak&apos;la üniversite yıllarından beri arkadaşız. Son zamanlarda
              aramıza biraz mesafe girmişti. Yaklaşık bir hafta önce ayrıldıklarını
              öğrendim.
            </p>
            <p>
              12 Mayıs gecesi evde tek başımaydım. Saat{" "}
              <strong>00:30 gibi Aylin geldi aklıma</strong>. Bir şarap alıp
              yanına gitmeyi düşündüm. Sadece sohbet etmek istedim.
            </p>
            <p>
              Evimden saat <strong>00:45 gibi çıktım</strong>. Aylin&apos;in evine
              taksiyle ulaştım. Kapıya vardığımda saat 01:00&apos;e çok yakındı.
              Zili çaldım. Beni tanıdıktan sonra kapıyı açtı.
            </p>
            <p>
              İçeri geçtik. Plak taktık. Müzik dinledik. Ben de samimi ve
              rahattım. Saat <strong>03:00 civarı kalkmaya karar verdim</strong>.
              Aylin lavabodayken ceketimi giydim.
            </p>
            <p>
              Binadan çıkınca sigara yaktım. <strong>03:15 civarıydı</strong>.
              Sonra köşeye bir taksi yanaştı. Bindim ve evime geçtim. Saat 03:45
              olmadan evdeydim.
            </p>
            <p
              style={{
                background: "rgba(107,22,32,0.1)",
                padding: 12,
                borderLeft: "3px solid var(--bordeaux)",
              }}
            >
              <strong>Polaroid meselesi:</strong> Evet, Aylin&apos;in
              buzdolabında bir fotoğraf vardı. Benim çektiğim bir kareydi. Cebime
              atmışım. Niyetim kötü değildi, dürüst olmak gerekirse o an farkında
              bile değildim.
            </p>

            <div className="doc-signature">
              <div className="sig-line">İfade Sahibi · Baskısız</div>
              <div className="sig-name">E. Sezer</div>
            </div>
          </>
        }
      />

      <ClientDocArticle
        dataDoc="meryem"
        stamps={["approved", "denied", "cross"]}
        headerMain={
          <>
            <div className="doc-id">042-E · Kadıköy İlçe Emniyet Müdürlüğü</div>
            <h2 className="doc-title">İfade — Meryem Güldağ</h2>
          </>
        }
        body={
          <>
            <dl className="doc-meta">
              <dt>Tarih</dt>
              <dd>14.05.2025</dd>
              <dt>Doğum</dt>
              <dd>02.11.1983</dd>
              <dt>Meslek</dt>
              <dd>Emekli akademisyen · Bağımsız psikolojik danışman</dd>
              <dt>Adres</dt>
              <dd>Rasimpaşa Mah. Misak-ı Milli Sk. No:5 D:3</dd>
            </dl>

            <p>
              Burak&apos;ı yıllar önce öğrencim olarak tanıdım. Ama o ilk
              profesyonel bağ, zamanla farklı bir derinliğe evrildi. Beni hep
              &quot;içini dışına çıkarabilen tek kişi&quot; olarak görürdü.
            </p>
            <p>
              Ben onu sevmedim, hayır. Bu kadar yüzeysel bir şey değildi bizimki.
              Ben onu anlamaya çalıştım, gözlemledim, yönlendirdim. Ama bazen o
              çizgi — o kırmızı çizgi — çoktan aşılmış olur.
            </p>
            <p>
              12 Mayıs günü, akşam saatlerinde (yaklaşık 21:00 sularında),
              kendisine bir <strong>sesli mesaj gönderdim</strong>. Mesaj hâlâ
              telefonumda kayıtlı. Silmedim.
            </p>
            <p>
              Gece boyunca bir cevap gelmedi. Ama içim rahat değildi. Burak&apos;ın
              Aylin&apos;in evine gideceğini tahmin ettim.{" "}
              <strong>Bu yüzden ben de apartmana gittim.</strong>
            </p>
            <p>
              Saat net değil ama gece <strong>23:00&apos;ü geçmişti</strong>. 4.
              katın yakınlarında bekledim. Aylin&apos;in kapısına yöneldiğini
              gördüm ama kapı açılmadı. Burak uzun süre kapının önünde kaldı.{" "}
              <strong>İçeri girmediğine eminim.</strong>
            </p>
            <p>
              Sonra ben yavaşça merdivenlerden aşağı indim. Kimseyle
              karşılaşmadım. Emir&apos;i o sırada görmedim.
            </p>
            <p>
              Ben olay gecesi Aylin&apos;in dairesine çıkmadım. Sadece binaya girip
              kısa süreliğine yukarıda bulundum. Burak&apos;la da o gün yüz yüze
              görüşmedim. Telefon mesajım dışında hiçbir temasım olmadı.
            </p>

            <div className="doc-signature">
              <div className="sig-line">İfade Sahibi · Baskısız</div>
              <div className="sig-name">M. Güldağ</div>
            </div>
          </>
        }
      />

      <ClientDocArticle
        dataDoc="sukru"
        stamps={["approved", "denied", "cross"]}
        headerMain={
          <>
            <div className="doc-id">042-F · Kadıköy İlçe Emniyet Müdürlüğü</div>
            <h2 className="doc-title">İfade — Şükrü Aydın</h2>
          </>
        }
        body={
          <>
            <dl className="doc-meta">
              <dt>Tarih</dt>
              <dd>14.05.2025</dd>
              <dt>Doğum</dt>
              <dd>04.06.1969</dd>
              <dt>Meslek</dt>
              <dd>Apartman görevlisi (11 yıl)</dd>
              <dt>Adres</dt>
              <dd>Aynı bina · Bodrum kat dairesi</dd>
            </dl>

            <p>
              Burak denen çocuk zamanında çok gelir giderdi Aylin Hanım&apos;a.
              Son birkaç aydır ortalarda yoktu. Kavgalarını çok duymuştum
              önceden.
            </p>
            <p>
              12 Mayıs gecesi, sanırım <strong>gece 12 civarıydı</strong>, ben
              kömürlüğe inmiştim. Fare kapanı kontrol ediyordum. Çıkarken
              yukarıdan birinin{" "}
              <strong>hızlıca merdivenlerden indiğini gördüm</strong>.
            </p>
            <p>
              Karartı şeklindeydi, yüzünü görmedim.{" "}
              <strong>Kadına benziyordu sanki</strong>. Saçları açıktı. Ayakkabı
              sesi tizdi, topuklu gibiydi. Belki Aylin Hanım&apos;dı. Belki başka
              biri.
            </p>
            <p>
              Sabah çöpçüler zile bastı. &quot;Burda bir ceset var galiba&quot;
              dediler. Konteyneri açtık, torbayı gördük.
            </p>

            <div className="doc-signature">
              <div className="sig-line">İfade Sahibi · Baskısız</div>
              <div className="sig-name">Ş. Aydın</div>
            </div>
          </>
        }
      />

      <ClientDocArticle
        dataDoc="sinem"
        stamps={["approved", "denied", "cross"]}
        headerMain={
          <>
            <div className="doc-id">042-G · Kadıköy İlçe Emniyet Müdürlüğü</div>
            <h2 className="doc-title">İfade — Sinem Gürbüz</h2>
          </>
        }
        body={
          <>
            <dl className="doc-meta">
              <dt>Tarih</dt>
              <dd>14.05.2025</dd>
              <dt>Doğum</dt>
              <dd>26.12.1999</dd>
              <dt>Meslek</dt>
              <dd>Moda asistanı</dd>
              <dt>Adres</dt>
              <dd>Fenerbahçe Mah. Fikret Mualla Sk. No:10 D:5</dd>
            </dl>

            <p>
              Burak&apos;la yaklaşık bir aydır görüşüyorduk. Burak, Aylin&apos;le
              tamamen koptuğunu söylüyordu.
            </p>
            <p>
              Olay günü, yani 12 Mayıs&apos;ta, Burak&apos;la yazıştık. Saat{" "}
              <strong>
                18:00 gibi, &quot;Bu akşam konuşmamız lazım&quot;
              </strong>{" "}
              diye mesaj attı. Ben de &quot;Gel istersen, bende kalırsın&quot;
              dedim.
            </p>
            <p>
              Ama saat ilerledikçe cevap vermemeye başladı.{" "}
              <strong>
                23:00&apos;e kadar bekledim. Cevap gelmeyince çok sinirlendim.
                Uyuyamadım.
              </strong>
            </p>
            <p>
              Ben o gece evdeydim. Bunu annem de teyit eder. Evden çıkmadım.
              Kimseyle görüşmedim.
            </p>
            <p
              style={{
                background: "rgba(107,22,32,0.1)",
                padding: 12,
                borderLeft: "3px solid var(--bordeaux)",
              }}
            >
              <strong>Yalnızca... bir şey söyleyebilirim.</strong> Burak, son
              zamanlarda psikolojik olarak çok baskı altındaydı. Telefonunda
              sürekli &quot;Meryem&quot; adında biriyle yaptığı eski mesajlar
              vardı. Burak bana, &quot;Beni bırakmıyor, beni izliyor&quot;
              demişti.
            </p>

            <div className="doc-signature">
              <div className="sig-line">İfade Sahibi · Baskısız</div>
              <div className="sig-name">S. Gürbüz</div>
            </div>
          </>
        }
      />
    </section>
  );
}
