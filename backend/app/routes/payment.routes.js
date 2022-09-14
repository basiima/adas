module.exports = app => {
    const payment_records = require("../controllers/payment.controller");
    var router = require("express").Router();
    
    // Create a new Request
    router.post("/", payment_records.create);

    // // Retrieve all Requests
    // router.get("/", payment_records.findAll);

    // // Retrieve a single Request with request_id
    // router.get("/:id", payment_records.findOne);

    app.use('/api/payment_records', router);
  };