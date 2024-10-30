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

// models/User.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idNumber: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    accountNumber: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'), // Define allowed roles
      defaultValue: 'user', // Default role
      allowNull: false,
    },
  });

  return User;
};
