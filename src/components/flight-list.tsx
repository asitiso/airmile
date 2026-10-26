import { AIRPORT } from "@/data/airports";
import { cabinName, CABINS, type CabinCode, type Itinerary } from "@/lib/award-engine";
import { formatDuration, formatMiles, formatWon, shortDate } from "@/lib/dates";

type Props = {
  date: string | null;
  itineraries: Itinerary[];
  pax: number;
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export function FlightList({ date, itineraries, pax, selectedId, onSelect }: Props) {
  if (!date) {
    return <p className="px-1 py-6 text-sm text-muted">잔여가 있는 날을 고르면 그날 항공편이 모두 나옵니다.</p>;
  }
  const open = itineraries.filter((itin) => itin.anySeats).length;
  return (
    <div className="mt-3">
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <h3 className="text-sm font-semibold">{shortDate(date)}</h3>
        <p className="text-xs text-muted">
          운항 {itineraries.length}편 · 잔여 {open}편
        </p>
      </div>
      <ul className="flex flex-col gap-2">
        {itineraries.map((itin) => {
          const first = itin.segments[0];
          const last = itin.segments[itin.segments.length - 1];
          const on = itin.id === selectedId;
          return (
            <li key={itin.id}>
              <button
                type="button"
                onClick={() => onSelect(itin.id)}
                className={
                  "w-full rounded-xl border p-3 text-left " +
                  (on ? "border-accent bg-bg" : "border-line bg-surface")
                }
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">
                      {itin.airline === "KE" ? "대한항공" : "아시아나"}{" "}
                      <span className="font-medium text-muted">{itin.segments.map((s) => s.flightNo).join(" + ")}</span>
                    </p>
                    <p className="mt-1 text-sm">
                      {first.dep} {city(first.from)}
                      <span className="text-muted"> → </span>
                      {last.arr}
                      {last.plus > 0 ? <span className="text-peak"> +{last.plus}</span> : null} {city(last.to)}
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      {first.eqName}
                      {" · "}
                      {formatDuration(itin.durationMin)}
                      {" · "}
                      {itin.stops === 0 ? "직항" : `경유 1회 ${city(itin.segments[0].to)} ${formatDuration(itin.layoverMin ?? 0)}`}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-md border border-line px-2 py-1 text-xs">
                    {itin.anySeats ? "잔여" : "만석"}
                  </span>
                </div>
                {itin.stops === 1 && (
                  <p className="mt-2 text-xs text-muted">
                    {itin.segments[0].flightNo} {itin.segments[0].dep}→{itin.segments[0].arr}
                    {itin.segments[0].plus > 0 ? ` +${itin.segments[0].plus}` : ""} {city(itin.segments[0].to)}
                    {" · "}
                    {itin.segments[1].flightNo} {shortDate(itin.segments[1].date)} {itin.segments[1].dep}→
                    {itin.segments[1].arr}
                  </p>
                )}
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {CABINS.map((cabin) => (
                    <CabinCell key={cabin} cabin={cabin} itin={itin} pax={pax} />
                  ))}
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function CabinCell({ cabin, itin, pax }: { cabin: CabinCode; itin: Itinerary; pax: number }) {
  const offer = itin.cabins[cabin];
  const name = cabinName(itin.airline, cabin);
  if (!offer) {
    return (
      <div className="rounded-lg bg-bg px-2 py-2 text-xs text-muted">
        <p>{name}</p>
        <p>운항 없음</p>
      </div>
    );
  }
  const ok = offer.enough;
  return (
    <div className={"rounded-lg px-2 py-2 text-xs " + (ok ? "bg-bg text-ink" : "bg-bg text-muted")}>
      <p className="font-medium">{name}</p>
      <p>{formatMiles(offer.miles)}마일</p>
      <p>{offer.seats > 0 ? `${offer.seats}석` : "만석"}{offer.seats > 0 && !ok ? ` · ${pax}명 부족` : ""}</p>
    </div>
  );
}

function city(code: string): string {
  return AIRPORT[code]?.city ?? code;
}

export function moneyLine(miles: number, tax: number, pax: number): string {
  const totalMiles = miles * pax;
  const totalTax = tax * pax;
  if (pax === 1) return `${formatMiles(miles)}마일 · 세금·유류 약 ${formatWon(tax)}`;
  return `1인 ${formatMiles(miles)} · ${pax}인 ${formatMiles(totalMiles)}마일 · 세금 약 ${formatWon(totalTax)}`;
}
