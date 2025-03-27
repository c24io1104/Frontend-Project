import React from 'react';

const ProductDetails = ({ product, onClose }) => {
  return (
    <div className="product-details-modal">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        
        <div className="modal-grid">
          <div className="product-images">
            <img src={product.picture} alt={product.name} className="main-image"/>
          </div>
          
          <div className="product-info">
            <h2>{product.name}</h2>
            <p className="price">${product.price.toFixed(2)}</p>
            <p className="description">{product.description || "No description available"}</p>
            
            <div className="color-options">
              <p>Available Colors:</p>
              <div className="color-dots">
                {product.colors.map(color => (
                  <span 
                    key={color} 
                    className="color-dot"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
            
            <button className="add-to-cart-btn" onClick={() => {
              onClose();
              onAddToCart(product);
            }}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;