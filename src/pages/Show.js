import React from "react";
import { AppContext } from "../App";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

const Show = (props) => {
  const { appState, setAppState } = React.useContext(AppContext);
  const { url, inCart, orderId, userId, token } = appState;
  const { product } = props;
  const classes = useStyles();

  const isUserLoggedIn = () => {
    if (userId && token) {
      createOrder(product);
    } else {
      props.history.push("/login");
    }
  };

  const createOrder = async (product) => {
    if (!inCart) {
      const response = await fetch(`${url}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/JSON",
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({ qty: 1, user_id: userId }),
      });
      const data = await response.json();
      await createOrderItem(data.id, product);
      await setAppState({
        ...appState,
        orderId: data.id,
        inCart: true,
      });
    } else {
      createOrderItem(orderId, product);
    }
  };

  const createOrderItem = async (id, product) => {
    const orderItem = { ...product, order_id: id };
    await fetch(`${url}/order_items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON",
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify(orderItem),
    });
  };

  return (
    <Grid container justify="center">
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="700"
            image={product.img}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {product.name}
            </Typography>
            <Typography variant="h6" color="textSecondary" component="p">
              {product.price}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {product.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            variant="contained"
            fullWidth={true}
            color="primary"
            onClick={() => {
              isUserLoggedIn();
            }}>
            <i class="fas fa-cart-plus"></i>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Show;
