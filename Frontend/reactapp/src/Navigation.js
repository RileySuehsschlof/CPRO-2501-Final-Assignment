import { useNavigate } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  const navigate = useNavigate();
  return (
    <nav className="nav">
      <button className="navBtnRoute" onClick={() => navigate("/register")}>
        Create Account
      </button>
      <button className="navBtnRoute" onClick={() => navigate("/product")}>
        View a Product
      </button>
    </nav>
  );
}
export default Navigation;
