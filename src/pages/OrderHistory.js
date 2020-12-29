import React from "react";
import { AppContext } from "../App";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 250,
  },

  margin: {
    margin: 10,
    justifyContent: "space-evenly",
  },
});

const OrderHistory = (props) => {
  const { appState } = React.useContext(AppContext);
  const { url, userId } = appState;
  const [orders, setOrders] = React.useState([]);
  const classes = useStyles();

  const getOrders = async () => {
    const response = await fetch(`${url}/orders`);
    const data = await response.json();
    setOrders(data);
  };

  React.useEffect(() => {
    getOrders();
  }, []);

  const loaded = () => {
    return (
      <Grid item container style={{ border: "2px solid red" }}>
        {orders.map((order) =>
          userId === order.user_id ? (
            <Grid item xs={12} sm={4}>
              <Card
                className={classes.root}
                style={{
                  border: "2px solid black",
                  margin: "10px",
                  padding: "10px",
                }}>
                <Typography variant="h5" component="h2">
                  Order Number: {order.id}
                </Typography>

                <div>
                  <h5>Items:</h5>
                  <div className={classes.margin} style={{ display: "flex" }}>
                    {order.order_items.map((product) => (
                      <>
                        <Card
                          className={classes.root}
                          className={classes.margin}>
                          <CardActionArea>
                            <CardMedia
                              className={classes.media}
                              image={product.img}
                              title={product.name}
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="h2">
                                {product.name}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </>
                    ))}
                  </div>
                </div>
              </Card>
            </Grid>
          ) : null
        )}
      </Grid>
    );
  };

  return orders.length > 0 ? (
    loaded()
  ) : (
    <Typography variant="h5" component="h2" style={{ textAlign: "center" }}>
      No Order History
    </Typography>
  );
};

export default OrderHistory;
