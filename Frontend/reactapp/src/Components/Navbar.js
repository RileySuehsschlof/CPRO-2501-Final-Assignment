import React from "react";
import "./Navbar.css";

const Navbar = ({ onNavigate }) => {
  return (
    <header className="App-header">
      <div className="navbar">
        <h1>Generic Store Name</h1>
        <a href="#" onClick={() => onNavigate("home")}>
          Home
        </a>
        <a href="#" onClick={() => onNavigate("wishlist")}>
          My Wishlist
        </a>
        <a href="http://localhost:3000/">Special Offers</a>
        <a href="http://localhost:3000/">Our Locations</a>
        <a href="register" onClick={() => onNavigate("register")}>
          Profile
        </a>
        {/* <a href="http://localhost:3000/">Profile</a> */}
        <a href="http://localhost:3000/">Cart</a>
      </div>
    </header>
  );
};

export default Navbar;
