const db = require("../models");
const VerificationTransaction = db.verification_transaction;
const Op = db.Sequelize.Op;

// Ceate and save a Verification Transaction 
exports.create = (req, res) => {
    // Validate request
    if (!req.body.transactionId) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    const transaction = {
        transactionId: req.body.transactionId,
        documentType: req.body.documentType,
        documentKey: req.body.documentKey,
        studentName: req.body.studentName,
        verifierName: req.body.verifierName,
        documentReference: req.body.documentReference
    };
    // Save Request in the database
    VerificationTransaction.create(transaction)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while saving the Transaction."
        });
      });

  };