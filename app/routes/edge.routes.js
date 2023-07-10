module.exports = (app) => {
    const Edge = require("../controllers/edge.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication");
  
    // Create a new Edge
    router.post("/edges/", [authenticateRoute], Edge.create);
  
    // Retrieve all Edges
    router.get("/edges/", Edge.findAll);
  
    // Retrieve a single Edge with edgeId
    router.get("/edges/:id", Edge.findOne);
  
    // Update an Edge with edgeId
    router.put("/edges/:id", [authenticateRoute], Edge.update);
  
    // Delete an Edge with edgeId
    router.delete("/edges/:id", [authenticateRoute], Edge.delete);
  
    // Delete all Edges
    router.delete("/edges/", [authenticateRoute], Edge.deleteAll);
  
    app.use("/courierapi", router);
  };