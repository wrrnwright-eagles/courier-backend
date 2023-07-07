const db = require("../models");
const Order = db.order;
const Op = db.Sequelize.Op;

// Create and Save a new Order
exports.create = (req, res) => {
  // Validate request
  if (!req.body.date || !req.body.time || !req.body.pickup || !req.body.delivery || !req.body.courier || req.body.blocks === undefined || req.body.price === undefined) {
    const error = new Error("All fields must be filled out!");
    error.statusCode = 400;
    throw error;
  }

  // Create an Order
  const order = {
    date: req.body.date,
    time: req.body.time,
    pickup: req.body.pickup,
    delivery: req.body.delivery,
    blocks: req.body.blocks,
    price: req.body.price,
  };

  // Save Order in the database
  Order.create(order)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Order.",
      });
    });
};

// Retrieve all Orders from the database.
exports.findAll = (req, res) => {
  Order.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders.",
      });
    });
};

// Find a single Order with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Order.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Order with id=" + id,
      });
    });
};

// Update an Order by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Order.update(req.body, {
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

// Delete an Order with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Order.destroy({
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

// Delete all Orders from the database.
exports.deleteAll = (req, res) => {
  Order.destroy({
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
