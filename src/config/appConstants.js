const STATUS_CODES = {
  SUCCESS: 200,
  CREATED: 201,

  VALIDATION_FAILED: 400,
  ACTION_FAILED: 400,
  AUTH_FAILED: 401,
  NOT_FOUND: 404,

  SERVER_ERROR: 500,
};

const SUCCESS_MESSAGES = {
  SUCCESS: "Success",
  CREATED: "Created",
};

const ERROR_MESSAGES = {
  ACCOUNT_NOT_EXIST: "Account does not exist",
  INCORRECT_PASSWORD: "Incorrect Password",
  AUTH_FAILED: "Please authenticate.",
  SERVER_ERROR: "Something went wrong.",
  VALIDATION_FAILED: "Validation failed, please check your parameters",
  NOT_FOUND: "Not found",
  ROUTE_NOT_FOUND: "Route not found",
  EMAIL_ALREADY_EXIST: "Email already in use, please try with other mail.",

  URL_NOT_FOUND: "Url not found",
};

module.exports = { STATUS_CODES, SUCCESS_MESSAGES, ERROR_MESSAGES };
