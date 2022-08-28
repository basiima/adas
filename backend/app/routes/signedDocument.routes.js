module.exports = app => {
    const signed_documents = require("../controllers/signedDocument.controller.js");
    var router = require("express").Router();

    // Retrieve all Documents
    router.get("/", signed_documents.findAll);

    app.use('/api/documents', router);
  };