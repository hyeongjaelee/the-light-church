import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Container } from "@/components/ui";
import { getDepartments, getWorshipTimes } from "@/lib/data";
import { koTime } from "@/lib/format";
import { MENU } from "@/lib/site";

export const metadata: Metadata = { title: "예배안내" };
export const revalidate = 300;

export default async function WorshipPage() {
  const [times, departments] = await Promise.all([getWorshipTimes(), getDepartments()]);
  const worship = times.filter((t) => t.kind === "worship");

  return (
    <>
      <PageHeader section={MENU[0]} title="예배안내" description="모든 예배는 누구에게나 열려 있습니다. 처음 오신 분도 편하게 함께해 주세요." />
      <Container className="grid gap-12 py-10 lg:gap-20 lg:py-20">
        <section className="grid gap-4">
          <h2 className="font-en text-2xl font-extrabold lg:text-4xl">
            Worship<small className="ml-2 font-sans text-sm font-medium text-sub lg:text-base">예배</small>
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {worship.map((t) => (
              <article key={t.id} className={`grid gap-1 rounded-[22px] p-6 ${t.highlight ? "bg-navy text-cream" : "bg-white shadow-card"}`}>
                <h3 className="text-lg font-bold">{t.name}</h3>
                <span className={`font-en text-4xl font-bold tabular-nums ${t.highlight ? "" : "text-navy"}`}>{t.time}</span>
                <span className={`text-sm ${t.highlight ? "text-cream/65" : "text-sub"}`}>
                  {t.day_label} {koTime(t.time)} · {t.place}
                </span>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-4">
          <h2 className="font-en text-2xl font-extrabold lg:text-4xl">
            New Generation<small className="ml-2 font-sans text-sm font-medium text-sub lg:text-base">다음세대</small>
          </h2>
          <div className="overflow-x-auto rounded-[22px] bg-white shadow-card">
            <table className="w-full min-w-[480px] text-left text-sm lg:text-base">
              <thead className="text-xs text-sub">
                <tr className="border-b border-line">
                  <th className="px-5 py-3 font-bold">부서</th>
                  <th className="px-5 py-3 font-bold">대상</th>
                  <th className="px-5 py-3 font-bold">시간</th>
                  <th className="px-5 py-3 font-bold">장소</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((d) => (
                  <tr key={d.slug} className="border-b border-line last:border-0">
                    <td className="px-5 py-4 font-bold">{d.name}</td>
                    <td className="px-5 py-4 text-sub">{d.age_range}</td>
                    <td className="px-5 py-4 tabular-nums">{d.time_label}</td>
                    <td className="px-5 py-4 text-sub">{d.place}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </Container>
    </>
  );
}
