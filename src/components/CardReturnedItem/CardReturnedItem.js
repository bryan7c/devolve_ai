import { formatDate } from "@/src/utils/date";
import { Card, CardHeader, CardContent, Typography, Grid, Chip, IconButton, Button } from "@mui/material";
import returnedItemStyle from "./Returned.module.css";
import { LocationOn } from "@mui/icons-material";
import { useRouter } from "next/router";

function CardReturnedItem({ returnedItem, action }) {
  const router = useRouter();
  const getColor = (status) => {
    switch (status.toLowerCase()) {
      case "em andamento":
        return "info";
      case "finalizado":
        return "success";
      default:
        return "secondary";
    }
  };

  function trackReturn(returnedItemId) {
    router.push(`/acompanhar/${returnedItemId}`)
  }

  return (
    <Grid item xs={12} sm={6} md={3} lg={2}>
      <Card>
        <CardHeader
          className={returnedItemStyle.MuiCardHeaderRoot}
          action={action}
          title={returnedItem.titulo}
        />
        <CardContent>
          <Grid container direction="column">
            <Grid item xs={12}>
              <Typography color="gray.main" fontSize="12px" fontWeight={100}>
                Status: {returnedItem.status}
              </Typography>
            </Grid>
            <Grid item xs={12} p={2} alignItems={"center"} container direction={"column"} alignContent={"stretch"}>
              {returnedItem.status == "Em andamento" ?
              <Button color="info" variant="outlined" onClick={() => trackReturn(returnedItem._id)} endIcon={<LocationOn />}>
                Acompanhar
              </Button> : 
              <Typography
                align="center"
                color="text.secondary"
                fontSize="20px"
                fontWeight={600}
              >
                {formatDate(returnedItem.dataLimite, {separator:' - ', monthString: true})}
              </Typography>
              }
            </Grid>
          </Grid>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Chip
                size="small"
                sx={{ height: 20, width: 50 }}
                color={getColor(returnedItem.status)}
                variant="solid"
              />
            </Grid>
            <Grid item>
              <Typography color="gray.main">
                {`R$ ${returnedItem.valor}`}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default CardReturnedItem;
