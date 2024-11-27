import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import CartItem from "./CartItem";
import CheckoutButton from "../Stripe/CheckoutButton";

const Cart = () => {
  const [cart, setCart] = useState([]);

  const token = sessionStorage.getItem("authToken");
  const [, payload] = token.split(".");
  const decodedPayload = JSON.parse(atob(payload));
  const userEmail = decodedPayload.sub;

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

  const cartStyle = {
    backgroundColor: "white"
  };

  return (
    <div style={cartStyle}>
      <h2>Your Cart</h2>
      {cart.length > 0 ? (
        cart.map((item) => <CartItem key={item.id} item={item} />)
      ) : (
        <p>Your cart is empty.</p>
      )}
      <h1>Total Price: </h1>
      <CheckoutButton />
    </div>
  );
};

export default Cart;
