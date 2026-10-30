-- #1: çözüm doğrulaması veritabanında. Doğru cevaplar istemciye kapalı bir tabloda;
-- solved_cases'e yazım yalnızca cevabı kontrol eden submit_solution RPC'si üzerinden.
-- Bu migration ek (additive): mevcut INSERT policy'si ayrı bir migration'da, RPC'yi
-- kullanan kod deploy edildikten SONRA kaldırılır.
--
-- Rollback:
--   DROP FUNCTION IF EXISTS public.submit_solution(text, text, integer, integer, timestamptz);
--   DROP TABLE IF EXISTS public.case_answers;

CREATE TABLE IF NOT EXISTS public.case_answers (
  case_id        text PRIMARY KEY,
  perpetrator_id text NOT NULL,
  updated_at     timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.case_answers ENABLE ROW LEVEL SECURITY;
-- Bilinçli olarak policy YOK: anon/authenticated hiçbir satırı göremez/yazamaz.
REVOKE ALL ON public.case_answers FROM anon, authenticated;

-- Seed: npm run db:case-answers
INSERT INTO public.case_answers (case_id, perpetrator_id) VALUES
  ('016', 'erkan'),
  ('027', 'pinar'),
  ('033', 'firat'),
  ('036', 'civan'),
  ('042', 'suspect-05'),
  ('048', 'suspect-01'),
  ('053', 'suspect-01'),
  ('067', 'suspect-02'),
  ('082', 'suspect-01'),
  ('089', 'suspect-04'),
  ('104', 'suspect-01'),
  ('114', 'suspect-01')
ON CONFLICT (case_id) DO UPDATE
  SET perpetrator_id = EXCLUDED.perpetrator_id, updated_at = now();

CREATE OR REPLACE FUNCTION public.submit_solution(
  p_case_id          text,
  p_suspect_id       text,
  p_attempt_count    integer     DEFAULT NULL,
  p_duration_seconds integer     DEFAULT NULL,
  p_solved_at        timestamptz DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_uid        uuid := auth.uid();
  v_answer     text;
  v_started    timestamptz;
  v_play_att   integer;
  v_solved_at  timestamptz;
  v_attempts   integer;
  v_duration   integer;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not_authenticated' USING ERRCODE = '28000';
  END IF;

  SELECT a.perpetrator_id INTO v_answer
  FROM public.case_answers AS a
  WHERE a.case_id = p_case_id;

  IF v_answer IS NULL THEN
    RETURN pg_catalog.jsonb_build_object('solved', false, 'reason', 'unknown_case');
  END IF;
  IF p_suspect_id IS DISTINCT FROM v_answer THEN
    RETURN pg_catalog.jsonb_build_object('solved', false, 'reason', 'wrong_answer');
  END IF;

  SELECT cp.started_at, cp.attempt_count INTO v_started, v_play_att
  FROM public.case_playthroughs AS cp
  WHERE cp.user_id = v_uid AND cp.case_id = p_case_id;

  v_solved_at := LEAST(COALESCE(p_solved_at, pg_catalog.now()), pg_catalog.now());
  v_attempts := LEAST(1000, GREATEST(1, COALESCE(NULLIF(v_play_att, 0), p_attempt_count, 1)));
  IF v_started IS NOT NULL THEN
    v_duration := pg_catalog.floor(EXTRACT(EPOCH FROM (v_solved_at - v_started)))::integer;
  ELSE
    v_duration := COALESCE(p_duration_seconds, 0);
  END IF;
  v_duration := LEAST(2592000, GREATEST(0, v_duration));

  INSERT INTO public.solved_cases (user_id, case_id, accuracy, attempt_count, duration_seconds, solved_at)
  VALUES (v_uid, p_case_id, 100, v_attempts, v_duration, v_solved_at)
  ON CONFLICT (user_id, case_id) DO UPDATE
    SET accuracy = EXCLUDED.accuracy,
        attempt_count = EXCLUDED.attempt_count,
        duration_seconds = EXCLUDED.duration_seconds,
        solved_at = EXCLUDED.solved_at;

  RETURN pg_catalog.jsonb_build_object(
    'solved', true,
    'attempt_count', v_attempts,
    'duration_seconds', v_duration
  );
END;
$$;

REVOKE ALL ON FUNCTION public.submit_solution(text, text, integer, integer, timestamptz) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.submit_solution(text, text, integer, integer, timestamptz) TO authenticated;
