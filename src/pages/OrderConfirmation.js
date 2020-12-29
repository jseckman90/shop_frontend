import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

const OrderConfirmation = (props) => {
  const { appState, setAppState } = React.useContext(AppContext);
  const { orderId } = props;
  console.log(orderId);
  const resetCart = () => {
    setAppState({ ...appState, inCart: false, orderId: null });
  };
  return (
    <div>
      <h1>Your order number is {orderId} </h1>

      <Link to="/" onClick={() => resetCart()}>
        <button>click to confirm order</button>
      </Link>
    </div>
  );
};

export default OrderConfirmation;
