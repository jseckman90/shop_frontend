import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

const Thanks = (props) => {
  const { appState, setAppState } = React.useContext(AppContext);
  const { orderId } = props;
  console.log(orderId);
  const resetCart = () => {
    setAppState({ ...appState, inCart: false, orderId: null });
  };
  return (
    <div>
      <h1>Order Placed. Your order number is {orderId} </h1>

      <Link to="/" onClick={() => resetCart()}>
        <button>click to go to home page</button>
      </Link>
    </div>
  );
};

export default Thanks;
