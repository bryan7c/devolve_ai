import { useState } from "react";
import Head from "next/head";
import { InternalLayout } from "@/src/layout/internalLayout";
import { useRouter } from "next/router";
import { Grid, Paper, Typography, Button, Box } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import dynamic from "next/dynamic";
import { useLoadScript } from "@react-google-maps/api";
import ProfileFeedback from "@/src/components/Profile/ProfileFeedback";

const Map = dynamic(() => import("@/src/components/Map/index"), { ssr: false });

export async function getServerSideProps({ query }) {
  const id = query.id.toString();
  const baseUrl = process.env.API_URL;
  const googleKey = process.env.GOOGLE_MAP_KEY;
  const url = `${baseUrl}/returned?id=${id}`;
  const returnedItem = await fetch(url).then((response) => response.json());

  return {
    props: {
      returnedItem: returnedItem[0],
      googleKey,
    },
  };
}

const libraries = ["places"];
function ReturnedPage({ returnedItem, googleKey }) {
  const [returnedItemDate, setReturnedItemDate] = useState(
    dayjs(returnedItem.dataLimite)
  );
  const [locations, setLocations] = useState([]);
  const [destination, setDestination] = useState(returnedItem.coordenadas);
  const router = useRouter();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleKey,
    libraries: libraries,
    id: "google-map-script",
  });

  return (
    <>
      <Head>
        <title>Acompanhando a devolução {returnedItem.titulo}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container minHeight={"100vh"} sx={{border: "solid 1px red"}}>
        <Grid item xs={12} sx={{border: "solid 1px red"}}>
          <Map
            locations={locations}
            destination={destination}
            isLoaded={isLoaded}
          />
        </Grid>
        <Grid container item xs={12} alignContent="center" sx={{border: "solid 1px red"}}>
          <Grid item xs={4} sx={{border: "solid 1px red"}}>
            <ProfileFeedback title={"Bryan Marvila"} rating={3.5} img={"/img/jose.png"} />
          </Grid>
          <Grid container item flexDirection="column" xs justifyContent="center" sx={{border: "solid 1px red"}}>
            <Typography>O devolvedor chegará em</Typography>
            <Typography display="inline" sx={{fontSize: "2em", fontWeight: "bolder"}} color="primary">20<Typography display="inline">min</Typography></Typography>
            
          </Grid>
          <Grid container item xs="auto" alignContent="center" sx={{border: "solid 1px red"}}>
            <Button>
              ENVIAR MENSAGEM
            </Button>
            <Button
              variant="contained"
              color="warning"
            >
              CANCELAR ENTREGA
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
ReturnedPage.PageLayout = InternalLayout;

export default ReturnedPage;
