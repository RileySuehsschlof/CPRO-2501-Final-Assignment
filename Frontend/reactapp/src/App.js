import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateAccount from "./createAccount";
import Product from "./Product";
import Navigation from "./Navigation";
function App() {
  return (
    <>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/register" element={<CreateAccount />} />
          <Route path="/product" element={<Product />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
