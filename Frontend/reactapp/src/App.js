import './App.css';


const products = [
  { id: 1, name: 'Item 1', price: 10 },
  { id: 2, name: 'Item 2', price: 20 },
  { id: 3, name: 'Item 3', price: 30 },
];

const App = () => {
  return (
    <div className="Container">
      <navBar />
      <div className="Cart" style={{ padding: '20px' }}>
        <h1 style={{ marginTop: '0px' }}>Shopping Cart</h1>
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
          <li key={product.id} style={{ marginBottom: '10px' }}>
            <button style={{ marginRight: '10px' }}>Remove</button>
            <span>{product.name} - ${product.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const CartSubtotal = () => {
  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Cart Subtotal</h2>
      <p>No items in the cart yet.</p>
      <button disabled>Checkout</button>
    </div>
  );
};


export default App;
