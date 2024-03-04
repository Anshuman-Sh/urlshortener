const dotenv = require("dotenv");
const Joi = require("joi");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    PORT: Joi.number().required(),
    MONGO_URL: Joi.string().required().description("MongoDB URL"),
    SECRET_KEY: Joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.validate(process.env);
// .prefs({ errors: { label: "key" } })

if (error) throw new Error(`Config validation error - ${error}`);

module.exports = {
  port: envVars.PORT,
  mongo_url: envVars.MONGO_URL,
  secret_key: envVars.SECRET_KEY,
};
