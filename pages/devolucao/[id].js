import { useState, useEffect } from "react";
import Head from "next/head";
import { InternalLayout } from "@/src/layout/internalLayout";
import { useRouter } from "next/router";
import { getReturnedItems } from "@/src/services/ReturnedService";
import {
  Button,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import dynamic from "next/dynamic";
import { geocode } from "nominatim-browser";
import {
  MapResultContainer,
  MapResultItem,
} from "@/src/components/map/locationResultItem";
const Map = dynamic(() => import("@/src/components/map/index"), { ssr: false });

export async function getServerSideProps({query}) {
  const id = query.id.toString();
  const baseUrl = process.env.API_URL;
  const url = `${baseUrl}/returned?id=${id}`;
  const returnedItem = await fetch(url).then(response => (response.json()))

  return {
      props: {
        returnedItem,
      }
  }
}


function ReturnedPage({returnedItem}) {
  const [searchValue, setSearchValue] = useState("");
  const [returnedItemDate, setReturnedItemDate] = useState(dayjs(new Date()));
  const [results, setResults] = useState([]);
  const [locations, setLocations] = useState([]);
  const [destination, setDestination] = useState(null);

  const handleSearchSubmit = async () => {
    if (searchValue) {
      const response = await geocode({ street: searchValue });
      setResults(response);
      setLocations(
        response.map((locationItem) => ({
          text: locationItem.display_name,
          coords: [locationItem.lat, locationItem.lon],
        }))
      );
    }
  };

  const flyToLocation = (coords) => {
    setDestination(coords);
  };

  return (
    <>
      <Head>
        <title>Editando devolução</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Paper
        elevation={3}
        sx={{
          p: "1em",
          height: "100%",
        }}
      >
        <Grid container spacing={2} sx={{ height: "100%" }}>
          <Grid item xs={12}>
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <Search />
            </IconButton>
            <InputBase
              placeholder="Pesquisar devolução"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearchSubmit();
                }
              }}
            />
          </Grid>
          <Grid container item xs={12} spacing={2} height={600}>
            <Grid container item xs={2}>
              <MapResultContainer>
                {results.map((result) => (
                  <MapResultItem
                    key={result.place_id}
                    onClick={() => flyToLocation([result.lat, result.lon])}
                    groupName={"returnedLoc"}
                    title={result.display_name}
                    subtitle='R$14,20'
                  />
                ))}
              </MapResultContainer>
              {JSON.stringify(returnedItem.dataLimite)}
              <Grid item xs={12}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="pt-br"
                >
                  <DatePicker
                    label="Data limite"
                    onChange={(newDate) => setReturnedItemDate(newDate)}
                    value={returnedItemDate}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <Button xs={12} variant="contained" size="large" color="info">
                  CRIAR DEVOLUÇAO
                </Button>
              </Grid>
            </Grid>
            <Grid item sx={{ flex: 1 }}>
              <Map locations={locations} destination={destination} />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
ReturnedPage.PageLayout = InternalLayout;

export default ReturnedPage;