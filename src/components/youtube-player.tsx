"use client";

import { useRef, useState } from "react";
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

export function YouTubePlayer({ videoId, title, mode = "normal", cover = false, className = "" }: Props) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [soundOn, setSoundOn] = useState(false);
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

  const toggleSound = () => {
    const next = !soundOn;
    const send = (func: string) =>
      frameRef.current?.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args: [] }), "*");
    send(next ? "unMute" : "mute");
    if (next) send("playVideo");
    setSoundOn(next);
  };

  return (
    <div
      className={`${cover ? "absolute inset-0" : "relative aspect-video"} overflow-hidden bg-navy bg-cover bg-center ${className}`}
      style={{ backgroundImage: `url(${youtubeThumb(videoId, bg ? "maxres" : "hq")})` }}
    >
      {/* cover 는 컨테이너 단위(cq*)로 크기를 잡음. 소리 버튼이 이 층에 갇혀 가려지지 않도록 iframe 만 감쌈 */}
      <div className={`absolute inset-0 ${cover ? "[container-type:size]" : ""}`}>
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
      {bg && (
        <button
          type="button"
          onClick={toggleSound}
          className="absolute right-3 bottom-3 z-10 rounded-full bg-navy/75 px-3 py-1.5 text-xs font-bold text-cream backdrop-blur-md lg:right-7 lg:bottom-7 lg:px-4.5 lg:py-2.5 lg:text-sm"
        >
          {soundOn ? "🔊 소리 끄기" : "🔇 소리 켜기"}
        </button>
      )}
    </div>
  );
}
