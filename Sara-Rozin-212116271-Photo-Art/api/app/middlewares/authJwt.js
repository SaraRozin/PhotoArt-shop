const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.schoolId = decoded.school;
    req.userId = decoded.id;
    next();
  });
};
verifyAccess = (req, res, next) => {
  // let token = req.headers["Access-Control-Allow-Headers"];
  const user =User.findById(req.params.id);
  if (user.role !== 'manager')
    return res.status(403).send({
      error: {
        status: 403, message: 'Access denied.'
      }
    });
  // req.schoolId = decoded.school;
  // req.userId = decoded.id;
  next();
}
const authJwt = {
  verifyToken,
  verifyAccess
};

module.exports = authJwt;
