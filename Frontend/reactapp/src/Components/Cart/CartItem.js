import React from "react";
import axios from "axios";

const CartItem = ({ item, onRemove }) => {
  if (!item.product) {
    return <div>Product not available</div>;
  }

  const tableStyle = {
    backgroundColor: "white",
    padding: "5px",
    margin: "5px",
    border: "1px solid #ddd"
  };

  const buttonStyle = {
    backgroundColor: "red"
  };

  const style2 = {
    padding: "5px 10px"
  };

  const nameStyle = {
    padding: "5px 10px",
    fontWeight: "bold"
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
    <table style={tableStyle}>
      <tbody>
        <tr>
          <td style={nameStyle}>{item.product.productName}</td>
          <td style={style2}>${item.totalPrice}</td>
          <td style={style2}>Qty: {item.quantity}</td>
          <button style={buttonStyle} onClick={handleRemove}>X</button>
        </tr>
      </tbody>
    </table>
  );
};

export default CartItem;
