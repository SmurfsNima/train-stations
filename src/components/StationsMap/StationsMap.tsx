import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from 'leaflet';
import type { Station } from "../../types";

function pinSvg(color: string) {
  // simple pin SVG as a data URI (no external assets)
  const svg = encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24">
    <path fill="${color}" d="M12 2c-3.9 0-7 3.1-7 7c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5S14.5 7.6 14.5 9S13.4 11.5 12 11.5z"/>
  </svg>`);
  return `data:image/svg+xml,${svg}`;
}

const defaultIcon = new L.Icon({
  iconUrl: pinSvg("#2563eb"),
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -28],
});

const selectedIcon = new L.Icon({
  iconUrl: pinSvg("#dc2626"),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function FlyToSelected({ selected }: { selected: Station | null }) {
  const map = useMap();

  useEffect(() => {
    if (!selected) return;
    map.flyTo([selected.lat, selected.lng], 12, { duration: 0.8 });
  }, [map, selected]);

  return null;
}

type Props = {
  stations: Station[];
  selectedId: number | null;
  onMarkerClick: (station: Station) => void;
};

export function StationsMap({ stations, selectedId, onMarkerClick }: Props) {
  const selected = useMemo(
    () => stations.find((s) => s.id === selectedId) ?? null,
    [stations, selectedId]
  );

  return (
    <div className=" h-full rounded-xl border overflow-hidden bg-white">
      <MapContainer
        center={[51.1657, 10.4515]} // Germany center-ish
        zoom={6}
        scrollWheelZoom
      >
        <FlyToSelected selected={selected} />
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {stations.map((s) => (
          <Marker
            key={s.id}
            position={[s.lat, s.lng]}
            icon={s.id === selectedId ? selectedIcon : defaultIcon}
            eventHandlers={{
              click: () => onMarkerClick(s),
            }}
          >
            <Popup>
              <div className="font-semibold">{s.name}</div>
              <div>{s.city}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
