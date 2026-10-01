import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { Container, PhotoPlaceholder } from "@/components/ui";
import { getDepartment } from "@/lib/data";
import { MENU } from "@/lib/site";
import type { DepartmentSlug } from "@/lib/types";

const SLUGS: DepartmentSlug[] = ["infant", "elementary", "youth"];

export const revalidate = 300;
export const dynamicParams = false;

export function generateStaticParams() {
  return SLUGS.map((dept) => ({ dept }));
}

export async function generateMetadata({ params }: PageProps<"/school/[dept]">): Promise<Metadata> {
  const { dept } = await params;
  const d = await getDepartment(dept as DepartmentSlug);
  return d ? { title: d.name, description: d.intro } : {};
}

export default async function DepartmentPage({ params }: PageProps<"/school/[dept]">) {
  const { dept } = await params;
  const d = await getDepartment(dept as DepartmentSlug);
  if (!d) notFound();

  const info = [
    { label: "대상", value: d.age_range },
    { label: "시간", value: d.time_label },
    { label: "장소", value: d.place },
  ].filter((i) => i.value);

  return (
    <>
      <PageHeader section={MENU[2]} title={d.name} />
      <Container className="grid gap-8 py-10 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-20">
        {d.photo_url ? (
          <Image src={d.photo_url} alt={`${d.name} 사진`} width={1200} height={900} className="aspect-[4/3] rounded-[22px] object-cover" />
        ) : (
          <PhotoPlaceholder label={`${d.name} 사진`} className="aspect-[4/3] rounded-[22px]" />
        )}
        <div className="grid gap-5">
          <span className="eyebrow text-brand-blue">{d.name_en}</span>
          <h2 className="text-2xl leading-snug font-black tracking-tight lg:text-4xl">{d.intro}</h2>
          <dl className="grid gap-3 rounded-[22px] bg-white p-5 shadow-card lg:p-6">
            {info.map((i) => (
              <div key={i.label} className="flex justify-between gap-4 border-line not-first:border-t not-first:pt-3">
                <dt className="text-sm text-sub">{i.label}</dt>
                <dd className="font-bold">{i.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </>
  );
}
