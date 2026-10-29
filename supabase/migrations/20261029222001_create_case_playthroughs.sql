-- create_case_playthroughs
-- Kaynak: supabase/manual/case_playthroughs.sql (prod'da tablo yoktu).
-- Deneme sayısı / başlangıç saati rozet ve çözüm kayıtlarının dayanağıdır;
-- tüm yazmalar server action'larda service role ile yapılır
-- (cozum/actions.ts, auth/actions.ts, account-deletion.ts).
-- Düzeltme: manual SQL'deki istemci INSERT/UPDATE politikaları kaldırıldı;
-- bunlar kullanıcının attempt_count / started_at değerini kendi yazmasına
-- izin veriyordu ("istemci değeri kabul edilmez" ilkesiyle çelişiyordu).
-- Kullanıcı yalnızca kendi satırını okuyabilir.

create table if not exists public.case_playthroughs (
  user_id uuid not null references auth.users (id) on delete cascade,
  case_id text not null,
  started_at timestamptz not null default now(),
  attempt_count integer not null default 0
    check (attempt_count >= 0 and attempt_count <= 1000),
  locked_suspect_ids text[] not null default '{}',
  updated_at timestamptz not null default now(),
  primary key (user_id, case_id)
);

alter table public.case_playthroughs enable row level security;

drop policy if exists "Users insert own playthrough" on public.case_playthroughs;
drop policy if exists "Users update own playthrough" on public.case_playthroughs;

drop policy if exists "Users read own playthrough" on public.case_playthroughs;
create policy "Users read own playthrough" on public.case_playthroughs
  for select to authenticated using (auth.uid() = user_id);
