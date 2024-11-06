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
        fullName: 'Admin User2',
        idNumber: '89373423',
        accountNumber: '012345678910',
        password: await bcrypt.hash('AdminPassword10!', 10),
        role: 'admin',
      },
      {
        fullName: 'Regular User',
        idNumber: '839343434',
        accountNumber: '112345678910',
        password: await bcrypt.hash('UserPassword11!', 10),
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
