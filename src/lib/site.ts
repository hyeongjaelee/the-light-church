// GitHub Pages 처럼 하위 경로에 배포될 때 public/ 파일 앞에 붙는 경로
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (path: string) => `${basePath}${path}`;

// 교회 기본 정보. [대괄호] 항목은 확인 후 채워야 하는 자리입니다.
export const site = {
  name: "빛으로교회",
  nameEn: "THE LIGHT CHURCH",
  denomination: "대한예수교장로회",
  pastor: "[성함]",
  address: "경기 성남시 수정구 위례광장로 21-13",
  addressDetail: "힘찬프라자 6층",
  phone: "[전화번호]",
  email: "[이메일]",
  parking: "[주차 안내 입력 예정]",
  transit: "[대중교통 안내 입력 예정]",
  verse: { ref: "MATTHEW 5:14", text: "너희는 세상의 빛이라" },
  slogan: "말씀의 빛 안에서 함께 걷는 공동체입니다.",
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
    en: "ABOUT",
    ko: "소개",
    href: "/about/church",
    sub: [
      { label: "교회소개", href: "/about/church" },
      { label: "섬기는이들", href: "/about/people" },
      { label: "오시는길", href: "/about/location" },
      { label: "예배안내", href: "/about/worship" },
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
    en: "NEW GENERATION",
    short: "N.G.",
    ko: "다음세대",
    href: "/school/infant",
    sub: [
      { label: "영아부", href: "/school/infant" },
      { label: "초등부", href: "/school/elementary" },
      { label: "청년부", href: "/school/youth" },
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
