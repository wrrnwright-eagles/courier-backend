module.exports = (app) => {
    const Clerk = require("../controllers/clerk.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication");
  
    router.post("/clerks/", [authenticateRoute], Clerk.create);
  
    router.get("/clerks/", Clerk.findAll);
  
    router.get("/clerks/:id", Clerk.findOne);
  
    router.put("/clerks/:id", [authenticateRoute], Clerk.update);
  
    router.delete("/clerks/:id", [authenticateRoute], Clerk.delete);
  
    router.delete("/clerks/", [authenticateRoute], Clerk.deleteAll);
  
    app.use("/clerkapi", router);
  };
  