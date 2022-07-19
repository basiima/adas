const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isIssuer = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "issuer") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Issuer Role!"
      });
      return;
    });
  });
};

isCompany = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "company") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Company Role!"
      });
    });
  });
};

isCompanyOrIssuer = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "company") {
          next();
          return;
        }

        if (roles[i].name === "issuer") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Company or Issuer Role!"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isIssuer: isIssuer,
  isCompany: isCompany,
  isCompanyOrIssuer: isCompanyOrIssuer
};
module.exports = authJwt;
