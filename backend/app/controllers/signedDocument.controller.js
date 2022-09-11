const db = require("../models");
const SignedDocument = db.signed_document
const Op = db.Sequelize.Op;

// Store document details to db
exports.create = (req, res) => {

      // Validate request
      if (!req.body.document_file) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
      const document = {
        document_file: req.body.document_file,
        document_hash: req.body.document_hash,
        referenceId: req.body.referenceId
      }

          // Save Company in the database
    SignedDocument.create(document)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Document."
      });
    });
};

// Store document details to db
exports.create = (req, res) => {

      // Validate request
      if (!req.body.document_file) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
      const document = {
        document_file: req.body.document_file,
        document_hash: req.body.document_hash,
        referenceId: req.body.referenceId
      }

          // Save Company in the database
    SignedDocument.create(document)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Document."
      });
    });
};

// Retrieve all documents
exports.findAll = (req, res) => {
    const document_file = req.query.document_file;
    var condition = document_file ? { document_file: { [Op.like]: `%${document_file}%` } } : null;
    SignedDocument.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving documents."
        });
      });
  };

// Return a request of a specified document referenceId   
exports.findOne = (req, res) => {
  const referenceId = req.params.id;
  SignedDocument.findAll({
    where: {referenceId : { [Op.like]: `%${referenceId}%` } }
  })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Signed Document with referenceId=${referenceId}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Signed Document with referenceId=" + referenceId
      });
    });
};