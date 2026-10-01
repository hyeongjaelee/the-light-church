-- 새가족 등록 신청서
-- 누구나 제출(insert)만 할 수 있고, 조회·수정·삭제는 관리자만 가능합니다.

create table public.new_family_registrations (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 40),
  phone text not null check (phone ~ '^[0-9-]{9,14}$'),
  gender text check (gender in ('male', 'female')),
  birth_date date,
  address text check (char_length(address) <= 200),
  marital_status text check (marital_status in ('single', 'married')),
  family_at_church text check (char_length(family_at_church) <= 100),
  baptism text check (baptism in ('none', 'infant', 'baptized', 'confirmed', 'unknown')),
  faith_years text check (faith_years in ('new', 'lt1', '1to5', '5to10', 'gt10', 'from_birth')),
  previous_church text check (char_length(previous_church) <= 100),
  previous_role text check (previous_role in ('none', 'deacon', 'kwonsa', 'ordained_deacon', 'elder')),
  found_via text check (found_via in ('referral', 'online', 'nearby', 'moved')),
  message text check (char_length(message) <= 1000),
  privacy_agreed boolean not null check (privacy_agreed),
  status text not null default 'new' check (status in ('new', 'contacted', 'registered')),
  created_at timestamptz not null default now()
);

alter table public.new_family_registrations enable row level security;

create policy "anyone can submit registration" on public.new_family_registrations
  for insert to anon, authenticated
  with check (privacy_agreed and status = 'new');

create policy "admins manage registrations" on public.new_family_registrations
  for all to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));
