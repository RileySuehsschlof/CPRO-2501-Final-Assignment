import React from "react";
import "./Card.css";

const Card = ({ id, productName, price, description, productImages }) => {
  return (
    <div className="card">
      <div className="card-image">
        {/* Display the first image or a placeholder */}
        {productImages && productImages.length > 0 ? (
          <img src={productImages[0].imageUrl} alt={productName} />
        ) : (
          <div>No image available</div>
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
