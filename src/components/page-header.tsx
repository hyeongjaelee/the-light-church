import { Container } from "@/components/ui";
import { MENU } from "@/lib/site";
import { SubNav } from "./sub-nav";

// 서브 페이지 상단: 영문 섹션명 + 한글 제목 + 같은 섹션의 다른 페이지 탭
// path 로 MENU 에서 섹션(영문명·탭)과 페이지 제목(sub 의 label)을 찾음
export function PageHeader({
  path,
  description,
}: {
  path: string;
  description?: string;
}) {
  const section = MENU.find((m) => m.sub.some((s) => s.href === path));
  const page = section?.sub.find((s) => s.href === path);
  if (!section || !page) {
    throw new Error(`PageHeader: MENU 에 없는 경로입니다 (${path}). lib/site.ts 의 MENU 에 추가해 주세요.`);
  }

  return (
    <div className="border-b border-line">
      <Container className="grid gap-1 pt-2 pb-5 lg:gap-2 lg:pt-10 lg:pb-10">
        <span className="eyebrow text-[11px] text-brand-blue lg:text-[13px]">{section.en}</span>
        <h1 className="text-[30px] font-black tracking-[-0.02em] lg:text-5xl">{page.label}</h1>
        {description && <p className="mt-1 max-w-[60ch] text-sm text-sub lg:text-base">{description}</p>}
        {section.sub.length > 1 && <SubNav items={section.sub} />}
      </Container>
    </div>
  );
}
