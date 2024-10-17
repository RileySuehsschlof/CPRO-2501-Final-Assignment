import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateAccount from "./CreateAccPage/createAccount.js";
import Product from "./Components/Product.js";
import Cart from "./Cart/cart.js";
import TempNav from "./Components/TempNav.js";
import "./Pages/MainPage.js";
import MainPage from ".//Pages/MainPage.js";
import WishlistPage from ".//Pages/WishlistPage.js";
import ScrollToTop from "./Components/ScrollToTop.js";
import Navigation from "./Components/Navigation.js";

function App() {
  const regCardData = [
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Eo_circle_blue_number-1.svg/2048px-Eo_circle_blue_number-1.svg.png",
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
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Eo_circle_red_number-2.svg/2048px-Eo_circle_red_number-2.svg.png",
      title: "Product Title 2",
      price: "$29.99",
      link: "http://localhost:3000/",
    },
  ];

  const wishlistCardData = [
    {
      image:
        "https://as2.ftcdn.net/v2/jpg/00/99/53/31/1000_F_99533164_fpE2O6vEjnXgYhonMyYBGtGUFCLqfTWA.jpg",
      title: "Product Title 1",
      price: "$29.99",
      link: "http://localhost:3000/",
    },
    {
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/011/287/998/small_2x/number-2-3d-gold-png.png",
      title: "Product Title 2",
      price: "$29.99",
      link: "http://localhost:3000/",
    },
  ];

  return (
    <>
      {/* Enables navigation with routing */}
      <Router>
        {/* TempNav was a temporary navigation bar whose only use was for an assignment */}
        {/* <TempNav /> */}
        <Navigation />
        <ScrollToTop />
        <Routes>
          <Route
            path=""
            element={
              <MainPage
                regCardData={regCardData}
                recommendedCardData={recommendedCardData}
              />
            }
          ></Route>

          <Route path="/product" element={<Product />} />

          <Route
            path="/wishlist"
            element={<WishlistPage wishlistCardData={wishlistCardData} />}
          ></Route>

          <Route path="/cart" element={<Cart />} />

          <Route path="/register" element={<CreateAccount />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
