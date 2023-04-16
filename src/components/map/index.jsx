import { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, Popup, useMap } from "react-leaflet";

const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Map = ({ locations }) => {
  const [initialPosition, setPosition] = useState([0, 0]);

  useEffect(() => {
    // Verifica se o navegador suporta a API de geolocalização
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setPosition([latitude, longitude]);
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
  <MapContainer
    center={initialPosition}
    zoom={13}
    style={{ height: "100%", width: "100%" }}
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <LocationMarker position={initialPosition} />
    {locations.map((location, index) => (
      <Marker key={index} position={location.coords}>
        <Popup>{location.text}</Popup>
      </Marker>
    ))}
  </MapContainer>
  )
};

function LocationMarker({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position[0] !== 0 && position[1] !== 0) {
      map.flyTo(position, map.getZoom());
    }
  }, [position]);

  return position === null ? null : (
    <Marker position={position} icon={redIcon}>
      <Popup>Você está aqui</Popup>
    </Marker>
  );
}

export default Map;
