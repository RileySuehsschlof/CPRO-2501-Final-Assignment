import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateAccount from "./Pages/CreateAccPage/createAccount.js";
import Product from "./Components/Product.js";
import Cart from "./Components/Cart/cart.js";
import "./Pages/MainPage/MainPage.js";
import MainPage from ".//Pages/MainPage/MainPage.js";
import WishlistPage from ".//Pages/WishlistPage/WishlistPage.js";
import ScrollToTop from "./Components/ScrollToTop.js";
import Navigation from "./Components/Navigation.js";
import Login from "./Pages/LoginPage/Login.js";
import SecondaryInfo from "./Pages/CreateAccPage/SecondaryInfo.js";
import PrivateRoute from "./Components/PrivateRoute.js";
import AccDetailsPage from ".//Pages/AccDetailsPage/AccDetailsPage.js";
import Success from "./Components/Stripe/Success.js";
import Cancel from "./Components/Stripe/Cancel.js";

function App() {
  const regCardData = [
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Eo_circle_blue_number-1.svg/2048px-Eo_circle_blue_number-1.svg.png",
      title: "Product Title 1",
      price: "$29.99",
      link: "product",
    },
    {
      image: "https://cdn-icons-png.flaticon.com/512/6947/6947566.png",
      title: "Product Title 2",
      price: "$29.99",
      link: "product",
    },
  ];

  const recommendedCardData = [
    {
      image: "https://cdn-icons-png.flaticon.com/512/8068/8068017.png",
      title: "Product Title 1",
      price: "$29.99",
      link: "product",
    },
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Eo_circle_red_number-2.svg/2048px-Eo_circle_red_number-2.svg.png",
      title: "Product Title 2",
      price: "$29.99",
      link: "product",
    },
  ];

  const wishlist = [
    {
      WishlistProductID: "101-201",
      WishlistID: 101, // customerID
      ProductID: 201,
      addedDate: new Date().toISOString(),
      title: "Product 1",
      notes: "John would like!",
      imageURL:
        "https://as2.ftcdn.net/v2/jpg/00/99/53/31/1000_F_99533164_fpE2O6vEjnXgYhonMyYBGtGUFCLqfTWA.jpg",
      price: "$29.99",
    },
    {
      WishlistProductID: "101-202",
      WishlistID: 101,
      ProductID: 202,
      addedDate: new Date().toISOString(),
      title: "Product 2",
      notes: "Jane would want this one!",
      imageURL:
        "https://static.vecteezy.com/system/resources/thumbnails/011/287/998/small_2x/number-2-3d-gold-png.png",
      price: "$39.99",
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
          {/* Define Routes here */}
          <Route
            path=""
            element={
              <MainPage
                regCardData={regCardData}
                recommendedCardData={recommendedCardData}
              />
            }
          ></Route>

          <Route path="/product/:productId" element={<Product />} />

          <Route path="/register" element={<CreateAccount />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register2" element={<SecondaryInfo />} />
          <Route
            path="/account"
            element={<PrivateRoute element={<AccDetailsPage />} />}
          />

          {/* Protected Routes */}
          <Route
            path="/wishlist"
            element={
              <PrivateRoute element={<WishlistPage wishlist={wishlist} />} />
            }
          />
          <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
