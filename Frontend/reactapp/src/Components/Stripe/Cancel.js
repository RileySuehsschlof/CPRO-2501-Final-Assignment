import React from "react";
import { Link } from "react-router-dom";

const Cancel = () => {
    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h1>Payment Cancelled 😞</h1>
            <p>You cancelled the payment. If this was a mistake, you can try again.</p>
            <Link to="/" style={{ textDecoration: "none", color: "blue" }}>
                Go Back to Home
            </Link>
        </div>
    );
};

export default Cancel;
