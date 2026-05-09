-- Berkay: Kayıtlı kullanıcı çözüm kaydı (solved_cases) çalışmıyorsa bu politikaları kontrol et.
-- Supabase Dashboard → SQL Editor
--
-- ÖNEMLİ: Uygulama PostgREST `upsert` kullanır (ON CONFLICT … DO UPDATE). RLS'te yalnızca
-- INSERT varsa kayıt yazılamayabilir; UPDATE policy mutlaka olmalı.

-- Aşağıdakini TEK BAŞINA da çalıştırabilirsin (Türkçe policy isimlerin korunur):
-- CREATE POLICY "Kullanıcı kendi çözüm kaydını günceller" ON public.solved_cases
--   FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- (user_id, case_id) upsert için benzersiz kısıt gerekir:
-- ALTER TABLE public.solved_cases
--   ADD CONSTRAINT solved_cases_user_case_unique UNIQUE (user_id, case_id);

ALTER TABLE public.solved_cases ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "solved_cases_select_own" ON public.solved_cases;
CREATE POLICY "solved_cases_select_own" ON public.solved_cases
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "solved_cases_insert_own" ON public.solved_cases;
CREATE POLICY "solved_cases_insert_own" ON public.solved_cases
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "solved_cases_update_own" ON public.solved_cases;
CREATE POLICY "solved_cases_update_own" ON public.solved_cases
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "solved_cases_delete_own" ON public.solved_cases;
CREATE POLICY "solved_cases_delete_own" ON public.solved_cases
  FOR DELETE USING (auth.uid() = user_id);
