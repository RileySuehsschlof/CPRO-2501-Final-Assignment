import { Link } from "react-router-dom";
import "./Navigation.css";

// Function that returns the component for the navigation bar
function Navigation() {
  return (
    <nav className="nav">
      <div className="left">
        <Link className="navbarButton" to="/">
          Home
        </Link>
      </div>
      <div className="right">
        <Link className="navbarButton" to="/account">
          Account
        </Link>
        <Link className="navbarButton" to="/wishlist">
          Wishlist
        </Link>
        <Link className="navbarButton" to="/cart">
          Cart
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;
