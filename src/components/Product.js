import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

const Product = (props) => {
  const { appState, setAppState } = React.useContext(AppContext);
  const { product } = props;
  const handleClick = (product) => {
    setAppState({ ...appState, product: product });
  };

  return (
    <div className="card" style={{ width: "18rem" }}>
      <Link
        to="/show"
        onClick={() => {
          handleClick(product);
        }}>
        <img src={product.img} class="card-img-top" alt={product.name} />
      </Link>

      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.price}</p>
        <a href="#" class="btn btn-primary">
          Add To Cart
        </a>
      </div>
    </div>
  );
};

export default Product;
