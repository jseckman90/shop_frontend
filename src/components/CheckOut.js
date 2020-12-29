import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import Button from "@material-ui/core/Button";

const CheckOut = (props) => {
  const { appState, setAppState } = React.useContext(AppContext);
  const { products, orderId } = props;
  let cartPrices = [];

  products.map((product) => {
    cartPrices.push(product.price);
  });

  const orderTotal = cartPrices.reduce(
    (accumulator, currentValue) =>
      parseFloat(accumulator) + parseFloat(currentValue)
  );

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Order Summary</h1>

      <h3>Order Number: {orderId}</h3>

      <h1>Total: ${parseFloat(orderTotal).toFixed(2)}</h1>
      <h2></h2>
      <Link to="/orderconfirmation" orderId={orderId}>
        <Button variant="outlined" color="primary">
          Checkout
        </Button>
      </Link>

      <hr />
    </div>
  );
};

export default CheckOut;
