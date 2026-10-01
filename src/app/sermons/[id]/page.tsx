import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui";
import { YouTubePlayer } from "@/components/youtube-player";
import { getSermon, getSermons } from "@/lib/data";
import { dotDate, youtubeThumb, youtubeUrl } from "@/lib/format";
import { SERMON_CATEGORIES } from "@/lib/types";

export const revalidate = 60;

export async function generateStaticParams() {
  const sermons = await getSermons(undefined, 500);
  return sermons.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: PageProps<"/sermons/[id]">): Promise<Metadata> {
  const { id } = await params;
  const sermon = await getSermon(id);
  if (!sermon) return {};
  return {
    title: sermon.title,
    description: [sermon.scripture, sermon.preacher, dotDate(sermon.preached_on)].filter(Boolean).join(" · "),
    openGraph: { images: [youtubeThumb(sermon.youtube_id, "maxres")] },
  };
}

export default async function SermonPage({ params }: PageProps<"/sermons/[id]">) {
  const { id } = await params;
  const sermon = await getSermon(id);
  if (!sermon) notFound();
  const cat = SERMON_CATEGORIES[sermon.category];

  return (
    <Container className="grid max-w-[1100px] gap-6 py-6 lg:gap-10 lg:py-14">
      <Link href={`/sermons/${sermon.category}`} className="w-fit text-sm text-sub hover:text-ink">
        ← {cat.ko} 목록
      </Link>
      <div className="grid gap-2">
        <span className="eyebrow text-brand-blue">
          {cat.en} · {dotDate(sermon.preached_on)}
        </span>
        <h1 className="text-[28px] leading-tight font-black tracking-[-0.03em] lg:text-[44px]">{sermon.title}</h1>
        {(sermon.scripture || sermon.preacher) && (
          <p className="text-sub lg:text-lg">{[sermon.scripture, sermon.preacher].filter(Boolean).join(" · ")}</p>
        )}
      </div>
      <YouTubePlayer videoId={sermon.youtube_id} title={sermon.title} className="rounded-[18px] lg:rounded-[22px]" />
      {sermon.summary && <p className="max-w-[65ch] leading-relaxed whitespace-pre-line text-ink/85 lg:text-lg">{sermon.summary}</p>}
      <a href={youtubeUrl(sermon.youtube_id)} target="_blank" rel="noopener noreferrer" className="w-fit text-sm font-bold text-navy">
        유튜브에서 보기 →
      </a>
    </Container>
  );
}
