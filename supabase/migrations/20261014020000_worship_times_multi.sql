-- 예배 시간을 여러 번 적을 수 있게: "09:30" 또는 "09:30 / 11:30"
alter table public.worship_times drop constraint worship_times_time_check;
alter table public.worship_times
  add constraint worship_times_time_check
  check (time ~ '^\d{2}:\d{2}( / \d{2}:\d{2})*$');

-- 다음세대: 오전 9:30 / 11:30
update public.worship_times set time = '09:30 / 11:30' where kind = 'next-generation';
