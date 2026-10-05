import Image from "next/image";
import Link from "next/link";
import { Paper } from "@/components/brand";
import {
  btn,
  Container,
  PhotoPlaceholder,
  SectionTitle,
} from "@/components/ui";
import { SproutIcon, TreeIcon } from "@/components/icons";
import { YouTubePlayer } from "@/components/youtube-player";
import { koDate, koTime, shortDate } from "@/lib/format";
import { fullAddress, site } from "@/lib/site";
import type { Bulletin, Department, Sermon, WorshipTime } from "@/lib/types";

/* 첫 화면: 이번 주 설교 영상을 배경으로 채우고 그 위에 고정 문구를 얹음 */
export function ThisWeek({ sermon }: { sermon: Sermon | null }) {
  if (!sermon) return null;
  // data-header-overlay: 이 영역 위에서는 헤더가 투명해지고, 음수 margin 으로 헤더 밑까지 영상이 깔림
  return (
    <section
      data-header-overlay
      className="relative -mt-16 lg:-mt-[72px] min-h-[100dvh] flex items-center justify-center overflow-hidden text-white px-6 md:px-12 pt-32 pb-28 md:pt-36 md:pb-32"
    >
      <YouTubePlayer
        videoId={sermon.youtube_id}
        title={sermon.title}
        mode="background"
        cover
      />
      {/* 글씨가 읽히도록 영상을 어둡게. 아래쪽은 남색으로 이어져 다음 '빛 켜기' 영역과 자연스럽게 연결 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-navy/35 bg-linear-to-b from-navy/50 via-transparent via-60% to-navy"
      />
      <div className="relative grid justify-items-center gap-7 [text-shadow:0_2px_32px_rgb(22_38_74/0.5)] lg:gap-12">
        <h1 className="break-keep text-[60px] leading-[1.12] font-black tracking-[-0.04em] sm:text-[84px] lg:text-[112px] xl:text-[128px]">
          예수님으로
          <br className="sm:hidden" /> 가득한 교회
        </h1>
        <div className="flex flex-wrap justify-center gap-2 [text-shadow:none] lg:gap-3">
          <a
            href={site.plantingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`group gap-2 ${btn.primary} ${btn.size}`}
          >
            개척에 함께하기
            {/* 새싹 → 마우스를 올리면 나무로 자라남 */}
            <span className="relative size-[1.25em]">
              <SproutIcon className="absolute inset-0 size-full origin-bottom transition duration-300 group-hover:scale-50 group-hover:opacity-0 group-focus-visible:scale-50 group-focus-visible:opacity-0" />
              <TreeIcon className="absolute inset-0 size-full origin-bottom scale-50 opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100" />
            </span>
          </a>
          {/* TODO: 처음방문 안내 페이지가 생기면 href 연결 */}
          <a className={`${btn.outlineLight} ${btn.size} cursor-pointer`}>
            처음 방문
          </a>
        </div>
      </div>
    </section>
  );
}

/* 남색 Welcome 섹션 */
export function Welcome() {
  return (
    <section className="bg-navy px-5 py-16 text-center text-cream lg:px-11 lg:pt-[120px] lg:pb-32">
      <div className="mx-auto grid max-w-[1440px] gap-[110px]">
        <div className="grid justify-items-center gap-3.5 lg:gap-4.5">
          <span className="eyebrow text-brand-yellow">WELCOME</span>
          <h2 className="text-[30px] leading-tight font-black tracking-[-0.035em] lg:text-[52px]">
            처음 오셔도 괜찮아요
          </h2>
          <p className="mb-1.5 text-[15px] text-cream/70 lg:text-[17px]">
            {site.name}는 언제나 당신을 기다리고 있었습니다.
          </p>
          <Link
            href="/about/worship"
            className={`${btn.outlineLight} ${btn.size}`}
          >
            예배 안내 보기
          </Link>
        </div>
        <div className="hidden justify-items-center gap-4.5 lg:grid">
          <span className="eyebrow text-brand-yellow">{site.verse.ref}</span>
          <h2 className="text-[52px] leading-tight font-black tracking-[-0.035em]">
            너희는 세상의 <span className="text-brand-yellow">빛</span>이라
          </h2>
          <p className="mb-1.5 text-[17px] text-cream/70">{site.slogan}</p>
          <Link href="/about/church" className={`${btn.yellow} ${btn.size}`}>
            교회 소개
          </Link>
        </div>
      </div>
    </section>
  );
}

const DAY_EN: Record<string, string> = {
  주일: "SUNDAY",
  수요일: "WEDNESDAY",
  금요일: "FRIDAY",
  토요일: "SATURDAY",
};

/* 예배 시간: 모바일은 리스트, 데스크톱은 카드 4개 */
export function Worship({ times }: { times: WorshipTime[] }) {
  return (
    <section>
      <Container className="grid gap-3.5 py-6.5 lg:gap-9 lg:py-[100px]">
        <SectionTitle
          en="Worship"
          ko="예배 안내"
          description="모든 예배는 누구에게나 열려 있습니다. 편한 시간에 함께해 주세요."
        />
        <div className="grid rounded-[20px] bg-white px-4 py-1 shadow-[0_1px_0_var(--color-line)] lg:hidden">
          {times.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between gap-3 border-line py-3 not-first:border-t not-first:border-dashed"
            >
              <span className="text-[13px] text-sub">{t.name}</span>
              <b className="font-en text-[15px] font-bold text-navy tabular-nums">
                <em className="mr-1 font-sans text-[11px] font-medium text-sub not-italic">
                  {t.place}
                </em>
                {t.time}
              </b>
            </div>
          ))}
        </div>
        <div className="hidden grid-cols-4 gap-5 lg:grid">
          {times.map((t) => (
            <article
              key={t.id}
              className={`flex min-h-80 flex-col gap-1 rounded-[22px] px-6.5 py-7 ${t.highlight ? "bg-navy text-cream" : "bg-white shadow-card"}`}
            >
              <span
                className={`eyebrow ${t.highlight ? "text-brand-yellow" : "text-brand-blue"}`}
              >
                {t.kind === "next-generation"
                  ? "NEXT GENERATION"
                  : (DAY_EN[t.day_label] ?? t.day_label)}
              </span>
              <h3 className="mt-2.5 text-[22px] font-bold tracking-tight">
                {t.name}
              </h3>
              <span
                className={`mt-auto font-en text-5xl leading-tight font-bold tabular-nums ${t.highlight ? "" : "text-navy"}`}
              >
                {t.time}
              </span>
              <span
                className={`mt-3.5 border-t border-dashed pt-3.5 text-sm ${t.highlight ? "border-cream/20 text-cream/65" : "border-line text-sub"}`}
              >
                {t.day_label} · {t.place} · {koTime(t.time)}
              </span>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* 담임목사 소개 */
export function Pastor() {
  return (
    <section className="bg-navy p-5 lg:p-11">
      <div className="mx-auto grid max-w-[1352px] overflow-hidden rounded-[22px] bg-cream lg:grid-cols-2">
        <PhotoPlaceholder label="담임목사 사진" className="aspect-[4/3]" />
        <div className="grid content-center gap-3.5 p-7 lg:p-14">
          <span className="eyebrow text-brand-blue">OUR PASTOR</span>
          <h2 className="text-2xl leading-snug font-black tracking-[-0.03em] lg:text-[34px]">
            함께 말씀의 빛 안에서
            <br />
            걸어가길 소망합니다
          </h2>
          <p className="max-w-[36ch] text-[15px] leading-relaxed text-sub lg:text-base">
            [담임목사 인사말이 들어갈 자리] 하나님이 당신을 위해 지으신 삶을{" "}
            {site.name}에서 함께 발견하길 바랍니다.
          </p>
          <span className="font-bold">담임목사 {site.pastor}</span>
        </div>
      </div>
    </section>
  );
}

/* 다음세대: 모바일은 작은 타일, 데스크톱은 사진 카드 */
export function NextGeneration({ departments }: { departments: Department[] }) {
  const tile = ["bg-[#fbefc9]", "bg-[#dce5f6]", "bg-navy text-cream"];
  return (
    <section className="border-t border-line">
      <Container className="grid gap-3.5 py-6.5 lg:gap-9 lg:py-[100px]">
        <div className="lg:hidden">
          <SectionTitle en="Next Generation" ko="다음세대" />
        </div>
        <div className="hidden lg:block">
          <SectionTitle
            en="Next Generation"
            ko="다음세대"
            description="다음 세대가 말씀 안에서 자라도록 함께 돕습니다."
            center
          />
        </div>
        <div className="grid grid-cols-3 gap-2 lg:hidden">
          {departments.map((d, i) => (
            <Link
              key={d.slug}
              href={`/next-generation/${d.slug}`}
              className={`grid gap-0.5 rounded-2xl px-2.5 py-3.5 ${tile[i % 3]}`}
            >
              <small className="font-en text-[10px] font-semibold tracking-[0.08em] opacity-70">
                {d.name_en}
              </small>
              <b className="text-sm">{d.name}</b>
            </Link>
          ))}
        </div>
        <div className="hidden grid-cols-3 gap-5 lg:grid">
          {departments.map((d) => (
            <article
              key={d.slug}
              className="flex flex-col overflow-hidden rounded-[22px] bg-white shadow-card"
            >
              {d.photo_url ? (
                <Image
                  src={d.photo_url}
                  alt={`${d.name} 사진`}
                  width={800}
                  height={450}
                  className="aspect-video object-cover"
                />
              ) : (
                <PhotoPlaceholder
                  label={`${d.name} 사진`}
                  className="aspect-video"
                />
              )}
              <div className="flex flex-1 flex-col gap-1.5 px-6.5 pt-6 pb-6.5">
                <small className="eyebrow text-brand-blue">{d.name_en}</small>
                <h3 className="text-[22px] font-bold tracking-tight">
                  {d.name}
                </h3>
                <p className="mb-3.5 flex-1 text-sm text-sub">{d.intro}</p>
                <Link
                  href={`/next-generation/${d.slug}`}
                  className="text-sm font-bold text-navy"
                >
                  자세히 보기 →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* 교회주보: 모바일 가로 스크롤, 데스크톱 5열 */
export function Bulletins({ bulletins }: { bulletins: Bulletin[] }) {
  return (
    <section className="border-t border-line">
      <Container className="grid gap-3.5 py-6.5 lg:gap-9 lg:py-[100px]">
        <SectionTitle
          en="Bulletin"
          ko="교회주보"
          action={{ label: "전체 보기", href: "/news/bulletin" }}
        />
        <div className="no-scrollbar -mx-5 flex gap-2.5 overflow-x-auto px-5 pt-0.5 pb-1.5 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:p-0">
          {bulletins.slice(0, 5).map((b) => (
            <Link
              key={b.id}
              href={`/news/bulletin/${b.id}`}
              className="grid w-[118px] flex-none gap-1.5 lg:w-auto"
            >
              {b.cover_url ? (
                <Image
                  src={b.cover_url}
                  alt={`${koDate(b.sunday_date)} 주보`}
                  width={400}
                  height={533}
                  className="aspect-[3/4] rounded-[10px] object-cover shadow-card"
                />
              ) : (
                <Paper />
              )}
              <b className="text-xs lg:text-[15px]">
                {koDate(b.sunday_date).slice(6)} 주보
              </b>
              <small className="-mt-1.5 text-[11px] text-sub tabular-nums lg:text-[13px]">
                {shortDate(b.sunday_date)}
              </small>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* 오시는 길 요약 */
export function Location() {
  return (
    <section className="border-t border-line">
      <Container className="grid gap-3.5 py-6.5 lg:grid-cols-[1fr_1.4fr] lg:items-center lg:gap-12 lg:py-[100px]">
        <div className="grid gap-3.5 lg:gap-5">
          <SectionTitle en="Location" ko="오시는 길" />
          <p className="text-[13px] text-sub lg:text-base">
            <b className="text-ink">{fullAddress}</b>
            <br />
            {site.parking}
          </p>
          <Link
            href="/about/location"
            className={`${btn.outline} ${btn.size} hidden w-fit lg:inline-flex`}
          >
            자세히 보기
          </Link>
        </div>
        <Link href="/about/location" aria-label="오시는 길 자세히 보기">
          <MapPlaceholder />
        </Link>
      </Container>
    </section>
  );
}

export function MapPlaceholder({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative aspect-[16/10] rounded-[18px] lg:aspect-[16/8] ${className}`}
      style={{
        background:
          "linear-gradient(90deg,transparent 47%,#fff 47%,#fff 53%,transparent 53%),linear-gradient(0deg,transparent 60%,#fff 60%,#fff 66%,transparent 66%),repeating-linear-gradient(0deg,#e9e5da 0 1px,transparent 1px 22px),repeating-linear-gradient(90deg,#e9e5da 0 1px,transparent 1px 22px),#f1eee5",
      }}
    >
      <span className="absolute top-[38%] left-1/2 size-[30px] -translate-x-1/2 -translate-y-full -rotate-45 rounded-[50%_50%_50%_0] bg-brand-blue shadow-[0_6px_12px_-4px_rgb(22_38_74/0.5)] after:absolute after:inset-[9px] after:rounded-full after:bg-brand-yellow" />
    </div>
  );
}
