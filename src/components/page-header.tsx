import { Container } from "@/components/ui";
import type { MenuItem } from "@/lib/site";
import { SubNav } from "./sub-nav";

// 서브 페이지 상단: 영문 섹션명 + 한글 제목 + 같은 섹션의 다른 페이지 탭
export function PageHeader({
  section,
  title,
  description,
}: {
  section: MenuItem;
  title: string;
  description?: string;
}) {
  return (
    <div className="border-b border-line">
      <Container className="grid gap-1 pt-2 pb-5 lg:gap-2 lg:pt-10 lg:pb-10">
        <span className="eyebrow text-[11px] text-brand-blue lg:text-[13px]">{section.en}</span>
        <h1 className="text-[30px] font-black tracking-[-0.02em] lg:text-5xl">{title}</h1>
        {description && <p className="mt-1 max-w-[60ch] text-sm text-sub lg:text-base">{description}</p>}
        {section.sub.length > 1 && <SubNav items={section.sub} />}
      </Container>
    </div>
  );
}
