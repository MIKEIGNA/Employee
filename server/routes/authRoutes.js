// server/routes/authRoutes.js

const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Route for user registration (admin-only access)
router.post('/register', authMiddleware(['admin']), registerUser);

// Route for user login
router.post('/login', loginUser);

module.exports = router;
