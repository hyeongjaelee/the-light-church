import type { NextConfig } from "next";

// GITHUB_PAGES=true 로 빌드하면 정적 파일(out/)로 내보냅니다. (임시 배포용, Vercel 빌드에는 영향 없음)
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  ...(isPages && { output: "export", trailingSlash: true }),
  basePath: basePath || undefined,
  images: {
    unoptimized: isPages,
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
};

export default nextConfig;
