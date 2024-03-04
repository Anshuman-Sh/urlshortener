const {
  STATUS_CODES,
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
} = require("../config/appConstants");
const {
  AuthFailedError,
  OperationalError,
  NotFoundError,
} = require("./errors");

const successResponse = (
  req,
  res,
  status = STATUS_CODES.SUCCESS,
  message = SUCCESS_MESSAGES.SUCCESS,
  data
) => {
  const result = {
    status,
    message,
    data,
  };
  return res.status(status).json(result);
};

const errorResponse = (error, req, res) => {
  const statusCode =
    error.statusCode ||
    error.code ||
    error.response?.status ||
    STATUS_CODES.SERVER_ERROR;

  console.log(error);

  if (statusCode === STATUS_CODES.SERVER_ERROR) {
    return res.status(statusCode).json({
      statusCode,
      message: ERROR_MESSAGES.SERVER_ERROR,
    });
  }

  const message =
    error instanceof AuthFailedError ||
    error instanceof OperationalError ||
    error instanceof NotFoundError
      ? error.message
      : error.toString();

  return res
    .status(statusCode)
    .json({ status: statusCode, errorMessage: message });
};

module.exports = { successResponse, errorResponse };
