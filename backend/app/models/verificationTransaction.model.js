module.exports = (sequelize, Sequelize) => {
    const VerificationTransaction = sequelize.define("verification_transactions", {
      transactionId: {
        type: Sequelize.STRING,
      },
      documentType: {
        type:Sequelize.STRING
      },
      documentKey: {
        type:Sequelize.STRING
      },
      studentName: {
        type:Sequelize.STRING
      },
      verifierName: {
        type:Sequelize.STRING
      },
      documentReference: {
        type: Sequelize.STRING
      }
    });
  
    return VerificationTransaction;
  };
  