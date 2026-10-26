import { CABINS, cabinName, type CabinCode, type DayResult } from "@/lib/award-engine";
import { addMonths, monthGrid, monthKey, monthLabel, monthsBetween } from "@/lib/dates";
import type { Airline } from "@/data/network";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WEEK = ["일", "월", "화", "수", "목", "금", "토"];

type Props = {
  title: string;
  month: string;
  onMonth: (month: string) => void;
  days: Map<string, DayResult>;
  selected: string | null;
  onSelect: (date: string) => void;
  today: string;
  horizon: string;
  airline: Airline | "all";
};

export function MonthCalendar({
  title,
  month,
  onMonth,
  days,
  selected,
  onSelect,
  today,
  horizon,
  airline,
}: Props) {
  const minMonth = monthKey(today);
  const maxMonth = monthKey(horizon);
  const cells = monthGrid(month);
  const months = monthsBetween(today, horizon);
  let monthSeats = 0;
  for (const [date, day] of days) {
    if (date.startsWith(month) && day.anySeats) monthSeats += 1;
  }

  return (
    <section className="min-w-0 rounded-xl border border-line bg-surface p-3 sm:p-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold">{title}</h2>
          <p className="text-xs text-muted">이 달 잔여 {monthSeats}일</p>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="이전 달"
            disabled={month <= minMonth}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-line disabled:opacity-30"
            onClick={() => onMonth(addMonths(month, -1))}
          >
            <ChevronLeft className="size-5" />
          </button>
          <p className="min-w-24 text-center text-sm font-semibold">{monthLabel(month)}</p>
          <button
            type="button"
            aria-label="다음 달"
            disabled={month >= maxMonth}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-line disabled:opacity-30"
            onClick={() => onMonth(addMonths(month, 1))}
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>

      <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
        {months.map((key) => {
          let seats = 0;
          for (const [date, day] of days) {
            if (date.startsWith(key) && day.anySeats) seats += 1;
          }
          const on = key === month;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onMonth(key)}
              className={
                "flex min-h-11 shrink-0 flex-col justify-center rounded-lg border px-3 text-left " +
                (on ? "border-accent bg-accent text-surface" : "border-line bg-bg text-ink")
              }
            >
              <span className="block text-xs font-medium">{Number(key.slice(5))}월</span>
              <span className={"block text-xs " + (on ? "text-surface" : "text-muted")}>
                {seats > 0 ? `잔여 ${seats}` : "없음"}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mb-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted">
        {CABINS.map((cabin) => (
          <span key={cabin} className={cabinClass(cabin, false)}>
            {cabinName(airline, cabin)}
          </span>
        ))}
        <span className="text-peak">성수기</span>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted">
        {WEEK.map((name) => (
          <div key={name} className="py-1">
            {name}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((date, index) => {
          if (!date) return <div key={`e-${index}`} />;
          const day = days.get(date);
          const inRange = date >= today && date <= horizon;
          const selectedDay = date === selected;
          const open = Boolean(day?.anySeats);
          const operable = Boolean(day?.operates) && inRange;
          return (
            <button
              key={date}
              type="button"
              disabled={!operable}
              onClick={() => onSelect(date)}
              aria-label={aria(date, day)}
              aria-pressed={selectedDay}
              className={
                "flex min-h-20 flex-col items-center justify-center rounded-lg border px-0.5 py-1 text-xs leading-tight " +
                (selectedDay
                  ? "border-accent bg-accent text-surface"
                  : open
                    ? "border-line bg-bg text-ink"
                    : "border-transparent bg-transparent text-muted")
              }
            >
              <span className="font-semibold">
                {Number(date.slice(8))}
                {day?.peak && inRange ? <span className={selectedDay ? " text-surface" : " text-peak"}> 성</span> : null}
              </span>
              {operable ? (
                CABINS.map((cabin) => {
                  const best = day?.best[cabin];
                  return (
                    <span key={cabin} className={selectedDay ? "text-surface" : cabinClass(cabin, !best)}>
                      {best ? best.seats : "–"}
                    </span>
                  );
                })
              ) : (
                <span className="mt-2 text-muted">{inRange ? "" : ""}</span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function cabinClass(cabin: CabinCode, empty: boolean): string {
  if (empty) return "text-muted";
  if (cabin === "y") return "text-accent";
  if (cabin === "f") return "text-gold";
  return "text-ink";
}

function aria(date: string, day: DayResult | undefined): string {
  if (!day?.operates) return `${date} 운항 없음`;
  const bits = CABINS.map((cabin) => {
    const best = day.best[cabin];
    return best ? `${cabinName("all", cabin)} ${best.seats}석` : `${cabinName("all", cabin)} 없음`;
  });
  return `${date} ${bits.join(", ")}`;
}
