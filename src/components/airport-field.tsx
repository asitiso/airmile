import { useEffect, useMemo, useState } from "react";
import { AIRPORTS, AIRPORT, POPULAR } from "@/data/airports";

type Props = {
  label: string;
  value: string;
  exclude?: string;
  onChange: (code: string) => void;
};

export function AirportField({ label, value, exclude, onChange }: Props) {
  const selected = AIRPORT[value];
  const [text, setText] = useState(selected ? labelOf(value) : "");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setText(labelOf(value));
  }, [value]);

  const results = useMemo(() => {
    const q = text.trim().toLowerCase();
    const pool =
      !open || q === "" || q === labelOf(value).toLowerCase()
        ? AIRPORTS.filter((a) => POPULAR.includes(a.code))
        : AIRPORTS.filter((a) => {
            const blob = `${a.code} ${a.city} ${a.airport} ${a.country} ${a.en}`.toLowerCase();
            return blob.includes(q);
          });
    return pool.slice(0, 12);
  }, [open, text, value]);

  return (
    <label className="relative block min-w-0 flex-1">
      <span className="mb-1 block text-xs font-medium text-muted">{label}</span>
      <input
        value={text}
        aria-label={label}
        autoComplete="off"
        className="h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink outline-none focus:ring-2 focus:ring-accent"
        onFocus={() => setOpen(true)}
        onBlur={() => {
          setOpen(false);
          setText(labelOf(value));
        }}
        onChange={(e) => {
          setText(e.target.value);
          setOpen(true);
        }}
      />
      {open && results.length > 0 && (
        <ul className="absolute z-20 mt-1 max-h-64 w-full overflow-auto rounded-lg border border-line bg-surface py-1 shadow-sm">
          {results.map((a) => {
            const blocked = a.code === exclude;
            return (
              <li key={a.code}>
                <button
                  type="button"
                  disabled={blocked}
                  className="flex min-h-11 w-full items-center justify-between gap-3 px-3 text-left text-sm disabled:cursor-not-allowed disabled:opacity-40"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    if (blocked) return;
                    onChange(a.code);
                    setText(labelOf(a.code));
                    setOpen(false);
                  }}
                >
                  <span>
                    <span className="font-medium">{a.city}</span>
                    <span className="text-muted"> {a.airport}</span>
                  </span>
                  <span className="text-xs text-muted">
                    {a.code} · {a.country}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </label>
  );
}

function labelOf(code: string): string {
  const a = AIRPORT[code];
  if (!a) return code;
  return `${a.city} ${a.airport} (${a.code})`;
}
