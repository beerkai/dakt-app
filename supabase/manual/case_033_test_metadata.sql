-- Vaka 033 (Sis Vadisi) — site görünürlüğü: yalnızca is_tester kullanıcılar (status = test)
-- Supabase SQL Editor'de bir kez çalıştırın.

INSERT INTO public.cases_metadata (case_id, status, created_at)
VALUES ('033', 'test', now())
ON CONFLICT (case_id) DO UPDATE SET status = EXCLUDED.status;
