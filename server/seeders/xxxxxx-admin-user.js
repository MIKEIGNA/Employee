// seeds/xxxxxx-admin-user.js
'use strict';
const bcrypt = require('bcryptjs'); // Import bcrypt

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.bulkInsert('Users', [{
//       fullName: 'Admin User',
//       idNumber: 'ADMIN123',
//       accountNumber: 'ADMIN_ACCOUNT',
//       password: await bcrypt.hash('AdminPassword', 10), // Hash the password
//       role: 'admin',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     }], {});
//   },

//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.bulkDelete('Users', {
//       accountNumber: 'ADMIN_ACCOUNT'
//     });
//   }
// };


module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Users', [{
        fullName: 'Admin User2',
        idNumber: '12345678',
        accountNumber: '12345678',
        password: await bcrypt.hash('AdminPassword55!', 10), // Hash the password
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Users', {
        accountNumber: '12345678'
      });
    }
  };
  
