import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

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
    <div>
      <h1>Your Cart</h1>
      <hr />
      <h3>Order Number: {orderId}</h3>

      <hr />
      <h1>Total</h1>
      <h2>${parseFloat(orderTotal).toFixed(2)}</h2>
      <Link to="/orderconfirmation" orderId={orderId}>
        <button>Check Out</button>
      </Link>
    </div>
  );
};

export default CheckOut;
