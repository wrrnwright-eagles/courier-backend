module.exports = (sequelize, Sequelize) => {
    const Edge = sequelize.define("edge", {
      fromNode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      toNode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      weight: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      instructions: {
        type: Sequelize.STRING,
        allowNull: true,
      }
    });
  
    return Edge;
  };
  