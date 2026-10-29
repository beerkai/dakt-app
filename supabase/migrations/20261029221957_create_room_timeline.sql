-- create_room_timeline
-- Kaynak: supabase/manual/coop_room_timeline.sql (prod'da tablo yoktu).
-- İstemci (TimelineBoardClient) settled=false iken event_order upsert eder;
-- settled=true yalnızca server action (service role) ile yazılır.
-- Değişiklikler: politikalar yalnızca authenticated rolüne; updated_by başka
-- kullanıcı olarak yazılamaz (istemci her zaman kendi id'sini yazar).

create table if not exists public.room_timeline (
  room_id uuid primary key references public.rooms (id) on delete cascade,
  event_order text[] not null default '{}',
  settled boolean not null default false,
  updated_by uuid references auth.users (id) on delete set null,
  updated_at timestamptz not null default now()
);

alter table public.room_timeline enable row level security;

drop policy if exists "Room members can read timeline" on public.room_timeline;
create policy "Room members can read timeline" on public.room_timeline
  for select to authenticated using (
    exists (
      select 1 from public.room_players rp
      where rp.room_id = room_timeline.room_id
        and rp.user_id = auth.uid()
        and rp.left_at is null
    )
  );

drop policy if exists "Room members can insert timeline" on public.room_timeline;
create policy "Room members can insert timeline" on public.room_timeline
  for insert to authenticated with check (
    settled = false
    and (updated_by is null or updated_by = auth.uid())
    and exists (
      select 1 from public.room_players rp
      where rp.room_id = room_timeline.room_id
        and rp.user_id = auth.uid()
        and rp.left_at is null
    )
  );

drop policy if exists "Room members can update unsettled timeline" on public.room_timeline;
create policy "Room members can update unsettled timeline" on public.room_timeline
  for update to authenticated using (
    settled = false
    and exists (
      select 1 from public.room_players rp
      where rp.room_id = room_timeline.room_id
        and rp.user_id = auth.uid()
        and rp.left_at is null
    )
  )
  with check (
    settled = false
    and (updated_by is null or updated_by = auth.uid())
    and exists (
      select 1 from public.room_players rp
      where rp.room_id = room_timeline.room_id
        and rp.user_id = auth.uid()
        and rp.left_at is null
    )
  );

do $$
begin
  alter publication supabase_realtime add table public.room_timeline;
exception
  when duplicate_object then null;
end
$$;
