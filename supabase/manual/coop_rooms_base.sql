-- Co-op temel tabloları: rooms + room_players.
-- coop_voting_and_settings.sql bu tablolara bağlıdır; "relation public.rooms
-- does not exist" hatası alırsan önce bunu çalıştır.
-- Tablolar ve kendi politikaların zaten varsa çalıştırmana gerek yok
-- (buradaki politikalar mevcutlara eklenir).
-- Supabase Dashboard → SQL Editor. İdempotent: mevcut tablolara yalnızca
-- eksik sütunları ekler, veriye dokunmaz.

CREATE TABLE IF NOT EXISTS public.rooms (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  code text NOT NULL UNIQUE,
  case_id text NOT NULL,
  host_user_id uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'waiting'
    CHECK (status IN ('waiting', 'playing', 'solved', 'archived', 'terminated')),
  created_at timestamptz NOT NULL DEFAULT now(),
  started_at timestamptz,
  finished_at timestamptz,
  archived_at timestamptz
);

ALTER TABLE public.rooms ADD COLUMN IF NOT EXISTS started_at timestamptz;
ALTER TABLE public.rooms ADD COLUMN IF NOT EXISTS finished_at timestamptz;
ALTER TABLE public.rooms ADD COLUMN IF NOT EXISTS archived_at timestamptz;

CREATE INDEX IF NOT EXISTS rooms_status_idx ON public.rooms (status);
CREATE INDEX IF NOT EXISTS rooms_host_idx ON public.rooms (host_user_id);

CREATE TABLE IF NOT EXISTS public.room_players (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id uuid NOT NULL REFERENCES public.rooms (id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  username text NOT NULL DEFAULT '',
  color text NOT NULL DEFAULT '',
  is_ready boolean NOT NULL DEFAULT false,
  joined_at timestamptz NOT NULL DEFAULT now(),
  left_at timestamptz,
  UNIQUE (room_id, user_id)
);

ALTER TABLE public.room_players ADD COLUMN IF NOT EXISTS is_ready boolean NOT NULL DEFAULT false;
ALTER TABLE public.room_players ADD COLUMN IF NOT EXISTS left_at timestamptz;

CREATE INDEX IF NOT EXISTS room_players_user_idx ON public.room_players (user_id);

-- ─── RLS ────────────────────────────────────────────────────────────────────
-- Oda kodu ile katılım için giriş yapmış (anonim dahil) herkes odaları okur.
-- Yazma: oda kurulumu/yönetimi host'a, oyuncu satırı kişinin kendisine ait.
-- Oda kapatma / oy sıfırlama gibi işlemler server action'da service role ile.

ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "rooms_select_authenticated" ON public.rooms;
CREATE POLICY "rooms_select_authenticated" ON public.rooms
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "rooms_insert_host" ON public.rooms;
CREATE POLICY "rooms_insert_host" ON public.rooms
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = host_user_id);

DROP POLICY IF EXISTS "rooms_update_host" ON public.rooms;
CREATE POLICY "rooms_update_host" ON public.rooms
  FOR UPDATE TO authenticated
  USING (auth.uid() = host_user_id) WITH CHECK (auth.uid() = host_user_id);

DROP POLICY IF EXISTS "rooms_delete_host" ON public.rooms;
CREATE POLICY "rooms_delete_host" ON public.rooms
  FOR DELETE TO authenticated USING (auth.uid() = host_user_id);

ALTER TABLE public.room_players ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "room_players_select_authenticated" ON public.room_players;
CREATE POLICY "room_players_select_authenticated" ON public.room_players
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "room_players_insert_self" ON public.room_players;
CREATE POLICY "room_players_insert_self" ON public.room_players
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "room_players_update_self" ON public.room_players;
CREATE POLICY "room_players_update_self" ON public.room_players
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "room_players_delete_self" ON public.room_players;
CREATE POLICY "room_players_delete_self" ON public.room_players
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.rooms;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END
$$;

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.room_players;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END
$$;
