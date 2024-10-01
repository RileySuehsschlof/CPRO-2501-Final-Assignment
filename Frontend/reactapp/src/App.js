import './App.css';

class Card {
  constructor(image, title, price, link) {
    this.image = image;
    this.title = title;
    this.price = price;
    this.link = link;
  }

  render() {
    return (
      <div className="card">
        <img src={this.image} alt="Product Image" className="card-image" />
        <div className="card-content">
          <h2 className="card-title">{this.title}</h2>
          <p className="card-price">{this.price}</p>
          <a className="card-link" href={this.link}>View Details</a>
        </div>
      </div>
    );
  }
}

function App() {
  const regCardData = [
    new Card(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Eo_circle_blue_number-1.svg/2048px-Eo_circle_blue_number-1.svg.png",
      "Product Title 1",
      "$29.99",
      "http://localhost:3000/"
    ),
    new Card(
      "https://cdn-icons-png.flaticon.com/512/6947/6947566.png",
      "Product Title 2",
      "$29.99",
      "http://localhost:3000/"
    ),
  ];

  const recommendedCardData = [
    new Card(
      "https://cdn-icons-png.flaticon.com/512/8068/8068017.png",
      "Product Title 1",
      "$29.99",
      "http://localhost:3000/"
    ),
    new Card(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Eo_circle_red_number-2.svg/2048px-Eo_circle_red_number-2.svg.png",
      "Product Title 2",
      "$29.99",
      "http://localhost:3000/"
    ),
  ];

  return (
    <div className="App">
      <header className="App-header">
        <div className="navbar">
          <h1>Generic Store Name</h1>
          <a href="http://localhost:3000/">Home</a>
          <a href="http://localhost:3000/">Back to School</a>
          <a href="http://localhost:3000/">Special Offers</a>
          <a href="http://localhost:3000/">Other Cool Menu Thing</a>
          <a href="http://localhost:3000/">Our Locations</a>
          <a href="http://localhost:3000/">Cart</a>
        </div>
      </header>
      <body>
        <h1>On Sale</h1>
        <div id="regCards">
          {regCardData.map(card => card.render())}
        </div>
        <h1>Products You Might Like</h1>
        <div id="recommendedCards">
          {recommendedCardData.map(card => card.render())}
        </div>
      </body>
      <footer>
      </footer>
    </div>
  );
}

export default App;
