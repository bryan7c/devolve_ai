import { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const center = {
  lat: -3.745,
  lng: -38.523
};

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDEI0-FS-iJl25mu23dSfFLzodOZZ4Vr3k'
  })

  const [map, setMap] = useState(null)

  const onLoad = useCallback(function callback(map) {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const bounds = new window.google.maps.LatLngBounds({lat: latitude, lng: longitude});
        map.fitBounds(bounds);
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }

    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={{width: '100%', height: '100%' }}
        center={center}
        zoom={5}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>
}


export default Map;
