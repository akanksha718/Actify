"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

interface Report {
  id: string;
  latitude: number;
  longitude: number;
  address: string;
  category: string;
  severity: string;
}

const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function MultiMap({
  reports,
}: {
  reports: Report[];
}) {
  if (reports.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        No Reports
      </div>
    );
  }

  const center: [number, number] = [
    reports[0].latitude,
    reports[0].longitude,
  ];

  return (
    <MapContainer
      center={center}
      zoom={12}
      className="h-full w-full"
      scrollWheelZoom
    >
      <TileLayer
        attribution="OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {reports.map((report) => (
        <Marker
          key={report.id}
          position={[report.latitude, report.longitude]}
          icon={redIcon}
        >
          <Popup>

            <div>

              <h3 className="font-bold">
                {report.category}
              </h3>

              <p>{report.address}</p>

              <p>
                Severity: {report.severity}
              </p>

            </div>

          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}