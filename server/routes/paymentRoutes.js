const express = require('express');
const { createPayment, getPayments, verifyPayment } = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Route to create a payment (requires user authentication)
router.post('/create', authMiddleware, createPayment);

// Route for employees to view all payments
router.get('/all', authMiddleware, getPayments);

// Route for employees to verify a payment
router.put('/verify/:paymentId', authMiddleware, verifyPayment);

module.exports = router;
