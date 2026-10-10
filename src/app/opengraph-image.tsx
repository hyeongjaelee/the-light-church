import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// 카카오톡 등에 링크를 공유할 때 보이는 이미지: 크림색 바탕 가운데 public/logo.svg
export const alt = `${site.name} ${site.nameEn}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// GitHub Pages 정적 배포(output: export)에서는 빌드 때 한 번 만들어 두어야 함
export const dynamic = "force-static";

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public/logo.svg"));
  const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fbf8f1",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={270} height={350} alt="" />
      </div>
    ),
    size,
  );
}
