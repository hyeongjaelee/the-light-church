# 빛으로교회 홈페이지

Next.js 16 (App Router) + Tailwind CSS 4 + Supabase + Vercel 로 만든 반응형 웹앱입니다.
기획과 디자인 결정은 [PROJECT_BRIEF.md](PROJECT_BRIEF.md), 화면 시안은 [docs/mockup.html](docs/mockup.html) 에 있습니다.

## 실행하기

```bash
npm install
npm run dev        # http://localhost:3000
```

Supabase 환경변수가 없으면 `src/lib/sample-data.ts` 의 예시 데이터로 화면이 뜹니다.

## 폴더 구조

```
src/
  app/                    페이지 (주소 = 폴더 경로)
    page.tsx              홈
    about/                소개: church, people, location, worship
    sermons/              예배와 말씀: sunday, wednesday, special, [id](설교 상세)
    school/[dept]/        다음세대(N.G.): infant, elementary, youth
    news/bulletin/        교회주보 목록, [id](주보 상세)
    newfamily/            새가족 등록 신청서
  components/
    layout/               헤더, 커튼 메뉴(drawer), 푸터
    home/sections.tsx     홈 화면 섹션들
    youtube-player.tsx    유튜브 플레이어 (음소거 자동재생 + 소리 켜기)
  lib/
    site.ts               교회 기본 정보, 메뉴 구성  ← 주소·연락처는 여기서 수정
    data.ts               Supabase 조회 함수
    sample-data.ts        예시 데이터
supabase/
  migrations/             DB 테이블, 권한(RLS), 파일 저장소
  seed.sql                예시 데이터
```

## Supabase 연결

1. [supabase.com](https://supabase.com) 에서 새 프로젝트를 만듭니다. (Region: Northeast Asia (Seoul) 권장)
2. 대시보드 **SQL Editor** 에서 아래 파일 내용을 순서대로 실행합니다.
   - `supabase/migrations/20261001000000_init.sql` (테이블·권한·저장소)
   - `supabase/migrations/20261001010000_new_family.sql` (새가족 등록 신청서)
   - `supabase/seed.sql` (예시 데이터, 선택)
3. **Project Settings → API** 에서 URL 과 Publishable key 를 복사해 `.env.local` 을 만듭니다.
   ```bash
   cp .env.example .env.local
   ```
4. `npm run dev` 를 다시 실행하면 DB 데이터로 화면이 바뀝니다.

### 관리자 계정 등록 (관리자 페이지를 만든 뒤 사용)
**Authentication → Users** 에서 담당자 계정을 만들고, SQL Editor 에서 등록합니다.
```sql
insert into public.admins (user_id)
select id from auth.users where email = '담당자@이메일.com';
```

## Vercel 배포

1. 이 폴더를 GitHub 저장소에 올립니다.
2. [vercel.com](https://vercel.com) → **Add New Project** → 저장소 선택 (설정은 기본값 그대로)
3. **Environment Variables** 에 `.env.local` 의 세 값을 넣고 Deploy
4. 도메인이 있으면 **Settings → Domains** 에서 연결하고, `NEXT_PUBLIC_SITE_URL` 을 그 주소로 바꿉니다.

이후에는 `git push` 할 때마다 자동으로 배포됩니다.

## 콘텐츠가 바뀌는 주기

- 홈, 설교 목록·상세, 주보 상세: 1분마다 새 데이터 반영
- 섬기는이들, 예배안내, 주일학교: 5분마다 반영
- 주보 목록: 접속할 때마다 반영

## 남은 작업

- [ ] 관리자 페이지 (`/admin`): 로그인, 주보 업로드, 설교 등록
- [ ] 실제 정보 채우기: `src/lib/site.ts` 의 `[대괄호]` 항목, 사진
- [ ] 로고 원본(SVG) 받아서 `src/components/brand.tsx`, `public/brand/wordmark.png` 교체
- [ ] 지도: 주소 확정 후 네이버/카카오 지도 연동
