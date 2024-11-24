import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./Pages/MainPage.js";
import Product from "./ProductPage/ProductPage.js";
import CreateAccount from "./CreateAccPage/createAccount.js";
import Cart from "./Cart/cart.js";
import WishlistPage from "./Pages/WishlistPage.js"
import ScrollToTop from "./Components/ScrollToTop.js";
import Navigation from "./Components/Navigation.js";
import Login from "./LoginPage/Login.js";
import SecondaryInfo from "./CreateAccPage/SecondaryInfo.js";
import PrivateRoute from "./Components/PrivateRoute.js";
import AccDetailsPage from "./Pages/AccDetailsPage.js";

function App() {
  return (
    <Router>
      <Navigation />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/register" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register2" element={<SecondaryInfo />} />
        <Route path="/account" element={<PrivateRoute element={<AccDetailsPage />} />} />
        <Route path="/wishlist" element={<PrivateRoute element={<WishlistPage />} />} />
        <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
      </Routes>
    </Router>
  );
}

export default App;
