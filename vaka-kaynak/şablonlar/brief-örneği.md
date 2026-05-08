# Vaka Brief'i Nasıl Yazılır

Brief = senin yarım sayfalık yaratıcı tohumun. Claude Code bu brief'ten 4 aşamada tam vaka çıkartır.

## Brief'in işlevi

Brief, vakanın **DNA'sını** koyar. Burada yazdıklarına Claude **sadık kalır**. Yazmadıklarını **yaratır**. Yani:

- Yazarsan → kontrol sende
- Yazmazsan → Claude doldurur (genelde fena değil ama varsayılan tarza kayar)

## En kısa anlamlı brief (tek paragraf)

Acil durumda, hızlı vaka istiyorsan, minimum şu kadar yaz:

> "İzmir Alsancak'ta bir restoran sahibi cinayeti. Kurban 55 yaşında, eski kuşak iş adamı, aile şirketi yöneticisi. Fail oğlu — şirketi modernleştirmeye çalışırken babasıyla 5 yıldır savaşıyor. Sahnede kazara düşme süsü var ama bıçak izi mutfakta. Zehirleme veya künt travma. Atmosfer: Ege akşamı, kapalı restoran, eski-yeni çatışması."

Bu yedi cümle Claude için yeterli.

## Optimum brief — yapılandırılmış 8 başlık

Kontrol sende kalsın istiyorsan, **şu yapıyla** yaz. Hepsi zorunlu değil ama daha çok başlık doldurursan o kadar tutarlı çıkar.

### Şablon

````markdown
# Vaka [ID] — [Codename]

## Konsept (zorunlu)
[1-2 cümle. Vakanın özü. "Şu kişi şu yerde şöyle öldürüldü, fail şu kişi, motiv şu."]

## Kurban
- **Ad ve yaş:** [Tam ad, yaş]
- **Meslek/Konum:** [Ne iş yapıyor, nerede çalışıyor]
- **Karakter:** [Sevimli mi, soğuk mu, sevilmiş mi sevilmemiş mi — 2-3 sıfat]
- **Sosyal çevre:** [Ailesi, arkadaşları, partnerleri — kısaca]

## Konum
- **Şehir + semt:** [İzmir Alsancak / Trabzon Akçaabat / Edirne Karaağaç]
- **Mekân tipi:** [Ev / iş yeri / restoran / otel / dış mekân]
- **Atmosfer:** [Karanlık, kapalı, izole? Veya kalabalık ortamda mı?]

## Tarih
[Ay + yıl — "Aralık 2024" veya "Mart 2025". Olayın gece veya gündüz olduğu önemli.]

## Fail
- **Kim:** [Ad — yoksa "şu rol" yeter, Claude doldurur]
- **Motif:** [Neden öldürdü — psikolojik + pragmatik karışım iyi olur]
- **Kritik hata:** [Failin yakalanmasına neden olan hata — opsiyonel ama harika]

## Şüpheliler (opsiyonel ama önerilir)
[3-6 şüpheli, her biri için 1 satır. Failin kim olduğunu belirtmesen Claude seçer.]

- **[Ad]:** [Rol + tek cümle motiv/şüphe nedeni]
- **[Ad]:** [Rol + tek cümle motiv/şüphe nedeni]
- ...

## Kırmızı ringa(lar)
[1-2 sahte şüpheli — gerçekten suçlu görünen ama olmayan. Niye şüphe çekiyor, niye değil.]

## Anahtar deliller (opsiyonel)
- [Delil 1: ne, niye önemli]
- [Delil 2: ne, niye önemli]

## Atmosfer + ton notları
[Vakanın hissi. Klostrofobik mi, melankolik mi, hızlı mı? Türk polisiye geleneklerinin neresinde duruyor?]

## Çeşitlilik notları
[Bu vakanın önceki vakalardan ne yönde farklı olduğu — şehir, sınıf, motiv, kurban tipi]

## Yapma
[Olmasını istemediğin şeyler. "Aşk üçgeni olmasın", "yüksek teknoloji yok", "polis kötü değil" gibi.]
````

## Örnek 1 — Kısa brief (Claude çoğunu doldurur)

````markdown
# Vaka 167 — Bagaj

## Konsept
İstanbul Havalimanı kargo bölgesinde bir bagaj görevlisi cinayeti. Vardiya değişiminde, gece 03:00. Kurban 42 yaşında bir yıldır işsizlik sorunu yaşamış, bu işe yeni başlamış. Aslında özel bir şey biliyordu.

## Kurban
- **Ad ve yaş:** Hasan Aydın, 42
- **Meslek:** IGA bagaj görevlisi (5 ay)
- **Karakter:** Sessiz, tedbirli, yakın çevresinde "borçlu" olarak biliniyor
- **Aile:** Eşi ayrılmış, 12 yaşında oğlu var

## Konum
- **Şehir:** İstanbul Havalimanı, kargo terminali (yolcu değil — havayolu kargo bölgesi)
- **Mekân tipi:** Endüstriyel, dev hangar, gece sessiz
- **Atmosfer:** Yapay aydınlatma, soğuk, gece vardiyası izole

## Tarih
22 Şubat 2025, gece 03:00 civarı

## Fail
- **Motif:** Hasan'ın bagaj kontrolünde fark ettiği bir şey — büyük ihtimalle uyuşturucu sevkiyatı
- **Kritik hata:** Telefonu yanına almış olması (kayıt bıraktı)

## Şüpheliler
- **Mehmet (üst amir):** Bilerek vardiya programını manipüle etmiş olabilir
- **Selim (vardiya arkadaşı):** Aynı saatte aynı yerde, ifadesi tutarsız
- **Ayşe (eski sevgili):** Hasan'ın oğlu üstünde velayet davası
- **Volkan (lojistik şoförü):** O gece beklenmedik şekilde gelmiş
- **Burak (havalimanı güvenlik):** Kamera sistemine erişimi var, olay gecesi 5 dakikalık bir kayıt eksik

## Kırmızı ringa
Ayşe (eski sevgili) — velayet davası nedeniyle çok şüpheli görünür. Aslında o gece çocuğunun yanında, alibi sağlam.

## Atmosfer
Türk polisiyesi, mavi yaka, "kimse kimseye güvenmiyor" havası. Karanlık, sessiz, geri kalmış havalimanı bölümü.

## Çeşitlilik
- Önceki vakaların aksine **mavi yaka** kurban
- İstanbul ama **kentli profesyonel değil** — alt-orta sınıf işçi
- Mekân **dış/endüstriyel** (önceki vakalar evde)
- Motif **iş/kaçakçılık** (önceki vakalar ilişki/finansal)

## Yapma
- Aşırı action sahnesi yok (kovalamaca, silah çıkartma)
- Uyuşturucuyu bir tema olarak vurgu yapma — alt katman olsun
````

Bu briefle Claude **iyi bir vaka çıkartır**. Şüpheliler var, motif net, çeşitlilik gözetilmiş.

## Örnek 2 — Detaylı brief (sen daha çok yazmışsın)

````markdown
# Vaka 178 — Hisar

## Konsept
Edirne'de eski bir Osmanlı tarihi konağında düzenlenen özel bir akademisyen toplantısı sırasında profesör cinayeti. Kapalı kapı arkası: 6 akademisyen, 1 ölü. Kimse binadan çıkamamış (kar fırtınası). Klasik "kapalı oda" formatı ama daha politik.

## Kurban
- **Ad ve yaş:** Prof. Dr. Cemil Tanrıkulu, 64
- **Meslek:** Trakya Üniversitesi tarih bölüm başkanı, Osmanlı arşiv uzmanı
- **Karakter:** Otoriter, çoğunluk tarafından sevilmemiş, akademik politika ustası
- **Sosyal:** Boşanmış, kızı yurt dışında, asistanlarıyla yakın

## Konum
- **Şehir:** Edirne · Saraçlar · Eski Hisar Konağı (özel toplantı için kiralanmış)
- **Mekân:** 18. yy konak, 8 oda + büyük salon, kar nedeniyle çıkış yok 14 saat
- **Atmosfer:** Klostrofobik, eski mobilyalar gıcırdar, kalorifer yarım çalışıyor

## Tarih
3 Şubat 2025, akşam yemeği sonrası 22:00 — sabah 09:00 keşif

## Fail
- **Kim:** Doç. Dr. Esra Yılmaz, 38, Cemil'in eski asistanı
- **Motif:** Cemil'in 5 yıl önce çaldığı bir akademik buluş (Esra'nın doktora teziydi, Cemil yayımladı kendi adıyla). Yeni bir kitap çıkacak ve Cemil yine aynı şeyi tekrarlamak üzere.
- **Kritik hata:** Cemil'in çay bardağına koyduğu zehir miktarını fazla hesaplamış — başka bir akademisyenin de bardağına dökülmüş, ama o ölmedi (alerjik olduğu için kahve içiyordu, çayı içmedi).

## Şüpheliler
- **Doç. Dr. Esra Yılmaz, 38:** Asistandı, tezi çalındı (gerçek fail)
- **Prof. Dr. Murat Bayrak, 71:** Eski rakip, akademik intikam motivli görünür
- **Doç. Dr. Selin Köse, 45:** Cemil'in son sevgilisi, 6 ay önce ayrıldılar
- **Asis. Doç. Onur Kaya, 35:** Cemil'in mevcut asistanı, mali yardım almakta
- **Prof. Dr. İbrahim Demir, 58:** Toplantının ev sahibi, konağı kiralayan
- **Doç. Dr. Yasemin Aktaş, 42:** Yayınevi sahibi, Cemil'le sözleşme imzalamak için orada

## Kırmızı ringalar
- **Murat (eski rakip):** En açık motif, akademik intikam, kavgalı geçmiş — çok şüpheli görünür ama kalbi rahatsız, fiziksel olarak akşamdan sonra yatakta uyumuş
- **Onur (asistan):** Cemil'le tartıştığını birkaç kişi duydu — aslında sadece konferans bütçesi tartışıyordu

## Anahtar deliller
- Çay bardağında kalan tortu (toksikoloji)
- Alerjik akademisyenin kullanılmamış çay bardağı (ipucu)
- Esra'nın laptopunda çıkmış doktora tezinin kopyaları (eski tarihli)
- Cemil'in cebinden çıkan, yarım yazılmış mektup ("Esra haklıydı, ama artık çok geç")

## Atmosfer
Akademik kibir, eski-yeni nesil çatışması, kar manzarası. Türk akademisinin entrikalı kültürü. Soğuk, klostrofobik, herkesin birbirini tanıdığı bir ortamda kim kime güvenir?

## Çeşitlilik
- **Edirne** — yeni bir şehir, taşra ama kültürel
- **Akademik** — yeni bir meslek tabakası
- **Kapalı oda** — yeni bir format
- **Zehirleme** — yeni bir yöntem
- **Fail kadın** — pattern değişimi (önceki failler erkek ağırlıklı)
- **Kurban yaşlı** — pattern değişimi (önceki kurbanlar 21-42 arası)

## Yapma
- "Nostaljik akademi günleri" gibi melodrama
- Aşk üçgenine fazla odaklanma — Selin'in ilişkisi alt katman, ana motiv akademik çalmadır
- Çok detaylı tarih jargonu (vakanın akademik ortamı yeter, içine girme)
````

Bu detaylı briefle Claude **çok tutarlı vaka** çıkartır. Tüm anahtar elementler var, çelişkiler ve kırmızı ringalar tanımlı.

## Yazarken tavsiyeler

### ✅ İyi pratikler
- **Konsepti tek paragrafta yaz** önce — "Şöyle bir cinayet, şöyle motiv"
- Kurbanı insan yap — sadece "öldürülen" değil, kişiliği olan biri
- Failin **psikolojik motivini** vur — sadece "para için" değil
- **Mekânı görselleştir** — okuyucu (Claude) o mekânı görsün
- Çeşitlilik notlarını **mutlaka** ekle — tutarlılığı korur

### ❌ Kaçınılacaklar
- "Şu olur, sonra şu olur, sonra şu olur" — çok uzun ardışık anlatım yapma. Brief = tohum, hikaye değil.
- Klişe motifler — "para için karısını öldürdü" tek başına zayıf. Üstüne bir psikolojik katman koy.
- Aşırı detaylı isim listesi — "Mehmet, Ahmet, Mustafa, Ali, Hasan" karıştırır. 5-6 farklı, akılda kalan isim seç.
- Spoiler verme havası — "Aslında köpek yapmıştı, herkesi şaşırtacak" — Claude bu twistleri zaten kuruyor, sen koymasan da olur.

## Brief'i nereye koyacaksın

Brief dosyasını şuraya koy:

````
vaka-kaynak/briefler/[id]-[codename].md
````

Örnekler:
- `vaka-kaynak/briefler/167-bagaj.md`
- `vaka-kaynak/briefler/178-hisar.md`

## Brief'i Claude Code'a verme

Brief'i kaydettikten sonra Claude Code'da:

````bash
claude "vaka 167 için brief: vaka-kaynak/briefler/167-bagaj.md, başla"
````

Veya interaktif modda:

````
> brief 167-bagaj.md, vaka oluşturmaya başla
````

Claude SKILL.md'yi okuyup workflow'u başlatır.

---

## Yedi soru — brief yazmak için sıkıştığında

Yazma engeline takılırsan kendine şunu sor:

1. **Kurban niye öldürüldü?** (Motivasyon)
2. **Niye o kişi öldürdü, başkası değil?** (Faili tanımla)
3. **Niye o gece, niye o saatte?** (Tetikleyici)
4. **Fail niye yakalandı?** (Kritik hata)
5. **Hangi 3 kişi şüpheli görünür?** (Kırmızı ringalar)
6. **Hangi delil zincirini bağlar?** (Anahtar kanıt)
7. **Bu vaka neye benzemiyor?** (Çeşitlilik)

Yedi cevap verince briefin %80'i yazılmış demektir.