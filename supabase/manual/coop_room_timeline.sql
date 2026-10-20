-- Co-op ortak kronoloji (room_timeline).
-- Supabase Dashboard → SQL Editor. İdempotent.
--
-- Oda başına tek düzen: event_order (kart id listesi) + settled.
-- settled yalnızca server action (doğru sıra) ile açılır.

CREATE TABLE IF NOT EXISTS public.room_timeline (
  room_id uuid PRIMARY KEY REFERENCES public.rooms (id) ON DELETE CASCADE,
  event_order text[] NOT NULL DEFAULT '{}',
  settled boolean NOT NULL DEFAULT false,
  updated_by uuid REFERENCES auth.users (id) ON DELETE SET NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.room_timeline ADD COLUMN IF NOT EXISTS event_order text[] NOT NULL DEFAULT '{}';
ALTER TABLE public.room_timeline ADD COLUMN IF NOT EXISTS settled boolean NOT NULL DEFAULT false;
ALTER TABLE public.room_timeline ADD COLUMN IF NOT EXISTS updated_by uuid REFERENCES auth.users (id) ON DELETE SET NULL;
ALTER TABLE public.room_timeline ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

ALTER TABLE public.room_timeline ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Room members can read timeline" ON public.room_timeline;
CREATE POLICY "Room members can read timeline" ON public.room_timeline
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.room_players rp
      WHERE rp.room_id::text = room_timeline.room_id::text
        AND rp.user_id = auth.uid()
        AND rp.left_at IS NULL
    )
  );

DROP POLICY IF EXISTS "Room members can insert timeline" ON public.room_timeline;
CREATE POLICY "Room members can insert timeline" ON public.room_timeline
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.room_players rp
      WHERE rp.room_id::text = room_timeline.room_id::text
        AND rp.user_id = auth.uid()
        AND rp.left_at IS NULL
    )
    AND settled = false
  );

DROP POLICY IF EXISTS "Room members can update unsettled timeline" ON public.room_timeline;
CREATE POLICY "Room members can update unsettled timeline" ON public.room_timeline
  FOR UPDATE USING (
    settled = false
    AND EXISTS (
      SELECT 1 FROM public.room_players rp
      WHERE rp.room_id::text = room_timeline.room_id::text
        AND rp.user_id = auth.uid()
        AND rp.left_at IS NULL
    )
  )
  WITH CHECK (
    settled = false
    AND EXISTS (
      SELECT 1 FROM public.room_players rp
      WHERE rp.room_id::text = room_timeline.room_id::text
        AND rp.user_id = auth.uid()
        AND rp.left_at IS NULL
    )
  );

-- settled / doğru sıra kilidi: service role (server action).

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.room_timeline;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END
$$;
