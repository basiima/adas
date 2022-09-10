const db = require("../models");
const SignedDocument = db.signed_document

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