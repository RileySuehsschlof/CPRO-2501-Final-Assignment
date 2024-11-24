import React from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";

const Card = ({ id, productName, price, description, productImages }) => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Check if the product has images
  const imageUrl = productImages && productImages.length > 0
    ? `http://localhost:8881/${productImages[0].imageUrl}` // Corrected URL construction
    : null; // No image URL if there are no product images

  // Handler to navigate when a card is clicked
  const handleCardClick = () => {
    navigate(`/Product/${id}`); // Navigate to the product detail page with product ID
  };

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
        <p>Price: ${price}</p>
      </div>
    </div>
  );
};

export default Card;
