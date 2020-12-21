import React from "react";
import axios from "axios";

const ProductContext = React.createContext();
//Provider - provides information
//Consumer - consumes information (use where you want to get information)

const ProductProvider = (props) => {
  const url = "https://jsshopbackend.herokuapp.com";

  const [product, setProduct] = React.useState(null);

  React.useEffect(() => {
    axios.get(url + "/products").then((response) => {
      setProduct(response.data);
    });
  }, []);

  return (
    <ProductContext.Provider
      value={{
        ...product,
      }}>
      {props.children}
    </ProductContext.Provider>
  );
};

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
