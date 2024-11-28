import React from "react";
import axios from "axios";

const CartItem = ({ item, onRemove }) => {
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

  const handleRemove = async () => {
    try {
      const response = await axios.delete(`http://localhost:8881/cart/remove-item/${item.id}`);
      if (response.status === 200) {
        onRemove(item.id);
      } else {
        console.error("Failed to remove item");
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <div style={divStyle} onClick={handleRemove}>
      <h4>{item.product.productName}</h4>
      <p>Price: {item.totalPrice}</p>
      <p>Qty: {item.quantity}</p>
      <button style={buttonStyle}>X</button>
    </div>
  );
};

export default CartItem;
