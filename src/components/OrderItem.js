import React from "react";

const OrderItem = (props) => {
  const { product, handleDelete } = props;
  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        <img src={product.img} class="card-img-top" alt={product.name} />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">{product.price}</p>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(product.id, product.order_id)}>
            Remove from Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
