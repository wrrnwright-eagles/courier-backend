module.exports = (sequelize, Sequelize) => {
    const Node = sequelize.define("node", {
      node: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      streetName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  
    return Node;
  };
  