-- lock_profiles_privileged_columns
-- Kapatılan açık: kullanıcıların kendi profilinde role / is_tester /
-- suspended_at / suspended_reason alanlarını değiştirip kendini admin
-- yapabilmesi (UPDATE politikasında WITH CHECK yoktu, authenticated ve
-- anon tüm sütunlarda UPDATE yetkisine sahipti).
--
-- İstemci (anon/authenticated anahtar) tarafında meşru güncellemeler:
--   * src/app/profil/actions.ts  updateProfileColor -> color, updated_at
--   * src/app/oda/actions.ts     ensureAnonProfile  -> upsert(id, username, color, updated_at)
--   * src/components/AuthProvider.tsx ping fallback -> last_seen_at
-- Ayrıcalıklı alanlar (role, is_tester, suspended_*) yalnızca service-role
-- (src/app/yonetim/actions.ts) üzerinden yazılır; grant'lardan etkilenmez.
-- update_last_seen() ve handle_new_user() SECURITY DEFINER (owner: postgres),
-- grant'lardan etkilenmez.

-- 1) Tablo düzeyindeki UPDATE yetkisini kaldır (sütun yetkileri de düşer)
revoke update on table public.profiles from anon, authenticated;

-- 2) Yalnızca güvenli sütunlarda UPDATE yetkisi ver.
--    "id": PostgREST upsert'i ON CONFLICT DO UPDATE SET id=EXCLUDED.id üretir;
--    WITH CHECK (auth.uid() = id) id'nin değiştirilmesini engeller.
grant update (id, username, color, updated_at, last_seen_at)
  on table public.profiles to authenticated;

-- 3) UPDATE politikasını WITH CHECK ile yeniden oluştur
drop policy if exists "Sadece kendi profilini güncelle" on public.profiles;
create policy "Sadece kendi profilini güncelle"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

