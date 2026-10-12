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

  const params = new URLSearchParams({
    ...(bg && {
      autoplay: "1",
      mute: "1",
      loop: "1",
      playlist: videoId,
      controls: "0",
    }),
    rel: "0",
    playsinline: "1",
    enablejsapi: "1",
    cc_load_policy: "0", // 자막 기본 끔
  });

  // cc_load_policy=0 이어도 유튜브 설정·자동 자막 때문에 켜질 수 있어서, 플레이어가 준비되면 자막 모듈을 내림.
  // 준비 시점을 알 수 없으므로 load 직후 몇 번 나눠 보냄
  const hideCaptions = () => {
    const send = () =>
      frameRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func: "unloadModule", args: ["captions"] }),
        "*",
      );
    [0, 1000, 3000].forEach((ms) => setTimeout(send, ms));
  };

  const thumb = {
    backgroundImage: `url(${youtubeThumb(videoId, bg ? "maxres" : "hq")})`,
  };
  const iframe = (
    <iframe
      ref={frameRef}
      onLoad={hideCaptions}
      src={`https://www.youtube-nocookie.com/embed/${videoId}?${params}`}
      title={title}
      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
      // 일반 플레이어: 유튜브 안쪽 검은 바탕이 좌우 가장자리에 얇은 줄로 보이지 않도록 살짝 키워 둠 (넘친 부분은 잘림)
      className={`absolute inset-0 size-full border-0 ${bg ? "pointer-events-none" : cover ? "" : "scale-[1.02]"}`}
    />
  );

  if (!cover) {
    // 일반 플레이어는 유튜브 화면이 자체 썸네일로 꽉 채우므로 바탕을 두지 않음
    // (바탕이 있으면 둥근 모서리에서 가장자리가 1px 테두리처럼 비쳐 보임)
    return (
      <div className={`relative aspect-video overflow-hidden ${className}`}>
        {iframe}
      </div>
    );
  }

  // cover: 컨테이너 단위(cq*)로 16:9 상자 크기를 잡음
  // 영역을 꽉 채우고 넘치는 부분은 잘라냄
  return (
    <div className={`absolute inset-0 overflow-hidden bg-navy [container-type:size] ${className}`}>
      <div
        className="absolute top-1/2 left-1/2 h-[max(100cqh,56.25cqw)] w-[max(100cqw,177.78cqh)] -translate-x-1/2 -translate-y-1/2 bg-cover bg-center"
        style={thumb}
      >
        {iframe}
      </div>
    </div>
  );
}
