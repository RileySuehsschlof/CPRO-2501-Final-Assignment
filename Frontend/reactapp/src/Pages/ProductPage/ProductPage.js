
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

  useEffect(() => {

    // get the product from backend
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://localhost:8881/ProductsById/${productId}`);


        setProduct(response.data);

      } catch (error) {
        setError("Failed to fetch product" + error.message);
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

  return (
    <div className="product-page">
      <div className="column2">

        {/* if there are no images to display let the user know */}
        {product.productImages && product.productImages.length > 0 ? (
          <ImageCarousel
            images={product.productImages.map((img) => img.imageUrl)}
          />
        ) : (
          <div>No images available for this product</div>
        )}

      </div>
      <div className="column">
        <h2>{product.productName}</h2>
        <p>{product.description}</p>
        <p>{product.id}</p>

      </div>

      <div className="column">
        <p>Price: ${product.price}</p>
        <button onClick={() => addToCart(product)}>Add to Cart</button>
        <button onClick={() => addToWishlist(product)}>Add to Wishlist</button>
      </div>
      <RecommendedProductPage
        category={product.category}
        productId={product.id}
      />
    </div>
  );
};
//will eventually send the product to the cart
const addToCart = (product) => {
  console.log(`added: ${product.name} to cart`);
};
//will eventually send the product to the wishlist
const addToWishlist = (product) => {
  console.log(`added: ${product.name} to wishlist`);
};

export default ProductPage;
