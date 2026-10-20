-- solved_cases yazımını yalnızca sunucuya (service role) bırakır.
-- recordSolvedCase server action'ı çözümü doğrulayıp service role ile yazar;
-- istemcinin doğrudan PostgREST üzerinden sahte kayıt atmasını engeller.
--
-- ÖNKOŞUL: Vercel'de SUPABASE_SERVICE_ROLE_KEY tanımlı olmalı (yönetim paneli
-- zaten kullanıyor). Okuma ve "geçmişi sıfırla" (DELETE) politikaları korunur.

DROP POLICY IF EXISTS "solved_cases_insert_own" ON public.solved_cases;
DROP POLICY IF EXISTS "solved_cases_update_own" ON public.solved_cases;
DROP POLICY IF EXISTS "Kullanıcı kendi çözüm kaydını günceller" ON public.solved_cases;
