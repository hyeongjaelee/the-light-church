export type SermonCategory = "sunday" | "wednesday" | "special";

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
  kind: "worship" | "school";
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

export const SERMON_CATEGORIES: Record<SermonCategory, { ko: string; en: string }> = {
  sunday: { ko: "주일예배", en: "SUNDAY" },
  wednesday: { ko: "수요예배", en: "WEDNESDAY" },
  special: { ko: "특별집회", en: "SPECIAL" },
};
