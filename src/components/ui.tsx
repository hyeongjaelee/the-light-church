import Link from "next/link";

// "Worship 예배 안내" 형식의 섹션 제목
export function SectionTitle({
  en,
  ko,
  description,
  center = false,
  action,
}: {
  en: string;
  ko: string;
  description?: string;
  center?: boolean;
  action?: { label: string; href: string };
}) {
  return (
    <div className={`flex items-end justify-between gap-4 ${center ? "justify-center text-center" : ""}`}>
      <div className={`grid gap-1.5 lg:gap-2 ${center ? "justify-items-center" : ""}`}>
        <h2 className="font-en text-[22px] leading-tight font-extrabold tracking-tight lg:text-[44px]">
          {en}
          <small className="ml-1.5 font-sans text-xs font-medium tracking-normal text-sub lg:ml-3 lg:text-base">
            {ko}
          </small>
        </h2>
        {description && <p className="text-sm text-sub lg:text-base">{description}</p>}
      </div>
      {action && (
        <Link href={action.href} className="shrink-0 text-xs text-sub hover:text-ink lg:text-sm">
          {action.label} →
        </Link>
      )}
    </div>
  );
}

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1440px] px-5 lg:px-11 ${className}`}>{children}</div>;
}

const btnBase = "inline-flex items-center justify-center rounded-full font-bold transition";
export const btn = {
  primary: `${btnBase} bg-brand-blue text-white hover:bg-brand-blue/90`,
  outline: `${btnBase} text-navy ring-[1.5px] ring-navy ring-inset hover:bg-navy/5`,
  yellow: `${btnBase} bg-brand-yellow text-navy hover:brightness-95`,
  outlineLight: `${btnBase} text-cream ring-[1.5px] ring-cream/70 ring-inset hover:bg-cream/10`,
  size: "px-[18px] py-3 text-[13px] lg:px-7 lg:py-[15px] lg:text-[15px]",
};

// 사진이 아직 없을 때 쓰는 자리
export function PhotoPlaceholder({ label, className = "" }: { label: string; className?: string }) {
  return <div className={`grid place-items-center bg-paper text-sm text-sub ${className}`}>{label}</div>;
}
