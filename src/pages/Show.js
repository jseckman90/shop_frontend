import React from "react";
import { AppContext } from "../App";

const Show = (props) => {
  const { appState, setAppState } = React.useContext(AppContext);
  const { url, inCart, orderId, userId, token } = appState;
  const { product } = props;
  console.log(product);

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
    // create new product with order_id
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
    <div>
      <div className="card" style={{ width: "18rem" }}>
        <img src={product.img} className="card-img-top" alt={product.name} />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">{product.price}</p>
          <p className="card-text">{product.description}</p>
          <button
            className="btn btn-primary"
            onClick={() => {
              isUserLoggedIn();
            }}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Show;
