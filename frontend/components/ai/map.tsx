"use client";

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

interface Props {
  lat: number;
  lng: number;
  address: string;
}

const markerIcon = new L.Icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function ChangeView({
  center,
}: {
  center: [number, number];
}) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, 18, {
      duration: 1.5,
    });
  }, [center, map]);

  return null;
}

export default function Map({
  lat,
  lng,
  address,
}: Props) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={18}
      scrollWheelZoom
      className="h-full w-full rounded-3xl"
    >
      <ChangeView center={[lat, lng]} />

      <TileLayer
        attribution="OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker
        position={[lat, lng]}
        icon={markerIcon}
      >
        <Popup>
          <div className="space-y-2">

            <h3 className="font-bold">

              📍 Report Location

            </h3>

            <p>{address}</p>

          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}