import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { InputBase } from "@mui/material";

function AutoCompleteLocation({
  placeholder,
  onPlaceChanged,
  isLoaded,
  onResult,
  origin,
}) {
  const [searchResult, setSearchResult] = useState(null);

  function onLoad(autocomplete) {
    setSearchResult(autocomplete);
  }

  async function handlePlaceChanged() {
    if (searchResult != null) {
      const place = searchResult.getPlace();
      if (place.place_id) {
        const location = await getDetailById(place.place_id);
        onPlaceChanged(location);
      }
    }
  }

  function getDetailById(placeId) {
    return new Promise((resolve, reject) => {
      const service = new window.google.maps.places.PlacesService(document.createElement("div"));
      service.getDetails({ placeId }, (placeResult, status) => {
        if (status !== window.google.maps.places.PlacesServiceStatus.OK)
          return reject(status);

        const { lat, lng } = placeResult.geometry.location.toJSON();
        const distance = new google.maps.DistanceMatrixService();
        
        distance.getDistanceMatrix({
            origins: [{ lat, lng }],
            destinations: [{ lat: origin.lat, lng: origin.lng }],
            travelMode: "DRIVING",
          })
          .then((response) => {
            const locationDuration = response.rows[0].elements[0].duration || null;
            const locationDistance = response.rows[0].elements[0].distance || null;
            
            resolve({
              lat,
              lng,
              formatted_address: placeResult.formatted_address,
              name: placeResult.name,
              place_id: placeResult.place_id,
              duration: locationDuration,
              distance: locationDistance,
            });
          })
          .catch((error) => {
            reject(error);
          });
      });
    });
  }

  function handleSearchKeyDown(event) {
    if (event.key !== "Enter") return;

    const query = event.target.value;
    const service = new window.google.maps.places.AutocompleteService();
    service.getPlacePredictions(
      { input: query },
      (predictions) => {
        const promises = predictions.map((prediction) => {
          return getDetailById(prediction.place_id);
        });

        Promise.all(promises)
          .then((results) => onResult(results))
          .catch((status) => console.log(status));
      }
    );
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Autocomplete onPlaceChanged={handlePlaceChanged} onLoad={onLoad}>
      <InputBase
        placeholder={placeholder}
        onKeyDown={handleSearchKeyDown}
        fullWidth
      />
    </Autocomplete>
  );
}

export default AutoCompleteLocation;
