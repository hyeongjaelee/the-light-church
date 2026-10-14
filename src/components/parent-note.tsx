import { PeopleIcon } from "@/components/icons";
import { site } from "@/lib/site";

// 다음세대 부모님 안내 상자 (예배안내 · 다음세대 부서 화면)
export function ParentNote({ className = "" }: { className?: string }) {
  return (
    <div
      role="note"
      className={`flex items-start gap-3 rounded-[18px]  border-brand-yellow bg-brand-yellow/20 px-5 py-4 lg:items-center lg:gap-4 lg:px-7 lg:py-5 ${className}`}
    >
      <span
        aria-hidden
        className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-brand-yellow text-navy lg:size-11"
      >
        <PeopleIcon className="size-4 lg:size-6" />
      </span>
      <p className="text-[15px] leading-relaxed text-ink text-justify break-all lg:text-[17px]">
        <b className="mr-1.5 font-extrabold text-navy">부모님께：</b>
        {site.parentNote}
      </p>
    </div>
  );
}
