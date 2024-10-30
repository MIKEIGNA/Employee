// server/scripts/createUsers.js

const bcrypt = require('bcrypt');
const { User } = require('../models'); // Make sure this path points to your models
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const createUsers = async () => {
  try {
    // Define users with necessary fields
    const users = [
      {
        fullName: 'Admin User',
        idNumber: '1234567890',
        accountNumber: '12345678910',
        password: await bcrypt.hash('AdminPassword55!', 10),
        role: 'admin',
      },
      {
        fullName: 'Regular User',
        idNumber: '0987654321',
        accountNumber: '123456789911',
        password: await bcrypt.hash('UserPassword55!', 10),
        role: 'user',
      }
    ];

    // Bulk insert users
    await User.bulkCreate(users);
    console.log('Users created successfully!');
  } catch (error) {
    console.error('Error creating users:', error);
  }
};

// Run the function to create users
createUsers();
