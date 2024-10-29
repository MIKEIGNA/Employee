// // client_code/src/components/RegisterForm.jsx
// import { useState } from 'react';
// import axios from 'axios';

// const RegisterForm = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     idNumber: '',
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
//       const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, formData);
      
//       console.log(response.data);
//       alert('Registration successful');
//     } catch (error) {
//       alert('Error: ' + error.response.data.error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="register-form">
//       <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required /><br />
//       <input type="text" name="idNumber" placeholder="ID Number" onChange={handleChange} required /><br />
//       <input type="text" name="accountNumber" placeholder="Account Number" onChange={handleChange} required /><br />
//       <input type="password" name="password" placeholder="Password" onChange={handleChange} required /><br />
//       <button type="submit">Register</button>
//     </form>
//   );
// };

// export default RegisterForm;


// client_code/src/components/RegisterForm.jsx
import { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
    accountNumber: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, formData);
      console.log(response.data);
      alert('Registration successful');
    } catch (error) {
      alert('Error: ' + error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required /><br />
      <input type="text" name="idNumber" placeholder="ID Number" onChange={handleChange} required /><br />
      <input type="text" name="accountNumber" placeholder="Account Number" onChange={handleChange} required /><br />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required /><br />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
