//server/controllers/paymentController.js
const { Payment } = require('../models');
const jwt = require('jsonwebtoken');

// Create Payment
const createPayment = async (req, res) => {
  const { amount, currency, provider, accountInfo, swiftCode } = req.body;
  try {
    const newPayment = await Payment.create({
      amount,
      currency,
      provider,
      accountInfo,
      swiftCode,
      userId: req.user.id,
      status: 'Pending',
    });
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Payments (for employees)
const getPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Verify Payment
const verifyPayment = async (req, res) => {
  const { paymentId } = req.params;
  try {
    const payment = await Payment.findByPk(paymentId);
    if (!payment) return res.status(404).json({ error: 'Payment not found' });

    payment.status = 'Verified';
    await payment.save();
    res.status(200).json({ message: 'Payment verified successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createPayment, getPayments, verifyPayment };
