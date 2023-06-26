module.exports = (app) => {
    const Courier = require("../controllers/courier.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication");
  
    // Create a new Courier
    router.post("/couriers/", [authenticateRoute], Courier.create);
  
    // Retrieve all Courier
    router.get("/couriers/", Courier.findAll);
  
    // Retrieve a single Courier with courierId
    router.get("/couriers/:id", Courier.findOne);
  
    // Update an Courier with courierId
    router.put("/couriers/:id", [authenticateRoute], Courier.update);
  
    // Delete an Courier with courierId
    router.delete("/couriers/:id", [authenticateRoute], Courier.delete);
  
    // Delete all Couriers
    router.delete("/couriers/", [authenticateRoute], Courier.deleteAll);
  
    app.use("/courierapi", router);
  };