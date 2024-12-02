import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../../Components/Card"; // Assuming you have a Card component to display products
import "./MainPage.css";

const MainPage = () => {
  // Initialize state for the products
  const [regCardData, setRegCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the products from the backend when the component mounts
  const [regCarouselIndex, setRegCarouselIndex] = useState(0);
  const [recCarouselIndex, setRecCarouselIndex] = useState(0);

  const [cardsPerSlide, setCardsPerSlide] = useState(3);

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
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
    return <div>Loading products...</div>; // Display loading text
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }

  // Filter and sort products that are on sale (discount > 0)
  const saleProducts = regCardData
    .filter((product) => product.discount > 0) // Filter products with discount > 0
    .sort((a, b) => b.discount - a.discount); // Sort by discount in descending order

  // Calculate the range of items to display based on the carousel index
  const currentRegCards = saleProducts.slice(
    regCarouselIndex * cardsPerSlide,
    (regCarouselIndex + 1) * cardsPerSlide
  );

  const currentRecCards = regCardData.slice(
    recCarouselIndex * cardsPerSlide,
    (recCarouselIndex + 1) * cardsPerSlide
  );

  // Function to handle next slide for regular carousel
  const nextRegSlide = () => {
    if ((regCarouselIndex + 1) * cardsPerSlide < saleProducts.length) {
      setRegCarouselIndex(regCarouselIndex + 1);
    }
  };

  // Function to handle previous slide for regular carousel
  const prevRegSlide = () => {
    if (regCarouselIndex > 0) {
      setRegCarouselIndex(regCarouselIndex - 1);
    }
  };

  // Function to handle next slide for recommended carousel
  const nextRecSlide = () => {
    if ((recCarouselIndex + 1) * cardsPerSlide < regCardData.length) {
      setRecCarouselIndex(recCarouselIndex + 1);
    }
  };

  // Function to handle previous slide for recommended carousel
  const prevRecSlide = () => {
    if (recCarouselIndex > 0) {
      setRecCarouselIndex(recCarouselIndex - 1);
    }
  };

  return (
    <div className="main-page">
      <h1>On Sale</h1>
      <div className="carousel-container">
        <button onClick={prevRegSlide} disabled={regCarouselIndex === 0}>
          Prev
        </button>
        <div id="regCarousel" className="carousel-cards">
          {currentRegCards.map((product, index) => (
            <Card key={index} {...product} />
          ))}
        </div>
        <button
          onClick={nextRegSlide}
          disabled={regCarouselIndex + 1 >= saleProducts.length / cardsPerSlide}
        >
          Next
        </button>
      </div>

      <h1>Products You Might Like</h1>
      <div className="carousel-container">
        <button onClick={prevRecSlide} disabled={recCarouselIndex === 0}>
          Prev
        </button>
        <div id="recCarousel" className="carousel-cards">
          {currentRecCards.map((product, index) => (
            <Card key={index} {...product} />
          ))}
        </div>
        <button
          onClick={nextRecSlide}
          disabled={recCarouselIndex + 1 >= regCardData.length / cardsPerSlide}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MainPage;
