// seeds/xxxxxx-admin-user.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      fullName: 'Admin User',
      idNumber: 'ADMIN123',
      accountNumber: 'ADMIN_ACCOUNT',
      password: await bcrypt.hash('AdminPassword', 10), // Hash the password
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', {
      accountNumber: 'ADMIN_ACCOUNT'
    });
  }
};
