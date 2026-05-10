import type { CaseData } from "@/lib/case-types";
import { case027MessageThreads } from "./027-message-threads";

export const case027: CaseData = {
  "id": "027",
  "codename": "Güverte",
  "fullTitle": "Vaka № 027 — Güverte Cinayeti",
  "status": "active",
  "difficulty": "Zor",
  "recommendedPlayers": "2–4 analist",
  "location": "Antalya · Kemer Açıkları · MV Poseidon Kruvaziyeri",
  "victim": "Rıza Tunalı (62, erkek)",
  "date": "15 Ağustos 2025 · Gece 02:00 — 03:00",
  "shortSummary": "Antalya açıklarında kruvaziyerde VIP jakuzi cinayeti. Kameraları sahte kesinti süresi bağladı.",
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
    "subtitle": "MV Poseidon · VIP Güverte · 15 Ağustos 2025",
    "metaPairs": [
      {
        "label": "Vaka No",
        "value": "027"
      },
      {
        "label": "Dosya Tipi",
        "value": "Cinayet — Mekanik asfiksi / sedatif — Yüksek öncelik"
      },
      {
        "label": "Olay tarihi (aralık)",
        "value": "15 Ağustos 2025 · Gece 02:00 — 03:00"
      },
      {
        "label": "Konum",
        "value": "Antalya · Kemer Açıkları · MV Poseidon Kruvaziyeri"
      },
      {
        "label": "Kurban",
        "value": "Rıza Tunalı (62, erkek)"
      },
      {
        "label": "Olay zamanı (tahmin)",
        "value": "Gece 02:15 — 02:30 (tahmini)"
      }
    ],
    "sections": [
      {
        "title": "Olay",
        "body": "<p>15 Ağustos gecesi, Antalya Kemer açıklarında seyreden lüks kruvaziyer MV Poseidon'da, geminin sahibi ünlü armatör Rıza Tunalı, VIP kamarasının özel balkonundaki jakuzide ölü bulundu. İlk bakışta alkol zehirlenmesine bağlı kalp krizi veya boğulma gibi görünse de, otopsi raporu olayın sıradan bir kaza olmadığını ortaya koyacaktır. Kurbanın kanında bulunan yüksek dozdaki sedatif ilaçlar ve boyun bölgesindeki hafif baskı izleri, bunun planlı bir cinayet olduğunu gösteriyor.</p>"
      },
      {
        "title": "Özet (1)",
        "body": "<p>Soruşturmayı zorlaştıran en büyük faktör, cinayet saatinde VIP güvertenin kameralarında tam 15 dakikalık bir 'kısa devre' kaynaklı kesinti yaşanmasıdır. Bu süre zarfında katil, kurbanın balkonuna ulaşmış, işini bitirmiş ve güverteden ayrılmıştır. Olay yeri açık deniz, ancak katil hala gemide, yolcuların veya mürettebatın arasında saklanmaktadır.</p>"
      },
      {
        "title": "Mağdur profili",
        "body": "<p>Rıza Tunalı (62), sektörde acımasızlığıyla tanınan, her şeyi ve herkesi kontrol etmeyi seven bir armatördü. Son yıllarda sağlık sorunları yaşamaya başlamış, ancak şirketini devretmemek için direnmiştir. Oğlu Cem ile ilişkisi her zaman çatışmalı olmuştur. Özel hayatında ise kendisinden oldukça genç olan nişanlısı Damla ile fırtınalı bir ilişki içindedir. Son günlerde agresif tavırları artmış, vasiyetini değiştirmeyi planladığı dedikoduları gemide yayılmaya başlamıştır.</p>"
      },
      {
        "title": "Kayıt / kamera",
        "body": "<p>VIP Güverte Güvenlik Kamerası (Gece 02:15 - 02:30 arası şüpheli elektrik kesintisi)</p>"
      },
      {
        "title": "Görev",
        "body": "<p>Sınırlı bir kapalı alan olan gemide, o gece VIP güverteye erişimi olan şüphelilerin ifadelerini çapraz sorguya çek ve yalan söyleyenleri tespit et. Cinayet saatindeki karanlık 15 dakikanın şifresini çöz.</p>"
      },
      {
        "title": "Uyarı",
        "body": "<p style=\"background:rgba(107,22,32,0.1);padding:12px 16px;border-left:3px solid var(--bordeaux);\">Kurban direnmemiş ve jakuzide pasif halde ölüme terk edilmiştir. Katil büyük ihtimalle kurbanın zaaflarını veya sağlık durumunu kendi lehine kullanmıştır.</p>"
      }
    ],
    "signature": {
      "role": "Düzenleyen\nDeniz Güvenlik Koordinasyon Birimi",
      "name": "Bşçvş. Ö. Erdem"
    }
  },
  "suspects": [
    {
      "id": "pinar",
      "code": "SUSP-01 · GVR-SAĞ/PK",
      "name": "Pınar Korkmaz",
      "role": "Özel Hemşire / Bakıcı",
      "quote": "\"O gece ilacını verdim ve odama çekildim. Zaten uyumuştu.\""
    },
    {
      "id": "cem",
      "code": "SUSP-02 · GVR-YÖN/CT",
      "name": "Cem Tunalı",
      "role": "Rıza'nın Oğlu / YK Üyesi",
      "quote": "\"Babam şirketi bir harabeye çeviriyordu, ama onu öldürecek kadar aptal değilim.\""
    },
    {
      "id": "hulya",
      "code": "SUSP-03 · GVR-MÜR/HA",
      "name": "Hülya Adıgüzel",
      "role": "Kruvaziyer Direktörü",
      "quote": "\"Benim tek derdim yolcuların güvenliğiydi, Rıza Bey'in özel hayatı değil.\""
    },
    {
      "id": "aras",
      "code": "SUSP-04 · GVR-KPT/AE",
      "name": "Aras Eraslan",
      "role": "Gemi Kaptanı",
      "quote": "\"Köşkteydim, rotayı kontrol ediyordum. Elektrik kesintisi tamamen teknik bir arızaydı.\""
    },
    {
      "id": "bekir",
      "code": "SUSP-05 · GVR-MÜR/Bİ",
      "name": "Bekir İskenderun",
      "role": "Güverte Barmeni",
      "quote": "\"O saatte barı kapatıyordum, yukarıda neler döndüğünü bilemem.\""
    },
    {
      "id": "damla",
      "code": "SUSP-06 · GVR-VIP/DA",
      "name": "Damla Aydoğan",
      "role": "Rıza'nın Nişanlısı",
      "quote": "\"Biz tartışmadık, sadece biraz hava almak istediğini söyledi.\""
    }
  ],
  "testimonies": [
    {
      "id": "aras-1",
      "suspectName": "Aras Eraslan",
      "headerDocId": "027-D1 · Sahil Güvenlik Kriminal Büro",
      "title": "İfade — Aras Eraslan (1. Oturum)",
      "date": "15.08.2025 · 09:30",
      "birth": "12.04.1983",
      "occupation": "Gemi Kaptanı (MV Poseidon)",
      "address": "Mersin / Yenişehir",
      "session": 1,
      "paragraphs": [
        "S: Kaptan Bey, dün gece gemide yaşanan olaylarla ilgili bildiklerinizi anlatır mısınız? Navigasyon kayıtlarına göre gece boyu açık denizdeydiniz.\nC: Doğrudur komiserim. Kemer açıklarında, rüzgarsız, son derece sakin bir seyir halindeydik. Geminin tüm teknik parametreleri normaldi. Ben bizzat kaptan köşkünde, birinci zabitimle birlikte nöbetteydim. Olayı sabah 02:45 sularında Hülya Hanım'ın köprü üstünü aramasıyla öğrendim. Hemen acil durum protokolünü devreye sokup, tıbbi ekibi VIP güverteye yönlendirdim ama maalesef iş işten geçmişti.\nS: Bize VIP güvertedeki şu elektrik ve kamera kesintisinden bahsedin. Tam olarak 02:15 ile 02:30 arası.\nC: [İç çeker] Bakın, bu gemi son teknolojiyle donatılmıştır ama deniz şartlarında bazen lokal şalter atmaları yaşanabilir. Teknik ekibimizin incelemesine göre, VIP güvertenin bulunduğu koridordaki lokal sigorta paneli aşırı yüklenmeden veya manuel bir müdahaleden dolayı atmış. Bu, geminin ana seyir sistemlerini veya genel jeneratörleri etkilemez. Sadece o kattaki aydınlatma ve iki güvenlik kamerasını devre dışı bıraktı.\nS: Manuel bir müdahale dediniz. Biri kasten şarteli indirmiş olabilir mi?\nC: Teorik olarak evet. Sigorta kutusu, hemşirenin malzeme odasının hemen girişinde, duvarda yer alıyor. Herhangi bir mürettebat anahtarı o paneli açabilir.\nS: Rıza Bey'in ölümüyle ilgili sizin veya personelinizin herhangi bir anlaşmazlığı var mıydı?\nC: Rıza Bey patronumuzdu. Zor bir adamdı, bunu herkes bilir. Son zamanlarda gemiyi komple bir Alman grubuna satacağından bahsediyordu. Açıkçası bu durum tüm mürettebatı, beni de dahil, işsiz kalma korkusuyla strese sokmuştu. Ama takdir edersiniz ki, maaşımı ödeyen adamı jakuzide öldürmek benim sorunlarımı çözmez."
      ],
      "signature": "A. Eraslan",
      "callouts": [
        "Sigorta paneline erişim, VIP kattaki malzeme odasından (Pınar'ın alanı) sağlanabiliyor. Elektrik kesintisinin rastgele bir arıza olmadığı kesin."
      ]
    },
    {
      "id": "hulya-1",
      "suspectName": "Hülya Adıgüzel",
      "headerDocId": "027-D2 · Sahil Güvenlik Kriminal Büro",
      "title": "İfade — Hülya Adıgüzel (1. Oturum)",
      "date": "15.08.2025 · 10:15",
      "birth": "08.11.1970",
      "occupation": "Kruvaziyer Direktörü",
      "address": "Antalya / Muratpaşa",
      "session": 1,
      "paragraphs": [
        "S: Hülya Hanım, gemideki tüm yolcu ilişkileri ve genel düzenden siz sorumlusunuz. Rıza Bey'in son günlerdeki durumu nasıldı?\nC: Rıza Bey her zamankinden daha asabiydi. Seyahat başladığından beri herkesle kavga ediyordu. Özellikle dün akşam yemekte tam bir kriz yaşandı. Oğlu Cem Bey ile herkesin içinde büyük bir tartışmaya girdiler. Şirket hisseleri, devir işlemleri... Rıza Bey bağırarak, 'Bu gemiyi de, şirketi de satıp ikinize de zırnık koklatmayacağım!' dedi.\nS: İkinize de derken? Diğeri kimdi?\nC: Nişanlısı Damla Hanım. Damla masayı ağlayarak terk etti. Cem Bey de çok öfkeliydi. Ben olayı yatıştırmak için diğer yolcuların dikkatini dağıtmaya çalıştım. Rıza Bey daha sonra kendi süitine kapandı ve kimseyi görmek istemediğini söyledi.\nS: Gece 02:00 sularında siz neredeydiniz?\nC: Ben alt kattaki personelin vardiya değişimini organize ediyordum. Saat 01:30'da ana salondaki parti bitmişti, temizlik ekiplerini yönlendiriyordum. 02:30 civarı dinlenmek için kendi kamarama geçtim. 02:40 gibi Cem Bey'in bağırışlarını duyup VIP güverteye koştuğumda, Rıza Bey'i suyun içinde bulduk.\nS: Elektrik kesintisinden haberiniz var mıydı?\nC: Sadece bizim telsizlerden bir anons geçtiğini duydum, 'VIP koridorunda ışıklar gitti, teknik ekip baksın' dendi ama 15 dakika içinde geri geldiği için üzerinde durmadık. Benim tek derdim yolcuların güvenliğiydi, Rıza Bey'in özel hayatı ve kaprisleri değil."
      ],
      "signature": "H. Adıgüzel",
      "callouts": [
        "Rıza Bey olay akşamı oğlu Cem ve nişanlısı Damla ile şiddetli bir tartışma yaşamış. Vasiyet ve geminin satışı gündemdeymiş."
      ]
    },
    {
      "id": "bekir-1",
      "suspectName": "Bekir İskenderun",
      "headerDocId": "027-D3 · Sahil Güvenlik Kriminal Büro",
      "title": "İfade — Bekir İskenderun (1. Oturum)",
      "date": "15.08.2025 · 11:00",
      "birth": "22.05.2000",
      "occupation": "Güverte Barmeni",
      "address": "Hatay / İskenderun",
      "session": 1,
      "paragraphs": [
        "S: Bekir, gece VIP güverteye servis yapmışsın. Saat tam olarak kaçtı ve neler gördün?\nC: Evet amirim. Saat 01:25 civarıydı. Rıza Bey dahili hattan arayıp özel bir İskoç viskisi istedi. Çok sinirli bir sesi vardı, 'Çabuk getir, kimseyi de görmek istemiyorum' diye bağırdı. Tepsiyi hazırlayıp asansörle en üst kata çıktım.\nS: İçeri girdin mi?\nC: [Gergin bir şekilde] Hayır, hayır kesinlikle içeri girmedim. VIP süitin kapısını çaldım, Pınar hemşire açtı. Yüzü asıktı. 'Ver onu bana Bekir, ben içeri götürürüm' dedi. Şişeyi ve bardağı ona teslim edip hemen aşağı, kendi çalıştığım lobi bara döndüm.\nS: Saat 02:15'te nerede olduğunu kanıtlayabilir misin?\nC: Tabii ki. 02:00'de barı kapattım. Kasa hesabını alıyordum. Kameralarda vardır, lobi bardan hiç ayrılmadım. O saatte barı kapatıyordum, yukarıda neler döndüğünü bilemem.\nS: Cem Bey'i o gece gördün mü?\nC: [Yutkunur] Şey... Evet. 02:05 gibiydi, barın önünden hızlıca asansörlere doğru geçti. Yüzü kıpkırmızıydı, çok öfkeli görünüyordu. 'Bir şey ister misiniz Cem Bey' diyecek oldum, beni duymazdan gelip asansöre bindi. VIP güverteye giden tek asansördü o.\nS: Başka dikkatini çeken bir şey?\nC: Rıza Bey bana hep çok kötü davranırdı. Geçen hafta herkesin içinde tepsiyi düşürdüm diye bana hakaretler yağdırıp işten kovmakla tehdit etmişti. Bunu saklamıyorum, ondan nefret ederdim."
      ],
      "signature": "B. İskenderun",
      "callouts": [
        "Bekir, Cem'in olay saatinde (02:05) öfkeli bir şekilde VIP güverteye doğru çıktığını iddia ediyor."
      ]
    },
    {
      "id": "damla-1",
      "suspectName": "Damla Aydoğan",
      "headerDocId": "027-D4 · Sahil Güvenlik Kriminal Büro",
      "title": "İfade — Damla Aydoğan (1. Oturum)",
      "date": "15.08.2025 · 11:45",
      "birth": "03.09.1994",
      "occupation": "Model / Nişanlı",
      "address": "İstanbul / Beşiktaş",
      "session": 1,
      "paragraphs": [
        "S: Damla Hanım, başınız sağ olsun. Akşam yemekte yaşanan gerginlikten başlayalım. Rıza Bey'le ne sorununuz vardı?\nC: [Gözyaşlarını silerek] Teşekkürler komiserim. O sadece küçük bir krizdi. Rıza son zamanlarda ilaçlarının dozu yüzünden çok dengesizleşmişti. Sürekli her şeyden şüphe ediyordu. Evlilik sözleşmemizi tek taraflı olarak iptal edeceğini söyledi masada. Bu beni çok kırdı. Onu sevdiğim için yanındaydım, parası için değil!\nS: Masadan kalktıktan sonra ne yaptınız?\nC: Kendi kamarama gittim. Biz Rıza ile ayrı kamaralarda kalıyorduk, malum hastalığından dolayı hemşiresi hep yanında olmak zorundaydı. Gece 01:00 civarı Rıza beni aradı. Sesi yorgundu. 'Biraz yalnız kalmak istiyorum, jakuziye gireceğim, sabah konuşuruz' dedi. Biz tartışmadık, sadece biraz hava almak istediğini söyledi.\nS: Pınar Korkmaz hakkında ne düşünüyorsunuz?\nC: O kız... Başından beri Rıza'ya gereğinden fazla yakın davranıyordu. Sadece bir hemşire gibi değildi, Rıza'nın her şeyini kontrol etmek istiyordu. Sürekli kulağına bir şeyler fısıldar, ilaçlarını bahane edip beni odadan çıkarırdı. Rıza o gece o viskiyi içmemeliydi! Pınar bunu nasıl engellemez?\nS: Cinayet saatinde, 02:15'te odanızda mıydınız?\nC: Evet, odamdaydım. Ağlıyordum, çok üzgündüm. Uyumamış olabilirim ama dışarı adımımı atmadım."
      ],
      "signature": "D. Aydoğan",
      "callouts": [
        "Damla evlilik sözleşmesinin iptali nedeniyle Rıza ile çatışma halinde. Pınar hemşireyi doğrudan suçlama eğiliminde."
      ]
    },
    {
      "id": "cem-1",
      "suspectName": "Cem Tunalı",
      "headerDocId": "027-D5 · Sahil Güvenlik Kriminal Büro",
      "title": "İfade — Cem Tunalı (1. Oturum)",
      "date": "15.08.2025 · 13:00",
      "birth": "19.01.1991",
      "occupation": "Yönetim Kurulu Üyesi",
      "address": "İstanbul / Kadıköy",
      "session": 1,
      "paragraphs": [
        "S: Cem Bey, babanızın ölümünden dolayı taziyelerimi sunarım. Fakat şirket devri ve miras konularında ciddi tartışmalar yaşadığınızı biliyoruz.\nC: [Alaycı bir gülüş] Sağ olun komiserim. Babamın arkasından sahte gözyaşı dökecek değilim. Aramızdaki ilişki hep felaketti. Şirketi yıllar önce ben yönetmeye başlamalıydım ama o, o lanet olası koltuğu bırakmamak için her şeyi yaptı. Son zamanlarda da o genç nişanlısı yüzünden şirketin içini boşaltmaya kalkıştı.\nS: Dün gece restoranda ona bağırdığınızı herkes duymuş. Onu öldürmekle tehdit ettiniz mi?\nC: Tartıştık evet. O beni varisimlikten reddetmekle tehdit etti, ben de ona eğer şirketi Almanlara satarsa onu mahkemeye verip vesayet altına aldıracağımı söyledim. Babam şirketi bir harabeye çeviriyordu, ama onu öldürecek kadar aptal değilim. Miras zaten bana kalacaktı.\nS: Gece 02:00 ile 02:30 arasında neredeydiniz?\nC: Geminin alt katındaki casinodaydım komiserim. Orada bir sürü insan vardı. 03:00'e kadar rulet masasında oturdum, kafa dağıtıyordum. İsterseniz kameralara sorun. Yukarı çıkmadım bile.\nS: Babanızı ölü bulan siz değil miydiniz?\nC: 02:40'ta uyumak için odama çıkarken merak edip kapısını çaldım. Kapı aralıktı. İçeri girdiğimde balkondaki jakuzinin içinde hareketsiz yatıyordu. Hemen Hülya'yı ve kaptanı aradım."
      ],
      "signature": "C. Tunalı",
      "callouts": [
        "Cem, babasıyla olan husumetini inkar etmiyor ancak cinayet saatinde casinoda olduğunu iddia ediyor. Casino kameralarının incelenmesi şart."
      ]
    },
    {
      "id": "pinar-1",
      "suspectName": "Pınar Korkmaz",
      "headerDocId": "027-D6 · Sahil Güvenlik Kriminal Büro",
      "title": "İfade — Pınar Korkmaz (1. Oturum)",
      "date": "15.08.2025 · 14:15",
      "birth": "10.10.1997",
      "occupation": "Özel Hemşire",
      "address": "İstanbul / Şişli",
      "session": 1,
      "paragraphs": [
        "S: Pınar Hanım, Rıza Bey'in medikal durumundan tamamen siz sorumluydunuz. O gece yaşananları anlatır mısınız?\nC: [Sakin ve profesyonel] Komiserim, ben işimi yapıyordum. Rıza Bey son zamanlarda tansiyon atakları geçiriyordu. Saat 01:30 civarında barmen Bekir sipariş edilen viskiyi getirdi. Ben viskiyi aldım, Rıza Bey o sırada balkonda oturmuş denizi izliyordu.\nS: Ona herhangi bir ilaç verdiniz mi?\nC: Gece alması gereken rutin, çok hafif bir uyku ilacı vardı. O gece ilacını verdim ve odama çekildim. Zaten uyumuştu, yani uyuyacağını söylemişti. Viski ile ilacı birlikte almaması konusunda onu uyardım ama Rıza Bey talimat almayı seven biri değildi.\nS: Siz ne zaman odadan çıktınız?\nC: Saat 01:45 gibi. VIP süitin hemen yanındaki personel kamaramda kalıyorum. Oraya geçip kapımı kilitledim.\nS: Elektrik kesintisi olduğunda neredeydiniz? Neden müdahale etmediniz?\nC: Ben o sırada derin bir uykudaydım. Benim odamın elektriği, VIP süitin şalterinden bağımsız. Yani odam karanlıkta kalmadı. 02:45'te Hülya Hanım beni arayana kadar hiçbir şey duymadım. Balkona çıktığımda Cem Bey oradaydı, Rıza Bey suyun içindeydi.\nS: Rıza Bey'in ailesi, Damla Hanım özellikle, sizinle kurban arasında sadece profesyonel bir ilişki olmadığını iddia ediyor.\nC: Damla Hanım kıskanç ve güvensiz bir kadın. Rıza Bey bana güvenirdi çünkü onun krizlerini yönetebilen tek kişi bendim."
      ],
      "signature": "P. Korkmaz",
      "callouts": [
        "Pınar soğukkanlı ve sadece hafif bir uyku ilacı verdiğini iddia ediyor. Kurbanın ilacı alkolle kasten karıştırmış olabileceği imasında bulunuyor."
      ]
    },
    {
      "id": "damla-2",
      "suspectName": "Damla Aydoğan",
      "headerDocId": "027-D7 · Sahil Güvenlik Kriminal Büro",
      "title": "İfade — Damla Aydoğan (2. Oturum)",
      "date": "15.08.2025 · 16:30",
      "birth": "—",
      "occupation": "—",
      "address": "—",
      "session": 2,
      "paragraphs": [
        "S: Damla Hanım, ilk ifadenizde odanızdan hiç çıkmadığınızı söylemiştiniz. Ancak bir temizlik görevlisi sizi saat 02:10'da VIP koridorda, Rıza Bey'in süitinin kapısında ağlarken görmüş. Neden yalan söylediniz?\nC: [Elleri titreyerek yüzünü kapatır] Yalan söylemek istemedim, sadece şüpheli durumuna düşmekten korktum! Evet, 02:10'da yukarı çıktım. Evlilik sözleşmesinin iptali konusunu onunla tekrar konuşmak, onu ikna etmek istedim.\nS: İçeri girdiniz mi? Rıza Bey ne durumdaydı?\nC: Kapı kilitli değildi, aralıktı. İçeri girdim, balkona doğru yürüdüm. Rıza jakuzinin içindeydi. Elinde viski bardağı vardı.\nS: Saat 02:10'da Rıza Bey hayatta mıydı yani?\nC: Evet! Yaşıyordu! Ama çok tuhaf görünüyordu. Gözleri kaymıştı, eliyle göğsünü tutuyordu. Bana doğru elini salladı, 'Git buradan, Pınar'ı çağır, midem bulanıyor' dedi. Sesi o kadar kısık ve hırıltılıydı ki korktum.\nS: Pınar'ı çağırdınız mı peki?\nC: [Ağlayarak] Hayır! O an o kadar öfkeliydim ki... Bana o haldeyken bile o kızı soruyordu. 'Ne halin varsa gör' deyip odadan çıktım. Elektrik falan kesilmemişti o sırada, ışıklar yanıyordu. Yemin ederim ben çıktığımda hala suyun üstünde oturuyordu, boğulmuyordu!\nS: Onu o halde bırakıp gittiniz. Bu ihmalden ölüme sebebiyet vermektir Damla Hanım.\nC: Bilmiyordum! Sadece sarhoş olduğunu düşündüm."
      ],
      "signature": "D. Aydoğan",
      "metaRows": [
        {
          "label": "Not",
          "value": "Temizlik personelinin Damla'yı 02:10'da VIP koridorda ağlarken gördüğünü belirtmesi üzerine tekrar çağrıldı."
        },
        {
          "label": "Doğum",
          "value": "03.09.1994"
        },
        {
          "label": "Meslek",
          "value": "Model / Nişanlı"
        },
        {
          "label": "Adres",
          "value": "İstanbul / Beşiktaş"
        }
      ],
      "callouts": [
        "Damla olay saatinde (02:10) kurbanı yaşıyor halde ancak kriz geçirirken görmüş. Kurbanın o saatte fiziksel bir çöküşe geçtiği doğrulandı."
      ]
    },
    {
      "id": "cem-2",
      "suspectName": "Cem Tunalı",
      "headerDocId": "027-D8 · Sahil Güvenlik Kriminal Büro",
      "title": "İfade — Cem Tunalı (2. Oturum)",
      "date": "15.08.2025 · 17:15",
      "birth": "—",
      "occupation": "—",
      "address": "—",
      "session": 2,
      "paragraphs": [
        "S: Cem Bey, casino kameraları sizin 03:00'e kadar orada olduğunuzu doğrulamıyor. 02:05'te casinodan ayrılmışsınız. Nereye gittiniz?\nC: [Gömleğinin yakasını gevşetir] Tamam, kahretsin. Haklısınız. 02:05'te casinodan çıktım çünkü babamın o aptal nişanlısıyla veya vasiyet avukatlarıyla bir şeyler çevirdiğini düşündüm. VIP kata çıktım.\nS: Saat kaçta babanızın kapısındaydınız?\nC: 02:08 falandı. Ama içeri girmedim!\nS: Neden?\nC: Çünkü kapıya yaklaştığımda içeriden sesler geliyordu. Babam biriyle tartışıyordu.\nS: Kiminle?\nC: Kadın sesiydi ama Damla mıydı yoksa Pınar mıydı emin değilim. Babamın sesi boğuk çıkıyordu. 'Bunu bana yapamazsın' gibi bir şey dediğini duydum. Ben de aralarına girmemek için, biraz da midem bulandığı için geri döndüm, alt güverteye inip hava aldım.\nS: Geri döndünüz dediniz. Oysa 02:40'ta onu ölü buldunuz. O saate kadar nerede hava alıyordunuz?\nC: Söyledim ya, alt güvertede dolaşıyordum. Saat 02:40'ta tekrar yukarı çıktığımda ışıkların bir kısmı sönüktü. Odaya girdiğimde onu o halde buldum. Bakın komiserim, babamdan nefret ederdim ama onu ben öldürmedim."
      ],
      "signature": "C. Tunalı",
      "metaRows": [
        {
          "label": "Not",
          "value": "Casino kamera kayıtlarında Cem'in 02:05'te casinodan ayrıldığı tespit edildi."
        },
        {
          "label": "Doğum",
          "value": "19.01.1991"
        },
        {
          "label": "Meslek",
          "value": "Yönetim Kurulu Üyesi"
        },
        {
          "label": "Adres",
          "value": "İstanbul / Kadıköy"
        }
      ],
      "callouts": [
        "Cem 02:08'de oradaydı ve içeriden kadın sesi duyduğunu iddia ediyor. Damla'nın 02:10'da orada olduğu biliniyor. Hikayeler örtüşüyor."
      ]
    },
    {
      "id": "pinar-2",
      "suspectName": "Pınar Korkmaz",
      "headerDocId": "027-D9 · Sahil Güvenlik Kriminal Büro",
      "title": "İfade — Pınar Korkmaz (2. Oturum)",
      "date": "15.08.2025 · 18:30",
      "birth": "—",
      "occupation": "—",
      "address": "—",
      "session": 2,
      "paragraphs": [
        "S: Pınar Hanım, adli tıp uzmanları bize çok ilginç bir rapor sundu. Rıza Bey'in kanında sadece ağızdan alınan hap değil, doğrudan damar yolundan enjekte edilmiş ölümcül dozda 'Zolpidex' bulundu. Bu sizin 'hafif uyku ilacı verdim' beyanınızla tamamen çelişiyor.\nC: [Gergin bir şekilde elleriyle oynamaya başlar] Ben... Bakın, ben ona damar yoluyla hiçbir şey vermedim! Rıza Bey kendi ilaçlarını zaman zaman kendisi alırdı. Son günlerde acıları artmıştı. Benim tıbbi çantamdan enjektör ve Zolpidex çalmış olabilir.\nS: Damla Hanım, 02:10'da kurbanı jakuzide kriz geçirirken görmüş. Kurban sizden yardım istemesini söylemiş. Ancak siz 01:45'ten beri uyuduğunuzu iddia ediyorsunuz.\nC: Zaten uyuyordum! Neden bana inanmıyorsunuz? Damla o adamın servetine çökmek için yalan söylüyor. Eğer benden yardım isteseydi, odalarımız yan yana, duvardan seslense duyardım.\nS: VIP kattaki elektrik şalterinin sizin malzeme odanızda olduğunu biliyoruz. Kameraların kör olduğu o 15 dakika sizin kontrolünüzdeydi, değil mi?\nC: [Sesi yükselir] Bu bir komplo! Cem Bey babasını öldürüp suçu benim üzerime yıkmaya çalışıyor. O sigorta kutusu her an açık duruyor, asansörle çıkan herkes oraya girip şalteri indirebilir. İlacı Rıza Bey viskiyle birlikte kendi kendine aşırı doz olarak aldı, olan biten bu!"
      ],
      "signature": "P. Korkmaz",
      "metaRows": [
        {
          "label": "Not",
          "value": "İlk otopsi raporunda kurbanın kanında ölümcül dozda intravenöz (damar yoluyla) uygulanmış sedatif bulundu."
        },
        {
          "label": "Doğum",
          "value": "10.10.1997"
        },
        {
          "label": "Meslek",
          "value": "Özel Hemşire"
        },
        {
          "label": "Adres",
          "value": "İstanbul / Şişli"
        }
      ],
      "callouts": [
        "Pınar'ın sakinliği kırıldı. Zolpidex damar yolundan uygulandığı için kurbanın bunu karanlıkta jakuzide kendi kendine yapması imkansız."
      ]
    },
    {
      "id": "cem-3",
      "suspectName": "Cem Tunalı",
      "headerDocId": "027-D10 · Sahil Güvenlik Kriminal Büro",
      "title": "İfade — Cem Tunalı (3. Oturum)",
      "date": "15.08.2025 · 19:45",
      "birth": "—",
      "occupation": "—",
      "address": "—",
      "session": 3,
      "paragraphs": [
        "S: Cem Bey, yalanlarınızın sonuna geldik. Kapıdaki dijital kilit kayıtlarına göre 02:20'de kendi yedek kartınızı kullanarak Rıza Bey'in süitine girmişsiniz. Elektriklerin kesik olduğu o 15 dakikanın tam ortasında.\nC: [Başını ellerinin arasına alır] Tamam. Avukatımı istemiyorum, dürüst olacağım. Evet, 02:20'de içeri girdim. Karanlıktı. Balkondan boğuk su sesleri geliyordu.\nS: Babanızı siz mi öldürdünüz?\nC: Hayır! Yemin ederim ben yapmadım! Balkona çıktığımda babam suyun içindeydi, yüzüstü yatıyordu. Jakuzi köpürüp duruyordu. Onu sudan çıkarmaya çalıştım ama çok ağırdı, o sırada boynunu tuttum. Nefes almıyordu.\nS: Neden yardım çağırmadınız? Neden 02:40'a kadar beklediniz?\nC: Çünkü panikledim! Aramızdaki o kavgadan sonra herkesin beni suçlayacağını biliyordum. Karanlıkta, babamın ölü bedeniyle orada yakalanmak istemedim. Çıktım, üstümü sildim. Sonra hiçbir şey olmamış gibi 02:40'ta tekrar yukarı çıkıp onu 'yeni bulmuş' gibi yaptım.\nS: Karanlıkta odada başka birini hissettiniz mi?\nC: Odaya ilk girdiğimde, personel kapısının yavaşça kapandığını duydum. Orada biri vardı komiserim. O odaya sadece dışarıdan değil, içeriden de girildi."
      ],
      "signature": "C. Tunalı",
      "metaRows": [
        {
          "label": "Not",
          "value": "Kamarotid kilit kayıtlarında Cem'in 02:20'de VIP odaya girdiği tespit edildi."
        },
        {
          "label": "Doğum",
          "value": "19.01.1991"
        },
        {
          "label": "Meslek",
          "value": "Yönetim Kurulu Üyesi"
        },
        {
          "label": "Adres",
          "value": "İstanbul / Kadıköy"
        }
      ],
      "callouts": [
        "Cem 02:20'de kurbanı ölü bulduğunu ve korkup sakladığını itiraf etti. Boynundaki baskı izleri kurbanı sudan çıkarmaya çalışmasından kaynaklı."
      ]
    },
    {
      "id": "pinar-3",
      "suspectName": "Pınar Korkmaz",
      "headerDocId": "027-D11 · Sahil Güvenlik Kriminal Büro",
      "title": "İfade — Pınar Korkmaz (3. Oturum)",
      "date": "15.08.2025 · 21:00",
      "birth": "—",
      "occupation": "—",
      "address": "—",
      "session": 3,
      "paragraphs": [
        "S: Pınar Korkmaz. Oyun bitti. Odanda yapılan aramada, çöp kutusunun dibine saklanmış boş bir Zolpidex enjektörü ve tuzlu jakuzi suyuyla sırılsıklam olmuş bir havlu bulduk. Cem 02:20'de içeri girdiğinde senin personel kapısından odana kaçtığını duymuş. İlacı damardan siz verdiniz, değil mi?\nC: [Sessizlik... Gözleri dolar ama bakışları serttir] Anlamıyorsunuz. O adamın ne kadar acı çektiğini, her gece nasıl inlediğini anlamıyorsunuz. Artık bir posaya dönmüştü ama kibrinden bunu kimseye göstermiyordu.\nS: Bu bir itiraf mı?\nC: İtiraf değil, bu bir kurtarıştı! O gece saat 01:45'te değil, 02:15'te odasına geçtim. Damla oradaydı, çıkıp gitmişti. Rıza kriz geçiriyordu, benden ilacı yüksek dozda vermemi, her şeyi bitirmemi istedi.\nS: Rıza Bey sizden kendisini öldürmenizi mi istedi? Buna inanmamızı mı bekliyorsunuz?\nC: [Güler] Neden inanmıyorsunuz? Oğlu parasını bekliyor, nişanlısı evlilik sözleşmesini düşünüyor. Bana her şeyi o planladı, parayı da yolladı. Evet, şalteri indirdim çünkü kameralara yakalanmak istemedim. Balkona çıktım, ilacı damarına zerk ettim. Vücudu suya kaydı. Onu tutmaya çalıştım, havlu o yüzden ıslandı. Ama son anda direnmeye başladı, refleks olarak sudan çıkmaya çalıştı.\nS: Siz de onu suya geri ittiniz. Asfiksi izleri bu yüzden.\nC: Onu kurtardım komiserim. Onu o iğrenç ailesinden ve acılarından kurtardım. Bunu cinayet olarak yazabilirsiniz ama ben görevimi yaptım."
      ],
      "signature": "P. Korkmaz",
      "metaRows": [
        {
          "label": "Not",
          "value": "Pınar'ın odasında bulunan ıslak havlu/boş enjektör delilleri sonrası çapraz sorgu."
        },
        {
          "label": "Doğum",
          "value": "10.10.1997"
        },
        {
          "label": "Meslek",
          "value": "Özel Hemşire"
        },
        {
          "label": "Adres",
          "value": "İstanbul / Şişli"
        }
      ],
      "callouts": [
        "Pınar Korkmaz cinayeti itiraf etti. Kurbanın talebiyle başladığını iddia etse de, şalteri indirip kurban çırpındığında suya bastırması birinci derece cinayet."
      ]
    }
  ],
  "forensics": [
    {
      "id": "027-A",
      "docId": "027-A · Olay Yeri İnceleme",
      "title": "Olay Yeri Raporu",
      "meta": [
        {
          "label": "Olay tarihi referansı",
          "value": "15 Ağustos 2025 · Gece 02:00 — 03:00"
        },
        {
          "label": "Hazırlayan",
          "value": "Başkomiser Yılmaz · Sahil Güvenlik Kriminal Ekibi"
        }
      ],
      "body": "<h3>Bulgular</h3><ol><li>1. Kurban Rıza Tunalı, VIP süitinin dış balkonunda bulunan özel jakuzide, yarı oturur pozisyonda yüzüstü ve cansız halde bulunmuştur.</li><li>2. Süit içinde veya balkonda herhangi bir fiziksel boğuşma, kırık eşya veya dağınıklık tespit edilmemiştir.</li><li>3. Jakuzinin hemen kenarındaki sehpada, yarısı içilmiş bir şişe İskoç viskisi ve tek bir kristal bardak bulunmaktadır.</li><li>4. Jakuzi kenarından başlayıp süitin ana kapısına yönelen, 43 numara bir erkek ayakkabısına ait ıslak ayak izleri tespit edilmiştir.</li><li>5. VIP süiti ile özel hemşirenin (Pınar Korkmaz) odasını bağlayan ara (personel) kapısının kolunda tuzlu su lekeleri bulunmuştur.</li></ol><p><strong>Ön değerlendirme:</strong> Olay yerindeki ıslak ayak izleri kurbanın sudan çıkmaya çalıştığını değil, dışarıdan gelen birinin jakuziye yaklaşıp geri döndüğünü (veya paniklediğini) gösteriyor. Personel kapısındaki tuz lekeleri ise içeriden dışarıya ikinci bir kaçış rotası olduğunu işaret etmekte.</p>",
      "signature": {
        "role": "Olay Yeri İnceleme",
        "name": "Başkomiser Yılmaz"
      }
    },
    {
      "id": "027-B",
      "docId": "027-B · Antalya Adli Tıp",
      "title": "Otopsi Raporu",
      "meta": [
        {
          "label": "Rapor Tarihi",
          "value": "16 Ağustos 2025"
        },
        {
          "label": "Hazırlayan",
          "value": "Uzm. Dr. Sinan Akbulut · Antalya Adli Tıp Kurumu"
        }
      ],
      "body": "<h3>Dış Muayene</h3><ul><li>Boyun sol ve sağ lateral bölgelerinde 4x3 cm boyutlarında hafif künt ekimozlar (Tırnak izi yok).</li><li>Sol kolda, antekübital fossada (dirsek içi) çok taze bir enjeksiyon (iğne) girişi.</li><li>Gözlerde belirgin konjonktival peteşi (boğulma belirtisi).</li><li>Tüm vücut yüzeyinde klor ve deniz tuzu karışımı jakuzi suyu maruziyeti.</li></ul><h3>İç Muayene</h3><ul><li>Akciğerlerde masif su dolumu (mekanik asfiksi/suda boğulma neticesinde ölüm).</li><li>Midede 150ml alkol (İskoç viskisi) ve oral yolla alınmış 1 tablet uyku ilacı kalıntısı.</li><li>Kan toksikolojisinde; oral dozla açıklanamayacak düzeyde (12mg/L) intravenöz (damar yoluyla) uygulanmış Zolpidex saptanmıştır.</li></ul><p><strong>Ölüm nedeni:</strong> Kurbanın ölüm nedeni; yüksek doz sedatif (Zolpidex) enjeksiyonuna bağlı bilinç kaybı ve motor fonksiyon felcinin ardından gelişen mekanik asfiksidir (suda boğulma).</p><p><strong>Ölüm zamanı (tahmini):</strong> 15 Ağustos 2025 · 02:15 — 02:25</p><h3>Kritik bulgular</h3><ul><li>Kan ve mide bulguları uyuşmuyor: İlaç damardan şırınga ile yüksek dozda verilmiş.</li><li>Boyundaki izler elle boğma değil, bedeni suyun içinde tutma veya sudan çekme kaynaklı sert baskıdır.</li><li>Sol koldaki iğne izi profesyonel bir tıbbi müdahaledir.</li></ul>",
      "signature": {
        "role": "Uzm. Dr.",
        "name": "S. Akbulut"
      }
    }
  ],
  "evidence": [
    {
      "id": "RZA-BİY01",
      "tag": "Biyoloji",
      "title": "Kan Toksikoloji Raporu Özeti",
      "description": "Kurbanın kanında bulunan kimyasal maddelerin analizi.",
      "details": [
        {
          "label": "Madde",
          "value": "Zolpidex (Ağır Sedatif)"
        },
        {
          "label": "Seviye",
          "value": "12mg/L (Ölümcül Doz Sınırının Üzerinde)"
        },
        {
          "label": "Uygulama Yolu",
          "value": "İntravenöz (Damar İçi)"
        },
        {
          "label": "Etki Süresi",
          "value": "Enjekte edildikten 3-4 dakika sonra tam bilinç kaybı ve kas felci."
        }
      ]
    },
    {
      "id": "RZA-SAH02",
      "tag": "Sahne",
      "title": "Islak Ayak İzleri",
      "description": "Jakuziden süitin ana çıkış kapısına uzanan izler.",
      "details": [
        {
          "label": "Ayakkabı Numarası",
          "value": "43"
        },
        {
          "label": "Tür",
          "value": "Kösele Tabanlı Klasik Erkek Ayakkabısı"
        },
        {
          "label": "Eşleşme",
          "value": "Cem Tunalı'nın olay gecesi giydiği ayakkabılarla birebir eşleşmektedir."
        }
      ]
    },
    {
      "id": "PNR-GİZ03",
      "tag": "Eksik/Gizli",
      "title": "Çöpte Bulunan Enjektör ve Islak Havlu",
      "description": "Pınar Korkmaz'ın odasında yapılan ikinci aramada, tıbbi atık kutusunun sahte tabanının altına gizlenmiş materyaller.",
      "details": [
        {
          "label": "Enjektör",
          "value": "10cc standart tıbbi şırınga. İçinde Zolpidex kalıntısı."
        },
        {
          "label": "Havlu",
          "value": "Beyaz gemi havlusu. Üzerinde jakuzi suyuna ait yoğun klor ve deniz tuzu saptandı."
        }
      ]
    },
    {
      "id": "RZA-İZ04",
      "tag": "İz",
      "title": "Personel Kapısı Kolundaki Leke",
      "description": "VIP süit ile hemşire odasını bağlayan kilitli kapı kolundaki analiz.",
      "details": [
        {
          "label": "Leke Tipi",
          "value": "Kurumuş tuz ve su karışımı."
        },
        {
          "label": "Parmak İzi",
          "value": "Leke üzerinde Pınar Korkmaz'a ait, aceleyle dokunulmuş kısmi sağ el başparmak izi."
        }
      ]
    },
    {
      "id": "RZA-BEL05",
      "tag": "Belge",
      "title": "Yırtılmış Evlilik Sözleşmesi Taslağı",
      "description": "Kurbanın çalışma masasındaki çöp sepetinden birleştirilen belgeler.",
      "details": [
        {
          "label": "İçerik",
          "value": "Damla Aydoğan ile yapılacak olan güncellenmiş evlilik sözleşmesi."
        },
        {
          "label": "Üzerindeki El Yazısı Not",
          "value": "'İPTAL EDİLECEK - Avukata gönder!' (Rıza Tunalı'nın el yazısı)"
        }
      ]
    },
    {
      "id": "RZA-DİJ06",
      "tag": "Dijital",
      "title": "VIP Süit Elektronik Kilit Logu",
      "description": "Rıza Tunalı'nın odasına giriş yapan kartların saniye bazlı kayıtları.",
      "details": [
        {
          "label": "01",
          "value": "27: İçeriden açıldı (Bekir'in viski getirdiği an)."
        },
        {
          "label": "02",
          "value": "20: 'Yönetim-Yedek-01' numaralı kart ile dışarıdan giriş yapıldı."
        },
        {
          "label": "02",
          "value": "24: İçeriden açılarak çıkış yapıldı."
        },
        {
          "label": "Eşleşme",
          "value": "'Yönetim-Yedek-01' kartı Cem Tunalı'nın zimmetindedir."
        }
      ]
    }
  ],
  "documents": [
    {
      "id": "027-C1",
      "docId": "027-C1 · Dosya Ekleri",
      "title": "Tunalı Denizcilik Alman Ortaklık Ön Protokolü",
      "meta": [
        {
          "label": "Tip",
          "value": "Sözleşme"
        },
        {
          "label": "Sıra",
          "value": "1"
        }
      ],
      "body": "<h3>GİZLİ MÜTABAKAT METNİ</h3>\n<strong>Tarih:</strong> 10 Ağustos 2025\n<strong>Taraflar:</strong> Tunalı Denizcilik (Rıza Tunalı) & Hamburg Ocean Lines<strong>Madde 1:</strong> Tunalı Denizcilik filosundaki MV Poseidon dahil 4 kruvaziyer gemisinin tam mülkiyeti, 120 Milyon Euro karşılığında Hamburg Ocean Lines'a devredilecektir.\n<strong>Madde 2:</strong> Devir sonrası mevcut gemi personeli ve yönetim kurulu (Cem Tunalı dahil) sözleşmeleri Alman şirketinin inisiyatifiyle feshedilebilecektir.<p>*(Sözleşmenin alt kısmında Rıza Tunalı'nın imza parafı bulunmaktadır. Bu belge, hem mürettebatın hem de Cem'in şirketi kaybetme korkusunu doğrulamaktadır.)*</p>"
    },
    {
      "id": "027-C3",
      "docId": "027-C3 · Dosya Ekleri",
      "title": "MV Poseidon Casino Kamera Kayıtları Özeti",
      "meta": [
        {
          "label": "Tip",
          "value": "Kamera"
        },
        {
          "label": "Sıra",
          "value": "2"
        }
      ],
      "body": "<h3>GÜVENLİK DAİRESİ RAPORU</h3>\n<strong>Tarih:</strong> 15 Ağustos 2025\n<strong>İncelenen Bölge:</strong> Alt Güverte - Casino Giriş ve Masalar<p>- <strong>00:45:</strong> Cem Tunalı, rulet masası 3'e oturdu. Alkol tüketimi yüksek.<br/>- <strong>01:30:</strong> Cem Tunalı, telefonuyla hararetli bir mesajlaşma yaşıyor.<br/>- <strong>02:05:</strong> Cem Tunalı sinirle elindeki fişleri masaya fırlatarak casinodan çıkış yapıyor. (İstikamet: Asansörler)<br/>- <strong>02:45:</strong> Cem Tunalı casinoya dönmüyor. İfadesinde belirttiği '03:00'e kadar casinodaydım' beyanı tamamen yalandır.</p>"
    },
    {
      "id": "027-C4",
      "docId": "027-C4 · Dosya Ekleri",
      "title": "Pınar Korkmaz'ın Offshore Hesap Özeti",
      "meta": [
        {
          "label": "Tip",
          "value": "Mali"
        },
        {
          "label": "Sıra",
          "value": "3"
        }
      ],
      "body": "<h3>HESAP HAREKETLERİ İNCELEMESİ</h3>\n<strong>Hesap Sahibi:</strong> Pınar Korkmaz\n<strong>Banka:</strong> Malta Maritime Bank (Gizli Hesap)<p>- <strong>12 Haziran 2025:</strong> +50.000 EUR (Gönderen: R.T. Şahsi Fon)<br/>- <strong>18 Temmuz 2025:</strong> +50.000 EUR (Gönderen: R.T. Şahsi Fon)<br/>- <strong>14 Ağustos 2025 (Olaydan 1 gün önce):</strong> +200.000 EUR (Gönderen: R.T. Şahsi Fon - Açıklama: Son Ödeme)</p><p>*Mali Şube Notu:* Bir özel hemşirenin maaşının yüzlerce katı olan bu tutarlar, aralarında sıradan bir iş akdi olmadığını; gizli bir anlaşma (ötanazi anlaşması veya şantaj) olduğunu kanıtlamaktadır.</p>"
    },
    {
      "id": "027-C5",
      "docId": "027-C5 · Dosya Ekleri",
      "title": "VIP Koridor Kamera Logları",
      "meta": [
        {
          "label": "Tip",
          "value": "Kamera"
        },
        {
          "label": "Sıra",
          "value": "4"
        }
      ],
      "body": "<h3>KAMERA SİNYAL KESİNTİ RAPORU</h3><p>- <strong>02:14:50:</strong> VIP Koridoru boş. Sinyal normal.<br/>- <strong>02:15:02:</strong> [VİDEO SİNYALİ KAYBI] - Lokal elektrik arızası/müdahale.<br/>- <strong>02:15 ile 02:30 arası:</strong> Görüntü alınamıyor.<br/>- <strong>02:30:15:</strong> Sinyal geri geldi. Koridorda kimse görünmüyor.</p><p>*Teknik Not:* Kesinti jeneratörden değil, koridor başındaki sigorta kutusundan manuel (elle) indirme işlemiyle gerçekleşmiştir.</p>"
    },
    {
      "id": "027-C6",
      "docId": "027-C6 · Dosya Ekleri",
      "title": "Ecza Deposu Çıkış Logu",
      "meta": [
        {
          "label": "Tip",
          "value": "Tıbbi Kayıt"
        },
        {
          "label": "Sıra",
          "value": "5"
        }
      ],
      "body": "<h3>GEMİ REVİRİ İLAÇ TAKİP SİSTEMİ</h3><p>- <strong>Tarih:</strong> 15 Ağustos 2025 - Saat 19:30<br/>- <strong>İşlem Yapan:</strong> Hemşire P. Korkmaz<br/>- <strong>Çıkarılan İlaç:</strong> Zolpidex 10mg İntravenöz Ampul (2 Adet)<br/>- <strong>Sistem Notu:</strong> 'Taşıma sırasında ampuller kırılmış ve tıbbi atığa atılarak zayi edilmiştir. Yeni stok talep edildi.'</p><p>*Gerçek:* Kırılmadı, cinayet için kurbana enjekte edilmek üzere saklandı.</p>"
    },
    {
      "id": "027-C7",
      "docId": "027-C7 · Dosya Ekleri",
      "title": "Cem Tunalı'dan Avukatına E-posta",
      "meta": [
        {
          "label": "Tip",
          "value": "E-posta"
        },
        {
          "label": "Sıra",
          "value": "6"
        }
      ],
      "body": "<h3>E-POSTA DÖKÜMÜ</h3>\n<strong>Gönderen:</strong> Cem Tunalı (cem.tunali@tunalidenizcilik.com)\n<strong>Alıcı:</strong> Av. Rıfat K. (rifat@k-hukuk.com)\n<strong>Tarih:</strong> 14 Ağustos 2025 - 23:15<p>Rıfat,<br/>Babam tamamen aklını kaçırdı. Bugün yemekte gemiyi Almanlara satacağını ve beni yönetim kurulundan kovacağını söyledi. Bu satışın gerçekleşmesine izin veremem. Sağlık durumunun karar vermeye elverişli olmadığına dair hemen bir vesayet davası hazırlığına başla. Gerekirse o hemşireyi şahit yazarız. Bu işi bu hafta bitirmeliyiz, yoksa her şeyimizi kaybedeceğiz.</p>"
    },
    {
      "id": "027-C8",
      "docId": "027-C8 · Dosya Ekleri",
      "title": "Kaptan Aras'ın İK Şikayet Tutanak Taslağı",
      "meta": [
        {
          "label": "Tip",
          "value": "Mektup"
        },
        {
          "label": "Sıra",
          "value": "7"
        }
      ],
      "body": "<h3>DİLEKÇE TASLAĞI (Gönderilmemiş)</h3>\n<strong>Tarih:</strong> 15 Ağustos 2025 (Öğleden Sonra)\n<strong>Yazan:</strong> Kaptan Aras Eraslan<p>İnsan Kaynakları Direktörlüğüne,<br/>Rıza Tunalı'nın son günlerdeki tavırları artık geminin güvenli seyrini tehlikeye atmaktadır. Mürettebatımız (özellikle güverte personeli ve hizmetliler) üzerinde ağır bir mobbing ve sözlü taciz uygulanmaktadır. Geminin satılacağı dedikodularıyla personel mental olarak çökmüştür. Eğer Rıza Bey bu tavırlarına devam ederse, limana yanaştığımızda personelin büyük çoğunluğunun iş bırakma kararı alacağını bildirmek isterim. Sorumluluk tarafımdan reddedilmektedir.</p>"
    }
  ],
  "technical": [
    {
      "id": "027-T1",
      "docId": "027-T1 · Teknik",
      "title": "Gemi Elektrik Arıza Raporu",
      "meta": [
        {
          "label": "Belge tipi",
          "value": "Teknik rapor"
        }
      ],
      "body": "<h3>TEKNİK İNCELEME - VIP GÜVERTE</h3>\nSistem kayıtlarında yapılan geriye dönük log taramasında, 02:15'te yaşanan elektrik kesintisinin voltaj dalgalanmasından kaynaklanmadığı tespit edilmiştir.<p>Sigorta panelinin kapağı, yetkili personel anahtarıyla (Hemşire Pınar Korkmaz'ın anahtarlığında mevcuttur) açılmış ve 4 Numaralı Anahtarlama Şalteri <strong>manuel olarak</strong> (elle) indirilmiştir. 15 dakika sonra şalter tekrar kaldırılarak sistem aktif edilmiştir. Bu eylem, kameraları tamamen körleştirmek için bilinçli yapılmış bir sabotajdır.</p>"
    }
  ],
  "timeline": [
    {
      "id": "tl027-0",
      "time": "10 Ağustos",
      "event": "Rıza Tunalı, geminin Alman Hamburg Ocean Lines'a satışı için ön protokol imzaladı.",
      "source": "027-C1 Sözleşme",
      "critical": false
    },
    {
      "id": "tl027-1",
      "time": "14 Ağustos 21:30",
      "event": "Pınar, Dr. T ile yazışarak 'kararını verdi' dedi ve Malta hesabına 200 bin Euro geçtiğini doğruladı.",
      "source": "027-M1 WhatsApp",
      "critical": false
    },
    {
      "id": "tl027-2",
      "time": "15 Ağustos 00:45",
      "event": "Cem Tunalı, casinoya indi ve rulet masasına oturdu.",
      "source": "027-C3 Kamera",
      "critical": false
    },
    {
      "id": "tl027-3",
      "time": "15 Ağustos 01:25",
      "event": "Bekir, VIP süite viski getirdi. Kapıdan Pınar teslim aldı.",
      "source": "027-D3 İfade, 027-M2 WhatsApp",
      "critical": false
    },
    {
      "id": "tl027-4",
      "time": "15 Ağustos 01:50",
      "event": "Damla, sözleşme iptalini durdurmak için Rıza'nın odasına gitmeye karar verdi.",
      "source": "027-M3 iMessage",
      "critical": false
    },
    {
      "id": "tl027-5",
      "time": "15 Ağustos 02:05",
      "event": "Cem, babasıyla yüzleşmek için casinodan asansörlere doğru çıktı.",
      "source": "027-C3 Kamera",
      "critical": false
    },
    {
      "id": "tl027-6",
      "time": "15 Ağustos 02:10",
      "event": "Damla odaya girdi. Rıza'yı jakuzide kriz geçirirken (ilacın ilk etkisi) buldu, korkup kaçtı.",
      "source": "027-D7 İfade",
      "critical": false
    },
    {
      "id": "tl027-7",
      "time": "15 Ağustos 02:15",
      "event": "VIP kameraları, sigorta kutusundan manuel olarak kapatıldı. Işıklar söndü.",
      "source": "027-C5 Kamera, 027-T1 Teknik Rapor",
      "critical": true
    },
    {
      "id": "tl027-8",
      "time": "15 Ağustos 02:17",
      "event": "Pınar balkona çıkarak kurbana damar yoluyla ölümcül doz Zolpidex enjekte etti.",
      "source": "027-B Otopsi",
      "critical": true
    },
    {
      "id": "tl027-9",
      "time": "15 Ağustos 02:20",
      "event": "Cem kendi kartıyla odaya girdi. Pınar içeriden personel kapısına kaçtı. Cem cesedi buldu.",
      "source": "027-D10 İfade, 027-DİJ06 Dijital Kilit",
      "critical": true
    },
    {
      "id": "tl027-10",
      "time": "15 Ağustos 02:30",
      "event": "VIP kameraları ve elektrik tekrar devreye girdi.",
      "source": "027-C5 Kamera",
      "critical": false
    },
    {
      "id": "tl027-11",
      "time": "15 Ağustos 02:40",
      "event": "Cem, cesedi 'yeni bulmuş' gibi davranarak telsizden Hülya ve kaptana haber verdi.",
      "source": "027-D5 İfade",
      "critical": false
    }
  ],
  "timelineInitialOrder": [
    "tl027-8",
    "tl027-2",
    "tl027-10",
    "tl027-0",
    "tl027-11",
    "tl027-4",
    "tl027-9",
    "tl027-1",
    "tl027-6",
    "tl027-3",
    "tl027-7",
    "tl027-5",
    "tl027-12"
  ],
  "deduction": {
    "contradictions": [
      {
        "pin": true,
        "text": "<p><strong>Pınar: '01:45'ten beri uyuyordum'</strong> → Biyoloji/Eksik: Odasındaki çöpte ıslak enjektör ve kapıda taze tuz izi bulundu.</p>"
      },
      {
        "pin": true,
        "text": "<p><strong>Cem: '03:00'e kadar casinodaydım'</strong> → Kamera Logları: 02:05'te casinodan çıktığı doğrulandı.</p>"
      },
      {
        "pin": true,
        "text": "<p><strong>Damla: '01:00'den beri odamdaydım'</strong> → Tanık İfadesi: 02:10'da odanın kapısında ağlarken görüldü.</p>"
      }
    ],
    "elimination": [
      {
        "pin": true,
        "text": "<p>Bekir: 02:00'den sonra lobi bardan hiç ayrılmadığı kameralarla sabit.</p>"
      },
      {
        "pin": true,
        "text": "<p>Aras: Olay saatlerinde köprü üstünde seyir halindeydi.</p>"
      },
      {
        "pin": true,
        "text": "<p>Hülya: Vardiya değişiminde alt katta, diğer personelle birlikteydi.</p>"
      }
    ]
  },
  "verdict": {
    "perpetratorId": "pinar",
    "perpetratorName": "Pınar Korkmaz",
    "murderTime": "15 Ağustos 2025 · 02:15 — 02:25",
    "murderLocation": "Antalya · Kemer Açıkları · MV Poseidon Kruvaziyeri",
    "murderWeapon": "Zolpidex (yüksek sedatif intravenöz) ve jakuzi ortamında mekanik asfiksi",
    "motivation": "Rıza Tunalı üzerinden maddi çıkar ve sağlık erişimi; ilaç/şanter senaryosuyla ölümün ‘doğal’ görünmesi.",
    "evidenceList": [
      "Kan toksikolojisi — damar içi fatal Zolpidex",
      "027-E3: Pınar'ın çöpünde gizlenmiş ıslak havlu ve Zolpidex enjektörü.",
      "027-E4: Personel kapısındaki tuzlu su lekesi ve Pınar'ın kısmi parmak izi.",
      "VIP koridor elektrik kesintisi (manuel şalter)"
    ],
    "conclusion": "Pınar Korkmaz, zengin hastalarının ötanazi taleplerini yüksek paralar karşılığında cinayete çeviren organize bir sağlıkçı ağına (Dr. T) dahildir. Rıza'nın ölümünün ardında sadece kendi çaresizliği değil, bu profesyonel sömürü ağı vardır. Pınar tutuklanmış ve Dr. T hakkında soruşturma açılmıştır.",
    "wrongAnswerMessage": "Bu şüpheli fail değil. Otopsi ile dijital kilit kayıtlarını, kamera kesinti zamanını ve VIP personel çıkış rotasını tekrar eşleyin.",
    "solutionDocLabel": "027-Z2 · Resmi Çözüm Belgesi",
    "solutionHtml": "<div class=\"verdict-stamp\">CLASSIFIED</div><div class=\"doc-id\" style=\"margin-bottom:12px;\">027-Z2 · Resmi Çözüm Belgesi · 16 Ağustos 2025</div><h3 style=\"font-family:'Cormorant Garamond',serif;font-size:24px;margin:0 0 8px;\">Failin kimliği</h3><div class=\"verdict-name\">Pınar Korkmaz</div><h3>Özet</h3><p>Pınar, 200 bin Euro karşılığında Rıza ile ötanazi anlaşması yapmıştır (veya Rıza'nın psikolojisini kullanarak bunu kurgulamıştır). Dışarıdaki bir doktor olan suç ortağıyla (Dr. T) bunu asfiksi (kalp krizi) gibi göstermeyi planlamıştır. 01:30'da viskiye ilk oral dozu katar. 02:10'da Damla odaya girdiğinde ilaç etkisini göstermekte, Rıza fenalaşmaktadır. Damla korkup gidince, 02:15'te Pınar şalteri indirir, balkona çıkar ve Rıza'ya ölümcül ikinci dozu damardan enjekte eder. Beklenmedik şekilde Cem 02:20'de odaya girince, Pınar kurbanı tam olarak suya batıramadan personel kapısından kendi odasına kaçar. Cem cesedi çıkarmaya çalışıp boynunda iz bırakır ama korkup o da kaçar.</p><h3>Olay zamanlaması ve kilit nokta</h3><p><strong>VIP Güverte kameraları lokal sigorta kutusundan Pınar tarafından yetkili anahtarıyla manuel olarak körleştirildi.</strong></p><h3>Failin kritik hatası</h3><p>Cem'in 02:20'de karanlıkta odaya girmesiyle Pınar'ın ıslak havlu ve enjektörle apar topar kendi odasına kaçması, atıkları çöpte bırakıp personel kapısı kolunda tuzlu su izi bırakması.</p><h3>İki yalancı</h3><ol><li><strong>Cem Tunalı</strong> — Casinoda olduğunu iddia etti. Aslında 02:20'de içeri girdi, babasının cesedini buldu ve cinayet üzerine kalır korkusuyla yalan söyleyip 02:40'ta tekrar bulmuş gibi yaptı.</li><li><strong>Damla Aydoğan</strong> — 01:00'den beri uyuduğunu söyledi. Aslında 02:10'da odaya girip kurbanı kriz geçirirken gördü ve korkarak onu ölüme terk edip kaçtı.</li></ol><h3>Kırmızı ringalar</h3><p><strong>Cem Tunalı:</strong> Olay yerindeki ıslak ayak izleri, babasının boynundaki boğuşma benzeri çekme izleri ve casinodaki yalanı ile harika bir fail adayıydı. Ancak Cem sadece cesetle temas eden ve panikleyen kişiydi.</p><h3>Dayanılan kritik deliller</h3><ol><li>027-E3: Pınar'ın çöpünde gizlenmiş ıslak havlu ve Zolpidex enjektörü.</li><li>027-E4: Personel kapısındaki tuzlu su lekesi ve Pınar'ın kısmi parmak izi.</li></ol><p style=\"background:rgba(107,22,32,.12);padding:16px;border-left:3px solid var(--bordeaux);margin-top:24px;\"><strong>SONUÇ:</strong> Pınar Korkmaz, zengin hastalarının ötanazi taleplerini yüksek paralar karşılığında cinayete çeviren organize bir sağlıkçı ağına (Dr. T) dahildir. Rıza'nın ölümünün ardında sadece kendi çaresizliği değil, bu profesyonel sömürü ağı vardır. Pınar tutuklanmış ve Dr. T hakkında soruşturma açılmıştır.</p><p style=\"margin-top:18px;\"><strong>Tutuklama:</strong> 16 Ağustos 2025 · MV Poseidon Kemer Limanı, Pınar Korkmaz Kamarası</p><div class=\"doc-signature\"><div class=\"sig-line\">Kıdemli Kriminal Analist · D.A.K.T.</div><div class=\"sig-name\">Onaylı</div></div>"
  },
  "tabSectionSub": {
    "brief": "027 · Gemi özet",
    "adli-tip": "027-B · Otopsi",
    "deliller": "Fiziksel deliller",
    "belgeler": "027-C · Ek belgeler",
    "teknik": "027-T1 · Elektrik",
    "cozum": "027-Z2 · Sınırlı erişim"
  }
};

// MessageThread referansını CaseData'ya bağla
(case027 as any).messageThreads = case027MessageThreads;
