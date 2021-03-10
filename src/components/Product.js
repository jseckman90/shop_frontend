import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { AppContext } from "../App";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

const Product = (props) => {
  const { appState, setAppState } = React.useContext(AppContext);
  const { url, inCart, orderId, userId, token } = appState;
  const { product } = props;
  const handleClick = (product) => {
    setAppState({ ...appState, product: product });
  };

  const history = useHistory();

  const isUserLoggedIn = () => {
    if (userId && token) {
      console.log(userId);
      createOrder(product);
    } else {
      history.push("/login");
    }
  };

  const createOrder = async (product) => {
    console.log(userId);

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

  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      height: "auto",
    },
    media: {
      height: 415,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
  }));

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar src="/logo.png" className={classes.avatar} />}
        title={product.name}
        subheader={product.price}
      />
      <Link
        to="/show"
        onClick={() => {
          handleClick(product);
        }}>
        <CardMedia
          className={classes.media}
          image={product.img}
          title="Product"
        />
      </Link>
      <CardContent>
        {/* <Typography
          variant="headline"
          color="textSecondary"
          component="p"></Typography> */}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <AddShoppingCartIcon
            fontSize="large"
            onClick={() => {
              isUserLoggedIn();
            }}
          />
        </IconButton>

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more">
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{product.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Product;
