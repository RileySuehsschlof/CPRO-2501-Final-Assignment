import "./cart.css";
import { useState } from "react";
import batman from "../ImageCarousel/batman.png";
import random from "../ImageCarousel/random.png";
import selfie from "../ImageCarousel/selfie.jpg";

const initialProducts = [
  { id: 1, name: "Item 1", price: 10, image: batman },
  { id: 2, name: "Item 2", price: 20, image: random },
  { id: 3, name: "Item 3", price: 30, image: selfie },
];

const Cart = () => {
  const [products, setProducts] = useState(initialProducts);

  const removeProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="Container">
      <div className="Cart">
        <h1 style={{ marginTop: "0px" }}>Shopping Cart</h1>
        <ProductList products={products} removeProduct={removeProduct} />
        <CartSubtotal products={products} />
      </div>
    </div>
  );
};

const ProductList = ({ products, removeProduct }) => {
  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt="Product" />
            <span>
              {product.name} - ${product.price}
            </span>
            <button onClick={() => removeProduct(product.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const CartSubtotal = ({ products }) => {
  return (
    <>
      <div className="Subtotal-Container">
        <span className="Subtotal">
          Cart Subtotal = ${calculateSubtotal(products)}
        </span>
      </div>
      <button className="Checkout" disabled>
        Checkout
      </button>
    </>
  );
};

function calculateSubtotal(products) {
  return products.reduce((sum, product) => sum + product.price, 0);
}

export default Cart;
