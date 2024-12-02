import React from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";

const Card = ({ id, productName, price, discount, description, productImages }) => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Check if the product has images
  const imageUrl = productImages && productImages.length > 0
    ? `http://localhost:8881/${productImages[0].imageUrl}` // Corrected URL construction
    : null; // No image URL if there are no product images

  // Handler to navigate when a card is clicked
  const handleCardClick = () => {
    navigate(`/Product/${id}`); // Navigate to the product detail page with product ID
  };

  // Calculate sale price if there's a discount percentage
  const salePrice = discount > 0 ? (parseFloat(price) * (1 - discount / 100)).toFixed(2) : null;

  return (
    <div className="card" onClick={handleCardClick}> {/* Make card clickable */}
      <div className="card-image">
        {/* If an image exists, show it. Otherwise, show a placeholder text */}
        {imageUrl ? (
          <img src={imageUrl} alt={productName} />
        ) : (
          <div className="no-image">No image available</div>
        )}
      </div>
      <div className="card-info">
        <h2>{productName}</h2>
        <p>{description}</p>
        <div className="price-container">
          {/* Check if discount is greater than 0 */}
          {salePrice ? (
            <>
              {/* Original price with strikethrough if discount > 0 */}
              <p className={`original-price ${discount > 0 ? "discounted" : ""}`}>${price}</p>
              {/* Sale price */}
              <p className="sale-price">${salePrice} ({discount}% off)</p>
            </>
          ) : (
            // If no discount, show the original price normally
            <p className="original-price">${price}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
