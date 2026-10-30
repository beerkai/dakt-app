-- #1 (2/2): istemcinin solved_cases'e doğrudan yazmasını kapatır. Yazım artık yalnızca
-- submit_solution RPC'si (cevabı case_answers'tan doğrular) veya service role üzerinden.
-- SELECT (kendi satırı) ve DELETE ("geçmişi sıfırla") policy'leri korunur.
-- RPC'yi kullanan kod prod'a deploy edildikten SONRA uygulanır.
--
-- Rollback:
--   GRANT INSERT, UPDATE ON public.solved_cases TO authenticated;
--   CREATE POLICY "Kullanıcı kendi çözüm kaydını yazar" ON public.solved_cases
--     FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Kullanıcı kendi çözüm kaydını yazar" ON public.solved_cases;
DROP POLICY IF EXISTS "solved_cases_insert_own" ON public.solved_cases;
DROP POLICY IF EXISTS "solved_cases_update_own" ON public.solved_cases;
DROP POLICY IF EXISTS "Kullanıcı kendi çözüm kaydını günceller" ON public.solved_cases;

REVOKE INSERT, UPDATE ON public.solved_cases FROM anon, authenticated;
