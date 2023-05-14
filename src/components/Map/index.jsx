import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";

function Map({
  manualOrigin = null,
  locations,
  destination,
  loadScript,
  originChanged = () => {},
}) {
  const [origin, setOrigin] = useState(null);
  const [directions, setDirections] = useState(null);
  const [map, setMap] = useState(null);

  const onLoad = useCallback(
    function loadCallback(map) {
      if (manualOrigin) {
        const { lat, lng } = manualOrigin;
        setTimeout(() => {
          setMapOrigin(map, lat, lng);
          if (destination) {
            setMapDirection(manualOrigin, destination);
          }
        }, 0);
        return;
      }

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          setMapOrigin(map, latitude, longitude);
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    },
    [manualOrigin]
  );

  const setMapOrigin = (map, lat, lng) => {
    const pos = new window.google.maps.LatLng(lat, lng);
    setOrigin({ lat, lng });
    originChanged({ lat, lng });
    map.setCenter(pos);
    map.setZoom(15);
  };

  const setMapDirection = async (origin, destination) => {
    if (window.google && origin && destination) {
      const directionsService = new window.google.maps.DirectionsService();
      try {
        const response = await directionsService.route({
          origin: origin,
          destination: destination,
          travelMode: "DRIVING",
        });
        if (response.status === "OK") {
          setDirections(response);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const onDirectionsChanged = () => {
    setDirections(null);
    setMapDirection(origin, destination);
  };

  useEffect(() => {
    onDirectionsChanged();
  }, [destination]);

  return (
    <>
      {loadScript ? (
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "100%",
          }}
          onLoad={onLoad}
          zoom={10}
          onUnmount={onUnmount}
        >
          {!destination && locations &&
            locations.length > 0 &&
            locations.map((location, index) => (
              <Marker
                key={index}
                position={{ lat: location.lat, lng: location.lng }}
              />
            ))}
          {!destination && origin && <Marker position={{ lat: origin.lat, lng: origin.lng }} />}
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

export default Map;
