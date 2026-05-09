import type { CaseData } from "@/lib/case-types";

export const case042: CaseData = {
  id: "042",
  codename: "Karaağaç",
  fullTitle: "Vaka № 042 — Karaağaç Dosyası",
  status: "active",
  difficulty: "Orta",
  recommendedPlayers: "3-4",
  location: "İstanbul · Kadıköy",
  victim: "Burak Karaağaç (28, erkek)",
  date: "13 Mayıs 2025 · 04:15",
  shortSummary:
    "Bir çöp konteynerinde bulunan bir beden. Beş şüpheli, on bir belge, bir gerçek.",
  enabledTabs: [
    "brief",
    "supheliler",
    "ifadeler",
    "adli-tip",
    "deliller",
    "teknik",
    "deduction",
    "cozum",
  ],
  brief: {
    subtitle: "042-A · Olay Yeri",
    metaPairs: [
      ["Vaka No", "042"],
      ["Dosya Tipi", "Şüpheli Ölüm — Yüksek Öncelik"],
      ["Olay Tarihi", "13 Mayıs 2025 · 04:15"],
      ["Konum", "İstanbul · Kadıköy · Caferağa Mah. 47. Sokak"],
      ["Kurban", "Burak Karaağaç (28, erkek)"],
    ].map(([label, value]) => ({ label, value })),
    sections: [
      {
        title: "Olay",
        body: `<p>13 Mayıs 2025 sabahı saat 04:15 sularında, Caferağa Mahallesi 47. Sokak üzerindeki çöp konteynerinde 28 yaşındaki <strong>Burak Karaağaç'ın</strong> cansız bedeni bulunmuştur. Kurban, başına aldığı künt bir darbe sonucu ölmüştür.</p><p>Ceset, eski sevgilisi <strong>Aylin Yalçın'ın</strong> oturduğu apartmana yalnızca <strong>10 metre</strong> mesafededir.</p>`,
      },
      {
        title: "Zaman Aralığı",
        body: `<p>Kurban son olarak <strong>12 Mayıs 2025 gecesi saat 22:00</strong> civarında cep telefonu sinyaliyle Caferağa Mahallesi'nde tespit edilmiştir. Adli tıp ön değerlendirmesine göre ölüm, <strong>22:30 ile 00:30 arası</strong> gerçekleşmiştir. Ceset 04:15'te bulunmuştur — yani ölüm sonrası en az <strong>3-6 saat</strong> arasında konteynere yerleştirilmiştir.</p>`,
      },
      {
        title: "Görev",
        body: `<p>Bu dosyada yer alan tüm belgeleri dikkatlice incele. Çelişkileri bul, ifadeleri karşılaştır, fiziksel delilleri çözümle. Gerçek katili ve cinayet yöntemini <strong>mantıksal olarak ispatla</strong>.</p><p style="background:rgba(107,22,32,0.1);padding:12px 16px;border-left:3px solid var(--bordeaux);"><strong>UYARI (XOR):</strong> Bu davada bazı ipuçları yalnızca <strong>bir tanesi doğru olabilir</strong>. Yanlış çıkarım failin serbest kalmasıyla sonuçlanacaktır.</p>`,
      },
    ],
    signature: {
      role: "Düzenleyen\nKriminal Soruşturma Birimi",
      name: "G. Aras",
    },
  },
  suspects: [
    {
      id: "suspect-01",
      code: "SUSP-01 · CFR-47/4",
      name: "Aylin Yalçın",
      role: "Eski sevgili · Olay gecesi evdeydi",
      quote: '"Çöp atmak için dışarı çıktım. Konteynerin kapağı açıktı."',
    },
    {
      id: "suspect-02",
      code: "SUSP-02 · MOD-26/2",
      name: "Emir Sezer",
      role: "Yakın arkadaş · Aylin'in evindeydi",
      quote: '"Sadece sohbet etmek istedim. Bir şarap aldım, gittim."',
    },
    {
      id: "suspect-03",
      code: "SUSP-03 · FNR-10/5",
      name: "Sinem Gürbüz",
      role: 'Yeni ilişki · "O gece bana gelecekti"',
      quote: '"23:00\'e kadar bekledim. Cevap gelmedi. Çok sinirlendim."',
    },
    {
      id: "suspect-04",
      code: "SUSP-04 · CFR-47/B",
      name: "Şükrü Aydın",
      role: "Apartman görevlisi · 11 yıllık kapıcı",
      quote: '"Gece çöp atan biri vardı ama tanıyamadım. Kadına benziyordu."',
    },
    {
      id: "suspect-05",
      code: "SUSP-05 · RSP-05/3",
      name: "Meryem Güldağ",
      role: "Eski danışman hocası · Tehditkâr ses kaydı",
      quote: '"Eğer benimle bir daha konuşmazsan... bu bir suç olur Burak."',
    },
  ],
  testimonies: [
    {
      id: "042-C",
      suspectName: "Aylin Yalçın",
      headerDocId: "042-C · Kadıköy İlçe Emniyet Müdürlüğü",
      title: "İfade — Aylin Yalçın",
      date: "14.05.2025",
      birth: "18.09.2000",
      occupation: "Öğrenci · Freelance içerik",
      address: "Caferağa Mah. 47. Sok. No:17 D:4",
      paragraphs: [
        `Burak'la yaklaşık iki yıldır süren bir ilişkim vardı. Son zamanlarda çok yıpranmıştık. Sadakatsizlik, yalanlar, güvensizlik... Yaklaşık bir hafta önce ilişkimizi tamamen bitirdik.`,
        `12 Mayıs gecesi, gece yarısına yaklaşırken evde yalnızdım. Saat **23:00 civarı kapı çaldı**. Dürbünden baktım, Burak'tı. Konuşmak istediğini tahmin ettim ama kapıyı açmadım. Hiç ses etmeden bekledim.`,
        `Yaklaşık 2 saat sonra, saat **01:00'e yaklaşırken kapı çaldı. Gelen Emir'di**. Yanında şarap vardı. İçeri aldım, biraz konuştuk. Plak taktık, müzik dinledik, hatta güldük bile.`,
        `Saat **03:00 civarı Emir kalktı**. Ben lavabodayken ceketini giymişti. Kapıya kadar uğurladım. "İyi geldin" dedim.`,
        `Ben o gidince camın önünde oturdum. Bir sigara yaktım. **03:15 civarı Emir hâlâ aşağıdaydı**. Sonra bir taksi geldi, bindi, gitti.`,
        `**03:30 gibi mutfaktaki çöpleri alıp dışarı çıktım. Konteynerin kapağı açıktı. Çöpleri konteynere sallayıp hemen döndüm.** Orada olağan dışı hiçbir şey fark etmedim.`,
        `Burak'ın öldüğünü sabah polisten öğrendim. Cesedin konteynerde bulunduğunu söylediklerinde midem bulandı.`,
      ],
      signature: "A. Yalçın",
    },
    {
      id: "042-D",
      suspectName: "Emir Sezer",
      headerDocId: "042-D · Kadıköy İlçe Emniyet Müdürlüğü",
      title: "İfade — Emir Sezer",
      date: "14.05.2025",
      birth: "11.02.2000",
      occupation: "Freelance Reklam Metin Yazarı",
      address: "Moda Mah. Göztepe Cad. No:26 D:2",
      paragraphs: [
        `Burak'la üniversite yıllarından beri arkadaşız. Son zamanlarda aramıza biraz mesafe girmişti. Yaklaşık bir hafta önce ayrıldıklarını öğrendim.`,
        `12 Mayıs gecesi evde tek başımaydım. Saat **00:30 gibi Aylin geldi aklıma**. Bir şarap alıp yanına gitmeyi düşündüm. Sadece sohbet etmek istedim.`,
        `Evimden saat **00:45 gibi çıktım**. Aylin'in evine taksiyle ulaştım. Kapıya vardığımda saat 01:00'e çok yakındı. Zili çaldım. Beni tanıdıktan sonra kapıyı açtı.`,
        `İçeri geçtik. Plak taktık. Müzik dinledik. Ben de samimi ve rahattım. Saat **03:00 civarı kalkmaya karar verdim**. Aylin lavabodayken ceketimi giydim.`,
        `Binadan çıkınca sigara yaktım. **03:15 civarıydı**. Sonra köşeye bir taksi yanaştı. Bindim ve evime geçtim. Saat 03:45 olmadan evdeydim.`,
        `<p style="background:rgba(107,22,32,0.1);padding:12px;border-left:3px solid var(--bordeaux)"><strong>Polaroid meselesi:</strong> Evet, Aylin'in buzdolabında bir fotoğraf vardı. Benim çektiğim bir kareydi. Cebime atmışım. Niyetim kötü değildi, dürüst olmak gerekirse o an farkında bile değildim.</p>`,
      ],
      signature: "E. Sezer",
    },
    {
      id: "042-E",
      suspectName: "Meryem Güldağ",
      headerDocId: "042-E · Kadıköy İlçe Emniyet Müdürlüğü",
      title: "İfade — Meryem Güldağ",
      date: "14.05.2025",
      birth: "02.11.1983",
      occupation: "Emekli akademisyen · Bağımsız psikolojik danışman",
      address: "Rasimpaşa Mah. Misak-ı Milli Sk. No:5 D:3",
      paragraphs: [
        `Burak'ı yıllar önce öğrencim olarak tanıdım. Ama o ilk profesyonel bağ, zamanla farklı bir derinliğe evrildi. Beni hep "içini dışına çıkarabilen tek kişi" olarak görürdü.`,
        `Ben onu sevmedim, hayır. Bu kadar yüzeysel bir şey değildi bizimki. Ben onu anlamaya çalıştım, gözlemledim, yönlendirdim. Ama bazen o çizgi — o kırmızı çizgi — çoktan aşılmış olur.`,
        `12 Mayıs günü, akşam saatlerinde (yaklaşık 21:00 sularında), kendisine bir **sesli mesaj gönderdim**. Mesaj hâlâ telefonumda kayıtlı. Silmedim.`,
        `Gece boyunca bir cevap gelmedi. Ama içim rahat değildi. Burak'ın Aylin'in evine gideceğini tahmin ettim. **Bu yüzden ben de apartmana gittim.**`,
        `Saat net değil ama gece **23:00'ü geçmişti**. 4. katın yakınlarında bekledim. Aylin'in kapısına yöneldiğini gördüm ama kapı açılmadı. Burak uzun süre kapının önünde kaldı. **İçeri girmediğine eminim.**`,
        `Sonra ben yavaşça merdivenlerden aşağı indim. Kimseyle karşılaşmadım. Emir'i o sırada görmedim.`,
        `Ben olay gecesi Aylin'in dairesine çıkmadım. Sadece binaya girip kısa süreliğine yukarıda bulundum. Burak'la da o gün yüz yüze görüşmedim. Telefon mesajım dışında hiçbir temasım olmadı.`,
      ],
      signature: "M. Güldağ",
    },
    {
      id: "042-F",
      suspectName: "Şükrü Aydın",
      headerDocId: "042-F · Kadıköy İlçe Emniyet Müdürlüğü",
      title: "İfade — Şükrü Aydın",
      date: "14.05.2025",
      birth: "04.06.1969",
      occupation: "Apartman görevlisi (11 yıl)",
      address: "Aynı bina · Bodrum kat dairesi",
      paragraphs: [
        `Burak denen çocuk zamanında çok gelir giderdi Aylin Hanım'a. Son birkaç aydır ortalarda yoktu. Kavgalarını çok duymuştum önceden.`,
        `12 Mayıs gecesi, sanırım **gece 12 civarıydı**, ben kömürlüğe inmiştim. Fare kapanı kontrol ediyordum. Çıkarken yukarıdan birinin **hızlıca merdivenlerden indiğini gördüm**.`,
        `Karartı şeklindeydi, yüzünü görmedim. **Kadına benziyordu sanki**. Saçları açıktı. Ayakkabı sesi tizdi, topuklu gibiydi. Belki Aylin Hanım'dı. Belki başka biri.`,
        `Sabah çöpçüler zile bastı. "Burda bir ceset var galiba" dediler. Konteyneri açtık, torbayı gördük.`,
      ],
      signature: "Ş. Aydın",
    },
    {
      id: "042-G",
      suspectName: "Sinem Gürbüz",
      headerDocId: "042-G · Kadıköy İlçe Emniyet Müdürlüğü",
      title: "İfade — Sinem Gürbüz",
      date: "14.05.2025",
      birth: "26.12.1999",
      occupation: "Moda asistanı",
      address: "Fenerbahçe Mah. Fikret Mualla Sk. No:10 D:5",
      paragraphs: [
        `Burak'la yaklaşık bir aydır görüşüyorduk. Burak, Aylin'le tamamen koptuğunu söylüyordu.`,
        `Olay günü, yani 12 Mayıs'ta, Burak'la yazıştık. Saat **18:00 gibi, "Bu akşam konuşmamız lazım"** diye mesaj attı. Ben de "Gel istersen, bende kalırsın" dedim.`,
        `Ama saat ilerledikçe cevap vermemeye başladı. **23:00'e kadar bekledim. Cevap gelmeyince çok sinirlendim. Uyuyamadım.**`,
        `Ben o gece evdeydim. Bunu annem de teyit eder. Evden çıkmadım. Kimseyle görüşmedim.`,
        `<p style="background:rgba(107,22,32,0.1);padding:12px;border-left:3px solid var(--bordeaux)"><strong>Yalnızca... bir şey söyleyebilirim.</strong> Burak, son zamanlarda psikolojik olarak çok baskı altındaydı. Telefonunda sürekli "Meryem" adında biriyle yaptığı eski mesajlar vardı. Burak bana, "Beni bırakmıyor, beni izliyor" demişti.</p>`,
      ],
      signature: "S. Gürbüz",
    },
  ],
  forensics: [
    {
      id: "042-B",
      docId: "042-B · İstanbul Adli Tıp Kurumu — 1. İhtisas Kurulu",
      title: "Otopsi Raporu",
      meta: [
        { label: "Olay Tarihi", value: "13.05.2025" },
        { label: "Rapor Tarihi", value: "14.05.2025" },
        { label: "Hazırlayan", value: "Uzm. Dr. N. Aytaç" },
      ],
      body: `<h3>Dış Muayene</h3>
<ul>
<li>Baş arka <strong>sol oksipital bölgede ~6 cm çapında hematom</strong></li>
<li>Deri altı kanama ve ezilme belirgin</li>
<li>Kafa tası kırığı yok, fakat <strong>beyin içi kanama</strong> tespit edildi</li>
<li>Burun ve sağ kulaktan düşük miktarda kan sızması</li>
</ul>
<h3>İç Muayene</h3>
<ul>
<li>Beyin zarları altında subdural hematom</li>
<li>Kalp, akciğer, karaciğer ve dalakta travmatik bulguya rastlanmadı</li>
<li>Toksikoloji: Kanda etanol (<strong>0.04 g/dL</strong>), başka kimyasal yok</li>
<li>Cinsel saldırıya veya <strong>savunma yaralanmasına dair bulgu yok</strong></li>
</ul>
<h3>Ölüm Sebebi</h3>
<p>Baş bölgesine <strong>arkadan</strong> alınan künt bir darbe sonucu gelişen travmatik beyin kanaması. Ölüm, kaza veya intihar değil, <strong>dış müdahale kaynaklıdır</strong>.</p>
<h3>Ölüm Zamanı & Sonuç</h3>
<p>Ölüm zamanı <strong>22:30 ile 00:30 arası</strong>. Ceset en az 3, en fazla 6 saat sonra konteynere yerleştirilmiştir.</p>
<p>Darbenin yeri ve şiddeti, <strong>failin kurbana arkadan yaklaştığını ve hedefli hareket ettiğini</strong> göstermektedir. Tüm bulgular üçüncü şahıs müdahalesine işaret etmektedir.</p>`,
      signature: { role: "Uzm. Dr.", name: "N. Aytaç" },
    },
    {
      id: "042-A",
      docId: "042-A · Olay Yeri İnceleme",
      title: "Olay Yeri Raporu",
      meta: [],
      body: `<h3>Bulgular</h3>
<ol>
<li>Kurban, siyah çöp torbası içinde, <strong>sırt üstü pozisyonda</strong>. Sol elinden sarkan kan izleri mevcut.</li>
<li>Baş arkasında 6 cm çapında <strong>künt travma</strong> — muhtemel alet: ağır, yüzeyi düz olmayan bir cisim.</li>
<li>Kıyafetlerde <strong>yırtılma ya da sürüklenme izi yok</strong> — vücut bütünlüğü korunmuş, ölüm sonrası taşınmış.</li>
<li>Pantolon cebinde sadece bir <strong>ev anahtarı</strong>.</li>
<li>Çöp torbası ağız kısmında <strong>eldivenle dokunulmuş</strong> izleri.</li>
<li>47. Sokak'taki apartman giriş kamerası <strong>02:30'da bir kadın</strong> figürünü konteyner yönüne yürürken gösteriyor — Aylin Yalçın ile eşleşiyor.</li>
</ol>
<p style="background:rgba(107,22,32,0.1);padding:12px;border-left:3px solid var(--bordeaux)"><strong>Ön Not:</strong> Cinayet aleti olay yerinde bulunamamıştır. Olay yeri temizlenmiş izlenimi vermemektedir. <strong>Cinayet mahalli olarak farklı bir konum da ihtimal dahilindedir.</strong></p>`,
      signature: { role: "Komiser Yardımcısı", name: "G. Aras" },
    },
  ],
  evidence: [
    {
      id: "BRK-AKT01",
      tag: "Fiziksel",
      title: 'Anahtar — "KA 4-D"',
      description: `Gümüş tekli metal anahtar. Burak'ın pantolon cebinden çıktı. <strong>Aylin'in dairesinin kilidine uyuyor.</strong>`,
      details: [
        { label: "Parmak izi", value: "Yalnızca Burak'ın." },
        { label: "Çelişki", value: "Aylin ifadesinde anahtar bilgisi yok." },
        { label: "Soru", value: "Kapıyı çalıp neden anahtar kullanmadı?" },
      ],
    },
    {
      id: "EMR-PLR01",
      tag: "Fiziksel",
      title: "Polaroid Fotoğraf",
      description: `4×5 cm, Aylin & Burak birlikte. <strong>Emir'in gömlek cebinden çıktı.</strong> Aylin'in buzdolabındaki fotoğraflarla eşleşiyor.`,
      details: [
        { label: "Parmak izi", value: "Sol üst kenarda Emir'in." },
        { label: "DNA", value: "Aylin/Burak'a ait iz yok." },
        { label: "Açıklama", value: '"Duygusal anda aldım."' },
      ],
    },
    {
      id: "AYL-HTL01",
      tag: "DNA",
      title: "Lavanta Kokulu Havlu",
      description: `Açık gri mikrofiber havlu. <strong>Konteyner içinde, Aylin'in çöp attığını söylediği yerde bulundu.</strong>`,
      details: [
        { label: "DNA", value: "Burak Karaağaç'ın deri hücreleri." },
        { label: "Köken", value: "Burak'ın evindeki havlu setiyle aynı seri." },
        { label: "Not", value: "Aylin'in setinden değil." },
      ],
    },
  ],
  technicalAudio: {
    label: "042-I · Sesli Mesaj Transkripti · Meryem → Burak",
    durationLine: "00:59 · 12.05.2025 · 21:00",
    transcript: [
      `Burak... Bu seni kaçıncı arayışım bilmiyorum. Seninle konuşmak istiyorum, sadece bu.`,
      `Cevap vermemen sessizlik değil; bu bir inkâr, bu bir silme çabası.`,
      `Beni susturamazsın Burak. Çünkü ben senin susturduğun sesinim.`,
      `<span class="highlight">"Eğer benimle bir daha konuşmazsan... bu bir suç olur Burak."</span>`,
      `Bekliyorum. ...Ve sen bunu duymadığını söyleme. Çünkü artık susmayacağım.`,
    ],
  },
  technical: [
    {
      id: "042-gsm",
      docId: "Telsimcell · GSM Adli İşlem",
      title: "Baz İstasyonu Sinyal Geçmişi",
      meta: [],
      body: `<p><strong>SIM:</strong> Burak Karaağaç · 0588 957 23 12</p>
<table class="signal-table">
<thead><tr><th>Saat</th><th>Konum / Olay</th><th>Tip</th></tr></thead>
<tbody>
<tr><td>20:45</td><td>Fenerbahçe — Sahil Caddesi</td><td>LTE Data</td></tr>
<tr><td>21:22</td><td>Moda Caddesi · Sesli görüşme 4dk</td><td>Voice</td></tr>
<tr><td>21:58</td><td>Caferağa 47. Sok. — Bina önü</td><td>Sinyal güçlendi</td></tr>
<tr><td>22:06</td><td>Caferağa 47. Sok. — <strong>Bina içi</strong></td><td>Zayıf sinyal</td></tr>
<tr class="alert"><td>22:14</td><td>Sinyal kesildi · cihaz kapatıldı/parazit</td><td>OFFLINE</td></tr>
<tr class="alert"><td>22:19</td><td>WhatsApp "okundu" — Meryem mesajı</td><td>Cihaz açıldı</td></tr>
<tr><td>00:37</td><td>Statik sinyal — hareketsiz</td><td>Sabit</td></tr>
</tbody>
</table>
<p style="margin-top:18px;background:rgba(107,22,32,0.1);padding:12px;border-left:3px solid var(--bordeaux)"><strong>Kritik:</strong> 22:19'daki "okundu" işareti, Burak'ın darbeyi aldığı düşünülen anın hemen sonrasıdır. Cihazı <strong>fail</strong> açmış olabilir.</p>`,
      signature: { role: "GSM Adli İşlem Sorumlusu", name: "Gülce A." },
    },
    {
      id: "042-H",
      docId: "042-H · Kriminal Görüntü İnceleme",
      title: "CCTV Analizi & Saat Sapması",
      meta: [],
      body: `<h3>Görüntü Tespiti — 12 Mayıs Gecesi</h3>
<ul>
<li><strong>02:39:44</strong> — Aylin'e benzer kadın figür, elinde siyah çöp torbası</li>
<li><strong>02:40:17</strong> — Konteynere poşeti bırakır</li>
<li><strong>02:40:36</strong> — Geri döner, apartman girişine yönelir</li>
<li><strong>02:41:12</strong> — Kameradan çıkar</li>
</ul>
<p style="background:rgba(107,22,32,0.15);padding:14px 18px;border:1px solid var(--bordeaux);margin-top:16px"><strong>SAAT SAPMASI:</strong> NTP devre dışı. Sistem saati <strong>+47 dakika geride</strong>. Tüm kamera kayıtlarına +47 dk eklenecek.<br/>Kamera <strong>02:41</strong> = Gerçek <strong>03:28</strong></p>
<h3>Asansör Hareket Günlüğü (Şükrü Aydın · Manuel)</h3>
<table class="signal-table">
<thead><tr><th>Saat</th><th>Hareket</th><th>Not</th></tr></thead>
<tbody>
<tr class="alert"><td>23:08</td><td>Kat 0 → Kat 4</td><td>Yukarı çıkış</td></tr>
<tr class="alert"><td>23:17</td><td>Kat 4 → Kat 0</td><td>Adımlar hızlıydı</td></tr>
<tr><td>01:03</td><td>Kat 0 → Kat 4</td><td>Sessiz çıkış (Emir)</td></tr>
<tr><td>03:01</td><td>Kat 4 → Kat 0</td><td>Kapı sesi (Emir)</td></tr>
</tbody>
</table>
<p style="margin-top:14px"><strong>Not:</strong> Kat 4'te yalnızca Aylin oturuyor. <strong>23:08 çıkışını ve 23:17 inişini hiçbir şüpheli üstlenmiyor.</strong></p>`,
      signature: { role: "Kriminal Görüntü Analisti", name: "Sibel Kurt" },
    },
  ],
  timeline: [
    { id: "tl-0", time: "18:00", source: "SMS · Sinem ifadesi", event: `Burak → Sinem: "Bu akşam konuşmamız lazım"` },
    { id: "tl-1", time: "21:00", source: "042-I · Ses kaydı", critical: true, event: `Meryem, Burak'a tehdit içerikli sesli mesaj gönderir.` },
    { id: "tl-2", time: "21:58", source: "GSM", event: `Burak'ın telefonu Caferağa 47. Sokak — bina önünde sinyal verir.` },
    { id: "tl-3", time: "22:06", source: "GSM", event: `Burak'ın telefonu — <strong>bina içinde</strong>, zayıf sinyal.` },
    { id: "tl-4", time: "22:14", source: "GSM · Adli Tıp", critical: true, event: `Sinyal kesildi. Cihaz kapatıldı veya darbe ile parazitlendi.` },
    { id: "tl-5", time: "22:19", source: "GSM", critical: true, event: `WhatsApp "okundu" işareti. <strong>Mesajı kim açtı?</strong>` },
    { id: "tl-6", time: "22:30 — 00:30", source: "042-B", event: `Adli tıp tahmini ölüm zamanı.` },
    { id: "tl-7", time: "23:00+", source: "İfadeler · ÇELİŞKİ ZONU", critical: true, event: `Aylin: "Burak kapıyı çaldı, açmadım" · Meryem: "4. kat yakınlarında bekledim, Burak'ı gördüm".` },
    { id: "tl-8", time: "23:08", source: "042-J", critical: true, event: `Asansör Kat 0 → Kat 4. <strong>Kimse üstlenmiyor.</strong>` },
    { id: "tl-9", time: "23:17", source: "042-J", critical: true, event: `Asansör Kat 4 → Kat 0. <strong>Adımlar hızlıydı.</strong> Kimse üstlenmiyor.` },
    { id: "tl-10", time: "~24:00", source: "Şükrü ifadesi", event: `Şükrü kömürlükten çıkar — yukarıdan inen "topuklu, saçları açık kadın" karaltı görür.` },
    { id: "tl-11", time: "00:37", source: "GSM", event: `Burak'ın telefonu son sinyali verir — sabit konum.` },
    { id: "tl-12", time: "01:00", source: "042-D", event: `Emir, Aylin'in evine gelir (taksiyle, şarapla).` },
    { id: "tl-13", time: "03:00", source: "İfadeler", event: `Emir Aylin'in evinden ayrılır.` },
    { id: "tl-14", time: "03:15", source: "İfadeler", event: `Emir taksiye biner.` },
    { id: "tl-15", time: "03:27 (gerçek)", source: "042-H", event: `Aylin konteynere siyah poşet bırakır (kamera 02:40 + 47dk).` },
    { id: "tl-16", time: "04:15", source: "042-A", event: `Çöp kamyonu personeli cesedi bulur.` },
  ],
  timelineInitialOrder: [
    "tl-16",
    "tl-0",
    "tl-8",
    "tl-4",
    "tl-12",
    "tl-2",
    "tl-15",
    "tl-6",
    "tl-10",
    "tl-13",
    "tl-1",
    "tl-9",
    "tl-7",
    "tl-3",
    "tl-11",
    "tl-14",
    "tl-5",
  ],
  deduction: {
    contradictions: [],
    elimination: [],
  },
  tabSectionSub: {
    brief: "042-A · Olay Yeri",
    supheliler: "Gizli · 05 Profil",
    ifadeler: "042-C → 042-G",
    "adli-tip": "042-A · 042-B",
    deliller: "3 Adet Delil Fişi",
    teknik: "042-H · 042-I · 042-J · GSM",
    deduction: "Notlar · Sadece sana özel",
    cozum: "Failin Tahmini Tespiti",
  },
  verdict: {
    perpetratorId: "suspect-05",
    perpetratorName: "Meryem Güldağ",
    murderTime:
      "Yaklaşık 22:14. Burak'ın telefon sinyalinin kesildiği an. 22:19'daki \"okundu\" işareti failin telefonu açtığını gösterir — yani Burak o sırada ölmüştü.",
    murderLocation:
      "Aylin'in dairesinin içi değil. Apartman içerisinde — kat arası, koridor veya boş bir alan.",
    murderWeapon:
      "Olay yerinde bulunamadı. Profil: ağır, tek elle taşınabilir, yüzeyi düz olmayan bir cisim.",
    motivation:
      "Psikolojik saplantı, terk edilme korkusu ve kontrol kaybı; sesli mesajdaki tehdit Motif oluşturur.",
    evidenceList: [
      "042-I (Sesli mesaj): Doğrudan tehdit kaydı.",
      "GSM Sinyal: Burak 22:14'te ölmüş; Meryem ifadesinde zaman çelişkisi.",
      '22:19 "okundu": Mesajı failin açması.',
      "Şükrü Tanıklığı: Topuklu, saçları açık kadın — Meryem'le eşleşiyor.",
      "Asansör 23:08–23:17: Aylin ve Emir üstlenmiyor.",
      "Otopsi: Arkadan, hedefli, savunma izi yok.",
      "Polaroid ve Aylin'in çöpü yanıltıcıdır.",
    ],
    conclusion:
      "Aylin yalnızca evsel atık attı (042 raporu temiz). Emir polaroid hırsızı, fail değil. Şükrü tanık. Sinem alibili. Fail Meryem Güldağ'dır.",
    wrongAnswerMessage:
      "Tahminin yanlıştı. Bu vakada [SECILEN_ISIM] failin kendisi değildi — sadece çevresinden biri. Gerçek fail kayıtlardan silindi. Davanın izi kapandı.",
    solutionDocLabel: "042-Z2 · Resmi Çözüm Belgesi · 15.05.2025",
    solutionHtml: `<div class="verdict-stamp">CLASSIFIED</div>
<div class="doc-id" style="margin-bottom:12px">042-Z2 · Resmi Çözüm Belgesi · 15.05.2025</div>
<h3 style="font-family:var(--font-cormorant),serif;font-size:24px;margin:0 0 8px">Failin Kimliği:</h3>
<div class="verdict-name">Meryem Güldağ</div>
<h3>Cinayet Saati</h3>
<p>Yaklaşık <strong>22:14</strong>. Burak'ın telefon sinyalinin kesildiği an. 22:19'daki "okundu" işareti failin telefonu açtığını gösterir — yani Burak o sırada ölmüştü.</p>
<h3>Cinayet Yeri</h3>
<p>Aylin'in dairesinin <strong>içi değil</strong>. Apartman içerisinde — kat arası, koridor veya boş bir alan. Olay yeri kameraları ve asansör logları (<strong>23:08 → 23:17</strong> hareketinin iki yöne yapıldığı pencereye dikkat: bu fail için cesedi taşıma operasyonudur, ölüm öncesi değil).</p>
<h3>Cinayet Aleti</h3>
<p>Olay yerinde bulunamadı. Profil: ağır, tek elle taşınabilir, yüzeyi düz olmayan bir cisim. Olası: <strong>eski tip masa ayağı, demir kitaplık aparatı, beton parçası</strong>. Failin profesyonel çevresinden (akademik mobilya) erişebileceği türde.</p>
<h3>Motivasyon</h3>
<p>Psikolojik saplantı. Terk edilme korkusu. Kontrol kaybı. Burak'ın "kesin kopuş" sinyali fail Meryem'de yıkım etkisi yaratmıştır. Sesli mesajda "konuşmazsan bu bir suç olur" tehdidi — Meryem suçu önceden, açıkça ilan etmiştir. Fail, kontrol kaybını "sonsuz kontrol"e çevirmek için cinayeti işlemiştir.</p>
<h3>Dayandığı Belgeler</h3>
<ol>
<li><strong>042-I (Sesli mesaj):</strong> Doğrudan tehdit kaydı. "Konuşmazsan bu bir suç olur."</li>
<li><strong>GSM Sinyal:</strong> Burak 22:14'te ölmüş; Meryem ifadesinde "23:00'ü geçmişti, Burak kapıdaydı" diyor — <strong>zaman çelişkisi</strong>. Meryem, Burak'la 22:00-22:30 arasında binada karşılaştığını gizliyor.</li>
<li><strong>22:19 "okundu":</strong> Mesajı failin Meryem'in kendisi açtı (kendine gönderdiği mesajın okunduğunu kontrol etmek için olası refleks).</li>
<li><strong>Şükrü Tanıklığı:</strong> "Topuklu, saçları açık kadın" — Aylin değil (Aylin evinden çıkmamıştı), Meryem'le eşleşiyor.</li>
<li><strong>Asansör 23:08–23:17:</strong> Aylin ve Emir bu pencereyi üstlenmiyor. Cesedin Kat 4'ten indirilmesi için kullanılmış olabilir — ya da bu pencerede fail (Meryem) cesetle ilgili düzenleme yapmış.</li>
<li><strong>Otopsi:</strong> Arkadan, hedefli, savunma izi yok — kurban faili tanıyor ve güveniyor. Eski hoca-öğrenci ilişkisi profile uyuyor.</li>
<li><strong>Polaroid (Emir) ve Aylin'in çöpü</strong> kasıtlı yanıltıcılardır (red herring). Ölüme bağlanmıyor.</li>
</ol>
<p style="background:rgba(107,22,32,0.12);padding:16px;border-left:3px solid var(--bordeaux);margin-top:24px"><strong>SONUÇ:</strong> Aylin yalnızca evsel atık attı (042 raporu temiz). Emir polaroid hırsızı, fail değil. Şükrü tanık. Sinem alibili. <strong>Fail Meryem Güldağ'dır.</strong></p>
<div class="doc-signature">
<div class="sig-line">Kıdemli Kriminal Analist · EGM</div>
<div class="sig-name">Onaylı</div>
</div>`,
  },
};
