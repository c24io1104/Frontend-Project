import "./App.css";
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Components/header';
import ProductList from "./Components/ProductList";
import ShoppingCart from "./Components/ShoppingCart";
import LoginPage from "./Loginpage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <Router>
      <Header cartCount={cart.length} />
      <div className="container">
        <Routes>
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/" /> : 
            <LoginPage setIsAuthenticated={setIsAuthenticated} />
          } />
          
          <Route path="/" element={
            isAuthenticated ? <ProductList onAddToCart={addToCart} /> : <Navigate to="/login" />
          } />
          
          <Route path="/cart" element={
            isAuthenticated ? <ShoppingCart cart={cart} setCart={setCart} /> : <Navigate to="/login" />
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
