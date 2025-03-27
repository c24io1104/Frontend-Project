import "./App.css";
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/header';
import ProductList from "./Components/ProductList";
import Menu2 from "./Pages/Menu2";
import Menu3 from "./Pages/Menu3";
import Menu4 from "./Pages/Menu4";
import ProtectedRoute from './Components/ProtectedRoute'; // Import the ProtectedRoute
import ShoppingCart from "./Components/ShoppingCart";
import LoginPage from "./Components/Loginpage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState([]);
  <LoginPage />
  const toggleAuthentication = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const cartCount = cart.length; // Number of items in the cart

  return (
    
    <Router>
      <Header cartCount={cartCount} /> {/* Pass cartCount to Header */}
      <div className="container">
        <button className="auth-button" onClick={toggleAuthentication}>
          {isAuthenticated ? "Log Out" : "Log In"}
        </button>
        <Routes>
          <Route path="/" element={<ProductList onAddToCart={addToCart} />} />
          <Route path="/menu1" element={<ProductList onAddToCart={addToCart} />} />
          <Route path="/menu2" element={<Menu2 />} />
          <Route path="/menu3" element={<Menu3 />} />
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/menu4" element={<Menu4 />} />
          </Route>
          <Route path="/cart" element={<ShoppingCart cart={cart} setCart={setCart} />} />
        </Routes>
      </div>
    </Router>
  );
};
export default App