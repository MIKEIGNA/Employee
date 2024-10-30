// // client_code/src/components/LoginForm.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [csrfToken, setCsrfToken] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');

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

  const handleLogin = async (e) => {
    e.preventDefault();
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
      // // Save user role to localStorage
      // localStorage.setItem('role', response.data.role); // Ensure this line exists
      // // In LoginForm.jsx after successful login
      // console.log('User role saved to localStorage:', response.data.role);

      if(response.data.role === 'admin') {
        console.log('Admin Login successful:', response.data);
        alert('Admin Login successful. You can register other Users.');
        window.location.href = '/home';
      }
      else if(response.data.role === 'user') {
        console.log('User Login successful:', response.data);
        alert('User Login successful. Please proceed .');
        window.location.href = '/';
      }

      // window.location.href = '/home';
    } catch (error) {
      console.error('Login failed:', error);
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
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
