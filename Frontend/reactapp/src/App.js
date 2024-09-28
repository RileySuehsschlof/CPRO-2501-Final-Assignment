import React from 'react';
import './App.css';
import ImageCarousel from './ImageCarousel/ImageCarousel';
import ProductPage from './ProductPage/ProductPage';
// import selfie from '../ImageCarousel/selfie.jpg';

//an example product
const product = {
  name: "Sample Product",
  images: [
    // selfie,
    'https://via.placeholder.com/400x300?text=Image+2',
    'https://via.placeholder.com/400x300?text=Image+3',
  ],
  description: "This is a great product that you will love!",
  price: 29.99
};

function App() {
  return (
    <div className="App flex-container">
      <header className="App-header">
        header
      </header>
      <ProductPage product={product} />

      <button onClick={() => alert('Button clicked!')}>Click Me</button>
    </div>
  );
}
export default App;
