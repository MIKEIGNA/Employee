// // server/routes/authRoutes.js
// const express = require('express');
// const { registerUser, loginUser } = require('../controllers/userController');

// const router = express.Router();

// // Route for user registration
// router.post('/register', registerUser);

// // Route for user login
// router.post('/login', loginUser);

// module.exports = router;


// server/routes/authRoutes.js
const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const adminMiddleware = require('../middleware/adminMiddleware'); // Middleware to check admin access

const router = express.Router();

// Only accessible to admin users
router.post('/register', adminMiddleware, registerUser);

// User login
router.post('/login', loginUser);

module.exports = router;
