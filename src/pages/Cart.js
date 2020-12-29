import React from "react";
import { AppContext } from "../App";
import OrderItem from "../components/OrderItem";
import CheckOut from "../components/CheckOut";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

  const handleDelete = async (productId, orderId) => {
    if (order.order_items.length === 1) {
      await deleteOrder(orderId);
    } else {
      await deleteItem(productId);
      await getOrder();
    }
  };

  React.useEffect(() => {
    getOrder();
  }, []);

  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      margin: 5,
    },
    contain: {},
  }));

  const classes = useStyles();

  const loaded = () => {
    console.log(orderId);
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <CheckOut products={order.order_items} orderId={orderId} />
          </Grid>

          <Grid
            container
            xs={12}
            className={classes.contain}
            style={{
              margin: "10px",
            }}>
            {order.order_items.map((product) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={4}
                  style={{ display: "flex", justifyContent: "space-between" }}>
                  <OrderItem
                    product={product}
                    handleDelete={handleDelete}
                    key={product.id}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
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
