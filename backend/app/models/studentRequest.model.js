module.exports = (sequelize, Sequelize) => {
    const StudentRequest = sequelize.define("student_requests", {
      request_id: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      student_name: {
        type: Sequelize.STRING
      },
      document_type: {
        type: Sequelize.STRING
      },
      student_number: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER
      },
    },{
      paranoid: true
    });
  
    return StudentRequest;
  };
  