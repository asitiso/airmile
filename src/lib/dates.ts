export function dayIndex(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return Math.round(Date.UTC(y, m - 1, d) / 86400000);
}

export function fromIndex(n: number): string {
  return new Date(n * 86400000).toISOString().slice(0, 10);
}

export function addDays(iso: string, k: number): string {
  return fromIndex(dayIndex(iso) + k);
}

export function seoulToday(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

/** 1 = Monday … 7 = Sunday */
export function isoDow(iso: string): number {
  const js = new Date(`${iso}T00:00:00Z`).getUTCDay();
  return js === 0 ? 7 : js;
}

export function hm(value: string): number {
  const [h, m] = value.split(":").map(Number);
  return h * 60 + m;
}

export function absMinutes(iso: string, clock: string): number {
  return dayIndex(iso) * 1440 + hm(clock);
}

export function blockMinutes(dep: string, arr: string, plus: number, tzFrom: number, tzTo: number): number {
  return Math.round(hm(arr) - hm(dep) + plus * 1440 - (tzTo - tzFrom) * 60);
}

export function formatDuration(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h <= 0) return `${m}분`;
  if (m === 0) return `${h}시간`;
  return `${h}시간 ${m}분`;
}

export function formatMiles(n: number): string {
  return `${n.toLocaleString("ko-KR")}`;
}

export function formatWon(n: number): string {
  return `${n.toLocaleString("ko-KR")}원`;
}

export function monthKey(iso: string): string {
  return iso.slice(0, 7);
}

export function addMonths(key: string, delta: number): string {
  const [y, m] = key.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1 + delta, 1));
  const mm = String(dt.getUTCMonth() + 1).padStart(2, "0");
  return `${dt.getUTCFullYear()}-${mm}`;
}

export function monthLabel(key: string): string {
  const [y, m] = key.split("-");
  return `${y}년 ${Number(m)}월`;
}

export function shortDate(iso: string): string {
  const [, m, d] = iso.split("-");
  const names = ["", "월", "화", "수", "목", "금", "토", "일"];
  return `${Number(m)}월 ${Number(d)}일 (${names[isoDow(iso)]})`;
}

export function monthGrid(key: string): Array<string | null> {
  const [y, m] = key.split("-").map(Number);
  const first = new Date(Date.UTC(y, m - 1, 1));
  const startPad = first.getUTCDay();
  const days = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const cells: Array<string | null> = [];
  for (let i = 0; i < startPad; i++) cells.push(null);
  for (let d = 1; d <= days; d++) {
    cells.push(`${key}-${String(d).padStart(2, "0")}`);
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export function monthsBetween(startIso: string, endIso: string): string[] {
  const out: string[] = [];
  let key = monthKey(startIso);
  const last = monthKey(endIso);
  while (key <= last) {
    out.push(key);
    key = addMonths(key, 1);
  }
  return out;
}
