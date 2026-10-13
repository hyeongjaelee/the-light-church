import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { SproutIcon, TreeIcon } from "@/components/icons";
import { Container } from "@/components/ui";
import { journey, lumenSteps } from "@/lib/planting";
import { site } from "@/lib/site";
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

      {/* 담임목사 인사말 */}
      <section>
        <Container className="grid max-w-[880px] gap-6 py-16 lg:gap-8 lg:py-28">
          <Heading eyebrow="GREETING" title="담임목사 인사말" />
          <h3 className="text-[26px] leading-snug font-black tracking-[-0.03em] lg:text-[30px]">
            빛이 들어가면,{" "}
            <span className="bg-linear-to-t from-brand-yellow/60 from-35% to-transparent to-35%">
              어둠은 물러갑니다
            </span>
          </h3>
          <div className="grid gap-5 text-[16px] leading-[1.9] text-ink/85 lg:text-lg">
            <p>
              하나님은 창세기 처음부터 어둠 속에 &ldquo;빛이 있으라&rdquo;
              말씀하셨습니다.
              <br />그 하나님이 지금 위례에 또 하나의 빛을 두고자 하십니다.
              <br />
              금광교회의 아홉번째 분립개척 교회로 복음의 큰 숲을 이루기 위하여
              위례에 세워집니다.
            </p>
            <p>빛으로교회는 한 사람의 목회 계획에서 시작된 교회가 아닙니다.</p>
            <p>
              주님께서 복음으로 하시는 일에 우리가 부름받았습니다.
              <br />
              교회의 주인도, 세우시는 분도 주님이십니다.
              <br />
              우리는 빛의 근원이 아닙니다. 다만 그분의 빛이 닿는 자리가 되기를
              구합니다.
              <br />
              그래서 우리가 드러나는 교회가 아니라, 우리를 통해 빛되신 예수
              그리스도가 드러나는 교회를 꿈꿉니다.
              <br />이 도시에서 하나님의 세상에 빛을, 생명을, 사랑을 비추는 일에
              당신을 초대합니다.
            </p>
          </div>
          <p className="font-bold">— 빛으로교회 담임목사 {site.pastor}</p>
        </Container>
      </section>

      {/* 창립까지의 여정 */}
      <section className="border-y border-line bg-white">
        <Container className="grid max-w-[880px] gap-8 py-16 lg:gap-10 lg:py-28">
          <Heading eyebrow="JOURNEY" title="창립까지의 여정" />
          <ol className="relative grid gap-5 pl-8 before:absolute before:top-2 before:bottom-2 before:left-[7px] before:w-0.5 before:bg-linear-to-b before:from-brand-yellow before:to-brand-blue lg:gap-6">
            {journey.map((j) => (
              <li
                key={j.when + j.what}
                className="relative grid gap-0.5 lg:grid-cols-[260px_1fr] lg:gap-6"
              >
                <span
                  aria-hidden
                  className={`absolute top-1.5 -left-8 size-4 rounded-full border-[3px] border-white ${
                    j.highlight
                      ? "bg-brand-yellow ring-2 ring-brand-yellow"
                      : "bg-brand-blue ring-2 ring-brand-blue/40"
                  }`}
                />
                <span
                  className={`text-sm font-bold tabular-nums lg:text-base ${j.highlight ? "text-brand-yellow" : "text-brand-blue"}`}
                >
                  {j.when}
                </span>
                <span
                  className={
                    j.highlight
                      ? "text-lg font-black lg:text-xl"
                      : "text-[15px] lg:text-base"
                  }
                >
                  {j.what}
                </span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* OUR HEART */}
      <section className="bg-navy text-cream">
        <Container className="grid max-w-[880px] justify-items-center gap-6 py-16 text-center lg:gap-8 lg:py-28">
          <span className="eyebrow text-brand-yellow">OUR HEART</span>
          <h2 className="text-[26px] leading-snug font-black tracking-[-0.03em] lg:text-[40px]">
            우리를 통해{" "}
            <span className="text-brand-yellow">주님이 드러나는</span> 교회
          </h2>
          <div className="grid gap-2 text-[15px] leading-[1.9] text-cream/80 lg:text-lg">
            <p>
              빛으로교회는 예수를 드러내는 곳입니다.
              <br />
              성도들을 통해, 예배를 통해, 우리의 교제를 통해 예수만 드러냅니다.
            </p>
            <p>
              세상은 예수님을 보이라 합니다.
              <br />
              그러나 예수님은 보이지 않으나 이미 우리 안에 계십니다.
            </p>
            <p>그 예수님을 드러내어 우리 모두 빛으로 나아갑니다.</p>
          </div>
        </Container>
      </section>

      {/* 빛이 닿는 자리 (LUMEN) */}
      <section>
        <Container className="grid gap-8 py-16 lg:gap-12 lg:py-28">
          <div className="grid gap-4">
            <Heading eyebrow="LUMEN" title="빛이 닿는 자리" />
            <p className="text-[15px] leading-[1.8] text-sub lg:text-lg">
              빛은 스스로를 드러내지 않고, 빛이 닿은 곳을 드러냅니다.
              <br />
              교회는 빛의 근원이 아니라 주님의 빛이 비춰지는 자리입니다.
            </p>
          </div>
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {lumenSteps.map((s, i) => (
              <li
                key={s.word}
                className="grid content-start gap-2 rounded-[22px] bg-white p-6 shadow-card lg:p-7"
              >
                <span className="font-en text-[32px] leading-none font-extrabold text-brand-yellow lg:text-[40px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-xl font-black">{s.word}</h3>
                <p className="text-[15px] leading-relaxed text-sub">{s.text}</p>
                <span className="text-xs font-bold text-brand-blue">
                  {s.ref}
                </span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* 우리가 믿는 것 */}
      <section className="border-t border-line bg-white">
        <Container className="grid max-w-[880px] gap-6 py-16 lg:gap-8 lg:py-24">
          <Heading eyebrow="WHAT WE BELIEVE" title="우리가 믿는 것" />
          <p className="rounded-[18px] border-l-4 border-brand-yellow bg-cream px-6 py-5 text-[15px] leading-[1.9] lg:px-8 lg:py-6 lg:text-lg">
            빛으로교회는 <b>대한예수교장로회(합동)</b> 소속으로, 성경이
            유일무이하고 오류가 없는 근본으로 생각하며, 말씀을 따라 살아가는
            신앙과 생활의 규범으로 믿으며, <b>웨스트민스터 신앙고백서</b>에 따른
            개혁주의 신앙을 믿음으로 고백합니다.
          </p>
        </Container>
      </section>
    </>
  );
}

// 섹션 제목: 영문 라벨 + 한글 제목
function Heading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="grid gap-2">
      <span className="eyebrow text-brand-blue">{eyebrow}</span>
      <h2 className="text-2xl font-black tracking-tight lg:text-4xl">
        {title}
      </h2>
    </div>
  );
}
