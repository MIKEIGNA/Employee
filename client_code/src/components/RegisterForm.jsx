// client_code/src/pages/Register.jsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      alert('Access Denied: Only admins can register new customers.');
      navigate('/home'); // Redirect non-admins to the home page
    }
  }, [navigate]);
  
//   useEffect(() => {
//     const role = localStorage.getItem('role');
//     if (!role) {
//         alert('No user is logged in. Please log in first.');
//         navigate('/login'); // Redirect to login if no role found
//         return; // Exit effect
//     }
//     if (role !== 'admin') {
//         alert('Access Denied: Only admins can register new customers.');
//         navigate('/home');
//     }
// }, [navigate]);


  return (
    <div className="register-container">
      <h2>Register</h2>
      <RegisterForm />
    </div>
  );
};

export default Register;
