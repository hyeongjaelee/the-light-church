import Link from "next/link";
import { Mark } from "@/components/brand";
import { btn } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="grid min-h-[60vh] place-content-center justify-items-center gap-4 px-5 py-20 text-center">
      <Mark className="w-14" />
      <span className="eyebrow text-brand-blue">404</span>
      <h1 className="text-2xl font-black tracking-tight lg:text-3xl">페이지를 찾을 수 없습니다</h1>
      <p className="text-sub">주소가 바뀌었거나 삭제된 페이지입니다.</p>
      <Link href="/" className={`${btn.primary} ${btn.size} mt-2`}>
        홈으로 가기
      </Link>
    </div>
  );
}
