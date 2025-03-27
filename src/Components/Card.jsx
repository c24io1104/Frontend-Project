import React, { useState } from 'react'; // Add this import
import './card.css';

const Card = ({ product, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`product-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
        
        <div className="color-options">
          {product.colors.map(color => (
            <span 
              key={color}
              className="color-dot"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>

        <div className="price-addtocart">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button 
            onClick={() => onAddToCart(product)}
            className="add-to-cart-btn"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;