import "./App.css";

const products = [
  { id: 1, name: "Item 1", price: 10, image: "/logo192.png" },
  { id: 2, name: "Item 2", price: 20, image: "/logo192.png" },
  { id: 3, name: "Item 3", price: 30, image: "/logo192.png" },
];

const App = () => {
  return (
    <div className="Container">
      <div className="Cart" style={{ padding: "20px" }}>
        <h1 style={{ marginTop: "0px" }}>Shopping Cart</h1>
        <ProductList products={products} />
        <CartSubtotal />
      </div>
    </div>
  );
};

const ProductList = ({ products }) => {
  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id} style={{ marginBottom: "10px" }}>
            <img src={product.image} alt="Product" />
            <span>
              {product.name} - ${product.price}
            </span>
            <button style={{ marginLeft: "10px" }}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const CartSubtotal = () => {
  return (
    <div className="Subtotal-Container" style={{ marginTop: "20px" }}>
      <span className="Subtotal">Cart Subtotal = ${calculateSubtotal()}</span>
      <button className="Checkout" disabled>
        Checkout
      </button>
    </div>
  );
};

function calculateSubtotal() {
  return products.reduce((sum, product) => sum + product.price, 0);
}

export default App;
