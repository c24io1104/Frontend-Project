import React from 'react';

const ShoppingCart = ({ cart, setCart }) => {
  const handleIncrement = (productId) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );
    setCart(updatedCart);
  };

  const handleDecrement = (productId) => {
    const updatedCart = cart
      .map((item) =>
        item.id === productId ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 1) } : item
      )
      .filter((item) => item.quantity > 0); // Remove item if quantity is 0
    setCart(updatedCart);
  };

  const handlePayment = () => {
    alert('Payment successful! Your cart has been cleared.');
    setCart([]); // Clear the cart
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button onClick={() => handleDecrement(item.id)}>-</button>
                <span>{item.quantity || 1}</span>
                <button onClick={() => handleIncrement(item.id)}>+</button>
              </div>
            </div>
          ))}
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          <button
            onClick={handlePayment}
            style={{
              padding: '10px 20px',
              backgroundColor: '#61dafb',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Proceed to Payment
          </button>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;