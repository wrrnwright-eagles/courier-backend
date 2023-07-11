module.exports = (sequelize, Sequelize) => {
    const Path = sequelize.define("path", {
      path: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });

    return Path;
  };