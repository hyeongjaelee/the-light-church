import { asset } from "@/lib/site";

// 로고 심볼(펼쳐진 책 + 빛의 십자 여백)을 시안 1에서 따라 그린 path. 원본 SVG를 받으면 교체합니다.
export function Mark({ className, yellow, blue }: { className?: string; yellow?: string; blue?: string }) {
  const y = yellow ?? "var(--mk-y, #f0ce74)";
  const b = blue ?? "var(--mk-b, #3559a5)";
  return (
    <svg viewBox="0 0 72 87" className={className} aria-hidden="true">
      <path fill={y} d="M0 0L39 15V33Q39 41 30 41H0Z" />
      <path fill={y} d="M0 46H22Q37 46 39 57V74L0 87Z" />
      <path fill={b} d="M42 25L71 15V41H50Q42 41 42 33Z" />
      <path fill={b} d="M42 56Q42 47 52 47H71V71H42Z" />
    </svg>
  );
}

// 심볼 + 워드마크. dark=true 면 남색 배경용 색으로 바뀝니다.
export function Logo({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <span className={`logo ${dark ? "logo-dark" : ""} ${className}`} role="img" aria-label="빛으로교회 THE LIGHT CHURCH">
      <Mark />
      <span className="wm" style={{ "--wm": `url("${asset("/brand/wordmark.png")}")` } as React.CSSProperties} />
    </span>
  );
}

// 주보 이미지가 없을 때 쓰는 종이 모양 썸네일
export function Paper({ className = "", small = false }: { className?: string; small?: boolean }) {
  return (
    <div className={`paper ${small ? "paper-sm" : ""} ${className}`}>
      {!small && <Mark className="absolute top-2.5 right-2 w-3.5" />}
      <i />
      <i />
      <i />
      <i />
      <i />
      <i />
      <i />
    </div>
  );
}
