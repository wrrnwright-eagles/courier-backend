module.exports = (app) => {
    const DeliveryCustomer = require("../controllers/deliveryCustomer.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication");
  
    // Create a new Delivery Customer
    router.post("/deliveryCustomers/", [authenticateRoute], DeliveryCustomer.create);
  
    // Retrieve all Delivery Customer
    router.get("/deliveryCustomers/", DeliveryCustomer.findAll);
  
    // Retrieve a single Delivery Customer with customerId
    router.get("/deliveryCustomers/:id", DeliveryCustomer.findOne);
  
    // Update an Delivery Customer with customerId
    router.put("/deliveryCustomers/:id", [authenticateRoute], DeliveryCustomer.update);
  
    // Delete an Delivery Customer with customerId
    router.delete("/deliveryCustomers/:id", [authenticateRoute], DeliveryCustomer.delete);
  
    // Delete all Delivery Customers
    router.delete("/deliveryCustomers/", [authenticateRoute], DeliveryCustomer.deleteAll);
  
    app.use("/courierapi", router);
  };