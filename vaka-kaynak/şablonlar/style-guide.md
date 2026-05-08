# D.A.K.T. Üslup Rehberi

Bu rehber yeni vakanın **D.A.K.T. hissi** taşımasını garantiler. Mevcut beş vaka (042, 053, 067, 089, 114) bu kuralları izledi. Yeni vakalar da izlemeli.

## Genel atmosfer

D.A.K.T. **gerçekçi bir Türk polisiyesi** atmosferinde geçer. Yapı şu:

- **Beyaz dövüş ışığı yok** — fail her zaman bir insan, motiv her zaman psikolojik veya pragmatik
- **Sürpriz çözüm yok** — analist iyi okursa çözebilir, "deus ex machina" yasak
- **Bayağı olmayan dramatik** — duygusal anlar var ama melodram değil
- **Bürokratik kabuk + insani çekirdek** — emniyet dilinde başlayıp, ifadelerde insan psikolojisine düşer

## Türkçe dil kuralları

### Genel
- **Akıcı, sade, doğal Türkçe**. Şiirsel olmasın, klişe olmasın.
- "Olmuştur, edilmiştir" gibi resmi yazılı dil **sadece** otopsi/olay yeri raporlarında.
- İfadelerde **konuşulmuş dil**: "geldim, gördüm, dedi" — basit fiil.
- Aşırı süslü kelimeler yok ("vakit", "elem", "dirençlilik" gibi). Doğal: "zaman", "üzüntü", "dayanıklılık".

### Karaktere göre dil
Her şüpheli **kendi sosyal sınıfı/yaşı/eğitim seviyesinde** konuşur:

**Üst sınıf, eğitimli, yönetici:**
> "Anlaşma maddelerini avukatımla görüşmek istiyorum. Sorularınıza yanıt vermeyi reddetmiyorum, sadece prosedüre uygun ilerleyelim."

**Genç, yaratıcı, modern:**
> "Yani Berk son 3 aydır beni ya manipüle ediyor ya da iyice paranoyak. İkisi arası bir şey kalmadı sanki."

**Yaşlı, mütevazı, taşrali:**
> "Zeynep Hanım iyi bir kiracıydı. Süt-ekmek bırakırdım sabah. O gün de bıraktım, açmadı. Aradım açmadı. Kapı açıktı."

**Obsesif, dengesiz:**
> "Ben sadece izleyicisiydim. 18 ay her yayın. Modlukluk istedim, vermediler. Ama ben kötü biri değilim, anlıyor musunuz?"

### Diyalog formatı (ifadeler)

**Mutlaka şu format:**

```
S: Soru metni.
C: Cevap metni.
```

Veya doğrudan anlatım, sonra soru-cevap. Her ifade en az iki S/C bloğu içermeli.

**Duraksamalar parantezli:**
- `[duraksama]`
- `[sessizlik]`  
- `[uzun sessizlik]`
- `[panik]`
- `[ağlama]`
- `[gülümseme]`
- `[sinirli]`
- `[şaşkınlık]`
- `[avukatla fısıldaşma]`
- `[telefonu kapatır]`

**Vurgulu kelimeler `<strong>` ile işaretlenir** (HTML'den geliyor — JSON'da da öyle olabilir, builder dönüştürür):
> "Berk'in evine gittim ama **içeri girmedim**."

## Belge başlıkları ve kodlama

Her belgenin **kodu** olmalı. Format: `[VakaID]-[HARF]`

**Standart kodlama:**
- `[id]-A` → Olay yeri raporu
- `[id]-B` → Otopsi raporu
- `[id]-C, C2, C3` → Birinci şüphelinin ifadeleri (oturum varsa)
- `[id]-D, D2` → İkinci şüphelinin ifadeleri
- `[id]-E, E2` → Üçüncü şüphelinin ifadeleri
- ... harf sırasıyla devam
- `[id]-K, L, M, N, O, P, Q, R` → Belgeler (sözleşmeler, mali kayıt, mesaj zincirleri, e-postalar, kameralar)
- `[id]-S, T` → Teknik analizler (DNA, balistik, dijital adli)
- `[id]-Z2` → Çözüm belgesi (sınırlı erişim)

Delil kartları **ayrı kodlama**: `[KISALTMA]-[KAT]##` örn `ZYN-USB01`, `ZYN-VOD01`. Genelde kurban adının ilk 3 harfi + delil tipi.

## Mekân ve atmosfer

- **Şehir + semt + mahalle/sokak** belirtilmeli ("İstanbul · Beşiktaş · Akatlar Mah. · Lale Sok. No:7 D:12")
- Mekânın **karakteri** vurgulanmalı: huzurlu, sık dokulu, izole, lüks, kasvetli
- Çevre detaylar: hava (gece sis, yağmur, kuru sıcak), ses (deniz, trafik, sessizlik)

## Karakter detayları

Her karakter için:
- **Tam ad** (Türkçe, gerçekçi)
- **Yaş** (18 ve üstü, çeşitli aralıklar)
- **Meslek + iş yeri** (gerçekçi sektörler — medya, finans, akademi, sağlık, vs.)
- **Adres** (yaşadığı semt — kurbana yakınlık önemli)
- **İfadelerde küçük detaylar**: hobiler, alışkanlıklar, takıntılar (insan dokusu için)

## Cinayet yöntemleri

D.A.K.T. **gerçekçi yöntemler** kullanır:

- Boğma (ipliksel, manuel, plastik torba) ✓ kullanıldı
- Künt travma (ağır cisim, düşme süsü)
- Bıçaklama (mutfak bıçağı, çok yaygın)
- Zehirleme (ilaç dozu aşımı, gıda)
- Ateşli silah (ev silahı, av tüfeği — Türkiye'de yaygın)
- Boğulma (su altında — küvet, deniz, gölet)
- İlaçla baygınlaştırma + ikinci yöntem
- Trafik kazası süsü
- İntihar süsü (özellikle ipte asılma sahnelenmiş)

**Aşırı egzotik yöntemler kullanma**: zehirli yılan, gizli laboratuvar, vs. Gerçek hayatta nadir.

## Kanıt çeşitliliği

Her vakada **en az 5 farklı tip** kanıt olsun:

1. **DNA / biyolojik** — saç, kan, deri parçası, sperm
2. **Dijital** — telefon kayıtları, email, sosyal medya, kamera
3. **Fiziksel** — eşya, izler, parmak izi, ayak izi
4. **Tanık** — başka birinin gördüğü/duyduğu
5. **Belgesel** — sözleşme, mektup, banka, sağlık raporu
6. **Davranışsal** — tutarsız ifade, beden dili, alibi açığı
7. **Mesajsal** — chat, mesaj zinciri, sesli mesaj

## Mesaj zincirleri (MessageThread)

Her vakada **en az 1 mesaj zinciri** olmalı. Format: WhatsApp/Instagram/iMessage/Twitch chat/Email.

**Önemli:** Vakanın temposuna uygun seç:
- Genç kurban → Instagram DM, WhatsApp
- Profesyonel kurban → Email, iMessage
- Yayıncı kurban → Twitch chat (053 örneği)
- Akademik → Email
- Yaşlı kurban → SMS, ses kayıtlı WhatsApp

Mesajlar **gerçekçi** olmalı: emoji kullanımı (genç karakterler), yazım hataları (paniklerde), kısa-cevaplar (sıkışınca).

## Çelişkiler ve kırmızı ringalar

D.A.K.T. vakası **iyi tasarlanmış** olmalı:

### İyi vaka sahnesi:
- 6 şüpheliden **en az 3'ü gerçekten şüpheli**: alibi açığı, motivasyon, fırsat
- **Gerçek fail** en açık şüpheli **olmamalı** — analist çıkarım yapsın
- **Kırmızı ringa** mantıklı: "öyle gözüktü ama değil" — haklı bir nedeni vardı (örn: o gece orada olduğunu sakladı çünkü başka bir şey saklıyordu)
- **İki yalancı** kuralı: en az iki kişi bir şey gizliyor, biri fail, diğeri **başka bir şey** için yalan söylüyor

### Failin profili:
- Motivasyon **psikolojik + pragmatik** karışık (sadece para değil, sadece intikam değil)
- En az **bir kritik hata** yapmış (kanıt zincirinin bir halkası bu hata)
- Diğer şüphelilerden **daha az dikkat çeken** olmalı (tipik karakter)
- İfadesinde tutarsızlık var ama bariz yalan değil — sıkıştırılınca açılıyor

## Çözüm yapısı

Çözüm belgesi **şu yapıyı** izlemeli:

1. **Failin Kimliği** (ad)
2. **Cinayet Saati ve Yöntemi** (detaylı, dakika dakika)
3. **Cinayet Sonrası Davranış** (yayın kapatma, mesaj bırakma, kanıt götürme)
4. **Failin Kritik Hatası** (en önemli — analizin kapanış halkası)
5. **İki Yalancı** (fail + bir başkası, ikisinin de niye yalan söylediği)
6. **Kırmızı Ringalar** (şüphe çekmiş ama suçsuz olanlar — niye şüphe çektiler, niye değiller)
7. **Dayandığı Kritik Belgeler** (10-12 belge, kod ile referanslı)
8. **Sonuç paragrafı** (motivasyon + sonuç)
9. **Tutuklama tarihi**
10. **Ek soruşturmalar** (yan suçlar — takipçilik, tehdit, vb.)

## Çözüm soruları

Analist çözüm zarfını açmadan önce **kendine** sorması gereken **7 soru**:

Format şöyle:
```
1. [Olayın merkezi sorusu] — örn "Yayının son karesindeki gölge kime ait?"
2. [Yöntem sorusu] — "OBS'yi kim ve nasıl kapattı?"
3. [Alet sorusu] — "Cinayet aleti ne ve nerede bulundu?"
4. [Psikolojik soru] — "Failin sahnesi ne anlama geliyor?"
5. [Kurban davranışı sorusu] — "Kurban niye kapıyı açtı / bu sözü söyledi?"
6. [İki yalancı sorusu] — "Hangi iki kişi yalan söylüyor ve niye?"
7. [Kritik hata sorusu] — "Failin hatası ne, hangi delil ele veriyor?"
```

Sorular **vakaya özgü** olmalı, jenerik değil.

## Tarihler

- **Olay tarihi**: yakın geçmiş (2023, 2024, 2025) — okuyucu bağ kursun
- **Format**: GG.AA.YYYY veya "GG Ay YYYY" (03.11.2024 veya "3 Kasım 2024")
- **Saatler**: 24 saat (00:30, 14:00, 23:45)
- **İfade tarihleri**: olaydan 1-7 gün sonra (mantıklı emniyet süreci)

## Yasaklar (asla yapma)

- ❌ 18 yaş altı karakterleri (ne fail ne kurban)
- ❌ Çocuk istismarı, cinsel saldırı temaları
- ❌ Etnik/dinsel/cinsel yönelim stereotipleri
- ❌ "Akıl hastası fail" tek motiv olarak (çok klişe + sorumsuz temsil)
- ❌ Doğaüstü öğeler (cin, hayalet, lanet)
- ❌ Egzotik yöntemler (zehirli yılan, lazer, vs.)
- ❌ "Aslında ikiz kardeşti" tarzı saçma twistler
- ❌ Polisin kötü adam olduğu vakalar (D.A.K.T. polis yanlısı değil ama anti-polis de değil)
- ❌ Mevcut vakanın yakın kopyası

## Mevcut vakalardan öğrenilenler

**Vaka 042 (Karaağaç)** — kentli, profesyonel kurban, ev içi cinayet, fail eski sevgili (Meryem), motif: psikolojik takıntı

**Vaka 053 (Offline)** — Twitch yayıncısı kurban, yayıncılık menajeri fail (Berk), motif: sponsorluk + kanal devralma. **Yeni vaka 053'e benzemesin.**

**Vaka 067 (Koleksiyoncu)** — Bebek'te koleksiyoner kurban, fail kız arkadaşı (Selin), motif: gizli geçmiş

**Vaka 089 (Peri Bacası)** — Göreme'de turist kurban, fail otelci (Alp), motif: arazi ihtilafı + cinayet zinciri. **Tek taşra vakası.**

**Vaka 114 (Cam Kule)** — Levent gökdeleninde kurban, fail iş ortağı (Vedat), motif: finansal entrika

**Pattern uyarısı:** 5 vakanın 4'ü İstanbul, 4'ü kentli profesyonel, 3'ünde fail erkek ve 30+ yaş. **Yeni vakalar bu pattern'den çıkmalı.**