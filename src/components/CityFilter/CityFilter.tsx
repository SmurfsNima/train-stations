type Props = {
  cities: string[];
  value: string;
  onChange: (city: string) => void;
};

export function CityFilter({ cities, value, onChange }: Props) {
  return (
    <div className="flex items-center justify-center  gap-2">
      <span className="hidden sm:inline text-sm text-slate-600">City</span>

      <div className="relative">
        <select
          className="
            appearance-none rounded-xl border border-slate-200 bg-white
            px-3 py-2 pr-9 text-sm text-slate-900 shadow-sm
            transition-all duration-200
            hover:border-slate-300 hover:shadow
            focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500
          "
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="City filter"
        >
          <option value="">All cities</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* chevron */}
        <svg
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* Clear button with tiny slide/fade */}
      <button
        className={[
          "rounded-xl px-3 py-2 text-sm font-medium",
          "transition-all duration-200",
          value
            ? "block translate-x-0 bg-slate-900 text-white hover:bg-slate-800 shadow-sm"
            : "hidden -translate-x-1 pointer-events-none bg-transparent text-transparent",
        ].join(" ")}
        onClick={() => onChange("")}
        type="button"
      >
        Clear
      </button>
    </div>
  );
}
