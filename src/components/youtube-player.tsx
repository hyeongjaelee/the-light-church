"use client";

import { useRef } from "react";
import { youtubeThumb } from "@/lib/format";

type Props = {
  videoId: string;
  title: string;
  /** background: 음소거 자동재생 + 반복, 컨트롤 숨김(소리 버튼 제공) / normal: 일반 플레이어 */
  mode?: "background" | "normal";
  /** true: 16:9 대신 부모 영역을 꽉 채우고 넘치는 부분은 잘라냄 (object-fit: cover 처럼) */
  cover?: boolean;
  className?: string;
};

export function YouTubePlayer({
  videoId,
  title,
  mode = "normal",
  cover = false,
  className = "",
}: Props) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const bg = mode === "background";

  const params = new URLSearchParams(
    bg
      ? {
          autoplay: "1",
          mute: "1",
          loop: "1",
          playlist: videoId,
          controls: "0",
          rel: "0",
          playsinline: "1",
          enablejsapi: "1",
        }
      : { rel: "0", playsinline: "1" },
  );

  return (
    <div
      className={`${cover ? "absolute inset-0" : "relative aspect-video"} overflow-hidden bg-navy bg-cover bg-center ${className}`}
      style={{
        backgroundImage: `url(${youtubeThumb(videoId, bg ? "maxres" : "hq")})`,
      }}
    >
      {/* cover 는 컨테이너 단위(cq*)로 크기를 잡음. 소리 버튼이 이 층에 갇혀 가려지지 않도록 iframe 만 감쌈 */}
      <div
        className={`absolute inset-0 ${cover ? "[container-type:size]" : ""}`}
      >
        <iframe
          ref={frameRef}
          src={`https://www.youtube-nocookie.com/embed/${videoId}?${params}`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className={`absolute border-0 ${cover ? "top-1/2 left-1/2 h-[max(100cqh,56.25cqw)] w-[max(100cqw,177.78cqh)] -translate-x-1/2 -translate-y-1/2" : "inset-0 size-full"} ${bg ? "pointer-events-none" : ""}`}
        />
      </div>
    </div>
  );
}
