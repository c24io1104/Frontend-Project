import React, { useState } from 'react';
import './Card.css';

const Card = ({ product, onAddToCart, onShowDetails }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`product-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onShowDetails(product)}
    >
      <div className="product-image-container">
        <img 
          src={product.picture} 
          alt={product.name} 
          className="product-image"
        />
        {product.stock < 5 && (
          <span className="low-stock">Only {product.stock} left!</span>
        )}
      </div>

      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <div className="price-addtocart">
          <span className="product-price">${product.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;