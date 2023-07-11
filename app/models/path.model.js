module.exports = (sequelize, Sequelize) => {
    const Path = sequelize.define("path", {
      path: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });

    return Path;
  };