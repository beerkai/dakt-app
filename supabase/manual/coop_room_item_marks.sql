-- Co-op ortak damgalar (room_item_marks).
-- Supabase Dashboard → SQL Editor. İdempotent.
--
-- Uygulama: odadaki analistler belge/delil/ifade kartlarına damga basar;
-- diğerleri realtime ile renkli nokta olarak görür.
--
--   room_item_marks(room_id, user_id, item_id, mark_kind, username, user_color, updated_at)
--     UNIQUE (room_id, user_id, item_id)

CREATE TABLE IF NOT EXISTS public.room_item_marks (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id uuid NOT NULL REFERENCES public.rooms (id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  item_id text NOT NULL,
  mark_kind text NOT NULL
    CHECK (mark_kind IN ('supheli', 'ele-alindi', 'elendi')),
  username text NOT NULL DEFAULT '',
  user_color text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (room_id, user_id, item_id)
);

CREATE INDEX IF NOT EXISTS room_item_marks_room_item_idx
  ON public.room_item_marks (room_id, item_id);

ALTER TABLE public.room_item_marks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Room members can read item marks" ON public.room_item_marks;
CREATE POLICY "Room members can read item marks" ON public.room_item_marks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.room_players rp
      WHERE rp.room_id::text = room_item_marks.room_id::text
        AND rp.user_id = auth.uid()
        AND rp.left_at IS NULL
    )
  );

DROP POLICY IF EXISTS "Users can insert own item mark in room" ON public.room_item_marks;
CREATE POLICY "Users can insert own item mark in room" ON public.room_item_marks
  FOR INSERT WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM public.room_players rp
      WHERE rp.room_id::text = room_item_marks.room_id::text
        AND rp.user_id = auth.uid()
        AND rp.left_at IS NULL
    )
  );

DROP POLICY IF EXISTS "Users can update own item mark in room" ON public.room_item_marks;
CREATE POLICY "Users can update own item mark in room" ON public.room_item_marks
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM public.room_players rp
      WHERE rp.room_id::text = room_item_marks.room_id::text
        AND rp.user_id = auth.uid()
        AND rp.left_at IS NULL
    )
  );

DROP POLICY IF EXISTS "Users can delete own item mark" ON public.room_item_marks;
CREATE POLICY "Users can delete own item mark" ON public.room_item_marks
  FOR DELETE USING (auth.uid() = user_id);

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.room_item_marks;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END
$$;
