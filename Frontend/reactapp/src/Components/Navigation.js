import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import { useNavigate } from "react-router-dom";

// Function that returns the component for the navigation bar
function Navigation() {
  const [isOpen, setIsOpen] = useState(false); // State to toggle hamburger menu
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!sessionStorage.getItem("authToken")
  );
  const navigate = useNavigate();
  useEffect(() => {
    // Function to check sessionStorage for authToken changes
    const checkAuthToken = () => {
      const token = sessionStorage.getItem("authToken");
      setIsLoggedIn(!!token && token.trim() !== "");
    };
    // Update state on page load
    checkAuthToken();

    // Listen for changes to sessionStorage
    window.addEventListener("storage", checkAuthToken);
    // Clean up the listener
    return () => {
      window.removeEventListener("storage", checkAuthToken);
    };
  }, []);
  // const linkToAccount = isLoggedIn ? "/account" : "/login";

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };
  const handleAccountClick = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("authToken");
    if (token && token.trim() !== "") {
      navigate("/account");
    } else {
      navigate("/login");
    }
    closeMenu();
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
        <a className="navbarButton" href="#" onClick={handleAccountClick}>
          Account
        </a>
        {/* <Link className="navbarButton" to={linkToAccount} onClick={closeMenu}>
          Account
        </Link> */}
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
