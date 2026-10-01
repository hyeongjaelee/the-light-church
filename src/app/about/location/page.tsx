import type { Metadata } from "next";
import { MapPlaceholder } from "@/components/home/sections";
import { PageHeader } from "@/components/page-header";
import { btn, Container } from "@/components/ui";
import { fullAddress, MENU, site } from "@/lib/site";

export const metadata: Metadata = { title: "오시는길" };

export default function LocationPage() {
  const q = encodeURIComponent(site.address);
  const rows = [
    { label: "주소", value: fullAddress },
    { label: "전화", value: site.phone },
    { label: "대중교통", value: site.transit },
    { label: "주차", value: site.parking },
  ];
  return (
    <>
      <PageHeader section={MENU[0]} title="오시는길" />
      <Container className="grid gap-8 py-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14 lg:py-20">
        <MapPlaceholder />
        <div className="grid content-start gap-6">
          <dl className="grid gap-4">
            {rows.map((r) => (
              <div key={r.label} className="grid gap-0.5 border-b border-line pb-4">
                <dt className="text-xs font-bold text-brand-blue">{r.label}</dt>
                <dd className="text-base">{r.value}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap gap-2">
            <a href={`https://map.naver.com/p/search/${q}`} target="_blank" rel="noopener noreferrer" className={`${btn.primary} ${btn.size}`}>
              네이버 지도
            </a>
            <a href={`https://map.kakao.com/?q=${q}`} target="_blank" rel="noopener noreferrer" className={`${btn.outline} ${btn.size}`}>
              카카오맵
            </a>
          </div>
        </div>
      </Container>
    </>
  );
}
