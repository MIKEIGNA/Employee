// // // client_code/src/components/LoginForm.jsx
// // import { useState } from 'react';
// // import axios from 'axios';

// // const LoginForm = () => {
// //   const [formData, setFormData] = useState({
// //     accountNumber: '',
// //     password: '',
// //   });

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, formData);
// //       console.log(response.data);
// //       alert('Login successful');
// //       localStorage.setItem('token', response.data.token);
// //     } catch (error) {
// //       alert('Error: ' + error.response.data.error);
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit} className="login-form">
// //       <input type="text" name="accountNumber" placeholder="Account Number" onChange={handleChange} required /><br />
// //       <input type="password" name="password" placeholder="Password" onChange={handleChange} required /><br />
// //       <button type="submit">Login</button>
// //     </form>
// //   );
// // };

// // export default LoginForm;

// // client_code/src/components/LoginForm.jsx
// import { useState } from 'react';
// import axios from 'axios';

// const LoginForm = () => {
//   const [formData, setFormData] = useState({
//     accountNumber: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, formData);
//       console.log(response.data);
//       alert('Login successful');
//       localStorage.setItem('token', response.data.token);
//     } catch (error) {
//       alert('Error: ' + error.response.data.error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="login-form">
//       <input type="text" name="accountNumber" placeholder="Account Number" onChange={handleChange} required /><br />
//       <input type="password" name="password" placeholder="Password" onChange={handleChange} required /><br />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default LoginForm;


// client_code/src/components/LoginForm.jsx
import React, { useState } from 'react';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    accountNumber: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login submit
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Account Number:
        <input
          type="text"
          name="accountNumber"
          pattern="[0-9]+"
          title="Only numbers are allowed"
          value={formData.accountNumber}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Password must contain at least one number, one uppercase and lowercase letter, and be at least 8 characters long"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
