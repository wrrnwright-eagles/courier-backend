const db = require("../models");
const Clerk = db.clerk;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (req.body.clerkNumber === undefined) {
    const error = new Error("Clerk Number cannot be empty for Clerk!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.name === undefined) {
    const error = new Error("Name cannot be empty for Clerk!");
    error.statusCode = 400;
    throw error;
  }

  const clerk = {
    clerkNumber: req.body.clerkNumber,
    name: req.body.name,
  };

  Clerk.create(clerk)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Clerk.",
      });
    });
};

exports.findAll = (req, res) => {
  const clerkId = req.query.clerkId;
  var condition = clerkId
    ? {
        id: {
          [Op.like]: `%${clerkId}%`,
        },
      }
    : null;

  Clerk.findAll({ where: condition, order: [["clerkNumber", "ASC"]] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving clerks.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Clerk.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Clerk with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Clerk.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Clerk was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Clerk with id=${id}. Maybe Clerk was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Clerk with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Clerk.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Clerk was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Clerk with id=${id}. Maybe Clerk was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Clerk with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Clerk.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} Clerks were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Clerks.",
      });
    });
};
