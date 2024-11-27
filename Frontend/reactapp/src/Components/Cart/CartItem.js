import React from "react";

const CartItem = ({ item }) => {
  if (!item.product) {
    return <div>Product not available</div>;
  }

  return (
    <div>
      <h4>{item.product.productName}</h4>
      <p>Quantity: {item.quantity}</p>
      <p>Price: {item.totalPrice}</p>
    </div>
  );
};

export default CartItem;
