// import React from "react";
import ImageCarousel from "../ImageCarousel/ImageCarousel";
// import selfie from "../ImageCarousel/selfie.jpg";
// import batman from "../ImageCarousel/batman.png";
// import random from "../ImageCarousel/random.png";
import "./ProductPage.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

//an example object that represents a product

//will take in an object and display the details
const ProductPage = () => {


  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {


    // const axiosInstance = axios.create({
    //   baseURL: "http://localhost:8881",
    //   headers:{
    //     Authorization:`Bearer ${sessionStorage.getItem("authToken")}`,
    //     "Content-Type":"application/json",
    //   },
    // });

    const fetchProductData = async () => {
      // const axiosInstance = axios.create({
      //   baseURL: "http://localhost:8881",
      //   headers: {
      //     Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      //     "Content-Type": "application/json",
      //   },
      // });
      try {
        const response = await axios.get(`http://localhost:8881/ProductsById/${productId}`);
        // const response = await axiosInstance.get(`/ProductsById/${productId}`);

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
        {/* calling our Image carousel */}
        {/* <ImageCarousel images={product.images} /> */}
        <ImageCarousel images={product.img ? [product.img] : []} />
        {/* <img src={product.images[0]} alt="Product Image" /> */}
      </div>
      <div className="column">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
      </div>

      <div className="column">
        <p>Price: ${product.price}</p>
        <button onClick={() => addToCart(product)}>Add to Cart</button>
        <button onClick={() => addToWishlist(product)}>Add to Wishlist</button>
      </div>
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
