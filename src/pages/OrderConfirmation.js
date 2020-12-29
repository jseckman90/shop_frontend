import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const OrderConfirmation = (props) => {
  const { appState, setAppState } = React.useContext(AppContext);
  const { orderId } = props;
  console.log(orderId);
  const resetCart = () => {
    setAppState({ ...appState, inCart: false, orderId: null });
  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const classes = useStyles();
  return (
    <div style={{ textAlign: "center", alignItems: "center" }}>
      <h1>Your order number is {orderId} </h1>

      <Link to="/" onClick={() => resetCart()}>
        <Button variant="contained" color="primary">
          Place Order
        </Button>
      </Link>
    </div>
  );
};

export default OrderConfirmation;
