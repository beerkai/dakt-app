-- Co-op oylama (room_votes) + yönetim ayarları (coop_settings).
-- Supabase Dashboard → SQL Editor. İdempotent: tekrar çalıştırmak güvenli.
--
-- Uygulama kodu şu şemayı bekler:
--   room_votes(room_id, user_id, username, user_color, suspect_id, updated_at)
--     UNIQUE (room_id, user_id)  — upsert onConflict "room_id,user_id"
--   coop_settings(host_bypass_enabled boolean) — tek satır
--
-- Eski denemelerde room_votes.room_id text olarak açılmış olabilir; politikalar
-- iki tipte de çalışsın diye ::text karşılaştırması kullanılır.

CREATE TABLE IF NOT EXISTS public.room_votes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id uuid NOT NULL REFERENCES public.rooms (id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  username text NOT NULL DEFAULT '',
  user_color text NOT NULL DEFAULT '',
  suspect_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (room_id, user_id)
);

ALTER TABLE public.room_votes ADD COLUMN IF NOT EXISTS username text NOT NULL DEFAULT '';
ALTER TABLE public.room_votes ADD COLUMN IF NOT EXISTS user_color text NOT NULL DEFAULT '';
ALTER TABLE public.room_votes ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

-- Eski şemada oy sütunu voted_suspect_id adıyla açıldıysa yeniden adlandır.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'room_votes'
      AND column_name = 'voted_suspect_id'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'room_votes'
      AND column_name = 'suspect_id'
  ) THEN
    ALTER TABLE public.room_votes RENAME COLUMN voted_suspect_id TO suspect_id;
  END IF;
END
$$;

ALTER TABLE public.room_votes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Room members can read votes" ON public.room_votes;
CREATE POLICY "Room members can read votes" ON public.room_votes
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.room_players rp
      WHERE rp.room_id::text = room_votes.room_id::text
        AND rp.user_id = auth.uid()
        AND rp.left_at IS NULL
    )
  );

DROP POLICY IF EXISTS "Users can insert own vote in room" ON public.room_votes;
CREATE POLICY "Users can insert own vote in room" ON public.room_votes
  FOR INSERT WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM public.room_players rp
      WHERE rp.room_id::text = room_votes.room_id::text
        AND rp.user_id = auth.uid()
        AND rp.left_at IS NULL
    )
  );

DROP POLICY IF EXISTS "Users can update own vote in room" ON public.room_votes;
CREATE POLICY "Users can update own vote in room" ON public.room_votes
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM public.room_players rp
      WHERE rp.room_id::text = room_votes.room_id::text
        AND rp.user_id = auth.uid()
        AND rp.left_at IS NULL
    )
  );

-- Oy sıfırlama / oda kapatma server action'larda service role ile yapılır;
-- istemcinin DELETE yetkisi yalnızca kendi oyu için.
DROP POLICY IF EXISTS "Users can delete own vote" ON public.room_votes;
CREATE POLICY "Users can delete own vote" ON public.room_votes
  FOR DELETE USING (auth.uid() = user_id);

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.room_votes;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END
$$;

-- ─── coop_settings (tek satır) ───────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.coop_settings (
  id smallint PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  host_bypass_enabled boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid REFERENCES auth.users (id) ON DELETE SET NULL
);

INSERT INTO public.coop_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

ALTER TABLE public.coop_settings ENABLE ROW LEVEL SECURITY;

-- Herkes okuyabilir; yazma yalnızca service role (yönetim paneli server action).
DROP POLICY IF EXISTS "Anyone can read coop settings" ON public.coop_settings;
CREATE POLICY "Anyone can read coop settings" ON public.coop_settings
  FOR SELECT USING (true);
