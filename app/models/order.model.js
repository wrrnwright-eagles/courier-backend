module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("order", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    time: {
      type: Sequelize.TIME,
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
    pickup: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    delivery: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    courierId: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    pathId: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  return Order;
};
