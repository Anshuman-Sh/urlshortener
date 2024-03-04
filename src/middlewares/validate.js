const Joi = require("joi");
const { ValidationError } = require("../utils/errors");
const { pick } = require("../utils/universalFunction");
const { STATUS_CODES } = require("../config/appConstants");

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ["params", "query", "body"]);
  const object = pick(req, Object.keys(validSchema));

  //   console.log(validSchema)
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" } })
    .validate(object);

  // console.log(value, "VALUE")

  if (error) {
    console.error(error);
    let errorMessage = error.details
      .map((details) => details.message)
      .join(", ")
      .replace(/"/g, "");

    // console.log("ErrorMessage", errorMessage);

    //  return next(new ApiError("en", errorMessage));
    return next(
      new ValidationError(STATUS_CODES.VALIDATION_FAILED, errorMessage)
    );
  }
  Object.assign(req, value);
  return next();
};

const validateView = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ["params", "query", "body", "files"]);
  const object = pick(req, Object.keys(validSchema));

  //   console.log(validSchema)
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" } })
    .validate(object);

  // console.log(value, "VALUE")

  if (error) {
    console.error(error);
    let errorMessage = error.details
      .map((details) => details.message)
      .join(", ")
      .replace(/"/g, "");

    // console.log("ErrorMessage", errorMessage);

    //  return next(new ApiError("en", errorMessage));
    return res.render("./commonMessage", { error: errorMessage });
  }
  Object.assign(req, value);
  return next();
};

module.exports = { validate, validateView };
