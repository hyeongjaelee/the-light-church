import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getWorshipTimes } from "@/lib/data";
import { koTime } from "@/lib/format";
import { site } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: `${site.name} | ${site.nameEn}`, template: `%s | ${site.name}` },
  description: `${site.verse.text}. ${site.name}는 ${site.slogan}`,
  openGraph: { siteName: site.name, locale: "ko_KR", type: "website" },
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
