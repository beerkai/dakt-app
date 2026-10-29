-- lock_profiles_insert_columns
-- Kapatılan açık: authenticated/anon rolleri profiles tablosunda tüm
-- sütunlarda INSERT yetkisine sahipti; profil satırı henüz yoksa kullanıcı
-- kendi satırını role='admin' / is_tester=true ile oluşturabilirdi
-- (ör. ensureAnonProfile upsert yolu).
--
-- İstemci tarafında meşru INSERT: src/app/oda/actions.ts ensureAnonProfile
--   -> upsert(id, username, color, updated_at)  (anonim oturum = authenticated rolü)
-- handle_new_user() SECURITY DEFINER (owner: postgres), grant'lardan etkilenmez.
-- anon (oturumsuz) hiçbir zaman profil eklemez; INSERT yetkisi tamamen kaldırıldı.

revoke insert on table public.profiles from anon, authenticated;

grant insert (id, username, color, updated_at)
  on table public.profiles to authenticated;

drop policy if exists "Sadece kendi profilini ekle" on public.profiles;
create policy "Sadece kendi profilini ekle"
  on public.profiles
  for insert
  to authenticated
  with check (auth.uid() = id);

