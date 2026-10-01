-- 빛으로교회 홈페이지 초기 스키마
-- 공개 데이터는 누구나 읽을 수 있고, 쓰기는 admins 테이블에 등록된 계정만 가능합니다.

-- ---------- 관리자 ----------
create table public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admins enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admins where user_id = (select auth.uid()));
$$;

create policy "admins can read admins" on public.admins
  for select to authenticated using ((select public.is_admin()));

-- ---------- 설교 ----------
create table public.sermons (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('sunday', 'wednesday', 'special')),
  title text not null,
  preacher text,
  scripture text,
  preached_on date not null,
  youtube_id text not null,
  summary text,
  published boolean not null default true,
  created_at timestamptz not null default now()
);
create index sermons_category_date_idx on public.sermons (category, preached_on desc);

-- ---------- 주보 ----------
create table public.bulletins (
  id uuid primary key default gen_random_uuid(),
  title text not null default '주일예배 주보',
  sunday_date date not null unique,
  cover_url text,
  images text[] not null default '{}',
  pdf_url text,
  published boolean not null default true,
  created_at timestamptz not null default now()
);
create index bulletins_date_idx on public.bulletins (sunday_date desc);

-- ---------- 예배 시간 ----------
create table public.worship_times (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  day_label text not null,
  time text not null check (time ~ '^\d{2}:\d{2}$'),
  place text,
  kind text not null default 'worship' check (kind in ('worship', 'school')),
  highlight boolean not null default false,
  sort_order int not null default 0
);

-- ---------- 섬기는이들 ----------
create table public.staff (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  photo_url text,
  bio text,
  sort_order int not null default 0
);

-- ---------- 주일학교 부서 ----------
create table public.departments (
  slug text primary key check (slug in ('infant', 'elementary', 'youth')),
  name text not null,
  name_en text not null,
  intro text not null,
  age_range text,
  time_label text,
  place text,
  photo_url text,
  sort_order int not null default 0
);

-- ---------- RLS ----------
alter table public.sermons enable row level security;
alter table public.bulletins enable row level security;
alter table public.worship_times enable row level security;
alter table public.staff enable row level security;
alter table public.departments enable row level security;

create policy "public reads published sermons" on public.sermons
  for select using (published or (select public.is_admin()));
create policy "public reads published bulletins" on public.bulletins
  for select using (published or (select public.is_admin()));
create policy "public reads worship times" on public.worship_times for select using (true);
create policy "public reads staff" on public.staff for select using (true);
create policy "public reads departments" on public.departments for select using (true);

create policy "admins write sermons" on public.sermons
  for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "admins write bulletins" on public.bulletins
  for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "admins write worship times" on public.worship_times
  for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "admins write staff" on public.staff
  for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "admins write departments" on public.departments
  for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

-- ---------- 파일 저장소 (주보 이미지/PDF, 사진) ----------
insert into storage.buckets (id, name, public)
values ('bulletins', 'bulletins', true), ('photos', 'photos', true)
on conflict (id) do nothing;

create policy "admins upload church files" on storage.objects
  for insert to authenticated
  with check (bucket_id in ('bulletins', 'photos') and (select public.is_admin()));
create policy "admins update church files" on storage.objects
  for update to authenticated
  using (bucket_id in ('bulletins', 'photos') and (select public.is_admin()));
create policy "admins delete church files" on storage.objects
  for delete to authenticated
  using (bucket_id in ('bulletins', 'photos') and (select public.is_admin()));
