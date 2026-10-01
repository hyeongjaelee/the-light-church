@AGENTS.md

# 빛으로교회 홈페이지

- 기획/디자인 결정: PROJECT_BRIEF.md, 시안: docs/mockup.html
- 브랜드 색은 src/app/globals.css 의 @theme 토큰(brand-yellow, brand-blue, navy, cream, ink, sub, line)만 사용
- 영문 제목은 font-en(Outfit), 한글은 Pretendard. 섹션 제목은 components/ui.tsx 의 SectionTitle
- 데이터는 lib/data.ts 를 통해서만 조회 (Supabase 미설정 시 sample-data.ts 로 대체)
- 교회 정보·메뉴는 lib/site.ts
