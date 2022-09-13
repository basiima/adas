module.exports = app => {
    const verification_transactions = require("../controllers/verificationTransaction.controller");
    var router = require("express").Router();
    
    // Create a new Request
    router.post("/", verification_transactions.create);

    app.use('/api/verification_transactions', router);
  };