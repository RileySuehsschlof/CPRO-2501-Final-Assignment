import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import CartItem from "./CartItem";
import CheckoutButton from "../Stripe/CheckoutButton";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // State to track the current page (set of 5 items)
  const [activeTab, setActiveTab] = useState("items"); // State for active tab (either 'items' or 'breakdown')

  const token = sessionStorage.getItem("authToken");
  const [, payload] = token.split(".");
  const decodedPayload = JSON.parse(atob(payload));
  const userEmail = decodedPayload.sub;

  const handleRemove = (cartItemId) => {
    // Remove the item from the cart
    const updatedCart = cart.filter((item) => item.id !== cartItemId);
    setCart(updatedCart);

    // Check if we need to go to the previous page if the last page is empty
    const totalPages = Math.ceil(updatedCart.length / itemsPerPage);
    if (currentPage >= totalPages && totalPages > 0) {
      setCurrentPage(totalPages - 1);  // Go to the previous page if the current page is out of bounds
    }
  };

  const fetchCart = useCallback(async () => {
    try {
      const encodedEmail = encodeURIComponent(userEmail);
      const response = await axios.get(`http://localhost:8881/cart/${encodedEmail}`);
      setCart(response.data.items || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }, [userEmail]);

  // Fetch cart data on component mount
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Calculate the total price of the items in the cart
  const totalPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2);

  // Calculate the tax (5%) and final price
  const tax = (totalPrice * 0.05).toFixed(2);
  const finalPrice = (parseFloat(totalPrice) + parseFloat(tax)).toFixed(2);

  // Pagination logic
  const itemsPerPage = 5;
  const startIndex = currentPage * itemsPerPage;
  const currentItems = cart.slice(startIndex, startIndex + itemsPerPage);

  // Total number of pages
  const totalPages = Math.ceil(cart.length / itemsPerPage);

  // Handle Next Page
  const nextPage = () => {
    if (startIndex + itemsPerPage < cart.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle Previous Page
  const prevPage = () => {
    if (startIndex > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const cartStyle = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    padding: "10px",
    width: "100%"
  };

  const itemsContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "60%",  // Cart items container will take 60% of the width
    maxWidth: "600px",  // Set the max width to 600px for cart items
    height: "800px"
  };

  const carouselButtonsContainer = {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "600px",  // Set the max width for the buttons container
    marginTop: "10px",
  };

  const priceBreakdownContainer = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start", // Align items to the left
    width: "30%",  // Price breakdown container will take 30% of the width
    maxWidth: "400px",  // Set the max width for price breakdown
    border: "1px solid #ddd",
    padding: "10px",
    marginTop: "0", // No additional margin top here
  };

  const breakdownItemStyle = {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    padding: "5px 0",
  };

  const footerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px", // Add margin to separate from cart items and price breakdown
    width: "100%",
  };

  const tabStyle = {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  };

  const tabButtonStyle = {
    padding: "10px 20px",
    cursor: "pointer",
    margin: "0 10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    backgroundColor: "#f8f8f8",
    color: "black"
  };

  const activeTabButtonStyle = {
    ...tabButtonStyle,
    backgroundColor: "#4CAF50",  // Highlight active tab with green
    color: "white",
  };

  return (
    <div style={cartStyle}>
      {/* Title: "Your Cart" centered, show only if the cart is not empty */}
      <h2 style={{ textAlign: "center" }}>
        {cart.length === 0 ? "Your cart is currently empty" : "Your Cart"}
      </h2>

      {/* Show content based on whether the cart is empty or not */}
      {cart.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "18px" }}>
          Your cart is currently empty. Add some items to start shopping!
        </p>
      ) : (
        <>
          {/* Tabs for switching between Cart Items and Price Breakdown */}
          <div style={tabStyle}>
            <button
              style={activeTab === "items" ? activeTabButtonStyle : tabButtonStyle}
              onClick={() => setActiveTab("items")}
            >
              Cart Items
            </button>
            <button
              style={activeTab === "breakdown" ? activeTabButtonStyle : tabButtonStyle}
              onClick={() => setActiveTab("breakdown")}
            >
              Price Breakdown
            </button>
          </div>

          {/* Content based on active tab */}
          {activeTab === "items" && (
            <>
              {/* Cart Items Container */}
              <div style={itemsContainerStyle}>
                {currentItems.map((item) => (
                  <CartItem key={item.id} item={item} onRemove={handleRemove} />
                ))}
              </div>

              {/* Page Info */}
              <div style={{ textAlign: "center", marginTop: "10px" }}>
                Page {currentPage + 1} of {totalPages}
              </div>

              {/* Render Carousel Navigation Buttons only if there are more than 5 items */}
              {cart.length > itemsPerPage && (
                <div style={carouselButtonsContainer}>
                  <button onClick={prevPage} disabled={currentPage === 0}>
                    Previous
                  </button>
                  <button
                    onClick={nextPage}
                    disabled={startIndex + itemsPerPage >= cart.length}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}

          {activeTab === "breakdown" && (
            <div style={priceBreakdownContainer}>
              <h3>Price Breakdown</h3>
              {/* Item Prices */}
              {cart.map((item) => (
                <div key={item.id} style={breakdownItemStyle}>
                  <span>{item.product.productName}</span>
                  <span>${item.totalPrice.toFixed(2)}</span>
                </div>
              ))}
              {/* Total Price */}
              <div style={breakdownItemStyle}>
                <strong>Total</strong>
                <span>${totalPrice}</span>
              </div>
              {/* Tax (5%) */}
              <div style={breakdownItemStyle}>
                <span>Tax (5%)</span>
                <span>${tax}</span>
              </div>
              {/* Final Price */}
              <div style={breakdownItemStyle}>
                <strong>Final Price</strong>
                <span>${finalPrice}</span>
              </div>
            </div>
          )}

          {/* Footer: Total Price and Checkout Button */}
          <div style={footerStyle}>
            <h1>Total Price: ${finalPrice}</h1>
            <CheckoutButton totalPrice={finalPrice} />
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
