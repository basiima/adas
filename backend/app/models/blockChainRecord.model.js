module.exports = (sequelize, Sequelize) => {
    const BlockChainRecord = sequelize.define("blockchain_records", {
      transactionId: {
        type: Sequelize.STRING,
      },
      documentKey: {
        type:Sequelize.STRING
      },
    });
  
    return BlockChainRecord;
  };
  