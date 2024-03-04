const jwt = require("jsonwebtoken");
const config = require("../config/config.js");
const secretKey = config.secret_key;

const generateToken = (user) => {
  const payload = {
    id: user._id,
    firstName: user.firstName,
    email: user.email,
  };

  return jwt.sign(payload, secretKey);
};

const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};

module.exports = { generateToken, verifyToken };
