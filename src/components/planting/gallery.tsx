"use client";

import { useCallback, useEffect, useState } from "react";
import { galleryGroups, photoSrc } from "@/lib/planting";

const all = galleryGroups.flatMap((g) => g.photos);
// 그룹을 넘어 이어지는 사진 번호 (라이트박스에서 전체를 넘겨 봄)
const offsets = galleryGroups.map((_, gi) =>
  galleryGroups.slice(0, gi).reduce((n, g) => n + g.photos.length, 0),
);

// 모임 사진: 모임별 썸네일 그리드 + 크게 보기(라이트박스, ← → Esc 지원)
export function Gallery() {
  const [cur, setCur] = useState<number | null>(null);
  const close = useCallback(() => setCur(null), []);
  const move = useCallback(
    (d: number) =>
      setCur((i) => (i === null ? i : (i + d + all.length) % all.length)),
    [],
  );

  useEffect(() => {
    if (cur === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") move(1);
      else if (e.key === "ArrowLeft") move(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [cur, close, move]);

  return (
    <>
      <div className="grid gap-12 lg:gap-16">
        {galleryGroups.map((g, gi) => (
          <section key={g.title} className="grid gap-4 lg:gap-6">
            <div className="grid gap-1">
              <h2 className="text-xl font-black tracking-tight lg:text-[28px]">
                {g.title}
              </h2>
              <p className="text-[13px] text-sub lg:text-sm">{g.meta}</p>
            </div>
            <div className="grid grid-cols-3 gap-2 lg:gap-3">
              {g.photos.map((p, pi) => {
                const i = offsets[gi] + pi;
                return (
                  <button
                    key={p.f}
                    type="button"
                    onClick={() => setCur(i)}
                    aria-label={`${p.c} 크게 보기`}
                    className="group cursor-zoom-in overflow-hidden rounded-lg bg-paper lg:rounded-xl"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element -- 미리 줄여 둔 썸네일을 그대로 사용 */}
                    <img
                      src={photoSrc(p.f, true)}
                      alt={p.c}
                      width={760}
                      height={507}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[3/2] w-full object-cover transition duration-300 group-hover:scale-[1.04]"
                    />
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {cur !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={all[cur].c}
          onClick={(e) => e.target === e.currentTarget && close()}
          className="fixed inset-0 z-[60] flex flex-col bg-black p-3.5 text-cream"
        >
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={close}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-cream/80 hover:bg-cream/10 hover:text-cream"
            >
              닫기
            </button>
          </div>
          <div
            onClick={(e) => e.target === e.currentTarget && close()}
            className="flex min-h-0 flex-1 items-center justify-center py-3"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoSrc(all[cur].f)}
              alt={all[cur].c}
              className="max-h-full max-w-full rounded-lg object-contain"
            />
          </div>
          <div className="flex items-center justify-center gap-3.5">
            <button
              type="button"
              onClick={() => move(-1)}
              className="rounded-lg px-[18px] py-2 text-sm font-semibold ring-1 ring-cream/30 hover:bg-cream/10"
            >
              이전
            </button>
            <span className="text-sm text-cream/70 tabular-nums">
              {cur + 1} / {all.length}
            </span>
            <button
              type="button"
              onClick={() => move(1)}
              className="rounded-lg px-[18px] py-2 text-sm font-semibold ring-1 ring-cream/30 hover:bg-cream/10"
            >
              다음
            </button>
          </div>
        </div>
      )}
    </>
  );
}
