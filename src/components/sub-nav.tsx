"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SubNav({ items }: { items: { label: string; href: string }[] }) {
  const pathname = usePathname();
  return (
    <nav aria-label="하위 메뉴" className="no-scrollbar -mx-5 mt-3 flex gap-1.5 overflow-x-auto px-5 lg:mx-0 lg:mt-5 lg:gap-2 lg:px-0">
      {items.map((s) => {
        const active = pathname === s.href;
        return (
          <Link
            key={s.href}
            href={s.href}
            aria-current={active ? "page" : undefined}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-[13px] lg:px-5 lg:py-2 lg:text-sm ${
              active ? "bg-navy text-cream" : "bg-white text-sub ring-1 ring-line hover:text-ink"
            }`}
          >
            {s.label}
          </Link>
        );
      })}
    </nav>
  );
}
