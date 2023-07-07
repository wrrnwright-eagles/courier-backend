const db = require("../models");
const PickupCustomer = db.pickupCustomer;
const Op = db.Sequelize.Op;

// Create and Save a new Activity
exports.create = (req, res) => {
  // Validate request
  if (req.body.customerNumber === undefined) {
    const error = new Error("Customer Number cannot be empty for Pickup Customer!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.name === undefined) {
    const error = new Error("Name cannot be empty for Pickup Customer!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.locationDescription === undefined) {
    const error = new Error("Location Description cannot be empty for Pickup Customer!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.locationNode === undefined) {
    const error = new Error("Location Node cannot be empty for Pickup Customer!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.deliveryInstructions === undefined) {
    const error = new Error("Delivery Instructions cannot be empty for Pickup Customer!");
    error.statusCode = 400;
    throw error;
  }

  // Create a Customer
  const pickupCustomer = {
    customerNumber: req.body.customerNumber,
    name: req.body.name,
    locationDescription: req.body.locationDescription,
    locationNode: req.body.locationNode,
    deliveryInstructions: req.body.deliveryInstructions,
  };
  // Save Customer in the database
  PickupCustomer.create(pickupCustomer)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer.",
      });
    });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  const customerId = req.query.customerId;
  var condition = customerId
    ? {
        id: {
          [Op.like]: `%${customerId}%`,
        },
      }
    : null;

  PickupCustomer.findAll({ where: condition, order: [["customerNumber", "ASC"]] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers.",
      });
    });
};

// Find a single Customer with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  PickupCustomer.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Customer with id=" + id,
      });
    });
};

// Update a Customer by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Customer.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Customer was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Customer with id=${id}. Maybe Customer was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Customer with id=" + id,
      });
    });
};

// Delete a Customer with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  PickupCustomer.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Customer was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Customer with id=${id}. Maybe Customer was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Customer with id=" + id,
      });
    });
};

// Delete all Activities from the database.
exports.deleteAll = (req, res) => {
  PickupCustomer.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} Customers were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers.",
      });
    });
};