module.exports = (app) => {
  const Order = require("../controllers/order.controller.js");
  var router = require("express").Router();
  const { authenticateRoute } = require("../authentication/authentication");

  router.post("/orders/", [authenticateRoute], Order.create);

  router.get("/orders/", Order.findAll);

  router.put("/orders/:id/assign", Order.assignToCourier);

  router.get(
    "/orders/:id/ordersWithPickupCustomers/",
    Order.findAllForOrderWithPickupCustomers
  );


  router.get("/orders/:id", Order.findOne);

  router.put("/orders/:id", [authenticateRoute], Order.update);

  router.delete("/orders/:id", [authenticateRoute], Order.delete);

  router.delete("/orders/", [authenticateRoute], Order.deleteAll);

  app.use("/courierapi", router);

};

