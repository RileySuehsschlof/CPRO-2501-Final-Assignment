import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../../Components/Card"; // Assuming you have a Card component to display products

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [regCarouselIndex, setRegCarouselIndex] = useState(0);
  const [cardsPerSlide, setCardsPerSlide] = useState(3);

  // Fetch wishlist items for the logged-in user
  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const userID = sessionStorage.getItem("userID"); // Get user ID from sessionStorage
        if (!userID) {
          setError("You need to log in to view your wishlist.");
          return;
        }

        // Fetch wishlist items for the user
        const response = await axios.get(
          `http://localhost:8881/wishlistproducts/wishlist/${userID}`
        );

        // If status code is 500, show empty wishlist message
        if (response.status === 500) {
          setError("Your wishlist is currently empty.");
          return;
        }

        // Check if the response contains a valid list
        if (response.data && Array.isArray(response.data)) {
          setWishlistItems(response.data);
        } else {
          setError("Error: Wishlist data is not an array or is empty.");
          return;
        }

        // Fetch product details for each wishlist product by productID
        const productPromises = response.data.map((wishlistProduct) => {
          return axios.get(`http://localhost:8881/ProductsById/${wishlistProduct.productID}`);
        });

        // Wait for all product details to be fetched
        const productResponses = await Promise.all(productPromises);

        // Set the product details in state
        const products = productResponses.map((res) => res.data);
        setProductDetails(products);
      } catch (error) {
        console.error("Failed to fetch wishlist items:", error); // Log to console for debugging

        // If the error is a 500, set the error message as "Your wishlist is currently empty."
        if (error.response && error.response.status === 500) {
          setError("");
        } else {
          setError("Failed to fetch wishlist items: " + error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistItems();
  }, []); // Empty array means this runs once when the component mounts

  // Dynamic adjustment for cards per slide based on screen width
  const updateCardsPerSlide = () => {
    const width = window.innerWidth;
    if (width >= 1230) {
      setCardsPerSlide(3);
    } else if (width >= 840) {
      setCardsPerSlide(2);
    } else {
      setCardsPerSlide(1);
    }
  };

  useEffect(() => {
    updateCardsPerSlide(); // Set initial cards per slide
    window.addEventListener("resize", updateCardsPerSlide);
    return () => {
      window.removeEventListener("resize", updateCardsPerSlide);
    };
  }, []);

  // Function to handle removing a product from the wishlist
  const handleRemoveFromWishlist = async (productID) => {
    try {
      const userID = sessionStorage.getItem("userID");
      if (!userID) {
        setError("You need to log in to remove items from your wishlist.");
        return;
      }

      // Make the API call to remove the product from the wishlist
      const response = await axios.delete(
        `http://localhost:8881/wishlistproducts/remove/${userID}-${productID}`
      );

      if (response.status === 200) {
        // Remove the item from the state if successfully removed
        setWishlistItems((prevItems) =>
          prevItems.filter((item) => item.productID !== productID)
        );
        setError(null); // Clear any previous error messages
      }
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
      setError("Failed to remove product from wishlist.");
    }
  };

  // Handle loading, error, and empty state
  if (loading) {
    return <div>Loading wishlist...</div>; // Display loading text
  }

  if (error) {
    return <div>{error}</div>; // Display error message (or empty wishlist message)
  }

  // Check if wishlist is empty
  if (wishlistItems.length === 0) {
    return <div><h1>Your Wishlist is Currently Empty.</h1></div>;
  }

  // Calculate the range of items to display based on the carousel index
  const currentWishlistItems = wishlistItems.slice(
    regCarouselIndex * cardsPerSlide,
    (regCarouselIndex + 1) * cardsPerSlide
  );

  // Function to handle next slide for regular carousel
  const nextRegSlide = () => {
    if ((regCarouselIndex + 1) * cardsPerSlide < wishlistItems.length) {
      setRegCarouselIndex(regCarouselIndex + 1);
    }
  };

  // Function to handle previous slide for regular carousel
  const prevRegSlide = () => {
    if (regCarouselIndex > 0) {
      setRegCarouselIndex(regCarouselIndex - 1);
    }
  };

  return (
    <div className="main-page">
      <h1>Your Wishlist</h1>
      <div className="carousel-container">
        <button onClick={prevRegSlide} disabled={regCarouselIndex === 0} style={{ padding: "10px", backgroundColor: "#ccc", border: "none", cursor: "pointer" }}>
          Prev
        </button>
        <div id="regCarousel" className="carousel-cards">
          {currentWishlistItems.map((wishlistProduct, index) => {
            // Find the corresponding product details using the productID
            const product = productDetails.find(
              (product) => product.id === wishlistProduct.productID
            );

            // If product details are not found, return a fallback message
            if (!product) {
              return <div key={index}>Product data missing</div>;
            }

            return (
              <div key={index} style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                margin: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#f9f9f9",
                height: "auto",
                minHeight: "450px" // Increase this value to make the card taller
              }}>
                <Card {...product} />
                <p>{product.productName}: {wishlistProduct.notes}</p>
                <button onClick={() => handleRemoveFromWishlist(wishlistProduct.productID)} style={{
                  marginTop: "10px",
                  padding: "10px",
                  backgroundColor: "#ff6b6b",
                  border: "none",
                  color: "white",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}>
                  Remove from Wishlist
                </button>
              </div>
            );
          })}
        </div>
        <button onClick={nextRegSlide} disabled={(regCarouselIndex + 1) * cardsPerSlide >= wishlistItems.length} style={{
          padding: "10px",
          backgroundColor: "#ccc",
          border: "none",
          cursor: "pointer"
        }}>
          Next
        </button>
      </div>
    </div>
  );
};

export default WishlistPage;
