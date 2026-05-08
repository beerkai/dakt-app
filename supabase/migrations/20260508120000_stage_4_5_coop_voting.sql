-- ════════════════════════════════════════════════════
-- AŞAMA 4.5 — Co-op çözüm oylama + app_settings (GM switch)
-- Supabase SQL Editor'de veya: supabase db push
-- room_players = bu projedeki oda üyeliği tablosu (room_members değil)
-- ════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.room_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  username text NOT NULL,
  user_color text,
  voted_suspect_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(room_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_room_votes_room ON public.room_votes(room_id);

ALTER TABLE public.room_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Room players can view votes"
  ON public.room_votes FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.room_players rp
      WHERE rp.room_id = room_votes.room_id
        AND rp.user_id = auth.uid()
        AND rp.left_at IS NULL
    )
  );

CREATE POLICY "Users can insert their own vote"
  ON public.room_votes FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM public.room_players rp
      WHERE rp.room_id = room_votes.room_id
        AND rp.user_id = auth.uid()
        AND rp.left_at IS NULL
    )
  );

CREATE POLICY "Users can update their own vote"
  ON public.room_votes FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own vote"
  ON public.room_votes FOR DELETE
  USING (auth.uid() = user_id);

ALTER PUBLICATION supabase_realtime ADD TABLE public.room_votes;

-- GM switch: yazma yalnızca service role (admin client)
CREATE TABLE IF NOT EXISTS public.app_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid
);

INSERT INTO public.app_settings (key, value)
VALUES ('coop_solution_host_bypass_enabled', 'false'::jsonb)
ON CONFLICT (key) DO NOTHING;

ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can Read app settings"
  ON public.app_settings FOR SELECT
  USING (true);

-- ════════════════════════════════════════════════════
-- OPSİYONEL — tüm solved_cases temizliği (yalnızca gerekirse, önce yedek)
-- DELETE FROM public.solved_cases;
-- ════════════════════════════════════════════════════

-- Doğrulama:
-- SELECT 'room_votes' AS tablo, count(*) FROM public.room_votes
-- UNION ALL
-- SELECT 'app_settings', count(*) FROM public.app_settings;
