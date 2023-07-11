const db = require("../models");
const Path = db.path;
const Op = db.Sequelize.Op;

// Create and Save a new Path
exports.create = (req, res) => {
  // Validate request
  if (req.body.path === undefined) {
    const error = new Error("Path cannot be empty for Path!");
    error.statusCode = 400;
    throw error;
  }

  // Create a Path
  const path = {
    path: req.body.path,
    orderId: req.body.orderId,
  };

  // Save Customer in the database
  Path.create(path)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Path.",
      });
    });
};

// Retrieve all Paths from the database.
exports.findAll = (req, res) => {
  const pathId = req.query.pathId;
  var condition = pathId
    ? {
        id: {
          [Op.like]: `%${pathId}%`,
        },
      }
    : null;

  Path.findAll({ where: condition, order: [["id", "ASC"]] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving paths.",
      });
    });
};

// Find a single path with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Path.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Path with id=" + id,
      });
    });
};

// Update a Path by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Path.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Path was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Path with id=${id}. Maybe Path was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Path with id=" + id,
      });
    });
};

// Delete a Path with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Path.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Path was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Path with id=${id}. Maybe Path was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Path with id=" + id,
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
      res.send({ message: `${number} Paths were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all paths.",
      });
    });
};