import React from "react";
import { AppContext } from "../App";
import Product from "../components/Product";

import { Grid } from "@material-ui/core";

const Items = (props) => {
  const { appState } = React.useContext(AppContext);
  const { url } = appState;
  const [products, setProducts] = React.useState([]);

  const getProducts = async () => {
    const response = await fetch(`${url}/products`);
    const data = await response.json();
    setProducts(data);
  };

  React.useEffect(() => {
    getProducts();
  }, []);

  const loaded = () => {
    return (
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={4}>
            <Product product={product} key={product.id} />
          </Grid>
        ))}
      </Grid>
    );
  };

  return products.length > 0 ? (
    loaded()
  ) : (
    <h3 style={{ textAlign: "center" }}>
      <i fontSize="large" class="fas fa-spinner fa-pulse fa-5x"></i>
    </h3>
  );
};

export default Items;
