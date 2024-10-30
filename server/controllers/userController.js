// // server/controllers/userController.js
// const loginUser = async (req, res) => {
//   const { accountNumber, password } = req.body;

//   try {
//     const user = await User.findOne({ where: { accountNumber } });
//     if (user && await bcrypt.compare(password, user.password)) {
//       const token = jwt.sign(
//         { id: user.id, role: user.role }, // Include the role in the token
//         process.env.JWT_SECRET,
//         { expiresIn: '1h' }
//       );
//       res.status(200).json({ message: 'Login successful', token, role: user.role });
//     } else {
//       res.status(401).json({ error: 'Invalid credentials' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// server/controllers/userController.js

const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user (Admin-only access)
const registerUser = async (req, res) => {
  const { fullName, idNumber, accountNumber, password, role } = req.body;

  try {
    // Check if the user making the request has an admin role
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required to register a new user' });
    }

    // Check if the accountNumber or idNumber already exists
    const existingUser = await User.findOne({ where: { accountNumber } });
    if (existingUser) {
      return res.status(400).json({ error: 'Account number already exists' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await User.create({
      fullName,
      idNumber,
      accountNumber,
      password: hashedPassword,
      role: role || 'user', // Default role to 'user' if not specified
    });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { accountNumber, password } = req.body;

  try {
    const user = await User.findOne({ where: { accountNumber } });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { id: user.id, role: user.role }, // Include the role in the token
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      res.status(200).json({ message: 'Login successful', token, role: user.role });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser };
