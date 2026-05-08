import type { CaseData } from "@/lib/case-types";
import { case082MessageThreads } from "./082-message-threads";

export const case082: CaseData = {
  "id": "082",
  "codename": "Bagaj",
  "fullTitle": "Bagaj Dosyası",
  "status": "active",
  "difficulty": "Zor",
  "recommendedPlayers": "2–4 analist",
  "location": "İstanbul · Arnavutköy · İstanbul Havalimanı · IGA Kargo Terminali",
  "victim": "Hasan Aydın (42, erkek)",
  "date": "22 Şubat 2025 · Gece 02:45",
  "shortSummary": "İstanbul Havalimanı kargo terminalinde gece vardiyası. Küçük bir insan büyük bir sıra takıldı.",
  "enabledTabs": [
    "brief",
    "supheliler",
    "ifadeler",
    "adli-tip",
    "deliller",
    "belgeler",
    "teknik",
    "zaman-cizelgesi",
    "deduction",
    "cozum"
  ],
  "brief": {
    "subtitle": "IGA Kargo Terminali · Hat-4 · 22 Şubat 2025",
    "metaPairs": [
      {
        "label": "Vaka No",
        "value": "082"
      },
      {
        "label": "Dosya Tipi",
        "value": "Cinayet — Manuel Boğma — Yüksek Öncelik"
      },
      {
        "label": "Olay Tarihi",
        "value": "22 Şubat 2025 · Gece 02:45 — 03:15 (tahmini)"
      },
      {
        "label": "Konum",
        "value": "İstanbul · Arnavutköy · İstanbul Havalimanı · IGA Kargo Terminali · Hat-4"
      },
      {
        "label": "Kurban",
        "value": "Hasan Aydın (42, erkek)"
      }
    ],
    "sections": [
      {
        "title": "Olay",
        "body": "<p>22 Şubat 2025 sabahı 04:17'de, İstanbul Havalimanı IGA Kargo Terminali'nin Hat-4 konveyör bölümünde bir erkek cesedi bulundu. Cesedi bulan kişi aynı vardiyanın güvenlik görevlisi Sarp Yılmaz'dı — rutin tur atarken konveyörün alt bölümünde hareketsiz yatan Hasan Aydın'ı görmüştü.</p><p>İlk bakışta iş kazası izlenimi veren sahne, olay yeri inceleme ekibinin 04:50'de ulaşmasıyla değişti. Hasan Aydın'ın boğazında belirgin parmak izi izleri ve yüzünde yoğun petekiyal kanama tespit edildi. Kafasının yanında dökülen bir termos, konveyörün altında sıkışmış bir iş eldiveni ve zeminde kısmen silinen bir ayakkabı izi. <strong>Bu bir iş kazası değildi.</strong></p>"
      },
      {
        "title": "Mağdur Profili",
        "body": "<p>Hasan Aydın, IGA'da beş aydır bagaj görevlisi olarak çalışıyordu. Öncesinde <strong>18 yıl gümrük müşavirliği</strong> yapmış, 2 yıl önce şirketi iflas etmişti. Boşandı, on iki yaşındaki oğlu Eren annesinin yanına geçti. Son aylarda Eren'e düzenli para göndermeye başlamıştı — bagaj görevlisi maaşıyla bu meblağları karşılaması güç görünüyordu.</p><p>Olay gecesi Hasan, Hat-4'te <strong>yalnız</strong> çalışıyordu. Üç hafta önce yapılan vardiya değişikliğiyle bu bölüme tek başına atanmıştı; değişikliği imzalayan vardiya amiri Mehmet Erdal'dı. Gece 02:30 civarında, kargo bölgesine planlanmamış bir ziyaretle giren Volkan Şenel adlı kargo şoförü güvenlik kameralarına yansımıştı. Bu girişin hemen ardından, 02:50–02:55 arasında terminal kamera kayıtlarında <strong>5 dakikalık boşluk</strong> oluştu.</p>"
      },
      {
        "title": "Görev",
        "body": "<p>Bu dosyadaki <strong>22 belgeyi</strong> incele. Olay gecesi terminalde kim, neden yalnız bırakıldı? USB belleğindeki fotoğrafların anlamı nedir? Kamera kesintisini kim sağladı? Hasan'ın kaybolan telefonunu kim aldı?</p><p style=\"background:rgba(107,22,32,.1);padding:12px 16px;border-left:3px solid var(--bordeaux);\"><strong>UYARI:</strong> Sahne temiz değil — ama bilinçli kurgulanmış da değil. Fail panikle hareket etti ve iz bıraktı. <strong>En büyük hatası aldığı nesneydi.</strong></p>"
      }
    ],
    "signature": {
      "role": "Düzenleyen\nKriminal Soruşturma Birimi",
      "name": "Bşkomiser S. Özer"
    }
  },
  "suspects": [
    {
      "id": "suspect-01",
      "code": "SUSP-01 · HAV-BGJ/SK",
      "name": "Selim Karaoğlan",
      "role": "Bagaj görevlisi · vardiya arkadaşı · 38",
      "quote": "\"Hasan iyi bir adamdı. Ama bazı şeylere karışmaması gerekirdi — bunu kendisi de bilirdi.\""
    },
    {
      "id": "suspect-02",
      "code": "SUSP-02 · HAV-AMD/ME",
      "name": "Mehmet Erdal",
      "role": "Vardiya amiri · hat sorumlusu · 51",
      "quote": "\"Vardiya programı operasyonel ihtiyaca göre yapılır. Hasan Bey'i yalnız bırakmak yönetimsel bir kararıydı, başka bir şey aramayın.\""
    },
    {
      "id": "suspect-03",
      "code": "SUSP-03 · BRS-OEŞ/AA",
      "name": "Ayşe Aydın",
      "role": "Eski eş · velayet davası · 39",
      "quote": "\"Son zamanlarda para gönderiyordu. Ama bu beni rahatlatmıyordu — tersine, bir şeylerin yanlış gittiğini hissediyordum.\""
    },
    {
      "id": "suspect-04",
      "code": "SUSP-04 · HAV-LJK/VŞ",
      "name": "Volkan Şenel",
      "role": "Kargo şoförü · Güney Marmara Lojistik · 33",
      "quote": "\"Kâğıt almaya geldim. Terminale böyle gelirim, büyük mevzu değil.\""
    },
    {
      "id": "suspect-05",
      "code": "SUSP-05 · HAV-GVN/SY",
      "name": "Sarp Yılmaz",
      "role": "Havalimanı güvenlik · Hat-4 sorumlusu · 29",
      "quote": "\"Sistem güncellemesi otomatik çalışıyor bazen. 5 dakika boşluk büyük şey değil — benim elimde değil.\""
    },
    {
      "id": "suspect-06",
      "code": "SUSP-06 · SNK-TMS/CB",
      "name": "Cemal Bektaş",
      "role": "Sendika temsilcisi · Hasan'ın danıştığı kişi · 45",
      "quote": "\"Hasan geldi, birkaç şey sordu. İş güvenliği dedi. Ben de standart bilgileri verdim.\""
    }
  ],
  "testimonies": [
    {
      "id": "082-C",
      "suspectName": "Sarp Yılmaz",
      "headerDocId": "082-C · İstanbul Havalimanı Güvenlik Merkezi",
      "title": "İfade — Sarp Yılmaz (1. Oturum)",
      "date": "22.02.2025 · 07:15",
      "birth": "17.08.1995",
      "occupation": "IGA Havalimanı Güvenlik Görevlisi, Hat-4 Gece Vardiyası",
      "address": "Başakşehir, İstanbul",
      "session": 1,
      "paragraphs": [
        "Sarp Yılmaz, göreve devam ederken ilk ifadesini saat 07:15'te verdi. Genç, biraz gergin, kelimeleri ölçüp biçiyordu.",
        "**S:** Hasan Aydın'ı siz buldunuz. Anlat bakalım.\n**C:** Sabah 04:15 civarında, rutin tur atıyordum. Hat-4'ten geçerken konveyörün alt bölümünde bir şey gördüm — önce takılan bir mal sandım. Yaklaştım. Hasan Bey'di. Hareketsizdi. Hemen merkeze bağlandım.",
        "**S:** O saate kadar terminalde olağandışı bir şey fark ettiniz mi?\n**C:** *[düşünür]* Gece 02:30'da Volkan Şenel girdi. Girişleri onaylıyorum — biliyordum. Ama gece yarısı girişler çok nadir değil, şoförler bazen geri döner.",
        "**S:** 02:50 ile 02:55 arasındaki kamera kaydı eksik. Açıklar mısınız?\n**C:** Sistem güncellemesi. Otomatik işliyor — programlı bir yenileme.",
        "**S:** Tam o gece, tam o saatte.\n**C:** *[savunmacı]* Zamanlamasını ben seçmiyorum. Sistem belirliyor. IT bölümüne bakılabilir.",
        "**S:** Selim Karaoğlan'ı o gece gördünüz mü?\n**C:** Başlangıçta gördüm, Hat-7 bölümünde. Sonra görmesem de normaldi — herkes kendi hattında.",
        "**S:** Hat-4 tarafından o gece ses duydunuz mu?\n**C:** Terminal büyük. Konveyörler çalışıyor, metal sesler var. Ama... *[duraksama]* 03:00 civarında sert bir ses duydum. Bir şey düşer gibi. Dikkat etmedim — iş kazası çok olur.",
        "<p style=\"background:rgba(107,22,32,0.1);padding:12px;border-left:3px solid var(--bordeaux)\"><strong>Kritik:</strong> Sarp Yılmaz 03:00 civarında 'sert düşme sesi' duyduğunu belirtti — cinayet saat aralığıyla örtüşüyor. IT logu: kamera kesintisi Sarp'ın ofis kartı erişimiyle aynı dakikada. Bkz. 082-M.</p>"
      ],
      "signature": "S. Yılmaz"
    },
    {
      "id": "082-D",
      "suspectName": "Selim Karaoğlan",
      "headerDocId": "082-D · İstanbul Havalimanı Güvenlik Merkezi",
      "title": "İfade — Selim Karaoğlan (1. Oturum)",
      "date": "22.02.2025 · 09:30",
      "birth": "14.07.1986",
      "occupation": "IGA Kargo Terminali Bagaj Görevlisi",
      "address": "Esenyurt, İstanbul",
      "session": 1,
      "paragraphs": [
        "Selim Karaoğlan avukatsız ifade vermeyi kabul etti. Oturuma girdiğinde sakin görünüyordu, ellerini masaya düzgünce koymuştu.",
        "**S:** O gece vardiyada mıydınız?\n**C:** Evet. 22:00 başlayıp sabah 06:00'a kadardı. Standart rotasyonum.",
        "**S:** Hasan Aydın ile o gece görüştünüz mü?\n**C:** Başlangıçta gördüm. Vardiya başında kısa bir selamlama. Herkes kendi hattına dağıldı. Hat-4 onundu, benim bölümüm Hat-7.",
        "**S:** Gece boyunca Hat-4'e gittiniz mi?\n**C:** Hayır. Neden gideyim? İşim kendi hattımda.",
        "**S:** Hasan ile ilişkiniz nasıldı?\n**C:** *[duraksama]* Normal bir iş arkadaşlığı. Fazla yakın değildik. Kimseyle yakın biri değildi zaten — sessiz, kendi işine bakardı.",
        "**S:** Hasan'ı sektörden önceden tanıyor muydunuz?\n**C:** Gümrük sektörü küçüktür, tanıyordum. Ama burada tesadüfen bir araya geldik — ikimiz de iş değiştirdik, ikimiz de IGA'ya başvurduk.",
        "**S:** Son haftalarda Hasan'da farklı bir davranış fark ettiniz mi?\n**C:** Telefona fazla bakıyordu. Ama bu beni ilgilendirmezdi. Herkesin derdi olur.",
        "**S:** Volkan Şenel'i tanıyor musunuz?\n**C:** Kargo şoförü, evet. Terminal içinde zaman zaman görürüm. Yüzeysel bir tanışıklık.",
        "**S:** Bu gece telefonunuzu kaybettiniz?\n**C:** Vardiya biterken fark ettim. Soyunma odasına baktım, yoktu. Düşürmüş olabilirim."
      ],
      "signature": "S. Karaoğlan"
    },
    {
      "id": "082-D2",
      "suspectName": "Selim Karaoğlan",
      "headerDocId": "082-D2 · İstanbul Havalimanı Güvenlik Merkezi",
      "title": "İfade — Selim Karaoğlan (2. Oturum)",
      "date": "25.02.2025 · 14:00",
      "birth": "—",
      "occupation": "—",
      "address": "—",
      "session": 2,
      "metaRows": [
        {
          "label": "Tarih",
          "value": "25.02.2025 · 14:00"
        },
        {
          "label": "Not",
          "value": "Hat-4 kargo masasında parmak izi tespit edilmesinin ardından. Avukat hazır."
        }
      ],
      "paragraphs": [
        "**S:** Hat-4 kargo masasında parmak iziniz çıktı. Orada olmadığınızı söylemiştiniz.\n**C:** *[duraksama]* O masaya bazen gidiyorum. İş kapsamında — bir şey almak, bırakmak.",
        "**S:** Hat-4 sizin bölümünüz değil. Ne almaya gidiyordunuz?\n**C:** Termos bırakıyorum bazen. Veya form. Net söylemem zor.",
        "**S:** Eldivenlerinizi neden çıkardınız?\n**C:** *[uzun sessizlik]* Bazen çıkarırım. Eller yoruluyor.",
        "**S:** Hasan Aydın size son haftalarda para teklifinde bulundu mu?\n**C:** *[avukatla fısıldaşma]* Bu soruya cevap vermek istemiyorum.",
        "**S:** Volkan Şenel ile ne tür bir koordinasyonunuz var?\n**C:** *[avukat araya girer]* Müvekkilim bu soruya cevap vermeyecek.",
        "<p style=\"background:rgba(107,22,32,0.1);padding:12px;border-left:3px solid var(--bordeaux)\"><strong>Kritik:</strong> 'Bazen gidiyorum' açıklaması saatlerle örtüşmüyor — masayı olay gecesi temizlemişlerdi, iz bu netlikte ancak taze baskıda çıkar. DNA sonucu bekleniyor.</p>"
      ],
      "signatureRole": "İfade Sahibi · Avukat huzurunda",
      "signature": "S. Karaoğlan"
    },
    {
      "id": "082-D3",
      "suspectName": "Selim Karaoğlan",
      "headerDocId": "082-D3 · İstanbul Havalimanı Güvenlik Merkezi",
      "title": "İfade — Selim Karaoğlan (3. Oturum)",
      "date": "28.02.2025 · 10:00",
      "birth": "—",
      "occupation": "—",
      "address": "—",
      "session": 3,
      "metaRows": [
        {
          "label": "Tarih",
          "value": "28.02.2025 · 10:00"
        },
        {
          "label": "Not",
          "value": "DNA eşleşmesi raporu + Hasan Aydın'a ait telefonun Selim'in çantasında bulunmasının ardından."
        }
      ],
      "paragraphs": [
        "**S:** Hasan Aydın'ın telefonu kiracı çantanızda bulundu. Açıklamanız?\n**C:** *[uzun sessizlik]* ...Buldum. Düşmüştü.",
        "**S:** Nerede buldunuz?\n**C:** Hat-4 civarında. Topladım. İade etmeyi düşündüm.",
        "**S:** Neden o anda bildirmediniz?\n**C:** *[sinirli]* Unuttum. Stresliydim.",
        "**S:** Telefonun metadata'sı 02:58'de el konulduğunu gösteriyor. DNA raporumuz geldi — konveyör kenarındaki saç teli sizinle eşleşiyor.\n**C:** *[uzun sessizlik]*",
        "**S:** Selim Bey, o gece Hat-4'te ne oldu?\n**C:** *[avukatla fısıldaşma]* ...Ben... oradaydım.",
        "**S:** Devam edin.\n**C:** *[düşük sesle]* Hasan beni üç haftadır sıkıştırıyordu. Para istedi. 'Seni ihbar ederim' dedi. Ben de... bir şey oldu. Tartışma büyüdü.",
        "**S:** Hasan Aydın'ı siz mi öldürdünüz?\n**C:** *[avukat araya girer]* Müvekkilim bu soruyu cevaplamayacak. Haklarını kullanıyor.",
        "<p style=\"background:rgba(107,22,32,0.1);padding:12px;border-left:3px solid var(--bordeaux)\"><strong>Kritik:</strong> 'Oradaydım' ve 'tartışma büyüdü' ifadelerini kullandı. Tam itiraf yok ama olay yeri varlığı artık inkâr edilmiyor. Tutuklama kararı talep edildi.</p>"
      ],
      "signatureRole": "İfade Sahibi · Avukat huzurunda",
      "signature": "S. Karaoğlan"
    },
    {
      "id": "082-E",
      "suspectName": "Mehmet Erdal",
      "headerDocId": "082-E · İstanbul Havalimanı Güvenlik Merkezi",
      "title": "İfade — Mehmet Erdal (1. Oturum)",
      "date": "22.02.2025 · 10:45",
      "birth": "03.03.1973",
      "occupation": "IGA Kargo Terminali Vardiya Amiri, Hat Sorumlusu",
      "address": "Güneşli, İstanbul",
      "session": 1,
      "paragraphs": [
        "Mehmet Erdal ilk ifadesini bürokratik bir tavırla girdi. Sorulara hazırlıklı, cevapları kısa ve mesafeliydi.",
        "**S:** Hasan Aydın'ı o gece Hat-4'e yalnız koydunuz. Neden?\n**C:** Operasyonel karar. O gece başka bir vardiyada eksiklik vardı, yeniden düzenleme yaptık. Hasan o hattı bilir — beş aydır orada.",
        "**S:** Hasan daha önce size şikâyette bulundu mu?\n**C:** Hayır. Sessiz bir çalışandı, gelmezdi.",
        "**S:** Volkan Şenel'i tanıyor musunuz?\n**C:** Terminal içinde tanınır biridir. Güney Marmara Lojistik şoförü. Belgeleri düzgün, sorunsuz bir tedarikçi.",
        "**S:** O gece 02:30'da terminale girmesi sizi şaşırttı mı?\n**C:** Bana bildirilmedi. Terminal girişleri güvenliğin sorumluluğunda.",
        "**S:** Hasan'ın son aylarda bagajlara fazla ilgi gösterdiği söylendi. Kim söyledi?\n**C:** *[avukatla fısıldaşma]* Bir çalışanım. İsim vermek zorunda değilim."
      ],
      "signature": "M. Erdal"
    },
    {
      "id": "082-E2",
      "suspectName": "Mehmet Erdal",
      "headerDocId": "082-E2 · İstanbul Havalimanı Güvenlik Merkezi",
      "title": "İfade — Mehmet Erdal (2. Oturum)",
      "date": "26.02.2025 · 11:00",
      "birth": "—",
      "occupation": "—",
      "address": "—",
      "session": 2,
      "metaRows": [
        {
          "label": "Tarih",
          "value": "26.02.2025 · 11:00"
        },
        {
          "label": "Not",
          "value": "Vardiya değişikliğini sözlü talimatla yaptığına dair çalışan tanıklığı ibraz edildi."
        }
      ],
      "paragraphs": [
        "**S:** Bir çalışanınız, Hat-4 vardiya değişikliğini sözlü talimat üzerine yaptığınızı söylüyor. Doğru mu?\n**C:** *[duraksama]* Rutin iletişim. Operasyonel direktifler bazen sözlü olur.",
        "**S:** Bu direktif kimden geldi?\n**C:** *[avukatla fısıldaşma]* ...Bir üstümden.",
        "**S:** İsim?\n**C:** Kesin hatırlamıyorum. Çok şey oluyor bu terminalde.",
        "**S:** Bu değişikliğin amacı Hasan Aydın'ı Hat-4'te yalnız bırakmak mıydı?\n**C:** *[sinirli]* Bu suçlama yanlış. Ben ne olacağını bilmiyordum.",
        "**S:** 'Ne olacağını' bilmek için önce 'bir şey olacağını' bilmeniz gerekir.\n**C:** *[uzun sessizlik]*",
        "**S:** Selim Karaoğlan ile son bir ayda özel görüşme yaptınız mı?\n**C:** *[avukat araya girer]* Müvekkilim bu soruya cevap vermeyecek.",
        "<p style=\"background:rgba(107,22,32,0.1);padding:12px;border-left:3px solid var(--bordeaux)\"><strong>Kritik:</strong> Direktifin kaynağını 'hatırlamıyorum' diye geçiştirdi. İki çalışan, vardiya değişikliğinin Selim ile uzun soyunma odası görüşmesinin hemen ardından yapıldığını doğruladı.</p>"
      ],
      "signatureRole": "İfade Sahibi · Avukat huzurunda",
      "signature": "M. Erdal"
    },
    {
      "id": "082-F",
      "suspectName": "Ayşe Aydın",
      "headerDocId": "082-F · İstanbul Emniyet Müdürlüğü",
      "title": "İfade — Ayşe Aydın (1. Oturum)",
      "date": "23.02.2025 · 14:00",
      "birth": "22.11.1985",
      "occupation": "İlkokul Öğretmeni, Bursa Nilüfer İlçesi",
      "address": "Nilüfer, Bursa",
      "session": 1,
      "paragraphs": [
        "Ayşe Aydın Bursa'dan İstanbul'a döner dönmez ifade verdi. Gözleri kırmızıydı ama sakin konuştu.",
        "**S:** Olay gecesi neredeydiniz?\n**C:** Bursa'da, kız kardeşim Feyza'nın evinde. Birkaç gündür oradaydım. Düşünmem gereken şeyler vardı.",
        "**S:** Hasan ile son ne zaman konuştunuz?\n**C:** On iki, belki on üç gün önce. Eren için aramıştı. Hasan Eren ile konuştu, sonra kapattı. Benimle konuşmak istemiyordu artık.",
        "**S:** Hasan'ın son aylarda para göndermesi hakkında ne düşünüyordunuz?\n**C:** *[duraksama]* İlk ay gönderdiğinde şaşırdım. Bagaj görevlisi maaşından bu kadar gönderemez diye düşündüm. Sordum, 'geçici iş yapıyorum' dedi. İnanmadım ama üstüne gitmedim.",
        "**S:** Neden gitmediniz?\n**C:** Çünkü sormak o paraları geri almak anlamına gelebilirdi. Eren'in ihtiyacı vardı.",
        "**S:** Velayet davasının Hasan'ın ölümüyle avantajınıza sonuçlanacağını düşündünüz mü?\n**C:** *[ağlama]* Bu soruyu sormak zorunda mısınız? Hasan çocuğumun babasıydı. Eren on iki yaşında ve artık babası yok.",
        "**S:** Son aylarda Hasan sizi endişelendiren bir şey söyledi mi?\n**C:** 'Bir şeyler değişecek' dedi. 'Eren her şeyi alacak' dedi. Ne demek istediğini bilmiyordum."
      ],
      "signature": "A. Aydın"
    },
    {
      "id": "082-G",
      "suspectName": "Volkan Şenel",
      "headerDocId": "082-G · İstanbul Havalimanı Güvenlik Merkezi",
      "title": "İfade — Volkan Şenel (1. Oturum)",
      "date": "22.02.2025 · 11:30",
      "birth": "09.05.1991",
      "occupation": "Güney Marmara Lojistik A.Ş., Kargo Şoförü",
      "address": "Bayrampaşa, İstanbul",
      "session": 1,
      "paragraphs": [
        "Volkan Şenel ilk ifadesini vermeye geldiğinde ayağa kalkmadan merhaba dedi. Kısa cevaplar, göz temasından kaçınma.",
        "**S:** O gece terminale neden geldiniz?\n**C:** Kâğıt almaya. Teslimat belgesi. Bazen unutursunuz, geri dönersiniz.",
        "**S:** Saat 02:30. Hangi teslimatın belgesi?\n**C:** Bir önceki. Eksik kalmıştı.",
        "**S:** Eksik belge için gece 02:30'da terminale mi döndünüz?\n**C:** *[sinirli]* Evet. Sabah gelseydim üstlerim sorardı.",
        "**S:** O gece terminalde kimi gördünüz?\n**C:** Güvenlikte Sarp Bey vardı girişte. Başka kimseyi görmedim.",
        "**S:** Hasan Aydın'ı gördünüz mü?\n**C:** Hayır.",
        "**S:** Selim Karaoğlan ile ilişkiniz ne düzeyde?\n**C:** *[duraksama]* Terminal tanışıklığı. Zaman zaman görürüm.",
        "**S:** Ona son bir ayda mesaj attınız mı?\n**C:** *[duraksama]* Olabilir. İş koordinasyonu.",
        "<p style=\"background:rgba(107,22,32,0.1);padding:12px;border-left:3px solid var(--bordeaux)\"><strong>Kritik:</strong> Güney Marmara Lojistik kayıtlarında 22 Şubat'a ait tamamlanmamış teslimat bulunmadı. Son 30 günde 3 plansız gece girişi — hepsi 02:00–04:00 arası. Bkz. 082-L.</p>"
      ],
      "signature": "V. Şenel"
    },
    {
      "id": "082-G2",
      "suspectName": "Volkan Şenel",
      "headerDocId": "082-G2 · İstanbul Havalimanı Güvenlik Merkezi",
      "title": "İfade — Volkan Şenel (2. Oturum)",
      "date": "26.02.2025 · 15:30",
      "birth": "—",
      "occupation": "—",
      "address": "—",
      "session": 2,
      "metaRows": [
        {
          "label": "Tarih",
          "value": "26.02.2025 · 15:30"
        },
        {
          "label": "Not",
          "value": "Volkan'ın telefonunda '01:47 · o saatlendi mi?' mesajının tespit edilmesinin ardından. Avukat hazır."
        }
      ],
      "paragraphs": [
        "**S:** Selim Karaoğlan'a 22 Şubat saat 01:47'de 'o saatlendi mi?' mesajı attınız. Ne anlama geliyor?\n**C:** *[avukatla fısıldaşma]* ...Cevap vermek istemiyorum.",
        "**S:** Bu mesaj, Hasan Aydın'ın Hat-4'te yalnız olup olmayacağına dair koordinasyon muydu?\n**C:** *[sessizlik]*",
        "**S:** Volkan Bey, cinayeti planlamadıysanız bile suç ortaklığına zemin hazırladınız. Bunu konuşmak sizin lehinize olur.\n**C:** *[uzun sessizlik]* ...Ben kimseyi öldürmedim. Yemin ederim.",
        "**S:** Bunu kabul ediyoruz. Ama Selim ile ne koordinasyonu yapıyordunuz?\n**C:** *[titrek sesle]* ...Bir sevkiyat vardı. Birkaç aydır yapıyorduk. Hasan bir şeyler fark etmişti. Ben sadece 'zaman ayarı tamam mı' diye sordum. Selim'in ne yapacağını bilmiyordum. Yemin ederim.",
        "**S:** 'Sevkiyat' derken?\n**C:** *[avukat araya girer]* Müvekkilim bu soruya cevap vermeyecek. Ama şunu kaydettirin: Volkan Şenel'in cinayetten önceden haberi yoktu.",
        "<p style=\"background:rgba(107,22,32,0.1);padding:12px;border-left:3px solid var(--bordeaux)\"><strong>Kritik:</strong> Uyuşturucu sevkiyatını dolaylı olarak kabul etti. Cinayetten haberdar olmadığını iddia ediyor. '01:47 mesajı + 02:31 terminal girişi' kombinasyonu Selim'e zaman penceresi açıldığını teyit ediyor.</p>"
      ],
      "signatureRole": "İfade Sahibi · Avukat huzurunda",
      "signature": "V. Şenel"
    },
    {
      "id": "082-H",
      "suspectName": "Cemal Bektaş",
      "headerDocId": "082-H · IGA İşçi Sendikası",
      "title": "İfade — Cemal Bektaş (1. Oturum)",
      "date": "23.02.2025 · 16:30",
      "birth": "28.02.1979",
      "occupation": "IGA İşçi Sendikası Temsilcisi",
      "address": "Küçükçekmece, İstanbul",
      "session": 1,
      "paragraphs": [
        "Cemal Bektaş sendika ofisinde ifade verdi. Kelimeleri tartarak konuştu — temsilci refleksi.",
        "**S:** Hasan Aydın sizi ziyaret etti. Kaç kez ve ne konuştunuz?\n**C:** İki kez. 10 Şubat ve 18 Şubat. Her ikisinde de ofisimde görüştük.",
        "**S:** Ne konuştuğunuzu anlatır mısınız?\n**C:** İş güvenliği. Gece vardiyasında yalnız çalışma, iş kazası sorumluluğu. Standart sorular.",
        "**S:** Not defterinizde 'ihbar prosedürü' ve 'tanık koruma' notları var. Hasan bunları mı sordu?\n**C:** *[uzun sessizlik]* Ben... herkes farklı şeyler soruyor. Bazen iş güvenliği sorusu başka şeylerle iç içe geçiyor.",
        "**S:** Hasan size bir suçu ihbar etmek istediğini söyledi mi?\n**C:** Kesin bir şey söylemedi. 'Eğer biri bir şey fark ederse devlet koruyor mu?' diye sordu. Bu genel bir soru.",
        "**S:** Bu soruyu duyunca ne hissettiniz?\n**C:** Endişelendim. Ama ne yapacağımı bilemedim — net bir şey söylemedi. Bir sonraki ziyaretini bekliyordum.",
        "**S:** Bir sonraki ziyaret olmadı.\n**C:** *[sessizlik]* Hayır. Olmadı.",
        "<p style=\"background:rgba(107,22,32,0.1);padding:12px;border-left:3px solid var(--bordeaux)\"><strong>Kritik:</strong> Not defterinde 18 Şubat kaydı: 'H.A. — sevk. / ihbar / kim koruyor?' Hasan'ın asıl sorusunun ne olduğu netleşiyor. Bkz. 082-N.</p>"
      ],
      "signature": "C. Bektaş"
    }
  ],
  "forensics": [
    {
      "id": "082-A",
      "docId": "082-A · Olay Yeri İnceleme",
      "title": "Olay Yeri Raporu",
      "meta": [
        {
          "label": "Olay Tarihi",
          "value": "22.02.2025"
        },
        {
          "label": "İnceleme Başlangıcı",
          "value": "04:50"
        },
        {
          "label": "Hazırlayan",
          "value": "Bşçvş. Sibel Çakır · İstanbul EMÜ, Olay Yeri İnceleme"
        }
      ],
      "body": "<h3>Bulgular</h3><ol><li>Olay yeri: Hat-4 konveyör bandı iç bölümü, yaklaşık 47. metre noktası. Alan terminal ana koridorundan görünmez — <strong>kör nokta</strong>.</li><li>Kurban konumu: yüzüstü, sol yanı konveyör alt çerçevesine yaslı, başı bant kenarına 20 cm yakın.</li><li>Termos: kurbanın kafasından 1.5 m kuzeybatıda devrilmiş. İçindeki sıcak sıvı 1.8 m² alana dağılmış. Damla izi 'ani düşme' ile uyumlu.</li><li>Sağ iş eldiveni: zeminde, termos ile kurban arasında. Kısmen ıslanmış (termos döküntüsüyle). Kurbanın sağ eline ait.</li><li>Sol iş eldiveni (sarı, IGA standardı): konveyör alt bölümünde, 12 cm içeride, sıkışmış. Kurbanın değil — boyut ve kirlilik paterni farklı. DNA için ayrıldı.</li><li>Kısmen silinmiş ayakkabı izi: zemin epoksi kaplama, konveyör solunda. Kauçuk taban, yaklaşık 42-43 numara, sağ ayak. Eliptik silinme.</li><li>Kargo masası: kuzeybatı köşesinde silinme izi. Parsiyel parmak izi çıkarıldı.</li><li>Hat-4 iç kamera son kayıt: 02:47 — Hasan kargo masasına yürüyor. 02:50–02:55 arası kayıt yok.</li><li>Mobil telefon: kurbanın kişisel eşyaları arasında yok.</li><li>USB belleği: iş dolabının arka rafında, termal ceketin altında — kasıtlı olarak örtülmüş izlenimi.</li><li>Kargo kapısı log: 02:49'da içeriden açıldı, 02:53'te kapandı. Kodu kullanan tanımlanamadı.</li></ol><p style=\"background:rgba(107,22,32,.1);padding:12px;border-left:3px solid var(--bordeaux);\"><strong>Ön Not:</strong> Olay yeri bilinçli bir cinayet sahnesini yansıtmıyor. Ancak bazı delil silme girişimleri var: ayakkabı izi, yüzey silinmesi, mobil telefon yokluğu. Fail panikle hareket etmiş, sistematik değil.</p>",
      "signature": {
        "role": "Olay Yeri İnceleme",
        "name": "Bşçvş. S. Çakır"
      }
    },
    {
      "id": "082-B",
      "docId": "082-B · İstanbul Adli Tıp Kurumu",
      "title": "Otopsi Raporu",
      "meta": [
        {
          "label": "Olay Tarihi",
          "value": "22.02.2025"
        },
        {
          "label": "Rapor Tarihi",
          "value": "24.02.2025"
        },
        {
          "label": "Hazırlayan",
          "value": "Uzm. Dr. Gülsüm Topal · İstanbul Adli Tıp Kurumu, Morfoloji Birimi"
        }
      ],
      "body": "<h3>Dış Muayene</h3><ul><li>Boyun: bilateral boyun ön-yan bölgede belirgin kontüzyon — beş parmak genişliğini çağrıştıran düzensiz oval basınç izleri, sol taraf daha derin.</li><li>Yüz: sklera ve alt kapak konjonktivalarında yoğun peteşiyal kanama. Siyanoz ve yüzeyel kapiler rüptür izleri.</li><li>Baş: sol temporal bölgede yaklaşık 4 cm çaplı epikranyal hematom. Saç kökü hasarı — 3-4 tel travmatik koparılma izleriyle.</li><li>Eller: sağ elde tırnak kırığı ve kırkılma (3. ve 4. parmak, savunma mücadelesi). Sol ön kolda lineer ekimoz (10 cm, tutunma izi).</li><li>Gövde: ön yüzde terminal zeminden düşmeye bağlı yüzeyel abrazyon. Başka darp izi yok.</li></ul><h3>İç Muayene</h3><ul><li>Hiyoid kemik: corpus'ta <strong>tam kırık</strong> — yüksek kuvvetli manuel boğmaya özgü.</li><li>Tiroid kıkırdak: sağ lamina'da inkomplet kırık çizgisi.</li><li>Beyin: serebral konjesyon, asfiksi ile uyumlu beyin ödemi.</li><li>Akciğerler: bilateral peteşiyal kanama, subplevral hemoraji odakları.</li><li>Toksikoloji: alkol 0,00 g/L. Opioid, benzodiazepine, uyarıcı — <strong>negatif</strong>.</li></ul><h3>Ölüm Sebebi</h3><p><strong>Bilateral boyun kompresyonu (manuel boğma) sonucu mekanik asfiksi.</strong> Yardımcı etken: hiyoid kırığı kaynaklı trakeal kapanma.</p><h3>Ölüm Zamanı &amp; Kritik Bulgular</h3><p>Tahmini ölüm: <strong>02:45 — 03:15</strong> (rigor mortis ve livor mortis verilerine göre).</p><p style=\"background:rgba(107,22,32,.15);padding:14px 18px;border:1px solid var(--bordeaux);\">1. Bilateral basınç izleri büyük elin kuvvetli kavramasıyla uyumlu.<br>2. Sağ elde savunma tırnak izi: Hasan mücadele etti.<br>3. Hiyoid kırığı: sürdürülmüş baskı, kısa süreli değil — 3-5 dakika.<br>4. Sol temporal hematom + saç kökü hasarı: boğuşmada kafasını konveyöre çarptı.<br>5. Toksikoloji negatif: baygınlaştırılmadı, direndi.</p>",
      "signature": {
        "role": "Uzm. Dr.",
        "name": "G. Topal"
      }
    }
  ],
  "evidence": [
    {
      "id": "HAS-DNA01",
      "tag": "DNA",
      "title": "Saç Teli — Sol Temporal Bölge",
      "description": "Hasan Aydın'ın sol temporal bölgesindeki hematom yakınında, konveyör metal çerçevesinde bulunan 3 saç teli. Kökten koparılmış.",
      "details": [
        {
          "label": "Buluntu yeri",
          "value": "Hat-4 konveyör metal yan çerçevesi, zemine 85 cm yükseklikte"
        },
        {
          "label": "Tel sayısı",
          "value": "3, tamamı kökten koparılmış (folikül materyali mevcut)"
        },
        {
          "label": "DNA analizi",
          "value": "Hasan Aydın profiliyle eşleşme YOK — başka kişiye ait"
        },
        {
          "label": "Referans karşılaştırma",
          "value": "Selim Karaoğlan (28.02.2025) — TAM EŞLEŞME"
        },
        {
          "label": "Yorum",
          "value": "Selim boğuşmada kafasını konveyöre çarptı ya da kurban mücadelede saçından tuttu"
        }
      ]
    },
    {
      "id": "HAS-PRK01",
      "tag": "Parmak İzi",
      "title": "Parmak İzi — Kargo Masası Kuzeybatı Köşesi",
      "description": "Hat-4 kargo masasının kuzeybatı köşesinde parsiyel parmak izi. Yüzey kısmen silinmiş, iz bölgesel olarak korunmuş.",
      "details": [
        {
          "label": "Buluntu yeri",
          "value": "Polipropilen kargo masası yüzeyi, kuzeybatı köşesi"
        },
        {
          "label": "İz kalitesi",
          "value": "Parsiyel (%62 eşleşme noktası) — yeterli tanımlama için"
        },
        {
          "label": "Parmak",
          "value": "Sağ el işaret parmağı"
        },
        {
          "label": "Referans karşılaştırma",
          "value": "Selim Karaoğlan — POZİTİF EŞLEŞME"
        },
        {
          "label": "Yorum",
          "value": "El eldivensiz bırakılmış. İz tazeliği olay gecesine işaret ediyor — yüzey saatler önce temizlenmişti"
        }
      ]
    },
    {
      "id": "HAS-USB01",
      "tag": "Dijital",
      "title": "USB Belleği — Hasan Aydın'ın İş Dolabı",
      "description": "Hasan Aydın'ın iş dolabının arka rafında, termal ceketin altında bulunan USB belleği. 18 kargo bagajı fotoğrafı içeriyor.",
      "details": [
        {
          "label": "Buluntu yeri",
          "value": "İş dolabı arka rafı, termal ceketle örtülü"
        },
        {
          "label": "İçerik",
          "value": "18 fotoğraf — şüpheli kargo bagajı, farklı açılardan"
        },
        {
          "label": "Metadata",
          "value": "Çekim tarihi: 03.02.2025, saat 02:11–02:23"
        },
        {
          "label": "Cihaz",
          "value": "iPhone kamera meta verisi (gizli çekim, flaş kapalı)"
        },
        {
          "label": "Yorum",
          "value": "Hasan sevkiyatı 3 hafta önce belgeledi. Bu bilgiyle ne yapacağını planladığı bilinmiyor"
        }
      ]
    },
    {
      "id": "HAS-TEL01",
      "tag": "Telefon",
      "title": "Hasan Aydın'ın Cep Telefonu — Selim'in Çantasında",
      "description": "Hasan Aydın'a kayıtlı iPhone 13. Olay yeri yerine Selim Karaoğlan'ın kiracı çantasında bulundu.",
      "details": [
        {
          "label": "Buluntu yeri",
          "value": "Selim Karaoğlan ikametgahı — yatak odası dolap üstündeki kiracı çantası"
        },
        {
          "label": "Cihaz",
          "value": "iPhone 13, siyah, Hasan Aydın adına kayıtlı SIM"
        },
        {
          "label": "Metadata kritik",
          "value": "iOS son konum kilidi — 02:58. Selim'in 02:58'de Hat-4'te olduğunu belgeler"
        },
        {
          "label": "İçerik",
          "value": "WhatsApp geçmişi, arama kayıtları, USB çekimlerinin orijinalleri"
        },
        {
          "label": "Yorum",
          "value": "Selim'in 'kaybettim' iddiası çöküyor. Telefon kasıtlı olarak saklanmış"
        }
      ]
    },
    {
      "id": "HAS-ELD01",
      "tag": "Fiziksel",
      "title": "Sarı İş Eldiveni — Konveyör Altı",
      "description": "Hat-4 konveyörün alt bölümünde, 12 cm içeride sıkışmış sarı IGA standardı iş eldiveni. Kurbanın değil.",
      "details": [
        {
          "label": "Buluntu yeri",
          "value": "Hat-4 konveyör alt bölümü, 12 cm içeride sıkışmış"
        },
        {
          "label": "Tip",
          "value": "Sarı, IGA standart iş eldiveni, sol el, L beden"
        },
        {
          "label": "Karşılaştırma",
          "value": "Hasan Aydın M beden giyer — eşleşme yok"
        },
        {
          "label": "DNA analizi",
          "value": "İç yüzeyde ter izi — Selim Karaoğlan DNA eşleşmesi"
        },
        {
          "label": "Yorum",
          "value": "Selim boğuşmada sol eldivenini düşürdü, konveyör altına sıkıştı, fark etmedi"
        }
      ]
    },
    {
      "id": "HAS-TRM01",
      "tag": "Sahne",
      "title": "Devrilmiş Termos",
      "description": "Kurbanın kafasından 1.5 m kuzeybatıda devrilmiş termos. Damla izi düşme vektörünü gösteriyor.",
      "details": [
        {
          "label": "Eşya",
          "value": "1 litrelik çelik termos, kişisel eşya"
        },
        {
          "label": "Dökülen sıvı",
          "value": "Yaklaşık 350 ml, 1.8 m² alana dağılmış"
        },
        {
          "label": "Damla vektörü",
          "value": "'Ani düşme' ile uyumlu — kurban ayaktayken bıraktı"
        },
        {
          "label": "Parmak izi",
          "value": "Hasan Aydın (gövde), başka iz yok"
        }
      ]
    },
    {
      "id": "HAS-AYK01",
      "tag": "İz",
      "title": "Kısmen Silinmiş Ayakkabı İzi",
      "description": "Konveyör sol tarafı zeminde kısmen silinmiş kauçuk taban izi. Sağ ayak, 42-43 numara.",
      "details": [
        {
          "label": "Taban deseni",
          "value": "Kauçuk, zigzag deseni (iş ayakkabısı — Hasan'ın iş ayakkabısından farklı desen)"
        },
        {
          "label": "Numara tahmini",
          "value": "42-43"
        },
        {
          "label": "Silinme",
          "value": "Eliptik sürtünme — bilinçli silme girişimi"
        },
        {
          "label": "Karşılaştırma",
          "value": "Selim Karaoğlan 43 numara iş ayakkabısı giyiyor (ikametgah aramasında tespit edildi)"
        }
      ]
    },
    {
      "id": "HAS-KAP01",
      "tag": "Dijital",
      "title": "Hat-4 İç Kamera — 02:47 Son Kare",
      "description": "Hat-4 iç kamerasının son kaydı 02:47. 02:50–02:55 arası kayıt yok.",
      "details": [
        {
          "label": "Son kare",
          "value": "22.02.2025 saat 02:47:32 — Hasan kargo masasına yaklaşıyor"
        },
        {
          "label": "Kayıp süre",
          "value": "7 dakika 35 saniye (02:47:33 – 02:55:06)"
        },
        {
          "label": "IT logu",
          "value": "02:49:58'de güvenlik ofisi IP'sinden manuel güncelleme — diğer 14 kamera etkilenmedi"
        },
        {
          "label": "Kapı logu",
          "value": "02:49'da Hat-4 kapısı içeriden açıldı — kamera kesimiyle 2 dakika örtüşüyor"
        }
      ]
    }
  ],
  "documents": [
    {
      "id": "082-I",
      "docId": "082-I · IGA Kargo Terminali",
      "title": "Vardiya Takvimi Değişiklik Belgesi",
      "meta": [
        {
          "label": "Belge No",
          "value": "VRD-2025-0203-14"
        },
        {
          "label": "Tarih",
          "value": "03.02.2025"
        },
        {
          "label": "İmzalayan",
          "value": "Vardiya Amiri Mehmet Erdal"
        }
      ],
      "body": "<p><strong>KONU:</strong> Hat-4 Gece Vardiyası Revizyon</p><p>Operasyonel gereklilik kapsamında, 22 Şubat 2025 tarihli gece vardiyasında Hat-4 bölüm sorumluluğu <strong>Hasan Aydın</strong>'a (Sicil: IGA-2024-0847) verilmiştir. Hat-4 ve Hat-5 çapraz rotasyonu bu tarih itibarıyla sonlandırılmıştır.</p><p>Gerekçe: Hat-7 ekibi artırımı nedeniyle Hat-4 tek operatöre düşürülmüştür.</p><p style=\"background:rgba(107,22,32,.1);padding:12px;border-left:3px solid var(--bordeaux);\"><strong>Kriminal Not:</strong> Bu değişiklik, 03 Şubat'taki soyunma odası görüşmesinin hemen ardından yapılmış. İki çalışan bu görüşmeyi doğruladı — Mehmet Erdal ile Selim Karaoğlan. Direktif kaynağı henüz açıklanmadı.</p>",
      "signature": {
        "role": "Vardiya Amiri",
        "name": "M. Erdal"
      }
    },
    {
      "id": "082-J",
      "docId": "082-J · Ziraat Bankası",
      "title": "Hasan Aydın — Banka Transfer Kayıtları",
      "meta": [
        {
          "label": "Hesap Sahibi",
          "value": "Hasan Aydın"
        },
        {
          "label": "Dönem",
          "value": "01.12.2024 – 21.02.2025"
        },
        {
          "label": "Talep Eden",
          "value": "İstanbul Emniyet Müdürlüğü, soruşturma kapsamında"
        }
      ],
      "body": "<table class=\"ledger-table\"><thead><tr><th>Tarih</th><th>İşlem</th><th>Tutar</th><th>Açıklama</th></tr></thead><tbody><tr><td>05.12.2024</td><td>Çıkış</td><td>4.500 TL</td><td>Ayşe Aydın'a havale</td></tr><tr class=\"alert\"><td>10.12.2024</td><td>Giriş</td><td>8.000 TL</td><td>Nakit yatırma — şube</td></tr><tr><td>15.12.2024</td><td>Çıkış</td><td>6.000 TL</td><td>Ayşe Aydın'a havale</td></tr><tr class=\"alert\"><td>08.01.2025</td><td>Giriş</td><td>7.500 TL</td><td>Nakit yatırma — ATM</td></tr><tr><td>12.01.2025</td><td>Çıkış</td><td>5.500 TL</td><td>Ayşe Aydın'a havale</td></tr><tr class=\"alert\"><td>20.01.2025</td><td>Giriş</td><td>9.000 TL</td><td>Nakit yatırma — şube</td></tr><tr><td>01.02.2025</td><td>Çıkış</td><td>7.000 TL</td><td>Ayşe Aydın'a havale</td></tr><tr class=\"alert\"><td>14.02.2025</td><td>Giriş</td><td>6.500 TL</td><td>Nakit yatırma — ATM</td></tr></tbody></table><p style=\"margin-top:14px\"><strong>IGA maaş girişleri (aynı dönem):</strong> Aylık net 18.400 TL.</p><p style=\"background:rgba(107,22,32,.1);padding:12px;border-left:3px solid var(--bordeaux);\"><strong>Kriminal Not:</strong> Nakit yatırmaların toplamı (≈31.000 TL) maaş dışı bir gelir kaynağına işaret ediyor. Kaynak belgesiz — organize bir ödeme değil, düzensiz nakit. Hasan'ın sevkiyattan paydan aldığını mı, yoksa başka kaynak mı? Soruşturma devam ediyor.</p>"
    },
    {
      "id": "082-L",
      "docId": "082-L · Tedarikçi Kayıtları",
      "title": "Güney Marmara Lojistik — Şoför Giriş-Çıkış Kayıtları",
      "meta": [
        {
          "label": "Şoför",
          "value": "Volkan Şenel"
        },
        {
          "label": "Dönem",
          "value": "Son 30 gün"
        },
        {
          "label": "Talep Eden",
          "value": "Soruşturma kapsamında"
        }
      ],
      "body": "<table class=\"signal-table\"><thead><tr><th>Tarih</th><th>Giriş</th><th>Çıkış</th><th>Planlı?</th></tr></thead><tbody><tr><td>25.01.2025</td><td>14:15</td><td>15:40</td><td>Evet</td></tr><tr><td>28.01.2025</td><td>09:30</td><td>10:45</td><td>Evet</td></tr><tr class=\"alert\"><td>04.02.2025</td><td>02:18</td><td>03:02</td><td><strong>Hayır</strong></td></tr><tr><td>10.02.2025</td><td>15:00</td><td>16:20</td><td>Evet</td></tr><tr class=\"alert\"><td>17.02.2025</td><td>02:45</td><td>03:30</td><td><strong>Hayır</strong></td></tr><tr class=\"alert\"><td>22.02.2025</td><td>02:31</td><td>03:08</td><td><strong>Hayır</strong></td></tr></tbody></table><p style=\"background:rgba(107,22,32,.1);padding:12px;border-left:3px solid var(--bordeaux);\"><strong>Kriminal Not:</strong> Son 30 günde 3 plansız gece girişi — tümü 02:00–04:00 arası. 22 Şubat'a ait Güney Marmara kayıtlarında tamamlanmamış teslimat bulunmadı. 'Kâğıt almaya geldim' açıklaması çöküyor.</p>"
    },
    {
      "id": "082-N",
      "docId": "082-N · Sendika Ofisi",
      "title": "Cemal Bektaş — Sendika Not Defteri (Fotokopi)",
      "meta": [
        {
          "label": "Fotokopi talep eden",
          "value": "İstanbul Emniyet Müdürlüğü"
        },
        {
          "label": "Orijinal",
          "value": "Cemal Bektaş kişisel not defteri, Şubat 2025 sayfaları"
        }
      ],
      "body": "<div style=\"font-family:var(--font-jetbrains-mono,monospace);font-size:12px;line-height:1.9;background:#1a1c1f;color:#d6cdb6;padding:18px;\"><p><strong>10.02.2025 — H.A. görüşmesi (10:30)</strong></p><p>Bağlam sordu — gece vardiyası, yalnız çalışma koşulları. İş kazasında sorumluluk kime düşer? Standart bilgi verdim. Ama sorularının tonu farklıydı.</p><p style=\"color:#c17070\">Not: sevkiyat biliyor mu?</p><hr style=\"border-color:#333;margin:12px 0\"/><p><strong>18.02.2025 — H.A. görüşmesi (14:00)</strong></p><p>Tekrar geldi. Bu kez daha net sordu:<br>'Bir şey bildirirsem — yasadışı bir şey — beni korur mu devlet? İşimi kaybeder miyim?'</p><p style=\"color:#c17070;font-weight:bold\">NOT: H.A. — sevk. / ihbar / kim koruyor?</p><p>Bir sonraki hafta randevu ayarlanmadı. H.A. gelmedi.</p></div><p style=\"background:rgba(107,22,32,.1);padding:12px;border-left:3px solid var(--bordeaux);\"><strong>Kriminal Not:</strong> Cemal Bektaş ilk ifadesinde bu notları 'genel sorular' olarak tanımladı. Fotokopi ibraz edildiğinde ikinci ifadeye davet planlanıyor.</p>"
    },
    {
      "id": "082-O",
      "docId": "082-O · Turkcell — Mahkeme Kararıyla",
      "title": "Selim Karaoğlan — GSM Kayıtları, 21–22 Şubat",
      "meta": [
        {
          "label": "Abone",
          "value": "Selim Karaoğlan"
        },
        {
          "label": "Dönem",
          "value": "21.02.2025 19:00 – 22.02.2025 06:00"
        }
      ],
      "body": "<table class=\"signal-table\"><thead><tr><th>Saat</th><th>Tür</th><th>Karşı Taraf</th><th>Baz İstasyonu</th><th>Süre</th></tr></thead><tbody><tr><td>21.02 · 21:14</td><td>Arama</td><td>Volkan Şenel</td><td>Arnavutköy-12</td><td>4dk 22sn</td></tr><tr><td>22.02 · 01:47</td><td>Gelen SMS</td><td>Volkan Şenel</td><td>Arnavutköy-12</td><td>—</td></tr><tr><td>22.02 · 01:49</td><td>SMS yanıt</td><td>Volkan Şenel</td><td>Arnavutköy-12</td><td>—</td></tr><tr class=\"alert\"><td>22.02 · 03:15</td><td>Arama</td><td>Volkan Şenel</td><td>Arnavutköy-12</td><td>1dk 08sn</td></tr><tr class=\"alert\"><td>22.02 · 04:51</td><td>Arama</td><td>Volkan Şenel</td><td>Arnavutköy-12</td><td>2dk 34sn</td></tr></tbody></table><p style=\"background:rgba(107,22,32,.1);padding:12px;border-left:3px solid var(--bordeaux);\"><strong>Kriminal Not:</strong> Selim'in telefonu gece boyunca Arnavutköy-12 baz istasyonuna bağlı — ikametgahı Esenyurt, 18 km uzakta. 03:15 araması cinayetten 15-30 dakika sonra. 04:51 araması Sarp'ın cesedi bulmasından 34 dakika sonra.</p>"
    },
    {
      "id": "082-P",
      "docId": "082-P · IGA İnsan Kaynakları",
      "title": "Hasan Aydın — IGA Özlük Dosyası",
      "meta": [
        {
          "label": "Sicil No",
          "value": "IGA-2024-0847"
        },
        {
          "label": "İşe Başlama",
          "value": "17.09.2024"
        }
      ],
      "body": "<p><strong>Mesleki geçmiş:</strong> 2004–2022 Aydın &amp; Ortakları Gümrük Müşavirlik A.Ş. (ortak). 2022 şirket iflası (ticaret sicili kaydı mevcut).</p><p><strong>Performans notu (Mehmet Erdal, 10.01.2025):</strong><br><em>\"Hasan Bey çalışkandır, dakiktir. Ancak zaman zaman kendi bölümü dışındaki hatlara ilgi gösterdiği gözlemlenmiştir. Uyarıldı. Gümrük geçmişi kargo süreçlerine hâkimiyeti artırsa da bölüm dışına müdahale beklenmemektedir.\"</em></p><p><strong>Acil irtibat:</strong> Ayşe Aydın (eski eş)</p><p style=\"background:rgba(107,22,32,.1);padding:12px;border-left:3px solid var(--bordeaux);\"><strong>Kriminal Not:</strong> Mehmet Erdal Hasan'ın 'diğer hatlara ilgi gösterdiğini' 10 Ocak'ta not düştü — USB fotoğraflarının çekildiği 3 Şubat'tan önce. Ya Hasan daha önce de fark etmişti, ya da Mehmet başka birinin gözlemini kayıt altına aldı.</p>"
    }
  ],
  "technical": [
    {
      "id": "082-M",
      "docId": "082-M · IGA IT Departmanı",
      "title": "CCTV Sistem Logu — Hat-4 Kamera Kesintisi",
      "meta": [
        {
          "label": "Analiz Eden",
          "value": "IGA IT Departmanı (soruşturma talebi)"
        },
        {
          "label": "Rapor Tarihi",
          "value": "27.02.2025"
        }
      ],
      "body": "<p><strong>İncelenen olay:</strong> 22.02.2025, 02:50:01 – 02:55:06 arası kayıp.</p><p style=\"font-family:var(--font-jetbrains-mono,monospace);font-size:11px;background:#1a1c1f;color:#d6cdb6;padding:16px;line-height:1.8\">02:49:58 — Hat-4 kamera: UPDATE_TRIGGER received<br>02:49:58 — Source IP: <span style=\"color:#c17070\">192.168.1.47</span> (Terminal Güvenlik Ofisi iş istasyonu)<br>02:49:59 — Camera stream paused: cam-hat4-int<br>02:55:06 — Camera stream resumed: cam-hat4-int<br>02:55:07 — No update applied to: cam-hat1, cam-hat2, cam-hat3, cam-hat5...(14 camera)</span></p><h3>Sonuç</h3><ul><li>Güncelleme <strong>otomatik değil, manuel tetiklemeli.</strong></li><li>Komut güvenlik ofisi iş istasyonu üzerinden verildi (IP: 192.168.1.47).</li><li>Güncelleme sadece Hat-4 iç kamerasına uygulandı — <strong>diğer 14 kamera etkilenmedi.</strong></li><li>Aynı güncelleme paketi 6 gün önce tüm kameralara zaten uygulanmıştı (16.02.2025).</li></ul><p style=\"background:rgba(107,22,32,.15);padding:14px 18px;border:1px solid var(--bordeaux);\"><strong>SONUÇ:</strong> Güncelleme tesadüf değil. Hat-4'e özgü ve o geceye özgü olması tesadüf olasılığını ortadan kaldırıyor. Güvenlik ofisi kart okuyucu kaydı: Sarp Yılmaz'ın kartı 02:44'te ofis kapısını açtı — güncelleme komutundan 5 dakika önce.</p>",
      "signature": {
        "role": "IT Adli Birim",
        "name": "IGA Sistem Logu"
      }
    }
  ],
  "timeline": [
    {
      "id": "tl082-0",
      "time": "10.01.2025",
      "event": "Mehmet Erdal, Hasan'ın 'kendi bölümü dışındaki hatlara ilgi gösterdiğini' özlük dosyasına düşürüyor. Uyarıldı notu.",
      "source": "082-P — Özlük dosyası",
      "critical": false
    },
    {
      "id": "tl082-1",
      "time": "03.02.2025 · gece",
      "event": "Hasan, gece vardiyasında şüpheli kargo bagajını gizlice fotoğraflıyor — 18 kare, USB belleğine kaydediyor.",
      "source": "HAS-USB01 — metadata",
      "critical": true
    },
    {
      "id": "tl082-2",
      "time": "03.02.2025",
      "event": "Mehmet Erdal, Hasan'ı 22 Şubat gece vardiyasında Hat-4'e yalnız bırakan vardiya takvimi değişikliğini imzalıyor.",
      "source": "082-I — Vardiya değişiklik belgesi",
      "critical": true
    },
    {
      "id": "tl082-3",
      "time": "05.02.2025 · 02:34",
      "event": "Volkan, Selim'e 'Hasan fotoğraf çekti' mesajı atıyor. Selim: 'Hallederim.'",
      "source": "082-K — WhatsApp msg-005/008",
      "critical": false
    },
    {
      "id": "tl082-4",
      "time": "10.02.2025 · 10:30",
      "event": "Hasan, sendika temsilcisi Cemal Bektaş'ı ilk kez ziyaret ediyor. Gerçek soru: ihbar koruması.",
      "source": "082-N — Not defteri, 082-H ifade",
      "critical": false
    },
    {
      "id": "tl082-5",
      "time": "18.02.2025 · 14:00",
      "event": "Hasan, Cemal'i ikinci ziyaret: 'İhbar edersem devlet koruyor mu?' Not defteri: 'H.A. — sevk. / ihbar / kim koruyor?'",
      "source": "082-N — Not defteri",
      "critical": true
    },
    {
      "id": "tl082-6",
      "time": "18.02.2025 · 22:03",
      "event": "Selim, Volkan'a: 'Hasan para istedi — payı alırım yoksa ihbar ederim.' Volkan: 'Çözmen lazım.'",
      "source": "082-K — WhatsApp msg-014/017",
      "critical": false
    },
    {
      "id": "tl082-7",
      "time": "21.02.2025 · 21:14",
      "event": "Selim, Volkan'a: 'Mehmet halletti. Hat-4 boş kalacak o saatlerde. Hasan da oraya denk gelecek. Tesadüf.'",
      "source": "082-K — WhatsApp msg-019/022",
      "critical": true
    },
    {
      "id": "tl082-8",
      "time": "22.02.2025 · 01:47",
      "event": "Volkan: 'O saatlendi mi?' / Selim: 'Evet.' — Cinayetten 58 dakika önce.",
      "source": "082-K — WhatsApp msg-023/024",
      "critical": true
    },
    {
      "id": "tl082-9",
      "time": "22.02.2025 · 02:31",
      "event": "Volkan Şenel K-3 kapısından terminale giriyor. Plansız ziyaret — Güney Marmara kayıtlarında teslimat yok.",
      "source": "082-L — Giriş-çıkış logu",
      "critical": false
    },
    {
      "id": "tl082-10",
      "time": "22.02.2025 · 02:44",
      "event": "Sarp Yılmaz'ın güvenlik kartı terminal güvenlik ofisi kapısını açıyor.",
      "source": "082-M — IT logu, kart okuyucu",
      "critical": false
    },
    {
      "id": "tl082-11",
      "time": "22.02.2025 · 02:47",
      "event": "Hat-4 iç kamerası son kareyi kaydediyor: Hasan kargo masasına yürüyor.",
      "source": "HAS-KAP01 — kamera",
      "critical": false
    },
    {
      "id": "tl082-12",
      "time": "22.02.2025 · 02:49",
      "event": "Güvenlik ofisi IP'sinden Hat-4 iç kamerası manuel olarak kesiliyor. Diğer 14 kamera etkilenmiyor.",
      "source": "082-M — IT sistem logu",
      "critical": true
    },
    {
      "id": "tl082-13",
      "time": "22.02.2025 · 02:45 — 02:58",
      "event": "CİNAYET. Selim Hat-4'e geliyor. Hasan ile tartışma — Hasan paydan ya da ihbardan bahsetti. Selim boğazına çöktü. Hasan direndi.",
      "source": "082-B — Otopsi, HAS-DNA01, HAS-ELD01, selim-3 ifade",
      "critical": true
    },
    {
      "id": "tl082-14",
      "time": "22.02.2025 · 02:58",
      "event": "Hasan'ın telefonu Selim tarafından alınıyor — iOS 02:58 konum kilidi metadata.",
      "source": "HAS-TEL01 — metadata",
      "critical": true
    },
    {
      "id": "tl082-15",
      "time": "22.02.2025 · 03:08",
      "event": "Volkan Şenel terminali terkediyor (K-3 çıkış). 37 dakika içeride kaldı.",
      "source": "082-L — Giriş-çıkış logu",
      "critical": false
    },
    {
      "id": "tl082-16",
      "time": "22.02.2025 · 03:15",
      "event": "Selim, Volkan'ı arıyor. Görüşme 1 dakika 8 saniye.",
      "source": "082-O — GSM kayıtları",
      "critical": false
    },
    {
      "id": "tl082-17",
      "time": "22.02.2025 · 04:15",
      "event": "Sarp Yılmaz rutin güvenlik turunda Hat-4'te Hasan Aydın'ı buluyor. Acil çağrı yapıyor.",
      "source": "082-C — Sarp ifadesi",
      "critical": false
    },
    {
      "id": "tl082-18",
      "time": "22.02.2025 · 04:51",
      "event": "Selim, cesedi buluştan 34 dakika sonra Volkan'ı tekrar arıyor. 2 dakika 34 saniye.",
      "source": "082-O — GSM kayıtları",
      "critical": false
    },
    {
      "id": "tl082-19",
      "time": "28.02.2025",
      "event": "İkametgah aramasında Hasan'ın telefonu Selim'in çantasında bulundu. DNA eşleşmesi teyit edildi. Tutuklama kararı.",
      "source": "HAS-TEL01, HAS-DNA01",
      "critical": true
    }
  ],
  "timelineInitialOrder": [
    "tl082-8",
    "tl082-3",
    "tl082-13",
    "tl082-1",
    "tl082-17",
    "tl082-9",
    "tl082-5",
    "tl082-14",
    "tl082-0",
    "tl082-15",
    "tl082-12",
    "tl082-6",
    "tl082-18",
    "tl082-4",
    "tl082-19",
    "tl082-10",
    "tl082-7",
    "tl082-11",
    "tl082-2",
    "tl082-16"
  ],
  "deduction": {
    "contradictions": [
      {
        "pin": true,
        "text": "<strong>Selim: 'Hat-4'e gitmedim'</strong> → Parmak izi (HAS-PRK01) + saç teli DNA (HAS-DNA01) + sol eldiven (HAS-ELD01) — üçü aynı anda Hat-4'te."
      },
      {
        "pin": true,
        "text": "<strong>Selim: 'Telefonum kayboldu'</strong> → Hasan'ın telefonu Selim'in kiracı çantasında bulundu (HAS-TEL01). Başka kişinin telefonu, saklanmış."
      },
      {
        "pin": true,
        "text": "<strong>Selim: 'Volkan ile sadece terminal tanışıklığı'</strong> → WhatsApp (082-K) aylarca koordinasyon: 'Hallederim', 'Tesadüf', 'o saatlendi mi / Evet'."
      },
      {
        "pin": true,
        "text": "<strong>Volkan: 'Kâğıt almaya geldim'</strong> → Güney Marmara kayıtlarında 22 Şubat'a ait tamamlanmamış teslimat yok (082-L). Üç plansız gece girişi."
      },
      {
        "pin": true,
        "text": "<strong>Sarp: 'Sistem güncellemesi otomatik'</strong> → IT logu: güncelleme Sarp'ın erişim kartıyla açılan ofisten manuel, ve sadece Hat-4 kamerasına (082-M)."
      },
      {
        "pin": true,
        "text": "<strong>Mehmet: 'Vardiya değişikliği benim kararım'</strong> → İki çalışan Selim ile uzun soyunma odası görüşmesini tanıkladı; direktif kaynağını 'hatırlamıyorum' diyor."
      }
    ],
    "elimination": [
      {
        "pin": true,
        "text": "<strong>Ayşe Aydın:</strong> Olay gecesi Bursa Nilüfer'de. GSM baz istasyonu Nilüfer-07 sabit. Komşu tanıklığı örtüşüyor. İstanbul'a fiziksel ulaşım imkânsız. ✗"
      },
      {
        "pin": true,
        "text": "<strong>Cemal Bektaş:</strong> Hasan'ı ihbar sürecinde desteklemeye çalışıyordu. Not defteri bunu teyit ediyor. Motif yok, terminalde hiç bulunmadı. ✗"
      },
      {
        "pin": true,
        "text": "<strong>Mehmet Erdal:</strong> Vardiya değişikliğiyle plana zemin hazırladı — suç ortaklığı şüphesi var. Ama olay gecesi Hat-4'te değildi, doğrudan fiili yok. Ayrı soruşturma. ⚠"
      },
      {
        "pin": true,
        "text": "<strong>Volkan Şenel:</strong> Terminaldeydi, sevkiyat ağının parçası. Ama 03:08 çıkışı ve 03:15'te Selim'in onu araması cinayeti kendisinin işlemediğini gösteriyor. Uyuşturucu suçu ayrıca. ⚠"
      }
    ]
  },
  "verdict": {
    "perpetratorId": "suspect-01",
    "perpetratorName": "Selim Karaoğlan",
    "murderTime": "22 Şubat 2025 · 02:45 — 02:58",
    "murderLocation": "IGA Kargo Terminali · Hat-4 Konveyör Bölümü",
    "murderWeapon": "Manuel boğma (el kuvvetiyle)",
    "motivation": "Hasan, aylardır organize edilen uyuşturucu sevkiyatını fark etti ve paydan talep etti. Selim, ihbar edilmekten korkarak panikle hareket etti.",
    "evidenceList": [
      "HAS-DNA01: Saç teli — Selim Karaoğlan DNA eşleşmesi",
      "HAS-PRK01: Parmak izi — Selim eşleşmesi",
      "HAS-ELD01: Sol eldiven — Selim DNA'sı, konveyör altında",
      "HAS-TEL01: Hasan'ın telefonu Selim'in çantasında, 02:58 metadata",
      "082-K msg-021: 'Tesadüf' — koordinasyon yazılı kanıtı",
      "082-K msg-023/024: 'O saatlendi mi / Evet'",
      "082-M: Kamera manuel kesilmesi — güvenlik ofisi IP'si",
      "082-N: Cemal not defteri — Hasan'ın ihbar sorusu",
      "082-O: 03:15 ve 04:51 GSM aramaları"
    ],
    "conclusion": "Hasan Aydın, eski gümrük müşavirliği birikimini kullanarak kargo terminalindeki uyuşturucu sevkiyatını fark etti. Kahraman olmak yerine paydan istedi — bu onu Selim'in gözünde yok edilmesi gereken bir tehdit haline getirdi. Selim planlamadı, panikle hareket etti, iz bıraktı.",
    "wrongAnswerMessage": "Bu şüpheli faili değil. Delilleri yeniden incele: DNA, parmak izi, telefon metadata'sı ve WhatsApp zinciri seni doğru kişiye götürecek.",
    "solutionDocLabel": "082-Z2 · Resmi Çözüm Belgesi",
    "solutionHtml": "<div class=\"verdict-stamp\">CLASSIFIED</div><div class=\"doc-id\" style=\"margin-bottom:12px;\">082-Z2 · Resmi Çözüm Belgesi · 01.03.2025</div><h3 style=\"font-family:'Cormorant Garamond',serif;font-size:24px;margin:0 0 8px;\">Failin Kimliği:</h3><div class=\"verdict-name\">Selim Karaoğlan</div><h3>Cinayet Saati ve Yöntemi</h3><p><strong>22 Şubat 2025, gece 02:45 – 02:58 arası.</strong> Selim, Volkan'ın 01:47 mesajından Hasan'ın Hat-4'te yalnız olduğunu biliyordu. Sarp Yılmaz ya da kendi aracılığıyla kamera kesilmişti (02:49). Selim Hat-4'e geldi. Hasan'la karşılaştı — son kez paydan ya da ihbardan bahsetti. Selim panikle Hasan'ın boğazına çöktü. Boğuşmada sol eldiveni konveyör altına düştü, fark etmedi. Sağ eldivenini çıkarınca parmak izi bıraktı. Hasan mücadele etti — Selim'in saçından tuttu. Selim kafasını konveyöre çarptı. 3-5 dakika sonra Hasan hayatını kaybetti.</p><h3>Cinayet Sonrası Davranış</h3><p>02:58'de Hasan'ın telefonunu aldı — 'birileriyle yazışmış mıydı?' diye sordu kendine. Ayak izini silmeye çalıştı. Sol eldiveni konveyör altında bıraktığını fark etmedi. 03:15'te Volkan'ı aradı. 04:51'de tekrar aradı — cesedi bulunmuştu.</p><h3>Failin Kritik Hatası</h3><p>Hasan'ın telefonunu aldı. Mantıklıydı o an — ama iOS'un 02:58 konum kilidi metadata'sı kendisini olay yerine ve o ana bağladı. Aldığı telefon onu mahkûm etti.</p><h3>İki Yalancı</h3><ol><li><strong>Selim Karaoğlan</strong> — fail. Üç oturumda sistematik yalan söyledi. 3. oturumda 'oradaydım' dedi.</li><li><strong>Sarp Yılmaz</strong> — fail değil. Kamera kesintisini 'otomatik güncelleme' diye geçiştirdi. IT logu çürüttü. Suç ortaklığı ve delil karartma soruşturması devam ediyor.</li></ol><h3>Kırmızı Ringalar</h3><p><strong>Ayşe Aydın:</strong> Bursa GSM baz istasyonu ve kız kardeşi tanıklığı olay gecesi Nilüfer'de olduğunu kanıtlıyor. Velayet motifi güçlü görünüyor ama fiziksel varlık imkânsız.</p><p><strong>Volkan Şenel:</strong> Terminal içindeydi, tutarsız açıklamalar yaptı, organize suçla bağlantılı. Ama 03:08 çıkışı ve 03:15 araması cinayetin kendisi tarafından işlenmediğini gösteriyor. Uyuşturucu sevkiyatı ayrıca yargılanacak.</p><h3>Dayandığı Kritik Belgeler</h3><ol><li><strong>082-K msg-021:</strong> 'Tesadüf' — koordinasyonun yazılı kanıtı</li><li><strong>082-K msg-023/024:</strong> 'O saatlendi mi / Evet'</li><li><strong>HAS-DNA01:</strong> Saç teli DNA — Selim eşleşmesi</li><li><strong>HAS-PRK01:</strong> Parmak izi — Selim eşleşmesi</li><li><strong>HAS-ELD01:</strong> Sol eldiven — Selim DNA'sı</li><li><strong>HAS-TEL01:</strong> Telefon metadata — 02:58</li><li><strong>082-M:</strong> IT logu — kamera manuel kesilmesi</li><li><strong>082-N:</strong> Not defteri — ihbar sorusu</li><li><strong>082-O:</strong> 03:15 ve 04:51 GSM aramaları</li></ol><p style=\"background:rgba(107,22,32,.12);padding:16px;border-left:3px solid var(--bordeaux);margin-top:24px;\"><strong>SONUÇ:</strong> Selim Karaoğlan, Hasan Aydın'ı 22 Şubat 2025 sabaha karşı IGA Kargo Terminali Hat-4'te el kuvvetiyle boğarak öldürdü. Motif: Hasan'ın uyuşturucu sevkiyatını ihbar etmesini engellemek. Fail soğukkanlı değil, panikleyen bir adamdı — ve her hatasında iz bıraktı.</p><p style=\"margin-top:18px;\"><strong>Tutuklama emri:</strong> 01 Mart 2025 · Selim Karaoğlan, Esenyurt ikametgahında saat 06:40'ta gözaltına alındı.</p><div class=\"doc-signature\"><div class=\"sig-line\">Kıdemli Kriminal Analist · EGM</div><div class=\"sig-name\">Onaylı</div></div>"
  },
  "tabSectionSub": {
    "brief": "082-A · Olay Yeri",
    "adli-tip": "082-B · Otopsi",
    "deliller": "8 Fiziksel Delil",
    "belgeler": "082-K · WhatsApp",
    "teknik": "082-M · CCTV Logu",
    "cozum": "082-Z2 · Sınırlı Erişim"
  }
};

// MessageThread referansını CaseData'ya bağla
(case082 as any).messageThreads = case082MessageThreads;
