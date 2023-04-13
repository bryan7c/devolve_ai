import { formatDate } from "@/utils/date";
import {Card,CardHeader,CardContent,Typography,Grid, Chip} from "@mui/material";
import returnedItemStyle from "@/styles/Returned.module.css";

function CardReturnedItem({ returnedItem, action }) {
  const getColor = (status) => {
    switch (status.toLowerCase()) {
      case "andamento":
        return "primary";
      case "finalizado":
        return "success";
      default:
        return "warning"
    }
  }
  return (
    <Grid item xs={12} sm={6} md={3} lg={2}>
      <Card>
        <CardHeader
          className={returnedItemStyle.MuiCardHeaderRoot}
          action={ action }
          title={returnedItem.localDevolucao}
          subheader={`R$ ${returnedItem.valor}`}
        />
        <CardContent>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {formatDate(returnedItem.dataLimite)}
          </Typography>
          <Chip size="small" label={returnedItem.status} color={getColor(returnedItem.status)} variant="solid" />
        </CardContent>
      </Card>
    </Grid>
  );
}

export default CardReturnedItem;
