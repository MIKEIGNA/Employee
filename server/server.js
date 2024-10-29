// // server/server.js

// const express = require('express');
// const https = require('https');
// const dotenv = require('dotenv');
// const fs = require('fs'); 
// const cors = require('cors');

// const authRoutes = require('./routes/authRoutes');
// const paymentRoutes = require('./routes/paymentRoutes');

// // Load environment variables
// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/payments', paymentRoutes);

// const sslOptions = {
//     key: fs.readFileSync('./ssl/localhost-key.pem'),
//     cert: fs.readFileSync('./ssl/localhost.pem'),
// };

// https.createServer(sslOptions, app).listen(5000, () => {
//     console.log('Server is running on https://localhost:5000');
// });


// server/server.js
const express = require('express');
const https = require('https');
const dotenv = require('dotenv');
const fs = require('fs');
const cors = require('cors');
const csrf = require('csurf');
const xssClean = require('xss-clean');

const authRoutes = require('./routes/authRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(csrf()); // CSRF protection
app.use(xssClean()); // XSS protection

app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);

const sslOptions = {
  key: fs.readFileSync('./ssl/localhost-key.pem'),
  cert: fs.readFileSync('./ssl/localhost.pem'),
};

https.createServer(sslOptions, app).listen(5000, () => {
  console.log('Server is running on https://localhost:5000');
});
