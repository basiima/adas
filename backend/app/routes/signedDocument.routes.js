module.exports = app => {
    const signed_documents = require("../controllers/signedDocument.controller.js");
    var router = require("express").Router();

    // Create a new Document
    router.post("/", signed_documents.create);
    // Retrieve all Documents
    router.get("/", signed_documents.findAll);

    // Retrieve a single Document with referenceId
    router.get("/:id", signed_documents.findOne);
    
    app.use('/api/signed_documents', router);
  };