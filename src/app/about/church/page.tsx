import type { Metadata } from "next";
import { Mark } from "@/components/brand";
import { PageHeader } from "@/components/page-header";
import { Container, PhotoPlaceholder } from "@/components/ui";
import { MENU, site } from "@/lib/site";

export const metadata: Metadata = { title: "교회소개" };

// [대괄호] 문구는 교회에서 받은 내용으로 교체합니다.
const values = [
  { en: "WORD", title: "말씀의 빛", text: "[핵심가치 설명] 하나님의 말씀을 삶의 기준으로 삼습니다." },
  { en: "WORSHIP", title: "예배의 기쁨", text: "[핵심가치 설명] 예배를 통해 하나님을 만나고 회복됩니다." },
  { en: "COMMUNITY", title: "함께 걷는 공동체", text: "[핵심가치 설명] 서로의 삶을 돌보며 함께 자랍니다." },
  { en: "MISSION", title: "세상을 비추는 빛", text: "[핵심가치 설명] 받은 빛을 이웃과 세상에 흘려보냅니다." },
];

export default function ChurchPage() {
  return (
    <>
      <PageHeader section={MENU[0]} title="교회소개" />

      <Container className="grid gap-8 py-10 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24">
        <PhotoPlaceholder label="예배당 사진" className="aspect-[4/3] rounded-[22px]" />
        <div className="grid gap-4">
          <span className="eyebrow text-brand-blue">GREETING</span>
          <h2 className="text-2xl leading-snug font-black tracking-tight lg:text-4xl">
            {site.verse.text}
            <br />
            <span className="text-lg font-bold text-sub lg:text-2xl">마태복음 5:14</span>
          </h2>
          <p className="leading-relaxed text-sub">
            [담임목사 인사말이 들어갈 자리] {site.name} 홈페이지를 찾아주신 여러분을 환영합니다. {site.name}는 {site.slogan}
          </p>
          <p className="font-bold">담임목사 {site.pastor}</p>
        </div>
      </Container>

      <section className="bg-navy text-cream">
        <Container className="grid gap-8 py-14 lg:py-24">
          <div className="grid gap-2">
            <span className="eyebrow text-brand-yellow">OUR VALUES</span>
            <h2 className="text-2xl font-black tracking-tight lg:text-4xl">우리가 소중히 여기는 것</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {values.map((v) => (
              <article key={v.en} className="grid content-start gap-2 rounded-[22px] bg-cream/7 p-6 lg:p-7">
                <span className="eyebrow text-brand-yellow">{v.en}</span>
                <h3 className="text-xl font-bold">{v.title}</h3>
                <p className="text-sm leading-relaxed text-cream/70">{v.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <Container className="grid gap-6 py-14 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-16 lg:py-24">
        <div className="grid size-40 place-items-center rounded-[28px] bg-white shadow-card lg:size-56">
          <Mark className="w-20 lg:w-28" />
        </div>
        <div className="grid gap-3">
          <span className="eyebrow text-brand-blue">SYMBOL</span>
          <h2 className="text-2xl font-black tracking-tight lg:text-3xl">교회 로고</h2>
          <p className="max-w-[60ch] leading-relaxed text-sub">
            [로고 의미 설명이 들어갈 자리] 옐로는 빛을, 블루는 말씀과 신실함을 나타냅니다.
          </p>
        </div>
      </Container>
    </>
  );
}
