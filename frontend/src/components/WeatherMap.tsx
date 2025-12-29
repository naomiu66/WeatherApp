import { MapContainer, TileLayer } from "react-leaflet";
import type { WeatherMapProps } from "../types/components/WeatherMapProps";
import "leaflet/dist/leaflet.css";

export const WeatherMap = ({ lat, lon }: WeatherMapProps) => {
  const position: [number, number] = [lat, lon];

  return (
    <div style={{ 
      width: "100%", 
      height: "200px",
      border: "3px solid #212121" }}>
      <MapContainer
        center={position}
        zoom={10}
        style={{ width: "100%", height: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};

export default WeatherMap;
