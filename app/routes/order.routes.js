module.exports = (app) => {
    const Order = require("../controllers/order.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication");
  
    // Create a new Order
    router.post("/orders/", [authenticateRoute], Order.create);
  
    // Retrieve all Orders
    router.get("/orders/", Order.findAll);
  
    // Retrieve a single Order with orderId
    router.get("/orders/:id", Order.findOne);
  
    // Update an Order with orderId
    router.put("/orders/:id", [authenticateRoute], Order.update);
  
    // Delete an Order with orderId
    router.delete("/orders/:id", [authenticateRoute], Order.delete);
  
    // Delete all Orders
    router.delete("/orders/", [authenticateRoute], Order.deleteAll);
  
    app.use("/orderapi", router);
  };
