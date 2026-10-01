import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Paper } from "@/components/brand";
import { btn, Container } from "@/components/ui";
import { getBulletin, getBulletins } from "@/lib/data";
import { koDate } from "@/lib/format";

export const revalidate = 60;

export async function generateStaticParams() {
  const bulletins = await getBulletins(undefined, 500);
  return bulletins.map((b) => ({ id: b.id }));
}

export async function generateMetadata({ params }: PageProps<"/news/bulletin/[id]">): Promise<Metadata> {
  const { id } = await params;
  const b = await getBulletin(id);
  if (!b) return {};
  return {
    title: `${koDate(b.sunday_date)} 주보`,
    openGraph: b.cover_url ? { images: [b.cover_url] } : undefined,
  };
}

export default async function BulletinPage({ params }: PageProps<"/news/bulletin/[id]">) {
  const { id } = await params;
  const b = await getBulletin(id);
  if (!b) notFound();

  return (
    <Container className="grid max-w-[820px] gap-6 py-6 lg:gap-8 lg:py-14">
      <Link href="/news/bulletin" className="w-fit text-sm text-sub hover:text-ink">
        ← 주보 목록
      </Link>
      <div className="grid gap-1.5">
        <span className="eyebrow text-brand-blue">BULLETIN</span>
        <h1 className="text-[28px] font-black tracking-[-0.03em] lg:text-4xl">{koDate(b.sunday_date)} 주보</h1>
        <p className="text-sub">{b.title}</p>
      </div>

      {b.images.length > 0 ? (
        <div className="grid gap-3">
          {b.images.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`${koDate(b.sunday_date)} 주보 ${i + 1}쪽`}
              width={1200}
              height={1600}
              sizes="(min-width: 860px) 820px, 100vw"
              className="h-auto w-full rounded-xl bg-white shadow-card"
              priority={i === 0}
            />
          ))}
        </div>
      ) : (
        <div className="grid justify-items-center gap-4 rounded-[22px] bg-white px-6 py-12 text-center shadow-card">
          <Paper className="w-32" />
          <p className="text-sub">주보 이미지가 업로드되면 이곳에 표시됩니다.</p>
        </div>
      )}

      {b.pdf_url && (
        <a href={b.pdf_url} target="_blank" rel="noopener noreferrer" className={`${btn.primary} ${btn.size} w-fit`}>
          PDF로 보기
        </a>
      )}
    </Container>
  );
}
