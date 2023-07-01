const db = require("../models");
const Courier = db.courier;
const Op = db.Sequelize.Op;

// Create and Save a new Activity
exports.create = (req, res) => {
  // Validate request
  if (req.body.courierNumber === undefined) {
    const error = new Error("Courier Number cannot be empty for Courier!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.name === undefined) {
    const error = new Error("Name cannot be empty for Courier!");
    error.statusCode = 400;
    throw error;
  }

  // Create a Customer
  const courier = {
    courierNumber: req.body.courierNumber,
    name: req.body.name,
  };
  // Save Customer in the database
  Courier.create(courier)
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
  const courierId = req.query.courierId;
  var condition = courierId
    ? {
        id: {
          [Op.like]: `%${courierId}%`,
        },
      }
    : null;

  Courier.findAll({ where: condition, order: [["courierNumber", "ASC"]] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving couriers.",
      });
    });
};

// Find a single Customer with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Courier.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Courier with id=" + id,
      });
    });
};

// Update a Customer by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Courier.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Courier was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Courier with id=${id}. Maybe Courier was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Courier with id=" + id,
      });
    });
};

// Delete a Courier with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Courier.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Courier was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Courier with id=${id}. Maybe Courier was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Courier with id=" + id,
      });
    });
};

// Delete all Activities from the database.
exports.deleteAll = (req, res) => {
  Courier.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} Couriers were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Couriers.",
      });
    });
};