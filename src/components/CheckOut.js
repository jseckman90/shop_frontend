import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

const CheckOut = (props) => {
  const { appState, setAppState } = React.useContext(AppContext);
  const { products } = props;
  let productNames = [];
  let productPrices = [];

  products.map((product) => {
    productNames.push(product.name);
    productPrices.push(product.price);
  });

  const priceTotal = productPrices.reduce(
    (acc, val) => parseInt(acc) + parseInt(val)
  );

  const changeAppState = () => {
    setAppState({ ...appState, inCart: false, orderId: null });
  };

  return (
    <div>
      <h1>Your Cart</h1>
      <hr />
      <h2>Item</h2>
      {productNames.map((product) => (
        <p>{product}</p>
      ))}
      <hr />
      <h2>Subtotal</h2>
      <p>{priceTotal}</p>
      <hr />
      <h1>Total</h1>
      <h2 style={{ color: "red" }}>{parseInt(priceTotal)}</h2>
      <Link to="/thanks" onClick={() => changeAppState()}>
        <button>Check Out</button>
      </Link>
    </div>
  );
};

export default CheckOut;
