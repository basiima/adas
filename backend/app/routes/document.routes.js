module.exports = app => {
    const documents = require("../controllers/document.controller.js");
    var router = require("express").Router();

    // Retrieve all Documents
    router.get("/", documents.findAll);

    app.use('/api/documents', router);
  };