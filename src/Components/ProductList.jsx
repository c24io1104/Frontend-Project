import React, { useState, useEffect } from 'react';
import Card from './Card';
import productsData from './data.json';
import './ProductList.css';

const ProductList = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [searchTerm, setSearchTerm] = useState('');
  const [showColorFilters, setShowColorFilters] = useState(false);

  useEffect(() => {
    setProducts(productsData.products);
  }, []);

  const allColors = [...new Set(products.flatMap(product => product.colors))];

  const filteredProducts = products.filter(product => {
    const matchesColor = selectedColors.length === 0 || 
                       product.colors.some(color => selectedColors.includes(color));
    const matchesPrice = product.price >= priceRange.min && 
                       product.price <= priceRange.max;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesColor && matchesPrice && matchesSearch;
  });

  const handleColorChange = (color) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setPriceRange(prev => ({ ...prev, [name]: Number(value) }));
  };

  return (
    <div className="product-page-container">
      {/* Filters Sidebar - Left Side */}
      <div className="filters-sidebar">
        <h3>Filters</h3>
        
        {/* Search Bar */}
        <div className="filter-section">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="filter-input"
          />
        </div>

        {/* Color Filter */}
        <div className="filter-section">
          <button
            onClick={() => setShowColorFilters(!showColorFilters)}
            className="filter-toggle-btn"
          >
            {showColorFilters ? '▼ Colors' : '► Colors'}
          </button>
          
          {showColorFilters && (
            <div className="color-filters">
              {allColors.map(color => (
                <div 
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className="color-option"
                  style={{
                    backgroundColor: color,
                    border: selectedColors.includes(color) ? '2px solid black' : '1px solid #ccc'
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Price Range */}
        <div className="filter-section">
          <h4>Price Range</h4>
          <div className="price-range-inputs">
            <input
              type="number"
              name="min"
              value={priceRange.min}
              onChange={handlePriceRangeChange}
              className="price-input"
              min="0"
            />
            <span>to</span>
            <input
              type="number"
              name="max"
              value={priceRange.max}
              onChange={handlePriceRangeChange}
              className="price-input"
              min="0"
            />
          </div>
        </div>

        {/* Clear Filters */}
        <button
          onClick={() => {
            setSelectedColors([]);
            setPriceRange({ min: 0, max: 100 });
            setSearchTerm('');
          }}
          className="clear-filters-btn"
        >
          Clear All Filters
        </button>
      </div>

      {/* Products Grid - Right Side */}
      <div className="products-grid-container">
        <h2 className="products-header">Our Products ({filteredProducts.length})</h2>
        
        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <p>No products match your filters</p>
            <button 
              onClick={() => {
                setSelectedColors([]);
                setPriceRange({ min: 0, max: 100 });
                setSearchTerm('');
              }}
              className="reset-filters-btn"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <Card
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;