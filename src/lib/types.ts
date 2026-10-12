export type SermonCategory = "sunday" | "wednesday" | "special" | "planting";

export type Sermon = {
  id: string;
  category: SermonCategory;
  title: string;
  preacher: string | null;
  scripture: string | null;
  preached_on: string; // YYYY-MM-DD
  youtube_id: string;
  summary: string | null;
};

export type Bulletin = {
  id: string;
  title: string;
  sunday_date: string; // YYYY-MM-DD
  cover_url: string | null;
  images: string[];
  pdf_url: string | null;
};

export type WorshipTime = {
  id: string;
  name: string;
  day_label: string;
  time: string; // HH:MM
  place: string | null;
  kind: "worship" | "next-generation";
  highlight: boolean;
  sort_order: number;
};

export type Staff = {
  id: string;
  name: string;
  role: string;
  photo_url: string | null;
  bio: string | null;
  sort_order: number;
};

export type DepartmentSlug = "infant" | "elementary" | "youth";

export type Department = {
  slug: DepartmentSlug;
  name: string;
  name_en: string;
  intro: string;
  age_range: string | null;
  time_label: string | null;
  place: string | null;
  photo_url: string | null;
  sort_order: number;
};

export const SERMON_CATEGORIES: Record<
  SermonCategory,
  /** href: 목록 화면 경로 */
  { ko: string; en: string; href: string }
> = {
  sunday: { ko: "주일예배", en: "SUNDAY", href: "/sermons/sunday" },
  wednesday: { ko: "수요예배", en: "WEDNESDAY", href: "/sermons/wednesday" },
  special: { ko: "특별집회", en: "SPECIAL", href: "/sermons/special" },
  planting: { ko: "개척 영상", en: "PLANTING", href: "/planting/videos" },
};
