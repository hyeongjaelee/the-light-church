"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand";
import { SocialLinks } from "@/components/social-links";
import { fullAddress, MENU } from "@/lib/site";

export function MenuDrawer({ open, onClose, times }: { open: boolean; onClose: () => void; times: string[] }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <nav
      id="site-menu"
      className="drawer"
      data-open={open}
      aria-label="전체 메뉴"
      aria-hidden={!open}
      inert={!open}
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-4 pt-3 pb-6 lg:px-11 lg:pt-6 lg:pb-10">
        <div className="flex items-center justify-between">
          <Link href="/" onClick={onClose} aria-label="빛으로교회 홈">
            <Logo dark className="h-[34px] lg:h-[42px]" />
          </Link>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="메뉴 닫기"
            className="relative size-[42px] rounded-full bg-cream lg:size-[46px]"
          >
            <span className="absolute top-1/2 left-1/2 h-0.5 w-4 -translate-1/2 rotate-45 rounded bg-navy" />
            <span className="absolute top-1/2 left-1/2 h-0.5 w-4 -translate-1/2 -rotate-45 rounded bg-navy" />
          </button>
        </div>

        <ul className="no-scrollbar flex flex-1 flex-col justify-end gap-1.5 overflow-y-auto py-6 lg:gap-2.5">
          {MENU.map((m, i) => {
            const isOpen = expanded === i;
            return (
              <li key={m.en} className="d-item" data-expanded={isOpen} style={{ "--i": i } as React.CSSProperties}>
                <button
                  type="button"
                  className="d-row flex w-full items-center justify-between gap-2.5 rounded-full py-2.5 pr-2 pl-5.5 text-left lg:py-4 lg:pr-4 lg:pl-10"
                  aria-expanded={isOpen}
                  onClick={() => setExpanded(isOpen ? null : i)}
                >
                  <span className="flex items-baseline gap-2 lg:gap-4">
                    <span className="d-en font-en text-4xl leading-none font-extrabold tracking-tight lg:text-[76px]">
                      {m.short ?? m.en}
                    </span>
                    <span className="text-xs font-medium opacity-60 lg:text-[17px]">{m.ko}</span>
                  </span>
                  <span
                    className="d-arrow grid size-9 flex-none place-items-center rounded-full bg-brand-yellow font-bold text-navy lg:size-[62px] lg:text-2xl"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </button>
                <div className="d-sub">
                  <div>
                    <ul className="flex flex-wrap gap-1.5 px-5.5 pt-2 pb-1.5 lg:gap-2 lg:px-10 lg:pt-3.5">
                      {m.sub.map((s) => (
                        <li key={s.href}>
                          <Link
                            href={s.href}
                            onClick={onClose}
                            className="block rounded-full px-3.5 py-2 text-[13px] ring-1 ring-cream/25 transition hover:bg-cream/10 lg:px-5 lg:py-2.5 lg:text-[15px]"
                          >
                            {s.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="d-foot flex items-end justify-between gap-3 border-t border-cream/15 px-2 pt-4 text-[11px] lg:pt-5 lg:text-sm">
          <div className="grid min-w-0 text-cream/70">
            {times.map((t, i) =>
              i === 0 ? (
                <b key={t} className="text-xs text-brand-yellow lg:text-base">
                  {t}
                </b>
              ) : (
                <span key={t}>{t}</span>
              ),
            )}
            <span>{fullAddress}</span>
          </div>
          <SocialLinks size="sm" />
        </div>
      </div>
    </nav>
  );
}
