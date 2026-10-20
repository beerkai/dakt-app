-- Tüm statik vakalar için cases_metadata satırı (yoksa ekler, varsa dokunmaz).
-- Satırı olmayan vaka sitede 404 verir. Yeni satırlar 'test' durumunda açılır
-- (yalnızca is_tester kullanıcılar görür); yayına almak için Yönetim → Vakalar.
-- Supabase Dashboard → SQL Editor. İdempotent.

INSERT INTO public.cases_metadata (case_id, status, created_at)
VALUES
  ('016', 'test', now()),
  ('027', 'test', now()),
  ('033', 'test', now()),
  ('036', 'test', now()),
  ('042', 'test', now()),
  ('048', 'test', now()),
  ('053', 'test', now()),
  ('067', 'test', now()),
  ('082', 'test', now()),
  ('089', 'test', now()),
  ('104', 'test', now()),
  ('114', 'test', now())
ON CONFLICT (case_id) DO NOTHING;

-- Kontrol:
-- SELECT case_id, status FROM public.cases_metadata ORDER BY case_id;
