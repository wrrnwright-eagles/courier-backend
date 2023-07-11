module.exports = (app) => {
    const Path = require("../controllers/path.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication.js");
  
    // Create a new Path
    router.post("/paths/", [authenticateRoute], Path.create);
  
    // Retrieve all Path
    router.get("/paths/", Path.findAll);
  
    // Retrieve a single Path with customerId
    router.get("/paths/:id", Path.findOne);
  
    // Update an Path with customerId
    router.put("/paths/:id", [authenticateRoute], Path.update);
  
    // Delete an Path with customerId
    router.delete("/paths/:id", [authenticateRoute], Path.delete);
  
    // Delete all Paths
    router.delete("/paths/", [authenticateRoute], Path.deleteAll);
  
    app.use("/courierapi", router);
  };