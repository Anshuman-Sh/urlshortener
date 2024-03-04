const { STATUS_CODES, ERROR_MESSAGES } = require("../config/appConstants");

class AuthFailedError extends Error {
  constructor(
    statusCode = STATUS_CODES.AUTH_FAILED,
    message = ERROR_MESSAGES.AUTH_FAILED
  ) {
    super(message);

    this.statusCode = statusCode;
  }
}

class OperationalError extends Error {
  constructor(
    statusCode = STATUS_CODES.ACTION_FAILED,
    message = ERROR_MESSAGES.SERVER_ERROR
  ) {
    super(message);

    this.statusCode = statusCode;
  }
}

class NotFoundError extends Error {
  constructor(
    statusCode = STATUS_CODES.NOT_FOUND,
    message = ERROR_MESSAGES.NOT_FOUND
  ) {
    super(message);

    this.statusCode = statusCode;
  }
}

module.exports = { AuthFailedError, OperationalError, NotFoundError };
