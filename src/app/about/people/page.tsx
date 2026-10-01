import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { Container, PhotoPlaceholder } from "@/components/ui";
import { getStaff } from "@/lib/data";
import { MENU } from "@/lib/site";

export const metadata: Metadata = { title: "섬기는이들" };
export const revalidate = 300;

export default async function PeoplePage() {
  const staff = await getStaff();
  return (
    <>
      <PageHeader section={MENU[0]} title="섬기는이들" description="빛으로교회를 함께 섬기는 분들을 소개합니다." />
      <Container className="grid grid-cols-2 gap-3 py-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6 lg:py-20">
        {staff.map((p) => (
          <article key={p.id} className="overflow-hidden rounded-[22px] bg-white shadow-card">
            {p.photo_url ? (
              <Image src={p.photo_url} alt={`${p.role} ${p.name}`} width={600} height={750} className="aspect-[4/5] object-cover" />
            ) : (
              <PhotoPlaceholder label="사진" className="aspect-[4/5]" />
            )}
            <div className="grid gap-0.5 p-4 lg:p-5">
              <small className="text-xs font-bold text-brand-blue lg:text-sm">{p.role}</small>
              <b className="text-base lg:text-lg">{p.name}</b>
              {p.bio && <p className="mt-1 text-xs text-sub lg:text-sm">{p.bio}</p>}
            </div>
          </article>
        ))}
      </Container>
    </>
  );
}
