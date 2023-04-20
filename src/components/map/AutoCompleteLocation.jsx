import React, { useState } from "react";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import { InputBase } from "@mui/material";

function AutoCompleteLocation({
  placeholder,
  onPlaceChanged,
  isLoaded,
  onResult,
}) {
  const [searchResult, setSearchResult] = useState(null);

  function onLoad(autocomplete) {
    setSearchResult(autocomplete);
  }

  async function handlePlaceChanged() {
    if (searchResult != null) {
      const place = searchResult.getPlace();
      if (place.place_id) {
        const coord = await getCoordinates(place);
        onPlaceChanged(coord);
      }
    }
  }

  function getCoordinates(place) {
    return new Promise((resolve, reject) => {
      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );
      service.getDetails({ placeId: place.place_id }, (result, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const coord = result.geometry.location.toJSON();
          resolve(coord);
        } else {
          reject(
            new Error(`Failed to get coordinates for place ID ${place_id}`)
          );
        }
      });
    });
  }

  function handleSearchKeyDown(event) {
    if (event.key === "Enter") {
      const query = event.target.value;
      const service = new window.google.maps.places.AutocompleteService();
      service.getPlacePredictions({ input: query }, (predictions) => {
        const placesService = new window.google.maps.places.PlacesService(
          document.createElement("div")
        );
        const promises = predictions.map((prediction) => {
          return new Promise((resolve, reject) => {
            placesService.getDetails(
              { placeId: prediction.place_id },
              (placeResult, status) => {
                if (
                  status === window.google.maps.places.PlacesServiceStatus.OK
                ) {
                  const {lat, lng} = placeResult.geometry.location.toJSON();
                  resolve({
                    lat,
                    lng,
                    description: prediction.description,
                    name: placeResult.name,
                    place_id: placeResult.place_id,
                  });
                } else {
                  reject(status);
                }
              }
            );
          });
        });
        Promise.all(promises)
          .then((results) => {
            onResult(results);
          })
          .catch((status) => {
            console.log(status);
          });
      });
    }
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Autocomplete onPlaceChanged={handlePlaceChanged} onLoad={onLoad}>
      <InputBase placeholder={placeholder} onKeyDown={handleSearchKeyDown} />
    </Autocomplete>
  );
}

export default AutoCompleteLocation;
