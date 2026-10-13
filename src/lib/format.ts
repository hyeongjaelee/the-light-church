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
// 예배 시간은 "09:30" 또는 여러 번이면 "09:30 / 11:30"
export function splitTimes(time: string) {
  return time.split("/").map((t) => t.trim());
}

function koTimeOne(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h < 12 ? "오전" : "오후";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${period} ${h12}:${String(m).padStart(2, "0")}`;
}

/** "09:30" → "오전 9:30", "09:30 / 11:30" → "오전 9:30 / 11:30" (같은 오전·오후는 한 번만) */
export function koTime(time: string) {
  let prev = "";
  return splitTimes(time)
    .map((t) => {
      const ko = koTimeOne(t);
      const [period, clock] = ko.split(" ");
      const out = period === prev ? clock : ko;
      prev = period;
      return out;
    })
    .join(" / ");
}

export function youtubeThumb(id: string, size: "hq" | "maxres" = "hq") {
  return `https://i.ytimg.com/vi/${id}/${size === "hq" ? "hqdefault" : "maxresdefault"}.jpg`;
}

export function youtubeUrl(id: string) {
  return `https://www.youtube.com/watch?v=${id}`;
}
