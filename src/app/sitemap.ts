import type { MetadataRoute } from "next";
import { getBulletins, getSermons } from "@/lib/data";
import { MENU } from "@/lib/site";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [sermons, bulletins] = await Promise.all([getSermons(undefined, 200), getBulletins(undefined, 200)]);
  const pages = ["/", "/newfamily", ...MENU.flatMap((m) => m.sub.map((s) => s.href))];
  return [
    ...pages.map((p) => ({ url: `${base}${p}` })),
    ...sermons.map((s) => ({ url: `${base}/sermons/${s.id}`, lastModified: s.preached_on })),
    ...bulletins.map((b) => ({ url: `${base}/news/bulletin/${b.id}`, lastModified: b.sunday_date })),
  ];
}

export const revalidate = 3600;
