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
      { src: asset("/logo.svg"), sizes: "any", type: "image/svg+xml" },
      { src: asset("/logo.svg"), sizes: "any", type: "image/svg+xml", purpose: "maskable" },
    ],
  };
}

export const dynamic = "force-static";
