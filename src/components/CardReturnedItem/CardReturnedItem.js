import { formatDate } from "@/utils/date";
import {Card,CardHeader,CardContent,Typography,Grid} from "@mui/material";
import returnedItemStyle from "@/styles/Returned.module.css";

function CardReturnedItem({ returnedItem, action }) {
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
        </CardContent>
      </Card>
    </Grid>
  );
}

export default CardReturnedItem;
