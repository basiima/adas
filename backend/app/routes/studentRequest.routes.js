module.exports = app => {
    const student_requests = require("../controllers/studentRequest.controller");
    var router = require("express").Router();
    
    // Create a new Request
    router.post("/", student_requests.create);

    // Retrieve all Requests
    router.get("/", student_requests.findAll);

    // Retrieve a single Request with request_id
    router.get("/:id", student_requests.findOne);

    // Delete a Request with request_id
    router.delete("/:id", student_requests.delete);

    // Delete all Requests
    router.delete("/", student_requests.deleteAll);

    app.use('/api/student_requests', router);
  };