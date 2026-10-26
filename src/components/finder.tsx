import { useEffect, useMemo, useState } from "react";
import { AirportField } from "@/components/airport-field";
import { FlightList, moneyLine } from "@/components/flight-list";
import { MonthCalendar } from "@/components/month-calendar";
import { AIRPORT } from "@/data/airports";
import type { Airline } from "@/data/network";
import {
  CABINS,
  HORIZON_DAYS,
  cabinName,
  firstSeatDate,
  searchAwards,
  type CabinCode,
  type DayResult,
  type Itinerary,
} from "@/lib/award-engine";
import { addDays, addMonths, formatMiles, monthKey, shortDate, seoulToday } from "@/lib/dates";
import { ArrowLeftRight, Minus, Plus } from "lucide-react";

type Trip = "ow" | "rt";
type AirlineFilter = "all" | Airline;

export function Finder() {
  const [today] = useState(seoulToday);
  const horizon = addDays(today, HORIZON_DAYS);
  const [trip, setTrip] = useState<Trip>("rt");
  const [airline, setAirline] = useState<AirlineFilter>("all");
  const [from, setFrom] = useState("ICN");
  const [to, setTo] = useState("LAX");
  const [pax, setPax] = useState(1);
  const [directOnly, setDirectOnly] = useState(false);
  const [outMonth, setOutMonth] = useState(monthKey(today));
  const [retMonth, setRetMonth] = useState(addMonths(monthKey(today), 1));
  const [outDate, setOutDate] = useState<string | null>(null);
  const [retDate, setRetDate] = useState<string | null>(null);
  const [outFlight, setOutFlight] = useState<string | null>(null);
  const [retFlight, setRetFlight] = useState<string | null>(null);

  const same = from === to;
  const result = useMemo(() => {
    if (same) return null;
    return searchAwards({
      from,
      to,
      airline,
      pax,
      directOnly,
      today,
      roundTrip: trip === "rt",
    });
  }, [airline, directOnly, from, pax, same, to, today, trip]);

  const outChosen = resolveDate(outDate, result?.outbound.days, outMonth);
  const retFloor = outChosen && outChosen > today ? outChosen : today;
  const retChosen =
    trip === "rt" && result?.inbound
      ? resolveDate(retDate, result.inbound.days, retMonth, retFloor)
      : null;

  useEffect(() => {
    if (retFloor.slice(0, 7) > retMonth) setRetMonth(retFloor.slice(0, 7));
  }, [retFloor, retMonth]);
  const outDay = outChosen ? result?.outbound.days.get(outChosen) : undefined;
  const retDay = retChosen && result?.inbound ? result.inbound.days.get(retChosen) : undefined;
  const outItin = outDay?.itineraries.find((itin) => itin.id === outFlight) ?? null;
  const retItin = retDay?.itineraries.find((itin) => itin.id === retFlight) ?? null;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:py-8">
      <header className="mb-5 max-w-3xl">
        <p className="text-xs font-semibold tracking-wide text-accent">대한항공 · 아시아나 · 360일</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">마일캘린더</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          일반석, 비즈니스, 일등석(스마티움) 예상 잔여가 있는 날만 달력에 진하게 나옵니다. 날짜를 누르면 그날
          운항편이 한 편이 아니라 전부 펼쳐집니다.
        </p>
      </header>

      <section className="rounded-xl border border-line bg-surface p-3 sm:p-4">
        <div className="flex flex-wrap gap-2">
          <Seg
            options={[
              ["rt", "왕복"],
              ["ow", "편도"],
            ]}
            value={trip}
            onChange={(v) => setTrip(v as Trip)}
          />
          <Seg
            options={[
              ["all", "전체"],
              ["KE", "대한항공"],
              ["OZ", "아시아나"],
            ]}
            value={airline}
            onChange={(v) => setAirline(v as AirlineFilter)}
          />
          <button
            type="button"
            aria-pressed={directOnly}
            onClick={() => setDirectOnly((v) => !v)}
            className={
              "h-11 rounded-lg border px-3 text-sm " +
              (directOnly ? "border-accent bg-accent text-surface" : "border-line bg-bg text-ink")
            }
          >
            직항만
          </button>
          <div className="flex h-11 items-center rounded-lg border border-line bg-bg">
            <button
              type="button"
              aria-label="인원 줄이기"
              className="flex h-11 w-11 items-center justify-center disabled:opacity-30"
              disabled={pax <= 1}
              onClick={() => setPax((n) => Math.max(1, n - 1))}
            >
              <Minus className="size-4" />
            </button>
            <span className="min-w-12 text-center text-sm">{pax}명</span>
            <button
              type="button"
              aria-label="인원 늘리기"
              className="flex h-11 w-11 items-center justify-center disabled:opacity-30"
              disabled={pax >= 4}
              onClick={() => setPax((n) => Math.min(4, n + 1))}
            >
              <Plus className="size-4" />
            </button>
          </div>
        </div>

        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-end">
          <AirportField label="출발" value={from} exclude={to} onChange={setFrom} />
          <button
            type="button"
            aria-label="출발지와 도착지 바꾸기"
            className="flex h-11 w-full shrink-0 items-center justify-center rounded-lg border border-line sm:mb-0 sm:w-11"
            onClick={() => {
              setFrom(to);
              setTo(from);
            }}
          >
            <ArrowLeftRight className="size-4" />
          </button>
          <AirportField label="도착" value={to} exclude={from} onChange={setTo} />
        </div>

        {same ? (
          <p className="mt-3 text-sm text-peak">출발지와 도착지가 같습니다.</p>
        ) : result ? (
          <p className="mt-3 text-sm text-muted">
            {routeBlurb(from, to, result.outbound.nonstop, result.outbound.operateDays, directOnly)} 가는 날 잔여{" "}
            {result.outbound.seatDays}일
            {result.inbound ? ` · 오는 날 잔여 ${result.inbound.seatDays}일` : ""}. 조건이 바뀌면 360일을 바로 다시
            계산합니다.
          </p>
        ) : null}
      </section>

      {result && (
        <>
          <div className={trip === "rt" ? "mt-4 grid gap-4 lg:grid-cols-2" : "mt-4"}>
            <div className="min-w-0">
              <MonthCalendar
                title="가는 날"
                month={outMonth}
                onMonth={setOutMonth}
                days={result.outbound.days}
                selected={outChosen}
                onSelect={(date) => {
                  setOutDate(date);
                  setOutFlight(null);
                  if (retDate && date > retDate) setRetDate(null);
                }}
                today={today}
                horizon={horizon}
                airline={airline}
              />
              <FlightList
                date={outChosen}
                itineraries={outDay?.itineraries ?? []}
                pax={pax}
                selectedId={outItin?.id ?? null}
                onSelect={(id) => setOutFlight((cur) => (cur === id ? null : id))}
              />
            </div>
            {trip === "rt" && result.inbound && (
              <div className="min-w-0">
                <MonthCalendar
                  title="오는 날"
                  month={retMonth}
                  onMonth={setRetMonth}
                  days={result.inbound.days}
                  selected={retChosen}
                  onSelect={(date) => {
                    setRetDate(date);
                    setRetFlight(null);
                  }}
                  today={outChosen && outChosen > today ? outChosen : today}
                  horizon={horizon}
                  airline={airline}
                />
                <FlightList
                  date={retChosen}
                  itineraries={retDay?.itineraries ?? []}
                  pax={pax}
                  selectedId={retItin?.id ?? null}
                  onSelect={(id) => setRetFlight((cur) => (cur === id ? null : id))}
                />
              </div>
            )}
          </div>
          <ComboSummary
            pax={pax}
            airline={airline}
            outDate={outChosen}
            retDate={trip === "rt" ? retChosen : null}
            outItin={outItin}
            retItin={retItin}
            outDay={outDay}
            retDay={trip === "rt" ? retDay : undefined}
            roundTrip={trip === "rt"}
          />
        </>
      )}

      <details className="mt-6 rounded-xl border border-line bg-surface px-4 py-3 text-sm text-muted">
        <summary className="font-medium text-ink">이 잔여석의 기준</summary>
        <div className="mt-3 space-y-2 leading-relaxed">
          <p>
            대한항공·아시아나 사이트는 외부 조회가 막혀 있어 실시간 잔여석을 가져오지 못합니다. 달력의 숫자는 공개
            공제표, 2026–2027 성수기, 대표 운항일, 좌석별 방출 패턴으로 계산한 예상 잔여입니다. 같은 조건이면 항상
            같은 결과가 바로 나옵니다. 발권 전에는 항공사 화면에서 다시 확인하세요.
          </p>
          <p>
            일반석 대한항공 편도 공제는 공식표입니다. 한국 출발 기준 국내 5,000/7,500, 일본·중국 15,000/22,500,
            동남아·괌 20,000/30,000, 서남아 25,000/37,500, 미주·유럽·대양주 35,000/52,500(평수기/성수기).
            프레스티지 장거리는 62,500/92,500, 일등석은 80,000/120,000을 기준으로 맞췄습니다.
          </p>
          <p>
            아시아나는 공개 왕복 공제표의 절반을 편도로 봤습니다. 장거리 세 번째 칸은 일등석이 아니라 스마티움입니다.
            성수기 날짜는 대한항공 국내·국제·미주 출발 달력을 쓰고, 아시아나에도 같은 달력을 참고로 적용합니다.
          </p>
          <p>
            직항이 없는 도시 조합은 같은 항공사로 인천 또는 김포에서 한 번 갈아탑니다. 대기 45분(국내) 또는 90분에서
            16시간. 공제는 구간을 더하지 않고 출도착 지역 한 장의 보너스로 계산합니다. 편명과 시각은 대표
            스케줄이라 시즌에 따라 달라집니다.
          </p>
        </div>
      </details>
    </main>
  );
}

function resolveDate(
  chosen: string | null,
  days: Map<string, DayResult> | undefined,
  month: string,
  notBefore?: string,
): string | null {
  if (!days) return null;
  if (chosen && days.get(chosen)?.operates && (!notBefore || chosen >= notBefore)) return chosen;
  return firstSeatDate(days, month, notBefore);
}

function routeBlurb(from: string, to: string, nonstop: boolean, operateDays: number, directOnly: boolean): string {
  const a = AIRPORT[from]?.city ?? from;
  const b = AIRPORT[to]?.city ?? to;
  if (operateDays === 0) return `${a} → ${b} 구간의 운항편이 없습니다. 인천 출발로 바꿔 보세요.`;
  if (nonstop) return `${a} → ${b} 직항.`;
  if (directOnly) return `${a} → ${b} 직항이 없습니다.`;
  return `${a} → ${b} 직항이 없어 경유편만 보여 줍니다.`;
}

function Seg({
  options,
  value,
  onChange,
}: {
  options: string[][];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex h-11 rounded-lg border border-line bg-bg p-1">
      {options.map(([id, label]) => (
        <button
          key={id}
          type="button"
          aria-pressed={value === id}
          onClick={() => onChange(id)}
          className={
            "h-full rounded-md px-3 text-sm " + (value === id ? "bg-accent text-surface" : "text-ink")
          }
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function ComboSummary({
  pax,
  airline,
  outDate,
  retDate,
  outItin,
  retItin,
  outDay,
  retDay,
  roundTrip,
}: {
  pax: number;
  airline: AirlineFilter;
  outDate: string | null;
  retDate: string | null;
  outItin: Itinerary | null;
  retItin: Itinerary | null;
  outDay?: DayResult;
  retDay?: DayResult;
  roundTrip: boolean;
}) {
  if (!outDate || !outDay) return null;
  return (
    <section className="mt-4 rounded-xl border border-line bg-ink px-4 py-4 text-surface">
      <p className="text-sm font-medium">
        가는 날 {shortDate(outDate)}
        {roundTrip && retDate ? ` · 오는 날 ${shortDate(retDate)}` : ""}
        {outItin ? ` · ${outItin.segments.map((s) => s.flightNo).join("+")}` : ""}
        {retItin ? ` / ${retItin.segments.map((s) => s.flightNo).join("+")}` : ""}
      </p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-3">
        {CABINS.map((cabin) => (
          <li key={cabin} className="rounded-lg bg-surface px-3 py-2 text-sm text-ink">
            <p className="text-xs text-muted">{cabinName(airline, cabin)}</p>
            <p className="mt-1">{lineFor(cabin, pax, roundTrip, outItin, retItin, outDay, retDay)}</p>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-surface">
        항공편을 누르면 그 편 기준, 아니면 그날 가장 낮은 공제 기준입니다. 세금·유류는 대략치입니다.
      </p>
    </section>
  );
}

function lineFor(
  cabin: CabinCode,
  pax: number,
  roundTrip: boolean,
  outItin: Itinerary | null,
  retItin: Itinerary | null,
  outDay: DayResult,
  retDay?: DayResult,
): string {
  const out = pickOffer(cabin, outItin, outDay);
  if (!out) return "잔여 없음";
  if (!roundTrip) return moneyLine(out.miles, out.tax, pax);
  const back = retDay ? pickOffer(cabin, retItin, retDay) : null;
  if (!back) return `가는 편 ${formatMiles(out.miles)} · 오는 날 잔여 없음`;
  return moneyLine(out.miles + back.miles, out.tax + back.tax, pax);
}

function pickOffer(cabin: CabinCode, itin: Itinerary | null, day: DayResult): { miles: number; tax: number } | null {
  if (itin) {
    const offer = itin.cabins[cabin];
    if (!offer?.enough) return null;
    return offer;
  }
  const best = day.best[cabin];
  if (!best) return null;
  const sample = day.itineraries.find((item) => item.cabins[cabin]?.enough && item.cabins[cabin]?.miles === best.miles);
  const tax = sample?.cabins[cabin]?.tax;
  if (tax == null) return null;
  return { miles: best.miles, tax };
}
