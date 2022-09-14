module.exports = (sequelize, Sequelize) => {
    const PaymentRecord = sequelize.define("payment_records", {
      transaction_id: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      transaction_type: {
        type: Sequelize.STRING
      },
      payment_amount: {
        type: Sequelize.FLOAT
      },
      phone_number: {
        type: Sequelize.STRING
      },
      payer_email: {
        type: Sequelize.STRING
      },
    },{
      paranoid: true
    });
  
    return PaymentRecord;
  };
  