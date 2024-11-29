import React from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51QOtECKbLtLt8gtESLoekGIcL5tz2LQ2FOpeVXD6HPsaQdC03dgGoVOEPBCDn0WUJBUTCOmWM6XUz9gySyStLvkQ00fnddWFx4"); // Replace with your publishable key

const CheckoutButton = ({ totalPrice }) => {
    const handleCheckout = async () => {
        const response = await fetch("http://localhost:8881/create-checkout-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ totalPrice: totalPrice * 100 })
        });
        const sessionId = await response.text();
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId });
    };
    

    return <button onClick={handleCheckout}>Checkout</button>;
};

export default CheckoutButton;
