import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { SproutIcon, TreeIcon } from "@/components/icons";
import Link from "next/link";

export const metadata: Metadata = { title: "안내" };

const chips = ["위례 힘찬프라자 6층 · 장소 확정", "2027년 1월 개척"];

export default function GreetingPage() {
  return (
    <>
      <PageHeader path="/planting/greeting" />

      <section className="relative overflow-hidden bg-linear-168 from-navy to-brand-blue px-5 pt-24 pb-20 text-center text-white lg:pt-40 lg:pb-32">
        {/* 위에서 내려오는 빛 + 로고 가운데 빛틈 */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-56 left-1/2 h-[640px] w-[900px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgb(240_206_116/0.28)_0%,rgb(240_206_116/0.07)_45%,transparent_70%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 left-1/2 h-24 w-0.5 bg-linear-to-b from-brand-yellow/90 to-transparent lg:h-36"
        />
        <div className="relative mx-auto grid max-w-[820px] justify-items-center">
          <span className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-brand-yellow/45 px-[18px] py-[7px] text-[13px] font-semibold tracking-[0.14em] text-brand-yellow before:size-1.5 before:rounded-full before:bg-brand-yellow lg:text-sm">
            2027년 1월 · 성남 위례 개척
          </span>
          <h1 className="mb-6 text-[40px] leading-[1.28] font-extrabold tracking-[-0.02em] sm:text-5xl lg:text-[66px]">
            빛이 들어가,
            <br />
            <span className="text-brand-yellow">빛으로</span> 세운다
          </h1>
          <p className="mb-7 max-w-[560px] text-base leading-[1.8] text-white/82 lg:text-lg">
            성남 위례 힘찬프라자 6층에 복음 중심의 <br className="sm:hidden" />
            새로운 교회를 세우기 위해,
            <br />
            2027년 1월 개척을 목표로 <br className="sm:hidden" />
            준비하고 있습니다.
          </p>
          <p className="mb-10 text-[15px] text-white/68 lg:text-lg">
            &ldquo;빛이 어둠에 비치되, 어둠이 깨닫지 못하더라&rdquo;{" "}
            <b className="font-semibold text-brand-yellow">요한복음 1:5</b>
          </p>
          <div className="mb-12 flex flex-wrap justify-center gap-2.5">
            <span className="rounded-full border border-brand-yellow/50 bg-brand-yellow/16 px-[18px] py-2 text-sm font-semibold text-brand-yellow">
              복음의 큰 숲 만들기
            </span>
            {chips.map((c) => (
              <span
                key={c}
                className="rounded-full border border-white/18 bg-white/9 px-[18px] py-2 text-sm font-semibold text-white/92"
              >
                {c}
              </span>
            ))}
          </div>
          <Link
            href="/connect"
            className="group inline-flex items-center gap-2 rounded-full bg-brand-yellow px-9 py-4 text-[17px] font-extrabold text-navy shadow-[0_8px_28px_rgb(240_206_116/0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_34px_rgb(240_206_116/0.45)] hover:brightness-105"
          >
            개척에 함께하기
            <span className="relative size-[1.25em]">
              <SproutIcon className="absolute inset-0 size-full origin-bottom transition duration-300 group-hover:scale-50 group-hover:opacity-0 group-focus-visible:scale-50 group-focus-visible:opacity-0" />
              <TreeIcon className="absolute inset-0 size-full origin-bottom scale-50 opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100" />
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
