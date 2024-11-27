import React from "react";

const CartItem = ({ item }) => {
  if (!item.product) {
    return <div>Product not available</div>;
  }

  const divStyle = {
    backgroundColor: "white",
    padding: "7px",
    maxWidth: "100px",
    border: "1px solid #ddd",
    display: "inline-block"
  };

  const buttonStyle = {
    backgroundColor: "red"
  };

  return (
    <div style={divStyle}>
      <h4>{item.product.productName}</h4>
      <p>Price: {item.totalPrice}</p>
      <p>Qty: {item.quantity}</p>
      <button style={buttonStyle}>X</button>
    </div>
  );
};

export default CartItem;
