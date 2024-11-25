import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import CartItem from "./CartItem";

const Cart = () => {
  const [cart, setCart] = useState([]);
  //const userEmail = sessionStorage.getItem("userEmail");
  const userEmail = "fff@gmail.com";

  // Function to fetch cart data
  const fetchCart = useCallback(async () => {
    try {
      //Encode email
      const encodedEmail = encodeURIComponent(userEmail);
      const response = await axios.get(`/cart/${encodedEmail}`);
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
        const response = await axios.post(`/cart/${cartId}/add-item`, {
            productId,
            quantity,
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
      {cart.length > 0 ? (
        cart.map((item) => <CartItem key={item.id} item={item} />)
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
