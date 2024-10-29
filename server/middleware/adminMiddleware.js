// server/middleware/adminMiddleware.js
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const adminMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(403).json({ error: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (user && user.isAdmin) {
      req.user = user;
      next();
    } else {
      res.status(403).json({ error: 'Admin access required' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

module.exports = adminMiddleware;
