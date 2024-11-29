
import ImageCarousel from "../../Components/ImageCarousel/ImageCarousel";

import "./ProductPage.css";
import RecommendedProductPage from "../../Components/RecommendedProduct/RecommendedProduct"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


//will take in an objectId from params and display the details of the related product
const ProductPage = () => {


  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlistMessage, setWishlistMessage] = useState("");

  useEffect(() => {

    // get the product from backend
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://localhost:8881/ProductsById/${productId}`);
        console.log("Fetched product data:", response.data);  // Debugging log for fetched product
        setProduct(response.data); // Set product data
      } catch (error) {
        setError("Failed to fetch product: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error}</div>
  }

  // Handle adding product to wishlist
  const addToWishlist = async (product) => {
    console.log("Product in addToWishlist:", product); // Log the product data here

    // Check if the product is valid
    if (!product || !product.id) {  // Use 'id' here as it is available
      setWishlistMessage("Invalid product data. Please try again.");
      return; // Stop if the product is invalid
    }

    // Check if the user is logged in by verifying the authToken in sessionStorage
    const token = sessionStorage.getItem("authToken");
    if (!token) {
      setWishlistMessage("You need to log in to add products to your wishlist.");
      return; // Don't proceed if the user is not logged in
    }

    // Retrieve the userID from sessionStorage
    const userID = sessionStorage.getItem("userID");
    if (!userID) {
      setWishlistMessage("User ID not found. Please log in again.");
      return; // Don't proceed if there's no user ID
    }

    const wishlistID = parseInt(userID); // Convert userID to integer

    // Prompt the user for a note about the wishlist product
    const notes = prompt("Why are you adding this product to your wishlist?");

    // Create the wishlist product object
    const wishlistProduct = {
      wishlistProductID: `${wishlistID}-${product.id}`, // Use product.id instead of product.productID
      wishlistID: wishlistID, // Ensure wishlistID is an integer
      productID: product.id, // Use product.id here
      notes: notes || "No notes provided", // Default note if none provided
    };

    console.log("Adding to wishlist with data:", wishlistProduct); // Log the data being sent

    try {
      // Send POST request to backend to add the product to the wishlist
      const response = await axios.post(
        "http://localhost:8881/wishlistproducts/addWish",
        wishlistProduct,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Log the response data to debug
      console.log("Response from backend:", response.data);

      // Set message based on response
      setWishlistMessage(response.data);
    } catch (error) {
      // Log the error response to get more details
      console.error("Error adding to wishlist:", error);
      if (error.response) {
        // If the server responds with an error, log it
        console.error("Backend error:", error.response.data);
        setWishlistMessage("Server error: " + error.response.data.message || "Failed to add product to wishlist.");
      } else {
        // Otherwise, it's a network error
        setWishlistMessage("Network error: Failed to reach the server.");
      }
    }
  };

  return (
    <div className="product-page">
      <div className="column2">
        {/* If there are no images to display, let the user know */}
        {product.productImages && product.productImages.length > 0 ? (
          <ImageCarousel images={product.productImages.map((img) => img.imageUrl)} />
        ) : (
          <div>No images available for this product</div>
        )}

      </div>
      <div className="column">
        <h2>{product.productName}</h2>
        <p>{product.description}</p>


      </div>

      <div className="column">
        <p>Price: ${product.price}</p>
        <button onClick={() => addItemToCart(productId, 1)}>Add to Cart</button>
        <button onClick={() => addToWishlist(product)}>Add to Wishlist</button>
      </div>

      <div className="recommended">
        <h2>Related Products</h2>
        <RecommendedProductPage
          category={product.category}
          productId={product.id}
        />
      </div>

    </div>
  );
};


const addItemToCart = async (productId, quantity) => {
  try {
    const token = sessionStorage.getItem("authToken");
    const [, payload] = token.split(".");
    const decodedPayload = JSON.parse(atob(payload));
    const userEmail = decodedPayload.sub;

    // Fetch the cart by user email
    const cartResponse = await axios.get(`http://localhost:8881/cart/${encodeURIComponent(userEmail)}`);
    const cart = cartResponse.data;

    if (!cart || !cart.id) {
      throw new Error("Cart not found or cart ID is missing");
    }

    // Use cart.id from the response
    const cartId = cart.id;

    const response = await axios.post(`http://localhost:8881/cart/${cartId}/add-item`, {
      productId: productId,
      quantity: quantity,
    });

    console.log("Item added:", response.data);
    alert("Item added to cart!");
  } catch (error) {
    console.error("Error adding item to cart:", error);
  }
};


//will eventually send the product to the wishlist
const addToWishlist = (product) => {
  console.log(`added: ${product.name} to wishlist`);
};

export default ProductPage;
