import { supabase } from "./supabase";
import {
  sampleBulletins,
  sampleDepartments,
  sampleSermons,
  sampleStaff,
  sampleWorshipTimes,
} from "./sample-data";
import type { Bulletin, Department, DepartmentSlug, Sermon, SermonCategory, Staff, WorshipTime } from "./types";

function fail(what: string, error: { message: string }) {
  console.error(`[supabase] ${what} 조회 실패: ${error.message}`);
}

export async function getSermons(category?: SermonCategory, limit = 24): Promise<Sermon[]> {
  if (!supabase) {
    return sampleSermons.filter((s) => !category || s.category === category).slice(0, limit);
  }
  let query = supabase
    .from("sermons")
    .select("id, category, title, preacher, scripture, preached_on, youtube_id, summary")
    .eq("published", true)
    .order("preached_on", { ascending: false })
    .limit(limit);
  if (category) query = query.eq("category", category);
  const { data, error } = await query;
  if (error) fail("설교", error);
  return data ?? [];
}

export async function getLatestSermon(): Promise<Sermon | null> {
  const [latest] = await getSermons("sunday", 1);
  return latest ?? null;
}

export async function getSermon(id: string): Promise<Sermon | null> {
  if (!supabase) return sampleSermons.find((s) => s.id === id) ?? null;
  const { data, error } = await supabase
    .from("sermons")
    .select("id, category, title, preacher, scripture, preached_on, youtube_id, summary")
    .eq("id", id)
    .eq("published", true)
    .maybeSingle();
  if (error) fail("설교", error);
  return data;
}

export async function getBulletins(year?: number, limit = 60): Promise<Bulletin[]> {
  if (!supabase) {
    return sampleBulletins.filter((b) => !year || b.sunday_date.startsWith(String(year))).slice(0, limit);
  }
  let query = supabase
    .from("bulletins")
    .select("id, title, sunday_date, cover_url, images, pdf_url")
    .eq("published", true)
    .order("sunday_date", { ascending: false })
    .limit(limit);
  if (year) query = query.gte("sunday_date", `${year}-01-01`).lte("sunday_date", `${year}-12-31`);
  const { data, error } = await query;
  if (error) fail("주보", error);
  return data ?? [];
}

export async function getBulletin(id: string): Promise<Bulletin | null> {
  if (!supabase) return sampleBulletins.find((b) => b.id === id) ?? null;
  const { data, error } = await supabase
    .from("bulletins")
    .select("id, title, sunday_date, cover_url, images, pdf_url")
    .eq("id", id)
    .eq("published", true)
    .maybeSingle();
  if (error) fail("주보", error);
  return data;
}

export async function getWorshipTimes(): Promise<WorshipTime[]> {
  if (!supabase) return sampleWorshipTimes;
  const { data, error } = await supabase
    .from("worship_times")
    .select("id, name, day_label, time, place, kind, highlight, sort_order")
    .order("sort_order");
  if (error) fail("예배 시간", error);
  return data ?? [];
}

export async function getStaff(): Promise<Staff[]> {
  if (!supabase) return sampleStaff;
  const { data, error } = await supabase
    .from("staff")
    .select("id, name, role, photo_url, bio, sort_order")
    .order("sort_order");
  if (error) fail("섬기는이들", error);
  return data ?? [];
}

export async function getDepartments(): Promise<Department[]> {
  if (!supabase) return sampleDepartments;
  const { data, error } = await supabase
    .from("departments")
    .select("slug, name, name_en, intro, age_range, time_label, place, photo_url, sort_order")
    .order("sort_order");
  if (error) fail("다음세대", error);
  return data ?? [];
}

export async function getDepartment(slug: DepartmentSlug): Promise<Department | null> {
  const all = await getDepartments();
  return all.find((d) => d.slug === slug) ?? null;
}
