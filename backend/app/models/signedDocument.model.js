module.exports = (sequelize, Sequelize) => {
    const SignedDocument = sequelize.define("signed_documents", {
      document_file: {
        type: Sequelize.STRING
      },
      document_hash: {
        type: Sequelize.STRING
      },
      referenceId: {
        type: Sequelize.STRING
      }
    });
  
    return SignedDocument;
  };
  