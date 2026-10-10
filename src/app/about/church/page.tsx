import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Container } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "교회소개" };

const visionPath = [
  { step: "01", title: "한 사람의 회복", text: "복음이 한 영혼을 밝힙니다" },
  { step: "02", title: "가정", text: "회복된 빛이 가정을 세웁니다" },
  { step: "03", title: "공동체", text: "함께 모여 빛의 공동체가 됩니다" },
  { step: "04", title: "도시", text: "세상의 빛으로 도시를 비춥니다" },
];

const values = [
  {
    en: "LIGHT",
    title: "빛",
    verse: "요한복음 8:12",
    text: "진리이신 예수 그리스도, 빛 된 말씀. 오직 성경 위에 세워지는 교회를 꿈꿉니다.",
  },
  {
    en: "LIFE",
    title: "생명",
    verse: "요한복음 10:10",
    text: "변화된 삶, 빛으로 나아가는 기쁨, 함께하는 감격. 풍성한 생명을 누리는 공동체입니다.",
  },
  {
    en: "LOVE",
    title: "사랑",
    verse: "요한복음 13:34",
    text: "복음의 역동, 세상의 빛으로, 세상을 변혁하는 힘. 사랑으로 세상을 섬깁니다.",
  },
];

export default function ChurchPage() {
  return (
    <>
      <PageHeader path="/about/church" />

      <Container className="grid justify-items-center gap-5 py-16 text-center lg:gap-7 lg:py-28">
        <span className="eyebrow text-brand-blue">OUR VISION</span>
        <span
          aria-hidden="true"
          className="h-10 font-en text-[100px] leading-[0.5] font-black text-brand-yellow lg:h-16 lg:text-[160px]"
        >
          &ldquo;
        </span>
        <h2 className="text-[40px] leading-tight font-black tracking-[-0.03em] lg:text-7xl">
          {site.slogan}
        </h2>
        <div className="h-[3px] w-9 bg-ink lg:w-12" />
        <p className="text-[17px] font-bold lg:text-[22px]">
          모든 곳에서 예수 그리스도가 나타나게 하라.
        </p>
        <p className="max-w-[44ch] text-[15px] leading-[1.75] text-sub lg:text-[17px]">
          한 사람의 회복에서 시작된 복음의 빛이, 가정과 공동체를 지나 도시에
          이르기까지 흘러가기를 소망합니다.
        </p>
      </Container>

      <section className="bg-brand-blue text-white">
        <Container className="grid gap-8 py-14 lg:gap-14 lg:py-24">
          <div className="flex flex-col-reverse gap-1.5 lg:flex-row lg:items-baseline lg:justify-between">
            <h2 className="text-2xl font-black lg:text-[32px]">
              빛이 들어가, 빛으로 세운다
            </h2>
            <span className="eyebrow text-brand-yellow">VISION PATH</span>
          </div>
          {/* 모바일: 왼쪽 세로 타임라인 / 데스크톱: 가로 타임라인 */}
          <ol className="relative grid gap-8 pl-11 before:absolute before:top-2 before:bottom-2 before:left-[11px] before:w-0.5 before:bg-white/35 lg:grid-cols-4 lg:pl-0 lg:before:top-[11px] lg:before:right-0 lg:before:bottom-auto lg:before:left-0 lg:before:h-0.5 lg:before:w-auto">
            {visionPath.map((p) => (
              <li key={p.step} className="relative grid content-start gap-1.5 lg:gap-3.5">
                <span className="absolute top-1 -left-11 size-6 rounded-full bg-brand-yellow shadow-[0_0_0_6px_var(--color-brand-blue)] lg:static" />
                <div className="flex items-baseline gap-2.5 lg:flex-col lg:items-start lg:gap-3.5">
                  <span className="font-en text-[28px] leading-none font-extrabold text-brand-yellow lg:text-[44px]">
                    {p.step}
                  </span>
                  <h3 className="text-lg font-bold lg:text-[22px]">{p.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-white/85 lg:text-[15px]">
                  {p.text}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section>
        <Container className="grid gap-8 py-14 lg:py-24">
          <div className="grid gap-2">
            <span className="eyebrow text-brand-blue">CORE VALUES</span>
            <h2 className="text-2xl font-black tracking-tight lg:text-4xl">
              핵심가치
            </h2>
            <p className="text-sub">
              건강한 교회의 DNA. 오직 성경, 오직 그리스도.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-3 lg:gap-5">
            {values.map((v) => (
              <article
                key={v.en}
                className="grid content-start gap-2 rounded-[22px] bg-white shadow-card p-6 lg:p-7"
              >
                <span className="eyebrow text-brand-blue">{v.en}</span>
                <h3 className="text-xl font-bold">{v.title}</h3>
                <span className="text-xs font-medium text-sub">{v.verse}</span>
                <p className="text-sm leading-relaxed text-sub">{v.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
