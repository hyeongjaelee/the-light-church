// Supabase가 연결되기 전(환경변수 없음)에 화면을 확인하기 위한 예시 데이터입니다.
// supabase/seed.sql 에 같은 내용이 들어 있습니다.
import type { Bulletin, Department, Sermon, Staff, WorshipTime } from "./types";

const VIDEO = "n_4eWvdMcRQ"; // 빛으로교회 조감도 공개 영상

export const sampleSermons: Sermon[] = [
  {
    id: "s-0927",
    category: "sunday",
    title: "빛이 머물고, 빛이 흘러가는 교회",
    preacher: "빛으로교회",
    scripture: null,
    preached_on: "2026-09-27",
    youtube_id: VIDEO,
    summary: "빛으로교회 조감도 공개 영상입니다.",
  },
  {
    id: "s-0920",
    category: "sunday",
    title: "[예시] 어둠 속에 비치는 빛",
    preacher: "담임목사",
    scripture: "요한복음 1:1-9",
    preached_on: "2026-09-20",
    youtube_id: VIDEO,
    summary: null,
  },
  {
    id: "s-0913",
    category: "sunday",
    title: "[예시] 세상의 빛, 세상의 소금",
    preacher: "담임목사",
    scripture: "마태복음 5:13-16",
    preached_on: "2026-09-13",
    youtube_id: VIDEO,
    summary: null,
  },
  {
    id: "w-0923",
    category: "wednesday",
    title: "[예시] 기도의 자리로",
    preacher: "담임목사",
    scripture: "누가복음 18:1-8",
    preached_on: "2026-09-23",
    youtube_id: VIDEO,
    summary: null,
  },
  {
    id: "w-0916",
    category: "wednesday",
    title: "[예시] 말씀 앞에 서는 사람",
    preacher: "담임목사",
    scripture: "시편 119:105",
    preached_on: "2026-09-16",
    youtube_id: VIDEO,
    summary: null,
  },
  {
    id: "sp-0901",
    category: "special",
    title: "[예시] 가을 특별새벽기도회 1일차",
    preacher: "담임목사",
    scripture: "이사야 60:1-3",
    preached_on: "2026-09-01",
    youtube_id: VIDEO,
    summary: null,
  },
];

const sundays = ["2026-09-27", "2026-09-20", "2026-09-13", "2026-09-06", "2026-08-30", "2026-08-23", "2026-08-16", "2026-08-09"];

export const sampleBulletins: Bulletin[] = sundays.map((d) => ({
  id: `b-${d}`,
  title: "주일예배 주보",
  sunday_date: d,
  cover_url: null,
  images: [],
  pdf_url: null,
}));

export const sampleWorshipTimes: WorshipTime[] = [
  { id: "wt1", name: "주일 1부 예배", day_label: "주일", time: "09:00", place: "본당", kind: "worship", highlight: false, sort_order: 1 },
  { id: "wt2", name: "주일 2부 예배", day_label: "주일", time: "11:00", place: "본당", kind: "worship", highlight: true, sort_order: 2 },
  { id: "wt3", name: "수요예배", day_label: "수요일", time: "19:30", place: "본당", kind: "worship", highlight: false, sort_order: 3 },
  { id: "wt4", name: "주일학교", day_label: "주일", time: "11:00", place: "교육관", kind: "school", highlight: false, sort_order: 4 },
];

export const sampleStaff: Staff[] = [
  { id: "st1", name: "[성함]", role: "담임목사", photo_url: null, bio: null, sort_order: 1 },
  { id: "st2", name: "[성함]", role: "부목사", photo_url: null, bio: null, sort_order: 2 },
  { id: "st3", name: "[성함]", role: "교육전도사", photo_url: null, bio: null, sort_order: 3 },
  { id: "st4", name: "[성함]", role: "장로", photo_url: null, bio: null, sort_order: 4 },
];

export const sampleDepartments: Department[] = [
  {
    slug: "infant",
    name: "영아부",
    name_en: "INFANT",
    intro: "미취학 아이들이 부모와 함께 하나님의 사랑을 처음 배웁니다.",
    age_range: "0세 ~ 미취학",
    time_label: "주일 오전 11:00",
    place: "교육관",
    photo_url: null,
    sort_order: 1,
  },
  {
    slug: "elementary",
    name: "초등부",
    name_en: "KIDS",
    intro: "매주 주일, 말씀과 찬양으로 아이들 스스로 믿음을 세워갑니다.",
    age_range: "초등학교 1 ~ 6학년",
    time_label: "주일 오전 11:00",
    place: "교육관",
    photo_url: null,
    sort_order: 2,
  },
  {
    slug: "youth",
    name: "청년부",
    name_en: "YOUTH",
    intro: "삶과 신앙을 나누며 함께 기도하는 청년 공동체입니다.",
    age_range: "20 ~ 30대",
    time_label: "주일 오후 2:00",
    place: "본당",
    photo_url: null,
    sort_order: 3,
  },
];
