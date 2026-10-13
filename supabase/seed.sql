-- 예시 데이터 (src/lib/sample-data.ts 와 같은 내용). [대괄호] 항목은 실제 정보로 바꿔주세요.

insert into public.worship_times (name, day_label, time, place, kind, highlight, sort_order) values
  ('주일 1부 예배', '주일', '09:00', '본당', 'worship', false, 1),
  ('주일 2부 예배', '주일', '11:00', '본당', 'worship', true, 2),
  ('수요예배', '수요일', '19:30', '본당', 'worship', false, 3),
  ('다음세대', '주일', '11:00', '교육관', 'next-generation', false, 4);

-- 다음세대 부서는 migrations/20261014010000_departments_v2.sql 에서 넣습니다.

insert into public.staff (name, role, sort_order) values
  ('[성함]', '담임목사', 1),
  ('[성함]', '부목사', 2),
  ('[성함]', '교육전도사', 3),
  ('[성함]', '장로', 4);

insert into public.sermons (category, title, preacher, scripture, preached_on, youtube_id, summary) values
  ('sunday', '빛이 머물고, 빛이 흘러가는 교회', '빛으로교회', null, '2026-09-27', 'n_4eWvdMcRQ', '빛으로교회 조감도 공개 영상입니다.'),
  ('sunday', '[예시] 어둠 속에 비치는 빛', '담임목사', '요한복음 1:1-9', '2026-09-20', 'n_4eWvdMcRQ', null),
  ('sunday', '[예시] 세상의 빛, 세상의 소금', '담임목사', '마태복음 5:13-16', '2026-09-13', 'n_4eWvdMcRQ', null),
  ('wednesday', '[예시] 기도의 자리로', '담임목사', '누가복음 18:1-8', '2026-09-23', 'n_4eWvdMcRQ', null),
  ('wednesday', '[예시] 말씀 앞에 서는 사람', '담임목사', '시편 119:105', '2026-09-16', 'n_4eWvdMcRQ', null),
  ('special', '[예시] 가을 특별새벽기도회 1일차', '담임목사', '이사야 60:1-3', '2026-09-01', 'n_4eWvdMcRQ', null);

insert into public.bulletins (sunday_date)
select d::date from generate_series('2026-08-09'::date, '2026-09-27'::date, interval '7 days') as d;
