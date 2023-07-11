const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.session = require("./session.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.courier = require("./courier.model.js")(sequelize, Sequelize);
db.deliveryCustomer = require("./deliveryCustomer.model.js")(sequelize, Sequelize);
db.pickupCustomer = require("./pickupCustomer.model.js")(sequelize, Sequelize);
db.clerk = require("./clerk.model.js")(sequelize, Sequelize);
db.order = require("./order.model.js")(sequelize, Sequelize);
db.edge = require("./edge.model.js")(sequelize, Sequelize);
db.node = require("./node.model.js")(sequelize, Sequelize);
db.path = require("./path.model.js")(sequelize, Sequelize);

// foreign key for session
db.user.hasMany(
  db.session,
  { as: "session" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.session.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for order
db.deliveryCustomer.hasMany(
  db.order,
  { as: "order" }, 
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);
db.order.belongsTo(
  db.deliveryCustomer,
  { as: "deliveryCustomer" },
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);
db.pickupCustomer.hasMany(
  db.order,
  { as: "order" }, 
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);
db.order.belongsTo(
  db.pickupCustomer,
  { as: "pickupCustomer" },
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);
db.courier.hasMany(
  db.order,
  { as: "order" },
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);
db.order.belongsTo(
  db.courier,
  { as: "courier" },
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);

module.exports = db;
