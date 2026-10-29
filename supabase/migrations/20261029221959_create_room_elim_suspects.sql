-- create_room_elim_suspects
-- Kaynak: supabase/manual/coop_room_elim_suspects.sql (prod'da tablo yoktu).
-- Yazma yalnızca server action (service role); oda üyeleri okur.

create table if not exists public.room_elim_suspects (
  room_id uuid not null references public.rooms (id) on delete cascade,
  suspect_id text not null,
  eliminated_at timestamptz not null default now(),
  primary key (room_id, suspect_id)
);

alter table public.room_elim_suspects enable row level security;

drop policy if exists "Room members can read elim suspects" on public.room_elim_suspects;
create policy "Room members can read elim suspects" on public.room_elim_suspects
  for select to authenticated using (
    exists (
      select 1 from public.room_players rp
      where rp.room_id = room_elim_suspects.room_id
        and rp.user_id = auth.uid()
        and rp.left_at is null
    )
  );

do $$
begin
  alter publication supabase_realtime add table public.room_elim_suspects;
exception
  when duplicate_object then null;
end
$$;
