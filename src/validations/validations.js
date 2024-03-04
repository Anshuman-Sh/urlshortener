const Joi = require("joi");

exports.signupValidSchema = {
  files: Joi.object()
    .keys({
      file: Joi.object({
        mimetype: Joi.string()
          .regex(/^image\//)
          .required(),
        size: Joi.number().required(),
      })
        .unknown(true)
        .required(),
    })
    .allow(null),
  body: Joi.object().keys({
    file: Joi.string(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
};

exports.loginValidSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

exports.urlValidSchema = {
  body: Joi.object().keys({
    redirectUrl: Joi.string().uri(),
  }),
};
