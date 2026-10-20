# D.A.K.T. — Division of Analytic Knowledge & Testimonies

Türkçe, tarayıcıda oynanan polisiye analiz oyunu. Oyuncular vaka dosyasındaki
belgeleri, ifadeleri, delilleri ve teknik raporları inceleyip faili seçer;
tek başına ya da co-op odada (en fazla 5 analist) oynanabilir.

- **Uygulama:** Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS 4
- **Veri / kimlik:** Supabase (Auth, Postgres + RLS, Realtime)
- **Vaka içeriği:** statik TypeScript/JSON — `src/data/cases`

## Kurulum

```bash
npm install
cp .env.example .env.local
npm run dev
```

| Değişken | Açıklama |
|----------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase proje URL'i |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | **Yalnızca sunucu.** Çözüm kaydı, oda kapatma, hesap silme, yönetim işlemleri |
| `SUPER_ADMIN_EMAILS` | Virgülle ayrılmış, e-postası doğrulanmış süper admin listesi (opsiyonel; `profiles.role = 'admin'` da yeterli) |

### Veritabanı

Şema dosyaları `supabase/manual/` altında; Supabase Dashboard → SQL Editor'de
çalıştırılır ve hepsi tekrar çalıştırılabilir (idempotent).

1. `coop_rooms_base.sql` — `rooms`, `room_players` (tablolar yoksa)
2. `coop_voting_and_settings.sql` — `room_votes`, `coop_settings`
3. `coop_room_timeline.sql` — oda içi ortak kronoloji (`room_timeline`)
4. `solved_cases_server_only_writes.sql` — çözüm kayıtları yalnızca sunucudan yazılır
5. `cases_metadata_all.sql` — her vaka için görünürlük satırı (`test` ile açılır)
6. `cases_metadata_read_policy.sql` — `published` herkese, `test` yalnızca `is_tester` kullanıcılara

Vakaların yayın durumu **Yönetim → Vakalar** ekranından değiştirilir
(`draft` · `test` · `published` · `archived`).

## Komutlar

| Komut | Ne yapar |
|-------|----------|
| `npm run dev` | Geliştirme sunucusu |
| `npm run build` / `npm start` | Prod derleme / çalıştırma |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run db:types` | `SUPABASE_PROJECT_ID` ile Supabase tiplerini `src/lib/supabase/database.types.ts`'e üretir (Supabase CLI girişi gerekir) |
| `npm run catalog:names` | `vaka-kaynak/katalog/kullanılan-isimler.md` dosyasını vaka verisinden yeniden üretir |

## Yapı

```
src/
  app/
    davalar/            vaka kataloğu
    vaka/[caseId]/      vaka sekmeleri (brief, şüpheliler, ifadeler, … , çözüm)
      sertifika/        çözüm sertifikası (PNG, sunucuda üretilir)
    oda/                co-op oda kurma, katılma, lobi
    profil/             profil, geçmiş, başarılar
    yonetim/            GM paneli (analistler, odalar, vakalar, sicil, ayarlar)
  data/cases/           vaka içerikleri (+ mesaj zincirleri, payload JSON'ları)
  lib/
    case-helpers.ts     vaka kayıt defteri (yeni vaka buraya eklenir)
    html-sanitize.ts    vaka HTML'i render öncesi izinli etiket listesinden geçer
    supabase/           sunucu, tarayıcı, service-role istemcileri ve proxy oturumu
  proxy.ts              oturum yenileme + askıya alınmış hesap kontrolü
supabase/manual/        SQL şema ve bakım betikleri
vaka-kaynak/            vaka yazım rehberi, şablonlar, katalog, kaynak HTML prototipleri
scripts/                tek seferlik içerik çıkarma ve katalog betikleri
```

## Yeni vaka eklemek

1. Rehber: `vaka-kaynak/SKILL.md`; çeşitlilik için `vaka-kaynak/katalog/` dosyalarını oku.
2. `src/data/cases/<id>.ts` oluştur (`CaseData` tipi, `src/lib/case-types.ts`).
3. `src/lib/case-helpers.ts` içindeki `ALL_CASES` kaydına ekle. İçeriği boş sekmeler otomatik gizlenir.
4. `cases_metadata` tablosuna satır ekle ya da Yönetim → Vakalar'dan durum ver.
5. `npm run catalog:names` ile isim kataloğunu güncelle.

Vaka verisi ve hüküm tarayıcıya gönderilmez: sekmeler sunucuda render edilir,
hüküm oy verildikten sonra server action ile açılır.
