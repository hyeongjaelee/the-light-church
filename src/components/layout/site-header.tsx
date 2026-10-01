"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { Logo } from "@/components/brand";
import { MENU, sectionOf } from "@/lib/site";
import { MenuDrawer } from "./menu-drawer";

export function SiteHeader({ times }: { times: string[] }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const current = sectionOf(usePathname());

  return (
    <>
      <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur-md lg:border-b lg:border-line">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-3 lg:px-11 lg:py-5">
          <Link href="/" aria-label="빛으로교회 홈">
            <Logo className="h-[34px] lg:h-[42px]" />
          </Link>

          {/* PC: 가로 메뉴 + 드롭다운 */}
          <nav aria-label="주 메뉴" className="hidden lg:block">
            <ul className="flex gap-1.5">
              {MENU.map((m) => (
                <li key={m.en} className="group relative">
                  <Link
                    href={m.href}
                    aria-current={current?.en === m.en ? "true" : undefined}
                    className="flex items-baseline gap-1.5 rounded-full px-4 py-2.5 transition group-hover:bg-white group-hover:ring-1 group-hover:ring-line aria-[current]:text-brand-blue"
                  >
                    <span className="font-en text-[15px] font-bold tracking-wide">
                      {m.short ? (
                        <>
                          <span className="xl:hidden">{m.short}</span>
                          <span className="hidden xl:inline">{m.en}</span>
                        </>
                      ) : (
                        m.en
                      )}
                    </span>
                    <span className="text-xs text-sub">{m.ko}</span>
                  </Link>
                  <div className="invisible absolute top-full left-0 pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <ul className="grid min-w-[180px] rounded-[18px] bg-white p-2 shadow-[0_20px_40px_-20px_rgb(22_38_74/0.35),0_0_0_1px_var(--color-line)]">
                      {m.sub.map((s) => (
                        <li key={s.href}>
                          <Link href={s.href} className="block rounded-xl px-3.5 py-2.5 text-sm hover:bg-cream">
                            {s.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/newfamily"
              className="rounded-full bg-brand-yellow px-3.5 py-2.5 font-en text-xs font-bold tracking-wide text-navy lg:px-5 lg:py-3 lg:text-sm"
            >
              NEW FAMILY?
            </Link>
            {/* 모바일: 원형 버거 → 커튼 메뉴 */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="메뉴 열기"
              aria-expanded={open}
              aria-controls="site-menu"
              className="burger lg:hidden"
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      <MenuDrawer open={open} onClose={close} times={times} />
    </>
  );
}
