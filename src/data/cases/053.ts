import type {
  CaseData,
  Document,
  Evidence,
  Suspect,
  Testimony,
  TimelineEvent,
} from "@/lib/case-types";
import { messageThreads053 } from "./053-message-threads";

const TL053_SHUFFLE = [
  18, 3, 11, 0, 14, 7, 4, 12, 1, 9, 16, 2, 13, 5, 15, 8, 6, 10, 17, 19,
] as const;

const suspects: Suspect[] = [
  {
    id: "suspect-01",
    code: "SUSP-01 · BŞK-YNC/BS",
    name: "Berk Savaş",
    role: "Yayıncılık menajeri · 30",
    quote:
      '"Zeynep benim en büyük yatırımımdı. VoltUp anlaşması onun — ve benim — hayatımı değiştirecekti."',
  },
  {
    id: "suspect-02",
    code: "SUSP-02 · BŞK-EDT/MY",
    name: "Melis Yıldırım",
    role: "En yakın arkadaş · Video editörü · 22",
    quote:
      '"Zeynep\'in yedek anahtarı bendeydi. O gece evine gittim ama içeri girmedim."',
  },
  {
    id: "suspect-03",
    code: "SUSP-03 · BŞK-DON/OD",
    name: "Onur Demir",
    role: "Eski erkek arkadaş · En büyük bağışçı · 24",
    quote:
      '"Ayrıldık ama onu izlemeye devam ettim. Bağışlarım ona destek, takıntı değil."',
  },
  {
    id: "suspect-04",
    code: "SUSP-04 · BŞK-STK/KT",
    name: "Kaan Tekin",
    role: "Stalker / obsesif izleyici · 27",
    quote:
      '"Ben sadece bir hayranım. Evinin adresini bilen tek kişi ben değilim."',
  },
  {
    id: "suspect-05",
    code: "SUSP-05 · BŞK-APT/HD",
    name: "Halil Dursun",
    role: "Apartman görevlisi · 56 · İlk bulan",
    quote:
      '"Her sabah poşetini bırakırım. O gün kapı kilitsizdi. İçeri girince gördüm."',
  },
  {
    id: "suspect-06",
    code: "SUSP-06 · BŞK-SPR/DA",
    name: "Deniz Acar",
    role: "VoltUp pazarlama müdürü · 35",
    quote:
      '"Sponsorluk anlaşması imza aşamasındaydı. Zeynep\'in ölümü bizi de vurdu."',
  },
];

const testimonies: Testimony[] = [
  {
    id: "053-C",
    suspectName: "Berk Savaş",
    headerDocId: "053-C · Beşiktaş İlçe Emniyet",
    title: "İfade — Berk Savaş (1. Oturum)",
    date: "03.11.2024 · 14:00",
    birth: "12.05.1994",
    occupation: "Yayıncı menajeri · BerkMedia",
    address: "Nişantaşı · Valikonağı Cad.",
    session: 1,
    paragraphs: [
      `Zeynep ile 14 aydır çalışıyordum. Kanalını 12.000'den 47.000'e çıkardık. VoltUp anlaşması 120.000 TL değerindeydi — 6 aylık. Benim komisyonum %25.`,
      `2 Kasım gecesi evimdeydim. Zeynep'in yayını **telefondan izliyordum** — her yayını izlerim, chat moderasyonu yaparım. 01:07'de yayın kesildi, Zeynep'e mesaj attım. **"Ne oldu, teknik sorun mu?"** — okunmadı.`,
      `**S:** Sonra ne yaptınız?\n**C:** Uyudum. Sabah haberlerden öğrendim.`,
      `**S:** VoltUp anlaşması Zeynep'in ölümüyle ne olacak?\n**C:** *[duraksama]* Büyük olasılıkla düşer. Ama anlaşmada bir **"miras" maddesi** var — kanalın içerik hakları menajere devrolur. Yani ben... teorik olarak kanalı işletebilirim.`,
      `**S:** Bu maddeyi Zeynep biliyor muydu?\n**C:** Evet. İmzaladı. Standart sektör maddesi.`,
    ],
    signature: "B. Savaş",
  },
  {
    id: "053-C2",
    suspectName: "Berk Savaş",
    headerDocId: "053-C2 · Beşiktaş İlçe Emniyet",
    title: "İfade — Berk Savaş (2. Oturum)",
    date: "05.11.2024 · 10:00",
    birth: "—",
    occupation: "—",
    address: "—",
    session: 2,
    metaRows: [
      { label: "Tarih", value: "05.11.2024 · 10:00" },
      {
        label: "Not",
        value: "Banka kayıtları ve e-posta incelenmesi sonrası",
      },
    ],
    signatureRole: "İfade Sahibi · Avukat talep etti",
    paragraphs: [
      `**S:** Berk Bey, VoltUp anlaşmasının "miras maddesi" aslında standart sektör maddesi değil. Bunu siz yazdırdınız. Ve Zeynep'in avukatına **göstermediniz**. Doğru mu?\n**C:** *[sinirli]* Zeynep'in avukatı yoktu. Ben onun her şeyiydim.`,
      `**S:** Son 3 ayda Zeynep'e yapılan bağışların **%40'ı "TheRealOnur"** hesabından gelmiş — toplam 38.000 TL. Bu bağışlar doğrudan sizin BerkMedia hesabına mı akıyor?\n**C:** Hayır. Zeynep'in kendi hesabına. Ben sadece komisyon alıyorum.`,
      `**S:** Ama miras maddesiyle kanal size geçiyor — bağışlar da dahil?\n**C:** *[sessizlik]* Teorik olarak evet.`,
      `**S:** 2 Kasım gecesi saat 00:30'da Beşiktaş'ta baz istasyonu sinyaliniz var. Nişantaşı'nda olduğunuzu söylemiştiniz.\n**C:** *[şaşkınlık]* Taksi çağırdım. Bir yere gittim. Zeynep'in evine değil.`,
      `**S:** Nereye?\n**C:** *[uzun sessizlik]* Avukatımla konuşmak istiyorum.`,
    ],
    signature: "B. Savaş",
  },
  {
    id: "053-C3",
    suspectName: "Berk Savaş",
    headerDocId: "053-C3 · Beşiktaş İlçe Emniyet",
    title: "İfade — Berk Savaş",
    date: "07.11.2024 · 14:00",
    birth: "—",
    occupation: "—",
    address: "—",
    session: 3,
    metaRows: [
      { label: "Tarih", value: "07.11.2024 · 14:00" },
      {
        label: "Not",
        value: "Avukat huzurunda. Apartman kamerası ve Melis ifadesi sonrası.",
      },
    ],
    signatureRole: "İfade Sahibi · Avukat huzurunda",
    paragraphs: [
      `**S:** Berk Bey, 3 Kasım 00:47'de Zeynep'in apartmanına girdiniz. Kamera kaydı var. 01:38'de çıktınız. Bu 51 dakikada ne yaptınız?\n**C:** *[avukatla fısıldaşma]* Tamam. Zeynep'in evine gittim. Ama kapıyı **Zeynep açtı**. Yayın molasına çıkmıştı — tuvaletten dönüyordu.`,
      `**S:** Neden gittiğinizi söyleyin.\n**C:** VoltUp anlaşmasını tartışmak için. Zeynep son birkaç gündür imza atmaktan kaçınıyordu. "Maddeleri avukata göstereceğim" diyordu. Ben de "bu gece çözelim" dedim.`,
      `**S:** Yayın sırasında mı gittiniz?\n**C:** Evet. Yayın molasında kapıyı açtı. **5 dakika konuştuk**. "Yarın imzalarım, şimdi git" dedi. Ben de gittim.`,
      `**S:** Ama yayın **01:07'de** kesildi. Siz 01:38'de çıktınız. Yayının kesilmesinden **31 dakika sonra** hâlâ oradaydınız.\n**C:** *[uzun sessizlik]* Zeynep beni çıkardıktan sonra merdivenlerden indim ama sigara içmek için giriş katında durdum. Asansörün yanında oturdum. O 30 dakika orada geçti.`,
      `**S:** Zeynep sizi çıkardığında saat kaçtı?\n**C:** 01:05... belki 01:08.`,
      `**S:** Yayın 01:07'de kesildi. Siz henüz dairenin içindeydiniz.\n**C:** *[panik]* Hayır! Ben tam o sırada çıkıyordum. Yayının kesilmesiyle ilgim yok!`,
      `<p style="background:rgba(107,22,32,0.1);padding:12px;border-left:3px solid var(--bordeaux)"><strong>Kritik:</strong> Berk, dairede 00:47–01:08 arası bulunduğunu kabul etti. Yayın 01:07'de kesildi. Berk ya yayın kesilirken dairedeydi ya da tam kapıdan çıkarken oradaydı. Çıkış saatiyle (01:38) arasındaki 30 dakikayı "sigara" ile açıklıyor — doğrulanması zor.</p>`,
    ],
    signature: "B. Savaş",
  },
  {
    id: "053-D",
    suspectName: "Melis Yıldırım",
    headerDocId: "053-D · Beşiktaş İlçe Emniyet",
    title: "İfade — Melis Yıldırım",
    date: "03.11.2024 · 16:00",
    birth: "08.03.2002",
    occupation: "Video editörü · Freelance",
    address: "Akatlar · 2 sokak ötede",
    session: 1,
    paragraphs: [
      `Zeynep en yakın arkadaşımdı. 2 sokak ötede oturuyorum. Yedek anahtarım var — çiçeklerini sularım, kedisine bakarım. O gece yayını izliyordum. 01:07'de kesilince mesaj attım: **"Yayın gitti, internet mi?"** — okunmadı.`,
      `Endişelendim. **01:20 civarı evinden geçtim**. Dışarıdan baktım, salon ışığı yanıyordu. Kapıyı çalmadım — yayına dönmüştür diye düşündüm. Eve döndüm.`,
      `**S:** Yedek anahtarı kullandınız mı?\n**C:** Hayır. Çalmadım bile.`,
      `**S:** Zeynep'in son zamanlarda endişe duyduğu bir şey var mıydı?\n**C:** Evet. **Kaan diye bir izleyici** var — son 3 aydır takıntılı mesajlar atıyor. Zeynep "evimi biliyor" demişti. Chat'te yasaklamıştık ama yeni hesaplarla geri geliyordu. Bir de... **Berk ile arası bozuktu**. Anlaşma maddelerini sorgulamaya başlamıştı.`,
      `**S:** Onur Demir hakkında?\n**C:** Onur abartılı bir bağışçı. Ama Zeynep **4 ay önce onunla ayrıldı**. Onur hâlâ bağış yapıyordu. Zeynep "parasını geri almaya çalışır gibi davranıyor" diyordu.`,
    ],
    signature: "M. Yıldırım",
  },
  {
    id: "053-D2",
    suspectName: "Melis Yıldırım",
    headerDocId: "053-D2 · Beşiktaş İlçe Emniyet",
    title: "İfade — Melis Yıldırım (2. Oturum)",
    date: "06.11.2024 · 11:00",
    birth: "—",
    occupation: "—",
    address: "—",
    session: 2,
    metaRows: [
      { label: "Tarih", value: "06.11.2024 · 11:00" },
      {
        label: "Not",
        value: "Apartman kamerası ve telefon kayıtları sonrası",
      },
    ],
    paragraphs: [
      `**S:** Melis Hanım, apartman kamerası sizi **01:22'de binaya girerken** gösteriyor. "Dışarıdan baktım, çalmadım" dediniz. Binaya girdiniz mi girmediniz mi?\n**C:** *[sessizlik]* Girdim. Ama kapıya kadar çıkıp kulak verdim. İçeriden ses geliyordu — **bir erkek sesiydi**. Zeynep birisiyle konuşuyordu. Çalmadım.`,
      `**S:** Erkek sesini tanıdınız mı?\n**C:** Net değil. Ama... Berk'e benziyordu. Kesin değilim.`,
      `**S:** Saat kaçta binadan çıktınız?\n**C:** 01:28 civarı. 6 dakika kaldım.`,
      `**S:** Zeynep'in size son attığı mesajda ne yazıyor?\n**C:** *[ağlama]* "Melis, Berk bu gece gelecek. Eğer bir şey olursa anahtarı kullan ve kedimi al." Bunu **23:45'te** attı. Ben ciddiye almadım.`,
      `<p style="background:rgba(107,22,32,0.1);padding:12px;border-left:3px solid var(--bordeaux)"><strong>Kritik:</strong> Zeynep, Berk'in o gece geleceğini biliyordu VE **korkuyordu**. "Bir şey olursa" ifadesi açık bir güvensizlik. Melis binada erkek sesi duymuş — Berk'e benziyordu. Zamanlama: Melis 01:22–01:28 arası, Berk kameraya göre 01:38'de çıkmış — yani Melis'in duyduğu ses gerçekten Berk.</p>`,
    ],
    signature: "M. Yıldırım",
  },
  {
    id: "053-E",
    suspectName: "Onur Demir",
    headerDocId: "053-E · Beşiktaş İlçe Emniyet",
    title: "İfade — Onur Demir",
    date: "04.11.2024 · 10:00",
    birth: "19.07.2000",
    occupation: "Yazılım mühendisi · Remote çalışan",
    address: "Kadıköy · Moda",
    session: 1,
    paragraphs: [
      `Zeynep ile 6 ay çıktık. 4 ay önce ayrıldık — onun kararıydı. Ben kabullenemedim. Yayınlarını izlemeye devam ettim. Bağış yapmaya devam ettim. **"TheRealOnur"** benim — toplam 38.000 TL bağışladım.`,
      `**S:** Neden bu kadar bağış?\n**C:** Onu desteklemek istedim. Ve... belki fark eder, geri döner diye. Patolojik, biliyorum.`,
      `**S:** 2 Kasım gecesi neredeydiniz?\n**C:** Evimde. Kadıköy'de. Yayını izliyordum. 01:07'de kesildi. Chat'te "ne oldu?" yazdım. Sonra uyudum.`,
      `**S:** Chat loglarında **"TheRealOnur"** hesabından Zeynep'e atılan bazı mesajlar var: "Berk seni kullanıyor", "O anlaşmayı imzalama", "Seni gerçekten seven tek kişi benim." Bunlar sizin mi?\n**C:** Evet. Ama tehdit değil.`,
      `**S:** Bir de şu var: **"Seni kimse benden alamaz. Kimse."** — 1 Kasım, yayın chat'i.\n**C:** *[duraksama]* O an sinirliydim. Zeynep başka bir izleyiciyle flört gibi konuşuyordu. Kötü niyetli değildi.`,
    ],
    signature: "O. Demir",
  },
  {
    id: "053-E2",
    suspectName: "Onur Demir",
    headerDocId: "053-E2 · Beşiktaş İlçe Emniyet",
    title: "İfade — Onur Demir (2. Oturum)",
    date: "06.11.2024 · 15:00",
    birth: "—",
    occupation: "—",
    address: "—",
    session: 2,
    metaRows: [
      { label: "Tarih", value: "06.11.2024 · 15:00" },
      { label: "Not", value: "GSM ve IP analizi sonrası" },
    ],
    signatureRole: "İfade Sahibi · Avukat talep etti",
    paragraphs: [
      `**S:** Onur Bey, Kadıköy'de olduğunuzu söylediniz. Ama VPN'siz IP adresiniz, 2 Kasım gecesi saat 23:00'dan itibaren **Beşiktaş bölgesinde bir Starlink erişim noktası** üzerinden bağlanmış. Açıklayın.\n**C:** *[şaşkınlık]* Ben... dizüstü bilgisayarımla dışarı çıktım. Bir kafede çalışıyordum.`,
      `**S:** Gece 11'de hangi kafe açık?\n**C:** *[duraksama]* Tamam. Zeynep'in evinin yakınında park ettim. Arabamda oturdum. Yayını arabadan izledim.`,
      `**S:** Neden?\n**C:** Bazen yapıyordum. Yayın bitince ışıkları söndüğünü görüp eve dönüyordum. Garip biliyorum.`,
      `**S:** Arabanız Lale Sokak'ta park halindeyken apartman kamerasına girdiniz mi?\n**C:** Hayır! Arabadan çıkmadım!`,
      `**S:** GSM sinyaliniz **01:05'te Zeynep'in binasının baz istasyonuna** bağlanmış. Arabanız menzil dışında.\n**C:** *[panik]* Belki baz menzil hatası... Avukat istiyorum.`,
    ],
    signature: "O. Demir",
  },
  {
    id: "053-F",
    suspectName: "Kaan Tekin",
    headerDocId: "053-F · Beşiktaş İlçe Emniyet",
    title: "İfade — Kaan Tekin",
    date: "04.11.2024 · 17:00",
    birth: "03.03.1997",
    occupation: "İşsiz · Eski depo çalışanı",
    address: "Bağcılar",
    paragraphs: [
      `Ben Zeynep'in en sadık izleyicisiyim. 18 aydır her yayınını izliyorum. Moderatörlük başvurusu yaptım, reddettiler. Sonra chat'te yasaklandım. Yeni hesaplar açtım.`,
      `**S:** Zeynep'in ev adresini nereden buldunuz?\n**C:** *[gülümseme]* Bir yayında arka planda Lale Sokak tabelası göründü. Google Maps'ten buldum. Sonra bir kez gittim, binayı gördüm.`,
      `**S:** O gece neredeydiniz?\n**C:** Evimde. Bağcılar'da. Yayını izliyordum. Kesilince çok endişelendim — Reddit'e yazdım.`,
      `**S:** Reddit postunuz saat **01:09'da** atılmış — yayın kesilmesinden 2 dakika sonra. "zeynepcasts offline oldu, bi şeyler yanlış" başlığıyla. Çok hızlı bir reaksiyon.\n**C:** Hep alert modundayım. Normal.`,
      `**S:** Kaan Bey, Zeynep'e gönderdiğiniz **12 sayfalık mektup** evinizde bulundu. Mektubun son paragrafında "Eğer seninle olamıyorsam, kimse olamaz" yazıyor.\n**C:** O mektubu **göndermemiştim**. Taslaktı.`,
    ],
    signature: "K. Tekin",
  },
  {
    id: "053-G",
    suspectName: "Halil Dursun",
    headerDocId: "053-G · Beşiktaş İlçe Emniyet",
    title: "İfade — Halil Dursun",
    date: "03.11.2024 · 12:00",
    birth: "15.04.1968",
    occupation: "Apartman görevlisi · 9 yıl",
    address: "Aynı bina · bodrum kat",
    paragraphs: [
      `Zeynep Hanım iyi bir kiracıydı. Her sabah saat 9'da alışverişini bırakırım — süt, ekmek, bazen meyve. O gün de geldim, kapıyı çaldım. Cevap yok. Aradım — açmadı. Kapı kolunu denedim, **kilitsizdi**. Açtım, içeri girdim. Koridordan yayın odasına baktım ve... onu gördüm.`,
      `**S:** Gece boyunca olağandışı bir şey fark ettiniz mi?\n**C:** Gece 1 civarı yukarıda **kapı sesi** duydum. Sonra merdivenlerden biri indi — hızlı adımlarla. Kim olduğunu görmedim. Bodrum katın penceresi sokağa bakıyor ama karanlıktı.`,
      `**S:** Geceleri binaya kim girip çıkıyor?\n**C:** Ana kapı şifreli ama şifreyi herkes biliyor — 4-7-2-1. Zeynep Hanım'ın arkadaşları sık gelirdi. Bir erkek var, Berk diye — bazen gece geç gelirdi.`,
      `**S:** Kapı kameranız var mı?\n**C:** Var ama **gece 00:00'da kapanıyor** — kayıt süresi yetersiz, HDD dolunca eski kayıtların üstüne yazıyor. Gece nöbet kamerası ayrı — ama **sadece lobi çekiyor**, sokak girişini değil.`,
    ],
    signature: "H. Dursun",
  },
  {
    id: "053-H",
    suspectName: "Deniz Acar",
    headerDocId: "053-H · Beşiktaş İlçe Emniyet",
    title: "İfade — Deniz Acar",
    date: "05.11.2024 · 14:00",
    birth: "22.11.1989",
    occupation: "Pazarlama müdürü · VoltUp Enerji",
    address: "Levent · Kanyon Residence",
    paragraphs: [
      `Zeynep ile sponsorluk görüşmeleri 2 aydır devam ediyordu. Anlaşma değeri: 120.000 TL / 6 ay. Zeynep'in demografisi bizim hedef kitlesiyle birebir örtüşüyordu.`,
      `**S:** Anlaşma imzalandı mı?\n**C:** Hayır. Zeynep son hafta **tereddüt etti**. Berk üzerinden iletişim kuruyorduk ama Zeynep beni **doğrudan arayıp** "bazı maddeler hakkında kaygım var" dedi.`,
      `**S:** Hangi maddeler?\n**C:** *[duraksama]* Rekabet yasağı maddesi. 6 ay boyunca başka hiçbir enerji markasıyla çalışamayacaktı. Ama daha önemlisi — **içerik onay hakkı**. Biz yayın öncesi içerik onayı istiyorduk. Zeynep bunu sansür olarak gördü.`,
      `**S:** Zeynep anlaşmayı reddetseydi ne olurdu?\n**C:** Berk ile aramızdaki **ön ödeme** sıkıntı olurdu. Berk'e zaten 30.000 TL peşin verdik — "başlangıç komisyonu." Anlaşma düşerse Berk bunu iade etmeli.`,
      `**S:** Berk bunu biliyor muydu?\n**C:** Elbette. Ve Zeynep'in tereddütü onu çok gerdi. Bana yazdı: **"Zeynep'i ikna edeceğim, merak etme."**`,
    ],
    signature: "D. Acar",
  },
];

const forensics: Document[] = [
  {
    id: "053-B",
    docId: "053-B · İstanbul Adli Tıp Kurumu",
    title: "Otopsi Raporu",
    meta: [
      { label: "Olay Tarihi", value: "03.11.2024" },
      { label: "Rapor Tarihi", value: "04.11.2024" },
      { label: "Hazırlayan", value: "Uzm. Dr. H. Demir" },
    ],
    body: `<h3>Dış Muayene</h3>
<ul>
<li>Boyunda <strong>ince, tek çizgi halinde ligature mark</strong> — 0,5 cm genişliğinde, yatay</li>
<li>İz, USB-C şarj kablosu veya benzeri ince esnek materyalle uyumlu</li>
<li>Peteşi: yüzde, göz kapaklarında, konjunktivada</li>
<li>Sağ elde <strong>savunma çiziği</strong> — tırnak izinden, kendi boynunu kurtarmaya çalışmış</li>
<li>Sol bileğin iç kısmında <strong>kavrama morlukları</strong> — 4 parmak izi paterni</li>
<li>Saç diplerinde <strong>tutam kopma</strong> — saçından çekilmiş</li>
</ul>
<h3>İç Muayene</h3>
<ul>
<li>Hiyoid kemik sağlam — genç kurbanlarda bu normal</li>
<li>Tiroid kıkırdak yumuşak doku kanaması</li>
<li>Beyin ödemi — uzamış asfiksi</li>
<li>Kanda <strong>etanol 0,03 g/dL</strong> — çok hafif</li>
<li>Toksikoloji: etanol dışında madde yok</li>
</ul>
<h3>Ölüm Sebebi</h3>
<p><strong>Mekanik asfiksi — ligature strangulation.</strong> İnce esnek bir materyal (USB kablosu, telefon şarj kablosu) ile boyun sıkılmış. Ölüm, 3–5 dakika süren sürekli baskı sonucu. Fail, mağduru <strong>arkadan yaklaşarak</strong> boğmuştur (iz paterni).</p>
<h3>Ölüm Zamanı &amp; Kritik Bulgular</h3>
<p>Tahmini ölüm: <strong>01:00 — 02:00</strong>. Vücut sıcaklığı ve livor mortis uyumlu.</p>
<p style="background:rgba(107,22,32,0.15);padding:14px 18px;border:1px solid var(--bordeaux)">
1. Kavrama morlukları: 4 parmak → <strong>sol el</strong> ile bileği tutmuş, <strong>sağ el</strong> ile kabloyu çekmiş. Fail sağ elini kullanan biri.<br>
2. Saç kopması: mağdurun direnişi sırasında — fail kontrol kurmaya çalışmış.<br>
3. Savunma çiziği: mağdur kendi boynundaki kabloyu çıkarmaya çalışmış — tırnak izi kendi.<br>
4. Cinayet aleti bulunamamış — fail <strong>yanında götürmüş</strong>.<br>
5. Yayın odasında masanın yanındaki <strong>USB-C şarj kablosu eksik</strong>. MacBook'un kablosu → fail bunu mu kullandı?
</p>`,
    signature: { role: "Uzm. Dr.", name: "H. Demir" },
  },
  {
    id: "053-A",
    docId: "053-A · Olay Yeri İnceleme",
    title: "Olay Yeri Raporu",
    meta: [
      { label: "Konum", value: "Lale Sok. No:7 D:12 · Akatlar" },
    ],
    body: `<h3>Bulgular</h3>
<ol>
<li>Mağdur, yayın odasının zemininde, bilgisayar masasının sol tarafında, yüzüstü. Sandalye devrilmiş.</li>
<li>Bilgisayar açık, Twitch dashboard sayfası görünüyor. Yayın: offline.</li>
<li>MacBook'un <strong>USB-C şarj kablosu eksik</strong>. Masada sadece adaptör kalmış.</li>
<li>Daire kapısı <strong>kilitsiz</strong> — zorlanma izi yok. Mağdur kapıyı kendi açmış.</li>
<li>Yayın kamerası (Logitech C920) açık ama <strong>yayın yazılımı (OBS) kapatılmış</strong> — fail yayını bilinçli olarak kapatmış.</li>
<li>Mutfakta yarım bardak su, 2 adet boş enerji içeceği kutusu (VoltUp marka — sponsorluk numunesi).</li>
<li>Yatak odasında düzensizlik yok — kavga yayın odasında olmuş.</li>
<li>Banyo aynasında <strong>ruj ile yazılmış mesaj: "SEN İSTEDİN"</strong></li>
<li>Giriş kapısı eşiğinde <strong>çamurlu ayakkabı izi</strong> — dış cephe tamir işçilerinin kireç tozu? Numara: <strong>43</strong>.</li>
</ol>
<p style="background:rgba(107,22,32,0.1);padding:12px;border-left:3px solid var(--bordeaux)"><strong>Ön Not:</strong> "SEN İSTEDİN" mesajı sahne kurgusu mu, yoksa failin psikolojik ifadesi mi? Ruj, Zeynep'in makyaj masasındaki rujla aynı renk — <strong>fail, mağdurun eşyasını kullandı</strong>. OBS'nin bilinçli kapatılması, failin yazılımı tanıdığını gösterir.</p>`,
    signature: { role: "Olay Yeri İnceleme", name: "Bşçvş. Tekin" },
  },
];

const evidence: Evidence[] = [
  {
    id: "ZYN-VOD01",
    tag: "Dijital",
    title: "Twitch VOD — Son 14 Saniye",
    description:
      "01:06:48 — 01:07:02 arası. Zeynep sandalyeden kalkar, arka planda gölge.",
    details: [
      { label: "Gölge analizi", value: "Erkek silüeti, 175–185 cm tahmin" },
      { label: "Kıyafet", value: "Koyu renk, kapüşonlu olabilir" },
      {
        label: "Yön",
        value:
          "Giriş kapısı tarafından — yani daireden çıkan değil GİREN biri",
      },
    ],
  },
  {
    id: "ZYN-KVR01",
    tag: "Biyoloji",
    title: "Kavrama Morlukları — Sol Bilek",
    description: "4 parmak izi paterni. Fail sol elle bileği tutmuş.",
    details: [
      { label: "Parmak açıklığı", value: "~9 cm — erkek eli" },
      { label: "Berk Savaş el ölçüsü", value: "9,2 cm ✓" },
      { label: "Onur Demir", value: "8,5 cm (sınırda)" },
      { label: "Kaan Tekin", value: "10,1 cm (fazla)" },
    ],
  },
  {
    id: "ZYN-USB01",
    tag: "Eksik",
    title: "Eksik USB-C Şarj Kablosu",
    description: "MacBook adaptörde ama kablo yok. Muhtemel cinayet aleti.",
    details: [
      { label: "Ligature mark", value: "0,5 cm genişlik → USB-C kabloyla uyumlu" },
      { label: "Durum", value: "Fail kabloyu götürmüş" },
      {
        label: "Arama",
        value:
          "Berk'in arabasında arama emri → USB-C kablo bulundu, kan izi analiz bekliyor",
      },
    ],
  },
  {
    id: "ZYN-RUJ01",
    tag: "Sahne",
    title: '"SEN İSTEDİN" — Ayna Mesajı',
    description: "Banyo aynasında, mağdurun kendi rujuyla yazılmış.",
    details: [
      { label: "Ruj", value: "MAC Ruby Woo — Zeynep'in makyaj çantasından" },
      {
        label: "Parmak izi",
        value: "Ruj üzerinde kısmi iz — lateks eldiven dokusu",
      },
      {
        label: "Anlam",
        value: "Fail eldiven giydi ve mesajı kasten bıraktı — sahne kurgusu",
      },
    ],
  },
  {
    id: "ZYN-AYK01",
    tag: "İz",
    title: "Çamurlu Ayakkabı İzi — 43 Numara",
    description: "Giriş kapısı eşiğinde. Kireçli çamur — dış cephe işi?",
    details: [
      { label: "Berk Savaş", value: "43 numara ✓ · Nike Air Max" },
      { label: "Onur Demir", value: "42 numara ✗" },
      { label: "Kaan Tekin", value: "44 numara ✗" },
      {
        label: "Kireç analizi",
        value: "Binanın dış cephesindeki alçı ile eşleşmiyor — farklı kaynak",
      },
    ],
  },
  {
    id: "ZYN-OBS01",
    tag: "Dijital",
    title: "OBS Yazılımı — Kapatma Logu",
    description: '"Stream ended by user" — 01:07:04.',
    details: [
      {
        label: "Kapatma yöntemi",
        value: "Klavyeden kısayol (Ctrl+Shift+S) — mouse değil",
      },
      {
        label: "Yorum",
        value: "Fail OBS kısayolunu biliyor → yayıncılık teknik bilgisi var",
      },
      {
        label: "Kim bilir",
        value:
          "Berk (menajer), Melis (editör), Zeynep",
      },
    ],
  },
  {
    id: "ZYN-SAC01",
    tag: "DNA",
    title: "Saç Tutamı — Mağdurun Elinde",
    description:
      "Zeynep'in sol elinde, sıkıca tutulmuş 3 tel saç. Mağdurun kendi saçı değil.",
    details: [
      { label: "Renk", value: "Koyu kahverengi, kısa (3–4 cm)" },
      { label: "DNA", value: "Berk Savaş ile %99,6 eşleşme ✓" },
      { label: "Yorum", value: "Kavga sırasında failin saçını çekmiş" },
    ],
  },
  {
    id: "ZYN-MSG01",
    tag: "Telefon",
    title: "Zeynep'in Son Mesajı — Melis'e",
    description:
      '"Berk bu gece gelecek. Eğer bir şey olursa anahtarı kullan ve kedimi al." — 23:45',
    details: [
      { label: "Anlam", value: "Zeynep, Berk'ten korkuyordu" },
      { label: '"Bir şey olursa"', value: "Fiziksel tehdit beklentisi" },
      {
        label: "Melis ifadesi",
        value: '"Ciddiye almadım" — 2. oturumda binaya girdiğini itiraf etti',
      },
    ],
  },
];

const documents: Document[] = [
  {
    id: "053-K",
    docId: "053-K · Sözleşme Belgesi",
    title: "VoltUp Sponsorluk Anlaşması — Madde 14 ve 22",
    meta: [
      {
        label: "Taraflar",
        value: "VoltUp Enerji A.Ş. ↔ BerkMedia (Zeynep Korkut adına)",
      },
      { label: "Tarih", value: "Taslak · İmzasız · 25.10.2024" },
      { label: "Değer", value: "120.000 TL / 6 ay" },
    ],
    body: `<p><strong>Madde 14 — İçerik Onay Hakkı:</strong> Yayıncı, sponsorluk kapsamındaki tüm içerikleri yayın öncesi VoltUp Pazarlama Birimine sunacak ve yazılı onay alacaktır. Onaysız içerik yayınlanması halinde sözleşme tek taraflı feshedilebilir.</p>
<p><strong>Madde 22 — Devir ve Miras Hükmü:</strong> Yayıncının herhangi bir nedenle kanal yönetiminden çekilmesi veya kanalın <strong>yayıncı tarafından işletilememesi</strong> durumunda, kanalın tüm ticari hakları ve devam eden sponsorluk yükümlülükleri <strong>menajer/temsilciye</strong> devrolur. Bu devir, sözleşme süresince geçerlidir.</p>
<p style="background:rgba(107,22,32,0.1);padding:12px;border-left:3px solid var(--bordeaux)"><strong>Çıkarsama:</strong> Madde 22, Zeynep öldüğünde veya "kanalı işletemediğinde" tüm hakların <strong>Berk Savaş'a</strong> geçeceğini söylüyor. VoltUp'ın 30.000 TL peşin ödediği, Zeynep imzalamaktan kaçındığı, ama Berk'in <strong>30.000 TL'yi iade etmesi gerektiği</strong> durumda Berk'in mali çıkmazda kalacağı — tüm bunlar Berk'e güçlü bir mali motif veriyor.</p>`,
    signature: { role: "VoltUp Hukuk Departmanı", name: "Taslak" },
  },
  {
    id: "053-L",
    docId: "053-L · Mahkeme Kararıyla — Banka Kayıtları",
    title: "Berk Savaş — Hesap Hareketleri",
    meta: [
      { label: "Hesap", value: "BerkMedia Ticari Hesap + Kişisel" },
      { label: "Dönem", value: "Eylül — Kasım 2024" },
    ],
    body: `<table class="ledger-table">
<thead><tr><th>Tarih</th><th>Açıklama</th><th>Tutar</th></tr></thead>
<tbody>
<tr><td>15.09.2024</td><td>VoltUp → BerkMedia "başlangıç komisyonu"</td><td>+30.000 TL</td></tr>
<tr><td>20.09.2024</td><td>Kişisel: Kredi kartı borcu kapatma</td><td>-28.500 TL</td></tr>
<tr><td>01.10.2024</td><td>BerkMedia: Ofis kirası</td><td>-8.000 TL</td></tr>
<tr><td>15.10.2024</td><td>Kişisel: Yeni MacBook Pro</td><td>-52.000 TL</td></tr>
<tr class="alert"><td>28.10.2024</td><td>BerkMedia BAKİYE: -14.200 TL (eksi)</td><td>-14.200 TL</td></tr>
<tr class="alert"><td>01.11.2024</td><td>VoltUp: "Anlaşma 15 Kasım'a kadar imzalanmazsa peşin iade" uyarısı</td><td>—</td></tr>
</tbody>
</table>
<p style="margin-top:18px"><strong>Çıkarsama:</strong> Berk, VoltUp'ın 30.000 TL peşin ödemesini <strong>kişisel borçlarını kapatmak</strong> için harcamış. Anlaşma imzalanmazsa bu parayı iade etmeli — ama hesapta <strong>-14.200 TL</strong> var. Berk <strong>mali çıkmazda</strong>. Zeynep'in anlaşmayı reddetmesi = Berk'in iflası.</p>`,
    signature: { role: "Mali Suçlar", name: "D. Kara" },
  },
  {
    id: "053-N",
    docId: "053-N · Arama Kararı — Kaan Tekin Evi",
    title: "12 Sayfalık Mektup — Taslak",
    meta: [
      {
        label: "Bulunma Yeri",
        value: "Kaan Tekin, Bağcılar, yatak odası çekmecesi",
      },
      { label: "Tarih", value: "Aramada ele geçirildi · 05.11.2024" },
    ],
    body: `<p>Zeynep,</p>
<p>18 aydır her gece senin için uyanık kalıyorum. Sen ekranın arkasında gülümserken ben burada, karanlıkta, seni düşünüyorum. Her bağışta "TheRealOnur"a teşekkür ediyorsun ama benim yazdığım 200 mesajdan birine bile cevap vermiyorsun.</p>
<p>Berk seni kullanıyor. Onur seni satın alıyor. Melis seni kıskanıyor. Hiçbiri seni benim gibi anlamıyor.</p>
<p>Eğer seninle olamıyorsam, kimse olamaz. Bu bir tehdit değil. Bu bir gerçek. Sen beni görmezden geldiğin her gece, ben biraz daha kararıyorum.</p>
<p style="text-align:right"><strong>K.</strong></p>
<p style="margin-top:18px"><strong>Çıkarsama:</strong> Kaan'ın obsesif takıntısı belgelenmiş. "Kimse olamaz" ifadesi chat'teki mesajla aynı dili kullanıyor. Ancak mektup <strong>postalanmamış</strong> — ve Kaan, olay gecesi Bağcılar'da mı yoksa Beşiktaş'ta mı? GSM verisi kilit.</p>`,
    signature: { role: "Arama Tutanağı", name: "Bşçvş. Tekin" },
  },
  {
    id: "053-O",
    docId: "053-O · Dijital — Not Uygulaması",
    title: "Zeynep'in iPhone Notes — Son Girişler",
    meta: [{ label: "Export", value: "Adli kopya · Kasım 2024" }],
    body: `<p><strong>28.10.2024:</strong> VoltUp anlaşması korkutucu. Madde 22'yi bugün fark ettim — Berk tüm kanalımı alabilir? Bu normal mi? Avukat lazım.</p>
<p><strong>30.10.2024:</strong> Berk'e söyledim — "avukata göstereceğim" dedim. Çok sinirlendi. "Bu standart, herkes imzalıyor" dedi. Ama ben okuyunca standart olmadığını gördüm.</p>
<p><strong>01.11.2024:</strong> Kaan yine hesap açmış. "KAPINI AÇ" yazdı. Melis'e söyledim. Bu adam evimi biliyor. Korkuyorum. Polise mi gitsem? Ama yayıncı olarak "drama" istemiyorum.</p>
<p><strong>02.11.2024 (olay günü):</strong> Berk bu gece gelecek. "Anlaşmayı imzala yoksa VoltUp çekilir" diyor. Melis'e yazdım — bir şey olursa diye. Belki abartıyorum ama Berk son zamanlarda çok agresif. Geçen hafta kolumu tuttu ve bağırdı. <strong>Eğer imzalamazsam ne yapacak?</strong></p>
<p style="margin-top:18px"><strong>Çıkarsama:</strong> Zeynep, ölmeden önceki hafta boyunca Berk'ten <strong>giderek artan bir korku</strong> duyuyordu. "Geçen hafta kolumu tuttu ve bağırdı" — fiziksel şiddet geçmişi mevcut. Madde 22 keşfi, Zeynep'i Berk'ten uzaklaştırıyordu.</p>`,
    signature: { role: "Dijital Adli", name: "B. Yıldız" },
  },
  {
    id: "053-Q",
    docId: "053-Q · Apartman Güvenlik Sistemi",
    title: "Lobi Kamerası Dökümü — 2–3 Kasım",
    meta: [{ label: "Bina", value: "Lale Sok. No:7" }],
    body: `<p style="font-size:11px;color:var(--kraft-dark);margin-bottom:12px">NOT: Sokak kapısı kamerası 00:00'da kapanıyor (HDD sınırı). Lobi kamerası 24 saat çalışıyor ama <strong>sadece lobi iç mekanı</strong> çekiyor — sokak girişi ve merdiven girişi kör nokta.</p>
<table class="signal-table">
<thead><tr><th>Saat</th><th>Kanal</th><th>Olay</th></tr></thead>
<tbody>
<tr><td>23:15</td><td>Lobi</td><td>Zeynep lobiden geçer — market poşetleriyle</td></tr>
<tr><td>23:18</td><td>Lobi</td><td>Zeynep asansöre biner — dairesine çıkar</td></tr>
<tr class="alert"><td>00:47</td><td>Lobi</td><td><strong>Berk Savaş</strong> lobiye girer — merdivenlerden çıkar</td></tr>
<tr><td>01:22</td><td>Lobi</td><td><strong>Melis Yıldırım</strong> lobiye girer — asansöre değil, <strong>merdivene</strong> yönelir</td></tr>
<tr><td>01:28</td><td>Lobi</td><td>Melis lobiden çıkar</td></tr>
<tr class="alert"><td>01:38</td><td>Lobi</td><td><strong>Berk Savaş</strong> merdivenlerden iner — lobiden çıkar</td></tr>
<tr><td>09:15</td><td>Lobi</td><td>Halil (kapıcı) asansöre biner</td></tr>
</tbody>
</table>
<p style="margin-top:18px;background:rgba(107,22,32,0.15);padding:14px 18px;border:1px solid var(--bordeaux)">
<strong>KARA DELİK:</strong> Sokak kamerası 00:00'da kapandığı için <strong>00:00 sonrası sokaktan kimin girdiği</strong> doğrulanamıyor. Lobi kamerası yalnızca lobi içini çekiyor — biri <strong>arka merdivenden veya yangın çıkışından</strong> binaya girerse lobi kamerasına düşmez.<br><br>
<strong>Onur Demir:</strong> Lobide görünmüyor. Ama binanın arka sokağında park ettiğini itiraf etti. Arka giriş? GSM sinyali 01:05'te bina baz istasyonunda.<br>
<strong>Kaan Tekin:</strong> Lobide görünmüyor. Bağcılar'da mı? GSM analiz bekliyor.
</p>`,
    signature: { role: "Bina Güvenlik IT", name: "Sistem Logu" },
  },
  {
    id: "053-R",
    docId: "053-R · GSM Baz İstasyonu + DNA Nihai Rapor",
    title: "Teknik Analiz — Tüm Şüpheliler",
    meta: [{ label: "Rapor", value: "Nihai" }],
    body: `<h3>GSM Sinyal Verileri</h3>
<p><strong>BERK SAVAŞ</strong></p>
<table class="signal-table">
<thead><tr><th>Saat</th><th>Konum</th><th>Tip</th></tr></thead>
<tbody>
<tr><td>23:00</td><td>Nişantaşı</td><td>Aktif</td></tr>
<tr class="alert"><td>00:30</td><td>Beşiktaş · Akatlar baz</td><td>Hareket</td></tr>
<tr class="alert"><td>00:47</td><td>Lale Sok. baz</td><td>Sabit</td></tr>
<tr class="alert"><td>01:38</td><td>Lale Sok. baz → Beşiktaş</td><td>Hareket</td></tr>
<tr><td>02:10</td><td>Nişantaşı</td><td>Aktif</td></tr>
</tbody>
</table>
<p style="margin-top:20px"><strong>ONUR DEMİR</strong></p>
<table class="signal-table">
<thead><tr><th>Saat</th><th>Konum</th><th>Tip</th></tr></thead>
<tbody>
<tr><td>22:00</td><td>Kadıköy</td><td>Aktif</td></tr>
<tr class="alert"><td>23:30</td><td>Beşiktaş · Akatlar baz</td><td>Hareket</td></tr>
<tr class="alert"><td>01:05</td><td>Lale Sok. baz (bina menzili)</td><td>Sabit</td></tr>
<tr><td>01:45</td><td>Beşiktaş → Kadıköy</td><td>Hareket</td></tr>
<tr><td>02:30</td><td>Kadıköy</td><td>Aktif</td></tr>
</tbody>
</table>
<p style="margin-top:20px"><strong>KAAN TEKİN</strong></p>
<table class="signal-table">
<thead><tr><th>Saat</th><th>Konum</th><th>Tip</th></tr></thead>
<tbody>
<tr><td>22:00 — 06:00</td><td><strong>Bağcılar</strong> baz istasyonu · sabit</td><td>Sabit</td></tr>
</tbody>
</table>
<h3>DNA Nihai Sonuçlar</h3>
<ol>
<li><strong>Saç tutamı (ZYN-SAC01):</strong> Berk Savaş — %99,6 ✓</li>
<li><strong>USB-C kablo (Berk'in arabasında):</strong> Kan izi → Zeynep Korkut (%99,8) + Berk Savaş (%97,2 ter/deri hücresi) ✓</li>
<li><strong>Ayakkabı izi kireç analizi:</strong> Berk'in Nike Air Max 43 taban deseniyle <strong>%89 eşleşme</strong>. Kireç kaynağı: Berk'in <strong>ofis binası</strong> tadilatından (Nişantaşı — dış cephe)</li>
<li><strong>Kavrama morlukları:</strong> 9 cm parmak açıklığı → Berk (9,2 cm) en yakın eşleşme</li>
<li><strong>Ruj mesajı:</strong> Lateks eldiven dokusu → marka/numara: Berk'in arabasındaki eldiven kutusuyla aynı seri (Vileda M)</li>
</ol>
<p style="margin-top:18px;background:rgba(107,22,32,0.15);padding:14px 18px;border:1px solid var(--bordeaux)">
<strong>SONUÇ:</strong> Saç DNA'sı, USB-C kablodaki biyolojik izler, ayakkabı izi, kavrama morlukları, OBS bilgisi, eldiven serisi — hepsi <strong>Berk Savaş'ı</strong> gösteriyor.<br><br>
<strong>Kaan Tekin:</strong> Bağcılar'da, gece boyunca sabit sinyal. Chat'teki "KAPINI AÇ" mesajı fiziksel değil dijital tehdit. Fiziksel olarak olay yerinde değildi.<br>
<strong>Onur Demir:</strong> Bina menzilinde (01:05) ama lobiye girmemiş. Takıntılı takipçi — ama binaya girdiğine dair kanıt yok. "İkinci yalancı" — takipçilik suçunu saklıyor, cinayet işlememiş.
</p>`,
    signature: { role: "Adli Genetik + GSM", name: "Dr. A. Koç / D. Arslan" },
  },
];

const technical: Document[] = [
  {
    id: "053-S",
    docId: "053-S · OBS Studio Log Analizi",
    title: "Yayın Yazılımı Kapatma Analizi",
    meta: [],
    body: `<p>OBS Studio log dosyası (AppData/obs-studio/logs):</p>
<p style="font-family:var(--font-jetbrains-mono),monospace;font-size:11px;background:#1a1c1f;color:#d6cdb6;padding:16px;border-radius:0;line-height:1.8">
[01:07:02.341] Output 'simple_stream': stopping<br>
[01:07:02.344] Output 'simple_stream': Total frames: 144892<br>
[01:07:04.112] <span style="color:var(--bordeaux-bright)">User requested stop (hotkey: Ctrl+Shift+S)</span><br>
[01:07:04.115] Output 'simple_stream': stopped<br>
[01:07:04.116] Stream ended
</p>
<p style="margin-top:18px"><strong>Çıkarsama:</strong> Yayın, <strong>klavye kısayoluyla</strong> (Ctrl+Shift+S) kapatılmış — mouse ile değil, OBS arayüzünden değil. Bu, failin <strong>OBS kısayollarını bildiğini</strong> gösterir. Zeynep'in yayın setupını bilen kişiler: Berk (menajer, teknik destek verir), Melis (editör, OBS dosyalarıyla çalışır). Diğer şüpheliler OBS bilmez.</p>
<p>Ek olarak: 01:07:02'de "stopping" ve 01:07:04'te "stopped" — arada <strong>2 saniye</strong>. Bu, yayının Zeynep tarafından değil, <strong>bilgisayarın başına geçen biri</strong> tarafından kapatıldığını gösterir (Zeynep sandalyeden kalkmıştı).</p>`,
    signature: { role: "Dijital Adli", name: "B. Yıldız" },
  },
  {
    id: "053-T",
    docId: "053-T · Görüntü Analizi",
    title: "VOD Gölge Analizi — Son Kare",
    meta: [],
    body: `<p>Twitch VOD kaydının 01:07:02 karesinde görünen gölge, adli görüntü işleme (kontrast artırma, gürültü azaltma) uygulanarak analiz edilmiştir:</p>
<ul>
<li>Boy tahmini: <strong>178–183 cm</strong> (gölge oranı + tavan yüksekliği referansı)</li>
<li>Vücut yapısı: orta, atletik değil</li>
<li>Kıyafet: koyu renk üst — <strong>kapüşon veya yaka</strong> (net değil)</li>
<li>Gölge yönü: giriş kapısından — yani <strong>daireden dışarı çıkan değil, içeri giren</strong> biri</li>
<li>Eldiven: gölgede el detayı çıkartılamadı</li>
</ul>
<p><strong>Boy karşılaştırma:</strong></p>
<ul>
<li>Berk Savaş: <strong>181 cm</strong> ✓</li>
<li>Onur Demir: 176 cm (sınırda)</li>
<li>Kaan Tekin: 185 cm (sınırda üst)</li>
<li>Halil Dursun: 170 cm ✗</li>
</ul>`,
    signature: { role: "Görüntü Analizi", name: "S. Kurt" },
  },
];

const timeline: TimelineEvent[] = [
  {
    id: "053-tl-0",
    time: "02.11 · 19:22",
    source: "053-P",
    event: 'Berk → Deniz: "Bu gece hallolacak."',
  },
  {
    id: "053-tl-1",
    time: "23:00",
    source: "VOD",
    event: 'Zeynep yayına başlar. IRL format, "just chatting."',
  },
  {
    id: "053-tl-2",
    time: "23:15",
    source: "053-Q",
    event: "Zeynep marketten döner, dairesine çıkar.",
  },
  {
    id: "053-tl-3",
    time: "23:45",
    source: "053-D2",
    critical: true,
    event:
      "Zeynep → Melis: \"Berk bu gece gelecek. Bir şey olursa anahtarı kullan ve kedimi al.\"",
  },
  {
    id: "053-tl-4",
    time: "23:30",
    source: "053-R",
    event: "Onur Demir Kadıköy'den Beşiktaş'a hareket eder.",
  },
  {
    id: "053-tl-5",
    time: "00:30",
    source: "053-R",
    critical: true,
    event: "Berk Savaş Akatlar baz istasyonunda. Binaya doğru.",
  },
  {
    id: "053-tl-6",
    time: "00:47",
    source: "053-Q",
    critical: true,
    event: "Berk lobiye girer — kamerada görülüyor. Merdivenlerden çıkar.",
  },
  {
    id: "053-tl-7",
    time: "~00:55",
    source: "053-C3",
    event:
      "Berk Zeynep'in kapısını çalar. Zeynep yayın molasına çıkar, kapıyı açar.",
  },
  {
    id: "053-tl-8",
    time: "01:00",
    source: "053-M",
    event:
      'Chat\'te "YASAKLI_KLN_847": "KAPINI AÇ" — Kaan Tekin, Bağcılar\'dan (dijital tehdit).',
  },
  {
    id: "053-tl-9",
    time: "01:05",
    source: "053-R",
    critical: true,
    event:
      "Onur'un GSM sinyali bina baz istasyonunda — arabada mı, binada mı?",
  },
  {
    id: "053-tl-10",
    time: "01:06:48",
    source: "VOD",
    event: "Zeynep chat ile konuşuyor, gülüyor. Her şey normal.",
  },
  {
    id: "053-tl-11",
    time: "01:06:54",
    source: "VOD",
    critical: true,
    event: 'Zeynep başını çevirir: "Bir saniye." Sandalyeden kalkar.',
  },
  {
    id: "053-tl-12",
    time: "01:07:02",
    source: "053-T",
    critical: true,
    event:
      "Arka planda gölge — kapı yönünden. 178–183 cm, koyu kıyafet.",
  },
  {
    id: "053-tl-13",
    time: "01:07:04",
    source: "053-S",
    critical: true,
    event: "OBS kapatılır — Ctrl+Shift+S kısayoluyla. STREAM OFFLINE.",
  },
  {
    id: "053-tl-14",
    time: "01:07 — 01:15",
    source: "Çıkarım",
    critical: true,
    event:
      "CİNAYET PENCERESİ. Berk, Zeynep'i USB-C kabloyla boğar. Ayna mesajını yazar. OBS'yi kapatır.",
  },
  {
    id: "053-tl-15",
    time: "01:22",
    source: "053-D2",
    event:
      "Melis binaya girer. Kapıda kulak verir. Erkek sesi duyar (Berk).",
  },
  {
    id: "053-tl-16",
    time: "01:28",
    source: "053-Q",
    event: "Melis binadan çıkar.",
  },
  {
    id: "053-tl-17",
    time: "01:38",
    source: "053-Q",
    critical: true,
    event: "Berk merdivenlerden iner, lobiden çıkar.",
  },
  {
    id: "053-tl-18",
    time: "01:45",
    source: "053-R",
    event: "Onur Beşiktaş'tan ayrılır.",
  },
  {
    id: "053-tl-19",
    time: "09:15",
    source: "053-G",
    event: "Halil kapıyı kilitsiz bulur. İçeri girer. Cesedi bulur.",
  },
];

const timelineInitialOrder = TL053_SHUFFLE.map((i) => timeline[i]!.id);

export const case053: CaseData = {
  id: "053",
  codename: "Offline",
  fullTitle: "Vaka № 053 — Offline Dosyası",
  status: "active",
  difficulty: "Zor",
  recommendedPlayers: "3-4",
  location: "İstanbul · Beşiktaş · Akatlar Mah. · Lale Sok. No:7 D:12",
  victim: "Zeynep Korkut (21, kadın)",
  date: "3 Kasım 2024 · Gece 01:00 — 02:00 (tahmini)",
  shortSummary:
    "Gece yayını 'offline' olmadan önce kapıda biri vardı. Altı şüpheli, yirmi beş belge benzeri parça, kör açılı bir lobi kamerası ve VoltUp baskısı.",
  enabledTabs: [
    "brief",
    "supheliler",
    "ifadeler",
    "adli-tip",
    "deliller",
    "belgeler",
    "teknik",
    "deduction",
    "cozum",
  ],
  brief: {
    subtitle: "053-A · Olay Özeti",
    metaPairs: [
      { label: "Vaka No", value: "053" },
      { label: "Dosya Kodu", value: "DAKT-053-OFL" },
      { label: "Dosya Tipi", value: "Cinayet — Boğma — Yüksek Öncelik" },
      {
        label: "Olay Tarihi",
        value: "3 Kasım 2024 · Gece 01:00 — 02:00 (tahmini)",
      },
      {
        label: "Konum",
        value: "İstanbul · Beşiktaş · Akatlar Mah. · Lale Sok. No:7 D:12",
      },
      { label: "Kurban", value: "Zeynep Korkut (21, kadın)" },
    ],
    sections: [
      {
        title: "Olay",
        body: `<p>3 Kasım 2024 sabahı saat 09:15. Apartman görevlisi <strong>Halil Dursun</strong>, her sabah olduğu gibi Zeynep Korkut'un dairesine alışveriş poşetini bırakmak ister. Kapıyı çalar, yanıt alamaz. Telefonla arar — açmaz. Zeynep'in gece yayın yaptığını bildiği için geç uyuduğunu düşünür, ama <strong>kapının kilitsiz olduğunu</strong> fark edince içeri girer ve Zeynep'i <strong>yayın odasının zemininde</strong>, bilgisayar masasının yanında, cansız halde bulur.</p>
<p>Mağdur, <strong>boğularak öldürülmüştür</strong>. Boyunda ip veya kablo izi var — ince, esnek bir materyal. Yüzünde peteşi, gözlerinde subkonjunktival kanama. Cinayet aleti olay yerinde bulunamamıştır.</p>`,
      },
      {
        title: "Mağdur Profili",
        body: `<p>Zeynep Korkut, <strong>"zeynepcasts"</strong> kullanıcı adıyla Twitch'te aktif bir yayıncıydı. 47.000 takipçi. İçerik: IRL sohbet, oyun ve "just chatting". Son 6 ayda kanal <strong>sponsorluk teklifleri</strong> aldı — özellikle <strong>VoltUp</strong> ile anlaşma görüşmeleri.</p>
<p>Tek başına yaşar; İstanbul'da menajer <strong>Berk Savaş</strong> temsil eder. Yakın çevre: <strong>Melis Yıldırım</strong> (editör), <strong>Onur Demir</strong> (eski sevgili, büyük bağışçı).</p>`,
      },
      {
        title: "Yayın Kaydı — Kritik",
        body: `<p>2 Kasım 23:00'te başlayan yayın <strong>3 Kasım 01:07'de</strong> kesilir. Son saniyeler:</p>
<ul>
<li><strong>01:06:48</strong> — Zeynep chat ile konuşuyor</li>
<li><strong>01:06:54</strong> — "Bir saniye"</li>
<li><strong>01:06:58</strong> — Kalkar, kadrajdan çıkar</li>
<li><strong>01:07:02</strong> — Arka planda <strong>gölge</strong></li>
<li><strong>01:07:04</strong> — <strong>Stream offline</strong></li>
</ul>`,
      },
      {
        title: "Görev",
        body: `<p>Bu dosyadaki <strong>25 belgeyi</strong> incele. Gölgeyi çöz, chat tehditlerini izle, VoltUp maddelerini oku, kamera <strong>boşluğunu</strong> fark et.</p>`,
      },
      {
        title: "Uyarı",
        body: `<p style="background:rgba(107,22,32,0.1);padding:12px 16px;border-left:3px solid var(--bordeaux)"><strong>UYARI:</strong> Fail, mağdurun kapısına <strong>davet edilmiştir</strong>. Kapı kırılmamış. Zeynep kapıyı kendi açtı. Ama kime?</p>`,
      },
    ],
    signature: {
      role: "Düzenleyen\nKriminal Soruşturma Birimi",
      name: "G. Aras",
    },
  },
  suspects,
  testimonies,
  forensics,
  evidence,
  documents,
  messageThreads: messageThreads053,
  technical,
  timeline,
  timelineInitialOrder,
  deduction: {
    contradictions: [
      {
        pin: true,
        text: "Berk'in 3 yalanı: 1) «Evimdeydim» → GSM + kamera yalanı, 2) «5 dakika» → 51 dakika (kamera), 3) «Yayın kesilmesiyle ilgim yok» → dairede o sırada.",
      },
      {
        pin: true,
        text: "Saç DNA: Zeynep'in elinde Berk'in saçı — kavga sırasında çekilmiş.",
      },
      {
        pin: true,
        text: "USB-C kablo: Berk'in arabasında, Zeynep'in kanı + Berk'in biyolojik izi.",
      },
      {
        pin: true,
        text: "OBS kısayolu: Fail yayını klavyeden kapattı — Berk menajer olarak OBS'yi tanıyor.",
      },
      {
        pin: false,
        text: "«SEN İSTEDİN»: Berk'in mağdura yüklediği suçlama mantığı; anlaşma reddi.",
      },
      {
        pin: false,
        text: "Zeynep'in son mesajı: «Berk bu gece gelecek…» — ölüm öncesi korku belgesi.",
      },
      {
        pin: false,
        text: "Mali motif: 30.000 TL iade + hesapta -14.200 TL. İmza yoksa Berk iflas.",
      },
    ],
    elimination: [
      {
        pin: true,
        text: "Kaan Tekin: Bağcılar'da sabit GSM; tehdit dijital; fiziksel olarak orada değil. Kırmızı ringa.",
      },
      {
        pin: true,
        text: "Onur Demir: Bina menzilinde (01:05) ama lobide yok; DNA yok. İkinci yalancı — takipçilik.",
      },
      {
        pin: false,
        text: "Melis: 01:22–01:28 binada; OBS biliyor; fiziksel delil yok. Bilgi saklayan tanık.",
      },
      {
        pin: false,
        text: "Halil: İlk bulan; gece kapı sesi tanığı; motif yok.",
      },
      {
        pin: false,
        text: "Deniz Acar: VoltUp müdürü; mali baskı ama olay yerinde değil; dolaylı tetikleyici.",
      },
      {
        pin: false,
        text: "Berk Savaş: 00:47–01:38 binada; DNA + kablo + OBS + ayakkabı + mali çıkmaz + üç oturumda çöküş. Fail.",
      },
    ],
  },
  tabSectionSub: {
    brief: "053-A · Olay Özeti",
    supheliler: "Gizli · 06 Profil",
    ifadeler: "053-C → 053-H",
    "adli-tip": "053-A · 053-B",
    deliller: "8 Adet Delil Fişi",
    belgeler: "053-K → 053-R · Twitch & E-posta",
    teknik: "053-S · 053-T",
    deduction: "Notlar · Sadece sana özel",
    cozum: "053-Z2 · Sınırlı Erişim",
  },
  verdict: {
    perpetratorId: "suspect-01",
    perpetratorName: "Berk Savaş",
    murderTime:
      "3 Kasım 2024, 01:07 — 01:15 arası (cinayet penceresi; yayın kesimi ile uyumlu).",
    murderLocation:
      "Beşiktaş · Akatlar · Lale Sok. No:7 D:12 · Zeynep Korkut dairesi · yayın odası.",
    murderWeapon:
      "USB-C şarj kablosu (olay yerinden eksik; araçta ele geçen örnek — 053-R).",
    motivation:
      "VoltUp anlaşmasının düşmesi ve 30.000 TL peşin iadesi; Madde 22 ile kanal hakları; hesapta -14.200 TL — Zeynep'in imza reddi Berk'i mali ve hukuki çıkmaza sokuyordu.",
    evidenceList: [
      "053-R: Saç DNA — Berk (%99,6)",
      "053-R: USB-C kablo — kan + Berk biyolojik izi",
      "053-S: OBS Ctrl+Shift+S",
      "053-T: Gölge 178–183 cm · Berk 181 cm",
      "053-Q: 00:47 giriş · 01:38 çıkış",
      "053-P: «Bu gece hallolacak»",
      "053-L: -14.200 TL bakiye · iade baskısı",
      "053-K: Madde 22 devir",
      "053-O: Korku notları · kol tutulması",
      "053-D2: Erkek sesi zamanlaması",
      "ZYN-MSG01: Melis'e son mesaj",
    ],
    conclusion:
      "Berk Savaş, Zeynep Korkut'u kendi dairesinde USB-C kablosuyla boğarak öldürdü. Yayını OBS kısayoluyla kapattı; ayna mesajı ve ayakkabı/kireç izi ile sahneyi yönlendirdi. Tutuklama: 12 Kasım 2024, Nişantaşı ikametgahı.",
    wrongAnswerMessage:
      "Tahminin yanlıştı. Bu vakada [SECILEN_ISIM] failin kendisi değildi — gerçek fail kayıtlardan silindi. Zeynep Korkut davasının izi kapandı.",
    solutionDocLabel: "053-Z2 · Resmi Çözüm Belgesi · 12.11.2024",
    solutionHtml: `<div class="verdict-stamp">CLASSIFIED</div>
<div class="doc-id" style="margin-bottom:12px">053-Z2 · Resmi Çözüm Belgesi · 12.11.2024</div>
<h3 style="font-family:var(--font-cormorant),serif;font-size:24px;margin:0 0 8px">Failin Kimliği:</h3>
<div class="verdict-name">Berk Savaş</div>
<h3>Olay Özeti</h3>
<p>00:47'de apartmana girer; Zeynep kapıyı açar. VoltUp ve <strong>Madde 22</strong> tartışması şiddetlenir; Berk masadaki <strong>USB-C kablosu</strong> ile arkadan boğar. Zeynep direnir (saç, savunma çiziği). <strong>Ctrl+Shift+S</strong> ile yayın kapatılır. <strong>01:38</strong>'de binadan çıkar.</p>
<h3>Psikolojik mesaj</h3>
<p><strong>SEN İSTEDİN</strong> — suçu mağdura yansıtma; stalker senaryosuna zemin.</p>
<h3>İki yalancı</h3>
<p><strong>Berk</strong> (katil): üç oturumda sistematik çelişki. <strong>Onur</strong> (takipçi): Kadıköy iddiası; GSM/IP yalanı — cinayet değil, takipçilik saklanıyor.</p>
<h3>Ana delil zinciri</h3>
<ol>
<li>053-R DNA + kablo</li>
<li>053-Q zamanlama</li>
<li>053-S OBS</li>
<li>053-T gölge boyu</li>
<li>053-L mali çıkmaz</li>
</ol>
<p style="background:rgba(107,22,32,0.12);padding:16px;border-left:3px solid var(--bordeaux);margin-top:24px"><strong>SONUÇ:</strong> Berk Savaş faildir. Ek soruşturma: Onur (takipçilik), Kaan (siber tehdit).</p>
<div class="doc-signature">
<div class="sig-line">Kıdemli Kriminal Analist · EGM</div>
<div class="sig-name">Onaylı</div>
</div>`,
  },
};
