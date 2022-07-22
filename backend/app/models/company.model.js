module.exports = (sequelize, Sequelize) => {
    const Company = sequelize.define("companies", {
      company_name: {
        type: Sequelize.STRING
      },
      company_email: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
    });
    return Company;
  }