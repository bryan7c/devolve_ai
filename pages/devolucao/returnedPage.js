import { useState } from "react";
import { InternalLayout } from "@/src/layout/internalLayout";
import { useRouter } from "next/router";
import {
  Button,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import dynamic from "next/dynamic";
import { useLoadScript } from "@react-google-maps/api";
import InputSearchLocation from "@/src/components/Autocomplete/InputSearchLocation";

const Map = dynamic(() => import("@/src/components/Map/index"), { ssr: false });

export function getServerSideProps() {
  const googleKey = process.env.GOOGLE_MAP_KEY;
  return {
    props: {
      googleKey,
    },
  };
}

const libraries = ["places"];
function ReturnedPage({ googleKey, returnedItem = null, onSave = () => {} }) {
  const router = useRouter();
  const [returnedItemDate, setReturnedItemDate] = useState(returnedItem ? dayjs(returnedItem.returnedItemDate) : dayjs(new Date()));
  const [titulo, setTitulo] = useState(returnedItem?.titulo ?? "");
  const [destino, setDestino] = useState(returnedItem?.destino ?? null);
  const [endereco, setEndereco] = useState(returnedItem?.destino.formatted_address ?? "");
  const [origem, setOrigem] = useState(returnedItem?.origem ?? null);
  const [status, setStatus] = useState(returnedItem?.status ?? "Aguardando");
  const [devolvedor, setDevolvedor] = useState(returnedItem?.devolvedor ?? null);
  const [usuario, setUsuario] = useState(returnedItem?.usuario ?? "6431d68e17fb52bbee2f6268");
  const [largura, setLargura] = useState(returnedItem?.largura ?? "");
  const [altura, setAltura] = useState(returnedItem?.altura ?? "");
  const [comprimento, setComprimento] = useState(returnedItem?.comprimento ?? "");
  const [peso, setPeso] = useState(returnedItem?.peso ?? "");
  const [codigo, setCodigo] = useState(returnedItem?.codigo ?? "");
  
  function handleSave() {
    let returnedObject = {
      titulo,
      dataLimite: returnedItemDate.$d,
      destino,
      origem,
      devolvedor,
      usuario,
      status,
      valor: getDistanceValue(destino?.duration?.value),
      largura,
      altura,
      comprimento,
      peso,
      codigo,
    };
    onSave(returnedObject);
  }

  function handleCancel() {
    router.back();
  }

  function onPlaceChanged(place) {
    if (titulo == "") setTitulo(place.name);
    setEndereco(place?.formatted_address);
    setDestino(place);
  }

  function getDistanceValue(duration) {
    if (duration == null) return "-";
    const cost = duration * 0.02;
    const formattedCost = cost > 5 ? cost : 5;
    return parseFloat(formattedCost.toFixed(2));
  }

  function formatValue(cost) {
    return cost.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleKey,
    libraries: libraries,
    id: "google-map-script",
  });

  return (
    <Paper
      elevation={3}
      sx={{
        p: "1em",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{ minHeight: "75vh", height: "100%" }}
        flexDirection={"column"}
      >
        <InputSearchLocation
          onPlaceChanged={onPlaceChanged}
          isLoaded={isLoaded}
          origin={origem}
        />
        <Grid container item xs>
          <Grid item xs pr={2}>
            <Map
              destination={destino}
              loadScript={isLoaded}
              manualOrigin={origem}
              originChanged={(currentLocation) => setOrigem(currentLocation)}
            />
          </Grid>
          <Grid container item lg={4} md={3} sm={12} flexDirection={"column"}>
            <Grid container item xs>
              <Grid item xs={12}>
                <TextField
                  id="returned-title"
                  label="Título"
                  fullWidth
                  value={titulo}
                  onChange={(event) => {
                    setTitulo(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="Endereço"
                  label="Endereço"
                  fullWidth
                  value={endereco}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="Number"
                  fullWidth
                  label="Largura"
                  id="outlined-end-adornment"
                  value={largura}
                  onChange={(event) => {
                    setLargura(event.target.value);
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">cm</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="Number"
                  fullWidth
                  label="Comprimento"
                  id="outlined-end-adornment"
                  value={comprimento}
                  onChange={(event) => {
                    setComprimento(event.target.value);
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">cm</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="Number"
                  fullWidth
                  label="Altura"
                  id="outlined-end-adornment"
                  value={altura}
                  onChange={(event) => {
                    setAltura(event.target.value);
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">cm</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="Number"
                  fullWidth
                  label="Peso"
                  id="outlined-end-adornment"
                  value={peso}
                  onChange={(event) => {
                    setPeso(event.target.value);
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">kg</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Código de devolução"
                  id="outlined-end-adornment"
                  value={codigo}
                  onChange={(event) => {
                    setCodigo(event.target.value);
                  }}
                />
              </Grid>
              <Grid item lg={6}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="pt-br"
                >
                  <DatePicker
                    label="Data limite"
                    onChange={(newDate) => setReturnedItemDate(newDate)}
                    value={returnedItemDate}
                    sx={{ width: "100%" }}
                    disablePast
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  Valor estimado: R${" "}
                  {formatValue(getDistanceValue(destino?.duration?.value))}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              lg={"auto"}
              justifyContent={"flex-end"}
              flexDirection={"row"}
            >
              <Grid item lg={4} md={12}>
                <Button
                  variant="text"
                  size="large"
                  color="gray"
                  onClick={handleCancel}
                  fullWidth
                >
                  CANCELAR
                </Button>
              </Grid>
              <Grid item lg={4} md={12}>
                <Button
                  variant="contained"
                  size="large"
                  color="info"
                  onClick={handleSave}
                  fullWidth
                >
                  SALVAR
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
ReturnedPage.PageLayout = InternalLayout;

export default ReturnedPage;
