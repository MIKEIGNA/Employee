// // server/controllers/userController.js
// const { User } = require('../models');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// // Register user
// const registerUser = async (req, res) => {
//   const { fullName, idNumber, accountNumber, password } = req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = await User.create({
//       fullName,
//       idNumber,
//       accountNumber,
//       password: hashedPassword,
//     });
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Login user
// const loginUser = async (req, res) => {
//   const { accountNumber, password } = req.body;

//   try {
//     const user = await User.findOne({ where: { accountNumber } });
//     if (user && await bcrypt.compare(password, user.password)) {
//       const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//       res.status(200).json({ message: 'Login successful', token });
//     } else {
//       res.status(401).json({ error: 'Invalid credentials' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = { registerUser, loginUser };


// server/controllers/userController.js
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { fullName, idNumber, accountNumber, password } = req.body;

  const accountNumberPattern = /^[0-9]+$/;
  const passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  if (!accountNumberPattern.test(accountNumber)) {
    return res.status(400).json({ error: 'Invalid account number format' });
  }
  if (!passwordPattern.test(password)) {
    return res.status(400).json({ error: 'Password must contain at least one number, one uppercase and lowercase letter, and be at least 8 characters long' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      fullName,
      idNumber,
      accountNumber,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
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
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ message: 'Login successful', token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser };
