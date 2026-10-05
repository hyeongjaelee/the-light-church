"use client";

import { useEffect, useRef, useState } from "react";
import { btn } from "@/components/ui";

const START = 66; // 처음 켜져 있는 빛 개수
const FULL = 1000; // 이만큼 모이면 배경 빛이 가장 밝아짐
const POP_MS = 900; // 새 빛이 커졌다가 제자리로 돌아오는 시간
const BASE_AREA = 560 * 340; // 원본 데모 크기. 이보다 넓으면 빛을 키움
const TOP_FADE = 100; // 위 영상 영역과 이어지도록 남색으로 흐려지는 높이(px)

type Light = { x: number; y: number; r: number; ph: number; born: number };

// globals.css @theme 의 hex 토큰 → "r,g,b" (캔버스는 CSS 변수를 못 읽어서)
function tokenRgb(name: string, fallback: string) {
  const value =
    getComputedStyle(document.documentElement).getPropertyValue(name).trim() ||
    fallback;
  return [1, 3, 5].map((i) => parseInt(value.slice(i, i + 2), 16)).join(",");
}

/* 빛 켜기: 누를 때마다 밤하늘에 빛이 하나씩 켜짐 */
export function LightOn() {
  const boxRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const addRef = useRef<(x?: number, y?: number) => void>(() => {});
  const [count, setCount] = useState(START);

  useEffect(() => {
    const box = boxRef.current;
    const cv = canvasRef.current;
    const ctx = cv?.getContext("2d");
    if (!box || !cv || !ctx) return;

    const navy = tokenRgb("--color-navy", "#16264a");
    const yellow = tokenRgb("--color-brand-yellow", "#f0ce74");
    const cream = tokenRgb("--color-cream", "#fbf8f1");
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lights: Light[] = [];
    let W = 0;
    let H = 0;
    let scale = 1; // 영역이 넓을수록 빛을 키워서 듬성듬성해 보이지 않게
    let raf = 0;

    const draw = (now: number) => {
      const f = Math.min(1, lights.length / FULL);
      ctx.fillStyle = `rgb(${navy})`;
      ctx.fillRect(0, 0, W, H);
      const glow = ctx.createRadialGradient(
        W / 2,
        H * 0.5,
        0,
        W / 2,
        H * 0.5,
        Math.max(W, H) * 0.6,
      );
      glow.addColorStop(0, `rgba(${yellow},${0.12 + f * 0.3})`);
      glow.addColorStop(1, `rgba(${yellow},0)`);
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);
      for (const l of lights) {
        const age = now - l.born;
        const pop = !still && age < POP_MS ? 1 + 2.5 * (1 - age / POP_MS) : 1;
        const tw = still ? 1 : 0.75 + 0.25 * Math.sin(now / 700 + l.ph);
        const r = l.r * scale * pop * 7;
        const g = ctx.createRadialGradient(l.x, l.y, 0, l.x, l.y, r);
        g.addColorStop(0, `rgba(${cream},${tw})`);
        g.addColorStop(0.25, `rgba(${yellow},${0.45 * tw})`);
        g.addColorStop(1, `rgba(${yellow},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(l.x, l.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      // 위쪽은 남색으로 덮어서 위 영상 영역과 경계 없이 이어지게
      const top = ctx.createLinearGradient(0, 0, 0, TOP_FADE);
      top.addColorStop(0, `rgb(${navy})`);
      top.addColorStop(1, `rgba(${navy},0)`);
      ctx.fillStyle = top;
      ctx.fillRect(0, 0, W, TOP_FADE);
    };

    const resize = () => {
      const prevW = W;
      const prevH = H;
      const dpr = window.devicePixelRatio || 1;
      W = box.clientWidth;
      H = box.clientHeight;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      scale = Math.min(1.8, Math.max(1, Math.sqrt((W * H) / BASE_AREA)));
      // 화면 크기가 바뀌어도 빛이 같은 비율 자리에 있도록
      if (prevW && prevH) {
        for (const l of lights) {
          l.x *= W / prevW;
          l.y *= H / prevH;
        }
      }
      draw(performance.now());
    };

    // 위쪽 페이드 구간과 아래쪽 문구·버튼 자리는 피해서 흩뿌림
    const randomY = () =>
      TOP_FADE + Math.random() * Math.max(H - TOP_FADE - 200, 40);
    const add = (x: number, y: number, born: number) =>
      lights.push({
        x,
        y,
        r: 1.5 + Math.random() * 2.5,
        ph: Math.random() * Math.PI * 2,
        born,
      });

    resize();
    for (let i = 0; i < START; i++)
      add(Math.random() * W, randomY(), -Infinity);
    draw(performance.now());

    addRef.current = (x, y) => {
      add(
        x ?? W * (0.15 + Math.random() * 0.7),
        y ?? randomY(),
        performance.now(),
      );
      setCount(lights.length);
      if (still) draw(performance.now());
    };

    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    // 화면에 보일 때만 애니메이션을 돌림
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      if (entry.isIntersecting && !still) raf = requestAnimationFrame(loop);
    });
    const ro = new ResizeObserver(resize);
    io.observe(box);
    ro.observe(box);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <section
      ref={boxRef}
      aria-label="빛 켜기"
      className="relative h-[480px] overflow-hidden bg-navy text-cream lg:h-[640px]"
    >
      <canvas
        ref={canvasRef}
        aria-hidden
        onClick={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          addRef.current(e.clientX - r.left, e.clientY - r.top);
        }}
        className="absolute inset-0 size-full cursor-pointer"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-6 grid justify-items-center gap-2.5 px-5 text-center lg:bottom-10 lg:gap-3">
        <p
          aria-live="polite"
          className="text-[22px] font-bold tracking-tight lg:text-[28px]"
        >
          <b className="font-en text-brand-yellow tabular-nums">{count + 1}</b>
          번째 빛인 당신을 초대합니다
        </p>
        <button
          type="button"
          onClick={() => addRef.current()}
          className={`pointer-events-auto ${btn.yellow} ${btn.size}`}
        >
          환영합니다
        </button>
        <p className="text-xs text-cream/50 lg:text-[13px]">
          화면 아무 곳이나 눌러도 켜져요
        </p>
      </div>
    </section>
  );
}
