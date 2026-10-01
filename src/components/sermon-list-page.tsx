import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Container } from "@/components/ui";
import { getSermons } from "@/lib/data";
import { dotDate, youtubeThumb } from "@/lib/format";
import { MENU } from "@/lib/site";
import { SERMON_CATEGORIES, type SermonCategory } from "@/lib/types";

export async function SermonListPage({ category }: { category: SermonCategory }) {
  const sermons = await getSermons(category, 48);
  const { ko } = SERMON_CATEGORIES[category];

  return (
    <>
      <PageHeader section={MENU[1]} title={ko} />
      <Container className="py-10 lg:py-20">
        {sermons.length === 0 ? (
          <p className="rounded-[22px] bg-white p-10 text-center text-sub shadow-card">아직 등록된 {ko} 영상이 없습니다.</p>
        ) : (
          <ul className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-12">
            {sermons.map((s) => (
              <li key={s.id}>
                <Link href={`/sermons/${s.id}`} className="group grid gap-3">
                  <div className="relative overflow-hidden rounded-[18px] bg-navy">
                    <Image
                      src={youtubeThumb(s.youtube_id)}
                      alt=""
                      width={480}
                      height={360}
                      className="aspect-video object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="absolute top-1/2 left-1/2 grid size-12 -translate-1/2 place-items-center rounded-full bg-brand-yellow opacity-90 transition group-hover:opacity-100">
                      <span className="ml-1 border-y-[9px] border-l-[14px] border-y-transparent border-l-navy" />
                    </span>
                  </div>
                  <div className="grid gap-0.5">
                    <small className="text-xs text-sub tabular-nums">{dotDate(s.preached_on)}</small>
                    <b className="text-[17px] leading-snug tracking-tight group-hover:text-brand-blue">{s.title}</b>
                    {(s.scripture || s.preacher) && (
                      <small className="text-[13px] text-sub">{[s.scripture, s.preacher].filter(Boolean).join(" · ")}</small>
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
