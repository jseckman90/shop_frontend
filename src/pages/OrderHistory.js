import React from "react";
import { AppContext } from "../App";
import OrderItem from "../components/OrderItem";
import CheckOut from "../components/CheckOut";

const OrderHistory = (props) => {
  const { appState } = React.useContext(AppContext);
  const { url, userId } = appState;
  const [orders, setOrders] = React.useState([]);

  const getOrders = async () => {
    const response = await fetch(`${url}/orders`);
    const data = await response.json();
    setOrders(data);
  };

  React.useEffect(() => {
    getOrders();
  }, []);

  const loaded = () => {
    return (
      <div>
        <div className="container">
          {orders.map((order) =>
            userId === order.user_id ? (
              <div style={{ border: "2px solid black" }}>
                <h3>
                  Order Number:{" "}
                  <span style={{ color: "blue" }}>{order.id}</span>
                </h3>
                <h5>user ID: {order.user_id}</h5>

                <div>
                  <h5>Items:</h5>

                  {order.order_items.map((product) => (
                    <div style={{ border: "1px solid red", margin: "10px" }}>
                      <p>{product.name}</p>
                      <p>{product.price}</p>
                      <img src={product.img} style={{ height: "5rem" }} />
                    </div>
                  ))}
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
    );
  };

  return orders.length > 0 ? loaded() : <h3>Loading Orders...</h3>;
};

export default OrderHistory;
