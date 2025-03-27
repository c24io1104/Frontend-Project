import React, { useState, useEffect } from 'react';
import Card from './Card';
import productsData from './data.json';

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
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      {/* Filters Sidebar */}
      <div style={{ width: '230px', padding: '20px', borderRight: '1px solid #ccc' }}>
        <h3>Filters</h3>
        
        {/* Search Bar */}
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '10px' }}
          />
        </div>

        {/* Color Filter */}
        <div>
          <button
            onClick={() => setShowColorFilters(!showColorFilters)}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          >
            {showColorFilters ? 'Hide Colors' : 'Show Colors'}
          </button>
          
          {showColorFilters && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {allColors.map(color => (
                <div 
                  key={color}
                  onClick={() => handleColorChange(color)}
                  style={{
                    width: '30px',
                    height: '30px',
                    backgroundColor: color,
                    border: selectedColors.includes(color) ? '2px solid black' : '1px solid #ccc',
                    cursor: 'pointer'
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Price Range */}
        <div style={{ marginTop: '20px' }}>
          <h4>Price Range</h4>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="number"
              name="min"
              value={priceRange.min}
              onChange={handlePriceRangeChange}
              style={{ width: '70px' }}
            />
            <span>to</span>
            <input
              type="number"
              name="max"
              value={priceRange.max}
              onChange={handlePriceRangeChange}
              style={{ width: '70px' }}
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
          style={{ marginTop: '20px', width: '100%', padding: '10px' }}
        >
          Clear Filters
        </button>
      </div>

      {/* Products Grid */}
      <div style={{ flex: 1 }}>
        <h3>Products ({filteredProducts.length})</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
          {filteredProducts.map(product => (
            <Card
              key={product.id}
              name={product.name}
              price={product.price}
              colors={product.colors}
              img={product.picture}
              stock={product.stock}
              onAddToCart={() => onAddToCart(product)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;