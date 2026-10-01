import type { Metadata } from "next";
import { SermonListPage } from "@/components/sermon-list-page";

export const metadata: Metadata = { title: "수요예배" };
export const revalidate = 60;

export default function Page() {
  return <SermonListPage category="wednesday" />;
}
