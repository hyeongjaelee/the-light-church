import Link from "next/link";
import { SocialLinks } from "@/components/social-links";
import { getWorshipTimes } from "@/lib/data";
import { koTime } from "@/lib/format";
import { fullAddress, MENU, site } from "@/lib/site";

export async function SiteFooter() {
  const times = (await getWorshipTimes()).filter((t) => t.kind === "worship");

  return (
    <footer className="bg-navy text-cream">
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-2">
        <div className="grid content-end gap-4 px-5 pt-10 pb-8 lg:gap-5 lg:px-11 lg:pt-20 lg:pb-16">
          <strong className="text-xl leading-snug font-black tracking-tight lg:text-[26px]">
            <span className="block font-en text-[11px] font-semibold tracking-[0.16em] text-cream/60 lg:text-[13px]">
              {site.nameEn}
            </span>
            {site.name}
          </strong>
          <dl className="grid w-fit grid-cols-[auto_1fr] gap-x-4 gap-y-0.5 text-xs text-cream/70 tabular-nums lg:text-sm">
            {times.map((t) => (
              <div key={t.id} className="contents">
                <dt>{t.name}</dt>
                <dd>{koTime(t.time)}</dd>
              </div>
            ))}
          </dl>
          <p className="text-xs leading-relaxed text-cream/60 lg:text-sm">
            {site.denomination} · 담임목사 {site.pastor}
            <br />
            {fullAddress} · {site.phone}
            <br />© {new Date().getFullYear()} The Light Church
          </p>
          <SocialLinks />
        </div>
        <nav
          aria-label="푸터 메뉴"
          className="hidden content-end gap-8 border-l border-cream/12 px-11 pt-20 pb-16 lg:grid lg:grid-cols-2"
        >
          {MENU.map((m) => (
            <div key={m.en} className="grid gap-1">
              <Link href={m.href} className="font-en text-lg font-bold">
                {m.en}
                <small className="ml-2 font-sans text-[13px] font-medium text-cream/60">{m.ko}</small>
              </Link>
              <span className="text-sm text-cream/60">
                {m.sub.map((s, i) => (
                  <span key={s.href}>
                    {i > 0 && " · "}
                    <Link href={s.href} className="hover:text-cream">
                      {s.label}
                    </Link>
                  </span>
                ))}
              </span>
            </div>
          ))}
        </nav>
      </div>
    </footer>
  );
}
