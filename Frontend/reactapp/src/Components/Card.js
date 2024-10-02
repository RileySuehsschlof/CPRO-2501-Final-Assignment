import React from 'react';
import './Card.css';

const Card = ({ image, title, price, link }) => {
  return (
    <div className="card">
      <img src={image} alt="Product" className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-price">{price}</p>
        <a className="card-link" href={link}>View Details</a>
      </div>
    </div>
  );
};

export default Card;
