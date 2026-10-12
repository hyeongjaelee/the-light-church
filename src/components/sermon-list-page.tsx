import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Container } from "@/components/ui";
import { getSermons } from "@/lib/data";
import { dotDate, youtubeThumb } from "@/lib/format";
import { SERMON_CATEGORIES, type SermonCategory } from "@/lib/types";

export async function SermonListPage({
  category,
}: {
  category: SermonCategory;
}) {
  const sermons = await getSermons(category, 48);
  const { ko, href } = SERMON_CATEGORIES[category];

  return (
    <>
      <PageHeader path={href} />
      <Container className="py-10 lg:py-20">
        {sermons.length === 0 ? (
          <p className="p-10 text-center text-sub">
            아직 등록된 {ko} 영상이 없습니다.
          </p>
        ) : (
          <ul className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-12">
            {sermons.map((s) => (
              <li key={s.id}>
                <Link href={`/sermons/${s.id}`} className="group grid gap-3">
                  {/* 가장자리에 테두리처럼 비치는 것 방지: 바탕색은 두지 않고(둥근 모서리에 1px 비침),
                      유튜브 4:3 썸네일의 위아래 검은 띠가 남지 않도록 살짝 확대해 둠 */}
                  <div className="relative overflow-hidden rounded-[18px] shadow-[0_2px_6px_rgb(22_38_74/0.12),0_16px_32px_-16px_rgb(22_38_74/0.5)] transition-shadow duration-500 group-hover:shadow-[0_4px_10px_rgb(22_38_74/0.16),0_24px_44px_-18px_rgb(22_38_74/0.65)]">
                    <Image
                      src={youtubeThumb(s.youtube_id)}
                      alt=""
                      width={480}
                      height={360}
                      className="block aspect-video w-full scale-[1.02] object-cover transition duration-500 group-hover:scale-[1.05]"
                    />
                    <span className="absolute top-1/2 left-1/2 grid size-12 -translate-1/2 place-items-center rounded-full bg-brand-yellow opacity-90 transition group-hover:opacity-100">
                      <span className="ml-1 border-y-[9px] border-l-[14px] border-y-transparent border-l-navy" />
                    </span>
                  </div>
                  <div className="grid gap-0.5">
                    <small className="text-xs text-sub tabular-nums">
                      {dotDate(s.preached_on)}
                    </small>
                    <b className="text-[17px] leading-snug tracking-tight group-hover:text-brand-blue">
                      {s.title}
                    </b>
                    {(s.scripture || s.preacher) && (
                      <small className="text-[13px] text-sub">
                        {[s.scripture, s.preacher].filter(Boolean).join(" · ")}
                      </small>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
