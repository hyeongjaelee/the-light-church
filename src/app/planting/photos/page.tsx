import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Gallery } from "@/components/planting/gallery";
import { Container } from "@/components/ui";

export const metadata: Metadata = { title: "모임사진" };

export default function PlantingPhotosPage() {
  return (
    <>
      <PageHeader
        path="/planting/photos"
        description="2026년 7월부터 9월까지 네 번, 우리는 함께 앉고 함께 기도했습니다. 교회는 건물이 아니라 이 사람들입니다."
      />
      <Container className="py-10 lg:py-20">
        <Gallery />
      </Container>
    </>
  );
}
