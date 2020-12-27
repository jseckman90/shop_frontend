import React from "react";

const Thanks = (props) => {
  const { orderId } = props;
  return <h1>Order Placed. Your order number is {orderId} </h1>;
};

export default Thanks;
