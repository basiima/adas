module.exports = app => {
    const blockchain_records = require("../controllers/blockChainRecord.controller");
    var router = require("express").Router();
    
    // Create a new Request
    router.post("/", blockchain_records.create);

    app.use('/api/blockchain_records', router);
  };