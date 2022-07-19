exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.studentBoard = (req, res) => {
  res.status(200).send("Student Content.");
};

exports.issuerBoard = (req, res) => {
  res.status(200).send("Issuer Content.");
};

exports.companyBoard = (req, res) => {
  res.status(200).send("Company Content.");
};
