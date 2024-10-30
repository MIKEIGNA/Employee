// client_code/src/components/LoginForm.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [csrfToken, setCsrfToken] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Fetch CSRF token on component mount
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('https://localhost:5000/api/auth/csrf-token', {
          withCredentials: true
        });
        setCsrfToken(response.data.csrfToken);
      } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
      }
    };
    fetchCsrfToken();
  }, []);

  // Regex patterns
  const accountNumberPattern = /^[a-zA-Z0-9]{5,}$/;
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/; 
  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!accountNumberPattern.test(accountNumber)) {
      setError('Invalid account number. It must be at least 5 alphanumeric characters.');
      return;
    }
    if (!passwordPattern.test(password)) {
      setError('Invalid password. It must be at least 8 characters long, containing at least one letter, one number and a special character.');
      return;
    }

    setError(''); // Clear any previous errors

    try {
      const response = await axios.post(
        'https://localhost:5000/api/auth/login',
        { accountNumber, password },
        {
          headers: {
            'X-CSRF-Token': csrfToken,
          },
          withCredentials: true,
        }
      );

      // Save user role to localStorage
      localStorage.setItem('role', response.data.role); // Ensure this line exists

      if (response.data.role === 'admin') {
        console.log('Admin Login successful:', response.data);
        alert('Admin Login successful. You can register other Users.');
        window.location.href = '/home'; // Redirect to register
      } else if (response.data.role === 'user') {
        console.log('User Login successful:', response.data);
        alert('User Login successful. Please proceed.');
        window.location.href = '/'; // Redirect to home
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please check your account number and password.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Account Number"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <div style={{ color: 'red' }}>{error}</div>} {/* Error message */}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
