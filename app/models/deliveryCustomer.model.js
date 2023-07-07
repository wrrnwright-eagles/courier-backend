module.exports = (sequelize, Sequelize) => {
    const DeliveryCustomer = sequelize.define("deliveryCustomer", {
      customerNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      locationDescription: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      locationNode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      deliveryInstructions: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
    return DeliveryCustomer;
  };