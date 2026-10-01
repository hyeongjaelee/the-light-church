import type { Metadata } from "next";
import { SermonListPage } from "@/components/sermon-list-page";

export const metadata: Metadata = { title: "특별집회" };
export const revalidate = 60;

export default function Page() {
  return <SermonListPage category="special" />;
}
