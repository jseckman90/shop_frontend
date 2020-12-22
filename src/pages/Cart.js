import React from "react";
import { AppContext } from "../App";
import OrderItem from "../components/OrderItem";
import CheckOut from "../components/CheckOut";

const Cart = (props) => {
  const { appState, setAppState } = React.useContext(AppContext);
  const { url, orderId } = appState;
  const [order, setOrder] = React.useState(null);

  const getOrder = async () => {
    if (orderId) {
      const response = await fetch(`${url}/orders/${orderId}`);
      const data = await response.json();
      await setOrder(data);
    }
  };

  const deleteItem = async (id) => {
    await fetch(`${url}/order_items/${id}`, {
      method: "DELETE",
    });
  };

  const deleteOrder = async (id) => {
    await fetch(`${url}/orders/${id}`, {
      method: "DELETE",
    });
    await setOrder(null);
    await setAppState({
      ...appState,
      orderId: null,
      inCart: false,
    });
  };

  const handleDelete = (productId, orderId) => {
    if (order.order_items.length === 1) {
      deleteOrder(orderId);
    } else {
      deleteItem(productId);
      getOrder();
    }
  };

  React.useEffect(() => {
    getOrder();
  }, []);

  const loaded = () => {
    return (
      <div>
        <div>
          {order.order_items.map((product) => {
            return (
              <OrderItem
                product={product}
                handleDelete={handleDelete}
                key={product.id}
              />
            );
          })}
        </div>
        <CheckOut products={order.order_items} />
      </div>
    );
  };

  return order !== null ? (
    loaded()
  ) : (
    <h1 style={{ textAlign: "center" }}>Your Cart is empty</h1>
  );
};

export default Cart;
