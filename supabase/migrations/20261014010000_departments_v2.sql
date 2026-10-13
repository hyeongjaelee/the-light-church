-- 다음세대 부서 개편: 3개(영아·초등·청년) → 5개(빛뜰·빛깔·빛냄·빛속·빛위드)
alter table public.departments drop constraint departments_slug_check;
alter table public.departments
  add constraint departments_slug_check
  check (slug in ('infant', 'kinder', 'elementary', 'teens', 'youth'));

-- 메뉴·제목에 쓰는 이름 (빛뜰 등)
alter table public.departments add column menu_name text not null default '';

insert into public.departments (slug, menu_name, name, name_en, intro, age_range, time_label, place, sort_order) values
  ('infant', '빛뜰', '영아', 'INFANT', '빛이 드는 뜰에서, 아기와 부모가 함께 하나님께 예배합니다. 자모실에서도 본당 예배가 그대로 들립니다.', '0~3세와 부모', '주일 예배 시간', '자모실·수유실', 1),
  ('kinder', '빛깔', '유치부', 'KINDER', '하나님이 저마다 다른 빛깔로 지으신 아이들이, 노래와 이야기로 하나님의 사랑을 처음 배웁니다.', '4~7세', '주일 오전 11:30', '소예배실', 2),
  ('elementary', '빛냄', '유초등부', 'KIDS', '말씀의 빛을 받은 아이들이 친구와 학교에서 그 빛을 내는 연습을 합니다.', '초등 1~6학년', '주일 오전 [11:30]', '키즈카페', 3),
  ('teens', '빛속', '중고등부', 'TEENS', '흔들리는 시기에도 빛 속을 걷는 법을 배웁니다. 질문을 환영하고 복음으로 답합니다.', '중·고등학생', '주일 오전 9:30', '카페', 4),
  ('youth', '빛위드', '청년부', 'YOUTH', '빛이신 주님과 함께, 그리고 서로 함께. 삶과 신앙을 나누고 위례를 섬기는 청년 공동체입니다.', '20~30대', '주일 오후 2:30', 'Light Hall', 5)
on conflict (slug) do update set
  menu_name = excluded.menu_name, name = excluded.name, name_en = excluded.name_en,
  intro = excluded.intro, age_range = excluded.age_range, time_label = excluded.time_label,
  place = excluded.place, sort_order = excluded.sort_order;

alter table public.departments alter column menu_name drop default;
