import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { Container, PhotoPlaceholder } from "@/components/ui";
import { getStaff } from "@/lib/data";

export const metadata: Metadata = { title: "섬기는이들" };
export const revalidate = 300;

export default async function PeoplePage() {
  const staff = await getStaff();
  return (
    <>
      <PageHeader
        path="/about/people"
        description="빛으로교회를 함께 섬기는 분들을 소개합니다."
      />
      <Container className="grid grid-cols-2 gap-3 py-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6 lg:py-20">
        {staff.map((p) => (
          <article
            key={p.id}
            className="overflow-hidden rounded-[22px] bg-white shadow-card"
          >
            {p.photo_url ? (
              <Image
                src={p.photo_url}
                alt={`${p.role} ${p.name}`}
                width={600}
                height={750}
                className="aspect-[4/5] object-cover"
              />
            ) : (
              <PhotoPlaceholder label="사진" className="aspect-[4/5]" />
            )}
            <div className="grid content-start gap-2.5 p-4 lg:gap-3 lg:p-5">
              <div className="grid gap-0.5">
                <small className="text-xs font-bold text-brand-blue lg:text-sm">
                  {p.role}
                </small>
                <b className="text-lg tracking-tight lg:text-xl">{p.name}</b>
              </div>
              {/* 담당: "목회비서, 청년 양육" 처럼 쉼표+공백으로 구분 ("1,2부" 같은 쉼표는 그대로 둠) */}
              {p.duty && (
                <ul aria-label="담당" className="flex flex-wrap gap-1">
                  {p.duty.split(", ").map((d) => (
                    <li
                      key={d}
                      className="rounded-full bg-cream px-2.5 py-1 text-[11px] font-semibold text-navy ring-1 ring-line lg:text-xs"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}
      </Container>
    </>
  );
}
