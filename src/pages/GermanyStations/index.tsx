import { useEffect, useMemo, useState } from "react";
import "leaflet/dist/leaflet.css";
import type { Station } from "../../types";
import { fetchStations } from "../../api/stations";
import { CityFilter } from "../../components/CityFilter/CityFilter";
import { StationsList } from "../../components/StationsList/StationsList";
import { StationsMap } from "../../components/StationsMap/StationsMap";

type LoadState =
  | { status: "idle" | "loading" }
  | { status: "error"; message: string }
  | { status: "success"; stations: Station[] };

export default function GermanyStations() {
  const [state, setState] = useState<LoadState>({ status: "idle" });
  const [city, setCity] = useState<string>("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setState({ status: "loading" });
    fetchStations(controller.signal)
      .then((stations) => setState({ status: "success", stations }))
      .catch((e: any) => {
        if (e?.name === "AbortError") return;
        setState({ status: "error", message: e?.message ?? "Unknown error" });
      });

    return () => controller.abort();
  }, []);

  const stations = state.status === "success" ? state.stations : [];

  const cities = useMemo(() => {
    const set = new Set(stations.map((s) => s.city));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [stations]);

  const filteredStations = useMemo(() => {
    const list = city ? stations.filter((s) => s.city === city) : stations;
    // if selected station disappears due to filtering, clear selection
    if (selectedId != null && !list.some((s) => s.id === selectedId)) {
      setSelectedId(null);
    }
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stations, city]);

  const onSelect = (s: Station) => setSelectedId(s.id);

  return (
    <div className=" h-screen bg-slate-50 ">
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
        <div className=" px-4 py-4 flex w-full items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 shadow-sm" />
            <div>
              <h1 className="text-base sm:text-lg font-semibold tracking-tight text-slate-900">
                PANTOhealth <span className="text-slate-400">—</span>{" "}
                <span className="text-slate-700">Train Stations</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-600">
                Map • Stations list • City filter
              </p>
            </div>
          </div>

          <div className="">
            <CityFilter cities={cities} value={city} onChange={setCity} />
          </div>
        </div>
      </header>

      <main className="w-full h-full px-4 py-6">
        {state.status === "loading" ? (
          <div className="rounded-xl border bg-white p-6">
            Loading stations…
          </div>
        ) : null}

        {state.status === "error" ? (
          <div className="rounded-xl border bg-white p-6">
            <div className="font-semibold text-red-600">Error</div>
            <div className="text-sm text-slate-700">{state.message}</div>
            <button
              className="mt-3 rounded-lg border px-3 py-2 text-sm"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </div>
        ) : null}

        {state.status === "success" ? (
          <div className="flex h-[calc(100vh-110px)]  gap-6 ">
            <div className="w-full lg:w-[360px]">
              <StationsList
                stations={filteredStations}
                selectedId={selectedId}
                onSelect={onSelect}
              />
            </div>
            <div className="w-full">
              <StationsMap
                stations={filteredStations}
                selectedId={selectedId}
                onMarkerClick={onSelect}
              />
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
