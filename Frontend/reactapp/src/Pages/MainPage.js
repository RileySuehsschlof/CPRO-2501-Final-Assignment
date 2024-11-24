import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../Components/Card"; // Assuming you have a Card component to display products
import "./MainPage.css";

const MainPage = () => {
  // Initialize state for the products
  const [regCardData, setRegCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the products from the backend when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Make an API call to fetch all products
        const response = await axios.get("http://localhost:8881/Products");

        // Set the response data into regCardData state
        setRegCardData(response.data);
      } catch (error) {
        // Handle any error that occurs during the fetch
        setError("Failed to fetch products: " + error.message);
      } finally {
        // Set loading to false when the fetch is complete
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this runs once on component mount

  if (loading) {
    return <div>Loading products...</div>; // Display loading text
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }

  return (
    <div className="main-page">
      <h1>On Sale</h1>
      <div id="regCards">
        {regCardData.map((product, index) => (
          <Card key={index} {...product} /> // Assuming Card component takes product as props
        ))}
      </div>
      <h1>Products You Might Like</h1>
      {/*Nothing here yet*/}
      <div id="recCards">
        {/* Nothing here yet */}
      </div>
    </div>
  );
};

export default MainPage;
