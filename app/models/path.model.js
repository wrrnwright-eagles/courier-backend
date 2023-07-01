module.exports = (sequelize, Sequelize) => {
    const Path = sequelize.define("path", {
      startLocation: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      endLocation: {
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
  
    return Path;
  };
  