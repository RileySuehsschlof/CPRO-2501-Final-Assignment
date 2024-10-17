import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

// Function that returns the component for the navigation bar
function Navigation() {
  const [isOpen, setIsOpen] = useState(false); // State to toggle hamburger menu

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className={`nav ${isOpen ? "open" : ""}`}>
      <div className="left">
        <Link className="navbarButton" to="/" onClick={closeMenu}>
          Home
        </Link>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        &#9776;
      </div>
      <div className="right">
        <Link className="navbarButton" to="/register" onClick={closeMenu}>
          Account
        </Link>
        <Link className="navbarButton" to="/wishlist" onClick={closeMenu}>
          Wishlist
        </Link>
        <Link className="navbarButton" to="/cart" onClick={closeMenu}>
          Cart
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;
