import type { Metadata } from "next";
import { BulletinList } from "@/components/bulletin-list";
import { PageHeader } from "@/components/page-header";
import { Container } from "@/components/ui";
import { getBulletins } from "@/lib/data";
import { MENU } from "@/lib/site";

export const metadata: Metadata = { title: "교회주보" };
export const revalidate = 60;

export default async function BulletinListPage() {
  const bulletins = await getBulletins(undefined, 400);
  return (
    <>
      <PageHeader section={MENU[3]} title="교회주보" />
      <Container className="grid max-w-[960px] gap-4 py-6 lg:gap-6 lg:py-14">
        <BulletinList bulletins={bulletins} />
      </Container>
    </>
  );
}
