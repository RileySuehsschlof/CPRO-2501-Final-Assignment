import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateAccount from "./createAccount";
import Product from "./Product";
import Cart from "./cart";
import Navigation from "./Navigation";
import "./Pages/MainPage.js";
import { useNavigate } from "react-router-dom";
import MainPage from ".//Pages/MainPage.js";
import WishlistPage from ".//Pages/WishlistPage.js";

function App() {
  const regCardData = [
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Eo_circle_blue_number-1.svg/2048px-Eo_circle_blue_number-1.svg.png",
      title: "Product Title 1",
      price: "$29.99",
      link: "http://localhost:3000/",
    },
    {
      image: "https://cdn-icons-png.flaticon.com/512/6947/6947566.png",
      title: "Product Title 2",
      price: "$29.99",
      link: "http://localhost:3000/",
    },
  ];

  const recommendedCardData = [
    {
      image: "https://cdn-icons-png.flaticon.com/512/8068/8068017.png",
      title: "Product Title 1",
      price: "$29.99",
      link: "http://localhost:3000/",
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Eo_circle_red_number-2.svg/2048px-Eo_circle_red_number-2.svg.png",
      title: "Product Title 2",
      price: "$29.99",
      link: "http://localhost:3000/",
    },
  ];

  const wishlist = [
    {
      WishlistProductID: "101-201",
      WishlistID: 101, // customerID
      ProductID: 201,
      addedDate: new Date().toISOString(),
      title:"Product 1",
      notes: "John would like!",
      imageURL: "https://as2.ftcdn.net/v2/jpg/00/99/53/31/1000_F_99533164_fpE2O6vEjnXgYhonMyYBGtGUFCLqfTWA.jpg",
      price: "$29.99",
    },
    {
      WishlistProductID: "101-202",
      WishlistID: 101,
      ProductID: 202,
      addedDate: new Date().toISOString(),
      title: "Product 2",
      notes: "Jane would want this one!",
      imageURL: "https://static.vecteezy.com/system/resources/thumbnails/011/287/998/small_2x/number-2-3d-gold-png.png",
      price: "$39.99",
    },
  ];

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="" element={<MainPage regCardData={regCardData} recommendedCardData={recommendedCardData} />} />
        <Route path="/product" element={<Product />} />
        <Route path="/wishlist" element={<WishlistPage wishlist={wishlist} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<CreateAccount />} />
      </Routes>
    </Router>
  );
}

export default App;