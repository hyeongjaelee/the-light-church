"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Paper } from "@/components/brand";
import { koDate } from "@/lib/format";
import type { Bulletin } from "@/lib/types";

// 연도 탭은 브라우저에서 전환 (정적 배포에서도 동작)
export function BulletinList({ bulletins }: { bulletins: Bulletin[] }) {
  const years = [...new Set(bulletins.map((b) => Number(b.sunday_date.slice(0, 4))))];
  const [year, setYear] = useState(years[0]);
  const list = bulletins.filter((b) => b.sunday_date.startsWith(String(year)));
  const newestId = bulletins[0]?.id;

  if (bulletins.length === 0) {
    return <p className="rounded-[22px] bg-white p-10 text-center text-sub shadow-card">아직 등록된 주보가 없습니다.</p>;
  }

  return (
    <>
      {years.length > 1 && (
        <div role="tablist" aria-label="연도" className="flex gap-1.5">
          {years.map((y) => (
            <button
              key={y}
              type="button"
              role="tab"
              aria-selected={y === year}
              onClick={() => setYear(y)}
              className={`rounded-full px-3 py-1.5 font-en text-xs font-semibold lg:text-sm ${
                y === year ? "bg-navy text-cream" : "bg-white text-sub ring-1 ring-line"
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      )}
      <ul>
        {list.map((b) => (
          <li key={b.id}>
            <Link
              href={`/news/bulletin/${b.id}`}
              className="group grid grid-cols-[64px_1fr_auto] items-center gap-3.5 border-b border-line py-3.5 lg:grid-cols-[84px_1fr_auto] lg:gap-6 lg:py-5"
            >
              {b.cover_url ? (
                <Image src={b.cover_url} alt="" width={168} height={224} className="aspect-[3/4] rounded-md object-cover shadow-card" />
              ) : (
                <Paper small />
              )}
              <div>
                <b className="block text-[15px] tracking-tight group-hover:text-brand-blue lg:text-lg">
                  {koDate(b.sunday_date)} 주보
                  {b.id === newestId && (
                    <span className="ml-1.5 rounded-full bg-brand-yellow px-[7px] py-px align-[2px] font-en text-[10px] font-bold text-navy">
                      NEW
                    </span>
                  )}
                </b>
                <small className="text-xs text-sub lg:text-sm">
                  {b.images.length > 0 ? `이미지 ${b.images.length}장` : b.pdf_url ? "PDF" : "준비 중"} · {b.title}
                </small>
              </div>
              <span className="grid size-[30px] place-items-center rounded-full text-sub ring-1 ring-line" aria-hidden="true">
                ›
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
