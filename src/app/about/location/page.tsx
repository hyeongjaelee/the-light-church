import type { Metadata } from "next";
import { MapPlaceholder } from "@/components/home/sections";
import { PageHeader } from "@/components/page-header";
import { btn, Container } from "@/components/ui";
import { fullAddress, site } from "@/lib/site";

export const metadata: Metadata = { title: "오시는길" };

export default function LocationPage() {
  const q = encodeURIComponent(site.address);
  const rows = [
    { label: "주소", value: fullAddress },
    { label: "대중교통", value: site.transit },
    { label: "주차", value: site.parking },
    { label: "엘리베이터", value: site.elevator },
    { label: "문의", value: site.phone },
  ];
  return (
    <>
      <PageHeader path="/about/location" />
      <Container className="grid gap-8 py-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14 lg:py-20">
        {/* self-start: 오른쪽 안내가 길어져도 지도가 세로로 늘어나지 않고 원래 비율 유지 */}
        <MapPlaceholder className="self-start" />
        <div className="grid content-start gap-6 text-sub">
          <dl className="grid gap-4">
            {rows.map((r) => (
              <div
                key={r.label}
                className="grid gap-0.5 border-b border-line pb-4"
              >
                <dt className="text-xs font-bold text-brand-blue">{r.label}</dt>
                <dd className="text-base">{r.value}</dd>
              </div>
            ))}
          </dl>
          {/* 모바일: 지도 바로 아래(안내 목록 위)에 / PC: 안내 목록 아래에 */}
          <div className="-order-1 flex flex-wrap gap-2 lg:order-none">
            <a
              href={`https://map.naver.com/p/search/${q}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btn.outline} ${btn.size}`}
            >
              네이버 지도
            </a>
            <a
              href={`https://map.kakao.com/?q=${q}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btn.outline} ${btn.size}`}
            >
              카카오맵
            </a>
          </div>
        </div>
      </Container>
    </>
  );
}
