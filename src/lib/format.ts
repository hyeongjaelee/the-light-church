// "2026-09-27" → "2026.09.27"
export function dotDate(iso: string) {
  return iso.slice(0, 10).replaceAll("-", ".");
}

// "2026-09-27" → "09.27"
export function shortDate(iso: string) {
  return iso.slice(5, 10).replace("-", ".");
}

// "2026-09-27" → "2026년 9월 27일"
export function koDate(iso: string) {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  return `${y}년 ${m}월 ${d}일`;
}

// "19:30" → "오후 7:30"
export function koTime(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h < 12 ? "오전" : "오후";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${period} ${h12}:${String(m).padStart(2, "0")}`;
}

export function youtubeThumb(id: string, size: "hq" | "maxres" = "hq") {
  return `https://i.ytimg.com/vi/${id}/${size === "hq" ? "hqdefault" : "maxresdefault"}.jpg`;
}

export function youtubeUrl(id: string) {
  return `https://www.youtube.com/watch?v=${id}`;
}
