-- room_votes + app_settings (idempotent). RLS: room_players.room_id UUID → text eşlemesi.

CREATE TABLE IF NOT EXISTS public.room_votes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id text NOT NULL,
  user_id uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  suspect_id text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (room_id, user_id)
);

ALTER TABLE public.room_votes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Room members can read votes" ON public.room_votes;
CREATE POLICY "Room members can read votes" ON public.room_votes
  FOR SELECT USING (
    EXISTS (
      SELECT 1
      FROM public.room_players rp
      WHERE rp.room_id::text = room_votes.room_id
        AND rp.user_id = auth.uid ()
        AND rp.left_at IS NULL
    )
  );

DROP POLICY IF EXISTS "Users can insert own vote in room" ON public.room_votes;
CREATE POLICY "Users can insert own vote in room" ON public.room_votes
  FOR INSERT
  WITH CHECK (
    auth.uid () = user_id
    AND EXISTS (
      SELECT 1
      FROM public.room_players rp
      WHERE rp.room_id::text = room_votes.room_id
        AND rp.user_id = auth.uid ()
        AND rp.left_at IS NULL
    )
  );

DROP POLICY IF EXISTS "Users can update own vote in room" ON public.room_votes;
CREATE POLICY "Users can update own vote in room" ON public.room_votes
  FOR UPDATE USING (auth.uid () = user_id)
  WITH CHECK (
    auth.uid () = user_id
    AND EXISTS (
      SELECT 1
      FROM public.room_players rp
      WHERE rp.room_id::text = room_votes.room_id
        AND rp.user_id = auth.uid ()
        AND rp.left_at IS NULL
    )
  );

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.room_votes;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END
$$;

CREATE TABLE IF NOT EXISTS public.app_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz DEFAULT now()
);

INSERT INTO public.app_settings (key, value)
VALUES ('coop_solution_mode', '{"mode": "unanimous"}'::jsonb)
ON CONFLICT (key) DO NOTHING;

ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read app settings" ON public.app_settings;
CREATE POLICY "Anyone can read app settings" ON public.app_settings FOR SELECT USING (true);
