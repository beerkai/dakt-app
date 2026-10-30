-- #2: genel amaçlı sabit pencereli istek sayacı (revealVerdict rate limit).
-- Yalnızca sunucu (service role) kullanır; anon/authenticated erişemez.
-- Anahtarlar: 'verdict:u:<user_id>', 'verdict:ip:<sha256(ip)>' (ham IP saklanmaz).
--
-- Rollback:
--   DROP FUNCTION IF EXISTS public.rate_limit_hit(text, integer, integer);
--   DROP TABLE IF EXISTS public.rate_limits;

CREATE TABLE IF NOT EXISTS public.rate_limits (
  key          text        NOT NULL,
  window_start timestamptz NOT NULL,
  hits         integer     NOT NULL DEFAULT 0,
  PRIMARY KEY (key, window_start)
);

CREATE INDEX IF NOT EXISTS rate_limits_window_start_idx
  ON public.rate_limits (window_start);

ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.rate_limits FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.rate_limits TO service_role;

-- Sayaç +1; pencere içindeki istek sayısı p_max'ı aşmadıysa true döner.
-- SECURITY INVOKER: yalnızca service_role çağırabilir (tabloya o erişir).
CREATE OR REPLACE FUNCTION public.rate_limit_hit(
  p_key            text,
  p_window_seconds integer,
  p_max            integer
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
DECLARE
  v_window_seconds integer := greatest(1, least(coalesce(p_window_seconds, 60), 86400));
  v_window_start   timestamptz;
  v_hits           integer;
BEGIN
  IF p_key IS NULL OR length(p_key) = 0 OR length(p_key) > 200 THEN
    RAISE EXCEPTION 'invalid rate limit key' USING ERRCODE = '22023';
  END IF;

  v_window_start := to_timestamp(
    floor(extract(epoch FROM now()) / v_window_seconds) * v_window_seconds
  );

  INSERT INTO public.rate_limits AS r (key, window_start, hits)
  VALUES (p_key, v_window_start, 1)
  ON CONFLICT (key, window_start) DO UPDATE SET hits = r.hits + 1
  RETURNING r.hits INTO v_hits;

  -- Eski pencereleri arada bir temizle (~%1 çağrı).
  IF random() < 0.01 THEN
    DELETE FROM public.rate_limits WHERE window_start < now() - interval '1 day';
  END IF;

  RETURN v_hits <= coalesce(p_max, 0);
END;
$$;

REVOKE ALL ON FUNCTION public.rate_limit_hit(text, integer, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.rate_limit_hit(text, integer, integer) TO service_role;
