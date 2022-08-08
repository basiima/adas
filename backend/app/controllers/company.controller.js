const db = require("../models");
const Company = db.company;
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer"); // Require the Nodemailer package

// Ceate and save a company 
exports.create = (req, res) => {
    // Validate request
    if (!req.body.company_name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create a Company
    const defaultPassword = "adas-".concat(req.body.username);
    const encryptedDefaultPassword = bcrypt.hashSync(defaultPassword, 8);
    const company = {
        id: req.body.id,
        company_name: req.body.company_name,
        company_email: req.body.company_email,
        username: req.body.username,
        password: encryptedDefaultPassword
    };
    // Save Company in the database
    Company.create(company)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Company."
        });
      });

    // Save company in the users table  
    User.create({
      username: req.body.username,
      email: req.body.company_email,
      password: encryptedDefaultPassword
    })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        })
        .then(roles => {
          user.setRoles(roles);
        });
      } else {
        // company role = 3
        user.setRoles([3]);
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
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

// Retrieve all companies
exports.findAll = (req, res) => {
    const company_name = req.query.company_name;
    var condition = company_name ? { company_name: { [Op.like]: `%${company_name}%` } } : null;
    Company.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving companies."
        });
      });
  };

// Return a company of a specified id   
exports.findOne = (req, res) => {
    const id = req.params.id;
    Company.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Company with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Company with id=" + id
        });
      });
  };

// Update a company of a specified id
exports.update = (req, res) => {
    const id = req.params.id;
    Company.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Company was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Company with id=${id}. Maybe Company was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Company with id=" + id
        });
      });
  };

// Delete a company of a specifiied id 
exports.delete = (req, res) => {
    const id = req.params.id;
    Company.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Company was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Company with id=${id}. Maybe Company was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Company with id=" + id
        });
      });
  };

// Delete all specified companies
exports.deleteAll = (req, res) => {
    Company.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Companies were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all companies."
        });
      });
  };