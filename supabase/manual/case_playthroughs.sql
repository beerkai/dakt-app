-- Vaka oturumu: başlangıç saati, deneme sayısı, elenen şüpheliler.
-- Rozetler / çözülmüş kayıtlar bu sayılara güvenir; istemci değeri kabul edilmez.
-- Supabase Dashboard → SQL Editor. İdempotent.

CREATE TABLE IF NOT EXISTS public.case_playthroughs (
  user_id uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  case_id text NOT NULL,
  started_at timestamptz NOT NULL DEFAULT now(),
  attempt_count integer NOT NULL DEFAULT 0
    CHECK (attempt_count >= 0 AND attempt_count <= 1000),
  locked_suspect_ids text[] NOT NULL DEFAULT '{}',
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, case_id)
);

ALTER TABLE public.case_playthroughs
  ADD COLUMN IF NOT EXISTS started_at timestamptz NOT NULL DEFAULT now();
ALTER TABLE public.case_playthroughs
  ADD COLUMN IF NOT EXISTS attempt_count integer NOT NULL DEFAULT 0;
ALTER TABLE public.case_playthroughs
  ADD COLUMN IF NOT EXISTS locked_suspect_ids text[] NOT NULL DEFAULT '{}';
ALTER TABLE public.case_playthroughs
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

ALTER TABLE public.case_playthroughs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users read own playthrough" ON public.case_playthroughs;
CREATE POLICY "Users read own playthrough" ON public.case_playthroughs
  FOR SELECT USING (auth.uid() = user_id);

-- İstemci yazma politikası yok: tüm yazmalar server action (service role) ile.
-- (Eski istemci INSERT/UPDATE politikaları attempt_count/started_at sahteciliğine izin veriyordu.)
DROP POLICY IF EXISTS "Users insert own playthrough" ON public.case_playthroughs;
DROP POLICY IF EXISTS "Users update own playthrough" ON public.case_playthroughs;

-- Yazma/artırma yalnızca server action (service role) ile yapılır.
