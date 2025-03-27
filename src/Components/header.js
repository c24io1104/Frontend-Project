import React from 'react';
import { Link } from 'react-router-dom';


const Header = ({ cartCount }) => {
  return (
    <header>
      <nav>
        <ul style={{ display: 'flex', gap: '20px', listStyle: 'none', alignItems: 'center' }}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/menu2">Menu 2</Link></li>
          <li><Link to="/menu3">Menu 3</Link></li>
          <li><Link to="/menu4">Menu 4</Link></li>
          <li>
            <Link to="/cart" style={{ position: 'relative' }}>
              
              {cartCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '-10px',
                    backgroundColor: 'red',
                    color: 'white',
                    borderRadius: '50%',
                    padding: '2px 6px',
                    fontSize: '12px',
                  }}
                >
                  {cartCount}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;