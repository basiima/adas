module.exports = (sequelize, Sequelize) => {
    const Document = sequelize.define("documents", {
      document_file: {
        type: Sequelize.STRING
      },
      document_hash: {
        type: Sequelize.STRING
      }
    });
  
    return Document;
  };
  