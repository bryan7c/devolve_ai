import { useState } from "react";
import Head from "next/head";
import { InternalLayout } from "@/src/layout/internalLayout";
import { useRouter } from "next/router";
import { Grid, Typography, Button } from "@mui/material";
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
  const [locations, setLocations] = useState([]);
  const [destination, setDestination] = useState(returnedItem.coordenadas);
  const router = useRouter();

  function oncancel() {
    router.back();
  };

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
      <Grid container item minHeight={"75vh"} flexDirection={"column"}>
        <Grid item xs>
          <Map
            locations={locations}
            destination={destination}
            loadScript={isLoaded}
          />
        </Grid>
        <Grid
          container
          item
          xs={"auto"}
          alignContent="center"
          p={2}
          spacing={4}
        >
          <Grid item xs={"auto"}>
            <ProfileFeedback
              title={"Bryan Marvila"}
              rating={3.5}
              img={"/img/jose.png"}
            />
          </Grid>
          <Grid
            container
            item
            flexDirection="column"
            xs
            justifyContent="center"
          >
            <Grid item>
              <Typography>O devolvedor chegará em</Typography>
            </Grid>
            <Grid item>
              <Typography
                display="inline"
                sx={{ fontSize: "2em", fontWeight: "bolder" }}
                color="primary"
              >
                20
              </Typography>
              <Typography display="inline">min</Typography>
            </Grid>
          </Grid>
          <Grid container item xs="auto" alignContent="center">
            <Grid item>
              <Button>ENVIAR MENSAGEM</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="warning">
                CANCELAR ENTREGA
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
ReturnedPage.PageLayout = InternalLayout;

export default ReturnedPage;
