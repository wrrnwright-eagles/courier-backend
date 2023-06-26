module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customer", {
      customerNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      deliveryInstructions: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
    return Customer;
  };