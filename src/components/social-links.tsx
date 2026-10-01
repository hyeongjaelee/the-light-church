import { site } from "@/lib/site";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="size-5">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
      <path
        fill="currentColor"
        d="M21.6 7.2a2.6 2.6 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.6 2.6 0 0 0 2.4 7.2 27 27 0 0 0 2 12a27 27 0 0 0 .4 4.8 2.6 2.6 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8A27 27 0 0 0 22 12a27 27 0 0 0-.4-4.8Z"
      />
      <path fill="var(--color-navy)" d="m10 15 5.2-3L10 9v6Z" />
    </svg>
  );
}

function BlogIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
      <path fill="currentColor" d="M5 3.5h14A2.5 2.5 0 0 1 21.5 6v9a2.5 2.5 0 0 1-2.5 2.5h-4.6L12 20.5l-2.4-3H5A2.5 2.5 0 0 1 2.5 15V6A2.5 2.5 0 0 1 5 3.5Z" />
      <text x="12" y="13.9" textAnchor="middle" fontSize="7.2" fontWeight="800" fontFamily="system-ui, sans-serif" fill="var(--color-navy)">
        blog
      </text>
    </svg>
  );
}

const LINKS = [
  { key: "instagram", label: "인스타그램", href: site.sns.instagram, Icon: InstagramIcon },
  { key: "youtube", label: "유튜브", href: site.sns.youtube, Icon: YouTubeIcon },
  { key: "blog", label: "블로그", href: site.sns.blog, Icon: BlogIcon },
] as const;

// 남색 배경 위에서 쓰는 SNS 아이콘 버튼 (인스타 → 유튜브 → 블로그)
export function SocialLinks({ size = "md" }: { size?: "sm" | "md" }) {
  const box = size === "sm" ? "size-9" : "size-11";
  return (
    <ul className="flex gap-2">
      {LINKS.map(({ key, label, href, Icon }) => (
        <li key={key}>
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} (새 창)`}
              className={`grid ${box} place-items-center rounded-full text-cream ring-1 ring-cream/30 transition hover:bg-cream/15`}
            >
              <Icon />
            </a>
          ) : (
            <span
              aria-label={`${label} 준비 중`}
              title={`${label} 준비 중`}
              className={`grid ${box} place-items-center rounded-full text-cream/35 ring-1 ring-cream/15`}
            >
              <Icon />
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
