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
        setWishlistItems(response.data); // Assuming response.data contains an array of wishlist products

        // Fetch product details for each wishlist product by productID
        const productPromises = response.data.map((wishlistProduct) => {
          return axios.get(`http://localhost:8881/ProductsById/${wishlistProduct.productID}`);
        });

        // Wait for all product details to be fetched
        const productResponses = await Promise.all(productPromises);

        // Set the product details in state
        const products = productResponses.map((res) => res.data); // Assuming the API returns product data as `res.data`
        setProductDetails(products);
      } catch (error) {
        setError("Failed to fetch wishlist items: " + error.message);
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

  if (loading) {
    return <div>Loading wishlist...</div>; // Display loading text
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message
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
        <button onClick={prevRegSlide} disabled={regCarouselIndex === 0}>
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

            // Pass the product data to Card component
            return (
              <div key={index}>
                <Card {...product} />
                {/* Display the product name and notes below the card */}
                <p>{product.productName}: {wishlistProduct.notes}</p>
              </div>
            );
          })}
        </div>
        <button
          onClick={nextRegSlide}
          disabled={
            (regCarouselIndex + 1) * cardsPerSlide >= wishlistItems.length
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WishlistPage;
