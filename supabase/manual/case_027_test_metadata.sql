-- Vaka 027 (Güverte) — site görünürlüğü: is_tester kullanıcılar (status = test)
-- Supabase SQL Editor'de bir kez çalıştırın.

INSERT INTO public.cases_metadata (case_id, status, created_at)
VALUES ('027', 'test', now())
ON CONFLICT (case_id) DO UPDATE SET status = EXCLUDED.status;
