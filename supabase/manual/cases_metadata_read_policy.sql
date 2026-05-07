-- Berkay: Supabase Dashboard → SQL Editor’da manuel çalıştır.
-- Admin bypass kaldırıldı — test vakaları yalnızca is_tester=true ile okunur.

DROP POLICY IF EXISTS "cases_metadata_read" ON public.cases_metadata;

CREATE POLICY "cases_metadata_read" ON public.cases_metadata
  FOR SELECT
  USING (
    status = 'published' OR
    (status = 'test' AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_tester = true
    ))
  );
