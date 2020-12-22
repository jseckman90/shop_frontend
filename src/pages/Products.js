import React from "react";
import { AppContext } from "../App";
import Product from "../components/Product";

const Products = (props) => {
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
      <div>
        <div className="container">
          {products.map((product) => (
            <Product product={product} key={product.id} />
          ))}
        </div>
      </div>
    );
  };

  return products.length > 0 ? loaded() : <h3>Loading...</h3>;
};

export default Products;
