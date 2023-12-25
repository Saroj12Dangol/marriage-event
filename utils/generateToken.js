const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET); //TODO: generate the jwt token using the id of the user. from this token we can extract the id
};

module.exports = generateToken;
