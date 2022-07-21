const db = require("../models");
const Student = db.student;
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer"); // Require the Nodemailer package

// Ceate and save a student 
exports.create = (req, res) => {
    // Validate request
    if (!req.body.student_name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create a Student
    const defaultPassword = "adas-".concat(req.body.student_number);
    const student = {
        id: req.body.id,
        student_name: req.body.student_name,
        student_number: req.body.student_number,
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        password: bcrypt.hashSync(defaultPassword, 8)
    };
    // Save Student in the database
    Student.create(student)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Student."
        });
      });

    // Send Email containing default password
    async function sendMail(){
      // SMTP config
      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: "edmond.stoltenberg@ethereal.email",
          pass: "KzrUpYrVsuTFhePXza",
        },
      });
        // Send Email
      let info = await transporter.sendMail({
        from: '"ADAS Admin" <admin@adas.com>',
        to: req.body.email, // Student's email address
        subject: "Welcome Message!",
        text: "Welcome to the Academic Document Authenticity System (ADAS). Please login using the password ".concat(defaultPassword),
        html: "Welcome to the Academic Document Authenticity System (ADAS). Please login using the password ".concat(defaultPassword),
      });

      console.log("View email: %s", nodemailer.getTestMessageUrl(info)); // URL to preview email
    }
    sendMail().catch(console.error);

  };

// Retrieve all students
exports.findAll = (req, res) => {
    const student_name = req.query.student_name;
    var condition = student_name ? { student_name: { [Op.like]: `%${student_name}%` } } : null;
    Student.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving students."
        });
      });
  };

// Return a student of a specified id   
exports.findOne = (req, res) => {
    const id = req.params.id;
    Student.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Student with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Student with id=" + id
        });
      });
  };

// Update a student of a specified is
exports.update = (req, res) => {
    const id = req.params.id;
    Student.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Student was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Student with id=${id}. Maybe Student was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Student with id=" + id
        });
      });
  };

// Delete a student of a specifiied id 
exports.delete = (req, res) => {
    const id = req.params.id;
    Student.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Student was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Student with id=${id}. Maybe Student was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Student with id=" + id
        });
      });
  };

// Delete all specified students
exports.deleteAll = (req, res) => {
    Student.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Students were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all students."
        });
      });
  };