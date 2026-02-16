import type { Station } from "../types";

const STATIONS_URL =
  "https://gist.githubusercontent.com/neysidev/bbd40032f0f4e167a1e6a8b3e99a490c/raw/fc7dc242f41393845d90edaa99e32e28f1ddfe24/train-stations.json";

function isStation(x: any): x is Station {
  return (
    x &&
    typeof x.id === "number" &&
    typeof x.name === "string" &&
    typeof x.city === "string" &&
    typeof x.lat === "number" &&
    typeof x.lng === "number"
  );
}

export async function fetchStations(signal?: AbortSignal): Promise<Station[]> {
  const res = await fetch(STATIONS_URL, { signal });
  if (!res.ok) {
    throw new Error(`Failed to fetch stations: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  if (!Array.isArray(data) || !data.every(isStation)) {
    throw new Error("Invalid stations payload");
  }
  return data;
}
