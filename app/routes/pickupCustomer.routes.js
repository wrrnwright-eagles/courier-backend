module.exports = (app) => {
    const PickupCustomer = require("../controllers/pickupCustomer.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication.js");
  
    // Create a new Pickup Customer
    router.post("/pickupCustomers/", [authenticateRoute], PickupCustomer.create);
  
    // Retrieve all Pickup Customer
    router.get("/pickupCustomers/", PickupCustomer.findAll);
  
    // Retrieve a single Pickup Customer with customerId
    router.get("/pickupCustomers/:id", PickupCustomer.findOne);
  
    // Update an Pickup Customer with customerId
    router.put("/pickupCustomers/:id", [authenticateRoute], PickupCustomer.update);
  
    // Delete an Pickup Customer with customerId
    router.delete("/pickupCustomers/:id", [authenticateRoute], PickupCustomer.delete);
  
    // Delete all Pickup Customers
    router.delete("/pickupCustomers/", [authenticateRoute], PickupCustomer.deleteAll);
  
    app.use("/courierapi", router);
  };