import React from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_12345"); // Replace with your publishable key

const CheckoutButton = () => {
    const handleCheckout = async () => {
        const response = await fetch("http://localhost:8080/create-checkout-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });
        const sessionUrl = await response.text();
        const stripe = await stripePromise;
        stripe.redirectToCheckout({ sessionId: sessionUrl });
    };

    return <button onClick={handleCheckout}>Checkout</button>;
};

export default CheckoutButton;
