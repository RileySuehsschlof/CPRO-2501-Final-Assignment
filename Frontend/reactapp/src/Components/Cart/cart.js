import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import CartItem from "./CartItem";
import CheckoutButton from "../Stripe/CheckoutButton";

const Cart = () => {
  const [cart, setCart] = useState([]);

  //const token = sessionStorage.getItem("authToken");
  //const [header, payload, signature] = token.split(".");
  //const decodedPayload = JSON.parse(atob(payload));
  const userEmail = "fff@gmail.com";

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

  const addItemToCart = async (cartId, productId, quantity) => {
    try {
        const response = await axios.post(`http://localhost:8881/cart/${cartId}/add-item`, {
            cartId: cartId,
            productId: productId,
            quantity: quantity
        });
        console.log("Item added:", response.data);
    } catch (error) {
        console.error("Error adding item to cart:", error);
    }
  };


  return (
    <div>
      <h2>Your Cart</h2>
      <button onClick={() => addItemToCart(2, 1, 1)}>Add Item to Cart</button>
      <CheckoutButton />
      {cart.length > 0 ? (
        cart.map((item) => <CartItem key={item.id} item={item} />)
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
