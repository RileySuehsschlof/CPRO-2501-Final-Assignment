import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h1>Payment Successful 🎉</h1>
            <p>Thank you for your purchase! Your payment has been processed successfully.</p>
            <Link to="/" style={{ textDecoration: "none", color: "blue" }}>
                Go Back to Home
            </Link>
        </div>
    );
};

export default Success;
