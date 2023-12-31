require("dotenv").config();


const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.options("*", cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the courier service backend." });
});

require("./app/routes/auth.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/pickupCustomer.routes.js")(app);
require("./app/routes/deliveryCustomer.routes.js")(app);
require("./app/routes/courier.routes.js")(app);
require("./app/routes/clerk.routes.js")(app);
require("./app/routes/edge.routes.js")(app);
require("./app/routes/order.routes.js")(app);
require("./app/routes/node.routes.js")(app);
require("./app/routes/path.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3201;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

module.exports = app;
