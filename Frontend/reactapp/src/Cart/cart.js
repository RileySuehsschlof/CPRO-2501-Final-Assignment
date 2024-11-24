import React, { useEffect, useState } from "react";
import axios from "axios";
import CartItem from "./CartItem";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart data on component mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("/carts/1"); // Adjust the cart ID as needed
        setCart(response.data.items);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  if (loading) {
    return <div>Loading cart...</div>;
  }

  return (
    <div>
      <h2>Your Cart</h2>
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
