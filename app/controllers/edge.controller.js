const db = require("../models");
const Edge = db.edge;
const Op = db.Sequelize.Op;

// Create and Save a new Edge
exports.create = (req, res) => {
  // Validate request
  if (!req.body.fromNode || !req.body.toNode || !req.body.weight || !req.body.instructions ) {
    const error = new Error("All fields must be filled out!");
    error.statusCode = 400;
    throw error;
  }

  // Create an Edge
  const edge = {
    fromNode: req.body.fromNode,
    toNode: req.body.toNode,
    weight: req.body.weight,
    instructions: req.body.instructions,
  };

  // Save Edge in the database
  Edge.create(edge)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Order.",
      });
    });
};

// Retrieve all Edges from the database.
exports.findAll = (req, res) => {
  Edge.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders.",
      });
    });
};

// Find a single Edge with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Edge.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Order with id=" + id,
      });
    });
};

// Update an Edge by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Edge.update(req.body, {
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

// Delete an Edge with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Edge.destroy({
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

// Delete all Edges from the database.
exports.deleteAll = (req, res) => {
  Edge.destroy({
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
