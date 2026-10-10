import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getWorshipTimes } from "@/lib/data";
import { koTime } from "@/lib/format";
import { site, siteUrl } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

// 카카오톡 등 링크 공유 미리보기 문구
const shareTitle = `${site.name} · ${site.nameEn}`;
const shareDescription = `${site.slogan}. 모든 곳에서 예수 그리스도가 나타나게 하라`;

export const metadata: Metadata = {
  // og:image 같은 절대 주소의 기준. 비어 있으면 실제 도메인으로 (localhost 로 나가면 카톡이 이미지를 못 가져옴)
  metadataBase: new URL(siteUrl),
  title: { default: shareTitle, template: `%s | ${site.name}` },
  description: shareDescription,
  // 검색엔진 소유 확인 (네이버 서치어드바이저)
  verification: {
    other: {
      "naver-site-verification": "af8c9e93449329ecd3f783de5c56fa17b1141197",
    },
  },
  openGraph: {
    title: shareTitle,
    description: shareDescription,
    siteName: site.name,
    locale: "ko_KR",
    type: "website",
  },
  icons: { icon: [{ url: "/logo.svg", type: "image/svg+xml" }] },
  appleWebApp: { title: site.name, statusBarStyle: "default" },
};

export const viewport: Viewport = {
  themeColor: "#fbf8f1",
  viewportFit: "cover",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const times = (await getWorshipTimes())
    .filter((t) => t.kind === "worship")
    .sort((a, b) => Number(b.highlight) - Number(a.highlight))
    .map((t) => `${t.name} ${koTime(t.time)}`);

  return (
    <html lang="ko" className={outfit.variable}>
      <head>
        {/* Pretendard: 필요한 글자만 내려받는 dynamic subset */}
        <link
          rel="stylesheet"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="flex min-h-dvh flex-col">
        <SiteHeader times={times} />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
