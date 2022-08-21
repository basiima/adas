const db = require("../models");
const StudentRequest = db.student_request
const Op = db.Sequelize.Op;

// Ceate and save a request 
exports.create = (req, res) => {
    // Validate request
    if (!req.body.student_name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create a Request
    // Getting current date of request making 
    let currentDate = new Date();
    let dd = currentDate.getDate();
    let mm = currentDate.getMonth()+1; 
    let yyyy = currentDate.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 
  
    if(mm<10) 
    {
        mm='0'+mm;
    }

    currentDate = dd+''+mm+''+yyyy;
    const randomAppendedCharacter = Math.random().toString(36).substring(2,6).toUpperCase();

    /** requestId begins with an 'RQ' concatenated with the 
     * current date when the request is made plus a 4 randomly generated alpha numeric character */ 
    const requestId = "RQ".concat(today).concat(randomAppendedCharacter); 

    const defaultStatus = 0;
    const student_request = {
        request_id: requestId,
        student_name: req.body.student_name,
        document_type: req.body.document_type,
        status: defaultStatus,
    };
    // Save Request in the database
    StudentRequest.create(student_request)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while sending the Request."
        });
      });

  };

// Retrieve all requests
exports.findAll = (req, res) => {
    const student_name = req.query.student_name;
    var condition = student_name ? { student_name: { [Op.like]: `%${student_name}%` } } : null;
    StudentRequest.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving requests."
        });
      });
  };

// Return a request of a specified request id   
exports.findOne = (req, res) => {
    const request_id = req.params.request_id;
    StudentRequest.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Request with id=${request_id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Request with id=" + request_id
        });
      });
  };

// Delete a request of a specifiied request id 
exports.delete = (req, res) => {
    const request_id = req.params.request_id;
    StudentRequest.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Request was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Request with id=${request_id}. Maybe Request was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Request with id=" + request_id
        });
      });
  };

// Delete all specified requests
exports.deleteAll = (req, res) => {
    StudentRequest.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Requests were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all requests."
        });
      });
  };