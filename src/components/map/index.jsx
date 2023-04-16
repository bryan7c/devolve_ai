import { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";

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
    zoom={3}
    style={{ height: "100%", width: "100%" }}
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={initialPosition} />
    {locations.map((location, index) => (
      <Marker key={index} position={location.coords}>
        <Popup>{location.text}</Popup>
      </Marker>
    ))}
  </MapContainer>
  )
};

export default Map;
