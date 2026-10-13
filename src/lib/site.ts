// GitHub Pages 처럼 하위 경로에 배포될 때 public/ 파일 앞에 붙는 경로
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (path: string) => `${basePath}${path}`;

// 사이트 절대 주소 (카카오톡·검색 미리보기, sitemap, robots). 환경변수가 없으면 실제 도메인
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://thelightchurch.or.kr";

// 교회 기본 정보. [대괄호] 항목은 확인 후 채워야 하는 자리입니다.
export const site = {
  name: "빛으로교회",
  nameEn: "THE LIGHT CHURCH",
  denomination: "대한예수교장로회",
  pastor: "심영보",
  address: "경기 성남시 수정구 위례광장로 21-13",
  addressDetail: "힘찬프라자 6층",
  phone: "010-4108-9810",
  email: "[이메일]",
  transit:
    "지하철 8호선 남위례역 3번 출구, 도보 약 1분 / 버스 [정류장명 · 노선]",
  parking:
    "힘찬프라자 건물 주차장 [주일 무료 여부 · 대수 · 출입구]. 주차가 어려우면 대중교통 이용을 부탁드립니다.",
  elevator: "6층 하차 후 [열린 방향] — 환영팀이 입구에서 맞습니다",
  // 다음세대 부서 화면·예배안내에 보이는 부모님 안내
  parentNote:
    "처음 오시면 환영팀이 부서실까지 함께 모시고, 아이 이름과 보호자 연락처를 받습니다.",
  // 첫 화면 '오시는 길' 요약에 쓰는 한 줄
  directions: "지하철 8호선 남위례역 인근 · 힘찬프라자 건물 주차장 이용",
  verse: { ref: "MATTHEW 5:14", text: "너희는 세상의 빛이라" },
  slogan: "예수님으로 가득한 교회",
  sns: {
    instagram: "https://www.instagram.com/thelightchurch_seongnam/",
    youtube: "https://www.youtube.com/@성남빛으로교회",
    blog: "", // 링크가 생기면 입력 (비어 있으면 '준비 중'으로 표시)
  },
} as const;

export const fullAddress = `${site.address} ${site.addressDetail}`.trim();

export type MenuItem = {
  en: string;
  /** 공간이 좁을 때 쓰는 짧은 영문 (모바일 메뉴, 좁은 PC 화면) */
  short?: string;
  ko: string;
  href: string;
  sub: { label: string; href: string }[];
};

export const MENU: MenuItem[] = [
  {
    en: "PLANTING",
    ko: "개척 이야기",
    href: "/planting/greeting",
    sub: [
      { label: "안내", href: "/planting/greeting" },
      { label: "영상", href: "/planting/videos" },
      { label: "모임사진", href: "/planting/photos" },
      { label: "모임예정", href: "/planting/meetings" },
      { label: "비전나눔", href: "/planting/vision-sharing" },
    ],
  },
  {
    en: "ABOUT",
    ko: "소개",
    href: "/about/church",
    sub: [
      { label: "비전 · 핵심가치", href: "/about/church" },
      { label: "섬기는이들", href: "/about/people" },
      { label: "예배안내", href: "/about/worship" },
      { label: "오시는길", href: "/about/location" },
    ],
  },
  {
    en: "SERMONS",
    ko: "예배와 말씀",
    href: "/sermons/sunday",
    sub: [
      { label: "주일예배", href: "/sermons/sunday" },
      { label: "수요예배", href: "/sermons/wednesday" },
      { label: "특별집회", href: "/sermons/special" },
    ],
  },
  {
    en: "NEXT GENERATION",
    short: "N.G.",
    ko: "다음세대",
    href: "/next-generation/infant",
    sub: [
      { label: "빛뜰", href: "/next-generation/infant" },
      { label: "빛깔", href: "/next-generation/kinder" },
      { label: "빛냄", href: "/next-generation/elementary" },
      { label: "빛속", href: "/next-generation/teens" },
      { label: "빛위드", href: "/next-generation/youth" },
    ],
  },
  {
    en: "NEWS",
    ko: "교회소식",
    href: "/news/bulletin",
    sub: [{ label: "교회주보", href: "/news/bulletin" }],
  },
];

export function sectionOf(pathname: string) {
  return MENU.find((m) => m.sub.some((s) => pathname.startsWith(s.href)));
}
