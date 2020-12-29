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

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
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
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="300"
          image={product.img}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>

    // <div>
    //   <div className="card" style={{ width: "18rem" }}>
    //     <img src={product.img} className="card-img-top" alt={product.name} />
    //     <div className="card-body">
    //       <h5 className="card-title">{product.name}</h5>
    //       <p className="card-text">{product.price}</p>
    //       <p className="card-text">{product.description}</p>
    //       <Button
    //         variant="contained"
    //         size="large"
    //         color="primary"
    //         onClick={() => {
    //           isUserLoggedIn();
    //         }}>
    //         <i class="fas fa-cart-plus"></i>
    //       </Button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Show;
