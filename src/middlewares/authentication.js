const { verifyToken } = require("../services/token.services");
// const { AuthFailedError } = require("../utils/errors");

const checkForAuth = (cookieName) => (req, res, next) => {
  try {
    const token = req.cookies[cookieName];

    if (req.url === "/signup" || req.url === "/login") {
      return next();
    }

    if (token) {
      const user = verifyToken(token);
      req.user = user;
      return next();
    } else {
      // throw new AuthFailedError();
      res.render("login");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = checkForAuth;
