module.exports = (sequelize, Sequelize) => {
    const Courier = sequelize.define("courier", {
      courierNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
    return Courier;
  };