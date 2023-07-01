const db = require("../models");
const Path = db.path;
const Op = db.Sequelize.Op;

// Create and Save a new Path
exports.create = (req, res) => {
  // Validate request
  if (!req.body.startLocation || !req.body.endLocation || !req.body.weight || !req.body.instructions ) {
    const error = new Error("All fields must be filled out!");
    error.statusCode = 400;
    throw error;
  }

  // Create an Order
  const node = {
    startLocation: req.body.startLocation,
    endLocation: req.body.endLocation,
    weight: req.body.weight,
    instructions: req.body.instructions,
  };

  // Save Path in the database
  Path.create(path)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Order.",
      });
    });
};

// Retrieve all Paths from the database.
exports.findAll = (req, res) => {
  Path.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders.",
      });
    });
};

// Find a single Path with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Path.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Order with id=" + id,
      });
    });
};

// Update an Path by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Path.update(req.body, {
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

// Delete an Path with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Path.destroy({
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

// Delete all Paths from the database.
exports.deleteAll = (req, res) => {
  Path.destroy({
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
