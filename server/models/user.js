// // models/User.js
// module.exports = (sequelize, DataTypes) => {
//   const User = sequelize.define('User', {
//     fullName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     idNumber: {
//       type: DataTypes.STRING,
//       unique: true,
//       allowNull: false,
//     },
//     accountNumber: {
//       type: DataTypes.STRING,
//       unique: true,
//       allowNull: false,
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   });

//   return User;
// };

// server/models/User.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class User extends Model {}

User.init({
  fullName: DataTypes.STRING,
  idNumber: DataTypes.STRING,
  accountNumber: DataTypes.STRING,
  password: DataTypes.STRING,
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user', // Default role is 'user'
  }
}, {
  sequelize,
  modelName: 'User',
});

module.exports = User;
