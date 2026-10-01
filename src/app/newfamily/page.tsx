import type { Metadata } from "next";
import { NewFamilyForm } from "@/components/new-family-form";
import { Container } from "@/components/ui";
import { fullAddress, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "새가족 등록",
  description: `${site.name}와 함께 믿음의 여정을 걸어가요. 온라인으로 새가족 등록을 신청하세요.`,
};

// [대괄호] 단계는 교회의 실제 새가족 과정으로 바꿔주세요.
const steps = [
  { no: "01", title: "등록 신청", text: "아래 신청서를 작성하시거나 예배 후 안내 데스크에서 등록 카드를 써 주세요." },
  { no: "02", title: "환영 연락", text: "새가족 담당자가 연락드려 교회 생활을 안내해 드립니다." },
  { no: "03", title: "새가족 모임", text: "[예시] 4주 동안 새가족 모임에서 교회와 신앙을 함께 알아갑니다." },
];

export default function NewFamilyPage() {
  return (
    <div className="pb-16 lg:pb-28">
      <Container className="grid gap-10 pt-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 lg:pt-16">
        <aside className="grid content-start gap-8 lg:sticky lg:top-32 lg:self-start">
          <div className="grid gap-4">
            <span className="eyebrow text-brand-blue">NEW FAMILY?</span>
            <h1 className="text-[32px] leading-[1.25] font-black tracking-[-0.03em] lg:text-5xl">
              {site.name}에
              <br />
              오신 것을 <span className="text-brand-blue">환영합니다</span>
            </h1>
            <p className="max-w-[40ch] leading-relaxed text-sub lg:text-lg">
              처음 오신 분도, 다시 신앙을 시작하시는 분도 괜찮아요. {site.name}는 여러분과 함께 믿음의 여정을 걸어가길 원합니다.
            </p>
          </div>

          <ol className="grid gap-3">
            {steps.map((s) => (
              <li key={s.no} className="flex gap-4 rounded-[20px] bg-white p-5 shadow-card">
                <span className="font-en text-2xl leading-none font-extrabold text-brand-yellow">{s.no}</span>
                <div className="grid gap-1">
                  <b className="text-base">{s.title}</b>
                  <p className="text-sm leading-relaxed text-sub">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <dl className="grid gap-1 rounded-[20px] bg-navy p-5 text-sm text-cream/75">
            <dt className="eyebrow text-brand-yellow">문의</dt>
            <dd>
              {site.phone} · {site.email}
            </dd>
            <dd>{fullAddress}</dd>
          </dl>
        </aside>

        <NewFamilyForm />
      </Container>
    </div>
  );
}
