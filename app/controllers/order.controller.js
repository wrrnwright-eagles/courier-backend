const db = require("../models");
const Order = db.order;
const pickupCustomer = db.pickupCustomer;
const Op = db.Sequelize.Op;

// Create and Save a new Order
exports.create = (req, res) => {
  // Validate request
  if (!req.body.date) {
    const error = new Error("Date cannot be empty for Order");
    error.statusCode = 400;
    throw error;
  } else if (!req.body.time) {
    const error = new Error("Time cannot be empty for Order");
    error.statusCode = 400;
    throw error;
  } else if (!req.body.blocks) {
    const error = new Error("Blocks cannot be empty for Order");
    error.statusCode = 400;
    throw error;
  } else if (!req.body.price) {
    const error = new Error("Price cannot be empty for Order");
    error.statusCode = 400;
    throw error;
  }

  // Create an Order
  const order = {
    date: req.body.date,
    time: req.body.time,
    blocks: req.body.blocks,
    price: req.body.price,
    pickupCustomerId: req.body.pickupCustomerId,
    deliveryCustomerId: req.body.deliveryCustomerId,
    courierId: req.body.courierId,
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

exports.findAllForOrderWithPickupCustomers = (req, res) => {
  const id = req.params.id;
  Order.findAll({
    where: { id: id},
    include: [
      {
        model: pickupCustomer,
        as: "pickupCustomer"
      },
    ],
    order: [["id", "ASC"]],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: 
          err.message || "Error occurred while retrieving pickupCustomers for an order."
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
