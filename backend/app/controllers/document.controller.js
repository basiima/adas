const db = require("../models");
const Document = db.document

// Retrieve all documents
exports.findAll = (req, res) => {
    const document_file = req.query.document_file;
    var condition = document_file ? { document_file: { [Op.like]: `%${document_file}%` } } : null;
    Document.findAll({ where: condition })
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