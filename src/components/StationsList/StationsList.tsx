import type { Station } from "../../types";

type Props = {
  stations: Station[];
  selectedId: number | null;
  onSelect: (station: Station) => void;
};

export function StationsList({ stations, selectedId, onSelect }: Props) {
  return (
    <div className="rounded-xl border bg-white w-full h-full">
      <div className="border-b px-4 py-3">
        <div className="text-sm font-semibold">
          Stations <span className="text-slate-500">({stations.length})</span>
        </div>
      </div>

      <ul className="h-[95%] overflow-auto">
        {stations.map((s) => {
          const active = s.id === selectedId;
          return (
            <li key={s.id}>
              <button
                className={[
                  "w-full text-left px-4 py-3 hover:bg-slate-50",
                  active ? "bg-slate-100" : "",
                ].join(" ")}
                onClick={() => onSelect(s)}
              >
                <div className="font-medium">{s.name}</div>
                <div className="text-sm text-slate-600">{s.city}</div>
              </button>
            </li>
          );
        })}
        {stations.length === 0 ? (
          <li className="px-4 py-6 text-sm text-slate-600">
            No stations match this filter.
          </li>
        ) : null}
      </ul>
    </div>
  );
}
