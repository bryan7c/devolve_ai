import React, { useState } from "react";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import { InputBase } from "@mui/material";

function AutoCompleteLocation({placeholder}) {
  const [searchResult, setSearchResult] = useState("Result: none");

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDEI0-FS-iJl25mu23dSfFLzodOZZ4Vr3k",
    libraries: ["places"]
  });

  function onLoad(autocomplete) {
    setSearchResult(autocomplete);
  }

  function onPlaceChanged() {
    if (searchResult != null) {
      const place = searchResult.getPlace();
      const name = place.name;
      const status = place.business_status;
      const formattedAddress = place.formatted_address;
      // console.log(place);
      console.log(`Name: ${name}`);
      console.log(`Business Status: ${status}`);
      console.log(`Formatted Address: ${formattedAddress}`);
    } else {
      alert("Please enter text");
    }
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
        <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
          <InputBase placeholder={placeholder} />
        </Autocomplete>
  );
}

export default AutoCompleteLocation;
