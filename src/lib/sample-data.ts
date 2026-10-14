// Supabase가 연결되기 전(환경변수 없음)에 화면을 확인하기 위한 예시 데이터입니다.
// supabase/seed.sql 에 같은 내용이 들어 있습니다.
import type { Bulletin, Department, Sermon, Staff, WorshipTime } from "./types";

const VIDEO = "n_4eWvdMcRQ"; // 빛으로교회 조감도 공개 영상

export const sampleSermons: Sermon[] = [
  {
    id: "s-1012",
    category: "planting",
    title: "덩케르크 미라클 | 빛으로교회의 시작",
    preacher: "담임목사",
    scripture: null,
    preached_on: "2026-10-12",
    youtube_id: "NnDgOwG67nU",
    summary: "덩케르크 미라클 | 빛으로교회의 시작",
  },
  {
    id: "s-0927",
    category: "planting",
    title: "빛이 머물고, 빛이 흘러가는 교회",
    preacher: "빛으로교회",
    scripture: null,
    preached_on: "2026-09-27",
    youtube_id: VIDEO,
    summary: "빛으로교회 조감도 공개 영상입니다.",
  },
];

const sundays = [
  "2026-09-27",
  "2026-09-20",
  "2026-09-13",
  "2026-09-06",
  "2026-08-30",
  "2026-08-23",
  "2026-08-16",
  "2026-08-09",
];

export const sampleBulletins: Bulletin[] = sundays.map((d) => ({
  id: `b-${d}`,
  title: "주일예배 주보",
  sunday_date: d,
  cover_url: null,
  images: [],
  pdf_url: null,
}));

export const sampleWorshipTimes: WorshipTime[] = [
  {
    id: "wt1",
    name: "주일 1부 예배",
    day_label: "주일",
    time: "09:30",
    place: "Light Hall(본당)",
    kind: "worship",
    highlight: false,
    sort_order: 1,
  },
  {
    id: "wt2",
    name: "주일 2부 예배",
    day_label: "주일",
    time: "11:30",
    place: "Light Hall(본당)",
    kind: "worship",
    highlight: false,
    sort_order: 2,
  },
  {
    id: "wt3",
    name: "주일 3부 예배(청년)",
    day_label: "주일",
    time: "14:30",
    place: "Light Hall(본당)",
    kind: "worship",
    highlight: false,
    sort_order: 3,
  },
  {
    id: "wt4",
    name: "다음세대",
    day_label: "주일",
    time: "09:30 / 11:30", // 여러 번이면 " / " 로 구분
    place: "어린이·유치부 예배실",
    kind: "next-generation",
    highlight: false,
    sort_order: 4,
  },
];

export const sampleStaff: Staff[] = [
  {
    id: "st1",
    name: "심영보",
    role: "담임목사",
    photo_url: null,
    duty: "빛으로교회 담임",
    sort_order: 1,
  },
  {
    id: "st2",
    name: "김민주",
    role: "목양 간사",
    photo_url: null,
    duty: "목회비서, 청년 양육",
    sort_order: 2,
  },
  {
    id: "st3",
    name: "이수정",
    role: "유초등부 전도사",
    photo_url: null,
    duty: "유초등부, 양육",
    sort_order: 3,
  },
  {
    id: "st4",
    name: "이성은",
    role: "영유치부 전도사",
    photo_url: null,
    duty: "영유치부, 양육",
    sort_order: 4,
  },
  {
    id: "st5",
    name: "최정은",
    role: "찬양사",
    photo_url: null,
    duty: "찬양팀 총괄",
    sort_order: 5,
  },
];

export const sampleDepartments: Department[] = [
  {
    slug: "infant",
    menu_name: "빛뜰",
    name: "영아",
    name_en: "INFANT",
    intro:
      "빛이 드는 뜰에서, 아기와 부모가 함께 하나님께 예배합니다. 자모실에서도 본당 예배가 그대로 들립니다.",
    age_range: "0~3세와 부모",
    time_label: "주일 예배 시간",
    place: "자모실·수유실",
    photo_url: null,
    sort_order: 1,
  },
  {
    slug: "kinder",
    menu_name: "빛깔",
    name: "유치부",
    name_en: "KINDER",
    intro:
      "하나님이 저마다 다른 빛깔로 지으신 아이들이, 노래와 이야기로 하나님의 사랑을 처음 배웁니다.",
    age_range: "4~7세",
    time_label: "주일 오전 11:30",
    place: "소예배실",
    photo_url: null,
    sort_order: 2,
  },
  {
    slug: "elementary",
    menu_name: "빛냄",
    name: "유초등부",
    name_en: "KIDS",
    intro:
      "말씀의 빛을 받은 아이들이 친구와 학교에서 그 빛을 내는 연습을 합니다.",
    age_range: "초등 1~6학년",
    time_label: "주일 오전 11:30",
    place: "2층 무키무키",
    photo_url: null,
    sort_order: 3,
  },
  {
    slug: "teens",
    menu_name: "빛속",
    name: "중고등부",
    name_en: "TEENS",
    intro:
      "흔들리는 시기에도 빛 속을 걷는 법을 배웁니다. 질문을 환영하고 복음으로 답합니다.",
    age_range: "중·고등학생",
    time_label: "주일 오전 9:30",
    place: "카페",
    photo_url: null,
    sort_order: 4,
  },
  {
    slug: "youth",
    menu_name: "빛위드",
    name: "청년부",
    name_en: "YOUTH",
    intro:
      "빛이신 주님과 함께, 그리고 서로 함께. 삶과 신앙을 나누고 위례를 섬기는 청년 공동체입니다.",
    age_range: "20~30대",
    time_label: "주일 오후 2:30",
    place: "Light Hall（본당）",
    photo_url: null,
    sort_order: 5,
  },
];
