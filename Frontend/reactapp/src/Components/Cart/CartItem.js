import React from "react";
import axios from "axios";

const CartItem = ({ item, onRemove }) => {
  if (!item.product) {
    return <div>Product not available</div>;
  }

  // Extract the first image URL
  const firstImageUrl = item.product.productImages && item.product.productImages[0]?.imageUrl;

  // Log the image URL for debugging
  console.log('First Image URL:', firstImageUrl);

  const tableStyle = {
    backgroundColor: "white",
    padding: "5px",
    margin: "5px",
    border: "1px solid #ddd",
    width: "400px",  // Set the width of the entire cart item container
    tableLayout: "fixed" // Prevent the table from expanding beyond the width
  };

  const tdStyle = {
    padding: "5px",
    Width: "400px", // Ensure table cells are also constrained
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap"
  };

  const imgStyle = {
    height: "50px",  // Set image height
    width: "auto"   // Maintain aspect ratio
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
    <table style={tableStyle}>
      <tbody>
        <tr>
          {/* Image Column */}
          <td style={tdStyle}>
            {firstImageUrl ? (
              <img 
                src={`http://localhost:8881/${firstImageUrl}`} 
                alt={item.product.productName} 
                style={imgStyle} 
              />
            ) : (
              <div>No image available</div>
            )}
          </td>
          {/* Product Name Column */}
          <td style={tdStyle}>{item.product.productName}</td>
          {/* Price Column */}
          <td style={tdStyle}>${item.totalPrice}</td>
          {/* Quantity Column */}
          <td style={tdStyle}>Qty: {item.quantity}</td>
          {/* Remove Button */}
          <td>
            <button style={buttonStyle} onClick={handleRemove}>X</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default CartItem;
