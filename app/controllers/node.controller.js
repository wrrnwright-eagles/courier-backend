const db = require("../models");
const Node = db.node;
const Op = db.Sequelize.Op;

// Create and Save a new Node
exports.create = (req, res) => {
  // Validate request
  if (!req.body.node) {
    const error = new Error("All fields must be filled out!");
    error.statusCode = 400;
    throw error;
  }
  if (!req.body.streetName) {
    const error = new Error("Street Name must be filled out!");
    error.statusCode = 400;
    throw error;
  }

  // Create an Node
  const node = {
    node: req.body.node,
    streetName: req.body.streetName,
  };

  // Save Node in the database
  Node.create(node)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Order.",
      });
    });
};

// Retrieve all Nodes from the database.
exports.findAll = (req, res) => {
  Node.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders.",
      });
    });
};

// Find a single Node with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Node.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Order with id=" + id,
      });
    });
};

// Update an Node by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Node.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Order was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Order with id=${id}. Maybe Order was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Order with id=" + id,
      });
    });
};

// Delete an Node with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Node.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Order was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Order with id=${id}. Maybe Order was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Order with id=" + id,
      });
    });
};

// Delete all Nodes from the database.
exports.deleteAll = (req, res) => {
  Node.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} Orders were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Orders.",
      });
    });
};
