module.exports = (app) => {
    const Node = require("../controllers/node.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication");
  
    // Create a new Node
    router.post("/nodes/", [authenticateRoute], Node.create);
  
    // Retrieve all Nodes
    router.get("/nodes/", Node.findAll);
  
    // Retrieve a single Node with nodeId
    router.get("/nodes/:id", Node.findOne);
  
    // Update an Node with nodeId
    router.put("/nodes/:id", [authenticateRoute], Node.update);
  
    // Delete an Node with nodeId
    router.delete("/nodes/:id", [authenticateRoute], Node.delete);
  
    // Delete all Nodes
    router.delete("/nodes/", [authenticateRoute], Node.deleteAll);
  
    app.use("/courierapi", router);
  };