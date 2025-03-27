import "./App.css";
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Components/header';
import ProductList from "./Components/ProductList";
import ShoppingCart from "./Components/ShoppingCart";
import LoginPage from "./Loginpage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState([]);

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
      });
      
      const result = await response.text();
      if (result.includes("Success")) {
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

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
            <LoginPage onLogin={handleLogin} />
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