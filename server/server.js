// server/server.js
const express = require('express');
const https = require('https');
const dotenv = require('dotenv');
const fs = require('fs');
const cors = require('cors');
const csrf = require('csurf');
const xssClean = require('xss-clean');
const cookieParser = require('cookie-parser'); // Add this line

const authRoutes = require('./routes/authRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'https://localhost:3000', // Client origin
  credentials: true, // Allow credentials
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser()); // Enable cookie parsing
app.use(csrf({ cookie: true })); // CSRF protection with cookies
app.use(xssClean()); // XSS protection

// Route to provide the CSRF token to the client
app.get('/api/auth/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);

const sslOptions = {
  key: fs.readFileSync('./ssl/localhost-key.pem'),
  cert: fs.readFileSync('./ssl/localhost.pem'),
};

https.createServer(sslOptions, app).listen(5000, () => {
  console.log('Server is running on https://localhost:5000');
});
