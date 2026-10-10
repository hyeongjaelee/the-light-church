import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { btn, Container } from "@/components/ui";
import { visionWeeks } from "@/lib/planting";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "비전나눔",
  description:
    "복음 · 교회 · 도시. 2026년 가을 세 주간 나눈 빛으로교회 개척의 뼈대입니다.",
};

const words = [
  { ko: "빛", en: "LUMEN", text: "어두운 곳에 먼저 가는 교회" },
  { ko: "생명", en: "VITA", text: "살아나는 일이 일어나는 교회" },
  { ko: "사랑", en: "CARITAS", text: "이웃이 사랑하는 교회" },
];

export default function VisionSharingPage() {
  return (
    <>
      <PageHeader
        path="/planting/vision-sharing"
        description="복음 · 교회 · 도시. 개척은 건물을 세우는 일이 아니라, 이 세 가지를 붙드는 사람들이 모이는 일입니다."
      />

      <Container className="grid max-w-[1080px] gap-14 py-10 lg:gap-20 lg:py-20">
        <blockquote className="rounded-r-[14px] border-l-4 border-brand-yellow bg-white px-7 py-6 shadow-card">
          <p className="text-lg leading-relaxed font-bold text-navy lg:text-[23px]">
            &ldquo;복음은 우리 존재의 방식, 도시는 우리 존재의 자리, 생태계는
            우리 존재의 이유이다.&rdquo;
          </p>
          <p className="mt-3 text-sm text-sub">
            2026년 9월 5일 · 12일 · 19일, 세 번의 토요일에 나눈 기조 문장입니다.
          </p>
        </blockquote>

        <section className="grid gap-6">
          <div className="grid gap-2">
            <span className="eyebrow text-brand-blue">세 주간의 뼈대</span>
            <h2 className="text-2xl font-black tracking-tight lg:text-[32px]">
              한 주에 하나씩 붙든 것
            </h2>
          </div>
          {visionWeeks.map((w) => (
            <article
              key={w.week}
              className="overflow-hidden rounded-[18px] bg-white shadow-card ring-1 ring-line"
            >
              <header className="grid gap-2 border-b border-line bg-brand-blue/8 px-6 py-5 lg:px-7">
                <p className="flex items-center gap-2.5">
                  <span className="rounded-full bg-brand-blue px-2.5 py-0.5 text-xs font-bold text-white">
                    {w.week}
                  </span>
                  <span className="text-[13px] text-sub">{w.date}</span>
                </p>
                <h3 className="text-xl font-extrabold lg:text-2xl">
                  {w.title}
                </h3>
                <p className="text-[13px] text-sub">{w.ref}</p>
                <p className="text-[15px] font-semibold text-brand-blue">
                  {w.one}
                </p>
              </header>
              <dl className="divide-y divide-line">
                {w.points.map((p) => (
                  <div key={p.t} className="grid gap-2 px-6 py-5 lg:px-7">
                    <dt className="font-bold">{p.t}</dt>
                    <dd className="text-[15px] leading-[1.75] text-sub">
                      {p.d}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </section>

        <section className="grid gap-6">
          <div className="grid gap-2">
            <span className="eyebrow text-brand-blue">
              우리가 붙드는 세 단어
            </span>
            <h2 className="text-2xl font-black tracking-tight lg:text-[32px]">
              빛으로, 생명으로, 사랑으로
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-3 lg:gap-4">
            {words.map((v) => (
              <div
                key={v.en}
                className="rounded-b-[14px] border-t-[3px] border-brand-yellow bg-white p-6 shadow-card"
              >
                <b className="block text-[28px] font-black">{v.ko}</b>
                <span className="eyebrow text-brand-blue">{v.en}</span>
                <p className="mt-3 text-[15px] text-sub">{v.text}</p>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
