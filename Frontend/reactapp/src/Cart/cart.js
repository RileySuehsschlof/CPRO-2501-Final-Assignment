import React, { useEffect, useState } from "react";
import axios from "axios";
import CartItem from "./CartItem";

const Cart = () => {
  const [cart, setCart] = useState([]);

  const userEmail = sessionStorage.getItem("userEmail");

  // Fetch cart data on component mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`/cart/${userEmail}`);
        setCart(response.data.items);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, [userEmail]);

  // Function to create a new cart
  const createNewCart = async () => {
    try {
      await axios.post(`/cart/create/1`);
      alert("New cart created successfully!");
    } catch (error) {
      console.error("Error creating cart:", error);
      alert("Failed to create a new cart.");
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      <button onClick={createNewCart}>Create New Cart</button>
      {cart.length > 0 ? (
        cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
