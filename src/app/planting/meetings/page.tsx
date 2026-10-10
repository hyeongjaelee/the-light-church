import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Container } from "@/components/ui";
import { meetings } from "@/lib/planting";
import { asset, fullAddress, site } from "@/lib/site";

export const metadata: Metadata = { title: "모임예정" };

export default function PlantingMeetingsPage() {
  const q = encodeURIComponent(site.address);
  return (
    <>
      <PageHeader
        path="/planting/meetings"
        description="개척을 함께 준비하는 비전나눔과 기도의 자리로 초대합니다."
      />

      <Container className="grid items-start gap-10 py-10 lg:grid-cols-[340px_1fr] lg:gap-16 lg:py-20">
        {/* 예배 처소 */}
        <aside className="relative overflow-hidden rounded-[22px] bg-linear-150 from-navy to-brand-blue p-7 text-white lg:sticky lg:top-28">
          <span className="eyebrow text-brand-yellow">예배 처소 확정</span>
          <h2 className="mt-2 text-[22px] font-extrabold">
            위례 {site.addressDetail}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-white/75">
            {fullAddress}
          </p>
          <span className="mt-4 inline-block rounded-full bg-brand-yellow px-4 py-[7px] text-sm font-extrabold text-navy">
            2027년 1월 개척 예배
          </span>
          <div className="relative mt-5 flex gap-2">
            <a
              href={`https://map.naver.com/p/search/${q}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-4 py-2 text-[13px] font-bold ring-1 ring-white/40 hover:bg-white/10"
            >
              네이버 지도
            </a>
            <a
              href={`https://map.kakao.com/?q=${q}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-4 py-2 text-[13px] font-bold ring-1 ring-white/40 hover:bg-white/10"
            >
              카카오맵
            </a>
          </div>
        </aside>

        {/* 일정 타임라인 */}
        <div>
          <ol className="relative grid gap-4 pl-8 before:absolute before:top-2 before:bottom-2 before:left-[9px] before:w-0.5 before:bg-linear-to-b before:from-brand-yellow before:to-brand-blue lg:pl-9">
            {meetings.map((m, i) => (
              <li
                key={m.step}
                className={`relative grid gap-2 rounded-[18px] p-6 shadow-card ring-1 lg:px-7 ${
                  m.highlight
                    ? "bg-[color-mix(in_srgb,var(--color-brand-yellow)_8%,white)] ring-2 ring-brand-yellow"
                    : "bg-white ring-line"
                }`}
              >
                <span
                  aria-hidden
                  className={`absolute top-7 -left-[29px] size-3.5 rounded-full border-[3px] border-cream lg:-left-[33px] ${
                    i < 2
                      ? "bg-brand-yellow ring-2 ring-brand-yellow"
                      : "bg-brand-blue ring-2 ring-brand-blue"
                  }`}
                />
                <span className="eyebrow text-brand-blue">{m.step}</span>
                <h3 className="text-lg font-extrabold">{m.title}</h3>
                <p className="font-bold text-brand-blue">
                  {m.dates}{" "}
                  <small className="font-semibold text-sub">{m.day}</small>
                </p>
                <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-sub">
                  <span>
                    장소 <b className="text-ink">{m.place}</b>
                  </span>
                  <span>
                    시간 <b className="text-ink">{m.time}</b>
                  </span>
                </div>
                {m.speakers && (
                  <>
                    <ol
                      aria-label="강사 순서"
                      className="mt-2 grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2"
                    >
                      {m.speakers.map((s) => (
                        <li
                          key={s.date}
                          className="grid justify-items-center gap-0.5 rounded-xl bg-white px-1.5 py-2.5 text-center ring-1 ring-line"
                        >
                          <span className="font-en text-xs font-bold text-brand-blue">
                            {s.date}
                          </span>
                          <b className="text-sm font-extrabold whitespace-nowrap text-navy">
                            {s.name}
                          </b>
                          <span className="text-[11.5px] leading-tight text-sub">
                            {s.org}
                          </span>
                          <span className="mt-1 rounded-full bg-brand-blue/8 px-2.5 py-0.5 text-xs font-extrabold whitespace-nowrap text-brand-blue">
                            {s.time}
                          </span>
                        </li>
                      ))}
                    </ol>
                    <a
                      href="#prayer-video"
                      className="mt-2 inline-flex min-h-11 items-center gap-2.5 justify-self-start rounded-full bg-white py-1.5 pr-4 pl-[7px] text-sm font-extrabold text-navy ring-1 ring-brand-yellow transition hover:bg-[color-mix(in_srgb,var(--color-brand-yellow)_20%,white)] hover:shadow-[0_6px_16px_rgb(240_206_116/0.3)]"
                    >
                      <span
                        aria-hidden
                        className="grid size-6 flex-none place-items-center rounded-full bg-brand-yellow"
                      >
                        <svg
                          viewBox="0 0 10 10"
                          className="ml-0.5 size-2.5 fill-navy"
                        >
                          <path d="M1 0v10l9-5z" />
                        </svg>
                      </span>
                      강사 소개 영상 보기 ↓
                    </a>
                  </>
                )}
              </li>
            ))}
          </ol>
          <p className="mt-3 pl-8 text-[13px] text-sub lg:pl-9">
            ※ 일정은 교회 사정에 따라 변동될 수 있습니다. 자세한 안내는 주보
            광고를 참고해 주세요.
          </p>
        </div>
      </Container>

      {/* 개척 준비기도회 강사 소개 영상 */}
      <section
        id="prayer-video"
        className="scroll-mt-20 bg-linear-168 from-navy to-brand-blue text-cream"
      >
        <Container className="grid gap-8 py-14 lg:gap-10 lg:py-24">
          <div className="grid justify-items-center gap-3 text-center">
            <span className="eyebrow text-brand-yellow">VIDEO</span>
            <h2 className="text-2xl font-black tracking-tight lg:text-4xl">
              개척 준비기도회<span className="text-brand-yellow"> · </span>강사
              소개
            </h2>
            <p className="max-w-[46ch] text-sm leading-relaxed text-cream/75 lg:text-base">
              10월 17일부터 11월 14일까지 매주 토요일, 다섯 분의 목사님이 개척의
              이야기를 전합니다. 누구나 함께하실 수 있습니다.
            </p>
          </div>
          <div className="mx-auto w-full max-w-[960px] overflow-hidden rounded-[18px] bg-black shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)]">
            <video
              controls
              playsInline
              preload="metadata"
              poster={asset("/planting/video/prayer-meeting-poster.jpg")}
              width={1280}
              height={720}
              aria-label="2026 빛으로교회 개척 준비기도회 강사 소개 영상, 1분 20초"
              className="aspect-video w-full"
            >
              <source
                src={asset("/planting/video/prayer-meeting.mp4")}
                type="video/mp4"
              />
            </video>
          </div>
          <div className="mx-auto flex w-full max-w-[960px] flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <dl className="grid gap-1.5 text-sm">
              {[
                ["일시", "10.17 – 11.14 매주 토요일"],
                ["시간", "10.17·10.31 오후 4시 · 10.24·11.07·11.14 오후 2시"],
                ["장소", "금광교회 3층 글로리홀"],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-3">
                  <dt className="shrink-0 text-cream/60">{k}</dt>
                  <dd className="font-bold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="text-center text-xs leading-relaxed text-cream/50">
            Music: HISPLAN – 빛을 따라 걸어가
            <br />
            강사 사진: 각 교회 홈페이지 및 본인 제공
          </p>
        </Container>
      </section>
    </>
  );
}
