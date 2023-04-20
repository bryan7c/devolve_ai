import { formatDate } from "@/src/utils/date";
import { Card, CardHeader, CardContent, Typography, Grid, Chip } from "@mui/material";
import returnedItemStyle from "./Returned.module.css";

function CardReturnedItem({ returnedItem, action }) {
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
            <Grid item xs={12}>
              <Typography
                margin=".7em 0"
                textAlign="center"
                color="text.secondary"
                fontSize="20px"
                fontWeight={600}
              >
                {formatDate(returnedItem.dataLimite, {separator:' - ', monthString: true})}
              </Typography>
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
