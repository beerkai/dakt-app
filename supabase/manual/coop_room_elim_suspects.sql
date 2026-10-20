-- Co-op: yanlış hükümde elenen şüpheliler (oda oturumu boyunca kilit).
-- Supabase Dashboard → SQL Editor. İdempotent.

CREATE TABLE IF NOT EXISTS public.room_elim_suspects (
  room_id uuid NOT NULL REFERENCES public.rooms (id) ON DELETE CASCADE,
  suspect_id text NOT NULL,
  eliminated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (room_id, suspect_id)
);

ALTER TABLE public.room_elim_suspects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Room members can read elim suspects" ON public.room_elim_suspects;
CREATE POLICY "Room members can read elim suspects" ON public.room_elim_suspects
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.room_players rp
      WHERE rp.room_id::text = room_elim_suspects.room_id::text
        AND rp.user_id = auth.uid()
        AND rp.left_at IS NULL
    )
  );

-- INSERT server action (service role) ile; istemci yalnız okur.

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.room_elim_suspects;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END
$$;
