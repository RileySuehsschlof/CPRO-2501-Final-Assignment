import React from "react";

const WishlistProduct = ({ WishlistProductID, WishlistID, ProductID, addedDate, notes }) => {
  return (
    <div className="wishlist-product">
      <h2>Product ID: {ProductID}</h2>
      <p>Wishlist ID: {WishlistID}</p>
      <p>Added on: {new Date(addedDate).toLocaleDateString()}</p>
      <p>Notes: {notes}</p>
    </div>
  );
};

export default WishlistProduct;
