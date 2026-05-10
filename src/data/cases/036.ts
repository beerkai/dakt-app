import type { CaseData } from "@/lib/case-types";
import { case036MessageThreads } from "./036-message-threads";

export const case036: CaseData = {
  "id": "036",
  "codename": "Bedel",
  "fullTitle": "Vaka № 036 — Bedel Dosyası",
  "status": "active",
  "difficulty": "Zor",
  "recommendedPlayers": "2–4 analist",
  "location": "Diyarbakır · Sur · Kuyumcular Çarşısı · Şanlı Kuyumculuk Arka Odası",
  "victim": "Cevher Şanlı (62, erkek)",
  "date": "18 Nisan 2025 · Gece 22:30 — 23:30",
  "shortSummary": "Sur Kuyumcular Çarşısı'nda tefeci cinayeti: tanıdığın gece dükkana giriş, boğulma ve kayıp kırmızı defter.",
  "enabledTabs": [
    "brief",
    "supheliler",
    "ifadeler",
    "adli-tip",
    "deliller",
    "belgeler",
    "teknik",
    "deduction",
    "cozum"
  ],
  "brief": {
    "subtitle": "Diyarbakır Sur · Şanlı Kuyumculuk · 18–19 Nisan 2025",
    "metaPairs": [
      {
        "label": "Vaka No",
        "value": "036"
      },
      {
        "label": "Dosya Tipi",
        "value": "Cinayet — Mekanik asfiksi — Tefecilik / şantaj bağlantılı"
      },
      {
        "label": "Olay tarihi (aralık)",
        "value": "18 Nisan 2025 · Gece 22:30 — 23:30"
      },
      {
        "label": "Konum",
        "value": "Diyarbakır · Sur · Kuyumcular Çarşısı · Şanlı Kuyumculuk Arka Odası"
      },
      {
        "label": "Kurban",
        "value": "Cevher Şanlı (62, erkek)"
      },
      {
        "label": "Olay zamanı (tahmin)",
        "value": "Gece 22:30 — 23:30 (Tahmini)"
      }
    ],
    "sections": [
      {
        "title": "Olay",
        "body": "<p>19 Nisan 2025 sabahı saat 08:30 sularında, Diyarbakır Sur içindeki tarihi Kuyumcular Çarşısı'nda yer alan Şanlı Kuyumculuk'un çırağı kepenkleri açtığında ustası Cevher Şanlı'nın cesediyle karşılaştı. Cevher, dükkanın arka tarafındaki muhasebe odasında, boynundan eski bir urgan/halı ipiyle boğulmuş halde yerde yatmaktaydı.</p>"
      },
      {
        "title": "Özet (1)",
        "body": "<p>İlk incelemelere göre dükkana zorla girilmemiş, vitrindeki ya da kasadaki altınlara dokunulmamıştı. Maktulün sadece masasının üzerindeki o güne ait alacak-verecek defterinin eksik olduğu belirlendi. Cinayetin bir hırsızlık vakasından ziyade, kurbanın tefecilik faaliyetleriyle ya da şahsi ilişkileriyle bağlantılı, kişisel bir infaz olduğu açıktı.</p>"
      },
      {
        "title": "Özet (2)",
        "body": "<p>Cevher Şanlı, çarşıda saygı duyulan ama bir o kadar da korkulan bir isimdi. Dar boğaza düşen esnafa yüksek faizle borç verir, ödeyemeyenleri acımasızca sıkıştırırdı. Bu durum, onu öldürmek için geçerli nedeni olan geniş bir şüpheli havuzu yaratıyor. Soruşturma, kurbanın sadece alacaklılarını değil, aile içindeki çalkantılı ilişkilerini de mercek altına almak zorunda.</p>"
      },
      {
        "title": "Mağdur profili",
        "body": "<p>Cevher Şanlı, 62 yaşında, eski usül bir esnaf. Dışarıdan bakıldığında geleneklerine bağlı, namazında niyazında, çarşının 'Cevher Abisi'. Ancak kapalı kapılar ardında, çaresiz kalmış insanlara gayriresmi borç veren, temerrüde düşenlerin mülklerine çöken acımasız bir tefeci.\n\nAile hayatında da benzer bir diktatörlük hüküm sürüyor. Eşi Saliha'ya psikolojik şiddet uygulayan, oğlu Mahmut'u dükkandan kovan ve onu mirastan men etmekle tehdit eden biri. Çevresindeki herkesle bir 'alacak-verecek' veya 'çıkar' ilişkisi kurmuş, sevgi bağı kalmamış bir adam.</p>"
      },
      {
        "title": "Kayıt / kamera",
        "body": "<p>Olay anına dair dijital iz: Olay gecesi 22:35 ile 23:20 arasında çarşı girişindeki kamera kayıtlarında bir kesinti mevcut. Sadece dükkanın karşısındaki ATM kamerasından yansıyan sınırlı açılar incelenmekte.</p>"
      },
      {
        "title": "Görev",
        "body": "<p>Soruşturma ekibinden beklenen: Kayıp alacak-verecek defterinin kimin işine yarayacağını bulmak, şüphelilerin olay gecesine ait ifadelerindeki çelişkileri yakalamak ve kurbanın tefecilik faaliyetleri nedeniyle hedef aldığı kişileri tespit etmektir. Toplamda 22 belgelik bir dosya üzerinden çalışacaksınız.</p>"
      },
      {
        "title": "Uyarı",
        "body": "<p style=\"background:rgba(107,22,32,0.1);padding:12px 16px;border-left:3px solid var(--bordeaux);\">Kurban direnmemiş ve kapı zorlanmamış. Maktul faili tanıyordu ve arka odaya girmesine müsaade etti.</p>"
      }
    ],
    "signature": {
      "role": "Düzenleyen\nDiyarbakır İl Emniyet Müdürlüğü · Cinayet Büro",
      "name": "Komiser Yardımcısı"
    }
  },
  "suspects": [
    {
      "id": "civan",
      "code": "SUSP-01 · SUR-BAK/CD",
      "name": "Civan Diyarlı",
      "role": "Bakırcı Ustası (Borçlu esnaf)",
      "quote": "\"Bana olan borcunu namusuyla ödesin dedim, ben kimseden can almam.\""
    },
    {
      "id": "ceren",
      "code": "SUSP-02 · SUR-AİL/BD",
      "name": "Ceren Diyarlı",
      "role": "Civan'ın kız kardeşi",
      "quote": "\"Cevher Amca bizim ailemizin dostuydu, neden böyle bir iftiraya uğrayayım ki?\""
    },
    {
      "id": "mahmut",
      "code": "SUSP-03 · AİL-OĞL/MŞ",
      "name": "Mahmut Şanlı",
      "role": "Kurbanın oğlu",
      "quote": "\"Babamın parası vardı ama vicdanı yoktu. Ölmesi şaşırtıcı değil.\""
    },
    {
      "id": "saliha",
      "code": "SUSP-04 · AİL-EŞ/SŞ",
      "name": "Saliha Şanlı",
      "role": "Kurbanın eşi",
      "quote": "\"Kırk yıllık kocam... Ne kadar zor bir adam olsa da, o benim efendimdi.\""
    },
    {
      "id": "hozan",
      "code": "SUSP-05 · SUR-KUY/HA",
      "name": "Hozan Akpınar",
      "role": "Rakip Kuyumcu",
      "quote": "\"Çarşıda herkes Cevher'den illallah etmişti, benim onunla bir hesabım kalmamıştı.\""
    },
    {
      "id": "yasin",
      "code": "SUSP-06 · SUR-ÇRK/Yİ",
      "name": "Yasin İskender",
      "role": "Kuyumcu Çırağı",
      "quote": "\"Ben sadece ekmeğimin peşindeyim, o gece dükkanı kilitleyip çıktım.\""
    }
  ],
  "testimonies": [
    {
      "id": "yasin-1",
      "suspectName": "Yasin İskender",
      "headerDocId": "036-Y1 · Diyarbakır Emniyet Müdürlüğü · Asayiş Şube",
      "title": "İfade — Yasin İskender (1. Oturum)",
      "date": "19.04.2025 · 10:15",
      "birth": "12.03.2000",
      "occupation": "Kuyumcu Çırağı",
      "address": "Bağlar, Diyarbakır",
      "session": 1,
      "paragraphs": [
        "S: Başın sağ olsun Yasin. Olay sabahı dükkanı sen açmışsın, tam olarak ne gördün anlatır mısın?",
        "C: Sağ olun amirim. Ben her sabah 08:30'da gelir, dükkanın kepengini açarım. Cevher ustam benden her zaman önce gelir sanıyordum ama o gece belli ki dükkanda kalmış. Kepengi açtım, vitrin aynen duruyordu. Arka odaya, muhasebe tarafına geçtim çayı koymak için. Bir baktım ustam yerde yatıyor. [duraksama] Boynunda halı ipi gibi kalın bir şey vardı. Çok korktum, hemen dışarı fırlayıp çarşı bekçisi Remzi abiye haber verdim.",
        "S: Dün akşam dükkandan saat kaçta ayrıldın? Ustanın durumu nasıldı?",
        "C: Ben akşam ezanından sonra, 20:30 gibi dükkandan çıktım. Cevher ustam o gün sabahtan beri çok gergindi. Kırmızı kaplı meşhur alacak-verecek defterine bakıp duruyordu. Bana 'Sen çık koçum, benim çarşıdan biriyle hesabım var, onu bekleyeceğim' dedi. Ben de üstelemedim çıktım.",
        "S: Kiminle buluşacağını söylemedi mi? Çarşıda husumetli olduğu kimse var mıydı?",
        "C: Amirim, ustamın husumetli olmadığı esnaf yok gibiydi. Herkes ondan borç alırdı. Son zamanlarda özellikle şu köşedeki bakırcı Civan abiyle arası pek yoktu. Civan abinin işleri bozuk, ustama da epey borcu birikti. Birkaç gün önce dükkana gelip 'Usta mühlet ver, anamın evini satıp ödeyeceğim' diye yalvarmıştı. Ama ustam Nuh dedi peygamber demedi.",
        "S: Peki sen o gece dükkandan çıktıktan sonra nereye gittin?",
        "C: Doğruca eve, Bağlar'a gittim amirim. Annemle kız kardeşim şahittir, bütün gece evdeydim. Sabah kalkıp yine dükkana geldim."
      ],
      "signature": "Y. İskender"
    },
    {
      "id": "saliha-1",
      "suspectName": "Saliha Şanlı",
      "headerDocId": "036-S1 · Diyarbakır Emniyet Müdürlüğü · Asayiş Şube",
      "title": "İfade — Saliha Şanlı (1. Oturum)",
      "date": "19.04.2025 · 11:30",
      "birth": "04.09.1967",
      "occupation": "Ev Hanımı",
      "address": "Yenişehir, Diyarbakır",
      "session": 1,
      "paragraphs": [
        "S: Saliha Hanım, eşinizin vefatı için başsağlığı dileriz. Olay gecesi eşiniz eve hiç gelmemiş, haberiniz var mıydı?",
        "C: [derin bir nefes alır] Eksik olmayın amirim. Cevher eve gelmediyse o kırmızı defterine gömülmüştür, çarşıda sabahlayacaktır derdim hep. Kırk yıllık kocam... Hiç arayıp sormazdım nerede kaldın diye, sorsam da terslerdi zaten.",
        "S: Aranız nasıldı? Son zamanlarda tehdit alıyor muydu veya canını sıkan özel bir durum var mıydı?",
        "C: Bizim aramız hiçbir zaman iyi olmadı ki evlat... O sadece altına, paraya, senede değer verirdi. Son haftalarda iyice huysuzlanmıştı. 'Bu devirde kimseye acımayacaksın, acırsan tepene binerler' deyip duruyordu evde. Kimden bahsettiğini bilmiyorum. Bana pek bir şey anlatmazdı.",
        "S: Oğlunuz Mahmut'la araları nasıldı? Dün gece eve geldi mi Mahmut?",
        "C: [Gözleri dolar] Ah Mahmut... Oğlum benim. Babası onu aylardır dükkandan kovmuştu. 'Hayırsız evlat, benim malımı çarçur edeceksin, seni mirasımdan da sileceğim' derdi. Mahmut dün gece eve geç geldi, saat 01:00'i geçiyordu. Neredeydin diye sordum, kahvede arkadaşlarla oturuyorduk dedi.",
        "S: Cevher Bey'in evdeki kasasında veya özel eşyaları arasında aradığımız kırmızı defterin yedeği falan bulunur mu?",
        "C: Sanmam. O defter onun canıydı, dükkanda yastığının altına koyar öyle uyurdu. Kime ne borç verdi, kimin tapusunu rehin aldı... Hepsi o defterdeydi. Onu alan, Cevher'in sadece parasını değil, gücünü de aldı."
      ],
      "signature": "S. Şanlı",
      "callouts": [
        "Kurbanın oğlu Mahmut'un gece 01:00'de eve döndüğünü ve aralarının miras yüzünden kötü olduğunu doğruladı."
      ]
    },
    {
      "id": "hozan-1",
      "suspectName": "Hozan Akpınar",
      "headerDocId": "036-H1 · Diyarbakır Emniyet Müdürlüğü · Asayiş Şube",
      "title": "İfade — Hozan Akpınar (1. Oturum)",
      "date": "19.04.2025 · 13:00",
      "birth": "22.11.1983",
      "occupation": "Kuyumcu",
      "address": "Sur, Diyarbakır",
      "session": 1,
      "paragraphs": [
        "S: Hozan Bey, Cevher Şanlı ile dükkanlarınız çok yakın. Kendisiyle uzun süredir sürtüşmeli olduğunuz biliniyor. Olay gecesi 22:30 civarında dükkanınızın kepengini kapattığınızı gördük. Ne gördünüz?",
        "C: Amirim, Cevher'le anlaşamadığımız sır değildi. O tefecilik yapıp çarşının adını kirletiyordu, ben dürüst kuyumculuk yapıyorum. Müşterilerimi de kaçırıyordu sırf bana inat olsun diye. Ama benim onunla kan davam yok. O gece hesap kapatıyordum, malum ay sonu yaklaşıyor. Saat 22:45 gibi kepengi çekerken Cevher'in dükkanının ışığı yanıyordu.",
        "S: O saatte Cevher'in dükkanına giren çıkan birini gördünüz mü?",
        "C: Açıkçası sokak oldukça tenhaydı. Kepengi tam indirirken sokağın başından biri Cevher'in dükkanına doğru yürüdü. Yüzünü göremedim, sırtı dönüktü. Üzerinde koyu renk bir kaban vardı sanırım. Kapıyı tıklattı, Cevher içeriden bir şeyler söyledi ve kapıyı açtı.",
        "S: Giren kişinin boyu posu, yürüyüşü nasıldı? Tanıdık biri miydi?",
        "C: Vallahi karanlıktı amirim. Boylu poslu biri değildi ama. Cevher kapıyı öyle hemen açmaz gece vakti. Demek ki beklediği, tanıdığı biriydi. Ben de işime bakıp arabama atladım, eve gittim.",
        "S: Civan Diyarlı'yı tanır mısınız? Bakırcı.",
        "C: Civan iyi çocuktur ama Cevher'in eline düştü bir kere. Borç batağındaydı. Geçen gün dükkanın önünde Cevher ona ağza alınmayacak laflar etti. 'Kardeşinin malını mülkünü almasını bilirim' filan diyordu. Civan'ın gözü dönmüştü ama bir şey yapamadı."
      ],
      "signature": "H. Akpınar"
    },
    {
      "id": "mahmut-1",
      "suspectName": "Mahmut Şanlı",
      "headerDocId": "036-M1 · Diyarbakır Emniyet Müdürlüğü · Asayiş Şube",
      "title": "İfade — Mahmut Şanlı (1. Oturum)",
      "date": "19.04.2025 · 14:30",
      "birth": "08.05.1987",
      "occupation": "İşsiz",
      "address": "Yenişehir, Diyarbakır",
      "session": 1,
      "paragraphs": [
        "S: Babanızın ölümüyle ilgili ifadenize başvuruyoruz. Babanızla aranızın bozuk olduğu, sizi mirastan men edeceğini söylediği doğru mu?",
        "C: [umursamaz bir tavırla] Doğru amirim. Babam para dışında hiçbir şeyi sevmezdi. Beni dükkandan kovalı aylar oldu. 'Sen bu işin adamı değilsin, altın sana göre değil' deyip duruyordu. Ben kendi yolumu çizmeye çalışıyorum.",
        "S: Dün gece neredeydiniz Mahmut? Saat 01:00'de eve dönmüşsünüz.",
        "C: Ofis semtinde, Dostlar Kahvesi'ndeydim. Gece yarısına kadar arkadaşlarla pişti oynadık. Sonra da kalkıp eve gittim.",
        "S: Babanızı o gece hiç gördünüz mü? Dükkana uğradınız mı?",
        "C: Hayır uğramadım. Biliyorsunuz beni dükkanda istemiyordu. Onu en son üç gün önce annemin yanında gördüm. Yine bana bağırıp çağırıyordu. Dün gece boyunca kahvedeydim, sorabilirsiniz. Olayla ilgim yok.",
        "S: Kırmızı alacak-verecek defterinin yerini bilir miydiniz?",
        "C: O defteri gözü gibi korurdu. Kime ne kadar geçirdiğini ancak oradan bilirdi. Ama ben o işlerle ilgilenmiyordum."
      ],
      "signature": "M. Şanlı"
    },
    {
      "id": "mahmut-2",
      "suspectName": "Mahmut Şanlı",
      "headerDocId": "036-M2 · Diyarbakır Emniyet Müdürlüğü · Asayiş Şube",
      "title": "İfade — Mahmut Şanlı (2. Oturum)",
      "date": "20.04.2025 · 09:00",
      "birth": "—",
      "occupation": "—",
      "address": "—",
      "session": 2,
      "paragraphs": [
        "S: Mahmut, dün kahvedeydim dedin ama kahvehanedeki garson senin 22:30 civarında 'bir işim var' diyerek oradan ayrıldığını söylüyor. Yalan söylüyorsun.",
        "C: [panikler] Amirim... Ben... Ben öldürmedim babamı!",
        "S: Neredeydin o saatte? Neden dükkanın sokağındaki ATM kamerasında 23:15'te koşarak oradan uzaklaştığın görülüyor?",
        "C: [Terler, ellerini ovuşturur] Tamam, tamam anlatacağım. Borcum vardı benim. Kumar borcu. Babamdan son bir kez para istemek için dükkana gittim. Başka çarem yoktu. Gittiğimde dükkanın kepengi yarıya kadar inikti, kapı da aralıktı.",
        "S: İçeri girdin mi?",
        "C: Sadece başımı uzattım. Babamı o odanın zemininde yatarken gördüm. Boynunda bir ip vardı. Masasının üstü darmadağındı. O kadar korktum ki, hemen kaçtım. Polisi arasaydım kesin üzerime kalırdı diye düşündüm. Aranmızın bozuk olduğunu herkes biliyor.",
        "S: Masanın üzerinde veya etrafta defteri gördün mü?",
        "C: Hayır, hiçbir şeye dokunmadım. Sadece koşup uzaklaştım. Babamı ben öldürmedim amirim, yemin ederim içeri girdiğimde o zaten ölmüştü."
      ],
      "signature": "M. Şanlı",
      "metaRows": [
        {
          "label": "Doğum",
          "value": "08.05.1987"
        },
        {
          "label": "Meslek",
          "value": "İşsiz"
        },
        {
          "label": "Adres",
          "value": "Yenişehir, Diyarbakır"
        }
      ],
      "callouts": [
        "Şüpheli yalanını itiraf etti. Olay anı olan 23:15'te olay yerinde olduğunu kabul ediyor ama fail olmadığını, cesedi bulup kaçtığını iddia ediyor."
      ]
    },
    {
      "id": "ceren-1",
      "suspectName": "Ceren Diyarlı",
      "headerDocId": "036-B1 · Diyarbakır Emniyet Müdürlüğü · Asayiş Şube",
      "title": "İfade — Ceren Diyarlı (1. Oturum)",
      "date": "20.04.2025 · 11:00",
      "birth": "17.08.1997",
      "occupation": "Hemşire (Özel Poliklinik)",
      "address": "Kayapınar, Diyarbakır",
      "session": 1,
      "paragraphs": [
        "S: Ceren Hanım, abiniz Civan'ın Cevher Şanlı'ya yüklü bir borcu olduğunu biliyoruz. Olay gecesi neredeydiniz?",
        "C: Amirim, abimin işleri kötüydü evet. Ama ben ayrı yaşıyorum. O gece evimde, Kayapınar'da nöbet çıkışı dinleniyordum.",
        "S: Cevher Şanlı'yı tanır mısınız? Sizinle kişisel bir husumeti var mıydı?",
        "C: Cevher Amca bizim ailemizin dostuydu. Rahmetli babamın arkadaşıydı. Abim borcunu ödeyemeyince biraz canımızı sıktı ama husumet denecek bir durum yoktu. Neden böyle bir iftiraya uğrayayım ki?",
        "S: Size ait Diclekent'teki arazi ipotek gösterilmiş doğru mu?",
        "C: Abim o dükkanı kurtarmak için benden ricada bulundu, ben de onay verdim. Cevher Amca o araziyi alacaktı borca karşılık. Üzüldük ama mal canın yongası değil sonuçta. Babasının ölümüyle benim veya abimin ilgisi yok."
      ],
      "signature": "B. Diyarlı"
    },
    {
      "id": "ceren-2",
      "suspectName": "Ceren Diyarlı",
      "headerDocId": "036-B2 · Diyarbakır Emniyet Müdürlüğü · Asayiş Şube",
      "title": "İfade — Ceren Diyarlı (2. Oturum)",
      "date": "20.04.2025 · 15:30",
      "birth": "—",
      "occupation": "—",
      "address": "—",
      "session": 2,
      "paragraphs": [
        "S: Ceren, 'husumetimiz yoktu' diyorsun ama Cevher'in telefon kayıtlarında olay günü sana atılmış bir mesaj var: 'Eski kocasının nasıl öldüğünü polis bilmek ister, araziyi versen de o sırrı mezara götürmem' diyor. Bu ne demek?",
        "C: [Yüzü bembeyaz olur, sesi titrer] O adam bir iblisti amirim.",
        "S: Eski kocanın ölümüyle Cevher'in ne ilgisi var?",
        "C: Kocam... beş yıl önce ilaç zehirlenmesinden öldü. Kaza denildi, dosya kapandı. Ama Cevher benim çalıştığım klinikten bazı ilaçları aldığımı biliyordu. Beni o zamanlar korumuştu. Ama abim borcunu ödeyemeyince, sadece arazimi almakla kalmadı, bunu kullanarak benden başka taleplerde bulunmaya kalktı. Ahlaksız tekliflerde bulundu.",
        "S: Bunu abin Civan'a anlattın mı?",
        "C: [ağlamaya başlar] Olay günü gündüz anlattım. Dayanamadım. Abim çıldırdı. Onu öldüreceğini söyledi ama ben engel oldum, sakinleştirdim. Gece eve gitti sanıyordum. Amirim yemin ederim ben Cevher'in yanına gitmedim. Ama abim... Abim benim yüzümden bir delilik yaptıysa affetmem kendimi."
      ],
      "signature": "B. Diyarlı",
      "metaRows": [
        {
          "label": "Doğum",
          "value": "17.08.1997"
        },
        {
          "label": "Meslek",
          "value": "Hemşire (Özel Poliklinik)"
        },
        {
          "label": "Adres",
          "value": "Kayapınar, Diyarbakır"
        }
      ],
      "callouts": [
        "Kırmızı Ringa'nın ifşası: Ceren'ın Cevher tarafından şantaja uğradığı anlaşıldı. Motivasyon 'korunma ve sırları saklama' eksenine kaydı."
      ]
    },
    {
      "id": "civan-1",
      "suspectName": "Civan Diyarlı",
      "headerDocId": "036-C1 · Diyarbakır Emniyet Müdürlüğü · Asayiş Şube",
      "title": "İfade — Civan Diyarlı (1. Oturum)",
      "date": "21.04.2025 · 10:00",
      "birth": "10.10.1991",
      "occupation": "Bakırcı Ustası",
      "address": "Sur, Diyarbakır",
      "session": 1,
      "paragraphs": [
        "S: Civan, Cevher Şanlı'ya yüklü bir borcun var. Dükkanın batmak üzere. Olay gecesi neredeydin?",
        "C: Amirim, borç yiğidin kamçısıdır. Evet borcum var, ödeyecektim de. Bana olan borcunu namusuyla ödesin dedim Cevher ustaya, ben kimseden can almam. O gece kendi dükkanımdaydım. Sipariş yetiştirmem gerekiyordu, büyük bir bakır tepsi işliyordum.",
        "S: Yanında kimse var mıydı?",
        "C: Yoktu amirim, ben yalnız çalışırım gece vakti. Dükkanın kepengi yarı kapalıydı. Çekiç sesinden başka bir şey duyulmaz.",
        "S: Cevher'le son konuşmanız nasıl geçti?",
        "C: Bana biraz sert yaptı, 'Kardeşinin arsasına çökerim' dedi. Canım sıkıldı ama sonuçta adam haklı, alacaklı o. Bizim aramızdaki mevzu o arsada çözülecekti."
      ],
      "signature": "C. Diyarlı"
    },
    {
      "id": "civan-2",
      "suspectName": "Civan Diyarlı",
      "headerDocId": "036-C2 · Diyarbakır Emniyet Müdürlüğü · Asayiş Şube",
      "title": "İfade — Civan Diyarlı (2. Oturum)",
      "date": "21.04.2025 · 14:00",
      "birth": "—",
      "occupation": "—",
      "address": "—",
      "session": 2,
      "paragraphs": [
        "S: Civan, dükkanındaydım diyorsun ama yan komşun fırıncı Şehmus o gece senin kepenkin tamamen kapalı olduğunu, içeriden çekiç sesi filan gelmediğini söylüyor. Neden yalan söyledin?",
        "C: [Gergin bir şekilde yutkunur] Çekiç sallamadım evet. Yalan söyledim çünkü şüpheleri üzerime çekmek istemedim amirim.",
        "S: Neredeydin o zaman?",
        "C: Canım çok sıkkındı. Surlara doğru yürüdüm. Hevsel bahçelerine inen yolda saatlerce tek başıma sigara içtim, yürüdüm durdum. Aklımda borcu nasıl ödeyeceğim vardı.",
        "S: Yürüyüşün saat kaça kadar sürdü?",
        "C: Gece 1'i buldu herhalde. O yüzden beni dükkanda gören olmadı.",
        "S: Bu yürüyüşü doğrulayacak kimse var mı? Yolda kimseyi görmedin mi?",
        "C: Kimseyi görmedim amirim. Karanlıktı zaten. Biliyorum bana inanmıyorsunuz ama Cevher'in o iğrenç suratını görmeye bile tahammülüm yoktu, yanına niye gideyim?"
      ],
      "signature": "C. Diyarlı",
      "metaRows": [
        {
          "label": "Doğum",
          "value": "10.10.1991"
        },
        {
          "label": "Meslek",
          "value": "Bakırcı Ustası"
        },
        {
          "label": "Adres",
          "value": "Sur, Diyarbakır"
        }
      ]
    },
    {
      "id": "civan-3",
      "suspectName": "Civan Diyarlı",
      "headerDocId": "036-C3 · Diyarbakır Emniyet Müdürlüğü · Asayiş Şube",
      "title": "İfade — Civan Diyarlı (3. Oturum)",
      "date": "21.04.2025 · 17:00",
      "birth": "—",
      "occupation": "—",
      "address": "—",
      "session": 3,
      "paragraphs": [
        "S: Kız kardeşin Ceren her şeyi anlattı Civan. Cevher'in, kız kardeşinin geçmişiyle ilgili şantaj yaptığını ve ona ahlaksız bir teklifte bulunduğunu biliyorsun. O gece bunu Ceren'dan öğrenmişsin. Hala hevsel bahçelerinde yürüyordum mu diyeceksin?",
        "C: [Yüzü kızarır, elleri titremeye başlar] O... o şerefsiz. Kardeşimi bu işe karıştırmayın amirim.",
        "S: Cevher'in dükkanında bulunan ve onu boğmakta kullanılan o kalın halı ipi... Biz o ipin senin dükkanındaki bakır tepsileri paketlerken kullandığın iplerden olduğunu biliyoruz. Civan, Cevher'i susturmak için oraya gittin, yalan söyleme artık!",
        "C: [Gözünden bir damla yaş süzülür ama sesi öfkelidir] Ben oraya o defteri almaya gittim amirim! Defteri alırsam borç da biter, şantaj da biter sandım.",
        "S: Sonra ne oldu? Boğuştunuz mu?",
        "C: Gittiğimde dükkan açıktı. İçeri daldım, masasında deftere bakıyordu. Ama yemin ederim ben ona dokunmadım! İçeri girdiğimde bir ses duydum, korkup geri kaçtım. İpi benim dükkandan kim aldıysa, Cevher'i o öldürmüştür. Mahmut öldürmüş olmasın? O da oradaymış duydum. Bizim ailemizin şerefi temizdir, ben katil değilim!"
      ],
      "signature": "C. Diyarlı",
      "metaRows": [
        {
          "label": "Doğum",
          "value": "10.10.1991"
        },
        {
          "label": "Meslek",
          "value": "Bakırcı Ustası"
        },
        {
          "label": "Adres",
          "value": "Sur, Diyarbakır"
        }
      ],
      "callouts": [
        "Failin giderek köşeye sıkıştığı son ifade. Civan olay yerinde olduğunu ve motivasyonunu kabul etti ama cinayeti itiraf etmemekte direniyor."
      ]
    },
    {
      "id": "ceren-3",
      "suspectName": "Ceren Diyarlı",
      "headerDocId": "036-B3 · Diyarbakır Emniyet Müdürlüğü · Asayiş Şube",
      "title": "İfade — Ceren Diyarlı (3. Oturum)",
      "date": "22.04.2025 · 09:30",
      "birth": "—",
      "occupation": "—",
      "address": "—",
      "session": 3,
      "paragraphs": [
        "S: Ceren, abinin dükkanında paketleme için kullanılan iplerden biriyle işlenmiş cinayet. Abin olay yerinde olduğunu kabul etti. O ipleri senin de klinikteki eşyalarını taşırken kullandığını biliyoruz.",
        "C: Amirim, abim bunu benim için yaptıysa bile o cani o ölümü hak etmişti. Bizi mahvedecekti. Tüm şehre beni rezil edecek, eski eşimin ölümü yüzünden hapiste çürütecekti. Ben abime yapma dedim, bırak polise gidelim dedim ama beni dinlemedi.",
        "S: Polise giderseniz kendinizin de suçlu duruma düşeceğinizi bildiğiniz için gitmediniz değil mi?",
        "C: Ben eski eşimi öldürmedim, o kazaydı! Cevher bunu bana karşı kullanmak için uydurdu ve tehdit etti. Abimi hapse atmayın n'olur. Bizim başka kimsemiz yok."
      ],
      "signature": "B. Diyarlı",
      "metaRows": [
        {
          "label": "Doğum",
          "value": "17.08.1997"
        },
        {
          "label": "Meslek",
          "value": "Hemşire"
        },
        {
          "label": "Adres",
          "value": "Kayapınar, Diyarbakır"
        }
      ]
    }
  ],
  "forensics": [
    {
      "id": "036-A",
      "docId": "036-A · Olay Yeri İnceleme",
      "title": "Olay Yeri Raporu",
      "meta": [
        {
          "label": "Olay tarihi referansı",
          "value": "18 Nisan 2025 · Gece 22:30 — 23:30"
        },
        {
          "label": "Hazırlayan",
          "value": "Komiser Hakan Yılmaz · Olay Yeri İnceleme"
        }
      ],
      "body": "<h3>Bulgular</h3><ol><li>Ceset, dükkanın arka odasındaki eski ahşap muhasebe masasının arkasında sırtüstü pozisyonda bulundu.</li><li>Dükkanın kepengi açık, dış kapısı kilitli değildi. Kapıda veya kilitte herhangi bir zorlama izine rastlanmadı.</li><li>Masanın üzerinde iki adet ince belli çay bardağı bulundu. Bardaklardan biri kurbanın önünde yarım, diğeri misafir koltuğunun önünde boştu.</li><li>Yerde, masaya çarpılması sonucu düşüp kırıldığı anlaşılan üçüncü bir cam bardak tespit edildi.</li><li>Dükkanı gören tek iç güvenlik kamerasının fişinin olaydan önce çekildiği anlaşıldı.</li><li>Zeminde (kısmen çamurlu) 42 numara spor ayakkabı izleri tespit edildi.</li></ol><p><strong>Ön değerlendirme:</strong> Cinayet hırsızlık amaçlı değil. Kasa dolu, vitrin sağlam. Ancak maktulün masasında olması beklenen meşhur alacak-verecek defteri ortada yok. Katil, kurbanın tanıdığı ve gece dükkana aldığı biri.</p>",
      "signature": {
        "role": "Olay Yeri İnceleme",
        "name": "Komiser Hakan Yılmaz"
      }
    },
    {
      "id": "036-B",
      "docId": "036-B · Diyarbakır Adli Tıp Kurumu",
      "title": "Otopsi Raporu",
      "meta": [
        {
          "label": "Rapor Tarihi",
          "value": "19.04.2025"
        },
        {
          "label": "Hazırlayan",
          "value": "Uzm. Dr. Ferit Çoruh · Adli Tıp Kurumu Diyarbakır Grup Başkanlığı"
        }
      ],
      "body": "<h3>Dış Muayene</h3><ul><li>Boyun bölgesinde, tiroid kıkırdağının hemen altında 1.5 cm genişliğinde tam tur atan derin ekimoz halkası (asfiksi izi).</li><li>Kurbanın sağ el parmak uçlarında ve tırnak aralarında yünlü kalın ip lifleri (kurban ipi kendi boynundan çıkarmaya çalışmış).</li><li>Ellerde, kollarda veya gövdede başkaca savunma yarası (çizik, morluk) saptanmadı.</li></ul><h3>İç Muayene</h3><ul><li>Hiyoid kemikte sağ kornuda kırık.</li><li>Akciğerlerde yaygın peteşiyal kanamalar (asfiksiye bağlı).</li><li>Toksikolojik incelemede: Alkol veya uyuşturucu maddeye rastlanmadı. Midede 1-2 saat önce tüketilmiş şekersiz siyah çay kalıntısı.</li></ul><p><strong>Ölüm nedeni:</strong> Boyna bağlanan sert bir materyalle oluşan mekanik asfiksi (boğulma).</p><p><strong>Ölüm zamanı (tahmini):</strong> 18 Nisan 2025, 22:50 — 23:10 arası.</p><h3>Kritik bulgular</h3><ul><li>Fail kurbana arkadan yaklaşmış veya kurbanın güvenini kazanıp ipi aniden boynuna dolamıştır.</li><li>Kurbanın tırnaklarında başkasına ait DNA bulunmaması, kurbanın faille boğuşmaya fırsat bulamadığını gösteriyor.</li></ul>",
      "signature": {
        "role": "Uzm. Dr.",
        "name": "Uzm. Dr. Ferit Çoruh"
      }
    }
  ],
  "evidence": [
    {
      "id": "CEV-İP01",
      "tag": "Sahne",
      "title": "Boğma İpi (Kalın Sicim)",
      "description": "Kurbanın boynundan çıkarılan, cinayette kullanılan materyal.",
      "details": [
        {
          "label": "Materyal Tipi",
          "value": "Saf kenevir halat / Kalın paketleme ipi"
        },
        {
          "label": "Çapraz Eşleşme",
          "value": "Bu kalınlıktaki ipler çarşıdaki kuyumculardan ziyade, ağır metal ve bakır ustalarının büyük tepsileri paketlerken kullandıkları spesifik bağlama ipleridir."
        }
      ]
    },
    {
      "id": "CEV-BRD02",
      "tag": "DNA",
      "title": "Masadaki Misafir Bardağı",
      "description": "Kurbanın masasında bulunan, misafire ikram edildiği anlaşılan boş çay bardağı.",
      "details": [
        {
          "label": "Tükürük Analizi",
          "value": "Civan Diyarlı'nın DNA profili ile %99.9 eşleşti."
        },
        {
          "label": "Parmak İzi",
          "value": "Sağ el işaret ve baş parmak izleri (Civan'a ait)."
        }
      ]
    },
    {
      "id": "CEV-BRD03",
      "tag": "Parmak İzi",
      "title": "Yerdeki Kırık Bardak",
      "description": "Masanın kenarından düşüp kırılan çay bardağı parçaları.",
      "details": [
        {
          "label": "Bulgu",
          "value": "Cam parçası üzerinde Mahmut Şanlı'ya ait iki adet net parmak izi."
        },
        {
          "label": "Yorum",
          "value": "Şüphelinin odaya girip masaya çarptığını ve paniklediğini doğruluyor."
        }
      ]
    },
    {
      "id": "CEV-KAS04",
      "tag": "Belge",
      "title": "İpotek ve Tapu Sözleşmesi",
      "description": "Cevher'in kasasından çıkan imzalı bir sözleşme kopyası.",
      "details": [
        {
          "label": "İçerik",
          "value": "Civan Diyarlı'nın 2.500.000 TL'lik borcuna karşılık, Ceren Diyarlı'ya ait Diclekent'teki 3 dönümlük arazinin Şanlı Kuyumculuk'a ipotek edildiği belgesi."
        },
        {
          "label": "Tarih",
          "value": "Olaydan 2 hafta öncesine ait."
        }
      ]
    },
    {
      "id": "CEV-AYK05",
      "tag": "İz",
      "title": "Çamurlu Ayakkabı İzi",
      "description": "Arka odanın zemininde tespit edilen izler.",
      "details": [
        {
          "label": "Numara",
          "value": "42 Numara"
        },
        {
          "label": "Marka/Taban",
          "value": "Nike Air Max serisine ait taban deseni."
        },
        {
          "label": "Eşleşme",
          "value": "Mahmut Şanlı'nın evinde yapılan aramada el konulan ayakkabılarıyla eşleşti."
        }
      ]
    },
    {
      "id": "CEV-TLF06",
      "tag": "Telefon",
      "title": "Cevher'in Nokia Telefonu",
      "description": "Tuşlu, eski model cep telefonu. Olay yerinde masada bulundu.",
      "details": [
        {
          "label": "Analiz",
          "value": "İletişim SMS ve WhatsApp üzerinden yapılmış (WhatsApp yüklenebilen KaiOS sistemli model)."
        },
        {
          "label": "Son İşlem",
          "value": "22:15'te Ceren'a atılan şantaj mesajı."
        }
      ]
    }
  ],
  "documents": [
    {
      "id": "036-D1",
      "docId": "036-D1 · Dosya Ekleri",
      "title": "Güvenlik Kamerası Analizi (ATM)",
      "meta": [
        {
          "label": "Tip",
          "value": "Kamera"
        },
        {
          "label": "Sıra",
          "value": "1"
        }
      ],
      "body": "<h3>Konum: Kuyumcular Çarşısı Girişi, Ziraat ATM Kamerası</h3>\n<strong>Tarih:</strong> 18 Nisan 2025<p>- <strong>22:45:</strong> Hozan Akpınar (Rakip Kuyumcu) kepengini kapatıp çarşıdan ayrılıyor.<br/>- <strong>22:52:</strong> Siyah kabanlı, başında kasket olan bir erkek şahıs (Boy ve yürüyüş analizine göre %90 Civan Diyarlı) Şanlı Kuyumculuk'a doğru yürüyor ve içeri giriyor.<br/>- <strong>23:08:</strong> Siyah kabanlı şahıs dükkandan sakin adımlarla çıkıp surların karanlık tarafına doğru uzaklaşıyor.<br/>- <strong>23:15:</strong> Farklı bir şahıs (Mahmut Şanlı) dükkana doğru yürüyor. Sadece 30 saniye sonra içeriden koşarak ve panik halinde çıkıyor.<br/>- <strong>Not:</strong> O saatten sabah 08:30'a kadar dükkana giren çıkan başka kimse kaydedilmedi.</p>"
    },
    {
      "id": "036-D2",
      "docId": "036-D2 · Dosya Ekleri",
      "title": "Mali Şube - Cevher Banka Hareketleri",
      "meta": [
        {
          "label": "Tip",
          "value": "Mali"
        },
        {
          "label": "Sıra",
          "value": "2"
        }
      ],
      "body": "<h3>Şanlı Kuyumculuk - Ticari ve Bireysel Hesap Özeti</h3><p>- Son 6 ayda hesaba düzenli ancak düzensiz tutarlarda (15.000 TL, 22.000 TL vb.) havaleler yapılmış.<br/>- Göndericiler: Çarşıdaki muhtelif esnaflar.<br/>- <strong>Açıklamalar:</strong> Hepsi 'Kira Bedeli' veya 'Elden Alınan' şeklinde yazılmış. Ancak Şanlı Kuyumculuk'un bu kişilere kiraladığı herhangi bir mülkü yok (Tefecilik faiz ödemeleri olduğu açık).<br/>- <strong>Dikkat Çeken:</strong> Civan Diyarlı son 2 aydır ödeme yapmamış. Hesaba giren son büyük meblağ yok.</p>"
    },
    {
      "id": "036-D3",
      "docId": "036-D3 · Dosya Ekleri",
      "title": "Mahmut Şanlı - Kumar Borcu Senedi",
      "meta": [
        {
          "label": "Tip",
          "value": "Sözleşme"
        },
        {
          "label": "Sıra",
          "value": "3"
        }
      ],
      "body": "<h3>Ele Geçirilen Belge</h3>\nMahmut Şanlı'nın evinde yapılan aramada yatağının altında buruşturulmuş halde bulundu.<p>- <strong>Alacaklı:</strong> Rıza 'Zar' Topçu (Yasadışı bahis işletmecisi)<br/>- <strong>Borçlu:</strong> Mahmut Şanlı<br/>- <strong>Tutar:</strong> 450.000 TL<br/>- <strong>Vade Tarihi:</strong> 19 Nisan 2025 (Cinayetin ertesi günü)</p><p>Mahmut'un babasının dükkanına panikle gitmesinin asıl nedeni bu acil borçtu.</p>"
    },
    {
      "id": "036-D4",
      "docId": "036-D4 · Dosya Ekleri",
      "title": "Ceren'ın Eski Eşinin Otopsi Özeti (5 Yıl Önce)",
      "meta": [
        {
          "label": "Tip",
          "value": "Tıbbi"
        },
        {
          "label": "Sıra",
          "value": "4"
        }
      ],
      "body": "<h3>Arşiv Dosyası: 2020-Ölüm Vakası</h3>\n<strong>Maktul:</strong> Serhat Yılmaz (Ceren Diyarlı'nın eski eşi)\n<strong>Sonuç:</strong> Kazara aşırı dozda 'Klonazepam' türevi ilaç alımına bağlı kalp durması.<strong>Soruşturma Notu:</strong> Serhat Yılmaz'ın bu ilacı reçetesiz nasıl temin ettiği bulunamamış, olay kazara zehirlenme olarak kapatılmıştı. Ceren'ın çalıştığı özel klinikte bu ilacın envanterinde o dönem eksik çıkması dikkat çekmiş ancak delil yetersizliğinden Ceren suçlanmamıştı. Cevher Şanlı'nın bu bilgiyi saklayarak yıllarca şantaj materyali yaptığı anlaşıldı."
    },
    {
      "id": "036-D5",
      "docId": "036-D5 · Dosya Ekleri",
      "title": "HTS (Baz İstasyonu) Kayıtları - Ceren",
      "meta": [
        {
          "label": "Tip",
          "value": "GSM"
        },
        {
          "label": "Sıra",
          "value": "5"
        }
      ],
      "body": "<h3>Ceren Diyarlı GSM Sinyal Analizi</h3>\n<strong>Tarih:</strong> 18 Nisan 2025 (Olay Gecesi)<p>- <strong>20:00 - 08:00:</strong> Sinyal tamamen Diyarbakır Kayapınar (Ev adresi) bölgesindeki sabit baz istasyonundan alınmıştır.<br/>- <strong>Sonuç:</strong> Ceren'ın ifadesi doğru, olay gecesi Sur bölgesine (cinayet mahalline) kesinlikle gitmedi.</p>"
    }
  ],
  "technical": [],
  "timeline": [
    {
      "id": "tl036-0",
      "time": "18.04.2025 15:30",
      "event": "Cevher, Ceren'e tapuyu devretmesi için şantaj mesajı atar.",
      "source": "036-W1",
      "critical": false
    },
    {
      "id": "tl036-1",
      "time": "18.04.2025 18:00",
      "event": "Ceren, şantajı abisi Civan'a anlatır. Civan cinayet planını kafasına koyar.",
      "source": "036-C3, 036-B2",
      "critical": false
    },
    {
      "id": "tl036-2",
      "time": "18.04.2025 20:30",
      "event": "Çırak Yasin, Cevher'in 'Birini bekliyorum' talimatıyla dükkandan ayrılır.",
      "source": "036-Y1",
      "critical": false
    },
    {
      "id": "tl036-3",
      "time": "18.04.2025 22:15",
      "event": "Cevher, telefonundan Ceren'e son bir tehdit mesajı daha gönderir.",
      "source": "CEV-TLF06",
      "critical": false
    },
    {
      "id": "tl036-4",
      "time": "18.04.2025 22:45",
      "event": "Hozan Akpınar kepengini kapatır, Civan'ın dükkana geldiğini karanlıkta görür.",
      "source": "036-H1",
      "critical": false
    },
    {
      "id": "tl036-5",
      "time": "18.04.2025 22:50",
      "event": "Civan, Cevher'in dükkanına girer. Cevher güvenlik kamerasının fişini çeker.",
      "source": "036-D1, 036-A",
      "critical": false
    },
    {
      "id": "tl036-6",
      "time": "18.04.2025 22:55",
      "event": "Civan, Cevher ile pazarlık yapıyormuş gibi görünür, masada çay içerler.",
      "source": "CEV-BRD02",
      "critical": false
    },
    {
      "id": "tl036-7",
      "time": "18.04.2025 23:00",
      "event": "Civan, Cevher arkasını döndüğünde kendi dükkanından getirdiği kenevir iple onu boğar.",
      "source": "036-B, CEV-İP01",
      "critical": true
    },
    {
      "id": "tl036-8",
      "time": "18.04.2025 23:05",
      "event": "Civan, şantaj ve borç kayıtlarını yok etmek için kırmızı defteri alır.",
      "source": "036-A",
      "critical": false
    },
    {
      "id": "tl036-9",
      "time": "18.04.2025 23:08",
      "event": "Civan dükkandan çıkarak surlara doğru uzaklaşır.",
      "source": "036-D1",
      "critical": false
    },
    {
      "id": "tl036-10",
      "time": "18.04.2025 23:15",
      "event": "Mahmut Şanlı, acil kumar borcu için babasından para istemeye dükkana gelir.",
      "source": "036-M2, 036-D3",
      "critical": false
    },
    {
      "id": "tl036-11",
      "time": "18.04.2025 23:16",
      "event": "Mahmut cesedi görür, panikle masaya çarparak çay bardağını kırar ve kaçar.",
      "source": "036-M2, CEV-BRD03, CEV-AYK05",
      "critical": true
    },
    {
      "id": "tl036-12",
      "time": "19.04.2025 08:30",
      "event": "Yasin dükkanı açar ve cesedi bularak polise haber verir.",
      "source": "036-Y1",
      "critical": false
    }
  ],
  "timelineInitialOrder": [
    "tl036-7",
    "tl036-2",
    "tl036-10",
    "tl036-0",
    "tl036-8",
    "tl036-4",
    "tl036-6",
    "tl036-1",
    "tl036-11",
    "tl036-5",
    "tl036-3",
    "tl036-9"
  ],
  "deduction": {
    "contradictions": [
      {
        "pin": true,
        "text": "<p><strong>Civan: 'Gece dükkanımda çalışıyordum'</strong> → Fırıncı Şehmus: 'Kepenkler kapalıydı, ses yoktu'</p>"
      },
      {
        "pin": true,
        "text": "<p><strong>Civan: 'Surlarda yürüyordum'</strong> → ATM Kamerası: '22:52'de kabanlı biri dükkana girdi'</p>"
      },
      {
        "pin": true,
        "text": "<p><strong>Mahmut: 'Kahvedeydim'</strong> → ATM Kamerası: '23:15'te dükkandan panikle koşarak çıktı'</p>"
      }
    ],
    "elimination": [
      {
        "pin": true,
        "text": "<p>Ceren: HTS kayıtları cinayet gecesi Sur bölgesinde olmadığını kanıtlıyor (036-D5).</p>"
      },
      {
        "pin": true,
        "text": "<p>Hozan: 22:45'te çarşıdan ayrıldığı kamera ve kendi ifadesiyle sabit.</p>"
      },
      {
        "pin": true,
        "text": "<p>Mahmut: Dükkanda sadece 30 saniye kaldı (kamera teyitli). Çay içip boğuşacak vakti yoktu, sadece cesedi bulup kaçtı.</p>"
      }
    ]
  },
  "verdict": {
    "perpetratorId": "civan",
    "perpetratorName": "Civan Diyarlı",
    "murderTime": "18 Nisan 2025, 22:50 — 23:10 arası.",
    "murderLocation": "Diyarbakır · Sur · Kuyumcular Çarşısı · Şanlı Kuyumculuk Arka Odası",
    "murderWeapon": "Kalın kenevir paketleme ipi ile boyuna dolanan mekanik asfiksi (boğulma)",
    "motivation": "Alacak-verecek defterini ve şantaj izlerini yok etmek; kız kardeşini ve aile onurunu korumak.",
    "evidenceList": [
      "CEV-BRD02: Masadaki çay bardağındaki Civan'ın DNA'sı.",
      "CEV-İP01: Boğmada kullanılan ipin bakırcı paketleme ipi olması.",
      "036-D1: ATM kamerası ile Civan'ın dükkanda olduğu saatlerin netleşmesi.",
      "036-W1: Ceren ve Cevher arasındaki şantaj mesajlaşmaları.",
      "Masadaki misafir bardağı — DNA ve parmak izi",
      "Boğma ipi — bakırcı dükkanı malzemesiyle eşleşme"
    ],
    "conclusion": "Korunma ve intikam içgüdüsüyle işlenen bu cinayet, tefecilik ve şantaj sarmalının ölümcül bir sonudur. Civan, kız kardeşini korumak için katil olmayı seçmiş, ancak geride bıraktığı DNA ve dükkanına özgü materyallerle yakayı ele vermiştir.",
    "wrongAnswerMessage": "Bu şüpheli fail değil. Otopsi zaman aralığını, ATM dükkan giriş-çıkış kayıtlarını, WhatsApp şantaj zincirini ve kırık bardaktaki izleri tekrar eşleyin.",
    "solutionDocLabel": "036-Z2 · Resmi Çözüm Belgesi",
    "solutionHtml": "<div class=\"verdict-stamp\">CLASSIFIED</div><div class=\"doc-id\" style=\"margin-bottom:12px;\">036-Z2 · Resmi Çözüm Belgesi · 23 Nisan 2025</div><h3 style=\"font-family:'Cormorant Garamond',serif;font-size:24px;margin:0 0 8px;\">Failin kimliği</h3><div class=\"verdict-name\">Civan Diyarlı</div><h3>Özet</h3><p>Civan Diyarlı, 18 Nisan 2025 saat 22:50'de borç meselesini görüşmek bahanesiyle Cevher'in dükkanına geldi. Cevher tanıdığı müşterisi olduğu için kapıyı açtı ve kamerasının fişini çekti. İkili bir süre masada oturup çay içti (Civan'ın DNA'sı). Tartışma sırasında Civan, kendi dükkanından getirdiği kenevir paketleme ipini Cevher'in boynuna arkadan dolayarak onu boğdu. Amacı hem borç defterini almak hem de kız kardeşi Ceren'e yapılan şantajı ortadan kaldırmaktı. Civan cinayetten sonra kırmızı defteri alıp 23:08'de kaçtı.</p><h3>Olay zamanlaması ve kilit nokta</h3><p><strong>Olay gecesi 22:35 civarında dükkan kamerasının fişi Cevher tarafından çekildi.</strong></p><h3>Failin kritik hatası</h3><p>Civan, boğma işleminde kendi dükkanına ait olan spesifik kenevir paketleme ipini (CEV-İP01) kullanmak ve masadaki çay bardağında (CEV-BRD02) DNA'sını bırakmak gibi iki ölümcül hata yaptı.</p><h3>İki yalancı</h3><ol><li><strong>Civan Diyarlı (Fail)</strong> — İlk oturumda kendi dükkanında çalıştığını, ikinci oturumda surlarda yürüdüğünü iddia etti. Olay yerinde olduğunu son oturuma kadar gizledi.</li><li><strong>Mahmut Şanlı</strong> — Babasıyla hiç görüşmediğini ve gece boyu kahvede olduğunu söyledi. Aslında 23:15'te dükkana gelip cesedi bulmuş, panikle bardağı kırmış ve korktuğu için kaçmıştı.</li></ol><h3>Kırmızı ringalar</h3><p><strong>Ceren Diyarlı:</strong> Cevher tarafından açıkça şantaja uğruyordu ve kurbanı öldürmek için geçerli güçlü bir sebebi vardı. Ancak HTS kayıtları onun olay yerinde olmadığını kanıtladı.</p><p><strong>Mahmut Şanlı:</strong> Oğlu olarak miras beklentisi ve babasıyla düşmanlığı vardı. Yerdeki kırık bardakta parmak izi bulundu, ancak zaman çizelgesi onun sadece olay sonrasında geldiğini ortaya koydu.</p><h3>Dayanılan kritik deliller</h3><ol><li>CEV-BRD02: Masadaki çay bardağındaki Civan'ın DNA'sı.</li><li>CEV-İP01: Boğmada kullanılan ipin bakırcı paketleme ipi olması.</li><li>036-D1: ATM kamerası ile Civan'ın dükkanda olduğu saatlerin netleşmesi.</li><li>036-W1: Ceren ve Cevher arasındaki şantaj mesajlaşmaları.</li></ol><p style=\"background:rgba(107,22,32,.12);padding:16px;border-left:3px solid var(--bordeaux);margin-top:24px;\"><strong>SONUÇ:</strong> Korunma ve intikam içgüdüsüyle işlenen bu cinayet, tefecilik ve şantaj sarmalının ölümcül bir sonudur. Civan, kız kardeşini korumak için katil olmayı seçmiş, ancak geride bıraktığı DNA ve dükkanına özgü materyallerle yakayı ele vermiştir.</p><p style=\"margin-top:18px;\"><strong>Tutuklama:</strong> 23 Nisan 2025 · Civan Diyarlı, Sur'daki bakırcı dükkanında gözaltına alınmıştır.</p><div class=\"doc-signature\"><div class=\"sig-line\">Kıdemli Kriminal Analist · D.A.K.T.</div><div class=\"sig-name\">Onaylı</div></div>"
  },
  "tabSectionSub": {
    "brief": "036-A · Olay özeti",
    "adli-tip": "036-B · Otopsi",
    "deliller": "Fiziksel deliller",
    "belgeler": "036-W1 · WhatsApp",
    "teknik": "Teknik ek",
    "cozum": "036-Z2 · Sınırlı erişim"
  }
};

// MessageThread referansını CaseData'ya bağla
(case036 as any).messageThreads = case036MessageThreads;
