import type { CaseData } from "@/lib/case-types";
import { case016MessageThreads } from "./016-message-threads";

export const case016: CaseData = {
  "id": "016",
  "codename": "Gönye",
  "fullTitle": "Gönye Dosyası",
  "status": "active",
  "victim": "Şükran Atalay (48, kadın)",
  "location": "Bursa · Osmangazi · Uludağ Yolu 8. Kilometre (Cesedin Bulunduğu Yer)",
  "shortSummary": "15 Şubat 2025 gecesi Uludağ yolunda, ayakları kesilmiş bir kadın cesedi bulunur. Kurban, tavizsiz bir belediye imar denetçisidir. Ancak bu vahşetin arkasında psikopatolojik bir ritüel değil, tamamen pratik bir sığdıramama problemi yatmaktadır.",
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
    "subtitle": "016-A · Olay Yeri",
    "metaPairs": [
      {
        "label": "Kurban",
        "value": "Şükran Atalay"
      },
      {
        "label": "Yaş",
        "value": "48"
      },
      {
        "label": "Meslek",
        "value": "İmar Denetçisi"
      },
      {
        "label": "Olay Yeri",
        "value": "Uludağ Yolu"
      }
    ],
    "sections": [
      {
        "title": "Vaka Özeti",
        "body": "15 Şubat 2025 gecesi saat 02:30 sularında, Uludağ'da kamp yapmaktan dönen bir grup üniversite öğrencisi, dağ yolunun karanlık bir virajında yol kenarına atılmış bir kadın cesedi bulur. Olay yerine intikal eden ekipler, cesedin 48 yaşındaki belediye imar denetçisi Şükran Atalay'a ait olduğunu tespit eder. Ancak sahneyi ürpertici kılan detay, kurbanın her iki ayağının da bilek hizasından kesici bir aletle (muhtemelen demir testeresi) düzgün bir şekilde kesilmiş ve kayıp olmasıdır. Olay yerinde fazla kan bulunmaması, cinayetin başka bir yerde işlenip cesedin buraya taşındığını kesinleştirmektedir."
      },
      {
        "title": "Kurban Profili",
        "body": "Şükran Atalay (48), Bursa'da inşaat sektörünün korkulu rüyası olarak bilinen, son derece katı ve tavizsiz bir imar denetçisiydi. Yakın zamanda birçok büyük müteahhidin projesini mühürlemiş, kaçak yapılara acımadan yıkım kararı çıkartmıştı. Özel hayatında da aynı derecede kontrolcü ve sert biriydi; 22 yaşındaki kızıyla sürekli çatışma halindeydi. Rüşvet kabul etmeyen, tehditlere boyun eğmeyen yapısı ona çok sayıda düşman kazandırmıştı."
      },
      {
        "title": "Görev",
        "body": "Cesedin ayaklarının neden kesildiği ve cinayetin asıl nerede işlendiği en büyük gizemdir. Analist, kurbanın son 24 saatindeki rotasını çıkararak asıl olay yerini bulmalı ve bu garip sakatlamanın psikolojik mi yoksa tamamen pratik bir amaca mı hizmet ettiğini çözmelidir. Ayakların kesilmesi psikopatolojik bir ritüel gibi görünse de, bazen en vahşi eylemlerin arkasında çok basit ve pratik mecburiyetler yatar."
      }
    ],
    "signature": {
      "role": "Soruşturma Başkomiseri",
      "name": "Yılmaz Tekin"
    }
  },
  "suspects": [
    {
      "id": "erkan",
      "name": "Erkan Çevik",
      "role": "Mimar / Proje Sahibi",
      "quote": "Şükran Hanım kuralları esnetmezdi, biz de buna saygı duyardık. Neden ona zarar vereyim ki?",
      "status": "Şüpheli",
      "code": "erkan"
    },
    {
      "id": "vildan",
      "name": "Vildan Çevik",
      "role": "Peyzaj Mimarı (Erkan'ın eşi)",
      "quote": "Kocam o gece bütün akşam evdeydi, birlikte film izledik. Neden ona böyle sorular soruyorsunuz?",
      "status": "Şüpheli",
      "code": "vildan"
    },
    {
      "id": "tayfun",
      "name": "Tayfun Gürses",
      "role": "İmar Müdürlüğü Asistanı",
      "quote": "Bana kan kusturuyordu. Ölmesini ister miydim? Belki. Ama onu öldürecek cesaretim yok.",
      "status": "Şüpheli",
      "code": "tayfun"
    },
    {
      "id": "salih",
      "name": "Salih Kocabaş",
      "role": "Uludağ Yolu Çay Bahçesi İşletmecisi",
      "quote": "Benim 20 yıllık ekmek teknemi, o lanet olası pergolayı kaçak diye yıktırdı. Allah'ından buldu.",
      "status": "Şüpheli",
      "code": "salih"
    },
    {
      "id": "pinar",
      "name": "Pınar Atalay",
      "role": "Üniversite Öğrencisi (Kızı)",
      "quote": "Annem sadece müteahhitlere değil, bana da diktatörlük yapıyordu. O gün kredi kartlarımı iptal etmişti.",
      "status": "Şüpheli",
      "code": "pinar"
    },
    {
      "id": "hakan",
      "name": "Hakan Saygın",
      "role": "Müteahhit",
      "quote": "İş dünyası bu, zarara uğrarsın telafi edersin. Ben mafya değilim, kimsenin ayağını kesmem.",
      "status": "Şüpheli",
      "code": "hakan"
    }
  ],
  "testimonies": [
    {
      "id": "erkan-1",
      "headerDocId": "016-C",
      "suspectName": "Erkan Çevik",
      "title": "İfade — Erkan Çevik (1. Oturum)",
      "date": "15.02.2025 · 14:30",
      "birth": "12.04.1983",
      "occupation": "Mimar (Çevik Mimarlık Kurucusu)",
      "address": "Bursa · Nilüfer · Balat Mah.",
      "paragraphs": [
        "S: Erkan Bey, başınız sağ olsun. Şükran Hanım'ı en son ne zaman gördünüz?",
        "C: Dün akşamüstü. Saat altı gibi ofisime geldi. Biliyorsunuz, FSM Bulvarı'ndaki yeni projemizle ilgili bazı pürüzler vardı. Onları konuşmak için uğradı.",
        "S: Nasıl pürüzler? Tartıştınız mı?",
        "C: Hayır, hayır. Şükran Hanım biraz... prensipli biridir. Çatı katındaki çekme payıyla ilgili bir itirazı olmuştu. Projeyi revize etmemiz gerektiğini söyledi. Ben de durumu makul karşıladım. [duraksama] Ofisimde bir kahve içtik, projeye baktık, sonra çıktı.",
        "S: Saat kaçta ayrıldı ofisinizden?",
        "C: Altı buçuk civarıydı. Zaten ben de yediye doğru ofisi kapattım ve doğrudan eve geçtim. Eşim Vildan da evdeydi, bütün akşam beraberdik.",
        "S: Şükran Hanım'ın ayaklarının kesilerek dağ yoluna atılması hakkında ne düşünüyorsunuz?",
        "C: [yutkunma] Korkunç bir şey. Gerçekten kanım dondu haberi aldığımda. Bunu kim, neden yapar aklım almıyor. Şükran Hanım'ın düşmanı çoktu, malum... İmar denetimi Bursa gibi hızla büyüyen bir şehirde tehlikeli bir iştir.",
        "S: Düşman derken kastettiğiniz biri var mı?",
        "C: İsim vermek bana düşmez memur bey. Ama Hakan Saygın'ın projesini geçen ay nasıl mühürlediğini bütün sektör biliyor."
      ],
      "signature": "E. Çevik"
    },
    {
      "id": "vildan-1",
      "headerDocId": "016-D",
      "suspectName": "Vildan Çevik",
      "title": "İfade — Vildan Çevik (1. Oturum)",
      "date": "15.02.2025 · 16:00",
      "birth": "08.09.1986",
      "occupation": "Peyzaj Mimarı",
      "address": "Bursa · Nilüfer · Balat Mah.",
      "paragraphs": [
        "S: Vildan Hanım, eşinizin 14 Şubat akşamı nerede olduğunu teyit edebilir misiniz?",
        "C: Evdeydi komiserim. Erkan saat yedi çeyrek gibi eve geldi. Sevgililer Günü'ydü zaten, dışarı çıkmak yerine evde sakin bir akşam geçirmeyi planlamıştık.",
        "S: Bütün gece hiç dışarı çıkmadı mı?",
        "C: Hayır, çıkmadı. Birlikte yemek yedik, bir şeyler izledik. Neden soruyorsunuz? Erkan'ın bu korkunç olayla bir ilgisi olamaz.",
        "S: Şükran Atalay'ı tanır mıydınız?",
        "C: [hafif sinirli] İmar denetçisi olan kadın, evet. Tanırdım. Yani şahsen çok oturup kalkmışlığım yoktur ama Erkan'ın işlerinde sürekli sorun çıkardığını biliyorum. Herkesin işine taş koyan bir kadındı. Ölmesine sevindim demiyorum ama şaşırmadım.",
        "S: Eşinizin ofisine o akşam Şükran Hanım'ın geldiğinden haberiniz var mıydı?",
        "C: Hayır, Erkan bana bahsetmedi. İş sıkıntılarını eve taşımamayı tercih ederiz. Lütfen eşimden şüphelenmeyin, o bir karıncayı bile incitemez."
      ],
      "signature": "V. Çevik"
    },
    {
      "id": "pinar-1",
      "headerDocId": "016-E",
      "suspectName": "Pınar Atalay",
      "title": "İfade — Pınar Atalay (1. Oturum)",
      "date": "15.02.2025 · 18:00",
      "birth": "24.11.2003",
      "occupation": "Öğrenci (Uludağ Üni. Mimarlık)",
      "address": "Bursa · Osmangazi · Kükürtlü Mah.",
      "paragraphs": [
        "S: Pınar, başın sağ olsun. Anneni en son ne zaman gördün?",
        "C: [gözleri şiş, ağlıyor] Dün sabah. Kahvaltıda büyük bir kavga ettik. Yine.",
        "S: Ne kavgasıydı bu?",
        "C: Para... Hep para ve kontrol. Okulu bırakıp grafik tasarım üzerine kendi işimi kurmak istiyordum. Delirdi. 'Benim paramla benim evimde bana isyan edemezsin' dedi. Bütün kredi kartlarımı iptal etmiş. [burnunu çeker] Çok öfkelendim. Evden çıkıp gittim.",
        "S: Dün akşam neredeydin?",
        "C: Erkek arkadaşım Cenk ile beraberdik. Görükle'de onun evindeydik. Bütün gece oradaydım, annemin telefonlarını açmadım. Keşke... keşke açsaydım.",
        "S: Annenizin ayağının kesilmesi... Bu size bir şey ifade ediyor mu? Bir tehdit, bir düşmanlık işareti?",
        "C: [ürperir] Bilmiyorum. Annem kuralcıydı ama mafya işlerine bulaşmazdı. Sadece rüşvet almadığı için birkaç müteahhit ona kafayı takmıştı. Asistanı Tayfun'a da çok kötü davranırdı. O çocuk annemden nefret ediyordu."
      ],
      "signature": "P. Atalay"
    },
    {
      "id": "tayfun-1",
      "headerDocId": "016-F",
      "suspectName": "Tayfun Gürses",
      "title": "İfade — Tayfun Gürses (1. Oturum)",
      "date": "16.02.2025 · 09:30",
      "birth": "05.05.1997",
      "occupation": "Belediye İmar Müdürlüğü Asistanı",
      "address": "Bursa · Yıldırım · Duaçınarı Mah.",
      "paragraphs": [
        "S: Tayfun Bey, Şükran Hanım'la aranız nasıldı?",
        "C: [rahatsız, sandalyede kıpırdanır] Dürüst mü olayım? Berbattı. Bana bir köle gibi davranırdı. Sırf geçen hafta dosyaları eksik dizdim diye bütün ofisin önünde beni azarladı. İki yıldır o kadının kahrını çekiyorum.",
        "S: 14 Şubat akşamı saat kaçta işten çıktınız?",
        "C: Tam altıda çıktım komiserim. Şükran Hanım daha erken çıkmıştı, Erkan Bey'in FSM'deki ofisine geçeceğini söylemişti. O gittikten sonra ben de toparlanıp çıktım.",
        "S: Akşam neredeydiniz?",
        "C: Evdeydim. Ailemle yaşıyorum zaten. Akşam yemeğini yedik, sonra odama geçtim bilgisayar oynadım.",
        "S: Şükran Hanım'ın son zamanlarda tehdit aldığına şahit oldunuz mu?",
        "C: Hakan Saygın denen bir müteahhit var. Geçen ay ofisi bastı. 'Bu işin sonu kötü olur Şükran, benim ekmeğimle oynama' diye bağırdığını duydum. Şükran Hanım güvenliği çağırmıştı. Ondan şüphelenmeniz lazım, benden değil."
      ],
      "signature": "T. Gürses"
    },
    {
      "id": "hakan-1",
      "headerDocId": "016-G",
      "suspectName": "Hakan Saygın",
      "title": "İfade — Hakan Saygın (1. Oturum)",
      "date": "16.02.2025 · 11:00",
      "birth": "19.08.1990",
      "occupation": "Müteahhit",
      "address": "Bursa · Osmangazi · Bademli Mah.",
      "paragraphs": [
        "S: Hakan Bey, Şükran Atalay'la aranızdaki husumeti biliyoruz. Geçen ay onu ofisinde tehdit etmişsiniz.",
        "C: [gülümser] Tehdit değil komiserim, ticari bir uyaraydı. Benim Özlüce'de milyonluk projem var, kadın sırf üç santimlik balkon çıkması yüzünden koca inşaatı durdurdu. Her ay bankaya ne kadar faiz ödüyorum haberiniz var mı?",
        "S: O yüzden mi öldürdünüz?",
        "C: [ciddileşir] Benim cinayetle işim olmaz. Bir kadını öldürüp ayaklarını kesecek kadar psikopat mıyım ben? İşim bozulursa mahkemeye veririm, avukat tutarım.",
        "S: 14 Şubat akşamı saat yedi ile gece yarısı arası neredeydiniz?",
        "C: Sevgililer günü kardeşim, neredeydim sence? Kız arkadaşımla Ataevler'de lüks bir restorandaydım. Kameralara, adisyona bakabilirsiniz. Bütün akşam şarap içip et yedik. Saat on bir gibi de otele geçtik. Benim alibim sağlam."
      ],
      "signature": "H. Saygın"
    },
    {
      "id": "salih-1",
      "headerDocId": "016-H",
      "suspectName": "Salih Kocabaş",
      "title": "İfade — Salih Kocabaş (1. Oturum)",
      "date": "16.02.2025 · 13:30",
      "birth": "02.01.1970",
      "occupation": "Çay Bahçesi İşletmecisi",
      "address": "Bursa · Osmangazi · Çekirge Mah.",
      "paragraphs": [
        "S: Salih Amca, senin Uludağ yolundaki mekanın pergolasını Şükran Hanım yıktırmış. Doğru mu?",
        "C: [öfkeli] Doğru komiserim. Yirmi yıllık ekmek teknem orası benim. Üstü kapalıydı kışın da millet gelip çay içiyordu. Neymiş, orman arazisine taşıyormuş. Dinlemedi garibanı, yolladı kepçeleri geçen hafta.",
        "S: O gün nerede olduğunu anlatır mısın?",
        "C: Ben her gün sabah sekiz, gece on ikide dükkanı kapatırım. Olay gecesi de öyleydi. Zaten kar atıştırıyordu, pek müşteri yoktu.",
        "S: Cesedin bulunduğu yer senin dükkanına sadece iki kilometre mesafede.",
        "C: Benim dükkanıma iki kilometre olabilir ama ben o gece hiçbir şey görmedim, duymadım. Çay demliyordum ben. O kadına beddua ettim mi? Ettim. Allah belasını versin dedim. Ama ben kimseyi kesmedim memur bey. Kasap mıyım ben adamın ayağını keseyim?"
      ],
      "signature": "S. Kocabaş"
    },
    {
      "id": "erkan-2",
      "headerDocId": "016-C2",
      "suspectName": "Erkan Çevik",
      "title": "İfade — Erkan Çevik (2. Oturum)",
      "date": "17.02.2025 · 10:00",
      "birth": "12.04.1983",
      "occupation": "Mimar (Çevik Mimarlık Kurucusu)",
      "address": "Bursa · Nilüfer · Balat Mah.",
      "paragraphs": [
        "S: Erkan Bey, ofisinizin bulunduğu plazanın kamera kayıtlarını inceledik. Şükran Hanım saat 18:05'te binaya giriyor. Ama hiçbir çıkış kaydı yok.",
        "C: [hafif gergin] Olamaz öyle şey. Çıkmıştır. Arka kapıdan, yangın merdiveninden inmiştir belki. Ben nereden bileyim?",
        "S: Sizin çıkışınız da saat 20:45'te görülüyor. İlk ifadenizde '19:00'da eve geçtim' demiştiniz.",
        "C: [yutkunur, avukatına bakar] Evet, o kısmı yanlış hatırlamışım. Şükran Hanım gidince ofiste biraz kaldım. Çizim yapıyordum. Zamanın nasıl geçtiğini anlamamışım.",
        "S: Hakan Saygın'ın adamları Şükran Hanım'ı o gece takip etmiş. 18:05'te ofise girdiğini ama çıkmadığını söylüyorlar. Eşiniz Vildan Hanım da 19:15'te eve geldiğinizi söylemişti. İkiniz birden mi yalan söylediniz?",
        "C: [terliyor] Vildan... Vildan saatleri karıştırmıştır. Son zamanlarda evliliğimizde sorunlar var. O akşam ofiste geç saatlere kadar kalınca, polis bana 'sevgilinle miydin' diye sormasın diye kendince saatleri geri çekti. Şükran Atalay o ofisten yürüyerek çıktı komiserim. Sonra başına ne geldiyse benimle ilgisi yok. İftira atıyorsunuz."
      ],
      "signature": "E. Çevik"
    },
    {
      "id": "vildan-2",
      "headerDocId": "016-D2",
      "suspectName": "Vildan Çevik",
      "title": "İfade — Vildan Çevik (2. Oturum)",
      "date": "17.02.2025 · 14:00",
      "birth": "08.09.1986",
      "occupation": "Peyzaj Mimarı",
      "address": "Bursa · Nilüfer · Balat Mah.",
      "paragraphs": [
        "S: Vildan Hanım, 14 Şubat akşamı saat 19:15'te evde olduğunuzu söylemiştiniz. Ancak telefonunuz o saatte PodyumPark'ta sinyal veriyor. Yalan ifade verdiğinizin farkında mısınız?",
        "C: [yüzünü ellerine gömer, ağlamaya başlar] Özür dilerim... Sadece... durumu anlatmak istemedim.",
        "S: Neyi anlatmak istemediniz?",
        "C: Erkan'ın beni aldattığını düşünüyorum. O akşam Sevgililer Günü'ydü. Beni yemeğe çıkarır diye bekledim ama 'ofiste işim var' dedi. Ben de arkadaşlarımla PodyumPark'a gittim sinirimden. Eve dokuza doğru döndüm. Erkan yoktu.",
        "S: Erkan eve saat kaçta geldi?",
        "C: Saat on bir buçuk gibiydi. Bembeyaz olmuştu yüzü. Üşümüş gibi titriyordu. 'Sokaklarda araba kullandım, kafamı dinledim' dedi. Birisini öldürdüğüne ihtimal vermedim, sadece o sürtük asistanıyla birlikte olduğunu sandım! Polise aldatıldığımı anlatmak istemedim, hepsi bu."
      ],
      "signature": "V. Çevik"
    },
    {
      "id": "pinar-2",
      "headerDocId": "016-E2",
      "suspectName": "Pınar Atalay",
      "title": "İfade — Pınar Atalay (2. Oturum)",
      "date": "17.02.2025 · 16:30",
      "birth": "24.11.2003",
      "occupation": "Öğrenci (Uludağ Üni. Mimarlık)",
      "address": "Bursa · Osmangazi · Kükürtlü Mah.",
      "paragraphs": [
        "S: Pınar, annene saat 20:00'da gönderdiğin bir mesaj var. 'Umarım hayatımdan yok olursun, senden nefret ediyorum' yazmışsın. Annen bu mesajı okumamış. Neden attın bu mesajı?",
        "C: [sessizlik, tırnaklarıyla oynar] Gündüzki kavganın siniri geçmemişti. Cenk ile dışarıdaydık ama ben hala alev alevdim. Kredi kartımdan yemek bile söyleyemedim, reddedildi. O an o kadar öfkelendim ki yazdım. Sadece bir ergencesine bir kızgınlıktı.",
        "S: Annenizin parmaklarında boğuşma izleri var. Kavganız sadece sözlü müydü?",
        "C: Sözlüydü! Bana dokunmadı bile. Zaten ben evden çıkarken o hazırlanıyordu. 'Bugün Erkan Çevik'in canına okuyacağım, kaçak kat çıkmanın bedelini ödeyecek' diye söyleniyordu. Onun projesine kafayı takmıştı o gün."
      ],
      "signature": "P. Atalay"
    },
    {
      "id": "tayfun-2",
      "headerDocId": "016-F2",
      "suspectName": "Tayfun Gürses",
      "title": "İfade — Tayfun Gürses (2. Oturum)",
      "date": "18.02.2025 · 10:00",
      "birth": "05.05.1997",
      "occupation": "Belediye İmar Müdürlüğü Asistanı",
      "address": "Bursa · Yıldırım · Duaçınarı Mah.",
      "paragraphs": [
        "S: Tayfun, 'evde oyun oynuyordum' dediğin akşam, saat 21:30'da senin Fiat Egea marka aracın Uludağ yolundaki kameralara yakalanmış. Cesedin bulunduğu yere sadece 3 kilometre mesafedesin. Konuş.",
        "C: [panik] Tamam! Yalan söyledim ama cinayetle ilgisi yok yemin ederim!",
        "S: Anlat o zaman.",
        "C: Kız arkadaşımla... Yani eski kız arkadaşımla Uludağ'da gizlice buluştuk. Ailelerimiz görüşmemizi istemiyor, iş yerinde de sorun olurdu. Akşam dokuz gibi onu aldım, dağ yoluna çıktık. Arabayı kenara çekip oturduk sadece.",
        "S: Yolda şüpheli bir şey gördün mü? Şükran Hanım'ı, ya da başka bir aracı?",
        "C: Saat 11 gibi biz aşağı inerken, yolun kenarında duran siyah küçük bir araba gördüm. Mini Cooper tarzı bir şeydi. Bagajı açıktı. Bir adam bagajın başında duruyordu. Ben 'yardım lazım mı' diye yavaşlayacak oldum, adam panikle bagajı örtmeye çalıştı. Kız arkadaşım 'hadi bas git belaya bulaşma' deyince gaza bastım. Plakayı göremedim karanlıktan."
      ],
      "signature": "T. Gürses",
      "callouts": [
        "Tayfun Gürses'in ifadesindeki 'Siyah küçük araba (Mini Cooper)' detayı failin cesedi taşıdığı araca işaret ediyor."
      ]
    },
    {
      "id": "hakan-2",
      "headerDocId": "016-G2",
      "suspectName": "Hakan Saygın",
      "title": "İfade — Hakan Saygın (2. Oturum)",
      "date": "18.02.2025 · 14:00",
      "birth": "19.08.1990",
      "occupation": "Müteahhit",
      "address": "Bursa · Osmangazi · Bademli Mah.",
      "paragraphs": [
        "S: Hakan Bey, siz restorandaydınız ama sağ kolunuz, korumanız Mahmut'un telefonu olay akşamı saat 18:00'den 20:00'a kadar Şükran Hanım'ın rotasını izlemiş. Neden kadını takip ettiriyordunuz?",
        "C: [of çeker] Sırf bu yüzden o gece restoranda saatlerce oturdum zaten. Mahmut onu takip ediyordu çünkü kadının bir açığını, rüşvet aldığını falan yakalamak istiyordum. Bir fotoğrafı, gizli bir görüşmesi... Benim şantaj yapacak bir malzemeye ihtiyacım vardı.",
        "S: Mahmut ne rapor verdi size?",
        "C: Mahmut, Şükran'ın saat altı civarı FSM'de bir plazaya, Erkan Çevik'in ofisine girdiğini söyledi. Kapıda iki saat beklemiş. Kadın hiç çıkmamış. Saat sekizi geçince Mahmut beni aradı, 'Abi kadın çıkmıyor, arka kapıdan çıkıp gitmiş olmasın' dedi. Ben de 'bırak, gel' dedim.",
        "S: Şükran Hanım o binadan hiç çıkmadı mı?",
        "C: Mahmut görmemiş. Ben size Erkan'a bakın diyorum, adamın projesini iptal etmeye gitmişti kesin."
      ],
      "signature": "H. Saygın"
    },
    {
      "id": "vildan-3",
      "headerDocId": "016-D3",
      "suspectName": "Vildan Çevik",
      "title": "İfade — Vildan Çevik (3. Oturum)",
      "date": "19.02.2025 · 11:30",
      "birth": "08.09.1986",
      "occupation": "Peyzaj Mimarı",
      "address": "Bursa · Nilüfer · Balat Mah.",
      "paragraphs": [
        "S: Vildan Hanım, eşinizin ofisinden siyah bir Mini Cooper ile ayrıldığı kameralara yansımış. Gece 23:30'da eve geldiğinde hiç garip bir şey dikkatinizi çekti mi? O arabada ne vardı?",
        "C: [elleri titrer] Ben... ben onu korumak için... [sessizlik]",
        "S: Cinayete ortak olmak istemiyorsanız doğruları söyleyin. O gece ne oldu?",
        "C: Erkan eve geldiğinde üzeri temizdi ama üstünü çok hızlı değiştirdi. Kabanını hemen çamaşır makinesine attı. Sonra bana yatmaya gittiğini söyledi ama gece saat bir sularında su içmeye kalktığımda onu otoparkta gördüm.",
        "S: Otoparkta ne yapıyordu?",
        "C: Şirket aracı olan Mini Cooper'ın bagajını yıkıyordu. Hortumla değil, bezle siliyordu ve ağır bir çamaşır suyu kokusu geliyordu. Yanına gidip ne yaptığını sorduğumda irkildi. 'Bagaja kahve döküldü' dedi ama o koku kahve değildi. Ve... ve arabanın yanında rulo halinde siyah çöp poşetleri vardı. Sabah o poşetleri çöpe attı. [ağlamaya başlar] Ben onun beni aldattığını sanıyordum komiserim, o kadarını düşünemedim..."
      ],
      "signature": "V. Çevik",
      "callouts": [
        "Vildan Çevik'in ifadesi, Erkan Çevik'in olay sonrası delilleri (bagajdaki kan izleri) yok etmeye çalıştığını doğruladı."
      ]
    }
  ],
  "forensics": [
    {
      "id": "016-A",
      "docId": "016-A",
      "title": "Olay Yeri İnceleme Raporu",
      "meta": [
        {
          "label": "Tarih",
          "value": "15.02.2025"
        },
        {
          "label": "Hazırlayan",
          "value": "Başkomiser Yılmaz Tekin"
        }
      ],
      "body": "Ceset, Uludağ Yolu 8. Kilometre mevkisinde, yolun 3 metre aşağısındaki çalılık alanda sırtüstü yatar vaziyette bulunmuştur. Olay yerinde cesedin altındaki toprakta ve çevrede çok az miktarda kan tespit edilmiştir (Post-mortem kesime bağlı sızıntı). Kar üzerinde cesedin atıldığı noktaya kadar giden tek bir kişiye ait erkek ayakkabısı izleri tespit edilmiştir. Kurbanın cep telefonu, çantası ve kesilen ayakları ile ayakkabıları olay yerinde bulunamamıştır. Asfalt üzerinde, lastik ebatları küçük (hatchback veya spor model bir araca ait olduğu düşünülen) U dönüşü lastik izleri mevcuttur.\n\nÖn Not: Cesedin burada öldürülmediği açıktır. Ayakların kesilmesi sırasında kanın etrafa sıçramaması, işlemin kapalı ve silinebilir bir alanda yapıldığını göstermektedir.",
      "signature": {
        "role": "Olay Yeri İnceleme Uzmanı",
        "name": "Yılmaz Tekin"
      }
    },
    {
      "id": "016-B",
      "docId": "016-B",
      "title": "Otopsi Raporu",
      "meta": [
        {
          "label": "Tarih",
          "value": "16.02.2025"
        },
        {
          "label": "Uzman",
          "value": "Uzm. Dr. Aylin Sert"
        }
      ],
      "body": "Maktulün her iki ayağı, ayak bileği ekleminin hemen üzerinden kesici ve dişli bir aletle (metal veya ahşap testeresi) düzgün biçimde ampute edilmiştir. Sağ temporal bölgede (şakak) yaklaşık 5x3 cm ebadında derin künt travma izi mevcuttur. Yara kenarlarında sivri bir objenin bıraktığı iz görülmektedir. Maktulün tırnak aralarında ince mermer tozu partikülleri bulunmuştur.\n\nKafatası kırığı ve ona bağlı masif subdural kanama tespit edilmiştir. Mide içeriğinde saat 17:00 sularında tüketilmiş kahve ve hafif bir sandviç artıkları tespit edilmiştir. Toksikolojik taramada herhangi bir uyuşturucu, uyarıcı veya alkol bulgusuna rastlanmamıştır. Ayakların kesilmesi işleminin, ölümden en az 3-4 saat sonra (rigor mortis - ölüm katılığı başladıktan sonra) gerçekleştirildiği saptanmıştır.\n\nÖlüm Sebebi: Sağ şakak bölgesine alınan ağır künt travmaya bağlı kafatası kırığı ve beyin kanaması sonucu ani ölüm. Zaman: 14 Şubat 2025, 19:00 — 20:30 arası.",
      "signature": {
        "role": "Adli Tıp Uzmanı",
        "name": "Aylin Sert"
      }
    }
  ],
  "evidence": [
    {
      "id": "ŞÜK-KAF01",
      "tag": "Fiziksel",
      "title": "Kafatasındaki Mermer Tozu",
      "description": "Kurbanın sağ şakağındaki yaranın içinden alınan sürüntü.",
      "details": [
        {
          "label": "İçerik",
          "value": "İnce öğütülmüş Carrera mermeri tozu ve cila artığı."
        },
        {
          "label": "Analiz",
          "value": "Mimarlık ofislerinde özel tasarım maket masalarında veya lüks mutfak tezgahlarında bulunur."
        }
      ]
    },
    {
      "id": "ŞÜK-KGS01",
      "tag": "Dijital/PTS",
      "title": "Tayfun Gürses PTS Kaydı",
      "description": "Tayfun Gürses'e ait Fiat Egea aracın Uludağ yolu plaka tanıma kamerası görüntüsü.",
      "details": [
        {
          "label": "Tarih/Saat",
          "value": "14.02.2025 · 21:30"
        },
        {
          "label": "Yön",
          "value": "Uludağ istikametine çıkış."
        }
      ]
    },
    {
      "id": "ŞÜK-KGS02",
      "tag": "Dijital/PTS",
      "title": "Siyah Mini Cooper PTS Kaydı",
      "description": "Olay yeri yakınlarındaki kameraya yansıyan ve plakası çamurla kapatılmış aracın kaydı.",
      "details": [
        {
          "label": "Tarih/Saat",
          "value": "14.02.2025 · 22:45"
        },
        {
          "label": "Model",
          "value": "Siyah Mini Cooper (Bagaj hacmi çok dar bir araç modeli)."
        },
        {
          "label": "Yön",
          "value": "İniş istikametinde hızla uzaklaşıyor."
        }
      ]
    },
    {
      "id": "ŞÜK-KMR01",
      "tag": "Kamera",
      "title": "FSM Plaza Arka Çıkış Kamerası",
      "description": "Erkan Çevik'in ofisinin bulunduğu binanın arka otopark çıkışını gören kamera.",
      "details": [
        {
          "label": "20:40",
          "value": "Erkan Çevik siyah bir yapı malzemesi çuvalını bagaja yüklemeye çalışıyor, sığmıyor."
        },
        {
          "label": "20:50",
          "value": "Erkan Çevik çuvalı tekrar çıkarıp ofise dönüyor."
        },
        {
          "label": "22:10",
          "value": "Erkan Çevik ofisten tekrar çıkıyor. Bu kez çuval daha kısa görünüyor ve bagaja tam sığıyor."
        }
      ]
    },
    {
      "id": "ŞÜK-BGA01",
      "tag": "Kimyasal",
      "title": "Mini Cooper Bagaj Sürüntüsü",
      "description": "Çevik Mimarlık'a ait siyah Mini Cooper'ın bagaj döşemesinden alınan swap.",
      "details": [
        {
          "label": "Luminol Testi",
          "value": "Yoğun çamaşır suyu ile yıkanmasına rağmen bagajın köşelerinde zayıf kan izleri."
        },
        {
          "label": "DNA Sonucu",
          "value": "Kanın Şükran Atalay'a ait olduğu %99.9 doğrulandı."
        }
      ]
    },
    {
      "id": "ŞÜK-TSR01",
      "tag": "Fiziksel",
      "title": "Demir Testeresi",
      "description": "Erkan Çevik'in ofisindeki depo odasında, maket malzemelerinin arasında bulunan testere.",
      "details": [
        {
          "label": "Durum",
          "value": "Yeni yıkanmış, bıçak kısımları temiz."
        },
        {
          "label": "Kanıt",
          "value": "Sapı ile bıçağın birleştiği vidanın arasında mikroskobik düzeyde insan kemik tozu ve doku kalıntısı bulundu."
        }
      ]
    },
    {
      "id": "ŞÜK-GNY01",
      "tag": "Fiziksel",
      "title": "Mermer Maket Masası",
      "description": "Erkan Çevik'in şahsi ofisinde bulunan devasa Carrera mermeri maket masası.",
      "details": [
        {
          "label": "Bulgular",
          "value": "Masanın sağ sivri köşesinin (gönye şeklinde) ağır kimyasallarla yeni temizlendiği anlaşıldı."
        },
        {
          "label": "Uyum",
          "value": "Köşenin açısı ve yüksekliği, Şükran Atalay'ın başındaki ölümcül yarayla birebir örtüşmektedir."
        }
      ]
    },
    {
      "id": "ŞÜK-SAÇ01",
      "tag": "Biyoloji",
      "title": "Kurbanın Saçındaki Lif",
      "description": "Otopsi sırasında kurbanın saçından alınan özel dokuma halı lifi.",
      "details": [
        {
          "label": "Analiz",
          "value": "İtalya'dan ithal edilen özel üretim antistatik ofis halısına ait. (Bursa'da sadece Erkan Çevik'in ofisinde bulunur)."
        }
      ]
    },
    {
      "id": "ŞÜK-TLF01",
      "tag": "Eksik",
      "title": "Kayıp Telefon",
      "description": "Şükran Atalay'ın kişisel cep telefonu olayın başından beri kayıptır.",
      "details": [
        {
          "label": "Son Sinyal",
          "value": "14 Şubat saat 19:12'de FSM Bulvarı baz istasyonundan sinyal kesilmiştir."
        }
      ]
    },
    {
      "id": "ŞÜK-AYK01",
      "tag": "Eksik",
      "title": "Kesik Ayaklar ve Ayakkabılar",
      "description": "Kurbanın ayak bileğinden itibaren kesilen organları bulunamamıştır.",
      "details": [
        {
          "label": "Sonuç",
          "value": "Ayaklar Mudanya yolunda bir dereye atılarak yok edilmiştir."
        }
      ]
    }
  ],
  "documents": [
    {
      "id": "016-K",
      "docId": "016-K",
      "title": "Şükran Atalay'ın Not Defteri",
      "meta": [
        {
          "label": "Tarih",
          "value": "14.02.2025"
        }
      ],
      "body": "İmar Denetim Notları (14.02.2025)\n\n10:30 - Salih Kocabaş Çay Bahçesi Yıkım Tebligatı imzalandı.\n14:00 - Hakan Saygın projesi için CİMER şikayeti dosyaya eklendi.\n18:00 - Erkan Çevik ofis ziyareti. FSM Projesi çatı katı (400m2 kaçak). TAVİZ VERİLMEYECEK. Mühürleme evrakları ofisine elden götürülecek."
    },
    {
      "id": "016-L",
      "docId": "016-L",
      "title": "Özel Koruma Mahmut GPS Logu",
      "meta": [
        {
          "label": "Kaynak",
          "value": "GPS Takip Cihazı"
        }
      ],
      "body": "Takip Raporu - 14 Şubat\n\n17:45 - Hedef (Şükran Atalay) belediye binasından çıktı.\n18:02 - Hedef, FSM Bulvarı Çevik Mimarlık Plazasına girdi.\n19:00 - Hedef hala içeride.\n20:00 - Plaza ışıkları söndü. Hedef çıkmadı.\n20:15 - Patron (H. Saygın) arandı, takip bırakıldı."
    },
    {
      "id": "016-M",
      "docId": "016-M",
      "title": "Banka Ekstre Dökümü (Pınar Atalay)",
      "meta": [
        {
          "label": "Kurum",
          "value": "Banka A.Ş."
        }
      ],
      "body": "Kredi Kartı İşlemleri\n\n14.02.2025 09:15 - Tüm kartlar Şükran Atalay'ın talimatıyla müşteri hizmetleri üzerinden iptal edilmiştir.\n14.02.2025 19:45 - Pınar Atalay'ın kartıyla 'GetirYemek' üzerinden işlem denenmiş, 'Kart Bloke' hatası alınmıştır."
    },
    {
      "id": "016-N",
      "docId": "016-N",
      "title": "Vildan Çevik HTS Dökümü",
      "meta": [
        {
          "label": "Şebeke",
          "value": "Turkcell"
        }
      ],
      "body": "Baz İstasyonu Kayıtları\n\n18:30 - Nilüfer / Balat (Ev)\n19:15 - Nilüfer / PodyumPark (Eğlence Merkezi)\n20:45 - Nilüfer / PodyumPark\n21:10 - Nilüfer / Balat (Ev)"
    },
    {
      "id": "016-O",
      "docId": "016-O",
      "title": "FSM Plaza Kartlı Geçiş Logları",
      "meta": [
        {
          "label": "Sistem",
          "value": "Plaza Güvenlik"
        }
      ],
      "body": "Ana Kapı Turnike Kayıtları (14 Şubat)\n\n18:05 - Misafir Girişi: Ş. Atalay\n18:45 - Çıkış: B. Özcan (Muhasebe)\n18:50 - Çıkış: Z. Demir (Sekreter)\n\n*Şükran Atalay ana kapıdan hiçbir zaman çıkmamıştır.*"
    },
    {
      "id": "016-P",
      "docId": "016-P",
      "title": "Mini Cooper Araç Ruhsatı",
      "meta": [
        {
          "label": "Belge",
          "value": "Araç Ruhsatı"
        }
      ],
      "body": "Ruhsat Bilgileri\n\nPlaka: 16 EÇ 016\nMarka/Model: Mini Cooper 3 Kapı Hatchback (2022)\nSahibi: Çevik Mimarlık Ltd. Şti.\nZimmet: Erkan Çevik\nBagaj Hacmi: 211 Litre (Yetişkin bir insanın tam sığması imkansız olan çok dar bir alan)."
    },
    {
      "id": "016-Q",
      "docId": "016-Q",
      "title": "Polis İhbar Tutanağı",
      "meta": [
        {
          "label": "Kayıt No",
          "value": "445-A"
        }
      ],
      "body": "Tarih: 14.02.2025 Saat 09:30\nKonu: Gürültü ve Aile İçi Tartışma\nİhbarcı: Kükürtlü Mah. 4. Sok. Bina sakinleri\nDetay: 4 numaralı dairede anne (Şükran) ve kızı (Pınar) arasında şiddetli kavga ve eşya fırlatma sesleri. Polis intikal ettiğinde taraflar sakinleşmiş, şikayetçi olunmamıştır."
    },
    {
      "id": "016-R",
      "docId": "016-R",
      "title": "Çay Bahçesi Yıkım Emri",
      "meta": [
        {
          "label": "Kurum",
          "value": "Osmangazi Bel."
        }
      ],
      "body": "Karar No: 2025/112\nMuhatap: Salih Kocabaş\nKonu: Uludağ Yolu mevkisindeki orman arazisine taşan 45 metrekarelik kaçak pergolanın yıkımı hakkında. Verilen 15 günlük süre dolmuştur. Yıkım işlemi 16 Şubat sabahı kepçe ile gerçekleştirilecektir.\nİmza: Şükran Atalay - Başdenetçi"
    }
  ],
  "technical": [
    {
      "id": "016-S",
      "docId": "016-S",
      "title": "Cerrahi Analiz Raporu — Ayak Kesikleri",
      "meta": [
        {
          "label": "Birim",
          "value": "Adli Tıp Biyomekanik"
        }
      ],
      "body": "Kemik Kesim Analizi\n\nAdli Tıp Biyomekanik şubesinin incelemesine göre, ayak bileklerinde (tibia ve fibula kemikleri) bulunan kesik izleri, tıbbi bir cerrahi aletle değil, endüstriyel bir bıçak veya demir testeresi ile yapılmıştır. \n\nKesilen yüzeylerde 'tereddüt izi' denilen ve failin işlemi yaparken zorlandığını, durup tekrar başladığını gösteren yatay çizikler vardır. Failin tıbbi anatomik bilgisi olmadığı, sadece 'kemiklerin en ince olduğu yeri' seçerek mantıken bilekleri hedef aldığı görülmektedir.\n\nÖnemli olan bir diğer bulgu; rigor mortis (ölüm katılığı) evresindeki bir cesedin uzuvlarının bükülememesi durumudur. Ölümden hemen sonra bükülebilen eklemler, 3 saat sonra kilitlenir. Failin, kaskatı kesilmiş bir bedeni dar bir alana (örn: küçük bir araba bagajı) sığdırmak için dizleri bükemediğinden, pratik bir çözüm olarak en çok taşan kısmı, yani ayakları kestiği yüksek ihtimaldir."
    }
  ],
  "messageThreads": case016MessageThreads,
  "timeline": [
    {
      "id": "tl-01",
      "time": "14.02.2025 · 09:15",
      "event": "Şükran Atalay, kızı Pınar'ın tüm kredi kartlarını iptal ettirir.",
      "source": "016-M",
      "critical": false
    },
    {
      "id": "tl-02",
      "time": "14.02.2025 · 09:30",
      "event": "Şükran ve Pınar arasında büyük bir kavga kopar, polis çağrılır.",
      "source": "016-Q",
      "critical": false
    },
    {
      "id": "tl-03",
      "time": "14.02.2025 · 17:45",
      "event": "Şükran belediyeden çıkar, Hakan Saygın'ın koruması Mahmut onu takibe başlar.",
      "source": "016-L",
      "critical": false
    },
    {
      "id": "tl-04",
      "time": "14.02.2025 · 18:05",
      "event": "Şükran, Erkan Çevik'in FSM'deki ofis binasına giriş yapar.",
      "source": "016-O",
      "critical": false
    },
    {
      "id": "tl-05",
      "time": "14.02.2025 · 18:50",
      "event": "Tüm ofis personeli çıkar. Şükran ve Erkan ofiste yalnız kalır.",
      "source": "016-O",
      "critical": false
    },
    {
      "id": "tl-06",
      "time": "14.02.2025 · 19:12",
      "event": "CİNAYET ANI. Tartışma sırasında itilen Şükran başını mermer masaya çarpar ve ölür.",
      "source": "ŞÜK-GNY01",
      "critical": true
    },
    {
      "id": "tl-07",
      "time": "14.02.2025 · 20:00",
      "event": "Koruması Mahmut, Şükran'ın çıkmadığını bildirir, Hakan Saygın takibi sonlandırır.",
      "source": "016-L",
      "critical": false
    },
    {
      "id": "tl-08",
      "time": "14.02.2025 · 20:40",
      "event": "Erkan cesedi siyah bir çuvalla arka kapıdan çıkarır ancak Mini Cooper'ın küçük bagajına sığdıramayıp ofise geri döner.",
      "source": "ŞÜK-KMR01",
      "critical": true
    },
    {
      "id": "tl-09",
      "time": "14.02.2025 · 21:00",
      "event": "Erkan, rigor mortis ile kaskatı kesilen cesedin dizlerini bükemediği için depo odasındaki testereyle ayaklarını keser.",
      "source": "016-S",
      "critical": true
    },
    {
      "id": "tl-10",
      "time": "14.02.2025 · 22:10",
      "event": "Erkan boyu kısalmış ceset çuvalını kolayca bagaja yükler ve yola çıkar.",
      "source": "ŞÜK-KMR01",
      "critical": true
    },
    {
      "id": "tl-11",
      "time": "14.02.2025 · 22:45",
      "event": "Çamurlu plakalı siyah Mini Cooper, cesedi Uludağ yoluna atarken Tayfun Gürses tarafından tesadüfen görülür.",
      "source": "016-F2",
      "critical": true
    },
    {
      "id": "tl-12",
      "time": "14.02.2025 · 23:30",
      "event": "Erkan evinin otoparkında bagajı çamaşır suyu ile temizler. Vildan olaya tanık olur ama sevgilisiyle ilgili bir kriz sanar.",
      "source": "016-D3",
      "critical": false
    },
    {
      "id": "tl-13",
      "time": "15.02.2025 · 02:30",
      "event": "Kamp yapan öğrenciler cesedi bulur ve polis çağrılır.",
      "source": "Özet",
      "critical": false
    }
  ],
  "deduction": {
    "contradictions": [
      {
        "pin": false,
        "text": "Erkan Çevik: 'Saat 19:00'da eve geçtim' → FSM Plaza arka kapı kamerası (016-O) 20:45'e kadar orada olduğunu kanıtlıyor."
      },
      {
        "pin": false,
        "text": "Vildan Çevik: '19:15'te evdeydik' → HTS kayıtları (016-N) o saatte kendisinin PodyumPark'ta olduğunu kanıtlıyor."
      },
      {
        "pin": false,
        "text": "Erkan Çevik: 'Şükran ofisten yürüyerek çıktı' → Mahmut'un GPS takibi (016-L) Şükran'ın girdiği kapıdan çıkmadığını doğruluyor."
      },
      {
        "pin": false,
        "text": "Tayfun Gürses: 'Evde oyun oynuyordum' → PTS kayıtları (ŞÜK-KGS01) aracının olay saatinde cinayet mahalline giden yolda (Uludağ) olduğunu kanıtlıyor."
      }
    ],
    "elimination": [
      {
        "pin": false,
        "text": "Pınar Atalay: Cinayet saatinde Cenk ile beraberdi, mesajlar bunu doğruluyor. Motivasyonu ve gücü ayak kesme eylemine ve mermer masaya çarptırmaya uymuyor."
      },
      {
        "pin": false,
        "text": "Hakan Saygın: Tüm gece restoranda sevgilisiyle beraberdi (kamera onaylı). Cinayet saatinde adamı Mahmut binanın önündeydi, Hakan'ın fiziksel olarak orada olması imkansız."
      },
      {
        "pin": false,
        "text": "Tayfun Gürses: Şükran'dan nefret ediyordu ama Uludağ'da sadece kız arkadaşıyla buluşmuştu ve tesadüfen katilin Mini Cooper'ını gördü."
      },
      {
        "pin": false,
        "text": "Salih Kocabaş: Dükkanı Uludağ'da olsa da cinayet 30 km ötede FSM bulvarındaki bir mimarlık ofisinde gerçekleşti."
      }
    ]
  },
  "verdict": {
    "perpetratorId": "erkan",
    "perpetratorName": "Erkan Çevik",
    "murderTime": "14 Şubat 2025, 19:00 — 20:30 arası.",
    "murderLocation": "Çevik Mimarlık (FSM Bulvarı) - Erkan'ın şahsi ofisinde bulunan mermer maket masası.",
    "murderWeapon": "Künt travma (İtilme/Kaza) sonrası ölüm.",
    "motivation": "Plansız cinayeti örtbas etme telaşı ve cesedi bagaja sığdıramama.",
    "evidenceList": [
      "ŞÜK-KMR01: FSM Plaza Arka Kapı Kamerası (Bagaja sığmayan ve 1 saat sonra küçülen çuval)",
      "016-S: Cerrahi Analiz Raporu (Rigor mortis gerçeği ve kesim tekniği)",
      "016-P: Mini Cooper Araç Ruhsatı (Bagajın 211 litre gibi yetersiz bir alan olması)",
      "016-L: Mahmut GPS Takip Logu (Kurbanın binadan hiç çıkmaması)",
      "ŞÜK-GNY01: Mermer Maket Masası (Kanın temizlendiği ama DNA uyuşan ölümcül nokta)"
    ],
    "conclusion": "Erkan Çevik, kaza sonucu öldürdüğü Şükran Atalay'ın cesedini taşımak istemiş ancak rigor mortis kilitlenmesi ve Mini Cooper bagajının çok küçük olması nedeniyle pratik bir çözüm olarak ayaklarını testereyle kesmiştir.",
    "wrongAnswerMessage": "Yanlış çıkarım. Odaklanman gereken nokta bagajın boyutu ve saatler arasındaki boşluktu. Gerçek fail serbest kaldı.",
    "solutionDocLabel": "016-Z2 · Resmi Çözüm Belgesi",
    "solutionHtml": "<h2>Çözüm: Gönye ve Bagaj</h2><p>Cinayet saat 19:12'de FSM Plazadaki ofiste kazara işlendi. Erkan Çevik tartışma esnasında Şükran'ı mermer masanın köşesine itti. Ölüm anında polisi arasaydı kariyeri bitecekti, bu yüzden cesedi Uludağ'a atmaya karar verdi. Ancak cesedi siyah bir çuvala koyup saat 20:40'ta Mini Cooper aracının bagajına yüklemeye çalıştığında korkunç bir problemle karşılaştı: Araç bagajı sadece 211 litreydi ve rigor mortis (ölüm katılığı) geçiren cesedin dizleri bükülemiyordu. Erkan ofise geri döndü, depodaki hobi demir testeresini alarak kadının taşan ayaklarını bilekten kesti. Boyu kısalan cesedi 22:10'da bagaja kolayca yükleyerek Uludağ yoluna atıp evine döndü.</p><p>Tayfun Gürses'in dağ yolunda Mini Cooper'ı görmesi ve Vildan'ın gece kocasını çamaşır suyu ile bagaj yıkarken yakalaması faili ele veren diğer en büyük göstergelerdir.</p>"
  },
  "difficulty": "Zor",
  "recommendedPlayers": "1-4",
  "date": "15 Şubat 2025 · Gece 02:30 (Bulunma)",
  "tabSectionSub": {
    "brief": "016-A · Olay Yeri",
    "supheliler": "Gizli · 06 Profil",
    "ifadeler": "016-C → 016-H",
    "adli-tip": "016-A · 016-B",
    "deliller": "10 Adet Delil Fişi",
    "belgeler": "016-K → 016-R",
    "teknik": "016-S",
    "deduction": "Notlar · Sadece sana özel",
    "cozum": "016-Z2 · Sınırlı Erişim"
  },
  "timelineInitialOrder": [
    "tl-09",
    "tl-07",
    "tl-02",
    "tl-03",
    "tl-10",
    "tl-05",
    "tl-13",
    "tl-04",
    "tl-08",
    "tl-01",
    "tl-11",
    "tl-06",
    "tl-12"
  ]
};
