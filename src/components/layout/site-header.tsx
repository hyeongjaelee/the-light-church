"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { LogoAndWordmark } from "@/components/brand";
import { MENU, sectionOf } from "@/lib/site";
import { MenuDrawer } from "./menu-drawer";

const SCROLL_THRESHOLD = 8; // 이만큼(px) 스크롤하면 투명 헤더 → 배경 있는 헤더

export function SiteHeader({ times }: { times: string[] }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const pathname = usePathname();
  const current = sectionOf(pathname);
  const headerRef = useRef<HTMLElement>(null);
  // 투명 모드: [data-header-overlay] 영역(홈 첫 화면 영상)이 있는 페이지의 맨 위에서만 배경 없이 흰 글씨.
  // 조금이라도 스크롤하면 바로 배경이 생김
  const [overlay, setOverlay] = useState(pathname === "/");

  useEffect(() => {
    const hero = document.querySelector("[data-header-overlay]");
    const update = () =>
      setOverlay(!!hero && window.scrollY < SCROLL_THRESHOLD);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter,color] duration-500 ${
          overlay
            ? "border-transparent bg-transparent text-cream"
            : "border-line bg-cream/88 text-ink backdrop-blur-xl backdrop-saturate-150"
        }`}
      >
        <div className="mx-auto grid h-16 max-w-[1600px] grid-cols-[1fr_auto] items-center gap-5 px-5 lg:h-[72px] lg:grid-cols-[1fr_auto_1fr] lg:px-12">
          <Link
            href="/"
            aria-label="빛으로교회 홈"
            className="justify-self-start"
          >
            <LogoAndWordmark dark={overlay} className="h-[34px]" />
          </Link>

          {/* PC: 가운데 가로 메뉴 + 드롭다운 */}
          <nav aria-label="주 메뉴" className="hidden lg:block">
            <ul className="flex gap-7 xl:gap-10">
              {MENU.map((m) => (
                <li key={m.en} className="group relative">
                  <Link
                    href={m.href}
                    aria-current={current?.en === m.en ? "true" : undefined}
                    className={`relative inline-flex py-1.5 font-en text-[13px] font-semibold tracking-[0.08em] after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 group-focus-within:after:scale-x-100 group-hover:after:scale-x-100 aria-[current]:after:scale-x-100 motion-reduce:after:transition-none ${
                      overlay
                        ? "aria-[current]:text-brand-yellow"
                        : "aria-[current]:text-brand-blue"
                    }`}
                  >
                    {m.short ? (
                      <>
                        <span className="xl:hidden">{m.short}</span>
                        <span className="hidden xl:inline">{m.en}</span>
                      </>
                    ) : (
                      m.en
                    )}
                  </Link>
                  <div className="invisible absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <ul className="grid min-w-[180px] rounded-[18px] bg-white p-2 text-ink shadow-[0_20px_40px_-20px_rgb(22_38_74/0.35),0_0_0_1px_var(--color-line)]">
                      <li className="px-3.5 pt-1.5 pb-1 text-[11px] font-medium text-sub">
                        {m.ko}
                      </li>
                      {m.sub.map((s) => (
                        <li key={s.href}>
                          <Link
                            href={s.href}
                            className="block rounded-xl px-3.5 py-2.5 text-sm hover:bg-cream"
                          >
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

          <div className="flex items-center gap-2 justify-self-end">
            <Link
              href="/connect"
              className="inline-flex h-10 items-center rounded-full bg-brand-yellow px-4 font-en text-xs font-bold tracking-wide text-navy transition hover:brightness-95 lg:px-5 lg:text-[13px]"
            >
              CONNECT
            </Link>
            {/* 모바일: 원형 버거 → 커튼 메뉴. 투명 모드에서는 테두리만 있는 원 */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="메뉴 열기"
              aria-expanded={open}
              aria-controls="site-menu"
              className={`burger transition-colors duration-500 lg:hidden ${
                overlay ? "bg-transparent ring-1 ring-cream/50 ring-inset" : ""
              }`}
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
