// 선 아이콘. path 는 Lucide(lucide.dev, ISC 라이선스)에서 가져옴
type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export function SproutIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M7 20h10" />
      <path d="M10 20c5.5-2.5.8-6.4 3-10" />
      <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
      <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
    </svg>
  );
}

export function TreeIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M8 19a4 4 0 0 1-2.24-7.32A3.5 3.5 0 0 1 9 6.03V6a3 3 0 1 1 6 0v.04a3.5 3.5 0 0 1 3.24 5.65A4 4 0 0 1 16 19Z" />
      <path d="M12 19v3" />
    </svg>
  );
}

// ✨ 빛: 큰 별 하나 + 작은 별 둘. 채워진 아이콘이라 색은 text-* 로 지정 (예: text-brand-yellow)
export function SparkleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M10 5C10.6 10.4 12.6 12.4 18 13C12.6 13.6 10.6 15.6 10 21C9.4 15.6 7.4 13.6 2 13C7.4 12.4 9.4 10.4 10 5Z" />
      <path d="M19 1.5C19.3 4 20 4.7 22.5 5C20 5.3 19.3 6 19 8.5C18.7 6 18 5.3 15.5 5C18 4.7 18.7 4 19 1.5Z" />
      <path d="M19.5 16.5C19.7 18.3 20.2 18.8 22 19C20.2 19.2 19.7 19.7 19.5 21.5C19.3 19.7 18.8 19.2 17 19C18.8 18.8 19.3 18.3 19.5 16.5Z" />
    </svg>
  );
}
