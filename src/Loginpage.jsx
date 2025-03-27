import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Preset credentials
  const validUsers = [
    { username: 'admin', password: 'admin123' },
    { username: 'user1', password: 'pass123' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check against preset users
    const isValidUser = validUsers.some(
      user => user.username === username && user.password === password
    );

    if (isValidUser) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/'); // Redirect to home after login
    } else {
      setError('Invalid credentials (try admin/admin123)');
    }
  };

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '50px auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px'
    }}>
      <h2 style={{ textAlign: 'center' }}>Login</h2>
      
      {error && (
        <p style={{ 
          color: 'red', 
          backgroundColor: '#ffebee',
          padding: '10px',
          borderRadius: '4px'
        }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ margin: '15px 0' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
            required
          />
        </div>

        <div style={{ margin: '15px 0' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
            required
          />
        </div>

        <button 
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Login
        </button>
      </form>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <p>Demo accounts:</p>
        <div><strong>admin / admin123</strong></div>
        <div><strong>user1 / pass123</strong></div>
      </div>
    </div>
  );
};

export default LoginPage;