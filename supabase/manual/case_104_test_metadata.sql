-- Vaka 104 (Kusurlu Hasat) — site görünürlüğü: yalnızca is_tester kullanıcılar (status = test)
-- Supabase SQL Editor'de bir kez çalıştırın.
-- Herkese açmak için: status = 'published'

INSERT INTO public.cases_metadata (case_id, status, created_at)
VALUES ('104', 'test', now())
ON CONFLICT (case_id) DO UPDATE SET status = EXCLUDED.status;
