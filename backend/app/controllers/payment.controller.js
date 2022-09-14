const db = require("../models");
const PaymentRecord = db.payment_record
const Op = db.Sequelize.Op;

// Ceate and save a request 
exports.create = (req, res) => {
    let transactionType = "";

    console.log(req);
    if (req.body.amount == 50000){
        transactionType = "verification";
    } else {
        transactionType = "certification";
    }

    // Create a Request
    const payment_record = {
        transaction_id: req.body.tx_ref,
        transaction_type: transactionType,
        payment_amount: req.body.amount,
        phone_number: req.body.customer.phone_number,
        payer_email: req.body.customer.email,
    };
    
    // Save Payment Record in the database
    PaymentRecord.create(payment_record)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while sending the Request."
        });
      });

  };
