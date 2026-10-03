import { SocialLinks } from "@/components/social-links";
import { fullAddress, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-cream">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid justify-items-center gap-4 px-5 pt-10 pb-8 text-center lg:gap-5 lg:px-11 lg:pt-20 lg:pb-16">
          <SocialLinks />
          <strong className="text-xl leading-snug font-black tracking-tight lg:text-[26px]">
            <span className="block font-en text-[11px] font-semibold tracking-[0.16em] text-cream/60 lg:text-[13px]">
              {site.nameEn}
            </span>
            {site.name}
          </strong>
          <p className="text-xs leading-relaxed text-cream/60 lg:text-sm">
            {site.denomination} · 담임목사 {site.pastor}
            <br />
            {fullAddress} · {site.phone}
            <br />© 2026 {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
