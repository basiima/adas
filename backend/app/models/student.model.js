module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("students", {
      student_name: {
        type: Sequelize.STRING
      },
      student_number: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
    });
    return Student;
  }