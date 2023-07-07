module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      time: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      pickup: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      delivery: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      blocks: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
    });
    return Order;
  };
