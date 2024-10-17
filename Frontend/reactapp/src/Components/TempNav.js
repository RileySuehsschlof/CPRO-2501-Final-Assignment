import { useNavigate } from "react-router-dom";
import "./TempNav.css";
// function thatmanages page navigation to a segment
function TempNav() {
  const navigate = useNavigate();
  return (
    <nav className="nav">
      <button className="navBtnRoute" onClick={() => navigate("")}>
        Main
      </button>

      <button className="navBtnRoute" onClick={() => navigate("/product")}>
        View a Product
      </button>

      <button className="navBtnRoute" onClick={() => navigate("/wishlist")}>
        Wishlist
      </button>

      <button className="navBtnRoute" onClick={() => navigate("/register")}>
        Create Account
      </button>

      <button className="navBtnRoute" onClick={() => navigate("/cart")}>
        View Cart
      </button>
    </nav>
  );
}
export default TempNav;
