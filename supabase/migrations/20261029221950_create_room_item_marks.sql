-- create_room_item_marks
-- Kaynak: supabase/manual/coop_room_item_marks.sql (prod'da tablo yoktu).
-- İstemci (RoomMarksProvider) kendi damgasını upsert/delete eder; oda üyeleri okur.
-- Değişiklik: politikalar yalnızca authenticated rolüne.

create table if not exists public.room_item_marks (
  id uuid default gen_random_uuid() primary key,
  room_id uuid not null references public.rooms (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  item_id text not null,
  mark_kind text not null
    check (mark_kind in ('supheli', 'ele-alindi', 'elendi')),
  username text not null default '',
  user_color text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (room_id, user_id, item_id)
);

create index if not exists room_item_marks_room_item_idx
  on public.room_item_marks (room_id, item_id);

alter table public.room_item_marks enable row level security;

drop policy if exists "Room members can read item marks" on public.room_item_marks;
create policy "Room members can read item marks" on public.room_item_marks
  for select to authenticated using (
    exists (
      select 1 from public.room_players rp
      where rp.room_id = room_item_marks.room_id
        and rp.user_id = auth.uid()
        and rp.left_at is null
    )
  );

drop policy if exists "Users can insert own item mark in room" on public.room_item_marks;
create policy "Users can insert own item mark in room" on public.room_item_marks
  for insert to authenticated with check (
    auth.uid() = user_id
    and exists (
      select 1 from public.room_players rp
      where rp.room_id = room_item_marks.room_id
        and rp.user_id = auth.uid()
        and rp.left_at is null
    )
  );

drop policy if exists "Users can update own item mark in room" on public.room_item_marks;
create policy "Users can update own item mark in room" on public.room_item_marks
  for update to authenticated using (auth.uid() = user_id)
  with check (
    auth.uid() = user_id
    and exists (
      select 1 from public.room_players rp
      where rp.room_id = room_item_marks.room_id
        and rp.user_id = auth.uid()
        and rp.left_at is null
    )
  );

drop policy if exists "Users can delete own item mark" on public.room_item_marks;
create policy "Users can delete own item mark" on public.room_item_marks
  for delete to authenticated using (auth.uid() = user_id);

do $$
begin
  alter publication supabase_realtime add table public.room_item_marks;
exception
  when duplicate_object then null;
end
$$;
