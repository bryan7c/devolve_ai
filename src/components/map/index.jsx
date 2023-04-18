import React, { useState, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";


function MapWithSearch({ locations, destination, isLoaded }) {
  const [origin, setOrigin] = useState({ lat: -3.745, lng: -38.523});
  const [directions, setDirections] = useState(null);
  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const pos = new window.google.maps.LatLng(latitude, longitude);
        const marker = new window.google.maps.Marker({
          position: pos,
          map: map,
        });
        setOrigin({ lat: latitude, lng: longitude });
        map.setCenter(pos);
        map.setZoom(15);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const onDirectionsChanged = () => {
    setDirections(null);
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: "DRIVING",
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
        }
      }
    );
  };

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "100%",
          }}
          center={origin}
          onLoad={onLoad}
          zoom={10}
          onUnmount={onUnmount}
        >
          {locations &&
            locations.length > 0 &&
            locations.map((location, index) => (
              <Marker
                key={index}
                position={{ lat: location.lat, lng: location.lng }}
              />
            ))}
          {origin && <Marker position={{ lat: origin.lat, lng: origin.lng }} />}
          {destination && (
            <Marker
              position={{ lat: destination.lat, lng: destination.lng }}
              onLoad={onDirectionsChanged}
            />
          )}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      ) : (
        <></>
      )}
    </>
  );
}

export default MapWithSearch;
