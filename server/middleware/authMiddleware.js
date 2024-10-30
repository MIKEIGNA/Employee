// server/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(403).json({ error: 'Unauthorized access' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // Check if the role is authorized
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ error: 'Access Denied' });
      }

      next();
    } catch (error) {
      res.status(401).json({ error: 'Invalid Token' });
    }
  };
};

module.exports = authMiddleware;
