-- #4: profiles artık herkese okunur değil — her kullanıcı yalnızca kendi satırını görür.
-- Başka kullanıcıların profilini okuyan tek noktalar (takma ad müsaitlik kontrolü ve
-- /yonetim sayfaları) service role ile sunucuda çalışır (PR: profiles own-row only).
-- Hassas kolonlar (role, is_tester, suspended_at, suspended_reason, last_seen_at)
-- anon/diğer kullanıcılardan gizlenir.
--
-- Rollback:
--   DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
--   CREATE POLICY "Profiles okumaya açık" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Profiles okumaya açık" ON public.profiles;
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;

CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT TO authenticated
  USING ((SELECT auth.uid()) = id);
