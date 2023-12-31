module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.BLOB,
      allowNull: false,
    },
    salt: {
      type: Sequelize.BLOB,
      allowNull: false,
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      allowNull: true, 
      defaultValue: false,
    },
    isClerk: {
      type: Sequelize.BOOLEAN,
      allowNull: true, 
      defaultValue: false,
    },
    isCourier: {
      type: Sequelize.BOOLEAN,
      allowNull: true, 
      defaultValue: false,
    }
  });

  return User;
};
