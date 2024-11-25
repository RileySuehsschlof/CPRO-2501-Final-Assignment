import React from "react";
import Card from "../../Components/Card";
import "./WishlistPage.css";

const WishlistPage = ({ wishlist }) => {
  return (
    <div className="wishlist-page">
      <h1>My Wishlist</h1>
      <div id="recommendedCards">
        {wishlist.map((item) => (
          <Card
            key={item.WishlistProductID}
            image={item.imageURL} // Assuming there is an imageURL in data
            title={item.title || "Product Name not available"} // Replace with actual product name if available
            price={item.price || "Price not available"} // Replace with actual product price if available
            link={`/product/${item.ProductID}`} // Link to the product detail page
            comment={item.notes}
            notes={item.notes} // Pass the notes to the Card
          />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
