import type { MetadataRoute } from "next";
import { asset, site } from "@/lib/site";

// PWA: 홈 화면에 추가하면 앱처럼 전체화면으로 실행됩니다.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} ${site.nameEn}`,
    short_name: site.name,
    description: `${site.verse.text}. ${site.slogan}`,
    start_url: asset("/"),
    display: "standalone",
    background_color: "#fbf8f1",
    theme_color: "#fbf8f1",
    lang: "ko",
    icons: [
      { src: asset("/icon-192.png"), sizes: "192x192", type: "image/png" },
      { src: asset("/icon-512.png"), sizes: "512x512", type: "image/png" },
      { src: asset("/icon-512.png"), sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}

export const dynamic = "force-static";
