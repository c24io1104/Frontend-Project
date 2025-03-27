import React, { useState } from 'react';
import Card from './Card';

const products = [
    {
      id: 1,
      name: 'Product 1',
      price: 19.99,
      stock: 5,
      colors: ['red', 'blue', 'green'],
      picture: '/product.png',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 24.99,
      stock: 5,
      colors: ['yellow', 'purple', 'white'],
      picture: '/product.png',
    },
    {
      id: 3,
      name: 'Product 3',
      price: 29.99,
      stock: 5,
      colors: ['black', 'pink', 'orange'],
      picture: '/product.png',
    },
    {
      id: 4,
      name: 'Product 4',
      price: 15.99,
      stock: 5,
      colors: ['brown', 'gray', 'teal'],
      picture: '/product.png',
    },
    {
      id: 5,
      name: 'Product 5',
      price: 39.99,
      stock: 5,
      colors: ['cyan', 'magenta', 'lime', 'indigo'],
      picture: '/product.png',
    },
    {
      id:6,
      name: 'Product 6',
      price: 29.99,
      stock: 4,
      colors: ['black', 'white'],
      picture: "Product.png",
    },
  ];


const ProductList = ({ onAddToCart }) => {
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [searchTerm, setSearchTerm] = useState('');
  const [showColorFilters, setShowColorFilters] = useState(false);

  // Get unique colors from all products
  const allColors = [...new Set(products.flatMap((product) => product.colors))];

  // Handle color filter changes
  const handleColorChange = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color)
        ? prev.filter((c) => c !== color) // Remove color if already selected
        : [...prev, color] // Add color if not selected
    );
  };

  // Handle price range changes
  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({ ...prev, [name]: Number(value) }));
  };

  // Filter products based on selected filters and search term
  const filteredProducts = products.filter((product) => {
    const matchesColor =
      selectedColors.length === 0 || product.colors.some((color) => selectedColors.includes(color));
    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesColor && matchesPrice && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      {/* Sidebar with Filters */}
      <div style={{ width: '230px', padding: '55px', borderRight: '1px solid #ccc' }}>
        <h3>Filters</h3>

        {/* Search Bar */}
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
          />
        </div>

        {/* Color Filter */}
        <div>
          <button
            onClick={() => setShowColorFilters(!showColorFilters)}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#f0f0f0',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            {showColorFilters ? 'Hide Colors' : 'Select Color'}
          </button>
          {showColorFilters && (
            <div style={{ marginTop: '10px' }}>
              {allColors.map((color) => (
                <div key={color} style={{ marginBottom: '5px' }}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedColors.includes(color)}
                      onChange={() => handleColorChange(color)}
                    />
                    {color}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Price Range Filter */}
        <div>
          <h4>Price Range</h4>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="number"
              name="min"
              placeholder="Min"
              value={priceRange.min}
              onChange={handlePriceRangeChange}
              style={{ width: '80px' }}
            />
            <input
              type="number"
              name="max"
              placeholder="Max"
              value={priceRange.max}
              onChange={handlePriceRangeChange}
              style={{ width: '80px' }}
            />
          </div>
        </div>

        {/* Clear Filters Button */}
        <button
          onClick={() => {
            setSelectedColors([]);
            setPriceRange({ min: 0, max: 100 });
            setSearchTerm('');
          }}
          style={{ marginTop: '20px', padding: '10px', width: '100%' }}
        >
          Clear Filters
        </button>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1 }}>
        <h3>Products</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              name={product.name}
              price={product.price}
              colors={product.colors}
              img={product.picture}
              stock={product.stock}
              onAddToCart={() => onAddToCart(product)} // Pass the product to addToCart
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;