import { AIRPORT, tzOf, type Airport, type Region } from "@/data/airports";
import { PEAK_DAYS, type PeakCal } from "@/data/peaks";
import { EQ_NAME, FLIGHTS, flightsBetween, type Airline, type Flight } from "@/data/network";
import { absMinutes, addDays, blockMinutes, dayIndex, isoDow } from "@/lib/dates";

export type CabinCode = "y" | "j" | "f";

export type CabinOffer = {
  miles: number;
  seats: number;
  tax: number;
  enough: boolean;
};

export type Segment = {
  airline: Airline;
  flightNo: string;
  from: string;
  to: string;
  dep: string;
  arr: string;
  plus: number;
  date: string;
  eq: string;
  eqName: string;
};

export type Itinerary = {
  id: string;
  airline: Airline;
  stops: 0 | 1;
  segments: Segment[];
  durationMin: number;
  layoverMin: number | null;
  cabins: Record<CabinCode, CabinOffer | null>;
  anySeats: boolean;
};

export type CabinBest = { miles: number; seats: number } | null;

export type DayResult = {
  date: string;
  peak: boolean;
  operates: boolean;
  anySeats: boolean;
  best: Record<CabinCode, CabinBest>;
  itineraries: Itinerary[];
};

export type SearchInput = {
  from: string;
  to: string;
  airline: Airline | "all";
  pax: number;
  directOnly: boolean;
  today: string;
  roundTrip: boolean;
};

export type DirectionResult = {
  days: Map<string, DayResult>;
  seatDays: number;
  operateDays: number;
  nonstop: boolean;
};

export type SearchResult = {
  outbound: DirectionResult;
  inbound: DirectionResult | null;
};

export const HORIZON_DAYS = 360;
export const CABINS: CabinCode[] = ["y", "j", "f"];

const TAX: Record<Region, number> = {
  dom: 11000,
  nea: 85000,
  sea: 150000,
  swa: 230000,
  long: 360000,
};

const RANK: Record<Region, number> = { dom: 0, nea: 1, sea: 2, swa: 3, long: 4 };

for (const flight of FLIGHTS) {
  if (!AIRPORT[flight.from] || !AIRPORT[flight.to]) {
    throw new Error(`알 수 없는 공항: ${flight.id}`);
  }
}

function round500(n: number): number {
  return Math.round(n / 500) * 500;
}

function hash32(value: string): number {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function peakCalendar(from: Airport, to: Airport): PeakCal {
  if (from.region === "dom" && to.region === "dom") return "dom";
  if (from.americas) return "am";
  return "intl";
}

export function isPeak(date: string, from: Airport, to: Airport): boolean {
  return PEAK_DAYS[peakCalendar(from, to)].has(date);
}

function keEconomyOff(a: Region, b: Region): number {
  if (a === "dom" && b === "dom") return 5000;
  if (a === "dom") return keFromKorea(b);
  if (b === "dom") return keFromKorea(a);
  const key = RANK[a] <= RANK[b] ? `${a}-${b}` : `${b}-${a}`;
  const table: Record<string, number> = {
    "nea-nea": 20000,
    "nea-sea": 25000,
    "nea-swa": 30000,
    "nea-long": 35000,
    "sea-sea": 20000,
    "sea-swa": 35000,
    "sea-long": 42500,
    "swa-swa": 25000,
    "swa-long": 45000,
    "long-long": 35000,
  };
  return table[key] ?? 35000;
}

function keFromKorea(region: Region): number {
  if (region === "dom") return 5000;
  if (region === "nea") return 15000;
  if (region === "sea") return 20000;
  if (region === "swa") return 25000;
  return 35000;
}

function keOff(yOff: number, cabin: CabinCode): number | null {
  if (cabin === "y") return yOff;
  if (cabin === "j") {
    if (yOff >= 35000) return round500(yOff * (62500 / 35000));
    return yOff * 2;
  }
  if (yOff < 15000) return null;
  if (yOff >= 35000) return round500(yOff * (80000 / 35000));
  if (yOff >= 25000) return 70000;
  if (yOff >= 20000) return 65000;
  return 50000;
}

const OZ_OFF: Record<Region, Record<CabinCode, number | null>> = {
  dom: { y: 5000, j: 6000, f: null },
  nea: { y: 15000, j: 22500, f: 25000 },
  sea: { y: 20000, j: 30000, f: 35000 },
  swa: { y: 25000, j: 37500, f: 45000 },
  long: { y: 35000, j: 52500, f: 62500 },
};

function farther(a: Region, b: Region): Region {
  return RANK[a] >= RANK[b] ? a : b;
}

export function awardMiles(
  airline: Airline,
  from: Airport,
  to: Airport,
  cabin: CabinCode,
  peak: boolean,
): number | null {
  let off: number | null;
  if (airline === "KE") off = keOff(keEconomyOff(from.region, to.region), cabin);
  else off = OZ_OFF[farther(from.region, to.region)][cabin];
  if (off == null) return null;
  if (!peak) return off;
  if (airline === "KE" && cabin === "j" && off === 62500) return 92500;
  return round500(off * 1.5);
}

export function awardTax(from: Airport, to: Airport): number {
  return TAX[farther(from.region, to.region)];
}

function offers(flight: Flight, cabin: CabinCode): boolean {
  if (cabin === "y") return flight.y;
  if (cabin === "j") return flight.j;
  return flight.f;
}

function awardSeats(
  flight: Flight,
  date: string,
  cabin: CabinCode,
  daysOut: number,
  peak: boolean,
  domestic: boolean,
): number {
  if (cabin === "j" && !flight.j) return 0;
  if (cabin === "f" && !flight.f) return 0;
  const h = hash32(`${flight.id}|${date}|${cabin}`);
  const roll = h % 1000;
  const dow = isoDow(date);
  let chance = cabin === "y" ? 240 : cabin === "j" ? 110 : 70;
  if (domestic && cabin === "y") chance = 480;
  if (dow === 2 || dow === 3) chance += 50;
  if (dow >= 5) chance -= 40;
  if (peak) chance -= cabin === "y" ? 70 : 35;
  if (daysOut < 18) chance -= 100;
  else if (daysOut < 40) chance -= 30;
  else if (daysOut > 300) chance += 25;
  chance = Math.max(35, Math.min(900, chance));
  if (roll >= chance) return 0;
  if (cabin === "y") return 1 + (h % (peak ? 4 : 7));
  if (cabin === "j") return 1 + ((h >>> 8) % (peak ? 2 : 4));
  return 1 + ((h >>> 8) % (peak ? 1 : 2));
}

function offerFor(
  flight: Flight,
  date: string,
  cabin: CabinCode,
  peak: boolean,
  daysOut: number,
  pax: number,
  from: Airport,
  to: Airport,
  domestic: boolean,
): CabinOffer | null {
  if (cabin === "j" && !flight.j) return null;
  if (cabin === "f" && !flight.f) return null;
  const miles = awardMiles(flight.airline, from, to, cabin, peak);
  if (miles == null) return null;
  const seats = awardSeats(flight, date, cabin, daysOut, peak, domestic);
  return { miles, seats, tax: awardTax(from, to), enough: seats >= pax };
}

function segmentOf(flight: Flight, date: string): Segment {
  return {
    airline: flight.airline,
    flightNo: flight.no,
    from: flight.from,
    to: flight.to,
    dep: flight.dep,
    arr: flight.arr,
    plus: flight.plus,
    date,
    eq: flight.eq,
    eqName: EQ_NAME[flight.eq] ?? flight.eq,
  };
}

function summarize(cabins: Record<CabinCode, CabinOffer | null>, pax: number): boolean {
  return CABINS.some((c) => (cabins[c]?.seats ?? 0) >= pax);
}

function makeNonstop(
  flight: Flight,
  date: string,
  peak: boolean,
  daysOut: number,
  pax: number,
  from: Airport,
  to: Airport,
): Itinerary {
  const domestic = from.region === "dom" && to.region === "dom";
  const cabins = {
    y: offerFor(flight, date, "y", peak, daysOut, pax, from, to, domestic),
    j: offerFor(flight, date, "j", peak, daysOut, pax, from, to, domestic),
    f: offerFor(flight, date, "f", peak, daysOut, pax, from, to, domestic),
  };
  return {
    id: `${flight.id}@${date}`,
    airline: flight.airline,
    stops: 0,
    segments: [segmentOf(flight, date)],
    durationMin: flownMinutes(flight),
    layoverMin: null,
    cabins,
    anySeats: summarize(cabins, pax),
  };
}

function makeConnection(
  first: Flight,
  second: Flight,
  date: string,
  secondDate: string,
  layoverMin: number,
  peak: boolean,
  daysOut: number,
  pax: number,
  from: Airport,
  to: Airport,
): Itinerary {
  const domestic = from.region === "dom" && to.region === "dom";
  const primary = flownMinutes(first) >= flownMinutes(second) ? first : second;
  const feeder = primary === first ? second : first;
  const primaryDate = primary === first ? date : secondDate;
  const feederDate = feeder === first ? date : secondDate;
  const cabins = {} as Record<CabinCode, CabinOffer | null>;
  for (const cabin of CABINS) {
    const miles = awardMiles(first.airline, from, to, cabin, peak);
    if (miles == null) {
      cabins[cabin] = null;
      continue;
    }
    if (cabin !== "y" && !offers(primary, cabin)) {
      cabins[cabin] = null;
      continue;
    }
    const feederCabin: CabinCode = cabin !== "y" && offers(feeder, cabin) ? cabin : "y";
    const primarySeats = awardSeats(primary, primaryDate, cabin, daysOut, peak, domestic);
    const feederSeats = awardSeats(feeder, feederDate, feederCabin, daysOut, peak, domestic);
    const seats = Math.min(primarySeats, feederSeats);
    cabins[cabin] = {
      miles,
      seats,
      tax: awardTax(from, to),
      enough: seats >= pax,
    };
  }
  return {
    id: `${first.id}+${second.id}@${date}`,
    airline: first.airline,
    stops: 1,
    segments: [segmentOf(first, date), segmentOf(second, secondDate)],
    durationMin: Math.max(flownMinutes(first) + layoverMin + flownMinutes(second), 0),
    layoverMin,
    cabins,
    anySeats: summarize(cabins, pax),
  };
}

function flownMinutes(flight: Flight): number {
  return blockMinutes(flight.dep, flight.arr, flight.plus, tzOf(flight.from), tzOf(flight.to));
}

function operates(flight: Flight, date: string): boolean {
  return flight.days.includes(isoDow(date));
}

function buildDay(
  from: string,
  to: string,
  date: string,
  input: SearchInput,
  nonstopExists: boolean,
): DayResult {
  const origin = AIRPORT[from];
  const dest = AIRPORT[to];
  const peak = isPeak(date, origin, dest);
  const daysOut = dayIndex(date) - dayIndex(input.today);
  const itineraries: Itinerary[] = [];
  for (const flight of flightsBetween(from, to, input.airline)) {
    if (!operates(flight, date)) continue;
    itineraries.push(makeNonstop(flight, date, peak, daysOut, input.pax, origin, dest));
  }
  if (!input.directOnly && !nonstopExists) {
    for (const hub of ["ICN", "GMP"]) {
      if (hub === from || hub === to) continue;
      const firsts = flightsBetween(from, hub, input.airline).filter((f) => operates(f, date));
      for (const first of firsts) {
        const arrAbs = absMinutes(addDays(date, first.plus), first.arr);
        for (const extra of [0, 1]) {
          const secondDate = addDays(date, extra);
          const seconds = flightsBetween(hub, to, input.airline).filter(
            (f) => f.airline === first.airline && operates(f, secondDate),
          );
          for (const second of seconds) {
            const lay = absMinutes(secondDate, second.dep) - arrAbs;
            const mct = origin.region === "dom" && dest.region === "dom" ? 45 : 90;
            if (lay < mct || lay > 16 * 60) continue;
            itineraries.push(
              makeConnection(first, second, date, secondDate, lay, peak, daysOut, input.pax, origin, dest),
            );
          }
        }
      }
    }
  }
  itineraries.sort((a, b) => {
    if (a.anySeats !== b.anySeats) return a.anySeats ? -1 : 1;
    if (a.stops !== b.stops) return a.stops - b.stops;
    return a.segments[0].dep.localeCompare(b.segments[0].dep);
  });
  const best = { y: null, j: null, f: null } as Record<CabinCode, CabinBest>;
  for (const cabin of CABINS) {
    let miles = Infinity;
    let seats = 0;
    for (const itin of itineraries) {
      const offer = itin.cabins[cabin];
      if (!offer?.enough) continue;
      miles = Math.min(miles, offer.miles);
      seats = Math.max(seats, offer.seats);
    }
    if (seats > 0 && miles < Infinity) best[cabin] = { miles, seats };
  }
  return {
    date,
    peak,
    operates: itineraries.length > 0,
    anySeats: itineraries.some((itin) => itin.anySeats),
    best,
    itineraries,
  };
}

function buildDirection(from: string, to: string, input: SearchInput): DirectionResult {
  const days = new Map<string, DayResult>();
  const nonstop = flightsBetween(from, to, input.airline).length > 0;
  let seatDays = 0;
  let operateDays = 0;
  for (let i = 0; i <= HORIZON_DAYS; i++) {
    const date = addDays(input.today, i);
    const day = buildDay(from, to, date, input, nonstop);
    days.set(date, day);
    if (day.operates) operateDays += 1;
    if (day.anySeats) seatDays += 1;
  }
  return { days, seatDays, operateDays, nonstop };
}

export function searchAwards(input: SearchInput): SearchResult {
  const outbound = buildDirection(input.from, input.to, input);
  const inbound = input.roundTrip ? buildDirection(input.to, input.from, input) : null;
  return { outbound, inbound };
}

export function cabinName(airline: Airline | "all", cabin: CabinCode): string {
  if (cabin === "y") return "일반석";
  if (cabin === "j") return airline === "OZ" ? "비즈니스" : airline === "KE" ? "프레스티지" : "비즈";
  return airline === "OZ" ? "스마티움" : airline === "KE" ? "일등석" : "일등·스마";
}

export function firstSeatDate(days: Map<string, DayResult>, month: string, notBefore?: string): string | null {
  let found: string | null = null;
  for (const [date, day] of days) {
    if (!date.startsWith(month)) continue;
    if (notBefore && date < notBefore) continue;
    if (!day.anySeats) continue;
    if (!found || date < found) found = date;
  }
  return found;
}
