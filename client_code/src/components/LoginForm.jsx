// // client_code/src/components/LoginForm.jsx

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const LoginForm = () => {
//   const [accountNumber, setAccountNumber] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       // const response = await axios.post('/api/auth/login', { accountNumber, password });
//       const response = await axios.post('https://localhost:5000/api/auth/login', { accountNumber, password });

//       console.log('Login successful:', response.data);
//       const { token, role } = response.data;
      
//       localStorage.setItem('token', token);
//       localStorage.setItem('role', role);

//       // Navigate based on role
//       if (role === 'admin') {
//         navigate('/register');
//       } else {
//         navigate('/home');
//       }
//     } catch (error) {
//       console.error('Login failed:', error);
//       alert('Login failed. Please check your credentials.');
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <input
//         type="text"
//         placeholder="Account Number"
//         value={accountNumber}
//         onChange={(e) => setAccountNumber(e.target.value)}
//         required
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// // export default LoginForm;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const LoginForm = () => {
//   const [accountNumber, setAccountNumber] = useState('');
//   const [password, setPassword] = useState('');
//   const [csrfToken, setCsrfToken] = useState(''); // Add CSRF token state
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCsrfToken = async () => {
//       try {
//         // const response = await axios.get('/api/csrf-token', { withCredentials: true });
//         const response = await axios.post('https://localhost:5000/api/auth/login', { accountNumber, password }, {
//           headers: { 'X-CSRF-Token': csrfToken }, // Add CSRF token header
//           withCredentials: true, // Allow cookies to be sent
//         });
//         console.log('CSRF token:', response.data.csrfToken);
//         console.log('Response data:', response.data);        
//         setCsrfToken(response.data.csrfToken);
//       } catch (error) {
//         console.error('Failed to fetch CSRF token:', error);
//       }
//     };

//     fetchCsrfToken();
//   }, []);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         '/api/auth/login',
//         { accountNumber, password },
//         {
//           headers: { 'X-CSRF-Token': csrfToken },
//           withCredentials: true,
//         }
//       );
//       const { token, role } = response.data;

//       localStorage.setItem('token', token);
//       localStorage.setItem('role', role);

//       // Navigate based on role
//       if (role === 'admin') {
//         navigate('/register');
//       } else {
//         navigate('/home');
//       }
//     } catch (error) {
//       console.error('Login failed:', error);
//       alert('Login failed. Please check your credentials.');
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <input
//         type="text"
//         placeholder="Account Number"
//         value={accountNumber}
//         onChange={(e) => setAccountNumber(e.target.value)}
//         required
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default LoginForm;


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
      if(response.data.role === 'admin') {
        console.log('Admin Login successful:', response.data);
        alert('Admin Login successful. You can register other Users.');
        window.location.href = '/register';
      }
      else if(response.data.role === 'user') {
        console.log('User Login successful:', response.data);
        alert('User Login successful. Please proceed .');
        window.location.href = '/home';
      }

      window.location.href = '/home';
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
