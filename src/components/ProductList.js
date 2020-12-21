import React from "react";
import Product from "./Product";
import Title from "./Title";
import { ProductConsumer } from "../context";
import axios from "axios";

const ProductList = (props) => {
  return (
    <>
      <div className="py-5">
        <div className="container">
          <Title name="our" title="products" />
          <div className="row">
            <ProductConsumer>
              {(value) => {
                console.log(value);
              }}
            </ProductConsumer>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
