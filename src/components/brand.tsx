import { asset } from "@/lib/site";

// 로고. public/logo.svg 와 같은 path이며, 배경에 따라 yellow/blue 로 색만 바뀝니다.
export function Logo({
  className,
  yellow,
  blue,
}: {
  className?: string;
  yellow?: string;
  blue?: string;
}) {
  const y = yellow ?? "var(--mk-y, #F4D05D)";
  const b = blue ?? "var(--mk-b, #2E59A7)";
  return (
    <svg viewBox="0 0 108 140" className={className} aria-hidden="true">
      <path fill={y} d="M0,2 L59,27 L59,50 C58,60 50,66 36,68 L0,71 Z" />
      <path fill={y} d="M0,74 C22,75 50,79 58,90 L58,111 L0,138 Z" />
      <path fill={b} d="M107,25 L64,42 L64,55 C66,62 76,66 90,68 L107,69 Z" />
      <path fill={b} d="M107,72 C88,74 69,79 65,89 L64,112 L107,112 Z" />
    </svg>
  );
}

// 로고 + 워드마크. dark=true 면 남색 배경용 색으로 바뀝니다.
export function LogoAndWordmark({
  className = "",
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  return (
    <span
      className={`logo ${dark ? "logo-dark" : ""} ${className}`}
      role="img"
      aria-label="빛으로교회 THE LIGHT CHURCH"
    >
      <Logo />
      <span
        className="wm"
        style={
          {
            "--wm": `url("${asset("/brand/wordmark.png")}")`,
          } as React.CSSProperties
        }
      />
    </span>
  );
}

// 주보 이미지가 없을 때 쓰는 종이 모양 썸네일
export function Paper({
  className = "",
  small = false,
}: {
  className?: string;
  small?: boolean;
}) {
  return (
    <div className={`paper ${small ? "paper-sm" : ""} ${className}`}>
      {!small && <Logo className="absolute top-2.5 left-2 w-3.5" />}
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
