import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

const CheckOut = (props) => {
  const { appState, setAppState } = React.useContext(AppContext);
  const { products, orderId } = props;
  let productNames = [];
  let productPrices = [];

  products.map((product) => {
    productNames.push(product.name);
    productPrices.push(product.price);
  });

  const priceTotal = productPrices.reduce(
    (acc, val) => parseInt(acc) + parseInt(val)
  );

  return (
    <div>
      <h1>Your Cart</h1>
      <hr />
      <h3>Order Number:{orderId}</h3>
      <h2>Item</h2>
      {productNames.map((product) => (
        <p>{product}</p>
      ))}
      <hr />
      <h2>Subtotal</h2>
      <p>{priceTotal}</p>
      <hr />
      <h1>Total</h1>
      <h2>{parseInt(priceTotal)}</h2>
      <Link to="/thanks" orderId={orderId}>
        <button>Check Out</button>
      </Link>
    </div>
  );
};

export default CheckOut;
