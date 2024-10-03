import './App.css';
import { useState } from 'react';
import Navbar from './/Components/Navbar.js';
import Footer from './/Components/Footer.js';
import Card from './/Components/Card.js';
import MainPage from './/Pages/MainPage.js';
import WishlistPage from './/Pages/WishlistPage.js';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const regCardData = [
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Eo_circle_blue_number-1.svg/2048px-Eo_circle_blue_number-1.svg.png",
      title: "Product Title 1",
      price: "$29.99",
      link: "http://localhost:3000/"
    },
    {
      image: "https://cdn-icons-png.flaticon.com/512/6947/6947566.png",
      title: "Product Title 2",
      price: "$29.99",
      link: "http://localhost:3000/"
    },
  ];

  const recommendedCardData = [
    {
      image: "https://cdn-icons-png.flaticon.com/512/8068/8068017.png",
      title: "Product Title 1",
      price: "$29.99",
      link: "http://localhost:3000/"
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Eo_circle_red_number-2.svg/2048px-Eo_circle_red_number-2.svg.png",
      title: "Product Title 2",
      price: "$29.99",
      link: "http://localhost:3000/"
    },
  ];

  const wishlistCardData = [
    {
      image: "https://as2.ftcdn.net/v2/jpg/00/99/53/31/1000_F_99533164_fpE2O6vEjnXgYhonMyYBGtGUFCLqfTWA.jpg",
      title: "Product Title 1",
      price: "$29.99",
      link: "http://localhost:3000/"
    },
    {
      image: "https://static.vecteezy.com/system/resources/thumbnails/011/287/998/small_2x/number-2-3d-gold-png.png",
      title: "Product Title 2",
      price: "$29.99",
      link: "http://localhost:3000/"
    },
  ];

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <Navbar onNavigate={handleNavigation} />
      <main>
        {currentPage === 'home' && (
          <MainPage regCardData={regCardData} recommendedCardData={recommendedCardData} />
        )}
        {currentPage === 'wishlist' && (
          <WishlistPage wishlistCardData={wishlistCardData} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;