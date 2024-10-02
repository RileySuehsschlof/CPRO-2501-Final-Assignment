import React from 'react';
import Card from './components/Card';
import './WishlistPage.css';

const WishlistPage = ({ wishlistCardData }) => {
  return (
    <div className="wishlist-page">
      <h1>My Wishlist</h1>
      <div id="recommendedCards">
        {wishlistCardData.map((data, index) => (
          <Card key={index} {...data} />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;