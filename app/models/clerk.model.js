module.exports = (sequelize, Sequelize) => {
    const Clerk = sequelize.define("clerk", {
      clerkNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
    return Clerk;
  };
  