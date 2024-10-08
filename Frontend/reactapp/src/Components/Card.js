import React from "react";
import "./Card.css";
import Navigation from "../Navigation";
import { useNavigate } from "react-router-dom";

const Card = ({ image, title, price, link, notes }) => {
  const navigate = useNavigate();
  return (
    <div className="card">
      <img src={image} alt="Product" className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-price">{price}</p>
        <button className="navBtnRoute" onClick={() => navigate(link)}>
          Product
        </button>
        <p className="card-notes">{notes}</p> {/* Display notes here */}
        

        
      </div>
    </div>
    
  );
};

export default Card;
