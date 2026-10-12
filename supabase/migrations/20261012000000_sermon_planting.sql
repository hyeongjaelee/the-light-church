-- 개척 이야기 > 영상 (/planting/videos) 을 위한 설교 카테고리 추가
alter table public.sermons drop constraint sermons_category_check;
alter table public.sermons
  add constraint sermons_category_check
  check (category in ('sunday', 'wednesday', 'special', 'planting'));
